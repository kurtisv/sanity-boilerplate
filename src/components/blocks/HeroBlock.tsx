'use client'

import styled from 'styled-components'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { Button } from '@/components/ui'

type HeroBlockProps = {
  title: string
  subtitle?: string
  ctaButtons?: Array<{
    text: string
    href: string
    variant: 'primary' | 'secondary' | 'ghost'
    size: 'sm' | 'md' | 'lg'
  }>
  layout?: 'centered' | 'left-image' | 'right-image' | 'fullwidth'
  backgroundSettings?: {
    backgroundType: 'solid' | 'gradient' | 'image'
    backgroundColor?: string
    gradientColors?: {
      from: string
      to: string
      direction: string
    }
    backgroundImage?: {
      asset: {
        _id: string
        url: string
      }
    }
    backgroundOverlay?: {
      enabled: boolean
      color: string
    }
  }
  styling?: {
    textColor?: string
    textAlignment?: 'left' | 'center' | 'right'
    verticalAlignment?: 'top' | 'center' | 'bottom'
    height?: 'small' | 'medium' | 'large' | 'fullscreen'
    spacing?: 'compact' | 'normal' | 'large'
  }
}

const HeroContainer = styled.section<{
  $background: string
  $isImage: boolean
  $isGradient: boolean
  $height: string
  $textColor: string
}>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$textColor};
  
  ${props => {
    if (props.$isImage) {
      return `
        background-image: ${props.$background};
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      `
    } else if (props.$isGradient) {
      return `background: ${props.$background};`
    } else {
      return `background-color: ${props.$background};`
    }
  }}
  
  min-height: ${props => {
    switch (props.$height) {
      case 'small': return '400px'
      case 'medium': return '600px'
      case 'large': return '800px'
      case 'fullscreen': return '100vh'
      default: return '800px'
    }
  }};
  
  @media (max-width: 768px) {
    min-height: ${props => {
      switch (props.$height) {
        case 'small': return '300px'
        case 'medium': return '400px'
        case 'large': return '500px'
        case 'fullscreen': return '100vh'
        default: return '500px'
      }
    }};
  }
`

const Overlay = styled.div<{ $color: string; $enabled: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.$enabled ? props.$color : 'transparent'};
  z-index: 1;
`

const ContentWrapper = styled.div<{
  $textAlignment: string
  $verticalAlignment: string
  $spacing: string
}>`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  text-align: ${props => props.$textAlignment};
  
  display: flex;
  flex-direction: column;
  justify-content: ${props => {
    switch (props.$verticalAlignment) {
      case 'top': return 'flex-start'
      case 'bottom': return 'flex-end'
      case 'center':
      default: return 'center'
    }
  }};
  
  padding: ${props => {
    switch (props.$spacing) {
      case 'compact': return '1rem'
      case 'large': return '3rem'
      case 'normal':
      default: return '2rem'
    }
  }};
  
  @media (max-width: 768px) {
    padding: ${props => {
      switch (props.$spacing) {
        case 'compact': return '0.5rem'
        case 'large': return '2rem'
        case 'normal':
        default: return '1rem'
      }
    }};
    text-align: center;
  }
`

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 8vw, 3rem);
    margin-bottom: 1rem;
  }
`

const Subtitle = styled.p`
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  line-height: 1.6;
  margin: 0 0 2.5rem 0;
  opacity: 0.9;
  max-width: 600px;
  
  ${props => props.style?.textAlign === 'center' && `
    margin-left: auto;
    margin-right: auto;
  `}
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
`

export default function HeroBlock({
  title,
  subtitle,
  ctaButtons = [],
  layout = 'centered',
  backgroundSettings = { backgroundType: 'solid', backgroundColor: '#1f2937' },
  styling = {
    textColor: '#ffffff',
    textAlignment: 'center',
    verticalAlignment: 'center',
    height: 'large',
    spacing: 'normal'
  }
}: HeroBlockProps) {
  // Génération du style de fond
  const getBackgroundStyle = () => {
    const { backgroundType, backgroundColor, gradientColors, backgroundImage } = backgroundSettings
    
    switch (backgroundType) {
      case 'gradient':
        if (gradientColors) {
          return `linear-gradient(${gradientColors.direction}, ${gradientColors.from}, ${gradientColors.to})`
        }
        return backgroundColor || '#1f2937'
      
      case 'image':
        if (backgroundImage) {
          const imageUrl = urlFor(backgroundImage).width(1920).height(1080).url()
          return `url(${imageUrl})`
        }
        return backgroundColor || '#1f2937'
      
      case 'solid':
      default:
        return backgroundColor || '#1f2937'
    }
  }

  const backgroundStyle = getBackgroundStyle()
  const isImage = backgroundSettings.backgroundType === 'image'
  const isGradient = backgroundSettings.backgroundType === 'gradient'

  return (
    <HeroContainer
      $background={backgroundStyle}
      $isImage={isImage}
      $isGradient={isGradient}
      $height={styling.height || 'large'}
      $textColor={styling.textColor || '#ffffff'}
    >
      {isImage && backgroundSettings.backgroundOverlay?.enabled && (
        <Overlay 
          $color={backgroundSettings.backgroundOverlay.color} 
          $enabled={true} 
        />
      )}
      
      <ContentWrapper
        $textAlignment={styling.textAlignment || 'center'}
        $verticalAlignment={styling.verticalAlignment || 'center'}
        $spacing={styling.spacing || 'normal'}
      >
        <Title>{title}</Title>
        
        {subtitle && (
          <Subtitle style={{ textAlign: styling.textAlignment || 'center' }}>
            {subtitle}
          </Subtitle>
        )}
        
        {ctaButtons && ctaButtons.length > 0 && (
          <ButtonGroup>
            {ctaButtons.map((button, index) => (
              <Link key={index} href={button.href} passHref>
                <Button
                  variant={button.variant}
                  size={button.size}
                >
                  {button.text}
                </Button>
              </Link>
            ))}
          </ButtonGroup>
        )}
      </ContentWrapper>
    </HeroContainer>
  )
}
