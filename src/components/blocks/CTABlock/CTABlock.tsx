'use client'

import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface CTABlockProps {
  title?: string
  subtitle?: string
  layout?: 'centered' | 'left-right' | 'right-left' | 'background-overlay' | 'split-diagonal'
  image?: {
    asset?: {
      _ref: string
      url?: string
    }
  }
  buttons?: Array<{
    _key?: string
    text: string
    href: string
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'small' | 'medium' | 'large'
    icon?: string
    iconPosition?: 'left' | 'right'
    openInNewTab?: boolean
  }>
  features?: Array<{
    _key?: string
    text: string
    icon?: string
  }>
  urgency?: {
    enabled: boolean
    text?: string
    countdown?: boolean
  }
  textAlignment?: 'left' | 'center' | 'right'
  size?: 'compact' | 'normal' | 'large'
  backgroundSettings?: {
    backgroundType?: string
    backgroundColor?: string
  }
  styling?: {
    textColor?: string
    headingColor?: string
  }
}

const CTASection = styled.section<{ $backgroundColor?: string; $size?: string }>`
  position: relative;
  width: 100%;
  padding: ${props => {
    switch (props.$size) {
      case 'compact': return '3rem 0'
      case 'large': return '8rem 0'
      default: return '5rem 0'
    }
  }};
  background: ${props => props.$backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`

const Container = styled.div<{ $layout?: string }>`
  width: 100%;
  max-width: ${props => props.$layout === 'centered' ? '900px' : '1200px'};
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`

const ContentWrapper = styled.div<{ $layout?: string; $textAlignment?: string }>`
  display: ${props => ['left-right', 'right-left'].includes(props.$layout || '') ? 'grid' : 'block'};
  grid-template-columns: ${props => props.$layout === 'left-right' ? '1fr 1fr' : props.$layout === 'right-left' ? '1fr 1fr' : '1fr'};
  gap: 4rem;
  align-items: center;
  text-align: ${props => props.$textAlignment || 'center'};
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`

const TextContent = styled.div<{ $order?: number }>`
  order: ${props => props.$order || 0};
  
  @media (max-width: 968px) {
    order: 0;
  }
`

const Title = styled.h2<{ $color?: string }>`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: ${props => props.$color || '#ffffff'};
  margin-bottom: 1.5rem;
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

const Subtitle = styled.p<{ $color?: string }>`
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  line-height: 1.7;
  color: ${props => props.$color || 'rgba(255, 255, 255, 0.95)'};
  margin-bottom: 2.5rem;
  font-weight: 400;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
  animation: fadeInUp 0.8s ease-out 0.2s both;
`

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeInUp 0.8s ease-out 0.3s both;
`

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.0625rem;
  color: rgba(255, 255, 255, 0.95);
  
  &::before {
    content: '${props => props.about || '✓'}';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-weight: 700;
    font-size: 1.125rem;
    flex-shrink: 0;
  }
`

const ButtonGroup = styled.div<{ $textAlignment?: string }>`
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  justify-content: ${props => {
    switch (props.$textAlignment) {
      case 'left': return 'flex-start'
      case 'right': return 'flex-end'
      default: return 'center'
    }
  }};
  animation: fadeInUp 0.8s ease-out 0.4s both;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    align-items: stretch;
  }
`

const CTAButton = styled.a<{ $variant?: string; $size?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: ${props => {
    switch (props.$size) {
      case 'small': return '0.75rem 1.5rem'
      case 'large': return '1.25rem 2.5rem'
      default: return '1rem 2rem'
    }
  }};
  font-size: ${props => {
    switch (props.$size) {
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
  
  ${props => {
    switch (props.$variant) {
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
        `
      case 'secondary':
        return `
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          
          &:hover {
            background: rgba(255, 255, 255, 0.25);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-3px) scale(1.02);
          }
        `
      case 'outline':
        return `
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
          
          &:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: white;
            transform: translateY(-3px) scale(1.02);
          }
        `
      default:
        return `
          background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
          color: #667eea;
          border: none;
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
          
          &:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
          }
        `
    }
  }}
`

const ImageWrapper = styled.div<{ $order?: number }>`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  order: ${props => props.$order || 1};
  
  @media (max-width: 968px) {
    order: 1;
    height: 300px;
  }
`

const UrgencyBanner = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border-radius: 2rem;
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`

export default function CTABlock({
  title,
  subtitle,
  layout = 'centered',
  image,
  buttons = [],
  features = [],
  urgency,
  textAlignment = 'center',
  size = 'normal',
  backgroundSettings,
  styling
}: CTABlockProps) {
  const imageUrl = image?.asset?._ref 
    ? urlFor(image).width(800).height(600).url()
    : null

  const textOrder = layout === 'right-left' ? 1 : 0
  const imageOrder = layout === 'right-left' ? 0 : 1

  return (
    <CTASection $backgroundColor={backgroundSettings?.backgroundColor} $size={size}>
      <Container $layout={layout}>
        <ContentWrapper $layout={layout} $textAlignment={textAlignment}>
          <TextContent $order={textOrder}>
            {urgency?.enabled && urgency.text && (
              <UrgencyBanner>
                ⚡ {urgency.text}
              </UrgencyBanner>
            )}
            
            {title && <Title $color={styling?.headingColor}>{title}</Title>}
            {subtitle && <Subtitle $color={styling?.textColor}>{subtitle}</Subtitle>}
            
            {features.length > 0 && (
              <FeaturesList>
                {features.map((feature, index) => (
                  <Feature key={feature._key || `feature-${index}`} about={feature.icon}>
                    {feature.text}
                  </Feature>
                ))}
              </FeaturesList>
            )}
            
            {buttons.length > 0 && (
              <ButtonGroup $textAlignment={textAlignment}>
                {buttons.map((button, index) => (
                  <CTAButton
                    key={button._key || `button-${index}`}
                    href={button.href}
                    $variant={button.variant}
                    $size={button.size}
                    target={button.openInNewTab ? '_blank' : undefined}
                    rel={button.openInNewTab ? 'noopener noreferrer' : undefined}
                  >
                    {button.iconPosition === 'left' && button.icon && <span>{button.icon}</span>}
                    {button.text}
                    {button.iconPosition === 'right' && button.icon && <span>{button.icon}</span>}
                  </CTAButton>
                ))}
              </ButtonGroup>
            )}
          </TextContent>
          
          {imageUrl && ['left-right', 'right-left'].includes(layout) && (
            <ImageWrapper $order={imageOrder}>
              <Image
                src={imageUrl}
                alt={title || 'CTA Image'}
                fill
                style={{ objectFit: 'cover' }}
              />
            </ImageWrapper>
          )}
        </ContentWrapper>
      </Container>
    </CTASection>
  )
}
