'use client'

import React from 'react'
import styled from 'styled-components'

// ✅ CONFORME AU SCHÉMA - Interface strictement alignée sur featureGridBlock.ts
interface FeatureGridBlockProps {
  // Champs de base du schéma
  title?: string                   // ✅ Titre optionnel
  subtitle?: string                // ✅ Sous-titre optionnel
  
  // ✅ CONFORME : gridLayout selon le schéma
  gridLayout?: '2-simple' | '3-balanced' | '4-compact' | '2x2-square' | '1-2-asymmetric' | '2-1-asymmetric' | 'masonry' | 'vertical-list'
  
  // ✅ CONFORME : features array selon le schéma (min 1, max 12)
  features: Array<{
    _key?: string                  // ✅ Clé unique obligatoire
    iconType?: 'emoji' | 'lucide'  // ✅ selon le schéma
    iconEmoji?: string             // ✅ conditionnel si iconType = 'emoji'
    iconLucide?: string            // ✅ conditionnel si iconType = 'lucide'
    iconSize?: 'small' | 'medium' | 'large' | 'xl'  // ✅ selon le schéma
    iconColor?: string             // ✅ couleur HEX
    title: string                  // ✅ validation: Rule.required().max(60)
    description?: string           // ✅ validation: Rule.max(200)
    details?: string[]             // ✅ array de strings optionnel
    link?: {                       // ✅ objet optionnel
      url: string
      text: string
    }
    featured?: boolean             // ✅ mise en avant
  }>
  
  // ✅ CONFORME : cardStyle selon le schéma
  cardStyle?: 'minimal' | 'bordered' | 'shadow' | 'colored' | 'glass'
  
  // ✅ CONFORME : iconStyle selon le schéma
  iconStyle?: 'simple' | 'circle' | 'square' | 'gradient'
  
  // ✅ CONFORME : textAlignment selon le schéma
  textAlignment?: 'left' | 'center' | 'right'
  
  // ✅ CONFORME : spacing selon le schéma
  spacing?: 'compact' | 'normal' | 'large'
  
  // ✅ CONFORME : backgroundSettings selon themeFields (simplifié)
  backgroundSettings?: {
    backgroundType?: 'solid' | 'color' | 'gradient' | 'image' | 'transparent'
    backgroundColor?: string
  }
  
  // ✅ CONFORME : styling selon themeFields (simplifié)
  styling?: {
    textColor?: string
    headingColor?: string
    accentColor?: string
    alignment?: 'left' | 'center' | 'right'
    spacing?: 'compact' | 'normal' | 'comfortable' | 'large' | 'xl'
  }
}

// Styled Components avec design tokens du système
const FeatureSection = styled.section<{
  $backgroundColor?: string
}>`
  position: relative;
  width: 100%;
  padding: 6rem 0;
  background: ${props => props.$backgroundColor || 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)'};
  
  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`

const FeatureContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const FeatureHeader = styled.div<{
  $textAlignment?: string
}>`
  text-align: ${props => props.$textAlignment || 'center'};
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`

const FeatureTitle = styled.h2<{
  $color?: string
}>`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  color: ${props => props.$color || '#1f2937'};
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const FeatureSubtitle = styled.p<{
  $color?: string
}>`
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.7;
  color: ${props => props.$color || '#6b7280'};
  max-width: 700px;
  margin: 0 auto;
  font-weight: 400;
`

const FeatureGrid = styled.div<{
  $gridLayout?: string
  $spacing?: string
}>`
  display: grid;
  gap: ${props => {
    switch (props.$spacing) {
      case 'compact': return '1.5rem'
      case 'large': return '3rem'
      default: return '2rem'
    }
  }};
  
  /* Layouts selon le schéma */
  ${props => {
    switch (props.$gridLayout) {
      case '2-simple':
        return `
          grid-template-columns: repeat(2, 1fr);
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }
        `
      case '3-balanced':
        return `
          grid-template-columns: repeat(3, 1fr);
          @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
          }
        `
      case '4-compact':
        return `
          grid-template-columns: repeat(4, 1fr);
          @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
          }
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
          grid-template-columns: 2fr 1fr;
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }
        `
      case '2-1-asymmetric':
        return `
          grid-template-columns: 1fr 2fr;
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }
        `
      case 'vertical-list':
        return `
          grid-template-columns: 1fr;
          max-width: 800px;
          margin: 0 auto;
        `
      case 'masonry':
        return `
          columns: 3;
          column-gap: 2rem;
          @media (max-width: 1024px) {
            columns: 2;
          }
          @media (max-width: 640px) {
            columns: 1;
          }
        `
      default:
        return `
          grid-template-columns: repeat(3, 1fr);
          @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
          }
        `
    }
  }}
