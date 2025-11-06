'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface NewsletterBlockProps {
  title?: string
  subtitle?: string
  layout?: 'centered' | 'split' | 'inline' | 'minimal'
  image?: {
    asset?: {
      _ref: string
      url?: string
    }
  }
  formFields?: Array<{
    _key?: string
    fieldType: 'email' | 'name' | 'phone' | 'custom'
    label?: string
    placeholder?: string
    required?: boolean
  }>
  submitButton?: {
    text: string
    variant?: 'primary' | 'secondary'
  }
  successMessage?: string
  features?: Array<{
    _key?: string
    text: string
    icon?: string
  }>
  privacyText?: string
  privacyLink?: string
  provider?: 'mailchimp' | 'convertkit' | 'custom'
  popup?: boolean
  backgroundSettings?: {
    backgroundColor?: string
  }
  styling?: {
    textColor?: string
    headingColor?: string
  }
}

const NewsletterSection = styled.section<{ $backgroundColor?: string }>`
  position: relative;
  width: 100%;
  padding: 5rem 0;
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
`

const Container = styled.div<{ $layout?: string }>`
  width: 100%;
  max-width: ${props => props.$layout === 'split' ? '1200px' : '800px'};
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`

const ContentWrapper = styled.div<{ $layout?: string }>`
  display: ${props => props.$layout === 'split' ? 'grid' : 'block'};
  grid-template-columns: ${props => props.$layout === 'split' ? '1fr 1fr' : '1fr'};
  gap: 4rem;
  align-items: center;
  text-align: ${props => props.$layout === 'inline' ? 'left' : 'center'};
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const TextContent = styled.div``

const Title = styled.h2<{ $color?: string }>`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
  color: ${props => props.$color || '#ffffff'};
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
`

const Subtitle = styled.p<{ $color?: string }>`
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.7;
  color: ${props => props.$color || 'rgba(255, 255, 255, 0.95)'};
  margin-bottom: 2rem;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
`

const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  
  &::before {
    content: '${props => props.about || '✓'}';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-weight: 700;
    flex-shrink: 0;
  }
`

const Form = styled.form<{ $layout?: string }>`
  display: flex;
  flex-direction: ${props => props.$layout === 'inline' ? 'row' : 'column'};
  gap: 1rem;
  max-width: ${props => props.$layout === 'inline' ? '600px' : '500px'};
  margin: ${props => props.$layout === 'inline' ? '0' : '0 auto'};
  
  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 100%;
  }
`

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-align: left;
`

const Input = styled.input`
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: #ffffff;
  transition: all 0.3s;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
  }
`

const SubmitButton = styled.button<{ $variant?: string }>`
  padding: 1rem 2rem;
  font-size: 1.0625rem;
  font-weight: 600;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  
  ${props => {
    if (props.$variant === 'secondary') {
      return `
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
        
        &:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }
      `
    }
    return `
      background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
      color: #667eea;
      box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
      
      &:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
      }
    `
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const Privacy = styled.p`
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1rem;
  
  a {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: underline;
    
    &:hover {
      color: #ffffff;
    }
  }
`

const SuccessMessage = styled.div`
  padding: 1.5rem;
  background: rgba(16, 185, 129, 0.2);
  border: 2px solid rgba(16, 185, 129, 0.5);
  border-radius: 0.75rem;
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  backdrop-filter: blur(10px);
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  @media (max-width: 968px) {
    height: 300px;
  }
`

export default function NewsletterBlock({
  title,
  subtitle,
  layout = 'centered',
  image,
  formFields = [{ fieldType: 'email', placeholder: 'Votre email', required: true }],
  submitButton = { text: 'S\'inscrire', variant: 'primary' },
  successMessage,
  features = [],
  privacyText,
  privacyLink,
  backgroundSettings,
  styling
}: NewsletterBlockProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const imageUrl = image?.asset?._ref 
    ? urlFor(image).width(800).height(600).url()
    : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <NewsletterSection $backgroundColor={backgroundSettings?.backgroundColor}>
      <Container $layout={layout}>
        <ContentWrapper $layout={layout}>
          <TextContent>
            {title && <Title $color={styling?.headingColor}>{title}</Title>}
            {subtitle && <Subtitle $color={styling?.textColor}>{subtitle}</Subtitle>}
            
            {features.length > 0 && (
              <Features>
                {features.map((feature, index) => (
                  <Feature key={feature._key || `feature-${index}`} about={feature.icon}>
                    {feature.text}
                  </Feature>
                ))}
              </Features>
            )}
            
            {!isSubmitted ? (
              <Form onSubmit={handleSubmit} $layout={layout}>
                {formFields.map((field, index) => (
                  <InputWrapper key={field._key || `field-${index}`}>
                    {field.label && <Label>{field.label}</Label>}
                    <Input
                      type={field.fieldType === 'email' ? 'email' : field.fieldType === 'phone' ? 'tel' : 'text'}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  </InputWrapper>
                ))}
                <SubmitButton type="submit" $variant={submitButton.variant} disabled={isLoading}>
                  {isLoading ? 'Envoi...' : submitButton.text}
                </SubmitButton>
              </Form>
            ) : (
              <SuccessMessage>
                {successMessage || '✓ Merci ! Vous êtes inscrit(e) à notre newsletter.'}
              </SuccessMessage>
            )}
            
            {privacyText && (
              <Privacy>
                {privacyText}
                {privacyLink && <> <a href={privacyLink} target="_blank" rel="noopener noreferrer">En savoir plus</a></>}
              </Privacy>
            )}
          </TextContent>
          
          {imageUrl && layout === 'split' && (
            <ImageWrapper>
              <Image
                src={imageUrl}
                alt={title || 'Newsletter'}
                fill
                style={{ objectFit: 'cover' }}
              />
            </ImageWrapper>
          )}
        </ContentWrapper>
      </Container>
    </NewsletterSection>
  )
}
