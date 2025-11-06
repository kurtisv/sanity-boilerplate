'use client'

import React, { useState } from 'react'
import styled from 'styled-components'

interface AccordionItem {
  _key?: string
  title: string
  content: string
  icon?: string
  iconColor?: string
  defaultOpen?: boolean
  featured?: boolean
}

interface AccordionBlockProps {
  title?: string
  subtitle?: string
  layout?: 'single-column' | 'two-column'
  items: AccordionItem[]
  allowMultipleOpen?: boolean
  cardStyle?: 'minimal' | 'bordered' | 'shadow'
  iconPosition?: 'left' | 'right'
  animation?: 'fade' | 'slide' | 'none'
  spacing?: 'compact' | 'normal' | 'comfortable'
  backgroundSettings?: {
    backgroundColor?: string
  }
  styling?: {
    textColor?: string
    headingColor?: string
    accentColor?: string
  }
}

const AccordionSection = styled.section<{ $backgroundColor?: string }>`
  position: relative;
  width: 100%;
  padding: 5rem 0;
  background: ${props => props.$backgroundColor || 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)'};
`

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const Title = styled.h2<{ $color?: string }>`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  color: ${props => props.$color || '#1f2937'};
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
`

const Subtitle = styled.p<{ $color?: string }>`
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.7;
  color: ${props => props.$color || '#6b7280'};
  max-width: 700px;
  margin: 0 auto;
`

const AccordionList = styled.div<{ $spacing?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${props => {
    switch (props.$spacing) {
      case 'compact': return '0.75rem'
      case 'comfortable': return '1.5rem'
      default: return '1rem'
    }
  }};
`

const AccordionItemWrapper = styled.div<{ $cardStyle?: string; $isOpen: boolean; $featured?: boolean }>`
  border-radius: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${props => {
    const featuredStyle = props.$featured ? 'border: 2px solid #667eea;' : ''
    
    switch (props.$cardStyle) {
      case 'shadow':
        return `
          ${featuredStyle}
          background: #ffffff;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          
          &:hover {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
          }
        `
      case 'bordered':
        return `
          background: #ffffff;
          border: 2px solid ${props.$isOpen ? '#667eea' : '#e5e7eb'};
          
          &:hover {
            border-color: #667eea;
          }
        `
      default:
        return `
          ${featuredStyle}
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          
          &:hover {
            background: #ffffff;
          }
        `
    }
  }}
`

const AccordionButton = styled.button<{ $iconPosition?: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  flex-direction: ${props => props.$iconPosition === 'right' ? 'row' : 'row-reverse'};
`

const TitleContent = styled.div<{ $iconPosition?: string }>`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: ${props => props.$iconPosition === 'right' ? 'row' : 'row-reverse'};
`

const ItemIcon = styled.span<{ $color?: string }>`
  font-size: 1.5rem;
  color: ${props => props.$color || '#667eea'};
  flex-shrink: 0;
`

const ItemTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.5;
`

const ToggleIcon = styled.div<{ $isOpen: boolean }>`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${props => props.$isOpen ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e5e7eb'};
  color: ${props => props.$isOpen ? '#ffffff' : '#6b7280'};
  font-size: 1.25rem;
  font-weight: 700;
  transition: all 0.3s;
  transform: rotate(${props => props.$isOpen ? '45deg' : '0deg'});
  flex-shrink: 0;
`

const Content = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`

const ContentInner = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.7;
`

export default function AccordionBlock({
  title,
  subtitle,
  items,
  allowMultipleOpen = false,
  cardStyle = 'shadow',
  iconPosition = 'left',
  spacing = 'normal',
  backgroundSettings,
  styling
}: AccordionBlockProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(items.map((item, i) => item.defaultOpen ? i : -1).filter(i => i >= 0))
  )

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        if (!allowMultipleOpen) {
          newSet.clear()
        }
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <AccordionSection $backgroundColor={backgroundSettings?.backgroundColor}>
      <Container>
        {(title || subtitle) && (
          <Header>
            {title && <Title $color={styling?.headingColor}>{title}</Title>}
            {subtitle && <Subtitle $color={styling?.textColor}>{subtitle}</Subtitle>}
          </Header>
        )}
        
        <AccordionList $spacing={spacing}>
          {items.map((item, index) => {
            const isOpen = openItems.has(index)
            
            return (
              <AccordionItemWrapper
                key={item._key || `accordion-${index}`}
                $cardStyle={cardStyle}
                $isOpen={isOpen}
                $featured={item.featured}
              >
                <AccordionButton
                  onClick={() => toggleItem(index)}
                  $iconPosition={iconPosition}
                >
                  <ToggleIcon $isOpen={isOpen}>+</ToggleIcon>
                  <TitleContent $iconPosition={iconPosition}>
                    <ItemTitle>{item.title}</ItemTitle>
                    {item.icon && <ItemIcon $color={item.iconColor}>{item.icon}</ItemIcon>}
                  </TitleContent>
                </AccordionButton>
                
                <Content $isOpen={isOpen}>
                  <ContentInner>
                    {item.content}
                  </ContentInner>
                </Content>
              </AccordionItemWrapper>
            )
          })}
        </AccordionList>
      </Container>
    </AccordionSection>
  )
}
