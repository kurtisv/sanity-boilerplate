import styled, { css } from 'styled-components'
import { CardVariant, CardPadding } from './Card'

interface CardStyleProps {
  $variant: CardVariant
  $padding: CardPadding
  $hoverable: boolean
  $clickable: boolean
}

export const Card = styled.div<CardStyleProps>`
  border-radius: var(--border-radius-xl);
  transition: all var(--transition-base);
  overflow: hidden;
  
  ${props => {
    switch (props.$variant) {
      case 'outlined':
        return css`
          background: var(--theme-card-bg);
          border: 2px solid var(--theme-card-border);
        `
      
      case 'elevated':
        return css`
          background: var(--theme-card-bg);
          box-shadow: var(--theme-shadow-lg);
          border: 1px solid var(--theme-border-primary);
        `
      
      case 'filled':
        return css`
          background: var(--theme-bg-secondary);
          border: 1px solid var(--theme-border-primary);
        `
      
      default: // default
        return css`
          background: var(--theme-card-bg);
          box-shadow: var(--theme-shadow-md);
          border: 1px solid var(--theme-border-primary);
        `
    }
  }}
  
  ${props => {
    switch (props.$padding) {
      case 'none':
        return css`
          padding: 0;
        `
      case 'sm':
        return css`
          padding: var(--spacing-3);
        `
      case 'lg':
        return css`
          padding: var(--spacing-8);
        `
      default: // md
        return css`
          padding: var(--spacing-6);
        `
    }
  }}
  
  ${props => props.$hoverable && css`
    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
      
      ${props.$variant === 'outlined' && css`
        border-color: var(--color-primary);
      `}
    }
  `}
  
  ${props => props.$clickable && css`
    cursor: pointer;
    
    &:active {
      transform: translateY(-2px);
    }
    
    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  `}
`

export const CardHeader = styled.div`
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-200);
  margin-bottom: var(--spacing-4);
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    color: var(--color-gray-900);
    font-weight: var(--font-weight-semibold);
  }
  
  p {
    margin: var(--spacing-2) 0 0 0;
    color: var(--color-gray-600);
    font-size: var(--font-size-sm);
  }
`

export const CardBody = styled.div`
  flex: 1;
  
  h1, h2, h3, h4, h5, h6 {
    color: var(--color-gray-900);
    margin-top: 0;
    margin-bottom: var(--spacing-3);
  }
  
  p {
    color: var(--color-gray-700);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--spacing-4);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  ul, ol {
    margin-bottom: var(--spacing-4);
    padding-left: var(--spacing-5);
    
    li {
      margin-bottom: var(--spacing-1);
      color: var(--color-gray-700);
    }
  }
`

export const CardFooter = styled.div`
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--color-gray-200);
  margin-top: var(--spacing-4);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  
  /* Styles pour les boutons dans le footer */
  button, a[role="button"] {
    &:first-child {
      margin-left: 0;
    }
    
    &:last-child {
      margin-left: auto;
    }
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-2);
    
    button, a[role="button"] {
      width: 100%;
      margin-left: 0 !important;
    }
  }
`
