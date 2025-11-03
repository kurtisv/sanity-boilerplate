#!/usr/bin/env node

/**
 * Script de configuration complète de la démo
 * Configure l'environnement et importe automatiquement la démo
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const readline = require('readline')

// Couleurs pour les logs
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}🚀 ${msg}${colors.reset}\n`)
}

async function setupDemo() {
  try {
    log.title('Configuration automatique de la démo Sanity')

    // Vérification du fichier .env.local
    const envPath = path.join(process.cwd(), '.env.local')
    
    if (!fs.existsSync(envPath)) {
      log.error('.env.local non trouvé. Veuillez configurer votre projet Sanity d\'abord.')
      log.info('Exécutez: npm run sanity:init')
      process.exit(1)
    }

    // Lecture des variables d'environnement
    const envContent = fs.readFileSync(envPath, 'utf8')
    const hasProjectId = envContent.includes('NEXT_PUBLIC_SANITY_PROJECT_ID')
    const hasToken = envContent.includes('SANITY_API_TOKEN')

    if (!hasProjectId) {
      log.error('NEXT_PUBLIC_SANITY_PROJECT_ID manquant dans .env.local')
      process.exit(1)
    }

    // Vérification/création du token API
    if (!hasToken) {
      log.warning('Token API Sanity manquant.')
      log.info('Un token avec droits d\'écriture est nécessaire pour importer la démo.')
      
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      console.log('\n📋 Instructions pour créer un token:')
      console.log('1. Allez sur https://sanity.io/manage')
      console.log('2. Sélectionnez votre projet')
      console.log('3. Allez dans "API" > "Tokens"')
      console.log('4. Créez un nouveau token avec droits "Editor"')
      console.log('5. Copiez le token généré\n')

      const token = await new Promise(resolve => {
        rl.question('Collez votre token API Sanity: ', resolve)
      })
      rl.close()

      if (!token.trim()) {
        log.error('Token requis pour continuer.')
        process.exit(1)
      }

      // Ajout du token au .env.local
      const newEnvContent = envContent + `\nSANITY_API_TOKEN=${token.trim()}\n`
      fs.writeFileSync(envPath, newEnvContent)
      log.success('Token ajouté à .env.local')
    }

    // Chargement des variables d'environnement
    require('dotenv').config({ path: envPath })

    // Import de la démo
    log.info('Lancement de l\'import de la démo...')
    const { importDemo } = require('./import-demo')
    await importDemo()

    // Instructions finales
    console.log('\n' + '='.repeat(60))
    log.title('🎉 Configuration terminée !')
    console.log('Prochaines étapes:')
    console.log('1. Démarrez le serveur: npm run dev')
    console.log('2. Ouvrez Sanity Studio: http://localhost:3000/studio')
    console.log('3. Consultez la démo: http://localhost:3000/demo')
    console.log('4. Lisez DEMO_SETUP.md pour plus de détails')
    console.log('='.repeat(60))

  } catch (error) {
    log.error(`Erreur lors de la configuration: ${error.message}`)
    process.exit(1)
  }
}

// Exécution du script
if (require.main === module) {
  setupDemo()
}

module.exports = { setupDemo }