`

const FeatureCard = styled.div<{
  $cardStyle?: string
  $featured?: boolean
  $textAlignment?: string
  $isMasonry?: boolean
}>`
  position: relative;
  text-align: ${props => props.$textAlignment || 'center'};
  transition: all 0.3s ease;
  
  ${props => props.$isMasonry && `
    break-inside: avoid;
    margin-bottom: 2rem;
  `}
  
  /* Styles de cartes selon le schéma */
  ${props => {
    const baseStyles = `
      padding: 2rem;
      border-radius: 0.75rem;
    `
    
    switch (props.$cardStyle) {
      case 'minimal':
        return `
          ${baseStyles}
          background: transparent;
        `
      case 'bordered':
        return `
          ${baseStyles}
          background: #ffffff;
          border: 2px solid #e5e7eb;
          
          &:hover {
            border-color: #3b82f6;
          }
        `
      case 'shadow':
        return `
          ${baseStyles}
          background: #ffffff;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          
          &:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: translateY(-8px) scale(1.02);
          }
        `
      case 'colored':
        return `
          ${baseStyles}
          background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
          border: 2px solid #667eea30;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
          
          &:hover {
            background: linear-gradient(135deg, #667eea25 0%, #764ba225 100%);
            border-color: #667eea50;
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
          }
        `
      case 'glass':
        return `
          ${baseStyles}
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          
          &:hover {
            background: rgba(255, 255, 255, 0.85);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-5px);
            box-shadow: 0 15px 45px rgba(0, 0, 0, 0.15);
          }
        `
      default:
        return `
          ${baseStyles}
          background: #ffffff;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          
          &:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: translateY(-8px) scale(1.02);
          }
        `
    }
  }}
  
  /* Mise en avant */
  ${props => props.$featured && `
    border: 2px solid #3b82f6;
    transform: scale(1.02);
    
    &:hover {
      transform: scale(1.05);
    }
  `}
`

const IconContainer = styled.div<{
  $iconStyle?: string
  $iconSize?: string
  $iconColor?: string
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  /* Tailles d'icône selon le schéma */
  font-size: ${props => {
    switch (props.$iconSize) {
      case 'small': return '1.5rem'
      case 'medium': return '2rem'
      case 'large': return '2.5rem'
      case 'xl': return '3rem'
      default: return '2rem'
    }
  }};
  
  /* Styles d'icône selon le schéma */
  ${props => {
    const color = props.$iconColor || '#3b82f6'
    
    switch (props.$iconStyle) {
      case 'simple':
        return `
          color: ${color};
        `
      case 'circle':
        return `
          width: 4rem;
          height: 4rem;
          background: ${color}20;
          border-radius: 50%;
          color: ${color};
        `
      case 'square':
        return `
          width: 4rem;
          height: 4rem;
          background: ${color}20;
          border-radius: 0.5rem;
          color: ${color};
        `
      case 'gradient':
        return `
          width: 4rem;
          height: 4rem;
          background: linear-gradient(135deg, ${color} 0%, ${color}80 100%);
          border-radius: 50%;
          color: white;
        `
      default:
        return `
          width: 4rem;
          height: 4rem;
          background: ${color}20;
          border-radius: 50%;
          color: ${color};
        `
    }
  }}
`

const FeatureCardTitle = styled.h3<{
  $color?: string
}>`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${props => props.$color || '#1f2937'};
  margin-bottom: 0.75rem;
`

