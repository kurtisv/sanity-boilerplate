/**
 * Configuration centralisée et constantes du projet
 * Évite la duplication et centralise les valeurs importantes
 */

// Configuration Sanity
export const SANITY_CONFIG = {
  API_VERSION: '2025-10-30',
  DATASET: 'production',
  USE_CDN: true,
} as const

// Configuration des blocs par défaut
export const DEFAULT_BLOCK_SETTINGS = {
  TEXT_BLOCK: {
    maxWidth: 'wide' as const,
    paddingSize: 'medium' as const,
    alignment: 'left' as const,
  },
  HERO_BLOCK: {
    layout: 'centered' as const,
    height: 'medium' as const,
    textAlignment: 'center' as const,
  },
  FEATURE_GRID: {
    gridLayout: '3-balanced' as const,
    cardStyle: 'shadow' as const,
    spacing: 'normal' as const,
  },
} as const

// Configuration des couleurs par défaut
export const DEFAULT_COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#6b7280',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  BACKGROUND: '#ffffff',
  TEXT: '#1f2937',
} as const

// Configuration des espacements
export const SPACING = {
  COMPACT: 'py-8',
  NORMAL: 'py-12',
  COMFORTABLE: 'py-16',
  LARGE: 'py-20',
  XL: 'py-24',
} as const

// Configuration des animations
export const ANIMATIONS = {
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
  },
} as const

// Configuration des breakpoints (correspond à Tailwind)
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const

// Messages d'erreur standardisés
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Ce champ est requis',
  INVALID_EMAIL: 'Adresse email invalide',
  INVALID_PHONE: 'Numéro de téléphone invalide',
  FORM_SUBMISSION_ERROR: 'Erreur lors de l\'envoi du formulaire',
  NETWORK_ERROR: 'Erreur de connexion réseau',
  UNKNOWN_ERROR: 'Une erreur inattendue s\'est produite',
} as const

// Configuration des formulaires
export const FORM_CONFIG = {
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^[\+]?[0-9\s\-\(\)]{8,}$/,
    MIN_MESSAGE_LENGTH: 10,
    MAX_MESSAGE_LENGTH: 1000,
  },
  SUBMISSION: {
    TIMEOUT: 10000, // 10 secondes
    RETRY_ATTEMPTS: 3,
  },
} as const

// Configuration des images
export const IMAGE_CONFIG = {
  QUALITY: 80,
  FORMATS: ['webp', 'jpg', 'png'] as const,
  SIZES: {
    THUMBNAIL: { width: 150, height: 150 },
    SMALL: { width: 300, height: 200 },
    MEDIUM: { width: 600, height: 400 },
    LARGE: { width: 1200, height: 800 },
    HERO: { width: 1920, height: 1080 },
  },
} as const

// Configuration SEO par défaut
export const SEO_DEFAULTS = {
  TITLE_SUFFIX: ' - Sanity Boilerplate',
  DESCRIPTION: 'Site web professionnel créé avec Next.js et Sanity CMS',
  KEYWORDS: ['Next.js', 'Sanity', 'CMS', 'React', 'TypeScript'],
  OG_TYPE: 'website',
  TWITTER_CARD: 'summary_large_image',
} as const

// Configuration des routes
export const ROUTES = {
  HOME: '/',
  DEMO: '/demo',
  STUDIO: '/studio',
  ADMIN: '/admin',
  API: {
    REVALIDATE: '/api/revalidate',
    AUTO_GENERATE: '/api/auto-generate',
    IMPORT_DEMO: '/api/import-demo',
  },
} as const

// Configuration du développement
export const DEV_CONFIG = {
  SHOW_DEBUG_INFO: process.env.NODE_ENV === 'development',
  ENABLE_CONSOLE_LOGS: process.env.NODE_ENV === 'development',
  MOCK_API_DELAY: 2000, // 2 secondes pour simuler les appels API
} as const
