'use client'

import React, { useState } from 'react'
import styled from 'styled-components'

// ✅ CONFORME AU SCHÉMA - Interface strictement alignée sur contactBlock.ts
interface ContactBlockProps {
  // Champs de base du schéma
  title?: string                   // ✅ validation: Rule.max(100)
  subtitle?: string                // ✅ validation: Rule.max(300)
  
  // ✅ CONFORME : layout selon le schéma
  layout?: 'centered' | 'two-columns' | 'with-sidebar' | 'full-width'
  
  // ✅ CONFORME : formFields array selon le schéma
  formFields?: Array<{
    _key?: string                  // ✅ Clé unique obligatoire
    fieldType: 'name' | 'email' | 'phone' | 'company' | 'subject' | 'message' | 'custom'  // ✅ selon le schéma
    label: string                  // ✅ validation: Rule.required().max(50)
    placeholder?: string           // ✅ validation: Rule.max(100)
    required?: boolean             // ✅ boolean
    width?: 'half' | 'full'        // ✅ selon le schéma
  }>
  
  // ✅ CONFORME : submitButton objet selon le schéma
  submitButton?: {
    text: string                   // ✅ validation: Rule.required().max(30)
    loadingText?: string           // ✅ validation: Rule.max(30)
  }
  
  // ✅ CONFORME : successMessage objet selon le schéma
  successMessage?: {
    title: string                  // ✅ validation: Rule.required().max(50)
    description?: string           // ✅ validation: Rule.max(200)
  }
  
