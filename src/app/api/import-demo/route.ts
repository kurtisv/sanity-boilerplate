import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Client Sanity avec token pour les opérations d'écriture
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01'
})

// Configuration des blocs de démo (même que dans le script)
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

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Début de l\'import de la démo')
    
    // Vérification de l'environnement de développement
    if (process.env.NODE_ENV === 'production') {
      console.log('❌ Tentative d\'import en production')
      return NextResponse.json(
        { error: 'Import de démo disponible uniquement en développement' },
        { status: 403 }
      )
    }

    // Vérification des variables d'environnement
    console.log('🔍 Vérification des variables d\'environnement')
    console.log('- PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✅' : '❌')
    console.log('- DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')
    console.log('- API_TOKEN:', process.env.SANITY_API_TOKEN ? '✅' : '❌')

    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_SANITY_PROJECT_ID manquant dans les variables d\'environnement' },
        { status: 500 }
      )
    }

    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        { error: 'SANITY_API_TOKEN manquant dans les variables d\'environnement' },
        { status: 500 }
      )
    }

    // Vérification si la page demo existe déjà
    console.log('🔍 Vérification de l\'existence de la page demo')
    const existingPage = await writeClient.fetch(`*[_type == "page" && slug.current == "demo"][0]`)

    if (existingPage) {
      console.log('🗑️ Suppression de l\'ancienne page demo:', existingPage._id)
      await writeClient.delete(existingPage._id)
    }

    // Création de la nouvelle page de démo
    console.log('📄 Création de la nouvelle page demo avec', demoBlocks.length, 'blocs')
    const demoPage = {
      _type: 'page',
      title: 'Démonstration Boilerplate',
      slug: { current: 'demo' },
      seoTitle: 'Démonstration - Boilerplate Next.js + Sanity',
      seoDescription: 'Découvrez tous les blocs universels en action, créés directement dans Sanity Studio',
      pageBuilder: demoBlocks
    }

    console.log('💾 Sauvegarde dans Sanity...')
    const result = await writeClient.create(demoPage)
    console.log('✅ Page créée avec succès:', result._id)

    // Lecture du fichier DEMO_SETUP.md pour les métadonnées
    let demoSetupContent = ''
    try {
      const demoSetupPath = path.join(process.cwd(), 'DEMO_SETUP.md')
      demoSetupContent = fs.readFileSync(demoSetupPath, 'utf8')
    } catch (error) {
      console.warn('DEMO_SETUP.md non trouvé')
    }

    return NextResponse.json({
      success: true,
      message: 'Page de démo créée avec succès',
      data: {
        id: result._id,
        slug: 'demo',
        url: '/demo',
        studioUrl: `/studio/desk/page;${result._id}`,
        blocksCount: demoBlocks.length,
        hasSetupGuide: demoSetupContent.length > 0
      }
    })

  } catch (error) {
    console.error('Erreur lors de l\'import de la démo:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'import de la démo', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Vérifier si la page demo existe
    const existingPage = await writeClient.fetch(`*[_type == "page" && slug.current == "demo"][0]`)
    
    return NextResponse.json({
      exists: !!existingPage,
      page: existingPage ? {
        id: existingPage._id,
        title: existingPage.title,
        blocksCount: existingPage.pageBuilder?.length || 0
      } : null
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la vérification', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}
