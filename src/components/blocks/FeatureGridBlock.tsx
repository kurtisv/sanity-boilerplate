'use client'

import styled from 'styled-components'
import Link from 'next/link'

// Icônes emoji simples pour éviter les problèmes d'import
const iconMap: Record<string, string> = {
  star: '⭐',
  heart: '❤️',
  zap: '⚡',
  shield: '🛡️',
  rocket: '🚀',
  globe: '🌍',
  users: '👥',
  settings: '⚙️',
  lock: '🔒',
  smartphone: '📱',
  wifi: '📶',
  camera: '📷',
  mail: '📧',
  phone: '📞',
  'map-pin': '📍',
  clock: '🕐',
  'check-circle': '✅',
  'alert-circle': '⚠️',
  info: 'ℹ️',
  lightbulb: '💡',
  target: '🎯',
  trending: '📈',
  award: '🏆',
  gift: '🎁',
  fire: '🔥',
  diamond: '💎',
  crown: '👑',
  magic: '✨',
}

type Feature = {
  icon: string
  iconColor: string
  title: string
  description: string
  link?: {
    url: string
    text: string
  }
  featured: boolean
}

type FeatureGridBlockProps = {
  title?: string
  subtitle?: string
  gridLayout: string
  features: Feature[]
  cardStyle: 'minimal' | 'bordered' | 'shadow' | 'colored' | 'glass'
  iconStyle: 'simple' | 'circle' | 'square' | 'gradient'
  textAlignment: 'left' | 'center' | 'right'
  spacing: 'compact' | 'normal' | 'large'
  backgroundColor: string
  textColor: string
}

const Section = styled.section<{ 
  $backgroundColor: string
  $textColor: string
  $spacing: string
}>`
  background-color: ${props => props.$backgroundColor};
  color: ${props => props.$textColor};
  padding: ${props => {
    switch (props.$spacing) {
      case 'compact': return '3rem 1.5rem'
      case 'large': return '6rem 1.5rem'
      default: return '4rem 1.5rem'
    }
  }};
  
  @media (max-width: 768px) {
    padding: ${props => {
      switch (props.$spacing) {
        case 'compact': return '2rem 1rem'
        case 'large': return '4rem 1rem'
        default: return '3rem 1rem'
      }
    }};
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div<{ $textAlignment: string }>`
  text-align: ${props => props.$textAlignment};
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 2rem;
  }
`

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  line-height: 1.2;
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  opacity: 0.8;
  margin: 0;
  max-width: 600px;
  
  ${props => props.style?.textAlign === 'center' && `
    margin-left: auto;
    margin-right: auto;
  `}
`

const Grid = styled.div<{ 
  $layout: string
  $spacing: string
}>`
  display: grid;
  gap: ${props => {
    switch (props.$spacing) {
      case 'compact': return '1.5rem'
      case 'large': return '3rem'
      default: return '2rem'
    }
  }};
  
  ${props => {
    switch (props.$layout) {
      case '2-simple':
        return `
          grid-template-columns: repeat(2, 1fr);
          @media (max-width: 768px) { grid-template-columns: 1fr; }
        `
      case '3-balanced':
        return `
          grid-template-columns: repeat(3, 1fr);
          @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
          @media (max-width: 768px) { grid-template-columns: 1fr; }
        `
      case '4-compact':
        return `
          grid-template-columns: repeat(4, 1fr);
          @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
          @media (max-width: 768px) { grid-template-columns: 1fr; }
        `
      case '2x2-square':
        return `
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          @media (max-width: 768px) { 
            grid-template-columns: 1fr; 
            grid-template-rows: auto;
          }
        `
      case '1-2-asymmetric':
        return `
          grid-template-columns: 2fr 1fr 1fr;
          @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
          @media (max-width: 768px) { grid-template-columns: 1fr; }
        `
      case '2-1-asymmetric':
        return `
          grid-template-columns: 1fr 1fr 2fr;
          @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
          @media (max-width: 768px) { grid-template-columns: 1fr; }
        `
      case 'masonry':
        return `
          columns: 3;
          column-gap: 2rem;
          @media (max-width: 1024px) { columns: 2; }
          @media (max-width: 768px) { columns: 1; }
        `
      case 'vertical-list':
        return `
          grid-template-columns: 1fr;
          max-width: 600px;
          margin: 0 auto;
        `
      default:
        return `
          grid-template-columns: repeat(3, 1fr);
          @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
          @media (max-width: 768px) { grid-template-columns: 1fr; }
        `
    }
  }}
`

