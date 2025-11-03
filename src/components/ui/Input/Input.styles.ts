import styled, { css } from 'styled-components'
import { InputVariant, InputSize } from './Input'

interface InputStyleProps {
  $variant: InputVariant
  $size: InputSize
  $error: boolean
  $hasLeftIcon: boolean
  $hasRightIcon: boolean
}

// Styles de base partagés pour input et textarea
const baseInputStyles = css<InputStyleProps>`
  width: 100%;
  font-family: var(--font-family-primary);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-base);
  outline: none;
  
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
          padding: var(--spacing-4) var(--spacing-4);
          font-size: var(--font-size-lg);
          min-height: 52px;
        `
      default: // md
        return css`
          padding: var(--spacing-3) var(--spacing-4);
          font-size: var(--font-size-base);
          min-height: 44px;
        `
    }
  }}
  
  ${props => props.$hasLeftIcon && css`
    padding-left: ${props.$size === 'sm' ? '2.5rem' : props.$size === 'lg' ? '3.5rem' : '3rem'};
  `}
  
  ${props => props.$hasRightIcon && css`
    padding-right: ${props.$size === 'sm' ? '2.5rem' : props.$size === 'lg' ? '3.5rem' : '3rem'};
  `}
  
  ${props => {
    switch (props.$variant) {
      case 'filled':
        return css`
          background: var(--color-gray-100);
          border: 2px solid transparent;
          color: var(--color-gray-900);
          
          &:focus {
            background: var(--color-white);
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }
          
          &::placeholder {
            color: var(--color-gray-500);
          }
        `
      
      case 'flushed':
        return css`
          background: transparent;
          border: none;
          border-bottom: 2px solid var(--color-gray-300);
          border-radius: 0;
          padding-left: 0;
          padding-right: 0;
          
          &:focus {
            border-bottom-color: var(--color-primary);
            box-shadow: 0 1px 0 0 var(--color-primary);
          }
          
          &::placeholder {
            color: var(--color-gray-400);
          }
        `
      
      default: // default
        return css`
          background: var(--color-white);
          border: 2px solid var(--color-gray-300);
          color: var(--color-gray-900);
          
          &:focus {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }
          
          &:hover:not(:focus) {
            border-color: var(--color-gray-400);
          }
          
          &::placeholder {
            color: var(--color-gray-500);
          }
        `
    }
  }}
  
  ${props => props.$error && css`
    border-color: var(--color-error) !important;
    
    &:focus {
      border-color: var(--color-error) !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
  `}
  
  &:disabled {
    background: var(--color-gray-100);
    color: var(--color-gray-500);
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export const InputWrapper = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  
  ${props => props.$fullWidth ? 'width: 100%;' : 'width: auto;'}
`

export const Label = styled.label<{ $required: boolean; $error: boolean }>`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: ${props => props.$error ? 'var(--color-error)' : 'var(--color-gray-700)'};
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
`

export const RequiredIndicator = styled.span`
  color: var(--color-error);
  font-weight: var(--font-weight-bold);
`

export const InputContainer = styled.div<{ $hasLeftIcon: boolean; $hasRightIcon: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
`

export const Input = styled.input<InputStyleProps>`
  ${baseInputStyles}
`

export const Textarea = styled.textarea<InputStyleProps & { rows?: number; resize?: boolean }>`
  ${baseInputStyles}
  resize: ${props => props.resize === false ? 'none' : 'vertical'};
  min-height: ${props => props.rows ? `${props.rows * 1.5}rem` : '6rem'};
  line-height: var(--line-height-normal);
`

export const IconWrapper = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$position}: var(--spacing-3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-500);
  pointer-events: none;
  z-index: 1;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`

export const HelperText = styled.div<{ $error: boolean }>`
  font-size: var(--font-size-sm);
  color: ${props => props.$error ? 'var(--color-error)' : 'var(--color-gray-600)'};
  line-height: var(--line-height-normal);
`
