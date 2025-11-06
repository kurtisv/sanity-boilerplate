'use client'

import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface Testimonial {
  _key?: string
  name: string
  role?: string
  photo?: {
    asset?: {
      _ref: string
      url?: string
    }
  }
  comment: string
  rating?: number
  date?: string
  verified?: boolean
  featured?: boolean
  source?: string
  sourceUrl?: string
}

interface TestimonialsBlockProps {
  title?: string
  subtitle?: string
  layout?: '1-column' | '2-column' | '3-column' | 'masonry' | 'carousel'
  testimonials: Testimonial[]
  cardStyle?: 'minimal' | 'bordered' | 'shadow' | 'elevated' | 'colored' | 'glass'
  showRating?: boolean
  showPhoto?: boolean
  showRole?: boolean
  showDate?: boolean
  showVerified?: boolean
  showSource?: boolean
  autoplay?: boolean
  backgroundSettings?: {
    backgroundType?: string
    backgroundColor?: string
  }
  styling?: {
    textColor?: string
    headingColor?: string
  }
}

const TestimonialsSection = styled.section<{ $backgroundColor?: string }>`
  position: relative;
  width: 100%;
  padding: 6rem 0;
  background: ${props => props.$backgroundColor || 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)'};
  
  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`

const Title = styled.h2<{ $color?: string }>`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  color: ${props => props.$color || '#1f2937'};
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Subtitle = styled.p<{ $color?: string }>`
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.7;
  color: ${props => props.$color || '#6b7280'};
  max-width: 700px;
  margin: 0 auto;
`

const TestimonialsGrid = styled.div<{ $layout?: string }>`
  display: grid;
  gap: 2rem;
  
  ${props => {
    switch (props.$layout) {
      case '1-column':
        return `
          grid-template-columns: 1fr;
          max-width: 800px;
          margin: 0 auto;
        `
      case '2-column':
        return `
          grid-template-columns: repeat(2, 1fr);
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }
        `
      case '3-column':
        return `
          grid-template-columns: repeat(3, 1fr);
          @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
          }
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

const TestimonialCard = styled.div<{ $cardStyle?: string; $featured?: boolean; $isMasonry?: boolean }>`
  position: relative;
  padding: 2rem;
  border-radius: 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${props => props.$isMasonry && `
    break-inside: avoid;
    margin-bottom: 2rem;
  `}
  
  ${props => {
    const baseStyles = props.$featured ? `
      border: 2px solid #667eea;
    ` : ''
    
    switch (props.$cardStyle) {
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
      case 'elevated':
        return `
          ${baseStyles}
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
          
          &:hover {
            box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.2);
            transform: translateY(-10px);
          }
        `
      case 'colored':
        return `
          ${baseStyles}
          background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
          border: 2px solid #667eea30;
          
          &:hover {
            background: linear-gradient(135deg, #667eea25 0%, #764ba225 100%);
            border-color: #667eea50;
            transform: translateY(-5px);
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
            transform: translateY(-5px);
          }
        `
      default:
        return `
          ${baseStyles}
          background: #ffffff;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
          
          &:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
            transform: translateY(-8px) scale(1.02);
          }
        `
    }
  }}
`

const QuoteIcon = styled.div`
  font-size: 3rem;
  color: #667eea;
  opacity: 0.2;
  line-height: 1;
  margin-bottom: 1rem;
`

const Comment = styled.p`
  font-size: 1.0625rem;
  line-height: 1.7;
  color: #1f2937;
  margin-bottom: 1.5rem;
  font-style: italic;
`

const Rating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
`

const Star = styled.span<{ $filled: boolean }>`
  color: ${props => props.$filled ? '#f59e0b' : '#e5e7eb'};
  font-size: 1.25rem;
`

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(0, 0, 0, 0.05);
`

const PhotoWrapper = styled.div`
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`

const PhotoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
`

const AuthorInfo = styled.div`
  flex: 1;
`

const AuthorName = styled.div`
  font-weight: 700;
  color: #1f2937;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background: #10b981;
  border-radius: 50%;
  color: white;
  font-size: 0.75rem;
`

const AuthorRole = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  color: #9ca3af;
`

const Source = styled.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`

export default function TestimonialsBlock({
  title,
  subtitle,
  layout = '3-column',
  testimonials,
  cardStyle = 'shadow',
  showRating = true,
  showPhoto = true,
  showRole = true,
  showDate = false,
  showVerified = true,
  showSource = false,
  backgroundSettings,
  styling
}: TestimonialsBlockProps) {
  const isMasonry = layout === 'masonry'
  
  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} $filled={i < rating}>★</Star>
    ))
  }

  return (
    <TestimonialsSection $backgroundColor={backgroundSettings?.backgroundColor}>
      <Container>
        {(title || subtitle) && (
          <Header>
            {title && <Title $color={styling?.headingColor}>{title}</Title>}
            {subtitle && <Subtitle $color={styling?.textColor}>{subtitle}</Subtitle>}
          </Header>
        )}
        
        <TestimonialsGrid $layout={layout}>
          {testimonials.map((testimonial, index) => {
            const photoUrl = testimonial.photo?.asset?._ref 
              ? urlFor(testimonial.photo).width(200).height(200).url()
              : null
            
            const initials = testimonial.name
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)

            return (
              <TestimonialCard
                key={testimonial._key || `testimonial-${index}`}
                $cardStyle={cardStyle}
                $featured={testimonial.featured}
                $isMasonry={isMasonry}
              >
                <QuoteIcon>"</QuoteIcon>
                
                <Comment>{testimonial.comment}</Comment>
                
                {showRating && testimonial.rating && (
                  <Rating>{renderStars(testimonial.rating)}</Rating>
                )}
                
                <AuthorSection>
                  {showPhoto && (
                    <PhotoWrapper>
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={testimonial.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <PhotoPlaceholder>{initials}</PhotoPlaceholder>
                      )}
                    </PhotoWrapper>
                  )}
                  
                  <AuthorInfo>
                    <AuthorName>
                      {testimonial.name}
                      {showVerified && testimonial.verified && (
                        <VerifiedBadge>✓</VerifiedBadge>
                      )}
                    </AuthorName>
                    {showRole && testimonial.role && (
                      <AuthorRole>{testimonial.role}</AuthorRole>
                    )}
                    {(showDate || showSource) && (
                      <Meta>
                        {showDate && testimonial.date && <span>{testimonial.date}</span>}
                        {showSource && testimonial.source && (
                          <>
                            {showDate && testimonial.date && <span>•</span>}
                            {testimonial.sourceUrl ? (
                              <Source href={testimonial.sourceUrl} target="_blank" rel="noopener noreferrer">
                                {testimonial.source}
                              </Source>
                            ) : (
                              <span>{testimonial.source}</span>
                            )}
                          </>
                        )}
                      </Meta>
                    )}
                  </AuthorInfo>
                </AuthorSection>
              </TestimonialCard>
            )
          })}
        </TestimonialsGrid>
      </Container>
    </TestimonialsSection>
  )
}
