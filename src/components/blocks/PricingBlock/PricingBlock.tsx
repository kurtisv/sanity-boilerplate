'use client'

import React from 'react'
import styled from 'styled-components'

interface PricingPlan {
  _key?: string
  name: string
  description?: string
  price: string
  currency?: string
  period?: 'monthly' | 'yearly' | 'one-time' | 'custom'
  customPeriod?: string
  features: Array<{
    _key?: string
    text: string
    included: boolean
  }>
  ctaButton?: {
    text: string
    href: string
    variant?: 'primary' | 'secondary' | 'outline'
  }
  featured?: boolean
  badge?: string
  badgeColor?: string
}

interface PricingBlockProps {
  title?: string
  subtitle?: string
  layout?: '2-column' | '3-column' | '4-column' | 'comparison-table'
  plans: PricingPlan[]
  cardStyle?: 'minimal' | 'bordered' | 'shadow' | 'elevated' | 'colored' | 'glass'
  billingToggle?: boolean
  backgroundSettings?: {
    backgroundType?: string
    backgroundColor?: string
  }
  styling?: {
    textColor?: string
    headingColor?: string
    accentColor?: string
  }
}

const PricingSection = styled.section<{ $backgroundColor?: string }>`
  position: relative;
  width: 100%;
  padding: 6rem 0;
  background: ${props => props.$backgroundColor || 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)'};
  
  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
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
  background-clip: text;
`

const Subtitle = styled.p<{ $color?: string }>`
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.7;
  color: ${props => props.$color || '#6b7280'};
  max-width: 700px;
  margin: 0 auto;
  font-weight: 400;
`

const PricingGrid = styled.div<{ $layout?: string }>`
  display: grid;
  gap: 2rem;
  
  ${props => {
    switch (props.$layout) {
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
      case '4-column':
        return `
          grid-template-columns: repeat(4, 1fr);
          @media (max-width: 1200px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
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

const PricingCard = styled.div<{ $featured?: boolean; $cardStyle?: string }>`
  position: relative;
  padding: 2.5rem;
  border-radius: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${props => {
    const baseStyles = props.$featured ? `
      transform: scale(1.05);
      z-index: 10;
      
      @media (max-width: 768px) {
        transform: scale(1);
      }
    ` : ''
    
    switch (props.$cardStyle) {
      case 'shadow':
        return `
          ${baseStyles}
          background: #ffffff;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          
          &:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: ${props.$featured ? 'scale(1.08)' : 'translateY(-8px) scale(1.02)'};
          }
        `
      case 'elevated':
        return `
          ${baseStyles}
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(0, 0, 0, 0.05);
          
          &:hover {
            box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.2);
            transform: ${props.$featured ? 'scale(1.08)' : 'translateY(-10px) scale(1.03)'};
          }
        `
      case 'colored':
        return `
          ${baseStyles}
          background: ${props.$featured 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
            : 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)'};
          border: 2px solid ${props.$featured ? '#667eea' : '#667eea30'};
          color: ${props.$featured ? '#ffffff' : 'inherit'};
          
          &:hover {
            background: ${props.$featured 
              ? 'linear-gradient(135deg, #5568d3 0%, #65408b 100%)' 
              : 'linear-gradient(135deg, #667eea25 0%, #764ba225 100%)'};
            transform: ${props.$featured ? 'scale(1.08)' : 'translateY(-5px)'};
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
            transform: ${props.$featured ? 'scale(1.08)' : 'translateY(-5px)'};
          }
        `
      default:
        return `
          ${baseStyles}
          background: #ffffff;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
          border: 2px solid ${props.$featured ? '#667eea' : '#e5e7eb'};
          
          &:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
            border-color: ${props.$featured ? '#5568d3' : '#667eea'};
            transform: ${props.$featured ? 'scale(1.08)' : 'translateY(-8px) scale(1.02)'};
          }
        `
    }
  }}
`

const Badge = styled.div<{ $color?: string; $featured?: boolean }>`
  position: absolute;
  top: -12px;
  right: 2rem;
  padding: 0.5rem 1.25rem;
  background: ${props => props.$color || (props.$featured ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#10b981')};
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const PlanName = styled.h3<{ $featured?: boolean }>`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${props => props.$featured ? 'inherit' : '#1f2937'};
`

const PlanDescription = styled.p<{ $featured?: boolean }>`
  font-size: 0.9375rem;
  color: ${props => props.$featured ? 'rgba(255, 255, 255, 0.9)' : '#6b7280'};
  margin-bottom: 2rem;
  line-height: 1.6;
`

const PriceContainer = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`

