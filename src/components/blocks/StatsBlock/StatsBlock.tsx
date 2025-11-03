'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Card } from '@/components/ui'
import * as S from './StatsBlock.styles'

type Stat = {
  number: number
  suffix?: string
  prefix?: string
  label: string
  description?: string
  icon?: string
  color?: string
  featured: boolean
  animationType: 'counter' | 'progress' | 'pulse' | 'bounce' | 'fade'
  animationDuration: number
  order: number
}

type AnimationSettings = {
  enableAnimations: boolean
  triggerOffset: number
  staggerDelay: number
  easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'bounce'
}

type BackgroundSettings = {
  backgroundType: 'solid' | 'gradient' | 'image' | 'pattern'
  backgroundColor: string
  gradientColors?: {
    from: string
    to: string
    direction: 'to-b' | 'to-r' | 'to-br' | 'to-bl'
  }
  backgroundImage?: {
    asset: {
      _id: string
      url: string
    }
  }
  overlay?: {
    enabled: boolean
    color: string
    opacity: number
  }
}

type StatsBlockProps = {
  title?: string
  subtitle?: string
  layout: 'horizontal' | 'grid-2x2' | 'grid-3col' | 'grid-4col' | 'carousel' | 'hero-stats'
  stats: Stat[]
  animationSettings: AnimationSettings
  backgroundSettings: BackgroundSettings
  styling: {
    textColor: string
    numberColor: string
    cardStyle: 'minimal' | 'bordered' | 'shadow' | 'colored' | 'glass'
    spacing: 'compact' | 'normal' | 'large'
    alignment: 'left' | 'center' | 'right'
  }
}

/**
 * StatsBlock Component
 * 
 * Bloc de statistiques animées avec:
 * - Compteurs animés au scroll
 * - 6 layouts différents
 * - Animations personnalisables
 * - Arrière-plans avancés (couleur, dégradé, image)
 * - Cartes avec différents styles
 * - Responsive design
 * 
 * @example
 * <StatsBlock
 *   title="Nos Résultats"
 *   layout="grid-3col"
 *   stats={[...]}
 *   animationSettings={{ enableAnimations: true }}
 * />
 */
