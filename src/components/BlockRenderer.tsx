'use client'

import TextBlock from "./blocks/TextBlock"
import HeroBlock from "./blocks/HeroBlock"
import FeatureGridBlock from "./blocks/FeatureGridBlock"
import ContactBlock from "./blocks/ContactBlock"
import GalleryBlock from "./blocks/GalleryBlock"
import TeamBlock from "./blocks/TeamBlock/TeamBlock"
import StatsBlock from "./blocks/StatsBlock/StatsBlock"

// Base block interface
interface BaseBlock {
  _type: string
  _key: string
}

// Specific block types
interface TextBlockData extends BaseBlock {
  _type: 'textBlock'
  content?: any[] // Portable Text content array
  alignment?: 'left' | 'center' | 'right'
  maxWidth?: 'narrow' | 'medium' | 'wide' | 'full'
  backgroundColor?: string
  paddingSize?: 'small' | 'medium' | 'large'
}

interface HeroBlockData extends BaseBlock {
  _type: 'heroBlock'
  title: string
  subtitle?: string
  ctaButtons?: Array<{
    text: string
    href: string
    variant: 'primary' | 'secondary' | 'ghost'
    size: 'sm' | 'md' | 'lg'
  }>
  layout?: 'centered' | 'left-image' | 'right-image' | 'fullwidth'
  backgroundSettings?: {
    backgroundType: 'solid' | 'gradient' | 'image'
    backgroundColor?: string
    gradientColors?: {
      from: string
      to: string
      direction: string
    }
    backgroundImage?: {
      asset: {
        _id: string
        url: string
      }
    }
    backgroundOverlay?: {
      enabled: boolean
      color: string
    }
  }
  styling?: {
    textColor?: string
    textAlignment?: 'left' | 'center' | 'right'
    verticalAlignment?: 'top' | 'center' | 'bottom'
    height?: 'small' | 'medium' | 'large' | 'fullscreen'
    spacing?: 'compact' | 'normal' | 'large'
  }
}

interface FeatureGridBlockData extends BaseBlock {
  _type: 'featureGridBlock'
  title?: string
  subtitle?: string
  gridLayout: string
  features: Array<{
    icon: string
    iconColor: string
    title: string
    description: string
    link?: {
      url: string
      text: string
    }
    featured: boolean
  }>
  cardStyle: 'minimal' | 'bordered' | 'shadow' | 'colored' | 'glass'
  iconStyle: 'simple' | 'circle' | 'square' | 'gradient'
  textAlignment: 'left' | 'center' | 'right'
  spacing: 'compact' | 'normal' | 'large'
  backgroundColor: string
  textColor: string
}

interface ContactBlockData extends BaseBlock {
  _type: 'contactBlock'
  title?: string
  subtitle?: string
  layout: 'centered' | 'two-columns' | 'with-sidebar' | 'full-width'
  formFields: Array<{
    fieldType: 'name' | 'email' | 'phone' | 'company' | 'subject' | 'message' | 'custom'
    label: string
    placeholder?: string
    required: boolean
    width: 'half' | 'full'
  }>
  submitButton: {
    text: string
    loadingText: string
  }
  successMessage: {
    title: string
    description: string
  }
  contactInfo: {
    showContactInfo: boolean
    address?: string
    phone?: string
    email?: string
    hours?: string
  }
  styling: {
    backgroundColor: string
    textColor: string
    spacing: 'compact' | 'normal' | 'large'
  }
}

interface GalleryBlockData extends BaseBlock {
  _type: 'galleryBlock'
  title?: string
  subtitle?: string
  layout: 'grid' | 'masonry' | 'carousel' | 'mosaic'
  images: Array<{
    image: { asset: { _id: string; url: string } }
    alt: string
    caption?: string
    category?: string
    featured: boolean
  }>
  gridSettings: {
    columns: { desktop: number; tablet: number; mobile: number }
    aspectRatio: '1:1' | '4:3' | '16:9' | '3:4' | 'auto'
    gap: 'none' | 'small' | 'medium' | 'large'
  }
  carouselSettings: {
    autoplay: boolean
    autoplaySpeed: number
    showDots: boolean
    showArrows: boolean
    slidesToShow: { desktop: number; tablet: number; mobile: number }
  }
  filterOptions: {
    enableFilters: boolean
    filterStyle: 'buttons' | 'dropdown' | 'tags'
    showAllOption: boolean
  }
  lightboxOptions: {
    enableLightbox: boolean
    showCaptions: boolean
    showCounter: boolean
    enableZoom: boolean
  }
  styling: {
    backgroundColor: string
    textColor: string
    spacing: 'compact' | 'normal' | 'large'
    borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full'
  }
}

interface TeamBlockData extends BaseBlock {
  _type: 'teamBlock'
  title?: string
  subtitle?: string
  blockType: 'team' | 'testimonials' | 'mixed'
  layout: 'grid' | 'carousel' | 'list' | 'hero-grid'
  teamMembers?: Array<{
    name: string
    position: string
    photo: { asset: { _id: string; url: string } }
    bio?: string
    skills?: string[]
    socialLinks?: {
      linkedin?: string
      twitter?: string
      github?: string
      website?: string
      email?: string
    }
    featured: boolean
    order: number
  }>
  testimonials?: Array<{
    content: string
    author: {
      name: string
      position?: string
      company?: string
      photo?: { asset: { _id: string; url: string } }
    }
    rating: number
    featured: boolean
    date?: string
  }>
  gridSettings: {
    columns: { desktop: number; tablet: number; mobile: number }
    gap: 'small' | 'medium' | 'large'
  }
  carouselSettings: {
    autoplay: boolean
    autoplaySpeed: number
    showDots: boolean
    showArrows: boolean
  }
  cardStyle: 'minimal' | 'bordered' | 'shadow' | 'colored' | 'glass'
  showSocialLinks: boolean
  showSkills: boolean
  styling: {
    backgroundColor: string
    textColor: string
    accentColor: string
    spacing: 'compact' | 'normal' | 'large'
  }
}

