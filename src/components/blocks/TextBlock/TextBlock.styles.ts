import styled from 'styled-components'

// === CONTAINER (Full Width) ===
export const Container = styled.section<{ $bgColor?: string }>`
  width: 100%;
  background-color: ${props => props.$bgColor || 'transparent'};
`

// === CONTENT (Max Width) ===
export const Content = styled.div<{ 
  $maxWidth?: 'narrow' | 'medium' | 'wide' | 'full'
  $padding?: 'small' | 'medium' | 'large'
}>`
  max-width: ${props => {
    switch (props.$maxWidth) {
      case 'narrow': return '640px'
      case 'medium': return '768px'
      case 'wide': return '1024px'
      case 'full': return 'var(--max-width-container)'
      default: return '1024px'
    }
  }};
  margin: 0 auto;
  padding: ${props => {
    switch (props.$padding) {
      case 'small': return 'var(--spacing-8) var(--spacing-6)'
      case 'medium': return 'var(--spacing-16) var(--spacing-6)'
      case 'large': return 'var(--spacing-24) var(--spacing-6)'
      default: return 'var(--spacing-16) var(--spacing-6)'
    }
  }};
  
  @media (max-width: 768px) {
    padding: ${props => {
      switch (props.$padding) {
        case 'small': return 'var(--spacing-6) var(--spacing-4)'
        case 'medium': return 'var(--spacing-12) var(--spacing-4)'
        case 'large': return 'var(--spacing-16) var(--spacing-4)'
        default: return 'var(--spacing-12) var(--spacing-4)'
      }
    }};
  }
`

// === RICH TEXT ===
export const RichText = styled.div<{ $alignment?: 'left' | 'center' | 'right' }>`
  text-align: ${props => props.$alignment || 'left'};
  color: var(--color-gray-900);
  line-height: var(--line-height-relaxed);
  
  /* Paragraphes */
  p {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-6);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  /* Titres */
  h1, h2, h3, h4 {
    font-weight: var(--font-weight-bold);
    color: var(--color-gray-900);
    line-height: var(--line-height-tight);
    margin-top: var(--spacing-12);
    margin-bottom: var(--spacing-6);
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  h1 {
    font-size: var(--font-size-5xl);
    
    @media (max-width: 768px) {
      font-size: var(--font-size-4xl);
    }
  }
  
  h2 {
    font-size: var(--font-size-4xl);
    
    @media (max-width: 768px) {
      font-size: var(--font-size-3xl);
    }
  }
  
  h3 {
    font-size: var(--font-size-3xl);
    
    @media (max-width: 768px) {
      font-size: var(--font-size-2xl);
    }
  }
  
  h4 {
    font-size: var(--font-size-2xl);
    
    @media (max-width: 768px) {
      font-size: var(--font-size-xl);
    }
  }
  
  /* Texte en gras et italique */
  strong {
    font-weight: var(--font-weight-bold);
  }
  
  em {
    font-style: italic;
  }
`

// === LIENS ===
export const Link = styled.a`
  color: var(--color-primary);
  text-decoration: underline;
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--color-primary-dark);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: var(--border-radius-base);
  }
`

export const Underline = styled.span`
  text-decoration: underline;
`

export const InlineCode = styled.code`
  background-color: var(--color-gray-100);
  color: var(--color-gray-800);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--border-radius-base);
  font-family: var(--font-family-mono);
  font-size: 0.9em;
`

// === BLOCKQUOTE ===
export const Blockquote = styled.blockquote`
  border-left: 4px solid var(--color-primary);
  padding-left: var(--spacing-6);
  margin: var(--spacing-8) 0;
  font-style: italic;
  color: var(--color-gray-600);
  font-size: var(--font-size-xl);
  
  @media (max-width: 768px) {
    padding-left: var(--spacing-4);
    font-size: var(--font-size-lg);
  }
`

// === LISTES ===
export const UnorderedList = styled.ul`
  list-style: disc;
  margin-left: var(--spacing-6);
  margin-bottom: var(--spacing-6);
  
  @media (max-width: 768px) {
    margin-left: var(--spacing-4);
  }
`

export const OrderedList = styled.ol`
  list-style: decimal;
  margin-left: var(--spacing-6);
  margin-bottom: var(--spacing-6);
  
  @media (max-width: 768px) {
    margin-left: var(--spacing-4);
  }
`

export const ListItem = styled.li`
  margin-bottom: var(--spacing-3);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  
  &:last-child {
    margin-bottom: 0;
  }
`

// === IMAGES ===
export const ImageWrapper = styled.figure`
  margin: var(--spacing-12) 0;
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  background-color: var(--color-gray-100);
`

export const ImageCaption = styled.figcaption`
  margin-top: var(--spacing-3);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  text-align: center;
  font-style: italic;
`
