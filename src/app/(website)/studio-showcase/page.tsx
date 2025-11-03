import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import StudioShowcase from './StudioShowcase'
import type { Block } from '@/components/BlockRenderer'

type Page = {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  seoTitle?: string
  seoDescription?: string
}

export const metadata: Metadata = {
  title: 'Vitrine Studio - Vos Blocs Créés',
  description: 'Découvrez tous les blocs que vous avez créés dans Sanity Studio, présentés dans une mise en page professionnelle',
}

export default async function StudioShowcasePage() {
  // Récupérer la page "studio-showcase" depuis Sanity
  const page: Page | null = await client.fetch(pageBySlugQuery, { slug: 'studio-showcase' })

  return <StudioShowcase page={page} />
}
