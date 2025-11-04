/**
 * BlockRenderer - Composant principal pour rendre tous les blocs Sanity
 */

'use client'

import React from 'react'
import * as S from './BlockRenderer.styles'

// Imports de tous les composants de blocs
import TextBlock from '@/components/blocks/TextBlock'
import HeroBlock from '@/components/blocks/HeroBlock'
import HeaderBlock from '@/components/blocks/HeaderBlock'
import FooterBlock from '@/components/blocks/FooterBlock'
import FeatureGridBlock from '@/components/blocks/FeatureGridBlock'
import ContactBlock from '@/components/blocks/ContactBlock'
import GalleryBlock from '@/components/blocks/GalleryBlock'
import TeamBlock from '@/components/blocks/TeamBlock'
import StatsBlock from '@/components/blocks/StatsBlock'

// Type pour les données de blocs Sanity
type BlockData = {
  _type: string
  _key: string
  [key: string]: any
}

interface BlockRendererProps {
  blocks?: BlockData[]
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <S.BlocksContainer>
      {blocks.map((block, index) => {
        // Générer une clé unique pour éviter les doublons
        const uniqueKey = block._key ? `${block._key}-${index}` : `${block._type}-${index}`
        switch (block._type) {
          case 'textBlock':
            return <TextBlock key={uniqueKey} {...(block as any)} />
          
          case 'heroBlock':
            return <HeroBlock key={uniqueKey} {...(block as any)} />
          
          case 'featureGridBlock':
            return <FeatureGridBlock key={uniqueKey} {...(block as any)} />
          
          case 'contactBlock':
            return <ContactBlock key={uniqueKey} {...(block as any)} />
          
          case 'galleryBlock':
            return <GalleryBlock key={uniqueKey} {...(block as any)} />
          
          case 'teamBlock':
            return <TeamBlock key={uniqueKey} {...(block as any)} />
          
          case 'statsBlock':
            return <StatsBlock key={uniqueKey} {...(block as any)} />
          
          case 'headerBlock':
            return <HeaderBlock key={uniqueKey} {...(block as any)} />
          
          case 'footerBlock':
            return <FooterBlock key={uniqueKey} {...(block as any)} />
          
          default:
            if (process.env.NODE_ENV === 'development') {
              console.warn(`Bloc non reconnu: ${block._type}`)
            }
            return (
              <S.PlaceholderBlock key={uniqueKey} $variant="error">
                <S.PlaceholderTitle $variant="error">
                  ❌ Bloc non reconnu: {block._type}
                </S.PlaceholderTitle>
              </S.PlaceholderBlock>
            )
        }
      })}
    </S.BlocksContainer>
  )
}
