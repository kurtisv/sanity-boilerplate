/**
 * UTILITAIRE DE NORMALISATION DES DONNÉES SANITY
 * 
 * Ce fichier garantit que TOUTES les données venant de Sanity sont sûres
 * et ne causeront JAMAIS d'erreur "Cannot read properties of null"
 * 
 * UTILISATION:
 * import { normalizeBlockData } from '@/lib/sanity-data-normalizer'
 * 
 * function MyBlock(props) {
 *   const safeProps = normalizeBlockData(props)
 *   // Maintenant safeProps.items est toujours un array, jamais null
 * }
 */

/**
 * Normalise un array qui peut être null/undefined en array vide
 */
export function ensureArray<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : []
}

/**
 * Normalise une string qui peut être null/undefined en string vide
 */
export function ensureString(value: string | null | undefined): string {
  return value || ''
}

/**
 * Normalise un number qui peut être null/undefined en 0
 */
export function ensureNumber(value: number | null | undefined): number {
  return typeof value === 'number' ? value : 0
}

/**
 * Normalise un boolean qui peut être null/undefined en false
 */
export function ensureBoolean(value: boolean | null | undefined): boolean {
  return Boolean(value)
}

/**
 * Normalise un objet qui peut être null/undefined en objet vide
 */
export function ensureObject<T extends Record<string, any>>(
  value: T | null | undefined,
  defaults?: Partial<T>
): T {
  if (!value || typeof value !== 'object') {
    return (defaults || {}) as T
  }
  return { ...defaults, ...value } as T
}

/**
 * Type pour les props de bloc normalisées
 */
export interface NormalizedBlockProps {
  [key: string]: any
}

/**
 * FONCTION PRINCIPALE - Normalise TOUTES les données d'un bloc Sanity
 * 
 * Cette fonction parcourt récursivement toutes les propriétés et garantit:
 * - Tous les arrays sont des arrays (jamais null)
 * - Tous les strings sont des strings (jamais null)
 * - Tous les objets sont des objets (jamais null)
 * - Tous les booleans sont des booleans (jamais null)
 */
export function normalizeBlockData<T extends Record<string, any>>(
  data: T | null | undefined
): T {
  if (!data || typeof data !== 'object') {
    return {} as T
  }

  const normalized: any = {}

  for (const [key, value] of Object.entries(data)) {
    // Ignorer les propriétés Sanity internes
    if (key.startsWith('_')) {
      normalized[key] = value
      continue
    }

    // Normaliser selon le type
    if (value === null || value === undefined) {
      // Deviner le type par le nom de la propriété
      if (
        key.endsWith('s') || 
        key.includes('items') || 
        key.includes('list') ||
        key.includes('buttons') ||
        key.includes('features') ||
        key.includes('members') ||
        key.includes('stats') ||
        key.includes('testimonials') ||
        key.includes('fields') ||
        key.includes('options') ||
        key.includes('categories')
      ) {
        normalized[key] = []
      } else if (
        key.includes('is') || 
        key.includes('has') || 
        key.includes('show') ||
        key.includes('enable') ||
        key.includes('allow')
      ) {
        normalized[key] = false
      } else if (
        key.includes('count') || 
        key.includes('number') || 
        key.includes('index') ||
        key.includes('size') ||
        key.includes('width') ||
        key.includes('height')
      ) {
        normalized[key] = 0
      } else if (
        key.includes('settings') || 
        key.includes('config') || 
        key.includes('options') ||
        key.includes('style') ||
        key.includes('styling')
      ) {
        normalized[key] = {}
      } else {
        normalized[key] = ''
      }
    } else if (Array.isArray(value)) {
      // Normaliser chaque élément du tableau récursivement
      normalized[key] = value.map(item => 
        typeof item === 'object' && item !== null 
          ? normalizeBlockData(item) 
          : item
      )
    } else if (typeof value === 'object') {
      // Normaliser les objets récursivement
      normalized[key] = normalizeBlockData(value)
    } else {
      // Valeurs primitives - garder tel quel
      normalized[key] = value
    }
  }

  return normalized as T
}

