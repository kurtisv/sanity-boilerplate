import styled, { css, keyframes } from 'styled-components'

// Animations
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
  40%, 43% { transform: translate3d(0, -8px, 0); }
  70% { transform: translate3d(0, -4px, 0); }
  90% { transform: translate3d(0, -2px, 0); }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const progressBar = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`

// Types
interface SectionProps {
  $backgroundSettings: {
    backgroundType: 'solid' | 'gradient' | 'image' | 'pattern'
    backgroundColor: string
    gradientColors?: {
      from: string
      to: string
      direction: 'to-b' | 'to-r' | 'to-br' | 'to-bl'
    }
  }
  $spacing: 'compact' | 'normal' | 'large'
}

interface TextProps {
  $textColor: string
}

interface AlignmentProps {
  $alignment: 'left' | 'center' | 'right'
}

interface LayoutProps {
  $layout: 'horizontal' | 'grid-2x2' | 'grid-3col' | 'grid-4col' | 'carousel' | 'hero-stats'
}

interface StatCardProps {
  $cardStyle: 'minimal' | 'bordered' | 'shadow' | 'colored' | 'glass'
  $featured: boolean
  $animationType: 'counter' | 'progress' | 'pulse' | 'bounce' | 'fade'
  $alignment: 'left' | 'center' | 'right'
  $customColor?: string
}

interface StatNumberProps {
  $textColor: string
  $featured: boolean
  $animationType: 'counter' | 'progress' | 'pulse' | 'bounce' | 'fade'
}

export const Section = styled.section<SectionProps>`
  position: relative;
  overflow: hidden;
  
  ${props => {
    const backgroundSettings = props.$backgroundSettings
    
    if (backgroundSettings.backgroundType === 'gradient' && backgroundSettings.gradientColors) {
      const { from, to, direction } = backgroundSettings.gradientColors
      const gradientDirections: Record<string, string> = {
        'to-b': 'to bottom',
        'to-r': 'to right', 
        'to-br': 'to bottom right',
        'to-bl': 'to bottom left'
      }
      const gradientDirection = gradientDirections[direction] || 'to bottom right'
      
      return css`
        background: linear-gradient(${gradientDirection}, ${from}, ${to});
      `
    }
    
    return css`
      background-color: ${backgroundSettings.backgroundColor};
    `
  }}
  
  ${props => {
    switch (props.$spacing) {
      case 'compact':
        return css`
          padding: var(--spacing-12) var(--spacing-6);
        `
      case 'large':
        return css`
          padding: var(--spacing-24) var(--spacing-6);
        `
      default: // normal
        return css`
          padding: var(--spacing-16) var(--spacing-6);
        `
    }
  }}
  
  @media (max-width: 768px) {
    ${props => {
      switch (props.$spacing) {
        case 'compact':
          return css`
            padding: var(--spacing-8) var(--spacing-4);
          `
        case 'large':
          return css`
            padding: var(--spacing-16) var(--spacing-4);
          `
        default:
          return css`
            padding: var(--spacing-12) var(--spacing-4);
          `
      }
    }}
  }
`

export const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`

export const Overlay = styled.div<{ $color: string; $opacity: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.$color};
  opacity: ${props => props.$opacity / 100};
  z-index: 1;
`

export const Container = styled.div`
  position: relative;
  z-index: 2;
  max-width: var(--max-width-container);
  margin: 0 auto;
`

export const Header = styled.div<AlignmentProps>`
  text-align: ${props => props.$alignment};
  margin-bottom: var(--spacing-8);
`

export const Title = styled.h2<TextProps>`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: var(--font-weight-bold);
  color: ${props => props.$textColor};
  margin: 0 0 var(--spacing-4) 0;
  line-height: var(--line-height-tight);
`

export const Subtitle = styled.p<TextProps & AlignmentProps>`
  font-size: var(--font-size-lg);
  color: ${props => props.$textColor};
  opacity: 0.8;
  margin: 0;
  line-height: var(--line-height-relaxed);
  max-width: 600px;
  
  ${props => props.$alignment === 'center' && css`
    margin-left: auto;
    margin-right: auto;
  `}
  
  ${props => props.$alignment === 'right' && css`
    margin-left: auto;
  `}
