import Script from 'next/script'

type WebsiteJsonLdProps = {
  name: string
  description: string
  url: string
  logo?: string
}

type PageJsonLdProps = {
  title: string
  description: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
}

export function WebsiteJsonLd({ name, description, url, logo }: WebsiteJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    ...(logo && { logo }),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function PageJsonLd({ 
  title, 
  description, 
  url, 
  image, 
  datePublished, 
  dateModified 
}: PageJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    ...(image && { image }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    mainEntity: {
      '@type': 'Article',
      headline: title,
      description,
      ...(image && { image }),
      ...(datePublished && { datePublished }),
      ...(dateModified && { dateModified }),
    },
  }

  return (
    <Script
      id="page-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function OrganizationJsonLd({
  name,
  description,
  url,
  logo,
  contactPoint,
  sameAs,
}: {
  name: string
  description: string
  url: string
  logo?: string
  contactPoint?: {
    telephone?: string
    email?: string
    contactType?: string
  }
  sameAs?: string[]
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url,
    ...(logo && { logo }),
    ...(contactPoint && { contactPoint: {
      '@type': 'ContactPoint',
      ...contactPoint,
    }}),
    ...(sameAs && { sameAs }),
  }

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
