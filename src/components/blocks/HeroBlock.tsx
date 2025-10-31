'use client'

import styled from 'styled-components'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'

type HeroBlockProps = {
  title: string
  subtitle?: string
  cta?: {
    text: string
    link: string
    style: 'primary' | 'secondary' | 'ghost'
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
  textAlignment: 'left' | 'center' | 'right'
  verticalAlignment: 'top' | 'center' | 'bottom'
  height: 'small' | 'medium' | 'large' | 'fullscreen'
  textColor: string
  backgroundColor: string
}

const HeroContainer = styled.section<{
  $backgroundImage?: string
  $backgroundColor: string
  $height: string
  $textColor: string
}>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: ${props => 
    props.$height === 'fullscreen' ? 'center' : 
    props.$height === 'large' ? 'center' : 'center'
  };
  justify-content: center;
  background-color: ${props => props.$backgroundColor};
  color: ${props => props.$textColor};
  
  ${props => props.$backgroundImage && `
    background-image: url(${props.$backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `}
  
  ${props => {
    switch (props.$height) {
      case 'small': return 'min-height: 400px;'
      case 'medium': return 'min-height: 600px;'
      case 'large': return 'min-height: 800px;'
      case 'fullscreen': return 'min-height: 100vh;'
      default: return 'min-height: 800px;'
    }
  }}
  
  @media (max-width: 768px) {
    min-height: ${props => 
      props.$height === 'fullscreen' ? '100vh' : 
      props.$height === 'large' ? '600px' : 
      props.$height === 'medium' ? '500px' : '400px'
    };
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
}>`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  text-align: ${props => props.$textAlignment};
  
  ${props => {
    switch (props.$verticalAlignment) {
      case 'top': return 'justify-content: flex-start; align-self: flex-start;'
      case 'center': return 'justify-content: center; align-self: center;'
      case 'bottom': return 'justify-content: flex-end; align-self: flex-end;'
      default: return 'justify-content: center; align-self: center;'
    }
  }}
  
  @media (max-width: 768px) {
    padding: 1.5rem;
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

const CTAButton = styled(Link)<{ $style: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  
  ${props => {
    switch (props.$style) {
      case 'primary':
        return `
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
          
          &:hover {
            background: #2563eb;
            border-color: #2563eb;
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
          }
        `
      case 'secondary':
        return `
          background: transparent;
          color: currentColor;
          border-color: currentColor;
          
          &:hover {
            background: currentColor;
            color: #1f2937;
            transform: translateY(-2px);
          }
        `
      case 'ghost':
        return `
          background: rgba(255, 255, 255, 0.1);
          color: currentColor;
          border-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          
          &:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
          }
        `
      default:
        return `
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        `
    }
  }}
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
`

export default function HeroBlock({
  title,
  subtitle,
  cta,
  backgroundImage,
  backgroundOverlay = { enabled: true, color: 'rgba(0, 0, 0, 0.4)' },
  textAlignment = 'center',
  verticalAlignment = 'center',
  height = 'large',
  textColor = '#ffffff',
  backgroundColor = '#1f2937',
}: HeroBlockProps) {
  const backgroundImageUrl = backgroundImage 
    ? urlFor(backgroundImage).width(1920).height(1080).url()
    : undefined

  return (
    <HeroContainer
      $backgroundImage={backgroundImageUrl}
      $backgroundColor={backgroundColor}
      $height={height}
      $textColor={textColor}
    >
      <Overlay 
        $color={backgroundOverlay.color} 
        $enabled={backgroundOverlay.enabled} 
      />
      
      <ContentWrapper
        $textAlignment={textAlignment}
        $verticalAlignment={verticalAlignment}
      >
        <Title>{title}</Title>
        
        {subtitle && (
          <Subtitle style={{ textAlign: textAlignment }}>
            {subtitle}
          </Subtitle>
        )}
        
        {cta && (
          <CTAButton 
            href={cta.link} 
            $style={cta.style}
          >
            {cta.text}
          </CTAButton>
        )}
      </ContentWrapper>
    </HeroContainer>
  )
}
