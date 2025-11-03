import styled, { css } from 'styled-components'

interface SectionProps {
  $backgroundColor: string
  $spacing: 'compact' | 'normal' | 'large'
}

interface TextProps {
  $textColor: string
}

interface AccentProps {
  $accentColor: string
}

interface LayoutProps {
  $layout: 'grid' | 'carousel' | 'list' | 'hero-grid'
}

interface GridProps {
  $columns: {
    desktop: number
    tablet: number
    mobile: number
  }
  $gap: 'small' | 'medium' | 'large'
}

interface CardProps {
  $cardStyle: 'minimal' | 'bordered' | 'shadow' | 'colored' | 'glass'
  $featured: boolean
  $accentColor: string
}

export const Section = styled.section<SectionProps>`
  background-color: ${props => props.$backgroundColor};
  
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

export const Container = styled.div`
  max-width: var(--max-width-container);
  margin: 0 auto;
`

export const Header = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-8);
`

export const Title = styled.h2<TextProps>`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: var(--font-weight-bold);
  color: ${props => props.$textColor};
  margin: 0 0 var(--spacing-4) 0;
  line-height: var(--line-height-tight);
`

export const Subtitle = styled.p<TextProps>`
  font-size: var(--font-size-lg);
  color: ${props => props.$textColor};
  opacity: 0.8;
  margin: 0;
  line-height: var(--line-height-relaxed);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

export const ContentContainer = styled.div<LayoutProps>`
  width: 100%;
`

// Grille
export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns.desktop}, 1fr);
  
  ${props => {
    switch (props.$gap) {
      case 'small':
        return css`gap: var(--spacing-4);`
      case 'large':
        return css`gap: var(--spacing-8);`
      default: // medium
        return css`gap: var(--spacing-6);`
    }
  }}
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(${props => props.$columns.tablet}, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => props.$columns.mobile}, 1fr);
  }
`

// Carrousel
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
  z-index: 2;
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

// Liste
export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  max-width: 800px;
  margin: 0 auto;
`

// Hero Grid
export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-8);
  align-items: start;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
  }
`

export const HeroItem = styled.div`
  position: sticky;
  top: var(--spacing-8);
`

export const GridItems = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${props => Math.max(1, props.$columns.desktop - 1)}, 1fr);
  
  ${props => {
    switch (props.$gap) {
      case 'small':
        return css`gap: var(--spacing-4);`
      case 'large':
        return css`gap: var(--spacing-8);`
      default: // medium
        return css`gap: var(--spacing-6);`
    }
  }}
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(${props => props.$columns.tablet}, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => props.$columns.mobile}, 1fr);
  }
`

// Cartes membres
export const MemberCard = styled.div<CardProps>`
  transition: all var(--transition-base);
  
  ${props => props.$featured && css`
    transform: scale(1.05);
    z-index: 1;
  `}
  
  &:hover {
    transform: ${props => props.$featured ? 'scale(1.08)' : 'scale(1.03)'};
    z-index: 2;
  }
`

export const MemberPhoto = styled.div<{ $featured: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  margin-bottom: var(--spacing-4);
  
  ${props => props.$featured && css`
    border: 3px solid var(--color-primary);
  `}
`

export const MemberInfo = styled.div`
  text-align: center;
`

export const MemberName = styled.h3<TextProps & { $featured: boolean }>`
  font-size: ${props => props.$featured ? 'var(--font-size-xl)' : 'var(--font-size-lg)'};
  font-weight: var(--font-weight-bold);
  color: ${props => props.$textColor};
  margin: 0 0 var(--spacing-2) 0;
  line-height: var(--line-height-tight);
`

export const MemberPosition = styled.p<AccentProps>`
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: ${props => props.$accentColor};
  margin: 0 0 var(--spacing-3) 0;
`

export const MemberBio = styled.p<TextProps>`
  font-size: var(--font-size-sm);
  color: ${props => props.$textColor};
  opacity: 0.8;
  line-height: var(--line-height-relaxed);
  margin: 0 0 var(--spacing-4) 0;
`

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  justify-content: center;
  margin-bottom: var(--spacing-4);
`

export const Skill = styled.span<AccentProps>`
  padding: var(--spacing-1) var(--spacing-2);
  background: ${props => props.$accentColor}20;
  color: ${props => props.$accentColor};
  border-radius: var(--border-radius-base);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
`

export const SocialLinks = styled.div`
  display: flex;
  gap: var(--spacing-2);
  justify-content: center;
`

export const SocialLink = styled.a<AccentProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--border-radius-full);
  background: ${props => props.$accentColor}10;
  color: ${props => props.$accentColor};
  text-decoration: none;
  font-size: var(--font-size-base);
  transition: all var(--transition-base);
  
  &:hover {
    background: ${props => props.$accentColor};
    color: var(--color-white);
    transform: translateY(-2px);
  }
`

// Cartes témoignages
export const TestimonialCard = styled.div<CardProps>`
  transition: all var(--transition-base);
  
  ${props => props.$featured && css`
    transform: scale(1.02);
    z-index: 1;
  `}
  
  &:hover {
    transform: ${props => props.$featured ? 'scale(1.05)' : 'scale(1.02)'};
    z-index: 2;
  }
`

export const TestimonialContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const TestimonialQuote = styled.blockquote<TextProps>`
  font-size: var(--font-size-base);
  color: ${props => props.$textColor};
  line-height: var(--line-height-relaxed);
  margin: 0 0 var(--spacing-4) 0;
  flex: 1;
  font-style: italic;
  
  &::before {
    content: '"';
    font-size: 2em;
    color: var(--color-primary);
    line-height: 0;
    margin-right: var(--spacing-1);
  }
`

export const TestimonialRating = styled.div`
  display: flex;
  gap: var(--spacing-1);
  margin-bottom: var(--spacing-4);
`

export const Star = styled.span<{ $filled: boolean }>`
  font-size: var(--font-size-sm);
  opacity: ${props => props.$filled ? 1 : 0.3};
`

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
`

export const AuthorPhoto = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-full);
  overflow: hidden;
  flex-shrink: 0;
`

export const AuthorInfo = styled.div`
  flex: 1;
  text-align: left;
`

export const AuthorName = styled.h4<TextProps>`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: ${props => props.$textColor};
  margin: 0;
`

export const AuthorDetails = styled.p<TextProps>`
  font-size: var(--font-size-xs);
  color: ${props => props.$textColor};
  opacity: 0.7;
  margin: var(--spacing-1) 0 0 0;
`
