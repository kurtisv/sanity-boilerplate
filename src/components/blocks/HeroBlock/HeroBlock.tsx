'use client'

import React from 'react'
import { useNormalizedCTAButtons } from '@/hooks/useNormalizedProps'
import type { BaseBlockProps, CTAButton } from '@/types/common'
import * as S from './HeroBlock.styles'

interface HeroSettings {
  height?: 'small' | 'medium' | 'large' | 'fullscreen'
  verticalAlignment?: 'top' | 'center' | 'bottom'
}

interface BackgroundSettings {
  backgroundType?: 'solid' | 'gradient' | 'image'
  backgroundColor?: string
  backgroundImage?: {
    asset?: { url: string }
    alt?: string
    overlay?: {
      enabled: boolean
      color: string
      opacity: number
    }
  }
}

interface StylingSettings {
  textColor?: string
  headingColor?: string
  accentColor?: string
  alignment?: 'left' | 'center' | 'right'
}

interface TypographySettings {
  headingSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  textSize?: 'sm' | 'md' | 'lg'
}

interface HeroBlockProps extends BaseBlockProps {
  ctaButtons?: CTAButton[]
  layout?: 'centered' | 'left-image' | 'right-image' | 'fullwidth'
  heroSettings?: HeroSettings
  backgroundSettings?: BackgroundSettings
  styling?: StylingSettings
  typography?: TypographySettings
}

export default function HeroBlock({
  title,
  subtitle,
  ctaButtons,
  layout = 'centered',
  heroSettings,
  backgroundSettings,
  styling,
  typography,
}: HeroBlockProps) {
  // Normaliser les props avec le hook dédié
  const normalizedCtaButtons = useNormalizedCTAButtons(ctaButtons)
  
  // Déterminer les props pour les styled-components
  const backgroundImage = backgroundSettings?.backgroundImage?.asset?.url
  const hasOverlay = backgroundSettings?.backgroundImage?.overlay?.enabled

  return (
    <S.HeroSection
      $height={heroSettings?.height}
      $verticalAlign={heroSettings?.verticalAlignment}
      $backgroundImage={backgroundImage}
      $backgroundColor={backgroundSettings?.backgroundColor}
    >
      {/* Superposition pour image de fond */}
      {hasOverlay && (
        <S.BackgroundOverlay
          $color={backgroundSettings?.backgroundImage?.overlay?.color}
          $opacity={backgroundSettings?.backgroundImage?.overlay?.opacity}
        />
      )}
      
      {/* Contenu principal */}
      <S.HeroContainer>
        <S.HeroContent
          $layout={layout}
          $alignment={styling?.alignment}
        >
          {/* Contenu textuel */}
          <S.TextContent $order={layout === 'right-image' ? 1 : 0}>
            {/* Titre principal */}
            <S.HeroTitle
              $color={styling?.headingColor || styling?.textColor}
              $size={typography?.headingSize}
            >
              {title}
            </S.HeroTitle>

            {/* Sous-titre */}
            {subtitle && (
              <S.HeroSubtitle
                $color={styling?.textColor}
                $size={typography?.textSize}
                $centered={styling?.alignment === 'center'}
              >
                {subtitle}
              </S.HeroSubtitle>
            )}

            {/* Boutons CTA */}
            {normalizedCtaButtons.length > 0 && (
              <S.CTAContainer $alignment={styling?.alignment}>
                {normalizedCtaButtons.map((button, index) => (
                  <S.CTAButton
                    key={index}
                    href={button.href}
                    $variant={button.variant}
                    $size={button.size}
                    $customColor={button.variant === 'primary' ? styling?.accentColor : undefined}
                  >
                    {button.text}
                  </S.CTAButton>
                ))}
              </S.CTAContainer>
            )}
          </S.TextContent>

          {/* Image (pour layouts avec image) */}
          {(layout === 'left-image' || layout === 'right-image') && (
            <S.ImageContainer>
              {backgroundSettings?.backgroundImage?.asset?.url ? (
                <img
                  src={backgroundSettings.backgroundImage.asset.url}
                  alt={backgroundSettings.backgroundImage.alt || title}
                />
              ) : (
                <S.ImagePlaceholder>
                  Image placeholder
                </S.ImagePlaceholder>
              )}
            </S.ImageContainer>
          )}
        </S.HeroContent>
      </S.HeroContainer>
    </S.HeroSection>
  )
}
