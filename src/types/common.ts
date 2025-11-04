/**
 * Types communs utilisés dans tout le projet
 */

// Type de base pour tous les blocs Sanity
export interface BaseBlock {
  _type: string
  _key: string
  [key: string]: any
}

// Props de base pour tous les composants de blocs
export interface BaseBlockProps extends BaseBlock {
  title?: string
  subtitle?: string
}

// Utilitaire pour normaliser les props qui peuvent être null/undefined
export type NormalizeProps<T> = {
  [K in keyof T]: T[K] extends object | undefined ? NonNullable<T[K]> : T[K]
}

// Types pour les animations
export interface AnimationSettings {
  enableAnimations?: boolean
  triggerOffset?: number
  staggerDelay?: number
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'bounce'
}

// Types pour les arrière-plans
export interface BackgroundSettings {
  backgroundType?: 'solid' | 'gradient' | 'image' | 'pattern'
  backgroundColor?: string
  gradientColors?: {
    from: string
    to: string
    direction: 'to-b' | 'to-r' | 'to-br' | 'to-bl'
  }
  backgroundImage?: {
    asset: {
      _id: string
      url: string
    }
  }
  overlay?: {
    enabled: boolean
    color: string
    opacity: number
  }
}

// Types pour le styling
export interface StylingSettings {
  textColor?: string
  headingColor?: string
  accentColor?: string
  alignment?: 'left' | 'center' | 'right'
  cardStyle?: 'minimal' | 'bordered' | 'shadow' | 'colored' | 'glass'
  spacing?: 'compact' | 'normal' | 'large'
}

// Types pour les boutons CTA
export interface CTAButton {
  text: string
  href: string
  variant: 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md' | 'lg'
}
