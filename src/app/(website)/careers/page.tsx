import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ClientPageContent from '../[[...slug]]/ClientPageContent'
import CareersContent from './CareersContent'
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
    title: 'Carrières - Sanity Next.js Professional Boilerplate',
    description: 'Rejoignez notre équipe de développeurs passionnés. Offres d\'emploi, culture d\'entreprise et opportunités de carrière.',
    keywords: ['carrières', 'emploi', 'recrutement', 'développeur', 'next.js', 'react', 'équipe', 'jobs']
  }
}

export default async function CareersPage() {
  try {
    const page: Page = await client.fetch(pageBySlugQuery, { slug: 'careers' })
    
    if (!page) {
      return <CareersContent />
    }
    
    return <ClientPageContent page={page} />
  } catch (error) {
    console.error('Erreur lors du chargement de la page careers:', error)
    return <CareersContent />
  }
}
