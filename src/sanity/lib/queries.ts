import { groq } from 'next-sanity'

// Récupérer une page par son slug
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    pageBuilder[] {
      _type,
      _key,
      _type == 'textBlock' => {
        content[] {
          ...,
          _type == 'image' => {
            ...,
            asset->{
              _id,
              url
            }
          }
        },
        alignment,
        maxWidth,
        backgroundColor,
        paddingSize
      }
    },
    seoTitle,
    seoDescription,
    seoImage {
      asset->{
        _id,
        url
      }
    },
    seoKeywords,
    noIndex,
    customCss,
    customJs,
    publishedAt
  }
`

// Récupérer tous les slugs de pages
export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)] {
    "slug": slug.current
  }
`

// Récupérer les paramètres du header
export const headerSettingsQuery = groq`
  *[_type == "headerSettings"][0] {
    logoType,
    logo {
      asset->{
        _id,
        url
      }
    },
    logoText,
    backgroundColor,
    textColor,
    navigationMenu[] {
      title,
      link,
      submenu[] {
        title,
        link
      }
    },
    cta
  }
`

// Récupérer les paramètres du footer
export const footerSettingsQuery = groq`
  *[_type == "footerSettings"][0] {
    text,
    backgroundColor,
    textColor,
    columns[] {
      title,
      links[] {
        title,
        link
      }
    },
    socialLinks,
    copyrightText
  }
`
