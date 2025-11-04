import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ClientPageContent from '../[[...slug]]/ClientPageContent'
import FaqContent from './FaqContent'
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
    title: 'FAQ - Sanity Next.js Professional Boilerplate',
    description: 'Questions fréquentes sur nos services de développement web. Tout ce que vous devez savoir sur Next.js, Sanity CMS et nos processus.',
    keywords: ['faq', 'questions', 'réponses', 'développement web', 'next.js', 'sanity cms', 'support']
  }
}

export default async function FaqPage() {
  try {
    const page: Page = await client.fetch(pageBySlugQuery, { slug: 'faq' })
    
    if (!page) {
      return <FaqContent />
    }
    
    return <ClientPageContent page={page} />
  } catch (error) {
    console.error('Erreur lors du chargement de la page faq:', error)
    return <FaqContent />
  }
}
