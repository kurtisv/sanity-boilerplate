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

// Styled Components - Design Professionnel et Moderne
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
      case 'small': return '500px'
      case 'medium': return '700px'
      case 'large': return '900px'
      case 'full-screen': return '100vh'
      default: return '700px'
    }
  }};
  background: ${({ $backgroundType, $backgroundColor, $hasBackgroundImage }) => {
    if ($hasBackgroundImage) return 'transparent';
    if ($backgroundType === 'color' && $backgroundColor) return $backgroundColor;
    if ($backgroundType === 'transparent') return 'transparent';
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }};
  overflow: hidden;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
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
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #ffffff;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.8s ease-out;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const HeroSubtitle = styled.p`
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.95);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
  animation: fadeInUp 0.8s ease-out 0.2s both;
`

const CTAContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease-out 0.4s both;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    max-width: 400px;
    margin: 0 auto;
  }
`

const CTAButton = styled.a<{ 
  $variant?: string
  $size?: string
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small': return '0.75rem 1.5rem'
      case 'large': return '1.25rem 2.5rem'
      default: return '1rem 2rem'
    }
  }};
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'small': return '0.9375rem'
      case 'large': return '1.25rem'
      default: return '1.0625rem'
    }
  }};
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.01em;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
          color: #667eea;
          border: none;
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);
          
          &:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4), 0 3px 10px rgba(0, 0, 0, 0.15);
          }
          
          &:active {
            transform: translateY(-1px) scale(1);
          }
        `
      case 'secondary':
        return `
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          
          &:hover {
            background: rgba(255, 255, 255, 0.25);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }
          
          &:active {
            transform: translateY(-1px) scale(1);
          }
        `
      case 'outline':
        return `
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(5px);
          
          &:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: white;
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
          }
          
          &:active {
            transform: translateY(-1px) scale(1);
          }
        `
      default:
        return `
          background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
          color: #667eea;
          border: none;
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);
          
          &:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4), 0 3px 10px rgba(0, 0, 0, 0.15);
          }
          
          &:active {
            transform: translateY(-1px) scale(1);
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
