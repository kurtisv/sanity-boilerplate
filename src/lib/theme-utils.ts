// Utilitaires pour appliquer les thèmes dans les composants React

export interface ThemeSettings {
  backgroundSettings?: {
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
  styling?: {
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
  typography?: {
    fontFamily?: string
    headingSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    textSize?: 'sm' | 'md' | 'lg'
    lineHeight?: 'tight' | 'normal' | 'relaxed'
    fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  }
  icon?: {
    iconType?: string
    iconColor?: string
    iconSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    iconPosition?: 'top' | 'left' | 'right' | 'background'
    iconStyle?: 'normal' | 'filled' | 'outlined' | 'shadow' | 'circle' | 'rounded'
  }
}

// Dégradés prédéfinis
const gradientPresets = [
  { from: '#3b82f6', to: '#8b5cf6', direction: 'to-br' }, // Bleu → Violet
  { from: '#8b5cf6', to: '#ec4899', direction: 'to-br' }, // Violet → Rose
  { from: '#10b981', to: '#3b82f6', direction: 'to-br' }, // Vert → Bleu
  { from: '#f97316', to: '#ef4444', direction: 'to-br' }, // Orange → Rouge
  { from: '#6366f1', to: '#8b5cf6', direction: 'to-br' }, // Indigo → Violet
  { from: '#14b8a6', to: '#10b981', direction: 'to-br' }, // Teal → Vert
]

/**
 * Génère les styles CSS pour les arrière-plans
 */
export function getBackgroundStyles(backgroundSettings?: ThemeSettings['backgroundSettings']): React.CSSProperties {
  if (!backgroundSettings) return {}

  const styles: React.CSSProperties = {}

  switch (backgroundSettings.backgroundType) {
    case 'solid':
      if (backgroundSettings.backgroundColor) {
        styles.backgroundColor = backgroundSettings.backgroundColor
      }
      break

    case 'gradient':
      if (backgroundSettings.gradientSettings?.gradientType === 'preset' && backgroundSettings.gradientSettings?.preset) {
        try {
          const preset = JSON.parse(backgroundSettings.gradientSettings.preset)
          if (preset.direction === 'radial') {
            styles.background = `radial-gradient(circle, ${preset.from}, ${preset.to})`
          } else {
            styles.background = `linear-gradient(${preset.direction}, ${preset.from}, ${preset.to})`
          }
        } catch (error) {
          console.error('Erreur lors du parsing du dégradé prédéfini:', error)
        }
      } else if (backgroundSettings.gradientSettings?.gradientType === 'custom' && backgroundSettings.gradientSettings?.custom) {
        const { from, to, via, direction, intensity = 100 } = backgroundSettings.gradientSettings.custom
        if (from && to && direction) {
          let gradientString = ''
          
          if (direction === 'radial') {
            // Dégradé radial
            if (via) {
              gradientString = `radial-gradient(circle, ${from}, ${via}, ${to})`
            } else {
              gradientString = `radial-gradient(circle, ${from}, ${to})`
            }
          } else {
            // Dégradé linéaire
            if (via) {
              gradientString = `linear-gradient(${direction}, ${from}, ${via}, ${to})`
            } else {
              gradientString = `linear-gradient(${direction}, ${from}, ${to})`
            }
          }
          
          // Appliquer l'intensité si différente de 100%
          if (intensity < 100) {
            styles.background = `${gradientString}`
            styles.opacity = intensity / 100
          } else {
            styles.background = gradientString
          }
        }
      }
      break

    case 'image':
      if (backgroundSettings.backgroundImage?.asset?.url) {
        styles.backgroundImage = `url(${backgroundSettings.backgroundImage.asset.url})`
        styles.backgroundSize = 'cover'
        styles.backgroundPosition = 'center'
        styles.backgroundRepeat = 'no-repeat'

        // Superposition si activée
        if (backgroundSettings.backgroundImage.overlay?.enabled) {
          const { color, opacity } = backgroundSettings.backgroundImage.overlay
          const overlayColor = `${color}${Math.round((opacity / 100) * 255).toString(16).padStart(2, '0')}`
          styles.position = 'relative'
          // Note: La superposition sera gérée avec un pseudo-élément dans le CSS
        }
      }
      break

    case 'transparent':
      styles.backgroundColor = 'transparent'
      break
  }

  return styles
}

/**
 * Génère les classes CSS pour les styles d'un bloc
 */
export function getStyleClasses(styling?: ThemeSettings['styling']): string {
  if (!styling) return ''

  const classes: string[] = []

  // Alignement
  if (styling.alignment) {
    classes.push(`align-${styling.alignment}`)
  }

  // Espacement
  if (styling.spacing) {
    classes.push(`spacing-${styling.spacing}`)
  }

  // Style de carte
  if (styling.cardStyle) {
    classes.push(`card-${styling.cardStyle}`)
  }

  // Rayon de bordure
  if (styling.borderRadius) {
    classes.push(`radius-${styling.borderRadius}`)
  }

  // Animation
  if (styling.animation?.enabled && styling.animation.type) {
    classes.push(`animate-${styling.animation.type}`)
  }

  return classes.join(' ')
}

/**
 * Génère les variables CSS personnalisées pour un bloc
 */
export function getThemeVariables(theme: ThemeSettings): Record<string, string> {
  const variables: Record<string, string> = {}

  if (theme.styling) {
    if (theme.styling.textColor) {
      variables['--text-color'] = theme.styling.textColor
    }
    if (theme.styling.headingColor) {
      variables['--heading-color'] = theme.styling.headingColor
    }
    if (theme.styling.accentColor) {
      variables['--accent-color'] = theme.styling.accentColor
    }
    if (theme.styling.animation) {
      variables['--animation-duration'] = `${theme.styling.animation.duration}ms`
      variables['--animation-delay'] = `${theme.styling.animation.delay}ms`
    }
  }

  if (theme.backgroundSettings?.backgroundColor) {
    variables['--bg-color'] = theme.backgroundSettings.backgroundColor
  }

  return variables
}

/**
 * Génère les classes CSS pour la typographie
 */
export function getTypographyClasses(typography?: ThemeSettings['typography']): string {
  if (!typography) return ''

  const classes: string[] = []

  if (typography.fontFamily && typography.fontFamily !== 'system') {
    classes.push(`font-${typography.fontFamily}`)
  }

  if (typography.textSize) {
    classes.push(`text-${typography.textSize}`)
  }

  if (typography.lineHeight) {
    classes.push(`leading-${typography.lineHeight}`)
  }

  if (typography.fontWeight && typography.fontWeight !== 'normal') {
    classes.push(`font-${typography.fontWeight}`)
  }

  return classes.join(' ')
}

/**
 * Génère les classes CSS pour les titres
 */
export function getHeadingClasses(typography?: ThemeSettings['typography']): string {
  if (!typography) return ''

  const classes: string[] = []

  if (typography.fontFamily && typography.fontFamily !== 'system') {
    classes.push(`font-${typography.fontFamily}`)
  }

  if (typography.headingSize) {
    classes.push(`heading-${typography.headingSize}`)
  }

  if (typography.lineHeight) {
    classes.push(`leading-${typography.lineHeight}`)
  }

  if (typography.fontWeight && typography.fontWeight !== 'normal') {
    classes.push(`font-${typography.fontWeight}`)
  }

  return classes.join(' ')
}

/**
 * Fonction utilitaire principale pour appliquer tous les styles de thème
 */
export function applyTheme(theme: ThemeSettings) {
  return {
    containerStyle: {
      ...getBackgroundStyles(theme.backgroundSettings),
      ...getThemeVariables(theme),
    },
    containerClasses: [
      getStyleClasses(theme.styling),
      getTypographyClasses(theme.typography),
    ].filter(Boolean).join(' '),
    headingClasses: getHeadingClasses(theme.typography),
    textClasses: getTypographyClasses(theme.typography),
    hasIcon: Boolean(theme.icon?.iconType),
    iconConfig: theme.icon,
  }
}

/**
 * Hook pour utiliser les styles de thème dans un composant
 */
export function useThemeStyles(theme: ThemeSettings) {
  return applyTheme(theme)
}

// Types pour les styles de page
export interface PageStyleSettings {
  pageBackgroundSettings?: {
    backgroundType?: 'solid' | 'gradient' | 'image' | 'transparent'
    backgroundColor?: string
    gradientSettings?: {
      preset?: string
      custom?: {
        from: string
        to: string
        direction: string
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
  pageLayout?: {
    maxWidth?: 'full' | 'xl' | 'lg' | 'md' | 'sm'
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  }
  pageTypography?: {
    fontFamily?: string
    baseTextSize?: 'sm' | 'md' | 'lg'
    lineHeight?: 'tight' | 'normal' | 'relaxed'
  }
  pageColors?: {
    textColor?: string
    headingColor?: string
    accentColor?: string
    linkColor?: string
  }
}

/**
 * Génère les styles CSS pour une page complète
 */
export function getPageStyles(pageStyles?: PageStyleSettings): React.CSSProperties {
  if (!pageStyles) return {}

  const styles: React.CSSProperties = {}

  // Arrière-plan de la page
  if (pageStyles.pageBackgroundSettings) {
    const bgStyles = getBackgroundStyles(pageStyles.pageBackgroundSettings)
    Object.assign(styles, bgStyles)
  }

  return styles
}

/**
 * Génère les classes CSS pour une page complète
 */
export function getPageClasses(pageStyles?: PageStyleSettings): string {
  if (!pageStyles) return ''

  const classes: string[] = []

  // Largeur maximale
  if (pageStyles.pageLayout?.maxWidth) {
    switch (pageStyles.pageLayout.maxWidth) {
      case 'full': classes.push('max-w-full'); break
      case 'xl': classes.push('max-w-7xl'); break
      case 'lg': classes.push('max-w-5xl'); break
      case 'md': classes.push('max-w-4xl'); break
      case 'sm': classes.push('max-w-2xl'); break
    }
    classes.push('mx-auto')
  }

  // Padding global
  if (pageStyles.pageLayout?.padding) {
    switch (pageStyles.pageLayout.padding) {
      case 'none': break
      case 'sm': classes.push('px-4'); break
      case 'md': classes.push('px-6'); break
      case 'lg': classes.push('px-8'); break
      case 'xl': classes.push('px-12'); break
    }
  }

  // Typographie
  if (pageStyles.pageTypography?.fontFamily && pageStyles.pageTypography.fontFamily !== 'system') {
    classes.push(`font-${pageStyles.pageTypography.fontFamily}`)
  }

  if (pageStyles.pageTypography?.baseTextSize) {
    classes.push(`text-${pageStyles.pageTypography.baseTextSize}`)
  }

  if (pageStyles.pageTypography?.lineHeight) {
    classes.push(`leading-${pageStyles.pageTypography.lineHeight}`)
  }

  return classes.join(' ')
}

/**
 * Génère les variables CSS pour une page complète
 */
export function getPageVariables(pageStyles?: PageStyleSettings): Record<string, string> {
  if (!pageStyles) return {}

  const variables: Record<string, string> = {}

  // Couleurs globales
  if (pageStyles.pageColors) {
    if (pageStyles.pageColors.textColor) {
      variables['--page-text-color'] = pageStyles.pageColors.textColor
    }
    if (pageStyles.pageColors.headingColor) {
      variables['--page-heading-color'] = pageStyles.pageColors.headingColor
    }
    if (pageStyles.pageColors.accentColor) {
      variables['--page-accent-color'] = pageStyles.pageColors.accentColor
    }
    if (pageStyles.pageColors.linkColor) {
      variables['--page-link-color'] = pageStyles.pageColors.linkColor
    }
  }

  // Espacement entre blocs
  if (pageStyles.pageLayout?.gap) {
    switch (pageStyles.pageLayout.gap) {
      case 'none': variables['--page-gap'] = '0'; break
      case 'sm': variables['--page-gap'] = '1rem'; break
      case 'md': variables['--page-gap'] = '2rem'; break
      case 'lg': variables['--page-gap'] = '3rem'; break
      case 'xl': variables['--page-gap'] = '4rem'; break
    }
  }

  return variables
}

/**
 * Fonction utilitaire principale pour appliquer tous les styles de page
 */
export function applyPageStyles(pageStyles?: PageStyleSettings) {
  return {
    containerStyle: {
      ...getPageStyles(pageStyles),
      ...getPageVariables(pageStyles),
    },
    containerClasses: getPageClasses(pageStyles),
    blocksGapClass: pageStyles?.pageLayout?.gap ? `gap-${pageStyles.pageLayout.gap === 'sm' ? '4' : pageStyles.pageLayout.gap === 'md' ? '8' : pageStyles.pageLayout.gap === 'lg' ? '12' : pageStyles.pageLayout.gap === 'xl' ? '16' : '0'}` : 'gap-8',
  }
}
