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

// Configuration des blocs pour la page d'accueil
const homeBlocks = [
  {
    _type: 'heroBlock',
    _key: 'hero-home',
    title: 'Home',
    subtitle: 'Bienvenue sur votre Boilerplate Next.js + Sanity. Téléchargez et personnalisez votre site en quelques minutes.',
    layout: 'centered',
    ctaButtons: [
      {
        text: 'Découvrir les fonctionnalités',
        href: '#features',
        variant: 'primary',
        size: 'lg'
      },
      {
        text: 'Voir la démo',
        href: '/demo',
        variant: 'secondary',
        size: 'lg'
      }
    ],
    backgroundSettings: {
      type: 'gradient',
      gradient: {
        from: '#f8fafc',
        to: '#e2e8f0',
        direction: 'to-br'
      }
    },
    styling: {
      textColor: '#1f2937',
      textAlignment: 'center',
      verticalAlignment: 'center',
      height: 'large',
      spacing: 'large'
    }
  },
  {
    _type: 'featureGridBlock',
    _key: 'features-home',
    title: 'Fonctionnalités Principales',
    subtitle: 'Tout ce dont vous avez besoin pour créer des sites web modernes',
    features: [
      {
        _key: 'feature-1',
        title: 'Système de Blocs',
        description: 'Architecture modulaire avec 8+ blocs prêts à l\'emploi',
        icon: '🧩'
      },
      {
        _key: 'feature-2',
        title: 'Design Professionnel',
        description: 'Interface moderne avec CSS Modules et design system',
        icon: '🎨'
      },
      {
        _key: 'feature-3',
        title: 'Performance Optimisée',
        description: 'Next.js 16 avec App Router et Server Components',
        icon: '⚡'
      },
      {
        _key: 'feature-4',
        title: 'TypeScript Complet',
        description: 'Sécurité de type sur tout le projet',
        icon: '🔧'
      }
    ],
    layout: 'grid',
    columns: 2,
    styling: {
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      spacing: 'large'
    }
  },
  {
    _type: 'textBlock',
    _key: 'about-home',
    content: [
      {
        _type: 'block',
        _key: 'about-content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Ce boilerplate combine Next.js 16 et Sanity CMS pour offrir une solution complète de développement web moderne. Il propose un système de blocs universels, une interface d\'administration intuitive et un design professionnel prêt pour la production.'
          }
        ]
      }
    ],
    styling: {
      backgroundColor: '#f8fafc',
      textColor: '#374151',
      textAlignment: 'center',
      spacing: 'medium'
    }
  },
  {
    _type: 'contactBlock',
    _key: 'contact-home',
    title: 'Prêt à Commencer ?',
    subtitle: 'Explorez toutes les fonctionnalités ou contactez-nous pour en savoir plus',
    layout: 'centered',
    fields: [
      {
        _key: 'name-field',
        name: 'name',
        label: 'Votre nom',
        type: 'text',
        required: true,
        width: 'half'
      },
      {
        _key: 'email-field',
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        width: 'half'
      },
      {
        _key: 'message-field',
        name: 'message',
        label: 'Message',
        type: 'textarea',
        required: true,
        width: 'full'
      }
    ],
    submitButton: {
      text: 'Envoyer le message',
      variant: 'primary'
    },
    styling: {
      backgroundColor: '#1e40af',
      textColor: '#ffffff',
      spacing: 'large'
    }
  }
]

export async function POST(request: NextRequest) {
  try {
    console.log('🏠 Début de l\'import de la page d\'accueil')
    
    // Vérification de l'environnement de développement
    if (process.env.NODE_ENV === 'production') {
      console.log('❌ Tentative d\'import en production')
      return NextResponse.json(
        { error: 'Import de page disponible uniquement en développement' },
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

    // Vérification si la page home existe déjà
    console.log('🔍 Vérification de l\'existence de la page home')
    const existingPage = await writeClient.fetch(`*[_type == "page" && slug.current == "home"][0]`)

    if (existingPage) {
      console.log('🗑️ Suppression de l\'ancienne page home:', existingPage._id)
      await writeClient.delete(existingPage._id)
    }

    // Création de la nouvelle page d'accueil
    console.log('📄 Création de la nouvelle page home avec', homeBlocks.length, 'blocs')
    const homePage = {
      _type: 'page',
      title: 'Accueil',
      slug: { current: 'home' },
      seoTitle: 'Sanity Next.js Boilerplate - Accueil',
      seoDescription: 'Boilerplate moderne et professionnel avec Next.js 16 et Sanity CMS. Système de blocs universels, design classique et performance optimisée.',
      seoKeywords: ['Next.js', 'Sanity', 'CMS', 'Boilerplate', 'React', 'TypeScript'],
      pageBuilder: homeBlocks
    }

    console.log('💾 Sauvegarde dans Sanity...')
    const result = await writeClient.create(homePage)
    console.log('✅ Page home créée avec succès:', result._id)

    return NextResponse.json({
      success: true,
      message: 'Page d\'accueil importée avec succès',
      data: {
        pageId: result._id,
        title: result.title,
        slug: result.slug.current,
        blocksCount: homeBlocks.length,
        url: '/',
        studioUrl: `/studio/desk/page;${result._id}`
      }
    })

  } catch (error) {
    console.error('Erreur lors de l\'import de la page home:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'import de la page home', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Vérifier si la page home existe
    const existingPage = await writeClient.fetch(`*[_type == "page" && slug.current == "home"][0]`)
    
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
