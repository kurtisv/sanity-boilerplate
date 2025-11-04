import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ClientPageContent from '../[[...slug]]/ClientPageContent'
import AboutContent from './AboutContent'
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
    title: 'À Propos - Sanity Next.js Professional Boilerplate',
    description: 'Découvrez notre équipe, notre mission et notre expertise en développement web moderne avec Next.js et Sanity CMS.',
    keywords: ['à propos', 'équipe', 'expertise', 'développement web', 'next.js', 'sanity cms']
  }
}

export default async function AboutPage() {
  try {
    const page: Page = await client.fetch(pageBySlugQuery, { slug: 'about' })
    
    if (!page) {
      return <AboutContent />
    }
    
    return <ClientPageContent page={page} />
  } catch (error) {
    console.error('Erreur lors du chargement de la page about:', error)
    return <AboutContent />
  }
}
