'use client'

import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface Logo {
  _key?: string
  name: string
  logo: {
    asset?: {
      _ref: string
      url?: string
    }
  }
  url?: string
  category?: string
  featured?: boolean
  displayOrder?: number
}

interface LogoCloudBlockProps {
  title?: string
  subtitle?: string
  layout?: 'grid' | 'marquee' | 'centered-row' | 'scattered'
  logos: Logo[]
  logoStyle?: 'default' | 'grayscale' | 'colored' | 'outlined'
  logoSize?: 'small' | 'medium' | 'large'
  hoverEffect?: 'none' | 'scale' | 'lift' | 'glow'
  showCategories?: boolean
  autoplay?: boolean
  spacing?: 'compact' | 'normal' | 'comfortable'
  backgroundSettings?: {
    backgroundColor?: string
  }
  styling?: {
    textColor?: string
    headingColor?: string
  }
}

const LogoSection = styled.section<{ $backgroundColor?: string }>`
  position: relative;
  width: 100%;
  padding: 5rem 0;
  background: ${props => props.$backgroundColor || '#ffffff'};
`

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const Title = styled.h2<{ $color?: string }>`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: ${props => props.$color || '#6b7280'};
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
`

const Subtitle = styled.p<{ $color?: string }>`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  color: ${props => props.$color || '#1f2937'};
  letter-spacing: -0.02em;
`

const LogoGrid = styled.div<{ $spacing?: string; $logoSize?: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => {
    switch (props.$logoSize) {
      case 'small': return '120px'
      case 'large': return '200px'
      default: return '150px'
    }
  }}, 1fr));
  gap: ${props => {
    switch (props.$spacing) {
      case 'compact': return '2rem'
      case 'comfortable': return '4rem'
      default: return '3rem'
    }
  }};
  align-items: center;
  justify-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 2rem;
  }
`

const LogoWrapper = styled.a<{ 
  $logoStyle?: string
  $hoverEffect?: string
  $logoSize?: string
}>`
  position: relative;
  width: 100%;
  height: ${props => {
    switch (props.$logoSize) {
      case 'small': return '60px'
      case 'large': return '100px'
      default: return '80px'
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  cursor: ${props => props.href ? 'pointer' : 'default'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${props => {
    if (props.$logoStyle === 'grayscale') {
      return `
        filter: grayscale(100%) opacity(0.6);
        
        &:hover {
          filter: grayscale(0%) opacity(1);
        }
      `
    }
    
    if (props.$logoStyle === 'outlined') {
      return `
        border: 2px solid #e5e7eb;
        border-radius: 0.75rem;
        
        &:hover {
          border-color: #667eea;
        }
      `
    }
    
    return ''
  }}
  
  ${props => {
    switch (props.$hoverEffect) {
      case 'scale':
        return `
          &:hover {
            transform: scale(1.1);
          }
        `
      case 'lift':
        return `
          &:hover {
            transform: translateY(-8px);
          }
        `
      case 'glow':
        return `
          &:hover {
            filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.4));
          }
        `
      default:
        return ''
    }
  }}
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`

const MarqueeContainer = styled.div`
  overflow: hidden;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, #ffffff, transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, #ffffff, transparent);
  }
`

const MarqueeTrack = styled.div<{ $autoplay?: boolean }>`
  display: flex;
  gap: 4rem;
  animation: ${props => props.$autoplay ? 'scroll 30s linear infinite' : 'none'};
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  &:hover {
    animation-play-state: paused;
  }
`

const MarqueeItem = styled.div<{ $logoSize?: string }>`
  flex-shrink: 0;
  width: ${props => {
    switch (props.$logoSize) {
      case 'small': return '120px'
      case 'large': return '200px'
      default: return '150px'
    }
  }};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`

export default function LogoCloudBlock({
  title,
  subtitle,
  layout = 'grid',
  logos,
  logoStyle = 'grayscale',
  logoSize = 'medium',
  hoverEffect = 'scale',
  autoplay = true,
  spacing = 'normal',
  backgroundSettings,
  styling
}: LogoCloudBlockProps) {
  const renderLogos = () => {
    return logos.map((logo, index) => {
      const logoUrl = logo.logo?.asset?._ref 
        ? urlFor(logo.logo).width(300).height(200).url()
        : null
      
      if (!logoUrl) return null

      if (layout === 'marquee') {
        return (
          <MarqueeItem key={logo._key || `logo-${index}`} $logoSize={logoSize}>
            <Image
              src={logoUrl}
              alt={logo.name}
              width={200}
              height={100}
              style={{ objectFit: 'contain' }}
            />
          </MarqueeItem>
        )
      }

      return (
        <LogoWrapper
          key={logo._key || `logo-${index}`}
          href={logo.url || undefined}
          target={logo.url ? '_blank' : undefined}
          rel={logo.url ? 'noopener noreferrer' : undefined}
          $logoStyle={logoStyle}
          $hoverEffect={hoverEffect}
          $logoSize={logoSize}
        >
          <Image
            src={logoUrl}
            alt={logo.name}
            width={200}
            height={100}
            style={{ objectFit: 'contain' }}
          />
        </LogoWrapper>
      )
    })
  }

  return (
    <LogoSection $backgroundColor={backgroundSettings?.backgroundColor}>
      <Container>
        {(title || subtitle) && (
          <Header>
            {title && <Title $color={styling?.textColor}>{title}</Title>}
            {subtitle && <Subtitle $color={styling?.headingColor}>{subtitle}</Subtitle>}
          </Header>
        )}
        
        {layout === 'marquee' ? (
          <MarqueeContainer>
            <MarqueeTrack $autoplay={autoplay}>
              {renderLogos()}
              {/* Duplicate for seamless loop */}
              {renderLogos()}
            </MarqueeTrack>
          </MarqueeContainer>
        ) : (
          <LogoGrid $spacing={spacing} $logoSize={logoSize}>
            {renderLogos()}
          </LogoGrid>
        )}
      </Container>
    </LogoSection>
  )
}
