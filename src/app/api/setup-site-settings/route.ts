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

// Configuration par défaut du header
const defaultHeaderSettings = {
  _type: 'headerSettings',
  logoType: 'text',
  logoText: 'Sanity Boilerplate',
  navigationMenu: [
    {
      _key: 'nav-home',
      title: 'Accueil',
      link: '/'
    },
    {
      _key: 'nav-demo',
      title: 'Démonstration',
      link: '/demo'
    },
    {
      _key: 'nav-studio',
      title: 'Studio',
      link: '/studio'
    }
  ],
  cta: {
    text: '🎨 Studio',
    link: '/studio'
  },
  backgroundColor: '#ffffff',
  textColor: '#2d3748'
}

// Configuration par défaut du footer
const defaultFooterSettings = {
  _type: 'footerSettings',
  text: 'Solution professionnelle Next.js + Sanity CMS prête à l\'emploi pour créer des sites web modernes et performants.',
  columns: [
    {
      _key: 'col-navigation',
      title: 'Navigation',
      links: [
        {
          _key: 'link-home',
          title: 'Accueil',
          link: '/'
        },
        {
          _key: 'link-demo',
          title: 'Démonstration',
          link: '/demo'
        },
        {
          _key: 'link-studio',
          title: 'Studio Sanity',
          link: '/studio'
        },
        {
          _key: 'link-admin',
          title: 'Administration',
          link: '/admin/home'
        }
      ]
    },
    {
      _key: 'col-technologies',
      title: 'Technologies',
      links: [
        {
          _key: 'tech-nextjs',
          title: 'Next.js 16',
          link: 'https://nextjs.org'
        },
        {
          _key: 'tech-sanity',
          title: 'Sanity CMS',
          link: 'https://sanity.io'
        },
        {
          _key: 'tech-typescript',
          title: 'TypeScript',
          link: 'https://typescriptlang.org'
        },
        {
          _key: 'tech-css',
          title: 'CSS Modules',
          link: '#'
        }
      ]
    },
    {
      _key: 'col-resources',
      title: 'Ressources',
      links: [
        {
          _key: 'res-docs',
          title: 'Documentation',
          link: '#'
        },
        {
          _key: 'res-guide',
          title: 'Guide de démarrage',
          link: '#'
        },
        {
          _key: 'res-examples',
          title: 'Exemples d\'usage',
          link: '#'
        },
        {
          _key: 'res-config',
          title: 'Configuration',
          link: '#'
        }
      ]
    }
  ],
  copyrightText: 'Sanity Boilerplate. Conçu pour les développeurs modernes.',
  backgroundColor: '#f8fafc',
  textColor: '#4a5568'
}

export async function POST(request: NextRequest) {
  try {
    console.log('🏗️ Début de la configuration des paramètres de site')
    
    // Vérification de l'environnement de développement
    if (process.env.NODE_ENV === 'production') {
      console.log('❌ Configuration disponible uniquement en développement')
      return NextResponse.json(
        { error: 'Configuration disponible uniquement en développement' },
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

    // Vérifier si les paramètres existent déjà
    console.log('🔍 Vérification des paramètres existants')
    const existingHeader = await writeClient.fetch(`*[_type == "headerSettings"][0]`)
    const existingFooter = await writeClient.fetch(`*[_type == "footerSettings"][0]`)

    let headerResult, footerResult

    // Créer ou mettre à jour le header
    if (existingHeader) {
      console.log('🔄 Mise à jour des paramètres header existants')
      headerResult = await writeClient
        .patch(existingHeader._id)
        .set(defaultHeaderSettings)
        .commit()
    } else {
      console.log('📄 Création des paramètres header')
      headerResult = await writeClient.create(defaultHeaderSettings)
    }

    // Créer ou mettre à jour le footer
    if (existingFooter) {
      console.log('🔄 Mise à jour des paramètres footer existants')
      footerResult = await writeClient
        .patch(existingFooter._id)
        .set(defaultFooterSettings)
        .commit()
    } else {
      console.log('📄 Création des paramètres footer')
      footerResult = await writeClient.create(defaultFooterSettings)
    }

    console.log('✅ Paramètres de site configurés avec succès')

    return NextResponse.json({
      success: true,
      message: 'Paramètres de site configurés avec succès',
      data: {
        header: {
          id: headerResult._id,
          logoText: headerResult.logoText,
          navigationCount: headerResult.navigationMenu?.length || 0,
          hasLogo: !!headerResult.logoText,
          hasCTA: !!headerResult.cta
        },
        footer: {
          id: footerResult._id,
          columnsCount: footerResult.columns?.length || 0,
          hasText: !!footerResult.text,
          hasCopyright: !!footerResult.copyrightText
        },
        studioUrls: {
          header: `/studio/desk/headerSettings;${headerResult._id}`,
          footer: `/studio/desk/footerSettings;${footerResult._id}`
        }
      }
    })

  } catch (error) {
    console.error('Erreur lors de la configuration des paramètres:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la configuration des paramètres', 
        details: error instanceof Error ? error.message : 'Erreur inconnue' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Vérifier l'état des paramètres
    const headerSettings = await writeClient.fetch(`*[_type == "headerSettings"][0]`)
    const footerSettings = await writeClient.fetch(`*[_type == "footerSettings"][0]`)
    
    return NextResponse.json({
      header: {
        exists: !!headerSettings,
        configured: !!headerSettings?.logoText && !!headerSettings?.navigationMenu,
        data: headerSettings ? {
          logoText: headerSettings.logoText,
          navigationCount: headerSettings.navigationMenu?.length || 0,
          backgroundColor: headerSettings.backgroundColor,
          textColor: headerSettings.textColor
        } : null
      },
      footer: {
        exists: !!footerSettings,
        configured: !!footerSettings?.text && !!footerSettings?.columns,
        data: footerSettings ? {
          text: footerSettings.text?.substring(0, 100) + '...',
          columnsCount: footerSettings.columns?.length || 0,
          backgroundColor: footerSettings.backgroundColor,
          textColor: footerSettings.textColor
        } : null
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la vérification', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}
