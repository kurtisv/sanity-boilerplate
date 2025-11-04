/**
 * Styled-components pour PageWrapper
 */

import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'

export const PageContainer = styled.div<{
  $backgroundImage?: string
  $backgroundColor?: string
}>`
  min-height: 100vh;
  position: relative;
  
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

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
`

export const BlocksContainer = styled.div<{
  $gap?: 'sm' | 'md' | 'lg' | 'xl'
}>`
  display: flex;
  flex-direction: column;
  
  ${({ $gap = 'lg' }) => {
    const gaps = {
      sm: theme.spacing[8],
      md: theme.spacing[12],
      lg: theme.spacing[16],
      xl: theme.spacing[24]
    }
    return css`
      gap: ${gaps[$gap]};
    `
  }}
`
