'use client'

import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

// ✅ CONFORME AU SCHÉMA - Interface strictement alignée sur heroBlock.ts
interface HeroBlockProps {
  // Champs de base du schéma
  title?: string                   // ✅ validation: Rule.required().max(100)
  subtitle?: string                // ✅ validation: Rule.max(300)
  
  // ✅ CONFORME : ctaButtons array selon le schéma
  ctaButtons?: Array<{
    _key?: string                  // ✅ Clé générée automatiquement par Sanity
    text: string                   // ✅ validation: Rule.required()
    href: string                   // ✅ validation: Rule.required()
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'small' | 'medium' | 'large'
    icon?: string
  }>
  
  // ✅ CONFORME : layout selon le schéma
  layout?: 'centered' | 'left-aligned' | 'right-aligned' | 'split'
  
  // ✅ CONFORME : heroSettings objet selon le schéma
  heroSettings?: {
    height?: 'small' | 'medium' | 'large' | 'full-screen'
    verticalAlignment?: 'top' | 'center' | 'bottom'
    textAlignment?: 'left' | 'center' | 'right'
    overlay?: boolean
    overlayOpacity?: number
  }
  
  // ✅ CONFORME : backgroundImage selon le schéma
  backgroundImage?: {
    asset?: {
      _ref: string
      url?: string
    }
    hotspot?: any
    crop?: any
  }
  
  // ✅ CONFORME : backgroundSettings selon themeFields
  backgroundSettings?: {
    backgroundType?: 'solid' | 'color' | 'gradient' | 'image' | 'transparent'
    backgroundColor?: string
  }
  
  // ✅ CONFORME : styling selon themeFields
  styling?: {
    containerPadding?: string
    containerMaxWidth?: string
  }
}

// Styled Components
const HeroContainer = styled.div<{ 
  $height?: string
  $backgroundType?: string
  $backgroundColor?: string
  $hasBackgroundImage?: boolean
}>`
  position: relative;
  display: flex;
  align-items: ${({ $height }) => {
    switch ($height) {
      case 'small': return 'center'
      case 'medium': return 'center'
      case 'large': return 'center'
      case 'full-screen': return 'center'
      default: return 'center'
    }
  }};
  min-height: ${({ $height }) => {
    switch ($height) {
      case 'small': return '400px'
      case 'medium': return '600px'
      case 'large': return '800px'
      case 'full-screen': return '100vh'
      default: return '600px'
    }
  }};
  background: ${({ $backgroundType, $backgroundColor, $hasBackgroundImage }) => {
    if ($hasBackgroundImage) return 'transparent';
    if ($backgroundType === 'color' && $backgroundColor) return $backgroundColor;
    if ($backgroundType === 'transparent') return 'transparent';
    return '#ffffff';
  }};
  overflow: hidden;
`

const BackgroundImage = styled.div<{ $imageUrl: string; $overlay?: boolean; $overlayOpacity?: number }>`
  position: absolute;
  inset: 0;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${({ $imageUrl }) => $imageUrl});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $overlay, $overlayOpacity }) => 
      $overlay ? `rgba(0, 0, 0, ${$overlayOpacity || 0.5})` : 'transparent'
    };
    z-index: 2;
  }
`

const HeroContent = styled.div<{ 
  $textAlignment?: string
  $layout?: string
}>`
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: ${({ $textAlignment }) => $textAlignment || 'center'};
  
  ${({ $layout }) => $layout === 'split' && `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  `}
`

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1f2937;
`

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #6b7280;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const CTAContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const CTAButton = styled.a<{ 
  $variant?: string
  $size?: string
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small': return '0.5rem 1rem'
      case 'large': return '1rem 2rem'
      default: return '0.75rem 1.5rem'
    }
  }};
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'small': return '0.875rem'
      case 'large': return '1.125rem'
      default: return '1rem'
    }
  }};
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: #3b82f6;
          color: white;
          border: 2px solid #3b82f6;
          
          &:hover {
            background: #2563eb;
            border-color: #2563eb;
            transform: translateY(-2px);
          }
        `
      case 'secondary':
        return `
          background: #6b7280;
          color: white;
          border: 2px solid #6b7280;
          
          &:hover {
            background: #4b5563;
            border-color: #4b5563;
            transform: translateY(-2px);
          }
        `
      case 'outline':
        return `
          background: transparent;
          color: #3b82f6;
          border: 2px solid #3b82f6;
          
          &:hover {
            background: #3b82f6;
            color: white;
            transform: translateY(-2px);
          }
        `
      default:
        return `
          background: #3b82f6;
          color: white;
          border: 2px solid #3b82f6;
          
          &:hover {
            background: #2563eb;
            border-color: #2563eb;
            transform: translateY(-2px);
          }
        `
    }
  }}
`

export default function HeroBlock({
  title,
  subtitle,
  ctaButtons = [],
  layout = 'centered',
  heroSettings,
  backgroundImage,
  backgroundSettings,
  styling
}: HeroBlockProps) {
  const backgroundImageUrl = backgroundImage?.asset?._ref 
    ? urlFor(backgroundImage).width(1920).height(1080).url()
    : null

  return (
    <HeroContainer
      $height={heroSettings?.height}
      $backgroundType={backgroundSettings?.backgroundType}
      $backgroundColor={backgroundSettings?.backgroundColor}
      $hasBackgroundImage={!!backgroundImageUrl}
      style={{ 
        maxWidth: styling?.containerMaxWidth || 'none',
        padding: styling?.containerPadding || undefined
      }}
    >
      {backgroundImageUrl && (
        <BackgroundImage
          $imageUrl={backgroundImageUrl}
          $overlay={heroSettings?.overlay}
          $overlayOpacity={heroSettings?.overlayOpacity}
        />
      )}
      
      <HeroContent
        $textAlignment={heroSettings?.textAlignment}
        $layout={layout}
      >
        <div>
          {title && <HeroTitle>{title}</HeroTitle>}
          {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
          
          {ctaButtons.length > 0 && (
            <CTAContainer>
              {ctaButtons.map((button, index) => (
                <CTAButton
                  key={button._key || `cta-${index}`}
                  href={button.href}
                  $variant={button.variant}
                  $size={button.size}
                >
                  {button.icon && <span>{button.icon}</span>}
                  {button.text}
                </CTAButton>
              ))}
            </CTAContainer>
          )}
        </div>
        
        {layout === 'split' && (
          <div>
            {/* Espace pour contenu additionnel en mode split */}
          </div>
        )}
      </HeroContent>
    </HeroContainer>
  )
}
