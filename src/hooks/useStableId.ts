import { useId } from 'react'

/**
 * Hook pour générer des IDs stables qui ne causent pas d'erreurs d'hydratation
 * Utilise React 18+ useId qui garantit la cohérence serveur/client
 */
export function useStableId(prefix?: string): string {
  const id = useId()
  return prefix ? `${prefix}-${id}` : id
}

/**
 * Hook pour générer un ID avec fallback
 * Utilise l'ID fourni ou génère un ID stable
 */
export function useIdWithFallback(providedId?: string, prefix?: string): string {
  const generatedId = useStableId(prefix)
  return providedId || generatedId
}
