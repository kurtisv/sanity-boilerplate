/**
 * Utilitaires communs pour éviter la duplication de code
 */

import { DEV_CONFIG } from '@/config/constants'

/**
 * Logger conditionnel qui n'affiche que en développement
 */
export const logger = {
  log: (...args: any[]) => {
    if (DEV_CONFIG.ENABLE_CONSOLE_LOGS) {
      console.log(...args)
    }
  },
  warn: (...args: any[]) => {
    if (DEV_CONFIG.ENABLE_CONSOLE_LOGS) {
      console.warn(...args)
    }
  },
  error: (...args: any[]) => {
    // Les erreurs sont toujours affichées
    console.error(...args)
  },
  info: (...args: any[]) => {
    if (DEV_CONFIG.ENABLE_CONSOLE_LOGS) {
      console.info(...args)
    }
  },
}

/**
 * Utilitaires pour les classes CSS
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}

/**
 * Utilitaires de validation
 */
export const validation = {
  isEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },
  
  isPhone: (phone: string): boolean => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/
    return phoneRegex.test(phone)
  },
  
  isRequired: (value: any): boolean => {
    if (typeof value === 'string') {
      return value.trim().length > 0
    }
    return value !== null && value !== undefined
  },
  
  minLength: (value: string, min: number): boolean => {
    return value.trim().length >= min
  },
  
  maxLength: (value: string, max: number): boolean => {
    return value.trim().length <= max
  },
}

/**
 * Utilitaires pour les délais
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Utilitaires pour les URLs
 */
export const url = {
  isExternal: (url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://')
  },
  
  isEmail: (url: string): boolean => {
    return url.startsWith('mailto:')
  },
  
  isTel: (url: string): boolean => {
    return url.startsWith('tel:')
  },
  
  sanitize: (url: string): string => {
    // Supprime les caractères dangereux
    return url.replace(/[<>'"]/g, '')
  },
}

/**
 * Utilitaires pour les objets
 */
export const object = {
  isEmpty: (obj: any): boolean => {
    if (!obj) return true
    if (Array.isArray(obj)) return obj.length === 0
    if (typeof obj === 'object') return Object.keys(obj).length === 0
    return false
  },
  
  pick: <T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Pick<T, K> => {
    const result = {} as Pick<T, K>
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key]
      }
    })
    return result
  },
  
  omit: <T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Omit<T, K> => {
    const result = { ...obj }
    keys.forEach(key => {
      delete result[key]
    })
    return result
  },
}

/**
 * Utilitaires pour les chaînes de caractères
 */
export const string = {
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },
  
  truncate: (str: string, length: number, suffix = '...'): string => {
    if (str.length <= length) return str
    return str.slice(0, length - suffix.length) + suffix
  },
  
  slug: (str: string): string => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
      .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
      .replace(/\s+/g, '-') // Remplace les espaces par des tirets
      .replace(/-+/g, '-') // Supprime les tirets multiples
      .trim()
  },
  
  removeHtml: (str: string): string => {
    return str.replace(/<[^>]*>/g, '')
  },
}

/**
 * Utilitaires pour les erreurs
 */
export const error = {
  handle: (error: unknown, context?: string): string => {
    const message = error instanceof Error ? error.message : 'Erreur inconnue'
    
    if (context) {
      logger.error(`[${context}]`, message, error)
    } else {
      logger.error(message, error)
    }
    
    return message
  },
  
  isNetworkError: (error: unknown): boolean => {
    return error instanceof Error && (
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('NetworkError')
    )
  },
}

/**
 * Utilitaires pour les types
 */
export const type = {
  isString: (value: unknown): value is string => {
    return typeof value === 'string'
  },
  
  isNumber: (value: unknown): value is number => {
    return typeof value === 'number' && !isNaN(value)
  },
  
  isBoolean: (value: unknown): value is boolean => {
    return typeof value === 'boolean'
  },
  
  isArray: (value: unknown): value is any[] => {
    return Array.isArray(value)
  },
  
  isObject: (value: unknown): value is Record<string, any> => {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
  },
}

/**
 * Utilitaires pour les performances
 */
export const performance = {
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  },
  
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  },
}
