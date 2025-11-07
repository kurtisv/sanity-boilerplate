/**
 * 🔎 ANALYST AGENT
 * 
 * Rôle: Analyse la requête et planifie la génération du site complet
 * 
 * Tâches:
 * - Analyser le prompt utilisateur
 * - Déterminer les blocs et pages à créer
 * - Définir le plan de génération
 * - Identifier les dépendances nécessaires (heroBlock, footerBlock, etc.)
 * 
 * Documentation requise:
 * - 01_AGENT_GUIDE_COMPLET.md
 * - 02_ERREURS_ET_CORRECTIONS.md
 * - 03_SANITY_SCHEMAS_GUIDE.md
 * - 04_PROTECTION_SYSTEME.md
 * - 05_QUICK_REFERENCE.md
 */

const fs = require('fs')
const path = require('path')
const { loadEnv } = require('./core/env')

// Charger la documentation obligatoire
function loadDocumentation() {
  const docs = [
    '01_AGENT_GUIDE_COMPLET.md',
    '02_ERREURS_ET_CORRECTIONS.md',
    '03_SANITY_SCHEMAS_GUIDE.md',
    '04_PROTECTION_SYSTEME.md',
    '05_QUICK_REFERENCE.md'
  ]
  
  let documentation = ''
  docs.forEach(doc => {
    const docPath = path.join(__dirname, '..', doc)
    if (fs.existsSync(docPath)) {
      documentation += fs.readFileSync(docPath, 'utf8') + '\n\n'
      console.log(`  ✅ Chargé: ${doc}`)
    } else {
      console.log(`  ⚠️  Manquant: ${doc}`)
    }
  })
  
  return documentation
}

// Blocs disponibles (selon 01_AGENT_GUIDE_COMPLET.md)
const AVAILABLE_BLOCKS = [
  'textBlock', 'heroBlock', 'headerBlock', 'footerBlock',
  'featureGridBlock', 'contactBlock', 'galleryBlock', 'teamBlock',
  'statsBlock', 'blogBlock', 'pricingBlock', 'testimonialsBlock',
  'ctaBlock', 'faqBlock', 'logoCloudBlock', 'videoBlock',
  'accordionBlock', 'tabsBlock', 'newsletterBlock', 'logoGridBlock',
  'countdownBlock', 'mapBlock', 'comparisonTableBlock', 'socialProofBlock'
]

// Pages par défaut selon type de projet
const DEFAULT_PAGES_BY_TYPE = {
  corporate: ['accueil', 'services', 'a-propos', 'contact'],
  ecommerce: ['accueil', 'services', 'tarifs', 'contact'],
  blog: ['accueil', 'blog', 'a-propos', 'contact'],
  portfolio: ['accueil', 'portfolio', 'a-propos', 'contact'],
  services: ['accueil', 'services', 'tarifs', 'contact'],
  landing: ['accueil', 'contact'],
  restaurant: ['accueil', 'services', 'contact'],
  health: ['accueil', 'services', 'equipe', 'contact'],
  custom: ['accueil', 'contact']
}

