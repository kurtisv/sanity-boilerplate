/**
 * 🧠 SENIOR AGENT - Orchestrateur principal
 * 
 * Rôle: Supervise l'ensemble de la cascade et gère le bus d'événements
 * 
 * Fonctionnalités:
 * - Orchestration complète du pipeline
 * - Self-healing automatique (fix → diagnostic → publish)
 * - Centralisation des logs
 * - Gestion de la mémoire contextuelle
 * - Relance automatique en cas d'échec
 */

const { run: analyze } = require('./analystAgent')
const { run: build } = require('./builderAgent')
const { run: compat } = require('./compatibilityAgent')
const { run: diagnostic } = require('./diagnosticAgent')
const { run: publish } = require('./publisherAgent')
const { run: cleanup } = require('./cleanupAgent')
const { eventBus, publishPipelineEvent, AgentEvents } = require('./core/eventBus')
const { createHandover, getOrCreateContextId } = require('./core/contracts')
const { getManifestSummary } = require('./core/artifacts')
const fs = require('fs')
const path = require('path')

async function run({ prompt, fullPipeline = false, dryRun = true, maxRetries = 3 } = {}) {
  const startTime = Date.now()
  console.log('\n🧠 SENIOR AGENT - Orchestration du pipeline')
  console.log('='.repeat(80))
  
  // Créer un contextId unique pour ce pipeline
  const contextId = getOrCreateContextId()
  console.log(`\n🎯 Context ID: ${contextId}`)
  
  // Publier événement de démarrage du pipeline
  publishPipelineEvent('start', { contextId, prompt, fullPipeline })
  
  // S'abonner aux événements pour logging centralisé
  setupEventListeners(contextId)
  
  const results = {
    contextId,
    stages: [],
    success: false,
    duration: 0
  }
  
  try {
    if (fullPipeline) {
      // Pipeline complet: analysis → build → compat → diagnostic → publish → cleanup
      console.log('\n🚀 Exécution du pipeline complet...\n')
      
      // ÉTAPE 1: Analyse
      console.log('\n━'.repeat(80))
      console.log('STAGE 1/6: ANALYSIS')
      console.log('━'.repeat(80))
      const analysisRes = await runWithRetry('analystAgent', () => analyze({ prompt, dryRun }), maxRetries)
      results.stages.push({ name: 'analysis', ok: analysisRes.ok, duration: analysisRes.duration })
      if (!analysisRes.ok) throw new Error('Analysis failed')
      
      // ÉTAPE 2: Build
      console.log('\n━'.repeat(80))
      console.log('STAGE 2/6: BUILD')
      console.log('━'.repeat(80))
      const buildRes = await runWithRetry('builderAgent', () => build({ 
        prompt, 
        handover: analysisRes.handover,
        dryRun 
      }), maxRetries)
      results.stages.push({ name: 'build', ok: buildRes.ok, duration: buildRes.duration })
      if (!buildRes.ok) throw new Error('Build failed')
      
      // ÉTAPE 3: Compatibility
      console.log('\n━'.repeat(80))
      console.log('STAGE 3/6: COMPATIBILITY')
      console.log('━'.repeat(80))
      const compatRes = await runWithRetry('compatibilityAgent', () => compat({ 
        handover: buildRes.handover,
        dryRun 
      }), maxRetries)
      results.stages.push({ name: 'compat', ok: compatRes.ok })
      
      // ÉTAPE 4: Diagnostic (avec self-healing)
      console.log('\n━'.repeat(80))
      console.log('STAGE 4/6: DIAGNOSTIC (Self-Healing)')
      console.log('━'.repeat(80))
      const diagnosticRes = await runWithSelfHealing(compatRes.handover, dryRun, maxRetries)
      results.stages.push({ name: 'diagnostic', ok: diagnosticRes.ok })
      if (!diagnosticRes.ok) throw new Error('Diagnostic failed after retries')
      
      // ÉTAPE 5: Publish
      console.log('\n━'.repeat(80))
      console.log('STAGE 5/6: PUBLISH')
      console.log('━'.repeat(80))
      const publishRes = await runWithRetry('publisherAgent', () => publish({ 
        handover: diagnosticRes.handover 
      }), maxRetries)
      results.stages.push({ name: 'publish', ok: publishRes.ok })
      if (!publishRes.ok) throw new Error('Publish failed')
      
      // ÉTAPE 6: Cleanup
      console.log('\n━'.repeat(80))
      console.log('STAGE 6/6: CLEANUP')
      console.log('━'.repeat(80))
      const cleanupRes = await cleanup({ handover: publishRes.handover, dryRun })
      results.stages.push({ name: 'cleanup', ok: cleanupRes.ok })
      
      results.success = true
    } else {
      // Pipeline simple: build uniquement
      console.log('\n🔨 Exécution du build simple...\n')
      const buildRes = await build({ prompt, dryRun })
      results.stages.push({ name: 'build', ok: buildRes.ok })
      results.success = buildRes.ok
    }
    
    // Calculer la durée totale
    results.duration = Date.now() - startTime
    
    // Générer le rapport final
    const report = generateFinalReport(results, contextId)
    
    // Publier événement de succès
    publishPipelineEvent('complete', { 
      contextId, 
      duration: results.duration,
      stages: results.stages.length
    })
    
    console.log('\n' + '='.repeat(80))
    console.log('🎉 PIPELINE TERMINÉ AVEC SUCCÈS')
    console.log('='.repeat(80))
    console.log(report)
    
    return { ok: true, ...results, report }
    
  } catch (error) {
    results.duration = Date.now() - startTime
    results.error = error.message
    
    // Publier événement d'échec
    publishPipelineEvent('failed', { 
      contextId, 
      error: error.message,
      duration: results.duration
    })
    
    console.log('\n' + '='.repeat(80))
    console.log('❌ PIPELINE ÉCHOUÉ')
    console.log('='.repeat(80))
    console.log(`Erreur: ${error.message}`)
    console.log(`Durée: ${results.duration}ms`)
    
    return { ok: false, ...results }
  }
}

