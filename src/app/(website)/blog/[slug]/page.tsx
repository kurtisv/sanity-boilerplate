import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ClientPageContent from '../../[[...slug]]/ClientPageContent'
import BlogArticleContent from './BlogArticleContent'
import type { Block } from '@/types/blocks'                   // ✅ Source correcte
import type { PageStyleSettings } from '@/lib/theme-utils'

type Page = {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
} & PageStyleSettings

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // NOTE: Dans un vrai projet, récupérer les métadonnées de l'article depuis Sanity
  return {
    title: `Article - Sanity Next.js Professional Boilerplate`,
    description: 'Article de blog sur le développement web moderne avec Next.js, React et Sanity CMS.',
    keywords: ['article', 'blog', 'développement web', 'next.js', 'react', 'sanity cms']
  }
}

export default async function BlogArticlePage({ params }: Props) {
  try {
    // NOTE: Adapter la requête pour récupérer un article de blog spécifique
    const page: Page = await client.fetch(pageBySlugQuery, { slug: `blog/${params.slug}` })
    
    if (!page) {
      return <BlogArticleContent slug={params.slug} />
    }
    
    return <ClientPageContent page={page} />
  } catch (error) {
    console.error('Erreur lors du chargement de l\'article:', error)
    return <BlogArticleContent slug={params.slug} />
  }
}
