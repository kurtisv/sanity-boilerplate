import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ProfessionalDemo from './ProfessionalDemo'
import type { Block } from '@/types/blocks'

type Page = {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  seoTitle?: string
  seoDescription?: string
}

export const metadata: Metadata = {
  title: 'Démonstration - Boilerplate Next.js + Sanity',
  description: 'Découvrez tous les blocs universels en action, créés directement dans Sanity Studio',
}

export default async function DemoPage() {
  // Récupérer la page "demo" depuis Sanity
  const page: Page | null = await client.fetch(pageBySlugQuery, { slug: 'demo' })

  return <ProfessionalDemo page={page} />
}
