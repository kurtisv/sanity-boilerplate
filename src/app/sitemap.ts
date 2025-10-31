import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

// Requête pour récupérer les pages avec dates de modification
const pagesForSitemapQuery = groq`
  *[_type == "page" && defined(slug.current) && !noIndex] {
    "slug": slug.current,
    _updatedAt,
    publishedAt
  }
`

// Configuration ISR pour le sitemap : revalidation toutes les heures
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  try {
    const pages: { 
      slug: string
      _updatedAt: string
      publishedAt?: string
    }[] = await client.fetch(pagesForSitemapQuery)

    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
    ]

    const dynamicRoutes: MetadataRoute.Sitemap = pages.map(({ slug, _updatedAt, publishedAt }) => ({
      url: `${baseUrl}/${slug === 'home' ? '' : slug}`,
      lastModified: new Date(publishedAt || _updatedAt),
      changeFrequency: 'weekly' as const,
      priority: slug === 'home' ? 1 : 0.7,
    }))

    return [...staticRoutes, ...dynamicRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Fallback sitemap en cas d'erreur
    return [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
    ]
  }
}
