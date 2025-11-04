'use client'

import React from 'react'
import type { PageStyleSettings } from '@/lib/theme-utils'
import * as S from './PageWrapper.styles'

interface PageWrapperProps {
  children: React.ReactNode
  pageStyles?: PageStyleSettings
  className?: string
}

export default function PageWrapper({ 
  children, 
  pageStyles, 
  className = '' 
}: PageWrapperProps) {
  // Extraire les informations de style
  const backgroundImage = pageStyles?.pageBackgroundSettings?.backgroundImage?.asset?.url
  const backgroundColor = pageStyles?.pageBackgroundSettings?.backgroundColor
  const hasOverlay = pageStyles?.pageBackgroundSettings?.backgroundImage?.overlay?.enabled
  const overlayColor = pageStyles?.pageBackgroundSettings?.backgroundImage?.overlay?.color
  const overlayOpacity = pageStyles?.pageBackgroundSettings?.backgroundImage?.overlay?.opacity
  const blocksGap = pageStyles?.pageLayout?.gap as 'sm' | 'md' | 'lg' | 'xl' | undefined

  return (
    <S.PageContainer
      className={`page-styled ${className}`}
      $backgroundImage={backgroundImage}
      $backgroundColor={backgroundColor}
    >
      {/* Superposition pour image de fond */}
      {hasOverlay && (
        <S.BackgroundOverlay
          $color={overlayColor}
          $opacity={overlayOpacity}
        />
      )}
      
      {/* Contenu principal */}
      <S.ContentWrapper>
        {/* Container pour les blocs avec espacement */}
        <S.BlocksContainer $gap={blocksGap}>
          {children}
        </S.BlocksContainer>
      </S.ContentWrapper>
    </S.PageContainer>
  )
}

