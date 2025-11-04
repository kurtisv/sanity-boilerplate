import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ClientPageContent from '../[[...slug]]/ClientPageContent'
import BlogContent from './BlogContent'
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
    title: 'Blog - Sanity Next.js Professional Boilerplate',
    description: 'Articles et tutoriels sur le développement web moderne. Next.js, React, Sanity CMS, TypeScript et bonnes pratiques.',
    keywords: ['blog', 'articles', 'tutoriels', 'développement web', 'next.js', 'react', 'sanity cms', 'typescript']
  }
}

export default async function BlogPage() {
  try {
    const page: Page = await client.fetch(pageBySlugQuery, { slug: 'blog' })
    
    if (!page) {
      return <BlogContent />
    }
    
    return <ClientPageContent page={page} />
  } catch (error) {
    console.error('Erreur lors du chargement de la page blog:', error)
    return <BlogContent />
  }
}
