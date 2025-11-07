/**
 * 🤖 API AUTO-GENERATE
 * 
 * Orchestre tous les agents pour générer un site complet
 * Utilise le seniorAgent comme orchestrateur principal
 */

import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Stream de progression
function createProgressStream() {
  const encoder = new TextEncoder()
  
  return new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`))
    }
  })
}

export async function POST(request: NextRequest) {
  const config = await request.json()
  
  const { readable, writable } = createProgressStream()
  const writer = writable.getWriter()
  
  // Exécuter la génération en arrière-plan
  generateSite(config, writer).catch(err => {
    writer.write({ type: 'error', error: err.message })
    writer.close()
  })
  
  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
}

type AgentResult = { ok: boolean } & Record<string, any>

async function generateSite(config: any, writer: any) {
  const startTime = Date.now()
  
  // Calculer le nombre total d'étapes
  const pagesCount = config.pages?.length || 0
  const total = pagesCount + 6 // pages + 6 étapes du pipeline
  let current = 0
  
  const results: {
    pages: any[]
    pipeline?: any
    compatibility: boolean
    duration: number
    contextId?: string
  } = {
    pages: [],
    compatibility: false,
    duration: 0
  }
  
  try {
    // Étape 1: Analyser le projet (analystAgent)
    current++
    writer.write({
      type: 'progress',
      progress: { current, total, message: '🔍 Analyse du projet...' }
    })
    
    const { run: analyzeRun } = require('../../../../agents/analystAgent')
    const analysisResult = await analyzeRun({ 
      prompt: buildPromptFromConfig(config),
      config,
      dryRun: false 
    })
    
    if (!analysisResult.ok) {
      throw new Error('Erreur lors de l\'analyse du projet')
    }
    
    results.contextId = analysisResult.contextId
    
    // Étape 2: Générer les pages
    if (config.pages && config.pages.length > 0) {
      writer.write({
        type: 'progress',
        progress: { current, total, message: '📝 Génération des pages...' }
      })
      
      const { run: pageGenRun } = require('../../../../agents/pageGeneratorAgent')
      
      for (const pageName of config.pages) {
        current++
        writer.write({
          type: 'progress',
          progress: { current, total, message: `📄 Création de "${pageName}"...` }
        })
        
        try {
          const result = await pageGenRun({ 
            pageName, 
            config: {
              siteName: config.siteName,
              primaryColor: config.primaryColor,
              designStyle: config.designStyle
            },
            handover: analysisResult.handover,
            dryRun: false 
          })
          results.pages.push({ page: pageName, success: result.ok, result })
        } catch (error: any) {
          results.pages.push({ page: pageName, success: false, error: error.message })
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    // Étape 3: Validation structurelle (reviewerAgent)
    current++
    writer.write({
      type: 'progress',
      progress: { current, total, message: '🔍 Validation structurelle...' }
    })
    const reviewRes = await runReviewer(true)

    // Étape 4: Validation design (styleAgent)
    current++
    writer.write({
      type: 'progress',
      progress: { current, total, message: '🎨 Validation du design...' }
    })
    const styleRes = await runStyle()

    // Étape 5: Tests de compatibilité (compatibilityAgent)
    current++
    writer.write({
      type: 'progress',
      progress: { current, total, message: '🧪 Tests de compatibilité...' }
    })
    const compatRes = await runCompatibility()
    results.compatibility = compatRes.ok

    // Étape 6: Diagnostic et auto-correction (diagnosticAgent)
    current++
    writer.write({
      type: 'progress',
      progress: { current, total, message: '🔧 Diagnostic et corrections...' }
    })
    const diagnosticRes = await runDiagnostic()

    // Étape 7: Publication (publisherAgent)
    current++
    writer.write({
      type: 'progress',
      progress: { current, total, message: '🚀 Publication dans Sanity...' }
    })
    const publishRes = await runPublisher()

    // Étape 8: Nettoyage (cleanupAgent)
    current++
    writer.write({
      type: 'progress',
      progress: { current, total, message: '🧹 Nettoyage final...' }
    })
    const cleanupRes = await runCleanup()
    
    results.pipeline = {
      review: reviewRes,
      style: styleRes,
      compatibility: compatRes,
      diagnostic: diagnosticRes,
      publish: publishRes,
      cleanup: cleanupRes
    }
    
    // Terminé
    results.duration = Math.round((Date.now() - startTime) / 1000)
    
    writer.write({
      type: 'complete',
      result: results
    })
    
  } catch (error: any) {
    writer.write({
      type: 'error',
      error: error.message
    })
  } finally {
    writer.close()
  }
}

/**
 * Construire un prompt détaillé depuis la configuration
 */
function buildPromptFromConfig(config: any): string {
  const parts = []
  
  parts.push(`Créer un site ${config.projectType || 'professionnel'}`)
  parts.push(`Nom: ${config.siteName}`)
  parts.push(`Description: ${config.siteDescription}`)
  parts.push(`Secteur: ${config.industry}`)
  
  if (config.targetAudience) {
    parts.push(`Public cible: ${config.targetAudience}`)
  }
  
  if (config.keyFeatures) {
    parts.push(`Fonctionnalités: ${config.keyFeatures}`)
  }
  
  parts.push(`Style: ${config.designStyle}`)
  parts.push(`Pages: ${config.pages.join(', ')}`)
  
  return parts.join('. ')
}

// --- Agent helpers ----------------------------------------------------------
async function runReviewer(fix: boolean): Promise<AgentResult> {
  try {
    const { run } = require('../../../../agents/reviewerAgent')
    return await run({ fix })
  } catch (error: any) {
    return { ok: false, error: error?.message || String(error) }
  }
}

async function runStyle(): Promise<AgentResult> {
  try {
    const { run } = require('../../../../agents/styleAgent')
    return await run()
  } catch (error: any) {
    return { ok: false, error: error?.message || String(error) }
  }
}

async function runCompatibility(): Promise<AgentResult> {
  try {
    const { run } = require('../../../../agents/compatibilityAgent')
    return await run({ dryRun: false })
  } catch (error: any) {
    return { ok: false, error: error?.message || String(error) }
  }
}

async function runDiagnostic(): Promise<AgentResult> {
  try {
    const { run } = require('../../../../agents/diagnosticAgent')
    return await run({ dryRun: false })
  } catch (error: any) {
    return { ok: false, error: error?.message || String(error) }
  }
}

async function runPublisher(): Promise<AgentResult> {
  try {
    const { run } = require('../../../../agents/publisherAgent')
    return await run()
  } catch (error: any) {
    return { ok: false, error: error?.message || String(error) }
  }
}

async function runCleanup(): Promise<AgentResult> {
  try {
    const { run } = require('../../../../agents/cleanupAgent')
    return await run({ dryRun: false })
  } catch (error: any) {
    return { ok: false, error: error?.message || String(error) }
  }
}
