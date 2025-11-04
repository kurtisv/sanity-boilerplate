'use client'

import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

// ✅ CONFORME AU SCHÉMA - Interface strictement alignée sur statsBlock.ts
interface StatsBlockProps {
  // Champs de base du schéma
  title?: string                   // ✅ validation: Rule.max(100)
  subtitle?: string                // ✅ validation: Rule.max(300)
  
  // ✅ CONFORME : layout selon le schéma
  layout?: 'horizontal' | 'grid-2x2' | 'grid-3col' | 'grid-4col' | 'carousel' | 'hero-stats'
  
  // ✅ CONFORME : stats array selon le schéma (min 1, max 12)
  stats: Array<{
    _key?: string                  // ✅ Clé unique obligatoire
    number: string                 // ✅ validation: Rule.required().max(20)
    suffix?: string                // ✅ validation: Rule.max(10)
    prefix?: string                // ✅ validation: Rule.max(10)
    label: string                  // ✅ validation: Rule.required().max(100)
    description?: string           // ✅ validation: Rule.max(200)
    icon?: string                  // ✅ validation: Rule.max(10)
    color?: string                 // ✅ validation: Rule.regex(/^#[0-9A-Fa-f]{6}$/)
    featured?: boolean             // ✅ mise en avant
    animationType?: 'counter' | 'progress' | 'pulse' | 'bounce' | 'fade'  // ✅ selon le schéma
    animationDuration?: number     // ✅ validation: Rule.min(0.5).max(5)
    order?: number                 // ✅ ordre d'affichage
  }>
  
  // ✅ CONFORME : animationSettings objet selon le schéma
  animationSettings?: {
    enableAnimations?: boolean     // ✅ boolean
    triggerOffset?: number         // ✅ validation: Rule.min(0).max(100)
    animationType?: 'countUp' | 'fadeIn' | 'slideUp' | 'scale' | 'bounce'  // ✅ selon le schéma
    duration?: number              // ✅ validation: Rule.min(100).max(10000)
    delay?: number                 // ✅ validation: Rule.min(0).max(2000)
    staggerDelay?: number          // ✅ validation: Rule.min(0).max(1000)
    easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'easeOutQuart' | 'easeOutCubic' | 'easeOutBack' | 'bounce' | 'elastic'  // ✅ selon le schéma
  }
  
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
const StatsSection = styled.section<{
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

const StatsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const StatsHeader = styled.div<{
  $textAlignment?: string
}>`
  text-align: ${props => props.$textAlignment || 'center'};
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`

const StatsTitle = styled.h2<{
  $color?: string
}>`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: ${props => props.$color || '#1f2937'};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const StatsSubtitle = styled.p<{
  $color?: string
}>`
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${props => props.$color || '#6b7280'};
  max-width: 600px;
  margin: 0 auto;
`

const StatsGrid = styled.div<{
  $layout?: string
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
    switch (props.$layout) {
      case 'horizontal':
        return `
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          @media (max-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 480px) {
            grid-template-columns: 1fr;
          }
        `
      case 'grid-2x2':
        return `
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }
        `
      case 'grid-3col':
        return `
          grid-template-columns: repeat(3, 1fr);
          @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
          }
        `
      case 'grid-4col':
        return `
          grid-template-columns: repeat(4, 1fr);
          @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
          }
        `
      case 'hero-stats':
        return `
          grid-template-columns: 2fr 1fr;
          align-items: center;
          @media (max-width: 1024px) {
            grid-template-columns: 1fr;
          }
        `
      case 'carousel':
        return `
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 2rem;
          padding-bottom: 1rem;
          
          > * {
            flex: 0 0 300px;
            scroll-snap-align: start;
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

const StatCard = styled.div<{
  $featured?: boolean
  $color?: string
  $animationType?: string
  $isVisible?: boolean
}>`
  position: relative;
  background: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  
  /* Animation d'entrée */
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => {
    if (!props.$isVisible) {
      switch (props.$animationType) {
        case 'slideUp': return 'translateY(30px)'
        case 'scale': return 'scale(0.8)'
        case 'bounce': return 'scale(0.8) translateY(20px)'
        default: return 'translateY(20px)'
      }
    }
    return 'translateY(0) scale(1)'
  }};
  
  /* Mise en avant */
  ${props => props.$featured && `
    transform: scale(1.05);
    border: 2px solid ${props.$color || '#3b82f6'};
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  `}
  
  &:hover {
    transform: ${props => props.$featured ? 'scale(1.08)' : 'scale(1.02)'};
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const StatIcon = styled.div<{
  $color?: string
}>`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${props => props.$color || '#3b82f6'};
`

const StatNumber = styled.div<{
  $color?: string
  $featured?: boolean
}>`
  font-size: ${props => props.$featured ? '3rem' : '2.5rem'};
  font-weight: 700;
  line-height: 1;
  color: ${props => props.$color || '#1f2937'};
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: ${props => props.$featured ? '2.5rem' : '2rem'};
  }
`

const StatLabel = styled.h3<{
  $color?: string
}>`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.$color || '#374151'};
  margin-bottom: 0.5rem;
`

const StatDescription = styled.p<{
  $color?: string
}>`
  font-size: 0.875rem;
  line-height: 1.4;
  color: ${props => props.$color || '#6b7280'};
  margin: 0;