interface StatsBlockData extends BaseBlock {
  _type: 'statsBlock'
  title?: string
  subtitle?: string
  layout: 'horizontal' | 'grid-2x2' | 'grid-3col' | 'grid-4col' | 'carousel' | 'hero-stats'
  stats: Array<{
    number: number
    suffix?: string
    prefix?: string
    label: string
    description?: string
    icon?: string
    color?: string
    featured: boolean
    animationType: 'counter' | 'progress' | 'pulse' | 'bounce' | 'fade'
    animationDuration: number
    order: number
  }>
  animationSettings: {
    enableAnimations: boolean
    triggerOffset: number
    staggerDelay: number
    easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'bounce'
  }
  backgroundSettings: {
    backgroundType: 'solid' | 'gradient' | 'image' | 'pattern'
    backgroundColor: string
    gradientColors?: {
      from: string
      to: string
      direction: 'to-b' | 'to-r' | 'to-br' | 'to-bl'
    }
    backgroundImage?: { asset: { _id: string; url: string } }
    overlay?: {
      enabled: boolean
      color: string
      opacity: number
    }
  }
  styling: {
    textColor: string
    numberColor: string
    cardStyle: 'minimal' | 'bordered' | 'shadow' | 'colored' | 'glass'
    spacing: 'compact' | 'normal' | 'large'
    alignment: 'left' | 'center' | 'right'
  }
}

// Union type for all possible blocks
export type Block = TextBlockData | HeroBlockData | FeatureGridBlockData | ContactBlockData | GalleryBlockData | TeamBlockData | StatsBlockData

type BlockRendererProps = {
  blocks: Block[]
}

/**
 * BlockRenderer
 * 
 * Dynamically renders blocks based on their type with full type safety.
 * 
 * Supported blocks:
 * - textBlock: Rich content with Portable Text
 * - heroBlock: Hero banners with CTA and background images
 * - featureGridBlock: Feature grids with icons and multiple layouts
 * 
 * To add a new block:
 * 1. Create the block component in src/components/blocks/
 * 2. Add the block schema in src/sanity/schemas/blocks/
 * 3. Register the schema in src/sanity/schemaTypes/index.ts
 * 4. Add the block to the page schema in src/sanity/schemas/page.ts
 * 5. Update the GROQ query in src/sanity/lib/queries.ts
 * 6. Import the component here
 * 7. Add the interface type above
 * 8. Add to the Block union type
 * 9. Add a case in the switch statement below
 */
export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block) => {
        // Validation runtime pour s'assurer que le bloc a les propriétés requises
        if (!block._type || !block._key) {
          console.warn('Block missing required _type or _key:', block)
          return null
        }

        switch (block._type) {
          case 'textBlock':
            return <TextBlock key={block._key} {...block} />
          
          case 'heroBlock':
            // Validation spécifique pour heroBlock
            if (!block.title) {
              console.warn('HeroBlock missing required title:', block)
              return null
            }
            return <HeroBlock key={block._key} {...block} />
          
          case 'featureGridBlock':
            // Validation spécifique pour featureGridBlock
            if (!block.features || !Array.isArray(block.features)) {
              console.warn('FeatureGridBlock missing or invalid features array:', block)
              return null
            }
            return <FeatureGridBlock key={block._key} {...block} />
          
          case 'contactBlock':
            // Validation spécifique pour contactBlock
            if (!block.formFields || !Array.isArray(block.formFields)) {
              console.warn('ContactBlock missing or invalid formFields array:', block)
              return null
            }
            return <ContactBlock key={block._key} {...block} />
          
          case 'galleryBlock':
            // Validation spécifique pour galleryBlock
            if (!block.images || !Array.isArray(block.images)) {
              console.warn('GalleryBlock missing or invalid images array:', block)
              return null
            }
            return <GalleryBlock key={block._key} {...block} />
          
          case 'teamBlock':
            // Validation spécifique pour teamBlock
            const hasTeamMembers = block.teamMembers && Array.isArray(block.teamMembers)
            const hasTestimonials = block.testimonials && Array.isArray(block.testimonials)
            if (!hasTeamMembers && !hasTestimonials) {
              console.warn('TeamBlock missing both teamMembers and testimonials arrays:', block)
              return null
            }
            return <TeamBlock key={block._key} {...block} />
          
          case 'statsBlock':
            // Validation spécifique pour statsBlock
            if (!block.stats || !Array.isArray(block.stats)) {
              console.warn('StatsBlock missing or invalid stats array:', block)
              return null
            }
            return <StatsBlock key={block._key} {...block} />
          
          // Add more block types here:
          
          default:
            console.warn('Unknown block type:', (block as any)._type)
            return null
        }
      })}
    </>
  )
}
