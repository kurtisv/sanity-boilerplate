/**
 * Styled-components pour BlockRenderer
 */

import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'

export const BlocksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};
`

export const PlaceholderBlock = styled.div<{
  $variant?: 'warning' | 'error' | 'info'
}>`
  padding: ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.lg};
  margin: ${theme.spacing[4]} 0;
  
  ${({ $variant = 'info' }) => {
    const variants = {
      warning: css`
        border: 2px solid ${theme.colors.warning};
        background-color: #fefce8;
      `,
      error: css`
        border: 2px solid ${theme.colors.error};
        background-color: #fef2f2;
      `,
      info: css`
        border: 2px solid ${theme.colors.info};
        background-color: #eff6ff;
      `
    }
    return variants[$variant]
  }}
`

export const PlaceholderTitle = styled.h3<{
  $variant?: 'warning' | 'error' | 'info'
}>`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin: 0 0 ${theme.spacing[2]} 0;
  
  ${({ $variant = 'info' }) => {
    const colors = {
      warning: '#b45309',
      error: '#b91c1c',
      info: '#1d4ed8'
    }
    return css`
      color: ${colors[$variant]};
    `
  }}
`

export const PlaceholderText = styled.p<{
  $variant?: 'warning' | 'error' | 'info'
}>`
  font-size: ${theme.typography.fontSize.sm};
  margin: 0;
  
  ${({ $variant = 'info' }) => {
    const colors = {
      warning: '#a16207',
      error: '#991b1b',
      info: '#1e40af'
    }
    return css`
      color: ${colors[$variant]};
    `
  }}
`
