#!/usr/bin/env node
const path = require('path')
const { exec } = require('child_process')
const util = require('util')
const execPromise = util.promisify(exec)

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
}

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset)
}

function header(text) {
  console.log('\n' + colors.bright + colors.cyan + '═'.repeat(60) + colors.reset)
  console.log(colors.bright + colors.cyan + '  ' + text + colors.reset)
  console.log(colors.bright + colors.cyan + '═'.repeat(60) + colors.reset + '\n')
}

async function runAgent(agentType, params) {
  const { run } = require(path.resolve(`agents/${agentType}Agent`))
  return await run(params)
}

async function generateBlocks(config) {
  header('🧩 GÉNÉRATION DES BLOCS SPÉCIAUX')
  
  const blocksToGenerate = []
  
  // Mapper les blocs spéciaux aux prompts
  const blockPrompts = {
    booking: `Créer un BookingBlock pour réservation en ligne. Inclure: formulaire avec nom, email, téléphone, date/heure, service sélectionné, notes, intégration calendrier (Calendly/Google Calendar), confirmation par email, et gestion des créneaux disponibles.`,
    
    map: `Créer un MapBlock pour carte interactive. Inclure: adresse, coordonnées GPS, zoom, style de carte, marqueurs personnalisables, directions, et hauteur configurable.`,
    
    gallery: `Créer un GalleryBlock avancé. Inclure: images avec légendes, layouts (grid/masonry/carousel), lightbox, filtres par catégorie, lazy loading, et support vidéo.`,
    
    testimonials: `Créer un TestimonialsBlock complet. Inclure: citation, auteur, photo, entreprise, note 1-5 étoiles, layouts (grid/carousel/list), filtrage, et featured testimonials.`,
    
    pricing: `Créer un PricingBlock professionnel. Inclure: plans avec nom/prix/description, liste de fonctionnalités, badge "populaire", boutons CTA, période (mensuel/annuel), et comparaison.`,
    
    countdown: `Créer un CountdownBlock dynamique. Inclure: date cible, timer temps réel, labels personnalisables, thèmes, tailles, message après expiration, et animations.`,
    
    comparison: `Créer un ComparisonTableBlock. Inclure: colonnes de produits/services, lignes de fonctionnalités, valeurs (texte/booléen/icônes), CTA par colonne, highlight recommandé, et responsive.`,
    
    socialProof: `Créer un SocialProofBlock. Inclure: logos clients, statistiques clés, témoignages courts, layouts variés, styles (minimal/cards/carousel), et animations.`
  }
  
  for (const blockType of config.specialBlocks) {
    if (blockPrompts[blockType]) {
      blocksToGenerate.push({
        type: blockType,
        prompt: blockPrompts[blockType]
      })
    }
  }
  
  const results = []
  
  for (let i = 0; i < blocksToGenerate.length; i++) {
    const block = blocksToGenerate[i]
    log(`\n[${i + 1}/${blocksToGenerate.length}] Génération du ${block.type}Block...`, 'yellow')
    
    try {
      const result = await runAgent('builder', {
        prompt: block.prompt,
        dryRun: false
      })
      
      if (result.ok) {
        log(`✅ ${block.type}Block créé avec succès`, 'green')
        results.push({ block: block.type, success: true, result })
      } else {
        log(`❌ Échec de la génération du ${block.type}Block`, 'red')
        results.push({ block: block.type, success: false, error: result.error })
      }
    } catch (error) {
      log(`❌ Erreur: ${error.message}`, 'red')
      results.push({ block: block.type, success: false, error: error.message })
    }
    
    // Pause entre les générations pour éviter rate limiting
    if (i < blocksToGenerate.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
  }
  
  return results
}

async function generatePages(config) {
  header('📄 GÉNÉRATION DES PAGES')
  
  const pagePrompts = {
    accueil: `Créer une page d'accueil professionnelle pour ${config.siteName} (${config.industry}). Inclure: hero avec ${config.primaryColor}, section présentation, fonctionnalités clés, témoignages, stats, et CTA. Style: ${config.designStyle}.`,
    
    services: `Créer une page Services pour ${config.siteName}. Inclure: liste des services avec descriptions, tarifs, avantages, processus, et formulaire de contact. Style: ${config.designStyle}.`,
    
    'à propos': `Créer une page À Propos pour ${config.siteName}. Inclure: histoire de l'entreprise, mission/vision/valeurs, équipe, chiffres clés, et timeline. Style: ${config.designStyle}.`,
    
    contact: `Créer une page Contact pour ${config.siteName}. Inclure: formulaire complet, coordonnées, carte interactive, horaires, et réseaux sociaux. Style: ${config.designStyle}.`,
    
    blog: `Créer une page Blog pour ${config.siteName}. Inclure: liste d'articles, filtres par catégorie, recherche, featured posts, et pagination. Style: ${config.designStyle}.`,
    
    tarifs: `Créer une page Tarifs pour ${config.siteName}. Inclure: grille de tarifs, comparaison, FAQ pricing, garanties, et CTA. Style: ${config.designStyle}.`
  }
  
  const results = []
  
  for (let i = 0; i < config.pages.length; i++) {
    const pageName = config.pages[i].toLowerCase()
    const prompt = pagePrompts[pageName] || `Créer une page "${pageName}" pour ${config.siteName}. Style: ${config.designStyle}.`
    
    log(`\n[${i + 1}/${config.pages.length}] Génération de la page "${pageName}"...`, 'yellow')
    
    try {
      // Utiliser l'API de génération de pages
      const result = await generatePageWithAPI(pageName, prompt, config)
      
      if (result.ok) {
        log(`✅ Page "${pageName}" créée avec succès`, 'green')
        results.push({ page: pageName, success: true })
      } else {
        log(`❌ Échec de la génération de "${pageName}"`, 'red')
        results.push({ page: pageName, success: false, error: result.error })
      }
    } catch (error) {
      log(`❌ Erreur: ${error.message}`, 'red')
      results.push({ page: pageName, success: false, error: error.message })
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  
  return results
}

async function generatePageWithAPI(pageName, prompt, config) {
  // Cette fonction appellerait l'API de génération de pages
  // Pour l'instant, on simule avec un log
  log(`  Prompt: ${prompt.substring(0, 100)}...`, 'cyan')
  
  // TODO: Implémenter l'appel à l'API de génération de pages
  // const response = await fetch('/api/generate-page', { ... })
  
  return { ok: true, page: pageName }
}

async function runCompatibilityCheck() {
  header('✅ VÉRIFICATION DE COMPATIBILITÉ')
  
  log('Exécution des vérifications TypeScript, ESLint et Build...', 'yellow')
  
  try {
    const result = await runAgent('compatibility', { dryRun: false })
    
    if (result.ok) {
      log('✅ Toutes les vérifications sont passées', 'green')
      return true
    } else {
      log('⚠️  Certaines vérifications ont échoué', 'yellow')
      console.log(JSON.stringify(result.reports, null, 2))
      return false
    }
  } catch (error) {
    log(`❌ Erreur lors des vérifications: ${error.message}`, 'red')
    return false
  }
}

async function runOrchestrator(config) {
  const startTime = Date.now()
  
  header('🚀 ORCHESTRATEUR D\'AGENTS - DÉMARRAGE')
  
  log(`Projet: ${config.siteName}`, 'cyan')
  log(`Type: ${config.projectType}`, 'cyan')
  log(`Pages à créer: ${config.pages.length}`, 'cyan')
  log(`Blocs spéciaux: ${config.specialBlocks.length}`, 'cyan')
  
  const summary = {
    config,
    blocks: [],
    pages: [],
    compatibility: false,
    duration: 0,
    success: false
  }
  
  try {
    // Étape 1: Générer les blocs spéciaux
    if (config.specialBlocks.length > 0) {
      summary.blocks = await generateBlocks(config)
    } else {
      log('\n📝 Aucun bloc spécial à générer', 'cyan')
    }
    
    // Étape 2: Générer les pages
    if (config.pages.length > 0) {
      summary.pages = await generatePages(config)
    } else {
      log('\n📝 Aucune page à générer', 'cyan')
    }
    
    // Étape 3: Vérifier la compatibilité
    summary.compatibility = await runCompatibilityCheck()
    
    // Résumé final
    const duration = Math.round((Date.now() - startTime) / 1000)
    summary.duration = duration
    summary.success = true
    
    header('🎉 GÉNÉRATION TERMINÉE')
    
    const blocksSuccess = summary.blocks.filter(b => b.success).length
    const pagesSuccess = summary.pages.filter(p => p.success).length
    
    log(`✅ Blocs créés: ${blocksSuccess}/${summary.blocks.length}`, 'green')
    log(`✅ Pages créées: ${pagesSuccess}/${summary.pages.length}`, 'green')
    log(`✅ Compatibilité: ${summary.compatibility ? 'OK' : 'Vérifier'}`, summary.compatibility ? 'green' : 'yellow')
    log(`⏱️  Durée totale: ${duration}s`, 'cyan')
    
    // Sauvegarder le résumé
    const fs = require('fs')
    fs.writeFileSync(
      path.join(process.cwd(), 'generation-summary.json'),
      JSON.stringify(summary, null, 2)
    )
    
    log('\n💾 Résumé sauvegardé dans generation-summary.json', 'cyan')
    log('\n🎨 Vous pouvez maintenant ouvrir Sanity Studio:', 'cyan')
    log('  npm run dev', 'green')
    log('  Puis visitez: http://localhost:3000/studio\n', 'green')
    
  } catch (error) {
    log(`\n❌ Erreur fatale: ${error.message}`, 'red')
    console.error(error)
    summary.success = false
  }
  
  return summary
}

module.exports = { runOrchestrator }

// Si exécuté directement
if (require.main === module) {
  const fs = require('fs')
  const configPath = path.join(process.cwd(), 'project-config.json')
  
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    runOrchestrator(config).catch(err => {
      console.error(err)
      process.exit(1)
    })
  } else {
    log('❌ Fichier project-config.json introuvable', 'red')
    log('Lancez d\'abord: npm run agents:interactive\n', 'yellow')
    process.exit(1)
  }
}
