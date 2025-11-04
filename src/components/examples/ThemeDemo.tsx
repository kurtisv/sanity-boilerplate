'use client'

import { useTheme } from '@/contexts/ThemeContext'
import styled from 'styled-components'

// Simple ThemeToggle replacement
const SimpleThemeToggle = styled.button`
  padding: 0.5rem 1rem;
  background: var(--color-primary, #3b82f6);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--color-primary-dark, #2563eb);
    transform: translateY(-1px);
  }
`

const DemoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-8);
  background: var(--theme-bg-elevated);
  border: 1px solid var(--theme-border-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--theme-shadow-md);
`

const DemoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--theme-border-primary);
`

const DemoTitle = styled.h2`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--theme-text-primary);
  margin: 0;
`

const ThemeInfo = styled.div`
  display: flex;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
`

const InfoCard = styled.div`
  flex: 1;
  padding: var(--spacing-4);
  background: var(--theme-bg-secondary);
  border: 1px solid var(--theme-border-secondary);
  border-radius: var(--border-radius-md);
`

const InfoLabel = styled.div`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--theme-text-secondary);
  margin-bottom: var(--spacing-2);
`

const InfoValue = styled.div`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--theme-text-primary);
`

const ToggleSection = styled.div`
  margin-bottom: var(--spacing-6);
`

const SectionTitle = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--theme-text-primary);
  margin-bottom: var(--spacing-4);
`

const ToggleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-4);
`

const ToggleCard = styled.div`
  padding: var(--spacing-4);
  background: var(--theme-bg-tertiary);
  border: 1px solid var(--theme-border-primary);
  border-radius: var(--border-radius-md);
  text-align: center;
`

const ToggleLabel = styled.div`
  font-size: var(--font-size-sm);
  color: var(--theme-text-secondary);
  margin-bottom: var(--spacing-3);
`

const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--spacing-3);
`

const ColorSwatch = styled.div<{ $color: string }>`
  height: 60px;
  background: ${props => `var(${props.$color})`};
  border: 1px solid var(--theme-border-primary);
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: end;
  padding: var(--spacing-2);
`

const ColorLabel = styled.div`
  font-size: var(--font-size-xs);
  color: var(--theme-text-primary);
  background: var(--theme-bg-overlay);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--border-radius-sm);
  backdrop-filter: blur(4px);
`

/**
 * ThemeDemo Component
 * 
 * Composant de démonstration du système de thème.
 * Affiche les informations du thème actuel et permet de tester
 * les différentes variantes du ThemeToggle.
 */
export function ThemeDemo() {
  const { theme, resolvedTheme } = useTheme()

  const colorVariables = [
    '--theme-bg-primary',
    '--theme-bg-secondary', 
    '--theme-text-primary',
    '--theme-text-secondary',
    '--theme-border-primary',
    '--color-primary'
  ]

  return (
    <DemoContainer>
      <DemoHeader>
        <DemoTitle>Démonstration du Système de Thème</DemoTitle>
        <SimpleThemeToggle>
          {theme === 'light' ? '🌙' : '☀️'} {theme || 'Auto'}
        </SimpleThemeToggle>
      </DemoHeader>

      <ThemeInfo>
        <InfoCard>
          <InfoLabel>Thème Sélectionné</InfoLabel>
          <InfoValue>{theme === 'auto' ? 'Automatique' : theme === 'light' ? 'Clair' : 'Sombre'}</InfoValue>
        </InfoCard>
        <InfoCard>
          <InfoLabel>Thème Résolu</InfoLabel>
          <InfoValue>{resolvedTheme === 'light' ? 'Clair' : 'Sombre'}</InfoValue>
        </InfoCard>
      </ThemeInfo>

      <ToggleSection>
        <SectionTitle>Palette de Couleurs Actuelle</SectionTitle>
        <ColorPalette>
          {colorVariables.map((variable) => (
            <ColorSwatch key={variable} $color={variable}>
              <ColorLabel>{variable.replace('--', '').replace('-', ' ')}</ColorLabel>
            </ColorSwatch>
          ))}
        </ColorPalette>
      </ToggleSection>
    </DemoContainer>
  )
}

export default ThemeDemo