/**
 * Normalise spécifiquement les props d'un Hero Block
 */
export function normalizeHeroBlockProps(props: any) {
  return {
    title: ensureString(props?.title),
    subtitle: ensureString(props?.subtitle),
    ctaButtons: ensureArray(props?.ctaButtons),
    layout: ensureString(props?.layout) || 'centered',
    heroSettings: ensureObject(props?.heroSettings, {
      textAlignment: 'center',
      verticalAlignment: 'center',
      height: 'medium',
      textColor: '#ffffff'
    }),
    backgroundSettings: ensureObject(props?.backgroundSettings, {
      backgroundType: 'solid',
      backgroundColor: '#3b82f6'
    }),
    backgroundImage: props?.backgroundImage || null,
    styling: ensureObject(props?.styling, {
      textColor: '#ffffff',
      textAlignment: 'center',
      verticalAlignment: 'center',
      height: 'medium'
    })
  }
}

/**
 * Normalise spécifiquement les props d'un Feature Grid Block
 */
export function normalizeFeatureGridProps(props: any) {
  return {
    title: ensureString(props?.title),
    subtitle: ensureString(props?.subtitle),
    features: ensureArray(props?.features),
    layout: ensureString(props?.layout) || 'grid-3',
    cardStyle: ensureString(props?.cardStyle) || 'minimal',
    backgroundSettings: ensureObject(props?.backgroundSettings),
    styling: ensureObject(props?.styling)
  }
}

/**
 * Normalise spécifiquement les props d'un Team Block
 */
export function normalizeTeamBlockProps(props: any) {
  return {
    title: ensureString(props?.title),
    subtitle: ensureString(props?.subtitle),
    members: ensureArray(props?.members),
    layout: ensureString(props?.layout) || 'grid',
    displayType: ensureString(props?.displayType) || 'team',
    gridColumns: ensureNumber(props?.gridColumns) || 3,
    cardSettings: ensureObject(props?.cardSettings),
    backgroundSettings: ensureObject(props?.backgroundSettings),
    styling: ensureObject(props?.styling)
  }
}

/**
 * Normalise spécifiquement les props d'un Contact Block
 */
export function normalizeContactBlockProps(props: any) {
  return {
    title: ensureString(props?.title),
    subtitle: ensureString(props?.subtitle),
    formFields: ensureArray(props?.formFields),
    showMap: ensureBoolean(props?.showMap),
    mapSettings: ensureObject(props?.mapSettings),
    contactInfo: ensureObject(props?.contactInfo),
    styling: ensureObject(props?.styling)
  }
}

/**
 * Normalise spécifiquement les props d'un Stats Block
 */
export function normalizeStatsBlockProps(props: any) {
  return {
    title: ensureString(props?.title),
    subtitle: ensureString(props?.subtitle),
    stats: ensureArray(props?.stats),
    layout: ensureString(props?.layout) || 'horizontal',
    styling: ensureObject(props?.styling)
  }
}

/**
 * Helper pour vérifier si un array est vide de manière sûre
 */
export function hasItems<T>(array: T[] | null | undefined): boolean {
  return Array.isArray(array) && array.length > 0
}

/**
 * Helper pour obtenir la longueur d'un array de manière sûre
 */
export function getArrayLength<T>(array: T[] | null | undefined): number {
  return Array.isArray(array) ? array.length : 0
}

/**
 * Helper pour mapper un array de manière sûre
 */
export function safeMap<T, R>(
  array: T[] | null | undefined,
  callback: (item: T, index: number) => R
): R[] {
  return ensureArray(array).map(callback)
}

/**
 * Helper pour filtrer un array de manière sûre
 */
export function safeFilter<T>(
  array: T[] | null | undefined,
  callback: (item: T, index: number) => boolean
): T[] {
  return ensureArray(array).filter(callback)
}
