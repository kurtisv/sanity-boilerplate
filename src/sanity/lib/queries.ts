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

// Récupérer les paramètres unifiés du site
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    header {
      logo {
        asset->{
          _id,
          url
        }
      },
      layout,
      navigationMenu[] {
        title,
        link,
        submenu[] {
          title,
          link
        }
      },
      cta {
        text,
        link
      },
      backgroundColor,
      textColor
    },
    footer {
      text,
      columns[] {
        title,
        links[] {
          title,
          link
        }
      },
      socialLinks {
        facebook,
        twitter,
        instagram,
        linkedin,
        youtube
      },
      copyrightText,
      backgroundColor,
      textColor
    }
  }
`

// Récupérer les paramètres du header (legacy - pour compatibilité)
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
    navigationMenu[] {
      title,
      link,
      submenu[] {
        title,
        link
      }
    },
    cta,
    backgroundColor,
    textColor
  }
`

// Récupérer les paramètres du footer (legacy - pour compatibilité)
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