const FeatureCardDescription = styled.p<{
  $color?: string
}>`
  font-size: 1rem;
  line-height: 1.5;
  color: ${props => props.$color || '#6b7280'};
  margin-bottom: 1rem;
`

const FeatureDetails = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  
  li {
    padding: 0.25rem 0;
    color: #6b7280;
    font-size: 0.875rem;
    
    &:before {
      content: '✓';
      color: #10b981;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }
`

const FeatureLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
  
  &:after {
    content: '→';
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }
  
  &:hover:after {
    transform: translateX(2px);
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
  backgroundSettings,
  styling
}: FeatureGridBlockProps) {
  
  // ✅ NORMALISATION DES PROPS - Éviter les erreurs runtime
  const normalizedFeatures = features?.slice(0, 12) || []  // ✅ Max 12 selon validation
  
  const normalizedStyling = {
    textColor: styling?.textColor || '#374151',
    headingColor: styling?.headingColor || '#1f2937',
    accentColor: styling?.accentColor || '#3b82f6',
    alignment: styling?.alignment || textAlignment
  }

  // Rendu de l'icône selon le type
  const renderIcon = (feature: typeof features[0]) => {
    if (!feature.iconType) return null
    
    return (
      <IconContainer
        $iconStyle={iconStyle}
        $iconSize={feature.iconSize}
        $iconColor={feature.iconColor}
      >
        {feature.iconType === 'emoji' && feature.iconEmoji && (
          <span>{feature.iconEmoji}</span>
        )}
        {feature.iconType === 'lucide' && feature.iconLucide && (
          <span>{feature.iconLucide}</span> // Ici on pourrait intégrer Lucide React
        )}
      </IconContainer>
    )
  }

  // Si pas de features, ne rien afficher
  if (!normalizedFeatures.length) {
    return null
  }

  return (
    <FeatureSection
      $backgroundColor={backgroundSettings?.backgroundColor}
    >
      <FeatureContainer>
        {/* En-tête de section */}
        {(title || subtitle) && (
          <FeatureHeader $textAlignment={normalizedStyling.alignment}>
            {title && (
              <FeatureTitle $color={normalizedStyling.headingColor}>
                {title}
              </FeatureTitle>
            )}
            {subtitle && (
              <FeatureSubtitle $color={normalizedStyling.textColor}>
                {subtitle}
              </FeatureSubtitle>
            )}
          </FeatureHeader>
        )}

        {/* Grille de fonctionnalités */}
        <FeatureGrid
          $gridLayout={gridLayout}
          $spacing={spacing}
        >
          {normalizedFeatures.map((feature, index) => (
            <FeatureCard
              key={feature._key || `feature-${index}`}  // ✅ Clé unique
              $cardStyle={cardStyle}
              $featured={feature.featured}
              $textAlignment={textAlignment}
              $isMasonry={gridLayout === 'masonry'}
            >
              {/* Icône */}
              {renderIcon(feature)}
              
              {/* Titre - ✅ Max 60 caractères selon validation */}
              <FeatureCardTitle $color={normalizedStyling.headingColor}>
                {feature.title?.slice(0, 60)} {/* ✅ Respect limite validation */}
              </FeatureCardTitle>

              {/* Description - ✅ Max 200 caractères selon validation */}
              {feature.description && (
                <FeatureCardDescription $color={normalizedStyling.textColor}>
                  {feature.description.slice(0, 200)} {/* ✅ Respect limite validation */}
                </FeatureCardDescription>
              )}

              {/* Détails (liste) */}
              {feature.details && feature.details.length > 0 && (
                <FeatureDetails>
                  {feature.details.map((detail, detailIndex) => (
                    <li key={`detail-${index}-${detailIndex}`}>
                      {detail}
                    </li>
                  ))}
                </FeatureDetails>
              )}

              {/* Lien optionnel */}
              {feature.link && feature.link.url && (
                <FeatureLink href={feature.link.url}>
                  {feature.link.text || 'En savoir plus'}
                </FeatureLink>
              )}
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeatureContainer>
    </FeatureSection>
  )
}
