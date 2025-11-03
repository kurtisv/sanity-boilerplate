import styled, { css } from 'styled-components'
import Link from 'next/link'
import { ButtonVariant, ButtonSize } from './Button'

interface ButtonStyleProps {
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
  $loading: boolean
  disabled?: boolean
}

// Styles de base partagés
const baseButtonStyles = css<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
  
  ${props => props.disabled && css`
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  `}
  
  ${props => props.$loading && css`
    cursor: wait;
    pointer-events: none;
  `}
  
  /* Tailles */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return css`
          padding: var(--spacing-2) var(--spacing-3);
          font-size: var(--font-size-sm);
          min-height: 36px;
        `
      case 'lg':
        return css`
          padding: var(--spacing-4) var(--spacing-6);
          font-size: var(--font-size-lg);
          min-height: 52px;
        `
      case 'xl':
        return css`
          padding: var(--spacing-5) var(--spacing-8);
          font-size: var(--font-size-xl);
          min-height: 60px;
        `
      default: // md
        return css`
          padding: var(--spacing-3) var(--spacing-4);
          font-size: var(--font-size-base);
          min-height: 44px;
        `
    }
  }}
  
  /* Variants */
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return css`
          background: var(--color-primary);
          color: var(--color-white);
          border-color: var(--color-primary);
          
          &:hover:not(:disabled) {
            background: var(--color-primary-dark);
            border-color: var(--color-primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.2);
          }
        `
      
      case 'secondary':
        return css`
          background: var(--color-secondary);
          color: var(--color-white);
          border-color: var(--color-secondary);
          
          &:hover:not(:disabled) {
            background: var(--color-secondary-dark);
            border-color: var(--color-secondary-dark);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
          }
        `
      
      case 'outline':
        return css`
          background: transparent;
          color: var(--color-primary);
          border-color: var(--color-primary);
          
          &:hover:not(:disabled) {
            background: var(--color-primary);
            color: var(--color-white);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.2);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `
      
      case 'ghost':
        return css`
          background: transparent;
          color: var(--color-gray-700);
          border-color: transparent;
          
          &:hover:not(:disabled) {
            background: var(--color-gray-100);
            color: var(--color-gray-900);
            transform: translateY(-1px);
          }
          
          &:active:not(:disabled) {
            background: var(--color-gray-200);
            transform: translateY(0);
          }
        `
      
      case 'danger':
        return css`
          background: var(--color-error);
          color: var(--color-white);
          border-color: var(--color-error);
          
          &:hover:not(:disabled) {
            background: #dc2626;
            border-color: #dc2626;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
          }
        `
      
      default:
        return css`
          background: var(--color-primary);
          color: var(--color-white);
          border-color: var(--color-primary);
        `
    }
  }}
  
  /* Focus states */
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`

export const ButtonAsButton = styled.button<ButtonStyleProps>`
  ${baseButtonStyles}
`

export const ButtonAsLink = styled(Link)<ButtonStyleProps>`
  ${baseButtonStyles}
`

export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export const IconWrapper = styled.span<{ $position: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 1em;
    height: 1em;
  }
`

export const ButtonText = styled.span<{ $loading: boolean }>`
  ${props => props.$loading && css`
    opacity: 0;
  `}
`
