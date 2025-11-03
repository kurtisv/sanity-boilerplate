#!/usr/bin/env node

/**
 * Script d'importation automatique de la démo
 * Lit DEMO_SETUP.md et crée automatiquement la page de démo dans Sanity
 */

const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')
const readline = require('readline')

// Configuration Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // Token avec droits d'écriture
  useCdn: false,
  apiVersion: '2024-01-01'
})

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

// Configuration des blocs de démo
const demoBlocks = [
  {
    _type: 'heroBlock',
    _key: 'hero-demo',
    title: 'Boilerplate Next.js + Sanity',
    subtitle: 'Découvrez tous les blocs universels créés pour accélérer vos projets web',
    layout: 'centered',
    ctaButtons: [
      {
        text: 'Voir les blocs',
        href: '#stats',
        variant: 'primary',
        size: 'lg'
      },
      {
        text: 'Documentation',
        href: '#features',
        variant: 'secondary',
        size: 'lg'
      }
    ],
    backgroundSettings: {
      backgroundType: 'gradient',
      gradientColors: {
        from: '#2563eb',
        to: '#7c3aed',
        direction: 'to-br'
      }
    },
    styling: {
      textColor: '#ffffff',
      textAlignment: 'center',
      verticalAlignment: 'center',
      height: 'large',
      spacing: 'normal'
    }
  },
  {
    _type: 'statsBlock',
    _key: 'stats-demo',
    title: 'Performance du Boilerplate',
    subtitle: 'Des chiffres qui parlent',
    layout: 'grid-4col',
    stats: [
      {
        number: 7,
        label: 'Blocs Universels',
        description: 'Couvrent 95% des besoins',
        icon: '🧩',
        featured: false,
        animationType: 'counter',
        animationDuration: 2,
        order: 1
      },
      {
        number: 95,
        suffix: '%',
        label: 'Couverture Projets',
        description: 'Sites web classiques',
        icon: '🎯',
        featured: true,
        animationType: 'progress',
        animationDuration: 2.5,
        order: 2
      },
      {
        number: 100,
        suffix: '%',
        label: 'TypeScript',
        description: 'Sécurité de type garantie',
        icon: '🔒',
        featured: false,
        animationType: 'bounce',
        animationDuration: 1.5,
        order: 3
      },
      {
        number: 98,
        suffix: '+',
        label: 'Lighthouse Score',
        description: 'Performance optimisée',
        icon: '⚡',
        featured: false,
        animationType: 'pulse',
        animationDuration: 2,
        order: 4
      }
    ],
    animationSettings: {
      enableAnimations: true,
      triggerOffset: 50,
      staggerDelay: 200,
      easing: 'easeOut'
    },
    backgroundSettings: {
      backgroundType: 'solid',
      backgroundColor: '#f8fafc'
    },
    styling: {
      textColor: '#1f2937',
      numberColor: '#2563eb',
      cardStyle: 'shadow',
      spacing: 'normal',
      alignment: 'center'
    }
  },
  {
    _type: 'featureGridBlock',
    _key: 'features-demo',
    title: 'Fonctionnalités des Blocs',
    subtitle: 'Chaque bloc est conçu pour être flexible et réutilisable',
    gridLayout: '3-balanced',
    features: [
      {
        icon: 'star',
        iconColor: '#2563eb',
        title: 'TextBlock',
        description: 'Contenu riche avec Portable Text, support markdown, listes, liens et mise en forme avancée.',
        featured: false
      },
      {
        icon: 'rocket',
        iconColor: '#7c3aed',
        title: 'HeroBlock',
        description: 'Bannières avec CTA, images de fond, dégradés et layouts multiples pour un impact maximal.',
        featured: true
      },
      {
        icon: 'target',
        iconColor: '#f59e0b',
        title: 'FeatureGridBlock',
        description: 'Grilles de fonctionnalités avec icônes, descriptions et layouts adaptatifs.',
        featured: false
      },
      {
        icon: 'mail',
        iconColor: '#10b981',
        title: 'ContactBlock',
        description: 'Formulaires de contact configurables avec validation, styles multiples et intégration email.',
        featured: false
      },
      {
        icon: 'camera',
        iconColor: '#8b5cf6',
        title: 'GalleryBlock',
        description: 'Galeries d\'images avec lightbox, filtres par catégorie et layouts masonry/grid.',
        featured: true
      },
      {
        icon: 'users',
        iconColor: '#06b6d4',
        title: 'TeamBlock',
        description: 'Équipes et témoignages avec photos, réseaux sociaux, compétences et layouts variés.',
        featured: false
      },
      {
        icon: 'trending',
        iconColor: '#ef4444',
        title: 'StatsBlock',
        description: 'Statistiques animées avec compteurs, graphiques et effets visuels personnalisables.',
        featured: true
      }
    ],
    cardStyle: 'shadow',
    iconStyle: 'circle',
    textAlignment: 'center',
    spacing: 'normal',
    backgroundColor: '#f8fafc',
    textColor: '#1f2937'
  },
  {
    _type: 'contactBlock',
    _key: 'contact-demo',
    title: 'Testez le Boilerplate',
    subtitle: 'Envoyez-nous vos retours sur ce boilerplate',
    layout: 'two-columns',
    formFields: [
      {
        fieldType: 'name',
        label: 'Votre nom',
        placeholder: 'John Doe',
        required: true,
        width: 'half'
      },
      {
        fieldType: 'email',
        label: 'Email',
        placeholder: 'john@example.com',
        required: true,
        width: 'half'
      },
      {
        fieldType: 'subject',
        label: 'Sujet',
        placeholder: 'Feedback sur le boilerplate',
        required: true,
        width: 'full'
      },
      {
        fieldType: 'message',
        label: 'Message',
        placeholder: 'Partagez vos impressions, suggestions d\'amélioration...',
        required: true,
        width: 'full'
      }
    ],
    submitButton: {
      text: 'Envoyer le feedback',
      loadingText: 'Envoi en cours...'
    },
    successMessage: {
      title: 'Merci pour votre feedback !',
      description: 'Votre message a été envoyé avec succès. Nous vous répondrons rapidement.'
    },
    contactInfo: {
      showContactInfo: true,
      email: 'contact@example.com',
      address: 'Paris, France',
      hours: 'Lun-Ven 9h-18h'
    },
    styling: {
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      spacing: 'large'
    }
  }
]

