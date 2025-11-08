/**
 * 🎬 INIT AGENT
 * 
 * Rôle: Détecte le premier démarrage et orchestre la génération automatique complète du site
 * 
 * Fonctionnalités:
 * - Détecte si le dataset est vierge (aucune page)
 * - Orchestre la génération de toutes les pages de base
 * - Crée le header et footer automatiquement
 * - Marque tous les documents comme générés par les agents
 * - Crée un rapport d'initialisation
 * 
 * Trigger: Premier démarrage du Studio ou dataset vierge
 */

const { loadEnv } = require('./core/env')
const { createClient } = require('@sanity/client')
const { createHandover, getOrCreateContextId } = require('./core/contracts')
const { publishAgentEvent } = require('./core/eventBus')
const { updateManifest, addPage } = require('./core/artifacts')
const fs = require('fs')
const path = require('path')

/**
 * Configuration des pages à générer automatiquement
 */
const DEFAULT_PAGES = [
  {
    title: 'Accueil',
    slug: 'home',
    description: 'Page d\'accueil générée automatiquement par les agents.',
    blocks: ['heroBlock', 'featureGridBlock', 'statsBlock', 'contactBlock'],
    isHome: true
  },
  {
    title: 'À propos',
    slug: 'about',
    description: 'Page d\'information sur l\'entreprise ou le projet.',
    blocks: ['heroBlock', 'textBlock']
  },
  {
    title: 'Services',
    slug: 'services',
    description: 'Liste des services proposés au client.',
    blocks: ['heroBlock', 'featureGridBlock']
  },
  {
    title: 'Contact',
    slug: 'contact',
    description: 'Page de contact avec formulaire et coordonnées.',
    blocks: ['heroBlock', 'contactBlock']
  },
  {
    title: 'Blog',
    slug: 'blog',
    description: 'Page listant les articles du site.',
    blocks: ['heroBlock', 'blogBlock']
  }
]

/**
 * Template du header par défaut
 */
const HEADER_TEMPLATE = {
  _type: 'headerSettings',
  _id: 'headerSettings',
  title: 'Navigation principale',
  logo: {
    text: 'Mon Site'
  },
  menuItems: [
    { _key: 'menu-home', label: 'Accueil', url: '/', _type: 'menuItem' },
    { _key: 'menu-services', label: 'Services', url: '/services', _type: 'menuItem' },
    { _key: 'menu-about', label: 'À propos', url: '/about', _type: 'menuItem' },
    { _key: 'menu-blog', label: 'Blog', url: '/blog', _type: 'menuItem' },
    { _key: 'menu-contact', label: 'Contact', url: '/contact', _type: 'menuItem' }
  ],
  generatedByAgents: true,
  generatedAt: new Date().toISOString()
}

/**
 * Template du footer par défaut
 */
const FOOTER_TEMPLATE = {
  _type: 'footerSettings',
  _id: 'footerSettings',
  title: 'Bas de page',
  columns: [
    {
      _key: 'col-1',
      title: 'Navigation',
      links: [
        { _key: 'link-home', label: 'Accueil', url: '/' },
        { _key: 'link-services', label: 'Services', url: '/services' },
        { _key: 'link-about', label: 'À propos', url: '/about' }
      ]
    },
    {
      _key: 'col-2',
      title: 'Légal',
      links: [
        { _key: 'link-legal', label: 'Mentions légales', url: '/mentions-legales' },
        { _key: 'link-privacy', label: 'Politique de confidentialité', url: '/confidentialite' }
      ]
    }
  ],
  contactInfo: {
    email: 'contact@site.com',
    phone: '+1 (000) 000-0000'
  },
  generatedByAgents: true,
  generatedAt: new Date().toISOString()
}

/**
 * Vérifie si le dataset est vierge (première initialisation)
 */
async function isFirstInit(client) {
  try {
    const pages = await client.fetch(`count(*[_type == "page"])`)
    const headerExists = await client.fetch(`*[_id == "headerSettings"][0]`)
    const footerExists = await client.fetch(`*[_id == "footerSettings"][0]`)
    
    return pages === 0 && !headerExists && !footerExists
  } catch (error) {
    console.error('Erreur lors de la vérification:', error.message)
    return false
  }
}

