import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ClientPageContent from './ClientPageContent'
import SimpleHomePage from './SimpleHomePage'
import type { Block } from '@/components/BlockRenderer'
import type { PageStyleSettings } from '@/lib/theme-utils'

type Page = {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  seoImage?: {
    asset: {
      _ref: string
    }
  }
  noIndex?: boolean
} & PageStyleSettings

type Props = {
  params: { slug?: string[] }
}

// Génération des métadonnées pour le SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Déterminer le slug : seuls / et /home pointent vers 'home'
  const isHomePage = !params.slug || params.slug.length === 0 || 
    (params.slug.length === 1 && params.slug[0] === 'home')
  
  const slug = isHomePage ? 'home' : (params.slug || []).join('/')

  // Si c'est la page d'accueil et qu'elle n'existe pas dans Sanity, utiliser des métadonnées par défaut
  if (isHomePage) {
    try {
      const page: Page = await client.fetch(pageBySlugQuery, { slug })
      
      if (!page) {
        // Métadonnées par défaut pour la page d'accueil
        return {
          title: 'Home - Sanity Next.js Boilerplate',
          description: 'Boilerplate moderne avec Next.js 16 et Sanity CMS. Téléchargez et personnalisez votre site en quelques minutes.',
          keywords: ['Next.js', 'Sanity', 'CMS', 'Boilerplate', 'React', 'TypeScript'],
          robots: {
            index: true,
            follow: true,
          },
          openGraph: {
            title: 'Home - Sanity Next.js Boilerplate',
            description: 'Boilerplate moderne avec Next.js 16 et Sanity CMS',
            url: '/',
          },
        }
      }

      // Utiliser les métadonnées de la page Sanity
      return {
        title: page.seoTitle || page.title,
        description: page.seoDescription,
        keywords: page.seoKeywords,
        robots: {
          index: !page.noIndex,
          follow: !page.noIndex,
        },
        openGraph: {
          title: page.seoTitle || page.title,
          description: page.seoDescription,
          url: '/',
        },
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des métadonnées:', error)
      // Métadonnées de fallback
      return {
        title: 'Home - Sanity Next.js Boilerplate',
        description: 'Boilerplate moderne avec Next.js 16 et Sanity CMS',
      }
    }
  }

  // Pour les autres pages, récupérer les métadonnées normalement
  try {
    const page: Page = await client.fetch(pageBySlugQuery, { slug })
    
    if (!page) {
      return {
        title: 'Page non trouvée',
        description: 'Cette page n\'existe pas.',
      }
    }

    return {
      title: page.seoTitle || page.title,
      description: page.seoDescription,
      keywords: page.seoKeywords,
      robots: {
        index: !page.noIndex,
        follow: !page.noIndex,
      },
      openGraph: {
        title: page.seoTitle || page.title,
        description: page.seoDescription,
        url: `/${slug}`,
      },
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des métadonnées:', error)
    return {
      title: 'Erreur',
      description: 'Une erreur est survenue.',
    }
  }
}

// Configuration ISR : revalidation toutes les 60 secondes
export const revalidate = 60

export default async function DynamicPage({ params }: Props) {
  // Déterminer le slug : seuls / et /home pointent vers 'home'
  const isHomePage = !params.slug || params.slug.length === 0 || 
    (params.slug.length === 1 && params.slug[0] === 'home')
  
  const slug = isHomePage ? 'home' : (params.slug || []).join('/')
  
  // Si c'est la page d'accueil, vérifier si elle existe dans Sanity
  if (isHomePage) {
    try {
      const page: Page | null = await client.fetch(pageBySlugQuery, { slug: 'home' })
      
      // Si pas de page 'home' dans Sanity, afficher la page d'accueil simple
      if (!page) {
        return <SimpleHomePage />
      }
      
      // Si la page existe, l'afficher via ClientPageContent
      return <ClientPageContent page={page} />
    } catch (error) {
      console.error('Erreur lors de la récupération de la page home:', error)
      // En cas d'erreur, afficher la page simple
      return <SimpleHomePage />
    }
  }
  
  // Pour les autres pages, comportement normal avec 404 si inexistant
  try {
    const page: Page | null = await client.fetch(pageBySlugQuery, { slug })
    
    if (!page) {
      console.log(`Page non trouvée pour le slug: ${slug}`)
      notFound()
    }

    return <ClientPageContent page={page} />
  } catch (error) {
    console.error(`Erreur lors de la récupération de la page ${slug}:`, error)
    notFound()
  }
}
