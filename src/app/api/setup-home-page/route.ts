import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

// Client Sanity avec token pour les opérations d'écriture
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01'
})

// Configuration de la page Home par défaut - Design professionnel et simple
const defaultHomePageBlocks = [
  // 1. Hero Block - Bannière d'accueil simple
  {
    _type: 'heroBlock',
    _key: 'home-hero',
    title: 'Votre Site Web Professionnel',
    subtitle: 'Boilerplate Next.js + Sanity CMS prêt à l\'emploi. Commencez à créer votre contenu dès maintenant.',
    layout: 'centered',
    ctaButtons: [
      {
        text: 'Commencer',
        href: '#guide',
        variant: 'primary',
        size: 'lg'
      },
      {
        text: 'Voir la Démo',
        href: '/demo',
        variant: 'secondary',
        size: 'lg'
      }
    ],
    backgroundSettings: {
      backgroundType: 'solid',
      backgroundColor: '#ffffff'
    },
    styling: {
      textColor: '#1a202c',
      textAlignment: 'center',
      verticalAlignment: 'center',
      height: 'medium',
      spacing: 'comfortable'
    }
  },

  // 2. Text Block - Guide de démarrage
  {
    _type: 'textBlock',
    _key: 'guide',
    content: [
      {
        _type: 'block',
        _key: 'guide-title',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Comment Démarrer Votre Site'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'guide-intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Suivez ces étapes simples pour personnaliser votre site web et commencer à créer du contenu professionnel.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'step-1',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '1. Configurez Votre Site'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'step-1-desc',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Personnalisez le header et footer de votre site via les paramètres. Ajoutez votre logo, vos couleurs et vos liens de navigation.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'step-2',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '2. Créez Vos Pages'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'step-2-desc',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Utilisez Sanity Studio pour créer de nouvelles pages avec le système de blocs. Chaque bloc est entièrement personnalisable.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'step-3',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '3. Publiez Votre Contenu'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'step-3-desc',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Vos modifications sont visibles en temps réel. Publiez votre contenu et partagez votre site avec le monde.'
          }
        ]
      }
    ],
    styling: {
      backgroundColor: '#f8fafc',
      textColor: '#374151',
      textAlignment: 'left',
      spacing: 'comfortable'
    }
  },

  // 3. Feature Grid - Liens d'action rapides
  {
    _type: 'featureGridBlock',
    _key: 'home-actions',
    title: 'Accès Rapide',
    subtitle: 'Tout ce dont vous avez besoin pour gérer votre site',
    gridLayout: '3-balanced',
    features: [
      {
        icon: 'star',
        iconColor: '#2563eb',
        title: 'Sanity Studio',
        description: 'Interface d\'administration pour créer et modifier votre contenu en temps réel.',
        featured: true
      },
      {
        icon: 'rocket',
        iconColor: '#059669',
        title: 'Voir la Démo',
        description: 'Découvrez tous les blocs disponibles et leurs possibilités de personnalisation.',
        featured: false
      },
      {
        icon: 'target',
        iconColor: '#dc2626',
        title: 'Configuration',
        description: 'Personnalisez les paramètres de votre site : header, footer et préférences.',
        featured: false
      }
    ],
    backgroundSettings: {
      backgroundType: 'solid',
      backgroundColor: '#ffffff'
    },
    styling: {
      textColor: '#374151',
      cardStyle: 'minimal',
      spacing: 'comfortable',
      alignment: 'center'
    }
  },

  // 4. Text Block - Ressources et support
  {
    _type: 'textBlock',
    _key: 'home-resources',
    content: [
      {
        _type: 'block',
        _key: 'resources-title',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Ressources Utiles'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'resources-intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Voici quelques liens utiles pour vous aider à tirer le meilleur parti de votre site :'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'resource-studio',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Sanity Studio (/studio) - Interface d\'administration complète'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'resource-demo',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Page de démonstration (/demo) - Exemples de tous les blocs'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'resource-settings',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Configuration (/admin/site-settings) - Paramètres du site'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'resources-note',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Cette page peut être entièrement personnalisée via Sanity Studio. Modifiez le contenu, ajoutez des sections ou changez le design selon vos besoins.'
          }
        ]
      }
    ],
    styling: {
      backgroundColor: '#f8fafc',
      textColor: '#374151',
      textAlignment: 'left',
      spacing: 'comfortable'
    }
  }
]

export async function POST(request: NextRequest) {
  try {
    console.log('🏠 Début de la création de la page Home')
    
    // Vérification de l'environnement de développement
    if (process.env.NODE_ENV === 'production') {
      console.log('❌ Création de page Home disponible uniquement en développement')
      return NextResponse.json(
        { error: 'Création de page Home disponible uniquement en développement' },
        { status: 403 }
      )
    }

    // Vérification des variables d'environnement
    console.log('🔍 Vérification des variables d\'environnement')
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        { error: 'Variables d\'environnement Sanity manquantes' },
        { status: 500 }
      )
    }

    // Vérifier si la page 'home' existe déjà
    console.log('🔍 Vérification de l\'existence de la page home')
    const existingHomePage = await writeClient.fetch(`*[_type == "page" && slug.current == "home"][0]`)

    if (existingHomePage) {
      console.log('ℹ️ Page home existante trouvée')
      return NextResponse.json({
        success: true,
        message: 'Page home déjà existante',
        data: {
          pageId: existingHomePage._id,
          title: existingHomePage.title,
          blocksCount: existingHomePage.pageBuilder?.length || 0,
          status: 'existing'
        }
      })
    }

    // Créer la page home
    console.log('📄 Création de la page home')
    const homePageData = {
      _type: 'page',
      title: 'Accueil',
      slug: {
        _type: 'slug',
        current: 'home'
      },
      pageBuilder: defaultHomePageBlocks,
      seoTitle: 'Votre Site Web Professionnel',
      seoDescription: 'Site web professionnel créé avec Next.js et Sanity CMS. Interface simple et intuitive pour gérer votre contenu. Commencez dès maintenant.',
      seoKeywords: ['Site web', 'Professionnel', 'CMS', 'Next.js', 'Sanity', 'Contenu'],
      noIndex: false,
      publishedAt: new Date().toISOString()
    }

    const createdPage = await writeClient.create(homePageData)
    console.log('✅ Page home créée avec succès:', createdPage._id)

    return NextResponse.json({
      success: true,
      message: 'Page home créée avec succès !',
      data: {
        pageId: createdPage._id,
        title: createdPage.title,
        slug: createdPage.slug.current,
        blocksCount: createdPage.pageBuilder?.length || 0,
        status: 'created',
        studioUrl: `/studio/desk/page;${createdPage._id}`
      }
    })

  } catch (error) {
    console.error('Erreur lors de la création de la page home:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création de la page home', 
        details: error instanceof Error ? error.message : 'Erreur inconnue' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Vérifier l'état de la page home
    const homePage = await writeClient.fetch(`*[_type == "page" && slug.current == "home"][0]`)
    
    return NextResponse.json({
      exists: !!homePage,
      data: homePage ? {
        id: homePage._id,
        title: homePage.title,
        blocksCount: homePage.pageBuilder?.length || 0,
        lastModified: homePage._updatedAt,
        published: !!homePage.publishedAt
      } : null
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la vérification', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}