/**
 * Génère toutes les pages de base
 */
async function generatePages(client, contextId, config = {}) {
  const { run: pageGenRun } = require('./pageGeneratorAgent')
  const generatedPages = []
  
  console.log('\n📄 Génération des pages de base...')
  console.log('='.repeat(80))
  
  for (const pageConfig of DEFAULT_PAGES) {
    console.log(`\n  → Création de "${pageConfig.title}"...`)
    
    try {
      const result = await pageGenRun({
        pageName: pageConfig.title,
        config: {
          siteName: config.siteName || 'Mon Site',
          primaryColor: config.primaryColor || '#3b82f6',
          designStyle: config.designStyle || 'modern',
          description: pageConfig.description
        },
        handover: { contextId },
        dryRun: false
      })
      
      if (result.ok) {
        // Ajouter le flag generatedByAgents
        await client
          .patch(result.id)
          .set({ 
            generatedByAgents: true,
            generatedAt: new Date().toISOString(),
            generationContext: contextId
          })
          .commit()
        
        generatedPages.push({
          title: pageConfig.title,
          slug: pageConfig.slug,
          id: result.id,
          success: true
        })
        
        console.log(`    ✅ ${pageConfig.title} créée (${result.id})`)
      } else {
        generatedPages.push({
          title: pageConfig.title,
          slug: pageConfig.slug,
          success: false,
          error: result.error
        })
        console.log(`    ❌ Erreur: ${result.error}`)
      }
    } catch (error) {
      generatedPages.push({
        title: pageConfig.title,
        slug: pageConfig.slug,
        success: false,
        error: error.message
      })
      console.log(`    ❌ Erreur: ${error.message}`)
    }
    
    // Petit délai entre chaque page
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  return generatedPages
}

/**
 * Crée le header par défaut
 */
async function createHeader(client, config = {}) {
  console.log('\n🎯 Création du header...')
  
  try {
    const header = {
      ...HEADER_TEMPLATE,
      logo: {
        text: config.siteName || 'Mon Site'
      }
    }
    
    await client.createOrReplace(header)
    console.log('  ✅ Header créé')
    return { success: true, id: 'headerSettings' }
  } catch (error) {
    console.log(`  ❌ Erreur: ${error.message}`)
    return { success: false, error: error.message }
  }
}

/**
 * Crée le footer par défaut
 */
async function createFooter(client, config = {}) {
  console.log('\n🦶 Création du footer...')
  
  try {
    const footer = {
      ...FOOTER_TEMPLATE,
      contactInfo: {
        email: config.email || 'contact@site.com',
        phone: config.phone || '+1 (000) 000-0000'
      }
    }
    
    await client.createOrReplace(footer)
    console.log('  ✅ Footer créé')
    return { success: true, id: 'footerSettings' }
  } catch (error) {
    console.log(`  ❌ Erreur: ${error.message}`)
    return { success: false, error: error.message }
  }
}

/**
 * Crée un document de bienvenue
 */
async function createWelcomeDoc(client, contextId, results) {
  const welcomeDoc = {
    _type: 'blockDocumentation',
    _id: 'welcome-auto-generation',
    blockType: 'system',
    title: '🎉 Bienvenue dans votre Studio Sanity !',
    description: `Les pages principales ont été générées automatiquement par le système d'agents intelligents.

**Pages créées:** ${results.pages.filter(p => p.success).length}/${results.pages.length}
**Header:** ${results.header.success ? '✅' : '❌'}
**Footer:** ${results.footer.success ? '✅' : '❌'}

**Context ID:** ${contextId}
**Date:** ${new Date().toISOString()}

Vous pouvez maintenant personnaliser ces pages dans la section "📄 Pages" du Studio.`,
    generatedByAgents: true,
    generatedAt: new Date().toISOString()
  }
  
  try {
    await client.createOrReplace(welcomeDoc)
    console.log('\n📋 Document de bienvenue créé')
  } catch (error) {
    console.log(`\n⚠️  Impossible de créer le document de bienvenue: ${error.message}`)
  }
}

/**
 * Fonction principale d'initialisation
 */
async function run({ config = {}, force = false } = {}) {
  const startTime = Date.now()
  console.log('\n🎬 INIT AGENT - Initialisation automatique du site')
  console.log('='.repeat(80))
  
  const contextId = getOrCreateContextId()
  publishAgentEvent('initAgent', 'start', { contextId })
  
  // Charger l'environnement
  const env = loadEnv()
  if (!env.ok) {
    console.error('\n❌ Variables d\'environnement manquantes:', env.missing)
    return { ok: false, error: 'Missing env vars', missing: env.missing }
  }
  
  const client = createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    token: env.token,
    useCdn: false,
  })
  
  // Vérifier si c'est la première initialisation
  const isFirst = await isFirstInit(client)
  
  if (!isFirst && !force) {
    console.log('\n⚠️  Le dataset contient déjà des pages.')
    console.log('   Utilisez force=true pour régénérer.')
    return { 
      ok: false, 
      error: 'Dataset already initialized',
      message: 'Use force=true to regenerate'
    }
  }
  
  console.log('\n✅ Dataset vierge détecté - Démarrage de la génération automatique...')
  
  const results = {
    pages: [],
    header: {},
    footer: {},
    contextId
  }
  
  // Générer les pages
  results.pages = await generatePages(client, contextId, config)
  
  // Créer le header
  results.header = await createHeader(client, config)
  
  // Créer le footer
  results.footer = await createFooter(client, config)
  
  // Créer le document de bienvenue
  await createWelcomeDoc(client, contextId, results)
  
  const duration = Date.now() - startTime
  
  // Résumé
  console.log('\n' + '='.repeat(80))
  console.log('📊 RÉSUMÉ DE L\'INITIALISATION')
  console.log('='.repeat(80))
  console.log(`✅ Pages créées: ${results.pages.filter(p => p.success).length}/${results.pages.length}`)
  console.log(`✅ Header: ${results.header.success ? 'Créé' : 'Échec'}`)
  console.log(`✅ Footer: ${results.footer.success ? 'Créé' : 'Échec'}`)
  console.log(`⏱️  Durée: ${Math.round(duration / 1000)}s`)
  console.log(`🆔 Context ID: ${contextId}`)
  console.log('='.repeat(80))
  
  // Créer le handover
  const handover = createInitHandover(contextId, 'done', null, {
    artifacts: {
      pages: results.pages,
      header: results.header,
      footer: results.footer,
      manifest: {
        autoGenerated: true,
        pagesCount: results.pages.filter(p => p.success).length,
        timestamp: new Date().toISOString()
      }
    },
    meta: {
      duration,
      timestamp: new Date().toISOString(),
      notes: 'Initialisation automatique du site terminée'
    }
  })
  
  // Sauvegarder le handover
  saveHandover(contextId, handover)
  
  publishAgentEvent('initAgent', 'done', { contextId, duration, results })
  
  return {
    ok: true,
    contextId,
    results,
    duration,
    handover
  }
}

