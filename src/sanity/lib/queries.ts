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
      },
      _type == 'heroBlock' => {
        title,
        subtitle,
        ctaButtons[] {
          text,
          href,
          variant,
          size
        },
        layout,
        backgroundSettings {
          backgroundType,
          backgroundColor,
          gradientColors {
            from,
            to,
            direction
          },
          backgroundImage {
            asset->{
              _id,
              url
            }
          },
          backgroundOverlay {
            enabled,
            color
          }
        },
        styling {
          textColor,
          textAlignment,
          verticalAlignment,
          height,
          spacing
        }
      },
      _type == 'featureGridBlock' => {
        title,
        subtitle,
        gridLayout,
        features[] {
          icon,
          iconColor,
          title,
          description,
          link,
          featured
        },
        cardStyle,
        iconStyle,
        textAlignment,
        spacing,
        backgroundColor,
        textColor
      },
      _type == 'contactBlock' => {
        title,
        subtitle,
        layout,
        formFields[] {
          fieldType,
          label,
          placeholder,
          required,
          width
        },
        submitButton,
        successMessage,
        contactInfo,
        styling
      },
      _type == 'galleryBlock' => {
        title,
        subtitle,
        layout,
        images[] {
          image {
            asset->{
              _id,
              url
            }
          },
          alt,
          caption,
          category,
          featured
        },
        gridSettings,
        carouselSettings,
        filterOptions,
        lightboxOptions,
        styling
      },
      _type == 'teamBlock' => {
        title,
        subtitle,
        blockType,
        layout,
        teamMembers[] {
          name,
          position,
          photo {
            asset->{
              _id,
              url
            }
          },
          bio,
          skills,
          socialLinks,
          featured,
          order
        },
        testimonials[] {
          content,
          author {
            name,
            position,
            company,
            photo {
              asset->{
                _id,
                url
              }
            }
          },
          rating,
          featured,
          date
        },
        gridSettings,
        carouselSettings,
        cardStyle,
        showSocialLinks,
        showSkills,
        styling
      },
      _type == 'statsBlock' => {
        title,
        subtitle,
        layout,
        stats[] {
          number,
          suffix,
          prefix,
          label,
          description,
          icon,
          color,
          featured,
          animationType,
          animationDuration,
          order
        },
        animationSettings,
        backgroundSettings {
          backgroundType,
          backgroundColor,
          gradientColors,
          backgroundImage {
            asset->{
              _id,
              url
            }
          },
          overlay
        },
        styling
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

// Requête supprimée - utiliser headerSettingsQuery et footerSettingsQuery directement

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