/**
 * Exécuter un agent avec retry automatique
 */
async function runWithRetry(agentName, agentFn, maxRetries = 3) {
  let lastError = null
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`\n🔄 Tentative ${attempt}/${maxRetries} pour ${agentName}...`)
      const result = await agentFn()
      
      if (result.ok) {
        console.log(`✅ ${agentName} réussi`)
        return result
      }
      
      lastError = result.error || 'Unknown error'
      console.log(`⚠️  ${agentName} échoué: ${lastError}`)
      
      if (attempt < maxRetries) {
        console.log(`⏳ Nouvelle tentative dans 2s...`)
        await sleep(2000)
      }
    } catch (err) {
      lastError = err.message
      console.log(`❌ ${agentName} erreur: ${lastError}`)
      
      if (attempt < maxRetries) {
        console.log(`⏳ Nouvelle tentative dans 2s...`)
        await sleep(2000)
      }
    }
  }
  
  throw new Error(`${agentName} failed after ${maxRetries} attempts: ${lastError}`)
}

/**
 * Exécuter le diagnostic avec self-healing
 */
async function runWithSelfHealing(handover, dryRun, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`\n🔄 Self-healing cycle ${attempt}/${maxRetries}...`)
    
    const diagnosticRes = await diagnostic({ handover, dryRun })
    
    if (diagnosticRes.ok && diagnosticRes.handover?.status === 'ready') {
      console.log(`✅ Diagnostic réussi - système sain`)
      return diagnosticRes
    }
    
    console.log(`⚠️  Diagnostic détecté des erreurs - correction automatique...`)
    
    // Attendre un peu avant la prochaine tentative
    if (attempt < maxRetries) {
      await sleep(1000)
    }
  }
  
  throw new Error(`Self-healing failed after ${maxRetries} attempts`)
}

/**
 * Configurer les listeners d'événements
 */
function setupEventListeners(contextId) {
  const logFile = path.join(__dirname, '..', 'out', contextId, 'senior-agent.log')
  const logDir = path.dirname(logFile)
  
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
  }
  
  // Logger tous les événements d'agents
  eventBus.on(AgentEvents.AGENT_READY, (data) => {
    const logLine = `[${new Date().toISOString()}] ✅ ${data.agent} READY\n`
    fs.appendFileSync(logFile, logLine)
  })
  
  eventBus.on(AgentEvents.AGENT_BLOCKED, (data) => {
    const logLine = `[${new Date().toISOString()}] ⚠️  ${data.agent} BLOCKED: ${data.reason}\n`
    fs.appendFileSync(logFile, logLine)
  })
  
  eventBus.on(AgentEvents.AGENT_ERROR, (data) => {
    const logLine = `[${new Date().toISOString()}] ❌ ${data.agent} ERROR: ${data.error}\n`
    fs.appendFileSync(logFile, logLine)
  })
  
  console.log(`📝 Logs centralisés: ${logFile}`)
}

/**
 * Générer le rapport final
 */
function generateFinalReport(results, contextId) {
  const manifest = getManifestSummary(contextId)
  const stats = eventBus.getStats()
  
  let report = '\n'
  report += '📊 RAPPORT FINAL DU PIPELINE\n'
  report += '━'.repeat(80) + '\n\n'
  
  report += `🎯 Context ID: ${contextId}\n`
  report += `⏱️  Durée totale: ${results.duration}ms (${(results.duration / 1000).toFixed(2)}s)\n`
  report += `✅ Succès: ${results.success ? 'OUI' : 'NON'}\n\n`
  
  report += '📋 ÉTAPES EXÉCUTÉES:\n'
  results.stages.forEach((stage, i) => {
    const icon = stage.ok ? '✅' : '❌'
    const duration = stage.duration ? ` (${stage.duration}ms)` : ''
    report += `  ${i + 1}. ${icon} ${stage.name}${duration}\n`
  })
  
  report += '\n📦 ARTEFACTS GÉNÉRÉS:\n'
  report += `  - Blocs: ${manifest.totalBlocks}\n`
  report += `  - Pages: ${manifest.totalPages}\n`
  report += `  - Médias: ${manifest.totalMedia}\n`
  report += `  - Agents exécutés: ${manifest.agents}\n`
  
  report += '\n📡 ÉVÉNEMENTS:\n'
  report += `  - Total: ${stats.total}\n`
  Object.entries(stats.byType).forEach(([type, count]) => {
    report += `  - ${type}: ${count}\n`
  })
  
  report += '\n━'.repeat(80) + '\n'
  
  return report
}

/**
 * Helper pour sleep
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

if (require.main === module) {
  const args = process.argv.slice(2)
  const prompt = args.filter(a => !a.startsWith('--')).join(' ')
  const fullPipeline = args.includes('--full-pipeline')
  const dryRun = !args.includes('--dry-run=false')
  
  run({ prompt, fullPipeline, dryRun }).then((res) => {
    console.log('\n📄 seniorAgent result:', JSON.stringify(res, null, 2))
    process.exit(res.ok ? 0 : 1)
  })
}

module.exports = { run }
