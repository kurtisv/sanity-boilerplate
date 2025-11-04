import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ClientPageContent from '../[[...slug]]/ClientPageContent'
import ServicesContent from './ServicesContent'
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
  noIndex?: boolean
} & PageStyleSettings

// Génération des métadonnées pour le SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Services - Sanity Next.js Professional Boilerplate',
    description: 'Services professionnels de développement web avec Next.js 16 et Sanity CMS 4.12.',
  }
}

export default async function ServicesPage() {
  try {
    const page: Page = await client.fetch(pageBySlugQuery, { slug: 'services' })
    
    if (!page) {
      return <ServicesContent />
    }
    
    return <ClientPageContent page={page} />
  } catch (error) {
    console.error('Erreur lors du chargement de la page services:', error)
    return <ServicesContent />
  }
}
