import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ClientPageContent from '../[[...slug]]/ClientPageContent'
import ContactContent from './ContactContent'
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
    title: 'Contact - Sanity Next.js Professional Boilerplate',
    description: 'Contactez notre équipe d\'experts en développement web. Devis gratuit, conseil personnalisé et accompagnement sur mesure.',
    keywords: ['contact', 'devis', 'conseil', 'développement web', 'next.js', 'sanity cms']
  }
}

export default async function ContactPage() {
  try {
    const page: Page = await client.fetch(pageBySlugQuery, { slug: 'contact' })
    
    if (!page) {
      return <ContactContent />
    }
    
    return <ClientPageContent page={page} />
  } catch (error) {
    console.error('Erreur lors du chargement de la page contact:', error)
    return <ContactContent />
  }
}