/**
 * Créer un handover pour l'initialisation
 * Note: Utilise createHandover de core/contracts avec stage 'init'
 */
function createInitHandover(contextId, status, nextAgent, data = {}) {
  return createHandover(contextId, status, nextAgent, {
    ...data,
    stage: 'init'
  })
}

/**
 * Sauvegarder le handover
 */
function saveHandover(contextId, handover) {
  const outDir = path.join(__dirname, '..', 'out', contextId)
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  const handoverPath = path.join(outDir, 'init-handover.json')
  fs.writeFileSync(handoverPath, JSON.stringify(handover, null, 2))
  console.log(`\n📦 Handover sauvegardé: ${handoverPath}`)
}

// Exécution en ligne de commande
if (require.main === module) {
  const force = process.argv.includes('--force')
  const config = {
    siteName: process.argv.find(arg => arg.startsWith('--siteName='))?.split('=')[1] || 'Mon Site',
    primaryColor: process.argv.find(arg => arg.startsWith('--color='))?.split('=')[1] || '#3b82f6'
  }
  
  run({ config, force })
    .then(res => {
      console.log('\n✅ Initialisation terminée')
      process.exit(res.ok ? 0 : 1)
    })
    .catch(err => {
      console.error('❌ Erreur:', err)
      process.exit(1)
    })
}

module.exports = { run, isFirstInit }
