import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ClientPageContent from '../[[...slug]]/ClientPageContent'
import PortfolioContent from './PortfolioContent'
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Portfolio - Sanity Next.js Professional Boilerplate',
    description: 'Découvrez nos réalisations et études de cas en développement web. Sites vitrines, e-commerce et applications sur mesure.',
    keywords: ['portfolio', 'réalisations', 'études de cas', 'projets web', 'next.js', 'sanity cms']
  }
}

export default async function PortfolioPage() {
  try {
    const page: Page = await client.fetch(pageBySlugQuery, { slug: 'portfolio' })
    
    if (!page) {
      return <PortfolioContent />
    }
    
    return <ClientPageContent page={page} />
  } catch (error) {
    console.error('Erreur lors du chargement de la page portfolio:', error)
    return <PortfolioContent />
  }
}
