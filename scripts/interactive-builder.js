#!/usr/bin/env node
require('dotenv').config()
const readline = require('readline')
const path = require('path')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Couleurs pour le terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
}

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset)
}

function header(text) {
  console.log('\n' + colors.bright + colors.cyan + '═'.repeat(60) + colors.reset)
  console.log(colors.bright + colors.cyan + '  ' + text + colors.reset)
  console.log(colors.bright + colors.cyan + '═'.repeat(60) + colors.reset + '\n')
}

async function main() {
  console.clear()
  
  header('🤖 ASSISTANT DE CRÉATION AUTOMATIQUE')
  
  log('Bienvenue ! Je vais vous guider pour créer automatiquement', 'cyan')
  log('des blocs et des pages pour votre site Sanity.\n', 'cyan')
  
  // 1. Type de projet
  header('📋 ÉTAPE 1/5 - TYPE DE PROJET')
  
  log('Quel type de site souhaitez-vous créer ?', 'yellow')
  log('1. Site vitrine entreprise')
  log('2. Site e-commerce')
  log('3. Blog / Magazine')
  log('4. Portfolio')
  log('5. Site de services (massothérapie, salon, etc.)')
  log('6. Landing page produit')
  log('7. Autre (personnalisé)\n')
  
  const projectType = await question(colors.green + 'Votre choix (1-7): ' + colors.reset)
  
  // 2. Informations de base
  header('📝 ÉTAPE 2/5 - INFORMATIONS DE BASE')
  
  const siteName = await question(colors.green + 'Nom de votre entreprise/site: ' + colors.reset)
  const siteDescription = await question(colors.green + 'Description courte (1 phrase): ' + colors.reset)
  const industry = await question(colors.green + 'Secteur d\'activité: ' + colors.reset)
  
  // 3. Pages nécessaires
  header('📄 ÉTAPE 3/5 - PAGES À CRÉER')
  
  log('Quelles pages souhaitez-vous créer ? (séparées par des virgules)', 'yellow')
  log('Exemples: accueil, services, à propos, contact, blog, tarifs\n')
  
  const pagesInput = await question(colors.green + 'Pages: ' + colors.reset)
  const pages = pagesInput.split(',').map(p => p.trim()).filter(Boolean)
  
  // 4. Blocs spécifiques
  header('🧩 ÉTAPE 4/5 - BLOCS SPÉCIAUX')
  
  log('Avez-vous besoin de blocs spéciaux ?', 'yellow')
  log('1. Formulaire de réservation')
  log('2. Carte interactive avec localisation')
  log('3. Galerie photos/vidéos')
  log('4. Témoignages clients')
  log('5. Grille de tarifs')
  log('6. Compte à rebours (événement/promotion)')
  log('7. Tableau comparatif')
  log('8. Preuve sociale (logos clients, stats)')
  log('9. Aucun bloc spécial\n')
  
  const specialBlocksInput = await question(colors.green + 'Numéros des blocs souhaités (ex: 1,3,4): ' + colors.reset)
  const specialBlocks = specialBlocksInput ? specialBlocksInput.split(',').map(n => parseInt(n.trim())) : []
  
  // 5. Style et préférences
  header('🎨 ÉTAPE 5/5 - STYLE ET PRÉFÉRENCES')
  
  log('Couleur principale de votre marque (ex: #667eea, bleu, rouge):', 'yellow')
  const primaryColor = await question(colors.green + 'Couleur: ' + colors.reset)
  
  log('\nStyle de design préféré:', 'yellow')
  log('1. Moderne et minimaliste')
  log('2. Professionnel et corporate')
  log('3. Créatif et coloré')
  log('4. Élégant et luxueux\n')
  const designStyle = await question(colors.green + 'Style (1-4): ' + colors.reset)
  
  // Récapitulatif
  header('📊 RÉCAPITULATIF')
  
  const config = {
    projectType: getProjectTypeName(projectType),
    siteName,
    siteDescription,
    industry,
    pages,
    specialBlocks: specialBlocks.map(n => getSpecialBlockName(n)).filter(Boolean),
    primaryColor,
    designStyle: getDesignStyleName(designStyle)
  }
  
  console.log(JSON.stringify(config, null, 2))
  
  log('\n✨ Configuration enregistrée !', 'green')
  log('\nVoulez-vous lancer la génération automatique maintenant ?', 'yellow')
  const confirm = await question(colors.green + '(o/n): ' + colors.reset)
  
  if (confirm.toLowerCase() === 'o' || confirm.toLowerCase() === 'oui') {
    rl.close()
    
    // Lancer l'orchestrateur
    log('\n🚀 Lancement de la génération automatique...', 'cyan')
    const { runOrchestrator } = require('./orchestrator')
    await runOrchestrator(config)
  } else {
    log('\n💾 Configuration sauvegardée dans project-config.json', 'cyan')
    log('Vous pouvez lancer la génération plus tard avec:', 'cyan')
    log('  npm run agents:generate\n', 'green')
    
    const fs = require('fs')
    fs.writeFileSync(
      path.join(process.cwd(), 'project-config.json'),
      JSON.stringify(config, null, 2)
    )
    
    rl.close()
  }
}

function getProjectTypeName(type) {
  const types = {
    '1': 'corporate',
    '2': 'ecommerce',
    '3': 'blog',
    '4': 'portfolio',
    '5': 'services',
    '6': 'landing',
    '7': 'custom'
  }
  return types[type] || 'custom'
}

function getSpecialBlockName(num) {
  const blocks = {
    1: 'booking',
    2: 'map',
    3: 'gallery',
    4: 'testimonials',
    5: 'pricing',
    6: 'countdown',
    7: 'comparison',
    8: 'socialProof'
  }
  return blocks[num]
}

function getDesignStyleName(style) {
  const styles = {
    '1': 'modern-minimal',
    '2': 'professional-corporate',
    '3': 'creative-colorful',
    '4': 'elegant-luxury'
  }
  return styles[style] || 'modern-minimal'
}

main().catch(err => {
  console.error(colors.red + '\n❌ Erreur: ' + err.message + colors.reset)
  rl.close()
  process.exit(1)
})
