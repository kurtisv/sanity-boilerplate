'use client'

import { useState } from 'react'
import { Button, Input, Card } from '@/components/ui'
import * as S from './ContactBlock.styles'

type FormField = {
  fieldType: 'name' | 'email' | 'phone' | 'company' | 'subject' | 'message' | 'custom'
  label: string
  placeholder?: string
  required: boolean
  width: 'half' | 'full'
}

type ContactInfo = {
  showContactInfo: boolean
  address?: string
  phone?: string
  email?: string
  hours?: string
}

type ContactBlockProps = {
  title?: string
  subtitle?: string
  layout: 'centered' | 'two-columns' | 'with-sidebar' | 'full-width'
  formFields?: FormField[]
  submitButton?: {
    text: string
    loadingText: string
  }
  successMessage?: {
    title: string
    description: string
  }
  contactInfo?: ContactInfo
  styling?: {
    backgroundColor: string
    textColor: string
    spacing: 'compact' | 'normal' | 'large'
  }
}

/**
 * ContactBlock Component
 * 
 * Formulaire de contact avancé avec:
 * - Champs configurables dynamiquement
 * - Validation côté client
 * - Différents layouts (centré, colonnes, sidebar)
 * - Gestion des états de chargement et succès
 * - Informations de contact optionnelles
 * - Styling personnalisable
 * 
 * @example
 * <ContactBlock
 *   title="Contactez-nous"
 *   layout="with-sidebar"
 *   formFields={[...]}
 *   contactInfo={{ showContactInfo: true, ... }}
 * />
 */
