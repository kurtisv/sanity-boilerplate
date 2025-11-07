/**
 * ✅ COMPAT AGENT (Compatibility Agent)
 * 
 * Rôle: Teste la conformité technique et la qualité du projet
 * 
 * Tâches:
 * - Exécuter tsc --noEmit pour vérifier les types
 * - Lancer eslint
 * - Faire sanity check
 * - Effectuer build Next.js (selon dryRun)
 * - Bloquer la suite si un test échoue
 * 
 * Si erreur: Transmettre le contexte à diagnosticAgent
 */

const { runTypecheck, runEslint, runNextBuild, runSanityValidations } = require('./core/checks')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

async function run({ dryRun = true, handover } = {}) {
  console.log('\n✅ COMPAT AGENT - Tests de conformité technique')
  console.log('='.repeat(80))
  
  // Valider et extraire contextId
  const contextId = handover?.contextId || uuidv4()
  
  // Vérifier le handover
  if (handover && handover.status === 'blocked') {
    console.log('\n⚠️  Handover bloqué:', handover.blockedReason)
    const blockedHandover = createHandover(contextId, 'blocked', 'diagnosticAgent', {
      errors: [handover.blockedReason || 'Handover blocked from previous agent']
    })
    saveHandover(contextId, 'compat', blockedHandover)
    return {
      ok: false,
      error: 'Handover blocked',
      handover: blockedHandover
    }
  }
  
  console.log('\n📋 Exécution des tests de conformité...\n')
  
  // 1. TypeScript type checking
  console.log('1️⃣ TypeScript type checking (tsc --noEmit)...')
  const typecheck = await runTypecheck()
  console.log(typecheck.ok ? '  ✅ Types valides' : `  ❌ Erreurs de types: ${typecheck.err}`)
  
  // 2. ESLint
  console.log('\n2️⃣ ESLint...')
  const lint = await runEslint()
  console.log(lint.ok ? '  ✅ Lint passed' : `  ❌ Erreurs lint: ${lint.err}`)
  
  // 3. Sanity validations
  console.log('\n3️⃣ Sanity schema validation...')
  const sanity = await runSanityValidations()
  console.log(sanity.ok ? '  ✅ Schémas Sanity valides' : `  ❌ Erreurs Sanity: ${sanity.err}`)
  
  // 4. Next.js build (si pas en dry-run)
  console.log('\n4️⃣ Next.js build...')
  const build = dryRun 
    ? { ok: true, out: 'Skipped build (dry-run)', err: '' } 
    : await runNextBuild()
  console.log(build.ok ? '  ✅ Build réussi' : `  ❌ Erreurs build: ${build.err}`)
  
  // Résumé
  const allOk = typecheck.ok && lint.ok && sanity.ok && build.ok
  
  console.log('\n' + '='.repeat(80))
  console.log('📊 RÉSUMÉ DES TESTS')
  console.log('='.repeat(80))
  console.log(`TypeScript: ${typecheck.ok ? '✅' : '❌'}`)
  console.log(`ESLint:     ${lint.ok ? '✅' : '❌'}`)
  console.log(`Sanity:     ${sanity.ok ? '✅' : '❌'}`)
  console.log(`Build:      ${build.ok ? '✅' : '❌'}`)
  console.log('='.repeat(80))
  
  // Créer le handover selon le format global
  const failedTests = [
    !typecheck.ok && 'typecheck',
    !lint.ok && 'lint',
    !sanity.ok && 'sanity',
    !build.ok && 'build'
  ].filter(Boolean)
  
  const nextHandover = createHandover(contextId, allOk ? 'ready' : 'blocked', 'diagnosticAgent', {
    artifacts: {
      report: { typecheck, lint, sanity, build },
      files: [],
      manifest: { blocks: [], pages: [], media: [] }
    },
    errors: failedTests.map(test => `${test} failed`),
    meta: {
      timestamp: new Date().toISOString(),
      notes: allOk ? 'All tests passed' : `Failed tests: ${failedTests.join(', ')}`
    }
  })
  
  if (!allOk) {
    nextHandover.blockedReason = 'Tests de conformité échoués - correction nécessaire'
  }
  
  // Sauvegarder le handover
  saveHandover(contextId, 'compat', nextHandover)
  
  if (allOk) {
    console.log('\n✅ TOUS LES TESTS SONT PASSÉS!')
  } else {
    console.log('\n❌ CERTAINS TESTS ONT ÉCHOUÉ')
    console.log('   → Transmission à diagnosticAgent pour correction automatique')
  }
  
  console.log('\n📦 Handover préparé pour diagnosticAgent')
  console.log(`  Status: ${nextHandover.status}`)
  console.log(`  Next Agent: ${nextHandover.nextAgent}`)
  
  return {
    ok: allOk,
    reports: { typecheck, lint, sanity, build },
    handover: nextHandover
  }
}

/**
 * Créer un handover selon le format global
 */
function createHandover(contextId, status, nextAgent, data = {}) {
  return {
    contextId,
    status,
    nextAgent,
    stage: 'compat',
    artifacts: data.artifacts || { files: [], manifest: { blocks: [], pages: [], media: [] } },
    errors: data.errors || [],
    meta: data.meta || {
      timestamp: new Date().toISOString(),
      notes: ''
    }
  }
}

/**
 * Sauvegarder le handover
 */
function saveHandover(contextId, agentName, handover) {
  const outDir = path.join(__dirname, '..', 'out', contextId)
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  const handoverPath = path.join(outDir, `${agentName}-handover.json`)
  fs.writeFileSync(handoverPath, JSON.stringify(handover, null, 2))
  console.log(`\n📦 Handover sauvegardé: ${handoverPath}`)
}

module.exports = { run }
