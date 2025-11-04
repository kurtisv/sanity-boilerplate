/**
 * Hook pour normaliser les props qui peuvent être null/undefined depuis Sanity
 */

import { useMemo } from 'react'
import type { AnimationSettings, BackgroundSettings, StylingSettings, CTAButton } from '@/types/common'

// Valeurs par défaut pour les animations
const DEFAULT_ANIMATION_SETTINGS: AnimationSettings = {
  enableAnimations: true,
  triggerOffset: 50,
  staggerDelay: 200,
  easing: 'easeOut'
}

// Valeurs par défaut pour les arrière-plans
const DEFAULT_BACKGROUND_SETTINGS: BackgroundSettings = {
  backgroundType: 'solid',
  backgroundColor: '#ffffff'
}

// Valeurs par défaut pour le styling
const DEFAULT_STYLING_SETTINGS: StylingSettings = {
  textColor: '#1f2937',
  headingColor: '#111827',
  accentColor: '#3b82f6',
  alignment: 'center',
  cardStyle: 'shadow',
  spacing: 'normal'
}

/**
 * Hook pour normaliser les props d'animation
 */
export function useNormalizedAnimationSettings(animationSettings?: AnimationSettings | null) {
  return useMemo(() => ({
    ...DEFAULT_ANIMATION_SETTINGS,
    ...animationSettings
  }), [animationSettings])
}

/**
 * Hook pour normaliser les props d'arrière-plan
 */
export function useNormalizedBackgroundSettings(backgroundSettings?: BackgroundSettings | null) {
  return useMemo(() => ({
    ...DEFAULT_BACKGROUND_SETTINGS,
    ...backgroundSettings
  }), [backgroundSettings])
}

/**
 * Hook pour normaliser les props de styling
 */
export function useNormalizedStylingSettings(styling?: StylingSettings | null) {
  return useMemo(() => ({
    ...DEFAULT_STYLING_SETTINGS,
    ...styling
  }), [styling])
}

/**
 * Hook pour normaliser les boutons CTA
 */
export function useNormalizedCTAButtons(ctaButtons?: CTAButton[] | null) {
  return useMemo(() => ctaButtons || [], [ctaButtons])
}

/**
 * Hook pour normaliser un tableau générique
 */
export function useNormalizedArray<T>(array?: T[] | null): T[] {
  return useMemo(() => array || [], [array])
}
