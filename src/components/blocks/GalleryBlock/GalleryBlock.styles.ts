import styled, { css } from 'styled-components'

interface SectionProps {
  $backgroundColor: string
  $spacing: 'compact' | 'normal' | 'large'
}

interface TextProps {
  $textColor: string
}

interface LayoutProps {
  $layout: 'grid' | 'masonry' | 'carousel' | 'mosaic'
}

interface GridProps {
  $columns: {
    desktop: number
    tablet: number
    mobile: number
  }
  $gap: 'none' | 'small' | 'medium' | 'large'
}

interface ImageWrapperProps {
  $layout: 'grid' | 'masonry' | 'carousel' | 'mosaic'
  $aspectRatio: '1:1' | '4:3' | '16:9' | '3:4' | 'auto'
  $borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full'
  $featured: boolean
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

// Filtres
export const FiltersWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-8);
`

export const FilterButtons = styled.div`
  display: flex;
  gap: var(--spacing-2);
  flex-wrap: wrap;
  justify-content: center;
`

export const FilterButton = styled.button<{ $active: boolean }>`
  padding: var(--spacing-2) var(--spacing-4);
  border: 2px solid var(--color-primary);
  border-radius: var(--border-radius-full);
  background: ${props => props.$active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.$active ? 'var(--color-white)' : 'var(--color-primary)'};
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-base);
  
  &:hover {
    background: var(--color-primary);
    color: var(--color-white);
    transform: translateY(-2px);
  }
`

export const FilterSelect = styled.select`
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  background: var(--color-white);
  font-size: var(--font-size-base);
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`

export const FilterTags = styled.div`
  display: flex;
  gap: var(--spacing-2);
  flex-wrap: wrap;
  justify-content: center;
`

export const FilterTag = styled.span<{ $active: boolean }>`
  padding: var(--spacing-1) var(--spacing-3);
  background: ${props => props.$active ? 'var(--color-primary)' : 'var(--color-gray-100)'};
  color: ${props => props.$active ? 'var(--color-white)' : 'var(--color-gray-700)'};
  border-radius: var(--border-radius-base);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-base);
  
  &:hover {
    background: var(--color-primary);
    color: var(--color-white);
  }
`

// Conteneur de galerie
export const GalleryContainer = styled.div<LayoutProps>`
  width: 100%;
`

// Grille classique
export const GridGallery = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns.desktop}, 1fr);
  
  ${props => {
    switch (props.$gap) {
      case 'none':
        return css`gap: 0;`
      case 'small':
        return css`gap: var(--spacing-2);`
      case 'large':
        return css`gap: var(--spacing-6);`
      default: // medium
        return css`gap: var(--spacing-4);`
    }
  }}
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(${props => props.$columns.tablet}, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => props.$columns.mobile}, 1fr);
  }
`

// Masonry
export const MasonryGallery = styled.div<GridProps>`
  columns: ${props => props.$columns.desktop};
  column-gap: ${props => {
    switch (props.$gap) {
      case 'none': return '0'
      case 'small': return 'var(--spacing-2)'
      case 'large': return 'var(--spacing-6)'
      default: return 'var(--spacing-4)'
    }
  }};
  
  @media (max-width: 1024px) {
    columns: ${props => props.$columns.tablet};
  }
  
  @media (max-width: 768px) {
    columns: ${props => props.$columns.mobile};
  }
`

// Carrousel
export const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-xl);
`

export const CarouselTrack = styled.div<{ $currentSlide: number; $slidesToShow: number }>`
  display: flex;
  transition: transform var(--transition-slow);
  transform: translateX(-${props => (props.$currentSlide * (100 / props.$slidesToShow))}%);
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

// Mosaïque
export const MosaicGallery = styled.div<{ $gap: string }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 200px);
  gap: ${props => {
    switch (props.$gap) {
      case 'none': return '0'
      case 'small': return 'var(--spacing-2)'
      case 'large': return 'var(--spacing-6)'
      default: return 'var(--spacing-4)'
    }
  }};
  
  > div:nth-child(1) { grid-area: 1 / 1 / 3 / 3; }
  > div:nth-child(2) { grid-area: 1 / 3 / 2 / 4; }
  > div:nth-child(3) { grid-area: 1 / 4 / 2 / 5; }
  > div:nth-child(4) { grid-area: 2 / 3 / 3 / 5; }
  > div:nth-child(5) { grid-area: 3 / 1 / 4 / 2; }
  > div:nth-child(6) { grid-area: 3 / 2 / 4 / 4; }
  > div:nth-child(7) { grid-area: 3 / 4 / 4 / 5; }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(4, 150px);
    
    > div:nth-child(1) { grid-area: 1 / 1 / 3 / 3; }
    > div:nth-child(2) { grid-area: 3 / 1 / 4 / 2; }
    > div:nth-child(3) { grid-area: 3 / 2 / 4 / 3; }
    > div:nth-child(4) { grid-area: 4 / 1 / 5 / 3; }
    > div:nth-child(n+5) { display: none; }
  }
`

// Image wrapper
export const ImageWrapper = styled.div<ImageWrapperProps>`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: all var(--transition-base);
  
  ${props => {
    switch (props.$borderRadius) {
      case 'none':
        return css`border-radius: 0;`
      case 'small':
        return css`border-radius: var(--border-radius-sm);`
      case 'large':
        return css`border-radius: var(--border-radius-xl);`
      case 'full':
        return css`border-radius: var(--border-radius-full);`
      default: // medium
        return css`border-radius: var(--border-radius-lg);`
    }
  }}
  
  ${props => props.$layout === 'grid' && props.$aspectRatio !== 'auto' && css`
    aspect-ratio: ${props.$aspectRatio.replace(':', '/')};
  `}
  
  ${props => props.$layout === 'masonry' && css`
    break-inside: avoid;
    margin-bottom: var(--spacing-4);
  `}
  
  ${props => props.$layout === 'carousel' && css`
    flex: 0 0 calc(100% / var(--slides-to-show));
    min-width: 0;
  `}
  
  ${props => props.$featured && css`
    transform: scale(1.02);
    z-index: 1;
  `}
  
  &:hover {
    transform: ${props => props.$featured ? 'scale(1.05)' : 'scale(1.03)'};
    z-index: 2;
  }
`

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
`

export const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: var(--spacing-4);
  opacity: 0;
  transition: opacity var(--transition-base);
  
  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`

export const ImageCaption = styled.p<TextProps>`
  color: var(--color-white);
  font-size: var(--font-size-sm);
  margin: 0;
  line-height: var(--line-height-normal);
`

// Lightbox
export const Lightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-modal);
  padding: var(--spacing-4);
`

export const LightboxContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`

export const LightboxImage = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 400px;
`

export const LightboxCounter = styled.div`
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  background: rgba(0, 0, 0, 0.7);
  color: var(--color-white);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--border-radius-base);
  font-size: var(--font-size-sm);
`

export const LightboxCaption = styled.div`
  color: var(--color-white);
  text-align: center;
  padding: var(--spacing-4);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
`

export const LightboxClose = styled.button`
  position: absolute;
  top: var(--spacing-4);
  left: var(--spacing-4);
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-full);
  background: rgba(0, 0, 0, 0.7);
  color: var(--color-white);
  border: none;
  cursor: pointer;
  font-size: var(--font-size-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }
`

export const LightboxArrow = styled.button<{ $position: 'left' | 'right' }>`
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
  transition: all var(--transition-base);
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translateY(-50%) scale(1.1);
  }
`
