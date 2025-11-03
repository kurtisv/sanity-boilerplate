'use client'

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'
import { useIdWithFallback } from '@/hooks/useStableId'
import * as S from './Input.styles'

export type InputVariant = 'default' | 'filled' | 'flushed'
export type InputSize = 'sm' | 'md' | 'lg'

interface BaseInputProps {
  variant?: InputVariant
  size?: InputSize
  label?: string
  helperText?: string
  error?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  required?: boolean
}

interface InputProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, keyof BaseInputProps> {
  as?: 'input'
}

interface TextareaProps extends BaseInputProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof BaseInputProps> {
  as: 'textarea'
  rows?: number
  resize?: boolean
}

export type InputComponentProps = InputProps | TextareaProps

/**
 * Input Component
 * 
 * Composant d'entrée polyvalent avec support pour:
 * - Input et textarea
 * - Multiples variants (default, filled, flushed)
 * - Différentes tailles (sm, md, lg)
 * - Labels et textes d'aide
 * - États d'erreur
 * - Icônes à gauche et droite
 * - Validation visuelle
 * 
 * @example
 * // Input simple
 * <Input label="Email" type="email" placeholder="votre@email.com" />
 * 
 * // Input avec icône
 * <Input 
 *   label="Recherche" 
 *   leftIcon={<SearchIcon />}
 *   placeholder="Rechercher..."
 * />
 * 
 * // Textarea
 * <Input 
 *   as="textarea" 
 *   label="Message" 
 *   rows={4}
 *   placeholder="Votre message..."
 * />
 * 
 * // Input avec erreur
 * <Input 
 *   label="Email" 
 *   type="email" 
 *   error="Email invalide"
 *   value="invalid-email"
 * />
 */
export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputComponentProps>(
  ({
    variant = 'default',
    size = 'md',
    label,
    helperText,
    error,
    leftIcon,
    rightIcon,
    fullWidth = true,
    required = false,
    className,
    ...props
  }, ref) => {
    const isTextarea = props.as === 'textarea'
    const hasError = Boolean(error)
    const inputId = useIdWithFallback(props.id, 'input')

    return (
      <S.InputWrapper $fullWidth={fullWidth} className={className}>
        {label && (
          <S.Label htmlFor={inputId} $required={required} $error={hasError}>
            {label}
            {required && <S.RequiredIndicator>*</S.RequiredIndicator>}
          </S.Label>
        )}
        
        <S.InputContainer $hasLeftIcon={Boolean(leftIcon)} $hasRightIcon={Boolean(rightIcon)}>
          {leftIcon && (
            <S.IconWrapper $position="left">
              {leftIcon}
            </S.IconWrapper>
          )}
          
          {isTextarea ? (
            <S.Textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={inputId}
              $variant={variant}
              $size={size}
              $error={hasError}
              $hasLeftIcon={Boolean(leftIcon)}
              $hasRightIcon={Boolean(rightIcon)}
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <S.Input
              ref={ref as React.Ref<HTMLInputElement>}
              id={inputId}
              $variant={variant}
              $size={size}
              $error={hasError}
              $hasLeftIcon={Boolean(leftIcon)}
              $hasRightIcon={Boolean(rightIcon)}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
          
          {rightIcon && (
            <S.IconWrapper $position="right">
              {rightIcon}
            </S.IconWrapper>
          )}
        </S.InputContainer>
        
        {(error || helperText) && (
          <S.HelperText $error={hasError}>
            {error || helperText}
          </S.HelperText>
        )}
      </S.InputWrapper>
    )
  }
)

Input.displayName = 'Input'

export default Input
