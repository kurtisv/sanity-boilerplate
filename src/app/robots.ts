import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const isProduction = process.env.NODE_ENV === 'production'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio',      // Sanity Studio
          '/api/',        // API routes
          '/_next/',      // Next.js internals
          '/admin',       // Admin routes si ajoutées
        ],
      },
      // Règles spécifiques pour les bots de développement en local
      ...(!isProduction ? [{
        userAgent: '*',
        disallow: '/',  // Bloquer l'indexation en développement
      }] : []),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
