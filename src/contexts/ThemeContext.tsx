'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'auto'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

/**
 * ThemeProvider
 * 
 * Fournit le contexte de thème à toute l'application.
 * Gère la persistance du thème dans le localStorage et
 * la détection automatique du thème système.
 * 
 * @param children - Composants enfants
 * @param defaultTheme - Thème par défaut ('light' | 'dark' | 'auto')
 * @param storageKey - Clé de stockage localStorage
 */
export function ThemeProvider({
  children,
  defaultTheme = 'auto',
  storageKey = 'theme'
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Détection du thème système
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Résolution du thème actuel
  const resolveTheme = (currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'auto') {
      return getSystemTheme()
    }
    return currentTheme
  }

  // Chargement du thème depuis le localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme
      if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
        setThemeState(savedTheme)
      }
    } catch (error) {
      console.warn('Erreur lors du chargement du thème:', error)
    }
  }, [storageKey])

  // Mise à jour du thème résolu
  useEffect(() => {
    const resolved = resolveTheme(theme)
    setResolvedTheme(resolved)

    // Application du thème au document
    document.documentElement.setAttribute('data-theme', resolved)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolved)
  }, [theme])

  // Écoute des changements du thème système
  useEffect(() => {
    if (theme !== 'auto') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const resolved = resolveTheme(theme)
      setResolvedTheme(resolved)
      document.documentElement.setAttribute('data-theme', resolved)
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(resolved)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  // Fonction pour changer le thème
  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme)
      setThemeState(newTheme)
    } catch (error) {
      console.warn('Erreur lors de la sauvegarde du thème:', error)
      setThemeState(newTheme)
    }
  }

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook pour utiliser le contexte de thème
 * 
 * @returns Contexte de thème avec theme, resolvedTheme et setTheme
 * @throws Erreur si utilisé en dehors d'un ThemeProvider
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider')
  }
  
  return context
}

export default ThemeProvider
