import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import BlockRenderer from '@/components/BlockRenderer'
import { urlFor } from '@/sanity/lib/image'
import ClientPageWrapper from './ClientPageWrapper'
import { 
  PageContainer, 
  PageContent, 
  BlocksContainer, 
  EmptyState, 
  PageTitle, 
  PageMessage 
} from './PageComponents'

type Block = {
  _type: string
  _key: string
  [key: string]: any
}

type Page = {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  seoTitle?: string
  seoDescription?: string
  seoImage?: {
    asset: {
      _id: string
      url: string
    }
  }
  seoKeywords?: string[]
  noIndex?: boolean
  customCss?: string
  customJs?: string
}

type Props = {
  params: { slug?: string[] }
}

// Génération des métadonnées SEO par page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug?.join('/') || 'home'
  const page: Page = await client.fetch(pageBySlugQuery, { slug })
  
  if (!page) {
    return {
      title: 'Page introuvable',
      robots: { index: false, follow: false },
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const pageUrl = slug === 'home' ? baseUrl : `${baseUrl}/${slug}`
  
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
    keywords: page.seoKeywords,
    robots: {
      index: !page.noIndex,
      follow: !page.noIndex,
    },
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.seoDescription,
      url: pageUrl,
      images: page.seoImage ? [{
        url: urlFor(page.seoImage).width(1200).height(630).url(),
        width: 1200,
        height: 630,
        alt: page.seoTitle || page.title,
      }] : undefined,
    },
    twitter: {
      title: page.seoTitle || page.title,
      description: page.seoDescription,
      images: page.seoImage ? [urlFor(page.seoImage).width(1200).height(630).url()] : undefined,
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}

export default async function DynamicPage({ params }: Props) {
  const slug = params.slug?.join('/') || 'home'
  const page: Page = await client.fetch(pageBySlugQuery, { slug })
  
  if (!page) {
    notFound()
  }

  return (
    <ClientPageWrapper page={page}>
      <PageContainer>
        {page.pageBuilder && page.pageBuilder.length > 0 ? (
          <BlocksContainer>
            <BlockRenderer blocks={page.pageBuilder} />
          </BlocksContainer>
        ) : (
          <PageContent>
            <EmptyState>
              <PageTitle>{page.title}</PageTitle>
              <PageMessage>
                Cette page est vide. Ajoutez des composants dans le constructeur de page.
              </PageMessage>
            </EmptyState>
          </PageContent>
        )}
      </PageContainer>
    </ClientPageWrapper>
  )
}
