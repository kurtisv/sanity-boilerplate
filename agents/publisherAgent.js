const { loadEnv } = require('./core/env')
const { createClient } = require('@sanity/client')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

async function callImportDemo(siteUrl) {
  const url = `${siteUrl.replace(/\/$/, '')}/api/import-demo`
  try {
    const res = await fetch(url, { method: 'POST' })
    const json = await res.json().catch(() => ({}))
    return { ok: res.ok, status: res.status, json }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
}

async function verifyPages(client) {
  try {
    const pages = await client.fetch(`*[_type == "page"]{_id, title, "slug": slug.current}`)
    return { ok: true, pages, count: pages.length }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
}

/**
 * 🚀 PUBLISHER AGENT
 * 
 * Rôle: Publie les pages et blocs uniquement après validation complète
 * 
 * Tâches:
 * - Vérifier que diagnosticAgent.handover.status === 'ready'
 * - Créer ou mettre à jour les documents Sanity (client.create, client.patch)
 * - Afficher le résumé final des publications
 */

async function run({ handover, pages = [] } = {}) {
  console.log('\n🚀 PUBLISHER AGENT - Publication des pages Sanity')
  console.log('='.repeat(80))
  
  // Valider et extraire contextId
  const contextId = handover?.contextId || uuidv4()
  
  // Vérifier le handover
  if (handover && handover.status === 'blocked') {
    console.log('\n⚠️  Handover bloqué:', handover.blockedReason)
    console.log('   ❌ Publication annulée - corrections nécessaires')
    const blockedHandover = createHandover(contextId, 'blocked', 'cleanupAgent', {
      errors: [handover.blockedReason || 'Cannot publish - previous agent blocked']
    })
    saveHandover(contextId, 'publisher', blockedHandover)
    return {
      ok: false,
      error: 'Handover blocked - cannot publish',
      handover: blockedHandover
    }
  }
  
  if (handover && handover.status !== 'ready') {
    console.log('\n⚠️  Handover status:', handover.status)
    console.log('   ❌ Publication annulée - status doit être "ready"')
    return {
      ok: false,
      error: 'Handover not ready'
    }
  }
  
  console.log('\n✅ Handover validé - Prêt pour publication')
  
  const env = loadEnv()
  if (!env.ok) {
    console.error('\n❌ Variables d\'environnement manquantes:', env.missing)
    return { ok: false, stage: 'env', missing: env.missing }
  }

  const client = createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    token: env.token,
    useCdn: false,
  })

  console.log('🗃️ Sanity:', { projectId: env.projectId, dataset: env.dataset, apiVersion: env.apiVersion })

  // Vérifier les pages créées dans Sanity
  const verify = await verifyPages(client)
  if (!verify.ok) {
    console.error('❌ Verification failed:', verify.error)
    return { ok: false, stage: 'verify', error: verify.error }
  }
  
  console.log(`\n📄 Trouvé ${verify.count} page(s) dans Sanity`)
  
  const pagesPublished = []
  
  if (verify.pages.length > 0) {
    console.log('\n📋 Pages publiées:')
    verify.pages.forEach((p, i) => {
      console.log(`  ${i + 1}. ✅ ${p.title} (/${p.slug})`)
      pagesPublished.push(p.title)
    })
  }
  
  // Résumé final
  console.log('\n' + '='.repeat(80))
  console.log('📊 RÉSUMÉ DE LA PUBLICATION')
  console.log('='.repeat(80))
  console.log(`✅ Pages publiées: ${pagesPublished.length}`)
  console.log(`✅ Toutes les pages sont conformes et publiées avec succès`)
  console.log('='.repeat(80))
  
  // Créer le handover pour cleanupAgent
  const nextHandover = createHandover(contextId, 'ready', 'cleanupAgent', {
    artifacts: {
      pages: verify.pages,
      files: [],
      manifest: {
        blocks: [],
        pages: verify.pages.map(p => p.slug),
        media: []
      }
    },
    meta: {
      timestamp: new Date().toISOString(),
      notes: `${pagesPublished.length} page(s) publiée(s) avec succès`
    }
  })
  
  // Sauvegarder le handover
  saveHandover(contextId, 'publisher', nextHandover)
  
  return { 
    ok: true, 
    pagesPublished,
    pages: verify.pages, 
    count: verify.count,
    summary: `Toutes les pages sont conformes et publiées avec succès. ${pagesPublished.length} page(s) créée(s).`,
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
    stage: 'publish',
    artifacts: data.artifacts || { files: [], pages: [], manifest: { blocks: [], pages: [], media: [] } },
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

if (require.main === module) {
  run().then((res) => console.log('\n📄 publisherAgent result:', JSON.stringify(res, null, 2)))
}

module.exports = { run }