const FeatureCard = styled.div<{ 
  $cardStyle: string
  $featured: boolean
  $layout: string
}>`
  ${props => props.$layout === 'masonry' && `
    break-inside: avoid;
    margin-bottom: 1rem;
  `}
  
  ${props => {
    const baseStyles = `
      padding: 2rem;
      border-radius: 1rem;
      transition: all 0.3s ease;
      position: relative;
      
      &:hover {
        transform: translateY(-4px);
      }
    `
    
    switch (props.$cardStyle) {
      case 'minimal':
        return `
          ${baseStyles}
          background: transparent;
          &:hover { background: rgba(0, 0, 0, 0.02); }
        `
      case 'bordered':
        return `
          ${baseStyles}
          border: 2px solid rgba(0, 0, 0, 0.1);
          background: transparent;
          &:hover { 
            border-color: #3b82f6;
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
          }
        `
      case 'shadow':
        return `
          ${baseStyles}
          background: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          &:hover { 
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
        `
      case 'colored':
        return `
          ${baseStyles}
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          &:hover { 
            background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
          }
        `
      case 'glass':
        return `
          ${baseStyles}
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          &:hover { 
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.3);
          }
        `
      default:
        return baseStyles
    }
  }}
  
  ${props => props.$featured && `
    border: 2px solid #3b82f6;
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    
    &::before {
      content: '⭐';
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 1.2rem;
    }
  `}
`

const IconWrapper = styled.div<{ 
  $iconStyle: string
  $iconColor: string
}>`
  margin-bottom: 1.5rem;
  
  ${props => {
    switch (props.$iconStyle) {
      case 'simple':
        return `
          color: ${props.$iconColor};
        `
      case 'circle':
        return `
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background: ${props.$iconColor}20;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${props.$iconColor};
        `
      case 'square':
        return `
          width: 4rem;
          height: 4rem;
          border-radius: 0.75rem;
          background: ${props.$iconColor}20;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${props.$iconColor};
        `
      case 'gradient':
        return `
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background: linear-gradient(135deg, ${props.$iconColor} 0%, ${props.$iconColor}80 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        `
      default:
        return `color: ${props.$iconColor};`
    }
  }}
`

const FeatureTitle = styled.h3<{ $textAlignment: string }>`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  text-align: ${props => props.$textAlignment};
`

const FeatureDescription = styled.p<{ $textAlignment: string }>`
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  opacity: 0.8;
  text-align: ${props => props.$textAlignment};
`

const FeatureLink = styled(Link)`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  
  &:hover {
    text-decoration: underline;
  }
`

export default function FeatureGridBlock({
  title,
  subtitle,
  gridLayout = '3-balanced',
  features = [],
  cardStyle = 'shadow',
  iconStyle = 'circle',
  textAlignment = 'center',
  spacing = 'normal',
  backgroundColor = '#ffffff',
  textColor = '#1f2937',
}: FeatureGridBlockProps) {
  return (
    <Section 
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $spacing={spacing}
    >
      <Container>
        {(title || subtitle) && (
          <Header $textAlignment={textAlignment}>
            {title && <Title>{title}</Title>}
            {subtitle && (
              <Subtitle style={{ textAlign: textAlignment }}>
                {subtitle}
              </Subtitle>
            )}
          </Header>
        )}
        
        <Grid $layout={gridLayout} $spacing={spacing}>
          {features.map((feature, index) => {
            const iconEmoji = iconMap[feature.icon] || iconMap.star
            
            return (
              <FeatureCard
                key={index}
                $cardStyle={cardStyle}
                $featured={feature.featured}
                $layout={gridLayout}
              >
                <IconWrapper 
                  $iconStyle={iconStyle}
                  $iconColor={feature.iconColor}
                >
                  <span style={{ fontSize: iconStyle === 'simple' ? '2rem' : '1.5rem' }}>
                    {iconEmoji}
                  </span>
                </IconWrapper>
                
                <FeatureTitle $textAlignment={textAlignment}>
                  {feature.title}
                </FeatureTitle>
                
                <FeatureDescription $textAlignment={textAlignment}>
                  {feature.description}
                </FeatureDescription>
                
                {feature.link?.url && (
                  <FeatureLink href={feature.link.url}>
                    {feature.link.text} →
                  </FeatureLink>
                )}
              </FeatureCard>
            )
          })}
        </Grid>
      </Container>
    </Section>
  )
}
