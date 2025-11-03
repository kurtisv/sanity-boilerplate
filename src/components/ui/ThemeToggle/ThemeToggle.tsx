'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '../Button/Button'
import * as S from './ThemeToggle.styles'

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * ThemeToggle Component
 * 
 * Composant pour basculer entre les thèmes clair, sombre et automatique.
 * Disponible en deux variantes : bouton simple ou dropdown avec options.
 * 
 * @param variant - Type d'affichage ('button' | 'dropdown')
 * @param size - Taille du composant
 * @param className - Classes CSS additionnelles
 * 
 * @example
 * // Bouton simple qui cycle entre les thèmes
 * <ThemeToggle variant="button" />
 * 
 * // Dropdown avec toutes les options
 * <ThemeToggle variant="dropdown" />
 */
export function ThemeToggle({ 
  variant = 'button', 
  size = 'md',
  className 
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme()

  // Cycle entre les thèmes pour le bouton simple
  const cycleTheme = () => {
    const themes = ['light', 'dark', 'auto'] as const
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  // Icônes pour chaque thème
  const getThemeIcon = (currentTheme: string) => {
    switch (currentTheme) {
      case 'light':
        return (
          <S.IconSun>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </S.IconSun>
        )
      case 'dark':
        return (
          <S.IconMoon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </S.IconMoon>
        )
      case 'auto':
        return (
          <S.IconAuto>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </S.IconAuto>
        )
      default:
        return null
    }
  }

  // Libellés pour chaque thème
  const getThemeLabel = (currentTheme: string) => {
    switch (currentTheme) {
      case 'light':
        return 'Clair'
      case 'dark':
        return 'Sombre'
      case 'auto':
        return 'Auto'
      default:
        return ''
    }
  }

  if (variant === 'button') {
    return (
      <Button
        variant="ghost"
        size={size}
        onClick={cycleTheme}
        className={className}
        aria-label={`Thème actuel: ${getThemeLabel(theme)}. Cliquer pour changer.`}
        title={`Basculer vers le thème ${getThemeLabel(theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light')}`}
      >
        {getThemeIcon(theme)}
      </Button>
    )
  }

  return (
    <S.DropdownContainer className={className}>
      <S.DropdownTrigger
        $size={size}
        aria-label="Sélectionner un thème"
        title="Options de thème"
      >
        {getThemeIcon(theme)}
        <S.DropdownArrow>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6,9 12,15 18,9"/>
          </svg>
        </S.DropdownArrow>
      </S.DropdownTrigger>

      <S.DropdownContent>
        <S.DropdownItem
          onClick={() => setTheme('light')}
          $active={theme === 'light'}
        >
          {getThemeIcon('light')}
          <S.ThemeInfo>
            <S.ThemeLabel>Clair</S.ThemeLabel>
            <S.ThemeDescription>Interface claire</S.ThemeDescription>
          </S.ThemeInfo>
          {theme === 'light' && (
            <S.CheckIcon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            </S.CheckIcon>
          )}
        </S.DropdownItem>

        <S.DropdownItem
          onClick={() => setTheme('dark')}
          $active={theme === 'dark'}
        >
          {getThemeIcon('dark')}
          <S.ThemeInfo>
            <S.ThemeLabel>Sombre</S.ThemeLabel>
            <S.ThemeDescription>Interface sombre</S.ThemeDescription>
          </S.ThemeInfo>
          {theme === 'dark' && (
            <S.CheckIcon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            </S.CheckIcon>
          )}
        </S.DropdownItem>

        <S.DropdownItem
          onClick={() => setTheme('auto')}
          $active={theme === 'auto'}
        >
          {getThemeIcon('auto')}
          <S.ThemeInfo>
            <S.ThemeLabel>Automatique</S.ThemeLabel>
            <S.ThemeDescription>Suit le système ({resolvedTheme === 'dark' ? 'sombre' : 'clair'})</S.ThemeDescription>
          </S.ThemeInfo>
          {theme === 'auto' && (
            <S.CheckIcon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            </S.CheckIcon>
          )}
        </S.DropdownItem>
      </S.DropdownContent>
    </S.DropdownContainer>
  )
}

export default ThemeToggle
