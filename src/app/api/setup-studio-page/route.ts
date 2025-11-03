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

// Configuration des blocs pour la page Studio - Design professionnel
const studioPageBlocks = [
  // 1. Hero Block - Présentation de la page Studio
  {
    _type: 'heroBlock',
    _key: 'hero-studio',
    title: 'Vos Blocs Créés dans Studio',
    subtitle: 'Cette page présente automatiquement tous les blocs que vous avez créés et configurés dans Sanity Studio. Une vitrine professionnelle de votre contenu.',
    layout: 'centered',
    ctaButtons: [
      {
        text: 'Ouvrir Sanity Studio',
        href: '/studio',
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
      backgroundType: 'gradient',
      backgroundColor: '#667eea',
      gradientDirection: '135deg',
      gradientColors: ['#667eea', '#764ba2']
    },
    styling: {
      textColor: '#ffffff',
      textAlignment: 'center',
      verticalAlignment: 'center',
      height: 'medium',
      spacing: 'normal'
    }
  },

  // 2. Text Block - Explication de la page
  {
    _type: 'textBlock',
    _key: 'studio-explanation',
    content: [
      {
        _type: 'block',
        _key: 'explanation-title',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '🎨 Page Studio Automatique'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'explanation-intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Cette page se génère automatiquement et affiche tous les blocs que vous créez dans Sanity Studio. Elle sert de vitrine professionnelle pour présenter votre contenu aux visiteurs.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'explanation-features',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Fonctionnalités :'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'feature-1',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: '✨ Mise à jour automatique quand vous ajoutez du contenu'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'feature-2',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: '🎯 Design professionnel et cohérent'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'feature-3',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: '📱 Responsive sur tous les appareils'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'feature-4',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: '🔧 Entièrement personnalisable via Studio'
          }
        ]
      }
    ],
    styling: {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      textAlignment: 'left',
      spacing: 'normal'
    }
  },

  // 3. Feature Grid - Avantages du système
  {
    _type: 'featureGridBlock',
    _key: 'studio-benefits',
    title: 'Pourquoi Utiliser Cette Page ?',
    subtitle: 'Une solution clé en main pour présenter votre contenu de manière professionnelle',
    gridLayout: '3-balanced',
    features: [
      {
        icon: 'eye',
        iconColor: '#2563eb',
        title: 'Vitrine Automatique',
        description: 'Vos blocs Studio sont automatiquement mis en forme et présentés de manière attractive.',
        featured: false
      },
      {
        icon: 'users',
        iconColor: '#059669',
        title: 'Expérience Client',
        description: 'Offrez à vos visiteurs une navigation fluide et professionnelle de votre contenu.',
        featured: true
      },
      {
        icon: 'settings',
        iconColor: '#dc2626',
        title: 'Zéro Configuration',
        description: 'Aucun développement nécessaire, la page se construit automatiquement.',
        featured: false
      }
    ],
    backgroundSettings: {
      backgroundType: 'solid',
      backgroundColor: '#f8fafc'
    },
    styling: {
      textColor: '#374151',
      cardStyle: 'elevated',
      spacing: 'comfortable',
      alignment: 'center'
    }
  },

  // 4. Text Block - Instructions
  {
    _type: 'textBlock',
    _key: 'studio-instructions',
    content: [
      {
        _type: 'block',
        _key: 'instructions-title',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '🚀 Comment Commencer ?'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'step-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '1. ',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: 'Ouvrez Sanity Studio en cliquant sur le bouton ci-dessus'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'step-2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '2. ',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: 'Créez une nouvelle page ou modifiez une page existante'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'step-3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '3. ',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: 'Ajoutez des blocs à votre page (Hero, Features, Contact, etc.)'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'step-4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '4. ',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: 'Publiez votre page et elle apparaîtra automatiquement ici'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'instructions-note',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Cette page se met à jour en temps réel dès que vous modifiez votre contenu dans Studio.',
            marks: ['em']
          }
        ]
      }
    ],
    styling: {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      textAlignment: 'center',
      spacing: 'comfortable'
    }
  }
]

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Début de la création de la page Studio')
    
    // Vérification de l'environnement de développement
    if (process.env.NODE_ENV === 'production') {
      console.log('❌ Tentative de création en production')
      return NextResponse.json(
        { error: 'Création de page Studio disponible uniquement en développement' },
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

    // Vérification si la page studio existe déjà
    console.log('🔍 Vérification de l\'existence de la page studio')
    const existingPage = await writeClient.fetch(`*[_type == "page" && slug.current == "studio-showcase"][0]`)

    if (existingPage) {
      console.log('🗑️ Suppression de l\'ancienne page studio:', existingPage._id)
      await writeClient.delete(existingPage._id)
    }

    // Création de la nouvelle page Studio
    console.log('📄 Création de la nouvelle page Studio avec', studioPageBlocks.length, 'blocs')
    const studioPage = {
      _type: 'page',
      title: 'Vitrine Studio',
      slug: { current: 'studio-showcase' },
      seoTitle: 'Vitrine Studio - Vos Blocs Créés',
      seoDescription: 'Découvrez tous les blocs que vous avez créés dans Sanity Studio, présentés dans une mise en page professionnelle',
      pageBuilder: studioPageBlocks
    }

    console.log('💾 Sauvegarde dans Sanity...')
    const result = await writeClient.create(studioPage)
    console.log('✅ Page Studio créée avec succès:', result._id)

    return NextResponse.json({
      success: true,
      message: 'Page Studio créée avec succès',
      data: {
        id: result._id,
        slug: 'studio-showcase',
        url: '/studio-showcase',
        studioUrl: `/studio/desk/page;${result._id}`,
        blocksCount: studioPageBlocks.length
      }
    })

  } catch (error) {
    console.error('Erreur lors de la création de la page Studio:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la page Studio', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Vérifier si la page studio existe
    const existingPage = await writeClient.fetch(`*[_type == "page" && slug.current == "studio-showcase"][0]`)
    
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
