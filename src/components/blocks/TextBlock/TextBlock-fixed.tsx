'use client'

import React from 'react'
import styled from 'styled-components'
import { PortableText } from '@portabletext/react'

// ✅ CONFORME AU SCHÉMA - Interface strictement alignée sur textBlock.ts
interface TextBlockProps {
  // ✅ CONFORME : content array selon le schéma textBlock
  content: Array<{
    _type: 'block'
    _key: string                 // ✅ Clé unique obligatoire
    style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
    children: Array<{
      _type: 'span'
      _key: string               // ✅ Clé unique obligatoire
      text: string
      marks?: Array<'strong' | 'em' | 'underline' | 'strike-through' | 'code'>
    }>
  }>
  
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
  
  // ✅ CONFORME : typography selon themeFields (simplifié)
  typography?: {
    fontFamily?: string
    headingSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    textSize?: 'sm' | 'md' | 'lg'
    lineHeight?: 'tight' | 'normal' | 'relaxed'
    fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  }
  
  // ✅ CONFORME : iconField selon le schéma (getBasicStyleFieldsWithIcon)
  iconType?: 'emoji' | 'lucide'
  iconEmoji?: string
  iconLucide?: string
  iconSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  iconColor?: string
  iconPosition?: 'top' | 'left' | 'right' | 'background'
  iconStyle?: 'normal' | 'filled' | 'outlined' | 'shadow' | 'circle' | 'rounded'
}

// Styled Components avec design tokens du système
const TextSection = styled.section<{
  $backgroundColor?: string
}>`
  position: relative;
  width: 100%;
  padding: 4rem 0;
  background-color: ${props => props.$backgroundColor || 'transparent'};
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`

const TextContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const TextContent = styled.div<{
  $alignment?: string
  $spacing?: string
}>`
  text-align: ${props => props.$alignment || 'left'};
  
  /* Espacement selon le système */
  > * + * {
    margin-top: ${props => {
      switch (props.$spacing) {
        case 'compact': return '1rem'
        case 'normal': return '1.5rem'
        case 'comfortable': return '2rem'
        case 'large': return '2.5rem'
        case 'xl': return '3rem'
        default: return '1.5rem'
      }
    }};
  }
`

const IconContainer = styled.div<{
  $position?: string
  $size?: string
  $color?: string
}>`
  display: ${props => props.$position === 'background' ? 'none' : 'flex'};
  align-items: center;
  justify-content: ${props => props.$position === 'left' ? 'flex-start' : 'center'};
  margin-bottom: ${props => props.$position === 'top' ? '1.5rem' : '0'};
  
  /* Tailles d'icône selon le schéma */
  font-size: ${props => {
    switch (props.$size) {
      case 'sm': return '1.5rem'    // 24px
      case 'md': return '2rem'      // 32px
      case 'lg': return '2.5rem'    // 40px
      case 'xl': return '3rem'      // 48px
      case '2xl': return '4rem'     // 64px
      default: return '2rem'
    }
  }};
  
  color: ${props => props.$color || '#3b82f6'};
`

