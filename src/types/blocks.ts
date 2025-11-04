/**
 * Types centralisés pour tous les blocs Sanity
 * Évite la duplication et assure la cohérence
 */

// Base block interface
export interface BaseBlock {
  _type: string
  _key: string
}

// Theme-related types
export interface ThemeSettings {
  backgroundSettings?: BackgroundSettings
  styling?: StylingSettings
  typography?: TypographySettings
  icon?: IconSettings
}

export interface BackgroundSettings {
  backgroundType?: 'solid' | 'gradient' | 'image' | 'transparent'
  backgroundColor?: string
  gradientSettings?: {
    gradientType?: 'preset' | 'custom'
    preset?: string
    custom?: {
      from: string
      to: string
      via?: string
      direction: string
      intensity?: number
    }
  }
  backgroundImage?: {
    asset: { url: string }
    alt?: string
    overlay?: {
      enabled: boolean
      color: string
      opacity: number
    }
  }
}

export interface StylingSettings {
  textColor?: string
  headingColor?: string
  accentColor?: string
  alignment?: 'left' | 'center' | 'right'
  spacing?: 'compact' | 'normal' | 'comfortable' | 'large' | 'xl'
  cardStyle?: 'minimal' | 'bordered' | 'shadow' | 'elevated' | 'colored' | 'glass'
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  animation?: {
    enabled: boolean
    type: 'fade' | 'slideUp' | 'slideLeft' | 'zoom' | 'rotate'
    duration: number
    delay: number
  }
}

export interface TypographySettings {
  fontFamily?: string
  headingSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  textSize?: 'sm' | 'md' | 'lg'
  lineHeight?: 'tight' | 'normal' | 'relaxed'
  fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
}

export interface IconSettings {
  iconType?: string
  iconColor?: string
  iconSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  iconPosition?: 'top' | 'left' | 'right' | 'background'
  iconStyle?: 'normal' | 'filled' | 'outlined' | 'shadow' | 'circle' | 'rounded'
}

// Specific block types
export interface TextBlockData extends BaseBlock, ThemeSettings {
  _type: 'textBlock'
  content?: any[]
  alignment?: 'left' | 'center' | 'right'
  maxWidth?: 'small' | 'medium' | 'wide' | 'full'
  paddingSize?: 'small' | 'medium' | 'large'
}

export interface HeroBlockData extends BaseBlock, ThemeSettings {
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
  heroSettings?: {
    height?: 'small' | 'medium' | 'large' | 'fullscreen'
    textAlignment?: 'left' | 'center' | 'right'
    verticalAlignment?: 'top' | 'center' | 'bottom'
  }
}

export interface FeatureGridBlockData extends BaseBlock, ThemeSettings {
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
}

export interface ContactBlockData extends BaseBlock, ThemeSettings {
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
}

export interface GalleryBlockData extends BaseBlock, ThemeSettings {
  _type: 'galleryBlock'
  title?: string
  subtitle?: string
  images: Array<{
    asset: { url: string }
    alt?: string
    caption?: string
  }>
  layout: 'grid' | 'masonry' | 'carousel' | 'lightbox'
  columns: number
  spacing: 'compact' | 'normal' | 'large'
}

export interface TeamBlockData extends BaseBlock, ThemeSettings {
  _type: 'teamBlock'
  title?: string
  subtitle?: string
  blockType: 'team' | 'testimonials'
  layout: string
  teamMembers: Array<{
    name: string
    position: string
    bio?: string
    image?: {
      asset: { url: string }
      alt?: string
    }
    socialLinks?: Array<{
      platform: string
      url: string
    }>
    skills?: string[]
  }>
}

export interface StatsBlockData extends BaseBlock, ThemeSettings {
  _type: 'statsBlock'
  title?: string
  subtitle?: string
  layout: string
  stats: Array<{
    number: string
    label: string
    description?: string
    icon?: string
    featured?: boolean
  }>
  animationSettings: {
    enableAnimations: boolean
    animationType: string
    duration: number
    delay: number
    easing: string
  }
}

// Union type for all blocks
export type Block = 
  | TextBlockData
  | HeroBlockData
  | FeatureGridBlockData
  | ContactBlockData
  | GalleryBlockData
  | TeamBlockData
  | StatsBlockData

// Page-related types
export interface PageStyleSettings {
  pageBackgroundSettings?: BackgroundSettings
  pageLayout?: {
    maxWidth?: 'full' | 'xl' | 'lg' | 'md' | 'sm'
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  }
  pageTypography?: TypographySettings
  pageColors?: {
    textColor?: string
    headingColor?: string
    accentColor?: string
    linkColor?: string
  }
}

export interface Page {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  seoImage?: {
    asset: {
      _ref: string
    }
  }
  noIndex?: boolean
  pageBackgroundSettings?: BackgroundSettings
  pageLayout?: PageStyleSettings['pageLayout']
  pageTypography?: TypographySettings
  pageColors?: PageStyleSettings['pageColors']
}
