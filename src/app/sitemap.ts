import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { pageSlugsQuery } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const pages: { slug: string }[] = await client.fetch(pageSlugsQuery)

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/studio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  const dynamicRoutes: MetadataRoute.Sitemap = pages.map(({ slug }) => ({
    url: `${baseUrl}/${slug === 'home' ? '' : slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: slug === 'home' ? 1 : 0.7,
  }))

  return [...staticRoutes, ...dynamicRoutes]
}
