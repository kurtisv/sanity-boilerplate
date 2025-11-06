/**
 * HOC (Higher Order Component) de Protection
 * 
 * Enveloppe TOUS les composants de blocs pour garantir qu'ils reçoivent
 * toujours des props sûres et normalisées
 * 
 * UTILISATION:
 * export default withSafeProps(MyBlock)
 * 
 * Ou avec options:
 * export default withSafeProps(MyBlock, {
 *   arrayFields: ['customItems', 'myList'],
 *   objectFields: ['customSettings']
 * })
 */

import React from 'react'
import { normalizeBlockData } from '@/lib/sanity-data-normalizer'

export interface SafePropsOptions {
  /**
   * Noms des champs qui doivent être des arrays
   * Par défaut: détection automatique basée sur le nom
   */
  arrayFields?: string[]
  
  /**
   * Noms des champs qui doivent être des objets
   * Par défaut: détection automatique basée sur le nom
   */
  objectFields?: string[]
  
  /**
   * Activer les logs de debug
   */
  debug?: boolean
}

/**
 * HOC qui normalise automatiquement toutes les props
 */
export function withSafeProps<P extends Record<string, any>>(
  Component: React.ComponentType<P>,
  options: SafePropsOptions = {}
) {
  const WrappedComponent = (props: P) => {
    // Normaliser les props
    const safeProps = normalizeBlockData(props)
    
    // Debug si activé
    if (options.debug && process.env.NODE_ENV === 'development') {
      console.log('[withSafeProps] Original props:', props)
      console.log('[withSafeProps] Normalized props:', safeProps)
    }
    
    // Rendre le composant avec les props sûres
    return <Component {...safeProps as P} />
  }
  
  // Préserver le nom du composant pour le debugging
  WrappedComponent.displayName = `withSafeProps(${Component.displayName || Component.name || 'Component'})`
  
  return WrappedComponent
}

/**
 * Hook personnalisé pour normaliser les props dans un composant fonctionnel
 * 
 * UTILISATION:
 * function MyBlock(props) {
 *   const { title, items, settings } = useSafeProps(props)
 *   // Maintenant items est toujours un array, settings toujours un objet
 * }
 */
export function useSafeProps<T extends Record<string, any>>(props: T): T {
  return React.useMemo(() => normalizeBlockData(props), [props])
}

/**
 * Hook pour vérifier si un array a des éléments de manière sûre
 * 
 * UTILISATION:
 * const hasButtons = useHasItems(ctaButtons)
 * if (hasButtons) { ... }
 */
export function useHasItems<T>(array: T[] | null | undefined): boolean {
  return React.useMemo(() => {
    return Array.isArray(array) && array.length > 0
  }, [array])
}

/**
 * Hook pour obtenir un array sûr
 * 
 * UTILISATION:
 * const safeItems = useSafeArray(items)
 * safeItems.map(...) // Jamais d'erreur
 */
export function useSafeArray<T>(array: T[] | null | undefined): T[] {
  return React.useMemo(() => {
    return Array.isArray(array) ? array : []
  }, [array])
}

/**
 * Hook pour obtenir un objet sûr
 * 
 * UTILISATION:
 * const safeSettings = useSafeObject(settings, { color: '#000' })
 */
export function useSafeObject<T extends Record<string, any>>(
  obj: T | null | undefined,
  defaults?: Partial<T>
): T {
  return React.useMemo(() => {
    if (!obj || typeof obj !== 'object') {
      return (defaults || {}) as T
    }
    return { ...defaults, ...obj } as T
  }, [obj, defaults])
}

export default withSafeProps
