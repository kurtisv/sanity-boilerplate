'use client'

import React, { useState } from 'react'
import styled from 'styled-components'

interface Question {
  _key?: string
  question: string
  answer: string
  category?: string
  icon?: string
  featured?: boolean
  displayOrder?: number
}

interface FAQBlockProps {
  title?: string
  subtitle?: string
  layout?: '1-column' | '2-column' | 'accordion-list' | 'grid'
  questions: Question[]
  showCategories?: boolean
  showSearch?: boolean
  defaultOpen?: boolean
  allowMultipleOpen?: boolean
  cardStyle?: 'minimal' | 'bordered' | 'shadow' | 'elevated'
  contactSection?: {
    enabled: boolean
    title?: string
    description?: string
    buttonText?: string
    buttonHref?: string
  }
  backgroundSettings?: {
    backgroundColor?: string
  }
  styling?: {
    textColor?: string
    headingColor?: string
    accentColor?: string
  }
}

const FAQSection = styled.section<{ $backgroundColor?: string }>`
  position: relative;
  width: 100%;
  padding: 6rem 0;
  background: ${props => props.$backgroundColor || 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)'};
`

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
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

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const FAQItem = styled.div<{ $cardStyle?: string; $isOpen: boolean }>`
  border-radius: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${props => {
    switch (props.$cardStyle) {
      case 'shadow':
        return `
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
      case 'elevated':
        return `
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          
          &:hover {
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
          }
        `
      default:
        return `
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          
          &:hover {
            background: #ffffff;
            border-color: #667eea;
          }
        `
    }
  }}
`

const QuestionButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`

const QuestionText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const QuestionIcon = styled.span`
  font-size: 1.5rem;
  flex-shrink: 0;
`

const QuestionTitle = styled.h3`
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(${props => props.$isOpen ? '45deg' : '0deg'});
  flex-shrink: 0;
`

const Answer = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`

const AnswerContent = styled.div`
  padding: 0 2rem 1.5rem 2rem;
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.7;
  
  p {
    margin: 0;
  }
`

const ContactCard = styled.div`
  margin-top: 4rem;
  padding: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1.5rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
`

const ContactTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
`

const ContactDescription = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.6;
`

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: #ffffff;
  color: #667eea;
  font-size: 1.0625rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
  }
`

export default function FAQBlock({
  title,
  subtitle,
  questions,
  defaultOpen = false,
  allowMultipleOpen = false,
  cardStyle = 'shadow',
  contactSection,
  backgroundSettings,
  styling
}: FAQBlockProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(
    defaultOpen ? new Set(questions.map((_, i) => i)) : new Set()
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
    <FAQSection $backgroundColor={backgroundSettings?.backgroundColor}>
      <Container>
        {(title || subtitle) && (
          <Header>
            {title && <Title $color={styling?.headingColor}>{title}</Title>}
            {subtitle && <Subtitle $color={styling?.textColor}>{subtitle}</Subtitle>}
          </Header>
        )}
        
        <FAQList>
          {questions.map((item, index) => {
            const isOpen = openItems.has(index)
            
            return (
              <FAQItem
                key={item._key || `faq-${index}`}
                $cardStyle={cardStyle}
                $isOpen={isOpen}
              >
                <QuestionButton
                  onClick={() => toggleItem(index)}
                  $isOpen={isOpen}
                  aria-expanded={isOpen}
                >
                  <QuestionText>
                    {item.icon && <QuestionIcon>{item.icon}</QuestionIcon>}
                    <QuestionTitle>{item.question}</QuestionTitle>
                  </QuestionText>
                  <ToggleIcon $isOpen={isOpen}>+</ToggleIcon>
                </QuestionButton>
                
                <Answer $isOpen={isOpen}>
                  <AnswerContent>
                    <p>{item.answer}</p>
                  </AnswerContent>
                </Answer>
              </FAQItem>
            )
          })}
        </FAQList>
        
        {contactSection?.enabled && (
          <ContactCard>
            <ContactTitle>{contactSection.title || 'Vous avez d\'autres questions ?'}</ContactTitle>
            <ContactDescription>
              {contactSection.description || 'Notre équipe est là pour vous aider'}
            </ContactDescription>
            <ContactButton href={contactSection.buttonHref || '/contact'}>
              {contactSection.buttonText || 'Nous contacter'}
            </ContactButton>
          </ContactCard>
        )}
      </Container>
    </FAQSection>
  )
}