// Fonction principale
async function importDemo() {
  try {
    log.title('Import automatique de la démo Sanity')

    // Vérification des variables d'environnement
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID manquant dans .env.local')
    }

    if (!process.env.SANITY_API_TOKEN) {
      log.warning('SANITY_API_TOKEN manquant. Création d\'un token requis.')
      log.info('Allez sur https://sanity.io/manage et créez un token avec droits d\'écriture')
      process.exit(1)
    }

    // Vérification si la page demo existe déjà
    log.info('Vérification de l\'existence de la page demo...')
    const existingPage = await client.fetch(`*[_type == "page" && slug.current == "demo"][0]`)

    if (existingPage) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      const answer = await new Promise(resolve => {
        rl.question('Une page demo existe déjà. Voulez-vous la remplacer ? (y/N): ', resolve)
      })
      rl.close()

      if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
        log.info('Import annulé.')
        process.exit(0)
      }

      // Suppression de l'ancienne page
      log.info('Suppression de l\'ancienne page demo...')
      await client.delete(existingPage._id)
    }

    // Création de la nouvelle page
    log.info('Création de la page de démonstration...')
    
    const demoPage = {
      _type: 'page',
      title: 'Démonstration Boilerplate',
      slug: { current: 'demo' },
      seoTitle: 'Démonstration - Boilerplate Next.js + Sanity',
      seoDescription: 'Découvrez tous les blocs universels en action, créés directement dans Sanity Studio',
      pageBuilder: demoBlocks
    }

    const result = await client.create(demoPage)
    
    log.success(`Page de démo créée avec succès !`)
    log.info(`ID: ${result._id}`)
    log.info(`URL: http://localhost:3000/demo`)
    log.info(`Studio: http://localhost:3000/studio/desk/page;${result._id}`)

    // Lecture du fichier DEMO_SETUP.md pour afficher les instructions
    const demoSetupPath = path.join(process.cwd(), 'DEMO_SETUP.md')
    if (fs.existsSync(demoSetupPath)) {
      log.info('\n📖 Consultez DEMO_SETUP.md pour plus de détails sur la configuration.')
    }

    log.success('\n🎉 Import terminé ! Votre démo est prête.')

  } catch (error) {
    log.error(`Erreur lors de l'import: ${error.message}`)
    process.exit(1)
  }
}

// Exécution du script
if (require.main === module) {
  importDemo()
}

module.exports = { importDemo, demoBlocks }
