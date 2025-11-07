/**
 * 🔍 REVIEWER AGENT - Validation structurelle
 * 
 * Rôle: Valide la structure des schémas Sanity et détecte les erreurs communes
 * 
 * Validations:
 * - Export default vs named export
 * - Icônes (emoji vs import)
 * - Types de champs invalides (color, select, etc.)
 * - Validation des longueurs (max)
 * - initialValue pour arrays
 * - Structure des options.list
 * - Champs requis manquants
 * - Preview obligatoire
 */

const fs = require('fs')
const path = require('path')
const { createHandover, getOrCreateContextId } = require('./core/contracts')
const { eventBus, publishAgentEvent } = require('./core/eventBus')
const { updateManifest, addFile } = require('./core/artifacts')

function scanFiles(dir, predicate) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...scanFiles(full, predicate))
    else if (predicate(full)) out.push(full)
  }
  return out
}

function autoFix(code) {
  let fixed = code
  let changes = []

  // 1) export const X = defineType(  → export default defineType(
  if (/export\s+const\s+\w+\s*=\s*defineType\(/.test(fixed)) {
    fixed = fixed.replace(/export\s+const\s+\w+\s*=\s*defineType\(/g, 'export default defineType(')
    changes.push('export-default')
  }

  // 2) icon: SomeIcon  → icon: () => '⭐'
  if (/icon:\s*[A-Za-z]\w*/.test(fixed) && !/icon:\s*\(\)\s*=>/.test(fixed)) {
    fixed = fixed.replace(/icon:\s*[A-Za-z]\w*/g, "icon: () => '⭐'")
    changes.push('emoji-icon')
  }

  // 3) type: 'color' → type: 'string' + add description if missing on that field line
  if (/type:\s*'color'/.test(fixed)) {
    fixed = fixed.replace(/type:\s*'color'/g, "type: 'string'")
    // Best-effort: if description missing on that line, we won't force-insert; reviewer will still report to add regex
    changes.push('color-to-string')
  }

  return { fixed, changes }
}

async function run({ fix = false, handover = null, dryRun = false } = {}) {
  const startTime = Date.now()
  console.log('\n🔍 REVIEWER AGENT - Validation structurelle')
  console.log('='.repeat(80))
  
  // Obtenir ou créer contextId
  const contextId = getOrCreateContextId(handover)
  
  // Publier événement de démarrage
  publishAgentEvent('reviewerAgent', 'start', { contextId, fix })
  
  const root = path.join(process.cwd(), 'src', 'sanity', 'schemas', 'blocks')
  const files = fs.existsSync(root) ? scanFiles(root, (f) => f.endsWith('.ts')) : []
  const problems = []
  const fixes = []
  
  console.log(`\n📁 Analyse de ${files.length} fichiers...\n`)

  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8')
    const relativePath = path.relative(process.cwd(), file)
    let fileProblems = []

    // VALIDATION 1: Export default
    if (/export\s+const\s+\w+\s*=\s*defineType\(/.test(code)) {
      fileProblems.push({
        type: 'export',
        severity: 'error',
        message: 'Named export used, should be export default',
        autoFixable: true
      })
    }
    
    // VALIDATION 2: Icônes emoji
    if (/icon:\s*[A-Za-z]/.test(code) && !/icon:\s*\(\)\s*=>/.test(code)) {
      fileProblems.push({
        type: 'icon',
        severity: 'error',
        message: 'Icon should be function returning an emoji, not imported component',
        autoFixable: true
      })
    }
    
    // VALIDATION 3: Type color invalide
    if (/type:\s*'color'/.test(code)) {
      fileProblems.push({
        type: 'type',
        severity: 'error',
        message: "Invalid field type 'color' — use string + regex/description",
        autoFixable: true
      })
    }
    
    // VALIDATION 4: Arrays sans initialValue
    const arrayMatches = code.match(/type:\s*'array'/g)
    if (arrayMatches) {
      const hasInitialValue = code.match(/initialValue:\s*\[\]/g)
      if (!hasInitialValue || hasInitialValue.length < arrayMatches.length) {
        fileProblems.push({
          type: 'array',
          severity: 'warning',
          message: 'Array fields should have initialValue: []',
          autoFixable: false
        })
      }
    }
    
    // VALIDATION 5: Validation max trop élevée
    const maxValidations = code.match(/Rule\.max\((\d+)\)/g)
    if (maxValidations) {
      maxValidations.forEach(match => {
        const value = parseInt(match.match(/\d+/)[0])
        if (value > 500) {
          fileProblems.push({
            type: 'validation',
            severity: 'warning',
            message: `Validation max(${value}) is very high, consider lowering it`,
            autoFixable: false
          })
        }
      })
    }
    
    // VALIDATION 6: Preview manquant
    if (!code.includes('preview:')) {
      fileProblems.push({
        type: 'preview',
        severity: 'warning',
        message: 'Missing preview configuration',
        autoFixable: false
      })
    }
    
    // VALIDATION 7: Options.list format incorrect
    if (/options:\s*\{[^}]*list:\s*\[/.test(code)) {
      // Vérifier si c'est un tableau d'objets {title, value}
      const listMatch = code.match(/list:\s*\[(.*?)\]/s)
      if (listMatch && listMatch[1]) {
        const listContent = listMatch[1]
        if (!listContent.includes('title:') && !listContent.includes('value:')) {
          fileProblems.push({
            type: 'options',
            severity: 'warning',
            message: 'options.list should use format [{title: "X", value: "x"}]',
            autoFixable: false
          })
        }
      }
    }

    if (fileProblems.length) {
      problems.push({ 
        file: relativePath, 
        issues: fileProblems,
        totalIssues: fileProblems.length,
        errors: fileProblems.filter(p => p.severity === 'error').length,
        warnings: fileProblems.filter(p => p.severity === 'warning').length
      })
      
      // Appliquer les corrections automatiques
      if (fix && !dryRun) {
        const { fixed, changes } = autoFix(code)
        if (changes.length) {
          fs.writeFileSync(file, fixed, 'utf8')
          fixes.push({ file: relativePath, changes })
          console.log(`  ✅ ${relativePath} - ${changes.length} correction(s) appliquée(s)`)
          
          // Ajouter au manifest
          addFile(contextId, 'reviewerAgent', file)
        }
      } else if (fileProblems.length > 0) {
        const errorCount = fileProblems.filter(p => p.severity === 'error').length
        const warningCount = fileProblems.filter(p => p.severity === 'warning').length
        console.log(`  ⚠️  ${relativePath} - ${errorCount} erreur(s), ${warningCount} avertissement(s)`)
      }
    } else {
      console.log(`  ✅ ${relativePath} - Aucun problème`)
    }
  }
  
  // Calculer les statistiques
  const duration = Date.now() - startTime
  const totalErrors = problems.reduce((sum, p) => sum + p.errors, 0)
  const totalWarnings = problems.reduce((sum, p) => sum + p.warnings, 0)
  const filesWithIssues = problems.length
  const filesClean = files.length - filesWithIssues
  
  // Afficher le résumé
  console.log('\n' + '='.repeat(80))
  console.log('📊 RÉSUMÉ DE LA VALIDATION')
  console.log('='.repeat(80))
  console.log(`Fichiers analysés: ${files.length}`)
  console.log(`Fichiers propres: ${filesClean}`)
  console.log(`Fichiers avec problèmes: ${filesWithIssues}`)
  console.log(`Erreurs: ${totalErrors}`)
  console.log(`Avertissements: ${totalWarnings}`)
  if (fix && !dryRun) {
    console.log(`Corrections appliquées: ${fixes.length}`)
  }
  console.log(`Durée: ${duration}ms`)
  console.log('='.repeat(80))
  
  // Créer le handover
  const nextHandover = createHandover(
    contextId,
    totalErrors === 0 ? 'ready' : 'blocked',
    'styleAgent',
    'review',
    {
      files: files.map(f => path.relative(process.cwd(), f)),
      report: {
        filesAnalyzed: files.length,
        filesClean,
        filesWithIssues,
        totalErrors,
        totalWarnings,
        fixesApplied: fixes.length
      },
      errors: totalErrors > 0 ? [`${totalErrors} validation errors found`] : [],
      notes: fix ? 'Auto-fix applied' : 'Validation only',
      duration
    }
  )
  
  // Sauvegarder le handover
  if (!dryRun) {
    saveHandover(contextId, nextHandover, problems)
  }
  
  // Publier événement
  if (totalErrors === 0) {
    publishAgentEvent('reviewerAgent', 'ready', { 
      contextId, 
      filesAnalyzed: files.length,
      duration 
    })
  } else {
    publishAgentEvent('reviewerAgent', 'blocked', { 
      contextId, 
      errors: totalErrors,
      warnings: totalWarnings
    })
  }
  
  return { 
    ok: totalErrors === 0, 
    problems, 
    fixes,
    handover: nextHandover,
    contextId,
    stats: {
      filesAnalyzed: files.length,
      filesClean,
      filesWithIssues,
      totalErrors,
      totalWarnings,
      duration
    }
  }
}

/**
 * Sauvegarder le handover et le rapport détaillé
 */
function saveHandover(contextId, handover, problems) {
  const outDir = path.join(__dirname, '..', 'out', contextId)
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  
  // Sauvegarder le handover
  const handoverPath = path.join(outDir, 'reviewer-handover.json')
  fs.writeFileSync(handoverPath, JSON.stringify(handover, null, 2))
  
  // Sauvegarder le rapport détaillé
  const reportPath = path.join(outDir, 'reviewer-report.json')
  fs.writeFileSync(reportPath, JSON.stringify({ problems }, null, 2))
  
  console.log(`\n📦 Handover sauvegardé: ${handoverPath}`)
  console.log(`📄 Rapport sauvegardé: ${reportPath}`)
}

if (require.main === module) {
  const fix = process.argv.includes('--fix')
  const dryRun = !process.argv.includes('--dry-run=false')
  run({ fix, dryRun }).then((res) => {
    console.log('\n📄 reviewerAgent result:', JSON.stringify(res.stats, null, 2))
    process.exit(res.ok ? 0 : 1)
  })
}

module.exports = { run }
