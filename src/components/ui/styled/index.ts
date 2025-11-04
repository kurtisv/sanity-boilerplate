/**
 * Composants styled-components réutilisables
 * Système unifié pour tout le projet
 */

import styled, { css } from 'styled-components'
import { theme, media } from '@/styles/theme'

// ===== LAYOUT =====

export const Container = styled.div<{ 
  $maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  $padding?: boolean
}>`
  width: 100%;
  margin: 0 auto;
  
  ${({ $maxWidth = 'xl' }) => {
    const maxWidths = {
      sm: '640px',
      md: '768px', 
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      full: '100%'
    }
    return css`max-width: ${maxWidths[$maxWidth]};`
  }}
  
  ${({ $padding = true }) => $padding && css`
    padding-left: ${theme.spacing[6]};
    padding-right: ${theme.spacing[6]};
    
    ${media.sm} {
      padding-left: ${theme.spacing[8]};
      padding-right: ${theme.spacing[8]};
    }
  `}
`

export const Section = styled.section<{
  $padding?: 'sm' | 'md' | 'lg' | 'xl'
  $background?: string
}>`
  width: 100%;
  
  ${({ $padding = 'lg' }) => {
    const paddings = {
      sm: theme.spacing[8],
      md: theme.spacing[12],
      lg: theme.spacing[16],
      xl: theme.spacing[24]
    }
    return css`
      padding-top: ${paddings[$padding]};
      padding-bottom: ${paddings[$padding]};
    `
  }}
  
  ${({ $background }) => $background && css`
    background: ${$background};
  `}
`

export const Flex = styled.div<{
  $direction?: 'row' | 'column'
  $align?: 'start' | 'center' | 'end' | 'stretch'
  $justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  $gap?: keyof typeof theme.spacing
  $wrap?: boolean
}>`
  display: flex;
  
  ${({ $direction = 'row' }) => css`
    flex-direction: ${$direction};
  `}
  
  ${({ $align }) => $align && css`
    align-items: ${$align === 'start' ? 'flex-start' : 
                   $align === 'end' ? 'flex-end' : $align};
  `}
  
  ${({ $justify }) => $justify && css`
    justify-content: ${$justify === 'start' ? 'flex-start' :
                       $justify === 'end' ? 'flex-end' :
                       $justify === 'between' ? 'space-between' :
                       $justify === 'around' ? 'space-around' :
                       $justify === 'evenly' ? 'space-evenly' : $justify};
  `}
  
  ${({ $gap }) => $gap && css`
    gap: ${theme.spacing[$gap]};
  `}
  
  ${({ $wrap }) => $wrap && css`
    flex-wrap: wrap;
  `}
`

export const Grid = styled.div<{
  $columns?: number | string
  $gap?: keyof typeof theme.spacing
  $responsive?: boolean
}>`
  display: grid;
  
  ${({ $columns = 1 }) => css`
    grid-template-columns: ${typeof $columns === 'number' 
      ? `repeat(${$columns}, 1fr)` 
      : $columns};
  `}
  
  ${({ $gap = 6 }) => css`
    gap: ${theme.spacing[$gap]};
  `}
  
  ${({ $responsive, $columns }) => $responsive && typeof $columns === 'number' && css`
    grid-template-columns: 1fr;
    
    ${media.sm} {
      grid-template-columns: repeat(${Math.min($columns, 2)}, 1fr);
    }
    
    ${media.md} {
      grid-template-columns: repeat(${Math.min($columns, 3)}, 1fr);
    }
    
    ${media.lg} {
      grid-template-columns: repeat(${$columns}, 1fr);
    }
  `}
`

// ===== TYPOGRAPHY =====

export const Heading = styled.h1<{
  $level?: 1 | 2 | 3 | 4 | 5 | 6
  $size?: keyof typeof theme.typography.fontSize
  $weight?: keyof typeof theme.typography.fontWeight
  $color?: string
  $align?: 'left' | 'center' | 'right'
  $margin?: boolean
}>`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  line-height: ${theme.typography.lineHeight.tight};
  color: ${({ $color }) => $color || theme.colors.text.primary};
  
  ${({ $align }) => $align && css`
    text-align: ${$align};
  `}
  
  ${({ $size, $level = 1 }) => {
    const defaultSizes = {
      1: '5xl',
      2: '4xl', 
      3: '3xl',
      4: '2xl',
      5: 'xl',
      6: 'lg'
    } as const
    
    const size = $size || defaultSizes[$level]
    return css`
      font-size: ${theme.typography.fontSize[size]};
    `
  }}
  
  ${({ $weight = 'bold' }) => css`
    font-weight: ${theme.typography.fontWeight[$weight]};
  `}
  
  ${({ $margin = true }) => $margin && css`
    margin-bottom: ${theme.spacing[6]};
  `}
`

