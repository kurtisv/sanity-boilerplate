import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ClientPageContent from '../[[...slug]]/ClientPageContent'
import LegalContent from './LegalContent'
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
    title: 'Mentions Légales - Sanity Next.js Professional Boilerplate',
    description: 'Mentions légales, politique de confidentialité et conditions d\'utilisation de nos services de développement web.',
    keywords: ['mentions légales', 'politique de confidentialité', 'RGPD', 'conditions utilisation', 'légal']
  }
}

export default async function LegalPage() {
  try {
    const page: Page = await client.fetch(pageBySlugQuery, { slug: 'legal' })
    
    if (!page) {
      return <LegalContent />
    }
    
    return <ClientPageContent page={page} />
  } catch (error) {
    console.error('Erreur lors du chargement de la page legal:', error)
    return <LegalContent />
  }
}
