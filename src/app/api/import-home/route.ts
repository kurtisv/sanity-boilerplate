import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { generateCtaKey } from '@/lib/generate-unique-keys'


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
        _key: generateCtaKey('features'),
        text: 'Découvrir les fonctionnalités',
        href: '#features',
        variant: 'primary',
        size: 'lg'
      },
      {
        _key: generateCtaKey('demo'),
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
        iconType: 'emoji',
        iconEmoji: '🧩',
        title: 'Système de Blocs',
        description: 'Architecture modulaire avec 8+ blocs prêts à l\'emploi'
      },
      {
        _key: 'feature-2',
        iconType: 'emoji',
        iconEmoji: '🎨',
        title: 'Design Professionnel',
        description: 'Interface moderne avec CSS Modules et design system'
      },
      {
        _key: 'feature-3',
        iconType: 'emoji',
        iconEmoji: '⚡',
        title: 'Performance Optimisée',
        description: 'Next.js 16 avec App Router et Server Components'
      },
      {
        _key: 'feature-4',
        iconType: 'emoji',
        iconEmoji: '🔧',
        title: 'TypeScript Complet',
        description: 'Sécurité de type sur tout le projet'
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
    formFields: [
      {
        _key: 'name-field',
        fieldType: 'name',
        label: 'Votre nom',
        placeholder: 'Votre nom complet',
        required: true,
        width: 'half'
      },
      {
        _key: 'email-field',
        fieldType: 'email',
        label: 'Email',
        placeholder: 'votre@email.com',
        required: true,
        width: 'half'
      },
      {
        _key: 'message-field',
        fieldType: 'message',
        label: 'Message',
        placeholder: 'Votre message...',
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
    const existingPage = await client.fetch(`*[_type == "page" && slug.current == "home"][0]`)

    if (existingPage) {
      console.log('🗑️ Suppression de l\'ancienne page home:', existingPage._id)
      await client.delete(existingPage._id)
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
    const result = await client.create(homePage)
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
    const existingPage = await client.fetch(`*[_type == "page" && slug.current == "home"][0]`)
    
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
