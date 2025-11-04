'use client'

import React, { useState } from 'react'
import styled from 'styled-components'

// Utilisation des design tokens du système
const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-16) var(--spacing-6);
  background-color: var(--color-gray-50);
  
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--spacing-8) var(--spacing-4);
  }
`

const Content = styled.div`
  max-width: var(--max-width-4xl);
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-16);
`

const Title = styled.h1`
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-6);
  
  @media (max-width: var(--breakpoint-md)) {
    font-size: var(--font-size-4xl);
  }
`

const Subtitle = styled.p`
  font-size: var(--font-size-xl);
  color: var(--color-gray-600);
  line-height: var(--line-height-relaxed);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-12);
  
  @media (max-width: var(--breakpoint-lg)) {
    grid-template-columns: 1fr;
    gap: var(--spacing-8);
  }
`

const FormCard = styled.div`
  background: var(--color-white);
  padding: var(--spacing-8);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-gray-200);
`

const InfoCard = styled.div`
  background: var(--color-white);
  padding: var(--spacing-8);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-gray-200);
`

const FormTitle = styled.h2`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-6);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-2);
`

const Input = styled.input`
  padding: var(--spacing-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  transition: var(--transition-base);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`

const Textarea = styled.textarea`
  padding: var(--spacing-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: var(--transition-base);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`

const SubmitButton = styled.button<{ $loading?: boolean }>`
  background-color: ${props => props.$loading ? 'var(--color-gray-400)' : 'var(--color-primary)'};
  color: var(--color-white);
  padding: var(--spacing-4) var(--spacing-6);
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: ${props => props.$loading ? 'not-allowed' : 'pointer'};
  transition: var(--transition-base);
  margin-top: var(--spacing-4);
  
  &:hover {
    background-color: ${props => props.$loading ? 'var(--color-gray-400)' : 'var(--color-primary-dark)'};
  }
`

const InfoTitle = styled.h3`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-6);
`

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
  
  &:last-child {
    margin-bottom: 0;
  }
`

const InfoIcon = styled.div`
  font-size: var(--font-size-lg);
  margin-top: var(--spacing-1);
`

const InfoText = styled.div`
  flex: 1;
  
  strong {
    display: block;
    font-weight: var(--font-weight-semibold);
    color: var(--color-gray-900);
    margin-bottom: var(--spacing-1);
  }
  
  span {
    color: var(--color-gray-600);
    font-size: var(--font-size-sm);
  }
`

const Status = styled.div<{ $type: 'success' | 'error' }>`
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
  margin-top: var(--spacing-4);
  background-color: ${props => props.$type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
  color: var(--color-white);
  font-weight: var(--font-weight-medium);
`

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    // Simulation d'envoi (remplacer par vraie API)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStatus({ type: 'success', message: 'Message envoyé avec succès ! Nous vous répondrons sous 24h.' })
      setFormData({ name: '', email: '', company: '', subject: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', message: 'Erreur lors de l\'envoi. Veuillez réessayer.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <Title>Contactez-Nous</Title>
          <Subtitle>
            Parlons de votre projet ! Notre équipe d'experts vous accompagne 
            de l'idée à la réalisation.
          </Subtitle>
        </Header>

        <Grid>
          <FormCard>
            <FormTitle>Envoyez-nous un message</FormTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="company">Entreprise</Label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nom de votre entreprise"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">Sujet *</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Sujet de votre demande"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Décrivez votre projet, vos besoins et vos objectifs..."
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting} $loading={isSubmitting}>
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le Message'}
              </SubmitButton>

              {status && (
                <Status $type={status.type}>
                  {status.message}
                </Status>
              )}
            </Form>
          </FormCard>

          <InfoCard>
            <InfoTitle>Informations de Contact</InfoTitle>
            
            <InfoItem>
              <InfoIcon>📧</InfoIcon>
              <InfoText>
                <strong>Email</strong>
                <span>contact@votreentreprise.com</span>
              </InfoText>
            </InfoItem>

            <InfoItem>
              <InfoIcon>📞</InfoIcon>
              <InfoText>
                <strong>Téléphone</strong>
                <span>+33 1 23 45 67 89</span>
              </InfoText>
            </InfoItem>

            <InfoItem>
              <InfoIcon>📍</InfoIcon>
              <InfoText>
                <strong>Adresse</strong>
                <span>Paris, France</span>
              </InfoText>
            </InfoItem>

            <InfoItem>
              <InfoIcon>⏰</InfoIcon>
              <InfoText>
                <strong>Horaires</strong>
                <span>Lun-Ven 9h-18h</span>
              </InfoText>
            </InfoItem>

            <InfoItem>
              <InfoIcon>⚡</InfoIcon>
              <InfoText>
                <strong>Réponse</strong>
                <span>Sous 24h maximum</span>
              </InfoText>
            </InfoItem>
          </InfoCard>
        </Grid>
      </Content>
    </Container>
  )
}