export default function ContactBlock({
  title,
  subtitle,
  layout = 'centered',
  formFields,
  submitButton,
  successMessage,
  contactInfo,
  styling,
}: ContactBlockProps) {
  // Normaliser les props pour gérer les cas null/undefined de Sanity
  const normalizedFormFields = formFields || []
  const normalizedSubmitButton = submitButton || { text: 'Envoyer', loadingText: 'Envoi...' }
  const normalizedSuccessMessage = successMessage || { title: 'Envoyé !', description: 'Merci pour votre message.' }
  const normalizedContactInfo = contactInfo || { showContactInfo: false }
  const normalizedStyling = styling || { backgroundColor: '#ffffff', textColor: '#1f2937', spacing: 'normal' as const }
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Validation des champs
  const validateField = (field: FormField, value: string): string => {
    if (field.required && !value.trim()) {
      return `${field.label} est obligatoire`
    }

    if (field.fieldType === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Adresse email invalide'
      }
    }

    if (field.fieldType === 'phone' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)\.]{10,}$/
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        return 'Numéro de téléphone invalide'
      }
    }

    return ''
  }

  // Gestion des changements de champs
  const handleFieldChange = (fieldType: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldType]: value }))
    
    // Effacer l'erreur si le champ devient valide
    if (errors[fieldType]) {
      const field = normalizedFormFields.find(f => f.fieldType === fieldType)
      if (field) {
        const error = validateField(field, value)
        if (!error) {
          setErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[fieldType]
            return newErrors
          })
        }
      }
    }
  }

  // Validation complète du formulaire
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    normalizedFormFields.forEach(field => {
      const value = formData[field.fieldType] || ''
      const error = validateField(field, value)
      if (error) {
        newErrors[field.fieldType] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simuler l'envoi (à remplacer par votre API)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // TODO: Intégrer avec votre service d'email (Resend, SendGrid, etc.)
      if (process.env.NODE_ENV === 'development') {
        console.log('Form data:', formData)
      }
      
      setIsSuccess(true)
      setFormData({})
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      // TODO: Gérer les erreurs d'envoi
    } finally {
      setIsLoading(false)
    }
  }

  // Rendu du champ selon son type
  const renderField = (field: FormField) => {
    const value = formData[field.fieldType] || ''
    const error = errors[field.fieldType]

    const commonProps = {
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      error: error,
      value: value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        handleFieldChange(field.fieldType, e.target.value),
    }

    switch (field.fieldType) {
      case 'email':
        return <Input key={field.fieldType} type="email" {...commonProps} />
      
      case 'phone':
        return <Input key={field.fieldType} type="tel" {...commonProps} />
      
      case 'message':
        return (
          <Input 
            key={field.fieldType} 
            as="textarea" 
            rows={4} 
            {...commonProps} 
          />
        )
      
      default:
        return <Input key={field.fieldType} type="text" {...commonProps} />
    }
  }

  if (isSuccess) {
    return (
      <S.Section $backgroundColor={normalizedStyling.backgroundColor} $spacing={normalizedStyling.spacing}>
        <S.Container>
          <S.SuccessCard>
            <S.SuccessIcon>✅</S.SuccessIcon>
            <S.SuccessTitle $textColor={normalizedStyling.textColor}>
              {normalizedSuccessMessage.title}
            </S.SuccessTitle>
            <S.SuccessDescription $textColor={normalizedStyling.textColor}>
              {normalizedSuccessMessage.description}
            </S.SuccessDescription>
            <Button 
              variant="outline" 
              onClick={() => setIsSuccess(false)}
            >
              Envoyer un autre message
            </Button>
          </S.SuccessCard>
        </S.Container>
      </S.Section>
    )
  }

  return (
    <S.Section $backgroundColor={normalizedStyling.backgroundColor} $spacing={normalizedStyling.spacing}>
      <S.Container>
        <S.Content $layout={layout}>
          {/* En-tête */}
          {(title || subtitle) && (
            <S.Header $layout={layout}>
              {title && (
                <S.Title $textColor={normalizedStyling.textColor}>
                  {title}
                </S.Title>
              )}
              {subtitle && (
                <S.Subtitle $textColor={normalizedStyling.textColor}>
                  {subtitle}
                </S.Subtitle>
              )}
            </S.Header>
          )}

          <S.MainContent $layout={layout}>
            {/* Formulaire */}
            <S.FormWrapper>
              <Card variant="outlined" padding="lg">
                <form onSubmit={handleSubmit}>
                  <S.FormGrid $layout={layout}>
                    {normalizedFormFields.map((field, index) => (
                      <S.FieldWrapper key={field.fieldType || `field-${index}`} $width={field.width}>
                        {renderField(field)}
                      </S.FieldWrapper>
                    ))}
                  </S.FormGrid>

                  <S.SubmitWrapper>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth={layout === 'centered'}
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      {isLoading ? normalizedSubmitButton.loadingText : normalizedSubmitButton.text}
                    </Button>
                  </S.SubmitWrapper>
                </form>
              </Card>
            </S.FormWrapper>

            {/* Informations de contact (sidebar) */}
            {normalizedContactInfo.showContactInfo && layout === 'with-sidebar' && (
              <S.ContactInfoWrapper>
                <Card variant="filled" padding="lg">
                  <S.ContactInfoTitle $textColor={normalizedStyling.textColor}>
                    Informations de contact
                  </S.ContactInfoTitle>

                  <S.ContactInfoList>
                    {normalizedContactInfo.address && (
                      <S.ContactInfoItem>
                        <S.ContactInfoIcon>📍</S.ContactInfoIcon>
                        <S.ContactInfoText $textColor={normalizedStyling.textColor}>
                          {normalizedContactInfo.address}
                        </S.ContactInfoText>
                      </S.ContactInfoItem>
                    )}

                    {normalizedContactInfo.phone && (
                      <S.ContactInfoItem>
                        <S.ContactInfoIcon>📞</S.ContactInfoIcon>
                        <S.ContactInfoText $textColor={normalizedStyling.textColor}>
                          {normalizedContactInfo.phone}
                        </S.ContactInfoText>
                      </S.ContactInfoItem>
                    )}

                    {normalizedContactInfo.email && (
                      <S.ContactInfoItem>
                        <S.ContactInfoIcon>📧</S.ContactInfoIcon>
                        <S.ContactInfoText $textColor={normalizedStyling.textColor}>
                          {normalizedContactInfo.email}
                        </S.ContactInfoText>
                      </S.ContactInfoItem>
                    )}

                    {normalizedContactInfo.hours && (
                      <S.ContactInfoItem>
                        <S.ContactInfoIcon>🕐</S.ContactInfoIcon>
                        <S.ContactInfoText $textColor={normalizedStyling.textColor}>
                          {normalizedContactInfo.hours}
                        </S.ContactInfoText>
                      </S.ContactInfoItem>
                    )}
                  </S.ContactInfoList>
                </Card>
              </S.ContactInfoWrapper>
            )}
          </S.MainContent>
        </S.Content>
      </S.Container>
    </S.Section>
  )
}