`

export const StatsContainer = styled.div<LayoutProps>`
  width: 100%;
`

// Layouts
export const HorizontalLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-4);
  
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const GridLayout = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns}, 1fr);
  gap: var(--spacing-6);
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(${props => Math.min(props.$columns, 2)}, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
`

export const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-xl);
`

export const CarouselTrack = styled.div<{ $currentSlide: number }>`
  display: flex;
  transition: transform var(--transition-slow);
  transform: translateX(-${props => props.$currentSlide * 100}%);
`

export const CarouselArrow = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$position}: var(--spacing-4);
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-full);
  background: rgba(0, 0, 0, 0.7);
  color: var(--color-white);
  border: none;
  cursor: pointer;
  font-size: var(--font-size-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: all var(--transition-base);
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translateY(-50%) scale(1.1);
  }
`

export const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-2);
  margin-top: var(--spacing-4);
`

export const CarouselDot = styled.button<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: var(--border-radius-full);
  border: none;
  background: ${props => props.$active ? 'var(--color-primary)' : 'var(--color-gray-300)'};
  cursor: pointer;
  transition: all var(--transition-base);
  
  &:hover {
    background: var(--color-primary);
    transform: scale(1.2);
  }
`

export const HeroStatsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-8);
  align-items: center;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
  }
`

export const HeroStat = styled.div`
  display: flex;
  justify-content: center;
`

export const SecondaryStats = styled.div`
  width: 100%;
`

// Cartes de statistiques
export const StatCard = styled.div<StatCardProps>`
  transition: all var(--transition-base);
  
  ${props => props.$featured && css`
    transform: scale(1.05);
    z-index: 1;
  `}
  
  ${props => props.$animationType === 'pulse' && css`
    animation: ${pulse} 2s infinite;
  `}
  
  ${props => props.$animationType === 'bounce' && css`
    animation: ${bounce} 2s infinite;
  `}
  
  ${props => props.$animationType === 'fade' && css`
    animation: ${fadeIn} 1s ease-out;
  `}
  
  &:hover {
    transform: ${props => props.$featured ? 'scale(1.08)' : 'scale(1.03)'};
    z-index: 2;
  }
  
  ${props => props.$customColor && css`
    --stat-accent-color: ${props.$customColor};
  `}
`

export const StatContent = styled.div<AlignmentProps>`
  display: flex;
  flex-direction: column;
  align-items: ${props => {
    switch (props.$alignment) {
      case 'left': return 'flex-start'
      case 'right': return 'flex-end'
      default: return 'center'
    }
  }};
  text-align: ${props => props.$alignment};
  gap: var(--spacing-2);
`

export const StatIcon = styled.div<{ $featured: boolean }>`
  font-size: ${props => props.$featured ? '3rem' : '2rem'};
  margin-bottom: var(--spacing-2);
  opacity: 0.8;
`

export const StatNumber = styled.div<StatNumberProps>`
  font-size: ${props => props.$featured ? 'clamp(3rem, 6vw, 4rem)' : 'clamp(2rem, 4vw, 2.5rem)'};
  font-weight: var(--font-weight-bold);
  color: ${props => props.$textColor};
  line-height: var(--line-height-none);
  margin-bottom: var(--spacing-1);
  
  ${props => props.$animationType === 'progress' && css`
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      height: 3px;
      background: ${props.$textColor};
      border-radius: var(--border-radius-full);
      animation: ${progressBar} 2s ease-out;
    }
  `}
`

export const StatLabel = styled.h3<TextProps & { $featured: boolean }>`
  font-size: ${props => props.$featured ? 'var(--font-size-lg)' : 'var(--font-size-base)'};
  font-weight: var(--font-weight-semibold);
  color: ${props => props.$textColor};
  margin: 0;
  line-height: var(--line-height-tight);
`

export const StatDescription = styled.p<TextProps>`
  font-size: var(--font-size-sm);
  color: ${props => props.$textColor};
  opacity: 0.7;
  margin: 0;
  line-height: var(--line-height-relaxed);
  max-width: 200px;
`