const Price = styled.div<{ $featured?: boolean }>`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

const Currency = styled.span<{ $featured?: boolean }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.$featured ? 'inherit' : '#1f2937'};
`

const Amount = styled.span<{ $featured?: boolean }>`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
  color: ${props => props.$featured ? 'inherit' : '#1f2937'};
  letter-spacing: -0.02em;
`

const Period = styled.span<{ $featured?: boolean }>`
  font-size: 1rem;
  color: ${props => props.$featured ? 'rgba(255, 255, 255, 0.8)' : '#6b7280'};
  font-weight: 500;
`

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`

const Feature = styled.li<{ $included: boolean; $featured?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  font-size: 0.9375rem;
  color: ${props => props.$featured ? 'rgba(255, 255, 255, 0.95)' : (props.$included ? '#1f2937' : '#9ca3af')};
  opacity: ${props => props.$included ? 1 : 0.6};
  
  &::before {
    content: '${props => props.$included ? '✓' : '×'}';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: ${props => props.$included 
      ? (props.$featured ? 'rgba(255, 255, 255, 0.2)' : '#d1fae5') 
      : 'transparent'};
    color: ${props => props.$included 
      ? (props.$featured ? '#ffffff' : '#059669') 
      : '#9ca3af'};
    font-weight: 700;
    font-size: 1rem;
    flex-shrink: 0;
  }
`

const CTAButton = styled.a<{ $variant?: string; $featured?: boolean }>`
  display: block;
  width: 100%;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 1.0625rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  letter-spacing: 0.01em;
  
  ${props => {
    if (props.$featured) {
      return `
        background: #ffffff;
        color: #667eea;
        box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
        
        &:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
        }
      `
    }
    
    switch (props.$variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          
          &:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          }
        `
      case 'secondary':
        return `
          background: #f3f4f6;
          color: #1f2937;
          
          &:hover {
            background: #e5e7eb;
            transform: translateY(-3px);
          }
        `
      case 'outline':
        return `
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
          
          &:hover {
            background: #667eea;
            color: white;
            transform: translateY(-3px);
          }
        `
      default:
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          
          &:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          }
        `
    }
  }}
`

export default function PricingBlock({
  title,
  subtitle,
  layout = '3-column',
  plans,
  cardStyle = 'shadow',
  backgroundSettings,
  styling
}: PricingBlockProps) {
  const getPeriodText = (period?: string, customPeriod?: string) => {
    if (period === 'custom' && customPeriod) return customPeriod
    switch (period) {
      case 'monthly': return '/mois'
      case 'yearly': return '/an'
      case 'one-time': return 'unique'
      default: return '/mois'
    }
  }

  return (
    <PricingSection $backgroundColor={backgroundSettings?.backgroundColor}>
      <Container>
        {(title || subtitle) && (
          <Header>
            {title && <Title $color={styling?.headingColor}>{title}</Title>}
            {subtitle && <Subtitle $color={styling?.textColor}>{subtitle}</Subtitle>}
          </Header>
        )}
        
        <PricingGrid $layout={layout}>
          {plans.map((plan, index) => (
            <PricingCard
              key={plan._key || `plan-${index}`}
              $featured={plan.featured}
              $cardStyle={cardStyle}
            >
              {plan.badge && (
                <Badge $color={plan.badgeColor} $featured={plan.featured}>
                  {plan.badge}
                </Badge>
              )}
              
              <PlanName $featured={plan.featured}>{plan.name}</PlanName>
              {plan.description && (
                <PlanDescription $featured={plan.featured}>
                  {plan.description}
                </PlanDescription>
              )}
              
              <PriceContainer>
                <Price $featured={plan.featured}>
                  <Currency $featured={plan.featured}>{plan.currency || '$'}</Currency>
                  <Amount $featured={plan.featured}>{plan.price}</Amount>
                  <Period $featured={plan.featured}>
                    {getPeriodText(plan.period, plan.customPeriod)}
                  </Period>
                </Price>
              </PriceContainer>
              
              <FeaturesList>
                {plan.features.map((feature, idx) => (
                  <Feature
                    key={feature._key || `feature-${idx}`}
                    $included={feature.included}
                    $featured={plan.featured}
                  >
                    {feature.text}
                  </Feature>
                ))}
              </FeaturesList>
              
              {plan.ctaButton && (
                <CTAButton
                  href={plan.ctaButton.href}
                  $variant={plan.ctaButton.variant}
                  $featured={plan.featured}
                >
                  {plan.ctaButton.text}
                </CTAButton>
              )}
            </PricingCard>
          ))}
        </PricingGrid>
      </Container>
    </PricingSection>
  )
}