  // ✅ CONFORME : contactInfo objet selon le schéma
  contactInfo?: {
    showContactInfo?: boolean      // ✅ boolean
    address?: string               // ✅ conditionnel
    phone?: string                 // ✅ conditionnel
    email?: string                 // ✅ validation: Rule.email()
    hours?: string                 // ✅ conditionnel
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
const ContactSection = styled.section<{
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

const ContactContainer = styled.div<{
  $layout?: string
}>`
  width: 100%;
  max-width: ${props => {
    switch (props.$layout) {
      case 'full-width': return '100%'
      case 'centered': return '600px'
      default: return '1200px'
    }
  }};
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const ContactHeader = styled.div<{
  $textAlignment?: string
}>`
  text-align: ${props => props.$textAlignment || 'center'};
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`

const ContactTitle = styled.h2<{
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

const ContactSubtitle = styled.p<{
  $color?: string
}>`
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${props => props.$color || '#6b7280'};
  max-width: 600px;
  margin: 0 auto;
`

const ContactContent = styled.div<{
  $layout?: string
}>`
  display: grid;
  gap: 3rem;
  
  /* Layouts selon le schéma */
  ${props => {
    switch (props.$layout) {
      case 'two-columns':
        return `
          grid-template-columns: 1fr 1fr;
          @media (max-width: 1024px) {
            grid-template-columns: 1fr;
          }
        `
      case 'with-sidebar':
        return `
          grid-template-columns: 2fr 1fr;
          @media (max-width: 1024px) {
            grid-template-columns: 1fr;
          }
        `
      case 'full-width':
        return `
          grid-template-columns: 1fr;
        `
      default: // centered
        return `
          grid-template-columns: 1fr;
          max-width: 600px;
          margin: 0 auto;
        `
    }
  }}
`

const FormContainer = styled.div`
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const FormGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr);
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const FormField = styled.div<{
  $width?: string
}>`
  grid-column: ${props => props.$width === 'full' ? '1 / -1' : 'span 1'};
  
  @media (max-width: 640px) {
    grid-column: 1 / -1;
  }
`

const FormLabel = styled.label`
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`

const FormInput = styled.input<{
  $hasError?: boolean
}>`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.$hasError ? '#ef4444' : '#e5e7eb'};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`

const FormTextarea = styled.textarea<{
  $hasError?: boolean
}>`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.$hasError ? '#ef4444' : '#e5e7eb'};
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`

const SubmitButton = styled.button<{
  $loading?: boolean
  $accentColor?: string
}>`
  width: 100%;
  padding: 1rem 2rem;
  background: ${props => props.$accentColor || '#3b82f6'};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.$loading ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$loading ? 0.7 : 1};
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${props => props.$accentColor ? `${props.$accentColor}dd` : '#2563eb'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`

const ContactInfoContainer = styled.div`
  background: #f8fafc;
  padding: 2.5rem;
  border-radius: 1rem;
  height: fit-content;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const ContactInfoTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
`

const ContactInfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const ContactInfoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
  font-size: 1.125rem;
`

const ContactInfoContent = styled.div`
  flex: 1;
  
  h4 {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
  }
  
  p {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.4;
    margin: 0;
  }
`

const SuccessMessage = styled.div`
  background: #dcfce7;
  border: 1px solid #16a34a;
  color: #166534;
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  
  h3 {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin: 0;
    opacity: 0.8;
  }
`

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #ef4444;
  color: #dc2626;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

export default function ContactBlock({
  title,
  subtitle,
  layout = 'centered',
  formFields = [],
  submitButton,
  successMessage,
  contactInfo,
  backgroundSettings,
  styling
}: ContactBlockProps) {
  
  // États du formulaire
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // ✅ NORMALISATION DES PROPS - Éviter les erreurs runtime
  const normalizedFormFields = formFields || []
  const normalizedSubmitButton = {
    text: submitButton?.text?.slice(0, 30) || 'Envoyer le message',  // ✅ Max 30 selon validation
    loadingText: submitButton?.loadingText?.slice(0, 30) || 'Envoi en cours...'  // ✅ Max 30 selon validation
  }
  
  const normalizedSuccessMessage = {
    title: successMessage?.title?.slice(0, 50) || 'Message envoyé !',  // ✅ Max 50 selon validation
    description: successMessage?.description?.slice(0, 200) || 'Merci pour votre message.'  // ✅ Max 200 selon validation
  }
  
  const normalizedStyling = {
    textColor: styling?.textColor || '#374151',
    headingColor: styling?.headingColor || '#1f2937',
    accentColor: styling?.accentColor || '#3b82f6',
    alignment: styling?.alignment || 'center'
  }

  // Gestion des changements de champs
  const handleFieldChange = (fieldKey: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldKey]: value }))
    if (errors[fieldKey]) {
      setErrors(prev => ({ ...prev, [fieldKey]: '' }))
    }
  }

  // Validation du formulaire
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    normalizedFormFields.forEach((field, index) => {
      const fieldKey = field._key || `field-${index}`
      const value = formData[fieldKey] || ''
      
      if (field.required && !value.trim()) {
        newErrors[fieldKey] = 'Ce champ est obligatoire'
      }
      
      if (field.fieldType === 'email' && value && !value.includes('@')) {
        newErrors[fieldKey] = 'Adresse email invalide'
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Ici on pourrait envoyer les données à une API
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulation
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Rendu d'un champ de formulaire
  const renderFormField = (field: typeof normalizedFormFields[0], index: number) => {
    const fieldKey = field._key || `field-${index}`
    const value = formData[fieldKey] || ''
    const error = errors[fieldKey]
    
    return (
      <FormField key={fieldKey} $width={field.width}>
        <FormLabel>
          {field.label?.slice(0, 50)} {/* ✅ Max 50 selon validation */}
          {field.required && <span style={{ color: '#ef4444' }}>*</span>}
        </FormLabel>
        
        {field.fieldType === 'message' ? (
          <FormTextarea
            value={value}
            onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
            placeholder={field.placeholder?.slice(0, 100)} // ✅ Max 100 selon validation
            $hasError={!!error}
            disabled={isSubmitting}
          />
        ) : (
          <FormInput
            type={field.fieldType === 'email' ? 'email' : field.fieldType === 'phone' ? 'tel' : 'text'}
            value={value}
            onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
            placeholder={field.placeholder?.slice(0, 100)} // ✅ Max 100 selon validation
            $hasError={!!error}
            disabled={isSubmitting}
          />
        )}
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormField>
    )
  }

  // Rendu des informations de contact
  const renderContactInfo = () => {
    if (!contactInfo?.showContactInfo) return null
    
    return (
      <ContactInfoContainer>
        <ContactInfoTitle>Nos coordonnées</ContactInfoTitle>
        
        {contactInfo.address && (
          <ContactInfoItem>
            <ContactInfoIcon>📍</ContactInfoIcon>
            <ContactInfoContent>
              <h4>Adresse</h4>
              <p>{contactInfo.address}</p>
            </ContactInfoContent>
          </ContactInfoItem>
        )}
        
        {contactInfo.phone && (
          <ContactInfoItem>
            <ContactInfoIcon>📞</ContactInfoIcon>
            <ContactInfoContent>
              <h4>Téléphone</h4>
              <p>{contactInfo.phone}</p>
            </ContactInfoContent>
          </ContactInfoItem>
        )}
        
        {contactInfo.email && (
          <ContactInfoItem>
            <ContactInfoIcon>📧</ContactInfoIcon>
            <ContactInfoContent>
              <h4>Email</h4>
              <p>{contactInfo.email}</p>
            </ContactInfoContent>
          </ContactInfoItem>
        )}
        
        {contactInfo.hours && (
          <ContactInfoItem>
            <ContactInfoIcon>🕐</ContactInfoIcon>
            <ContactInfoContent>
              <h4>Horaires</h4>
              <p>{contactInfo.hours}</p>
            </ContactInfoContent>
          </ContactInfoItem>
        )}
      </ContactInfoContainer>
    )
  }

  // Si pas de champs, ne rien afficher
  if (!normalizedFormFields.length) {
    return null
  }

  return (
    <ContactSection
      $backgroundColor={backgroundSettings?.backgroundColor}
    >
      <ContactContainer $layout={layout}>
        {/* En-tête de section */}
        {(title || subtitle) && (
          <ContactHeader $textAlignment={normalizedStyling.alignment}>
            {title && (
              <ContactTitle $color={normalizedStyling.headingColor}>
                {title.slice(0, 100)} {/* ✅ Max 100 selon validation */}
              </ContactTitle>
            )}
            {subtitle && (
              <ContactSubtitle $color={normalizedStyling.textColor}>
                {subtitle.slice(0, 300)} {/* ✅ Max 300 selon validation */}
              </ContactSubtitle>
            )}
          </ContactHeader>
        )}

        {/* Contenu principal */}
        <ContactContent $layout={layout}>
          {/* Formulaire */}
          <FormContainer>
            {isSubmitted ? (
              <SuccessMessage>
                <h3>{normalizedSuccessMessage.title}</h3>
                <p>{normalizedSuccessMessage.description}</p>
              </SuccessMessage>
            ) : (
              <form onSubmit={handleSubmit}>
                <FormGrid>
                  {normalizedFormFields.map((field, index) => renderFormField(field, index))}
                </FormGrid>
                
                <div style={{ marginTop: '2rem' }}>
                  <SubmitButton
                    type="submit"
                    $loading={isSubmitting}
                    $accentColor={normalizedStyling.accentColor}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? normalizedSubmitButton.loadingText : normalizedSubmitButton.text}
                  </SubmitButton>
                </div>
              </form>
            )}
          </FormContainer>

          {/* Informations de contact (sidebar) */}
          {renderContactInfo()}
        </ContactContent>
      </ContactContainer>
    </ContactSection>
  )
}
