'use client'

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import * as S from './Button.styles'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
  className?: string
}

interface ButtonAsButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  href?: never
}

interface ButtonAsLinkProps extends BaseButtonProps {
  href: string
  target?: string
  rel?: string
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

/**
 * Button Component
 * 
 * Composant bouton polyvalent avec support pour:
 * - Multiples variants (primary, secondary, ghost, outline, danger)
 * - Différentes tailles (sm, md, lg, xl)
 * - États de chargement et désactivé
 * - Icônes à gauche et droite
 * - Rendu comme bouton ou lien
 * - Pleine largeur
 * 
 * @example
 * // Bouton simple
 * <Button variant="primary">Cliquez ici</Button>
 * 
 * // Bouton avec icône
 * <Button variant="secondary" leftIcon={<Icon />}>Avec icône</Button>
 * 
 * // Bouton lien
 * <Button href="/contact" variant="outline">Contact</Button>
 * 
 * // Bouton de chargement
 * <Button loading disabled>Chargement...</Button>
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    children,
    className,
    ...props
  }, ref) => {
    const buttonContent = (
      <>
        {loading && (
          <S.LoadingSpinner>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="32"
                strokeDashoffset="32"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur="2s"
                  values="0 32;16 16;0 32;0 32"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  dur="2s"
                  values="0;-16;-32;-32"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </S.LoadingSpinner>
        )}
        
        {!loading && leftIcon && (
          <S.IconWrapper $position="left">
            {leftIcon}
          </S.IconWrapper>
        )}
        
        <S.ButtonText $loading={loading}>
          {children}
        </S.ButtonText>
        
        {!loading && rightIcon && (
          <S.IconWrapper $position="right">
            {rightIcon}
          </S.IconWrapper>
        )}
      </>
    )

    const buttonProps = {
      $variant: variant,
      $size: size,
      $fullWidth: fullWidth,
      $loading: loading,
      disabled: disabled || loading,
      className,
    }

    // Rendu comme lien
    if ('href' in props && props.href) {
      return (
        <S.ButtonAsLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={props.href}
          target={props.target}
          rel={props.rel}
          {...buttonProps}
        >
          {buttonContent}
        </S.ButtonAsLink>
      )
    }

    // Rendu comme bouton
    return (
      <S.ButtonAsButton
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        {...buttonProps}
      >
        {buttonContent}
      </S.ButtonAsButton>
    )
  }
)

Button.displayName = 'Button'

export default Button