export default function StatsBlock({
  title,
  subtitle,
  layout = 'grid-3col',
  stats = [],
  animationSettings = {
    enableAnimations: true,
    triggerOffset: 50,
    staggerDelay: 200,
    easing: 'easeOut'
  },
  backgroundSettings = {
    backgroundType: 'solid',
    backgroundColor: '#ffffff'
  },
  styling = {
    textColor: '#1f2937',
    numberColor: '#2563eb',
    cardStyle: 'shadow',
    spacing: 'normal',
    alignment: 'center'
  },
}: StatsBlockProps) {
  const [animatedValues, setAnimatedValues] = useState<Record<number, number>>({})
  const [hasAnimated, setHasAnimated] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // Trier les stats par ordre puis par featured
  const sortedStats = [...stats].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.order - b.order
  })

  // Animation des compteurs
  const animateCounter = (
    targetValue: number,
    duration: number,
    easing: string,
    callback: (value: number) => void
  ) => {
    const startTime = Date.now()
    const startValue = 0

    const easingFunctions = {
      linear: (t: number) => t,
      easeIn: (t: number) => t * t,
      easeOut: (t: number) => t * (2 - t),
      easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      bounce: (t: number) => {
        if (t < 1 / 2.75) return 7.5625 * t * t
        if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
        if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
      }
    }

    const easingFunction = easingFunctions[easing as keyof typeof easingFunctions] || easingFunctions.easeOut

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const easedProgress = easingFunction(progress)
      const currentValue = startValue + (targetValue - startValue) * easedProgress

      callback(Math.round(currentValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  // Observer pour déclencher les animations
  useEffect(() => {
    if (!animationSettings.enableAnimations || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= animationSettings.triggerOffset / 100) {
            setHasAnimated(true)
            
            sortedStats.forEach((stat, index) => {
              setTimeout(() => {
                animateCounter(
                  stat.number,
                  stat.animationDuration,
                  animationSettings.easing,
                  (value) => {
                    setAnimatedValues(prev => ({ ...prev, [index]: value }))
                  }
                )
              }, index * animationSettings.staggerDelay)
            })
          }
        })
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [animationSettings, hasAnimated, sortedStats])

  // Initialiser les valeurs sans animation si désactivée
  useEffect(() => {
    if (!animationSettings.enableAnimations) {
      const initialValues: Record<number, number> = {}
      sortedStats.forEach((stat, index) => {
        initialValues[index] = stat.number
      })
      setAnimatedValues(initialValues)
    }
  }, [animationSettings.enableAnimations, sortedStats])

  // Gestion du carrousel
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % sortedStats.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + sortedStats.length) % sortedStats.length)
  }

  // Helper pour mapper les variants de Card
  const getCardVariant = (style: string) => {
    switch (style) {
      case 'bordered': return 'outlined'
      case 'shadow': return 'elevated'
      case 'colored': return 'filled'
      case 'glass': return 'elevated'
      default: return 'default'
    }
  }

  // Rendu d'une statistique
  const renderStat = (stat: Stat, index: number) => {
    const animatedValue = animatedValues[index] ?? 0
    const displayValue = `${stat.prefix || ''}${animatedValue}${stat.suffix || ''}`

    return (
      <S.StatCard
        key={index}
        $cardStyle={styling.cardStyle}
        $featured={stat.featured}
        $animationType={stat.animationType}
        $alignment={styling.alignment}
        $customColor={stat.color}
      >
        <Card variant={getCardVariant(styling.cardStyle)} padding="lg" hoverable>
          <S.StatContent $alignment={styling.alignment}>
            {stat.icon && (
              <S.StatIcon $featured={stat.featured}>
                {stat.icon}
              </S.StatIcon>
            )}

            <S.StatNumber
              $textColor={stat.color || styling.numberColor}
              $featured={stat.featured}
              $animationType={stat.animationType}
            >
              {displayValue}
            </S.StatNumber>

            <S.StatLabel $textColor={styling.textColor} $featured={stat.featured}>
              {stat.label}
            </S.StatLabel>

            {stat.description && (
              <S.StatDescription $textColor={styling.textColor}>
                {stat.description}
              </S.StatDescription>
            )}
          </S.StatContent>
        </Card>
      </S.StatCard>
    )
  }

  if (!stats || stats.length === 0) {
    return null
  }

  return (
    <S.Section
      ref={sectionRef}
      $backgroundSettings={backgroundSettings}
      $spacing={styling.spacing}
    >
      {/* Image de fond */}
      {backgroundSettings.backgroundType === 'image' && backgroundSettings.backgroundImage && (
        <S.BackgroundImage>
          <Image
            src={urlFor(backgroundSettings.backgroundImage).width(1920).height(1080).url()}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </S.BackgroundImage>
      )}

      {/* Superposition */}
      {backgroundSettings.overlay?.enabled && (
        <S.Overlay
          $color={backgroundSettings.overlay.color}
          $opacity={backgroundSettings.overlay.opacity}
        />
      )}

      <S.Container>
        {/* En-tête */}
        {(title || subtitle) && (
          <S.Header $alignment={styling.alignment}>
            {title && (
              <S.Title $textColor={styling.textColor}>
                {title}
              </S.Title>
            )}
            {subtitle && (
              <S.Subtitle $textColor={styling.textColor}>
                {subtitle}
              </S.Subtitle>
            )}
          </S.Header>
        )}

        {/* Contenu des statistiques */}
        <S.StatsContainer $layout={layout}>
          {layout === 'horizontal' && (
            <S.HorizontalLayout>
              {sortedStats.map((stat, index) => renderStat(stat, index))}
            </S.HorizontalLayout>
          )}

          {layout === 'grid-2x2' && (
            <S.GridLayout $columns={2}>
              {sortedStats.slice(0, 4).map((stat, index) => renderStat(stat, index))}
            </S.GridLayout>
          )}

          {layout === 'grid-3col' && (
            <S.GridLayout $columns={3}>
              {sortedStats.map((stat, index) => renderStat(stat, index))}
            </S.GridLayout>
          )}

          {layout === 'grid-4col' && (
            <S.GridLayout $columns={4}>
              {sortedStats.map((stat, index) => renderStat(stat, index))}
            </S.GridLayout>
          )}

          {layout === 'carousel' && (
            <S.CarouselContainer>
              <S.CarouselTrack $currentSlide={currentSlide}>
                {sortedStats.map((stat, index) => renderStat(stat, index))}
              </S.CarouselTrack>
              
              <S.CarouselArrow $position="left" onClick={prevSlide}>
                ←
              </S.CarouselArrow>
              <S.CarouselArrow $position="right" onClick={nextSlide}>
                →
              </S.CarouselArrow>
              
              <S.CarouselDots>
                {sortedStats.map((_, index) => (
                  <S.CarouselDot
                    key={index}
                    $active={currentSlide === index}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </S.CarouselDots>
            </S.CarouselContainer>
          )}

          {layout === 'hero-stats' && (
            <S.HeroStatsLayout>
              {sortedStats.length > 0 && (
                <S.HeroStat>
                  {renderStat(sortedStats[0], 0)}
                </S.HeroStat>
              )}
              
              {sortedStats.length > 1 && (
                <S.SecondaryStats>
                  <S.GridLayout $columns={2}>
                    {sortedStats.slice(1, 5).map((stat, index) => renderStat(stat, index + 1))}
                  </S.GridLayout>
                </S.SecondaryStats>
              )}
            </S.HeroStatsLayout>
          )}
        </S.StatsContainer>
      </S.Container>
    </S.Section>
  )
}
