import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ClientPageContent from '../[[...slug]]/ClientPageContent'
import PricingContent from './PricingContent'
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
    title: 'Tarifs - Sanity Next.js Professional Boilerplate',
    description: 'Découvrez nos offres de développement web avec Next.js et Sanity CMS. Solutions adaptées à tous les budgets et besoins.',
    keywords: ['tarifs', 'prix', 'développement web', 'next.js', 'sanity cms', 'devis']
  }
}

export default async function PricingPage() {
  try {
    const page: Page = await client.fetch(pageBySlugQuery, { slug: 'pricing' })
    
    if (!page) {
      return <PricingContent />
    }
    
    return <ClientPageContent page={page} />
  } catch (error) {
    console.error('Erreur lors du chargement de la page pricing:', error)
    return <PricingContent />
  }
}
