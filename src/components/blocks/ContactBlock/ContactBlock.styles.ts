import styled, { css } from 'styled-components'

interface SectionProps {
  $backgroundColor: string
  $spacing: 'compact' | 'normal' | 'large'
}

interface LayoutProps {
  $layout: 'centered' | 'two-columns' | 'with-sidebar' | 'full-width'
}

interface TextProps {
  $textColor: string
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

export const Content = styled.div<LayoutProps>`
  ${props => {
    switch (props.$layout) {
      case 'full-width':
        return css`
          max-width: 100%;
        `
      case 'centered':
        return css`
          max-width: 600px;
          margin: 0 auto;
        `
      default:
        return css`
          max-width: 100%;
        `
    }
  }}
`

export const Header = styled.div<LayoutProps>`
  text-align: center;
  margin-bottom: var(--spacing-8);
  
  ${props => (props.$layout === 'with-sidebar' || props.$layout === 'two-columns') && css`
    text-align: left;
    
    @media (max-width: 768px) {
      text-align: center;
    }
  `}
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
  
  ${props => css`
    margin-left: auto;
    margin-right: auto;
  `}
`

export const MainContent = styled.div<LayoutProps>`
  ${props => {
    switch (props.$layout) {
      case 'two-columns':
        return css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-8);
          
          @media (max-width: 1024px) {
            grid-template-columns: 1fr;
            gap: var(--spacing-6);
          }
        `
      case 'with-sidebar':
        return css`
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--spacing-8);
          
          @media (max-width: 1024px) {
            grid-template-columns: 1fr;
            gap: var(--spacing-6);
          }
        `
      default:
        return css`
          display: block;
        `
    }
  }}
`

export const FormWrapper = styled.div`
  width: 100%;
`

export const FormGrid = styled.div<LayoutProps>`
  display: grid;
  gap: var(--spacing-4);
  
  ${props => props.$layout === 'two-columns' && css`
    grid-template-columns: 1fr 1fr;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `}
`

export const FieldWrapper = styled.div<{ $width: 'half' | 'full' }>`
  ${props => props.$width === 'half' && css`
    @media (min-width: 769px) {
      grid-column: span 1;
    }
  `}
  
  ${props => props.$width === 'full' && css`
    grid-column: 1 / -1;
  `}
`

export const SubmitWrapper = styled.div`
  margin-top: var(--spacing-6);
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    justify-content: stretch;
  }
`

export const ContactInfoWrapper = styled.div`
  @media (max-width: 1024px) {
    order: -1;
  }
`

export const ContactInfoTitle = styled.h3<TextProps>`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: ${props => props.$textColor};
  margin: 0 0 var(--spacing-6) 0;
`

export const ContactInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
`

export const ContactInfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
`

export const ContactInfoIcon = styled.div`
  font-size: var(--font-size-lg);
  flex-shrink: 0;
  margin-top: var(--spacing-1);
`

export const ContactInfoText = styled.div<TextProps>`
  color: ${props => props.$textColor};
  line-height: var(--line-height-relaxed);
  white-space: pre-line;
`

// États de succès
export const SuccessCard = styled.div`
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  padding: var(--spacing-8);
`

export const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: var(--spacing-4);
`

export const SuccessTitle = styled.h2<TextProps>`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: ${props => props.$textColor};
  margin: 0 0 var(--spacing-4) 0;
`

export const SuccessDescription = styled.p<TextProps>`
  font-size: var(--font-size-lg);
  color: ${props => props.$textColor};
  opacity: 0.8;
  margin: 0 0 var(--spacing-6) 0;
  line-height: var(--line-height-relaxed);
`