// Composants PortableText personnalisés
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p style={{ 
        fontSize: '1.125rem',
        lineHeight: '1.6',
        color: '#6b7280',
        marginBottom: '1rem'
      }}>
        {children}
      </p>
    ),
    h1: ({ children }: any) => (
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        lineHeight: '1.2',
        color: '#1f2937',
        marginBottom: '1.5rem'
      }}>
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 style={{
        fontSize: '2rem',
        fontWeight: '700',
        lineHeight: '1.2',
        color: '#1f2937',
        marginBottom: '1.25rem'
      }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        lineHeight: '1.2',
        color: '#1f2937',
        marginBottom: '1rem'
      }}>
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        lineHeight: '1.2',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 style={{
        fontSize: '1.125rem',
        fontWeight: '500',
        lineHeight: '1.2',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 style={{
        fontSize: '1rem',
        fontWeight: '500',
        lineHeight: '1.2',
        color: '#1f2937',
        marginBottom: '0.5rem'
      }}>
        {children}
      </h6>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{
        fontSize: '1.125rem',
        fontStyle: 'italic',
        lineHeight: '1.6',
        color: '#6b7280',
        borderLeft: '4px solid #3b82f6',
        paddingLeft: '1rem',
        marginLeft: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong style={{ fontWeight: '700' }}>
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em style={{ fontStyle: 'italic' }}>
        {children}
      </em>
    ),
    underline: ({ children }: any) => (
      <span style={{ textDecoration: 'underline' }}>
        {children}
      </span>
    ),
    'strike-through': ({ children }: any) => (
      <span style={{ textDecoration: 'line-through' }}>
        {children}
      </span>
    ),
    code: ({ children }: any) => (
      <code style={{
        backgroundColor: '#f3f4f6',
        color: '#1f2937',
        padding: '0.125rem 0.25rem',
        borderRadius: '0.25rem',
        fontSize: '0.875em',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
      }}>
        {children}
      </code>
    ),
  },
}

export default function TextBlock({
  content,
  backgroundSettings,
  styling,
  typography,
  iconType,
  iconEmoji,
  iconLucide,
  iconSize = 'md',
  iconColor,
  iconPosition = 'top',
  iconStyle = 'normal'
}: TextBlockProps) {
  
  // ✅ NORMALISATION DES PROPS - Éviter les erreurs runtime
  const normalizedContent = content || []
  
  const normalizedStyling = {
    textColor: styling?.textColor || '#374151',
    headingColor: styling?.headingColor || '#1f2937',
    accentColor: styling?.accentColor || '#3b82f6',
    alignment: styling?.alignment || 'left',
    spacing: styling?.spacing || 'comfortable'
  }

  // Rendu de l'icône selon le type
  const renderIcon = () => {
    if (!iconType) return null
    
    return (
      <IconContainer
        $position={iconPosition}
        $size={iconSize}
        $color={iconColor}
      >
        {iconType === 'emoji' && iconEmoji && (
          <span>{iconEmoji}</span>
        )}
        {iconType === 'lucide' && iconLucide && (
          <span>{iconLucide}</span> // Ici on pourrait intégrer Lucide React
        )}
      </IconContainer>
    )
  }

  // Si pas de contenu, ne rien afficher
  if (!normalizedContent.length) {
    return null
  }

  return (
    <TextSection
      $backgroundColor={backgroundSettings?.backgroundColor}
    >
      <TextContainer>
        <TextContent
          $alignment={normalizedStyling.alignment}
          $spacing={normalizedStyling.spacing}
        >
          {/* Icône au-dessus si position = top */}
          {iconPosition === 'top' && renderIcon()}
          
          {/* Contenu avec PortableText */}
          <div style={{
            color: normalizedStyling.textColor,
            fontSize: typography?.textSize === 'sm' ? '1rem' : 
                     typography?.textSize === 'lg' ? '1.25rem' : 
                     '1.125rem',
            fontFamily: typography?.fontFamily === 'system' ? 'system-ui, -apple-system, sans-serif' :
                       typography?.fontFamily === 'inter' ? 'Inter, sans-serif' :
                       typography?.fontFamily === 'roboto' ? 'Roboto, sans-serif' :
                       'system-ui, -apple-system, sans-serif',
            lineHeight: typography?.lineHeight === 'tight' ? '1.25' :
                       typography?.lineHeight === 'relaxed' ? '1.75' :
                       '1.5'
          }}>
            <PortableText
              value={normalizedContent}
              components={portableTextComponents}
            />
          </div>
          
          {/* Icône à gauche/droite si position appropriée */}
          {(iconPosition === 'left' || iconPosition === 'right') && renderIcon()}
        </TextContent>
      </TextContainer>
    </TextSection>
  )
}
