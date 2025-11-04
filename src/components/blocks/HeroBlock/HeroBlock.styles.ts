/**
 * Styled-components pour le HeroBlock
 */

import styled, { css } from 'styled-components'
import { theme, media } from '@/styles/theme'

export const HeroSection = styled.section<{
  $height?: 'small' | 'medium' | 'large' | 'fullscreen'
  $verticalAlign?: 'top' | 'center' | 'bottom'
  $backgroundImage?: string
  $backgroundColor?: string
}>`
  position: relative;
  width: 100%;
  display: flex;
  
  ${({ $height = 'medium' }) => {
    const heights = {
      small: '400px',
      medium: '600px', 
      large: '800px',
      fullscreen: '100vh'
    }
    return css`min-height: ${heights[$height]};`
  }}
  
  ${({ $verticalAlign = 'center' }) => {
    const alignments = {
      top: css`
        align-items: flex-start;
        padding-top: ${theme.spacing[20]};
      `,
      center: css`
        align-items: center;
      `,
      bottom: css`
        align-items: flex-end;
        padding-bottom: ${theme.spacing[20]};
      `
    }
    return alignments[$verticalAlign]
  }}
  
  ${({ $backgroundColor }) => $backgroundColor && css`
    background-color: ${$backgroundColor};
  `}
  
  ${({ $backgroundImage }) => $backgroundImage && css`
    background-image: url(${$backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `}
`

export const BackgroundOverlay = styled.div<{
  $color?: string
  $opacity?: number
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  
  ${({ $color = 'rgba(0, 0, 0, 0.5)', $opacity = 50 }) => css`
    background-color: ${$color};
    opacity: ${$opacity / 100};
  `}
`

export const HeroContainer = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: ${theme.breakpoints['2xl']};
  margin: 0 auto;
  padding: 0 ${theme.spacing[6]};
  
  ${media.sm} {
    padding: 0 ${theme.spacing[8]};
  }
`

export const HeroContent = styled.div<{
  $layout?: 'centered' | 'left-image' | 'right-image' | 'fullwidth'
  $alignment?: 'left' | 'center' | 'right'
}>`
  ${({ $layout = 'centered' }) => {
    if ($layout === 'centered') {
      return css`
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
      `
    }
    
    if ($layout === 'left-image' || $layout === 'right-image') {
      return css`
        display: grid;
        grid-template-columns: 1fr;
        gap: ${theme.spacing[12]};
        align-items: center;
        
        ${media.lg} {
          grid-template-columns: 1fr 1fr;
        }
      `
    }
    
    return css`
      width: 100%;
    `
  }}
  
  ${({ $alignment }) => $alignment && css`
    text-align: ${$alignment};
  `}
`

export const TextContent = styled.div<{
  $order?: number
}>`
  ${({ $order }) => $order && css`
    ${media.lg} {
      order: ${$order};
    }
  `}
`

export const HeroTitle = styled.h1<{
  $color?: string
  $size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}>`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeight.tight};
  margin-bottom: ${theme.spacing[6]};
  
  ${({ $color }) => css`
    color: ${$color || theme.colors.text.primary};
  `}
  
  ${({ $size = 'lg' }) => {
    const sizes = {
      sm: css`
        font-size: ${theme.typography.fontSize['4xl']};
        ${media.lg} {
          font-size: ${theme.typography.fontSize['5xl']};
        }
      `,
      md: css`
        font-size: ${theme.typography.fontSize['5xl']};
        ${media.lg} {
          font-size: ${theme.typography.fontSize['6xl']};
        }
      `,
      lg: css`
        font-size: ${theme.typography.fontSize['5xl']};
        ${media.lg} {
          font-size: ${theme.typography.fontSize['6xl']};
        }
      `,
      xl: css`
        font-size: ${theme.typography.fontSize['6xl']};
        ${media.lg} {
          font-size: ${theme.typography.fontSize['7xl']};
        }
      `,
      '2xl': css`
        font-size: ${theme.typography.fontSize['7xl']};
        ${media.lg} {
          font-size: ${theme.typography.fontSize['8xl']};
        }
      `
    }
    return sizes[$size]
  }}
`

export const HeroSubtitle = styled.p<{
  $color?: string
  $size?: 'sm' | 'md' | 'lg'
  $maxWidth?: string
  $centered?: boolean
}>`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing[8]};
  
  ${({ $color }) => css`
    color: ${$color || theme.colors.text.secondary};
  `}
  
  ${({ $size = 'md' }) => {
    const sizes = {
      sm: css`
        font-size: ${theme.typography.fontSize.lg};
      `,
      md: css`
        font-size: ${theme.typography.fontSize.xl};
        ${media.lg} {
          font-size: ${theme.typography.fontSize['2xl']};
        }
      `,
      lg: css`
        font-size: ${theme.typography.fontSize['2xl']};
      `
    }
    return sizes[$size]
  }}
  
  ${({ $maxWidth = '600px' }) => css`
    max-width: ${$maxWidth};
  `}
  
  ${({ $centered }) => $centered && css`
    margin-left: auto;
    margin-right: auto;
  `}
`

export const CTAContainer = styled.div<{
  $alignment?: 'left' | 'center' | 'right'
}>`
  display: flex;
  gap: ${theme.spacing[4]};
  flex-wrap: wrap;
  
  ${({ $alignment = 'center' }) => {
    const alignments = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end'
    }
    return css`
      justify-content: ${alignments[$alignment]};
    `
  }}
`

export const CTAButton = styled.a<{
  $variant?: 'primary' | 'secondary' | 'ghost'
  $size?: 'sm' | 'md' | 'lg'
  $customColor?: string
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
        padding: ${theme.spacing[3]} ${theme.spacing[6]};
        font-size: ${theme.typography.fontSize.sm};
      `,
      md: css`
        padding: ${theme.spacing[4]} ${theme.spacing[8]};
        font-size: ${theme.typography.fontSize.base};
      `,
      lg: css`
        padding: ${theme.spacing[5]} ${theme.spacing[10]};
        font-size: ${theme.typography.fontSize.lg};
      `
    }
    return sizes[$size]
  }}
  
  ${({ $variant = 'primary', $customColor }) => {
    const variants = {
      primary: css`
        background: ${$customColor || theme.colors.primary[600]};
        color: ${theme.colors.text.inverse};
        box-shadow: ${theme.boxShadow.lg};
        
        &:hover {
          background: ${$customColor ? $customColor : theme.colors.primary[700]};
          transform: translateY(-1px) scale(1.05);
          box-shadow: ${theme.boxShadow.xl};
        }
      `,
      secondary: css`
        background: ${theme.colors.background.primary};
        color: ${theme.colors.text.primary};
        border: 1px solid ${theme.colors.gray[200]};
        box-shadow: ${theme.boxShadow.lg};
        
        &:hover {
          background: ${theme.colors.gray[50]};
          border-color: ${theme.colors.gray[400]};
        }
      `,
      ghost: css`
        background: transparent;
        color: currentColor;
        border: 1px solid currentColor;
        
        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `
    }
    return variants[$variant]
  }}
`

export const ImageContainer = styled.div`
  position: relative;
  
  img {
    width: 100%;
    height: auto;
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.boxShadow['2xl']};
  }
`

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 400px;
  background: ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.muted};
  font-size: ${theme.typography.fontSize.lg};
`