async function run({ prompt, projectType = 'corporate', dryRun = true } = {}) {
  console.log('\n🔎 ANALYST AGENT - Analyse de la requête')
  console.log('='.repeat(80))
  
  const env = loadEnv()
  
  // Charger la documentation
  console.log('\n📚 Chargement de la documentation obligatoire...')
  const documentation = loadDocumentation()
  
  // Analyser le prompt
  console.log('\n📋 Analyse du prompt utilisateur...')
  const userPrompt = prompt || 'Créer un site corporate complet'
  console.log(`  Prompt: "${userPrompt}"`)
  console.log(`  Type de projet: ${projectType}`)
  
  // Déterminer les pages à créer
  const pages = DEFAULT_PAGES_BY_TYPE[projectType] || DEFAULT_PAGES_BY_TYPE.custom
  console.log(`\n📄 Pages à créer (${pages.length}):`, pages.join(', '))
  
  // Déterminer les blocs nécessaires
  const requiredBlocks = new Set()
  
  // Blocs obligatoires pour toutes les pages
  requiredBlocks.add('headerBlock')
  requiredBlocks.add('footerBlock')
  requiredBlocks.add('heroBlock')
  
  // Blocs selon le type de projet
  if (projectType === 'corporate' || projectType === 'services') {
    requiredBlocks.add('featureGridBlock')
    requiredBlocks.add('statsBlock')
    requiredBlocks.add('testimonialsBlock')
    requiredBlocks.add('contactBlock')
  }
  
  if (projectType === 'ecommerce') {
    requiredBlocks.add('pricingBlock')
    requiredBlocks.add('featureGridBlock')
    requiredBlocks.add('testimonialsBlock')
  }
  
  if (projectType === 'blog') {
    requiredBlocks.add('blogBlock')
    requiredBlocks.add('newsletterBlock')
  }
  
  if (projectType === 'portfolio') {
    requiredBlocks.add('galleryBlock')
    requiredBlocks.add('teamBlock')
  }
  
  // Toujours ajouter contact pour la page contact
  if (pages.includes('contact')) {
    requiredBlocks.add('contactBlock')
  }
  
  const blocksArray = Array.from(requiredBlocks)
  console.log(`\n🧩 Blocs nécessaires (${blocksArray.length}):`, blocksArray.join(', '))
  
  // Créer le plan de génération
  const plan = {
    projectType,
    pages: pages.map(pageId => ({
      id: pageId,
      title: pageId.charAt(0).toUpperCase() + pageId.slice(1).replace('-', ' '),
      slug: pageId,
      blocks: getBlocksForPage(pageId, blocksArray)
    })),
    blocks: blocksArray,
    dependencies: {
      headerBlock: { required: true, reason: 'Navigation du site' },
      footerBlock: { required: true, reason: 'Pied de page du site' },
      heroBlock: { required: true, reason: 'Section d\'accueil' },
      contactBlock: pages.includes('contact') ? { required: true, reason: 'Page contact' } : { required: false }
    }
  }
  
  console.log('\n✅ Plan de génération créé')
  console.log(`  - ${plan.pages.length} pages`)
  console.log(`  - ${plan.blocks.length} blocs uniques`)
  console.log(`  - ${Object.keys(plan.dependencies).length} dépendances identifiées`)
  
  // Vérifier l'environnement
  if (!env.ok) {
    console.log('\n⚠️  Variables d\'environnement manquantes:', env.missing)
  }
  
  // Créer le handover pour builderAgent
  const handover = {
    status: env.ok ? 'ready' : 'blocked',
    nextAgent: 'builderAgent',
    context: {
      plan,
      documentation,
      projectType,
      userPrompt,
      timestamp: new Date().toISOString()
    },
    blockedReason: env.ok ? null : `Variables manquantes: ${env.missing.join(', ')}`
  }
  
  console.log('\n📦 Handover préparé pour builderAgent')
  console.log(`  Status: ${handover.status}`)
  console.log(`  Next Agent: ${handover.nextAgent}`)
  
  return {
    ok: env.ok,
    plan: plan.pages,
    blocks: plan.blocks,
    dependencies: plan.dependencies,
    handover,
    envOk: env.ok,
    envMissing: env.missing
  }
}

// Déterminer les blocs pour chaque page
function getBlocksForPage(pageId, availableBlocks) {
  const blocksByPage = {
    accueil: ['heroBlock', 'featureGridBlock', 'statsBlock', 'testimonialsBlock', 'ctaBlock'],
    services: ['heroBlock', 'featureGridBlock', 'pricingBlock', 'ctaBlock'],
    'a-propos': ['heroBlock', 'textBlock', 'teamBlock', 'statsBlock'],
    contact: ['heroBlock', 'contactBlock'],
    blog: ['heroBlock', 'blogBlock', 'newsletterBlock'],
    tarifs: ['heroBlock', 'pricingBlock', 'faqBlock', 'ctaBlock'],
    portfolio: ['heroBlock', 'galleryBlock', 'ctaBlock'],
    faq: ['heroBlock', 'faqBlock'],
    temoignages: ['heroBlock', 'testimonialsBlock'],
    equipe: ['heroBlock', 'teamBlock']
  }
  
  const blocks = blocksByPage[pageId] || ['heroBlock', 'textBlock']
  return blocks.filter(b => availableBlocks.includes(b))
}

if (require.main === module) {
  run({ prompt: process.argv.slice(2).join(' ') }).then((res) => {
    console.log('\n📄 analystAgent result:', JSON.stringify(res, null, 2))
  })
}

module.exports = { run }