`

// Hook pour l'animation de compteur
const useCountUp = (
  endValue: string,
  duration: number,
  isVisible: boolean,
  delay: number = 0
) => {
  const [count, setCount] = useState('0')
  
  useEffect(() => {
    if (!isVisible) return
    
    const timeout = setTimeout(() => {
      // Extraire le nombre de la chaîne
      const numericValue = parseFloat(endValue.replace(/[^\d.]/g, ''))
      if (isNaN(numericValue)) {
        setCount(endValue)
        return
      }
      
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Fonction d'easing
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(numericValue * easeOutQuart)
        
        // Reconstituer la chaîne avec les caractères non numériques
        const formattedValue = endValue.replace(/[\d.]+/, currentValue.toString())
        setCount(formattedValue)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(endValue)
        }
      }
      
      animate()
    }, delay)
    
    return () => clearTimeout(timeout)
  }, [endValue, duration, isVisible, delay])
  
  return count
}

// Hook pour l'intersection observer
const useIntersectionObserver = (threshold = 0.5) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => observer.disconnect()
  }, [threshold])
  
  return { ref, isVisible }
}

export default function StatsBlock({
  title,
  subtitle,
  layout = 'grid-3col',
  stats = [],
  animationSettings,
  backgroundSettings,
  styling
}: StatsBlockProps) {
  
  // ✅ NORMALISATION DES PROPS - Éviter les erreurs runtime
  const normalizedStats = stats?.slice(0, 12)?.sort((a, b) => (a.order || 0) - (b.order || 0)) || []  // ✅ Max 12 selon validation, triés par ordre
  
  const normalizedAnimationSettings = {
    enableAnimations: animationSettings?.enableAnimations !== false,
    triggerOffset: (animationSettings?.triggerOffset || 50) / 100,  // ✅ Conversion en décimal
    animationType: animationSettings?.animationType || 'countUp',
    duration: animationSettings?.duration || 2000,  // ✅ En millisecondes
    delay: animationSettings?.delay || 200,
    staggerDelay: animationSettings?.staggerDelay || 200
  }
  
  const normalizedStyling = {
    textColor: styling?.textColor || '#374151',
    headingColor: styling?.headingColor || '#1f2937',
    accentColor: styling?.accentColor || '#3b82f6',
    alignment: styling?.alignment || 'center'
  }

  // Hook pour détecter la visibilité
  const { ref, isVisible } = useIntersectionObserver(normalizedAnimationSettings.triggerOffset)

  // Rendu d'une statistique
  const renderStat = (stat: typeof normalizedStats[0], index: number) => {
    const animationDelay = normalizedAnimationSettings.enableAnimations 
      ? normalizedAnimationSettings.delay + (index * normalizedAnimationSettings.staggerDelay)
      : 0
    
    const displayNumber = normalizedAnimationSettings.enableAnimations && normalizedAnimationSettings.animationType === 'countUp'
      ? useCountUp(
          `${stat.prefix || ''}${stat.number}${stat.suffix || ''}`,
          normalizedAnimationSettings.duration,
          isVisible,
          animationDelay
        )
      : `${stat.prefix || ''}${stat.number?.slice(0, 20) || ''}${stat.suffix || ''}`  // ✅ Max 20 selon validation
    
    return (
      <StatCard
        key={stat._key || `stat-${index}`}  // ✅ Clé unique
        $featured={stat.featured}
        $color={stat.color}
        $animationType={normalizedAnimationSettings.animationType}
        $isVisible={normalizedAnimationSettings.enableAnimations ? isVisible : true}
        style={{
          transitionDelay: normalizedAnimationSettings.enableAnimations ? `${animationDelay}ms` : '0ms'
        }}
      >
        {/* Icône */}
        {stat.icon && (
          <StatIcon $color={stat.color || normalizedStyling.accentColor}>
            {stat.icon.slice(0, 10)} {/* ✅ Max 10 selon validation */}
          </StatIcon>
        )}
        
        {/* Nombre - ✅ Max 20 caractères selon validation */}
        <StatNumber 
          $color={stat.color || normalizedStyling.headingColor}
          $featured={stat.featured}
        >
          {displayNumber}
        </StatNumber>

        {/* Label - ✅ Max 100 caractères selon validation */}
        <StatLabel $color={normalizedStyling.headingColor}>
          {stat.label?.slice(0, 100)} {/* ✅ Respect limite validation */}
        </StatLabel>

        {/* Description - ✅ Max 200 caractères selon validation */}
        {stat.description && (
          <StatDescription $color={normalizedStyling.textColor}>
            {stat.description.slice(0, 200)} {/* ✅ Respect limite validation */}
          </StatDescription>
        )}
      </StatCard>
    )
  }

  // Si pas de stats, ne rien afficher
  if (!normalizedStats.length) {
    return null
  }

  return (
    <StatsSection
      ref={ref}
      $backgroundColor={backgroundSettings?.backgroundColor}
    >
      <StatsContainer>
        {/* En-tête de section */}
        {(title || subtitle) && (
          <StatsHeader $textAlignment={normalizedStyling.alignment}>
            {title && (
              <StatsTitle $color={normalizedStyling.headingColor}>
                {title.slice(0, 100)} {/* ✅ Max 100 selon validation */}
              </StatsTitle>
            )}
            {subtitle && (
              <StatsSubtitle $color={normalizedStyling.textColor}>
                {subtitle.slice(0, 300)} {/* ✅ Max 300 selon validation */}
              </StatsSubtitle>
            )}
          </StatsHeader>
        )}

        {/* Grille de statistiques */}
        <StatsGrid
          $layout={layout}
          $spacing={styling?.spacing}
        >
          {normalizedStats.map((stat, index) => renderStat(stat, index))}
        </StatsGrid>
      </StatsContainer>
    </StatsSection>
  )
}