export const Text = styled.p<{
  $size?: keyof typeof theme.typography.fontSize
  $weight?: keyof typeof theme.typography.fontWeight
  $color?: string
  $align?: 'left' | 'center' | 'right'
  $lineHeight?: keyof typeof theme.typography.lineHeight
  $margin?: boolean
}>`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  color: ${({ $color }) => $color || theme.colors.text.primary};
  
  ${({ $size = 'base' }) => css`
    font-size: ${theme.typography.fontSize[$size]};
  `}
  
  ${({ $weight = 'normal' }) => css`
    font-weight: ${theme.typography.fontWeight[$weight]};
  `}
  
  ${({ $align }) => $align && css`
    text-align: ${$align};
  `}
  
  ${({ $lineHeight = 'normal' }) => css`
    line-height: ${theme.typography.lineHeight[$lineHeight]};
  `}
  
  ${({ $margin = true }) => $margin && css`
    margin-bottom: ${theme.spacing[4]};
  `}
`

// ===== BUTTONS =====

export const Button = styled.button<{
  $variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  $size?: 'sm' | 'md' | 'lg' | 'xl'
  $fullWidth?: boolean
  $disabled?: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-decoration: none;
  cursor: pointer;
  transition: all ${theme.transition.fast};
  
  ${({ $size = 'md' }) => {
    const sizes = {
      sm: css`
        padding: ${theme.spacing[2]} ${theme.spacing[4]};
        font-size: ${theme.typography.fontSize.sm};
      `,
      md: css`
        padding: ${theme.spacing[3]} ${theme.spacing[6]};
        font-size: ${theme.typography.fontSize.base};
      `,
      lg: css`
        padding: ${theme.spacing[4]} ${theme.spacing[8]};
        font-size: ${theme.typography.fontSize.lg};
      `,
      xl: css`
        padding: ${theme.spacing[5]} ${theme.spacing[10]};
        font-size: ${theme.typography.fontSize.xl};
      `
    }
    return sizes[$size]
  }}
  
  ${({ $variant = 'primary' }) => {
    const variants = {
      primary: css`
        background: ${theme.colors.primary[600]};
        color: ${theme.colors.text.inverse};
        box-shadow: ${theme.boxShadow.sm};
        
        &:hover:not(:disabled) {
          background: ${theme.colors.primary[700]};
          transform: translateY(-1px);
          box-shadow: ${theme.boxShadow.md};
        }
      `,
      secondary: css`
        background: ${theme.colors.background.primary};
        color: ${theme.colors.text.primary};
        border: 1px solid ${theme.colors.gray[300]};
        box-shadow: ${theme.boxShadow.sm};
        
        &:hover:not(:disabled) {
          background: ${theme.colors.gray[50]};
          border-color: ${theme.colors.gray[400]};
        }
      `,
      ghost: css`
        background: transparent;
        color: ${theme.colors.text.primary};
        
        &:hover:not(:disabled) {
          background: ${theme.colors.gray[100]};
        }
      `,
      outline: css`
        background: transparent;
        color: ${theme.colors.primary[600]};
        border: 1px solid ${theme.colors.primary[600]};
        
        &:hover:not(:disabled) {
          background: ${theme.colors.primary[600]};
          color: ${theme.colors.text.inverse};
        }
      `
    }
    return variants[$variant]
  }}
  
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  
  ${({ $disabled }) => $disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
    }
  `}
`

// ===== CARDS =====

export const Card = styled.div<{
  $variant?: 'default' | 'bordered' | 'elevated' | 'glass'
  $padding?: keyof typeof theme.spacing
  $hover?: boolean
}>`
  background: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.xl};
  transition: all ${theme.transition.base};
  
  ${({ $padding = 6 }) => css`
    padding: ${theme.spacing[$padding]};
  `}
  
  ${({ $variant = 'default' }) => {
    const variants = {
      default: css`
        box-shadow: ${theme.boxShadow.sm};
      `,
      bordered: css`
        border: 1px solid ${theme.colors.gray[200]};
      `,
      elevated: css`
        box-shadow: ${theme.boxShadow.lg};
      `,
      glass: css`
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      `
    }
    return variants[$variant]
  }}
  
  ${({ $hover }) => $hover && css`
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.boxShadow.xl};
    }
  `}
`
