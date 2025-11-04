'use client'

import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  max-width: var(--max-width-4xl);
  margin: 0 auto;
  padding: var(--spacing-8);
`

const Title = styled.h1`
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-8);
`

const Card = styled.div`
  background: var(--color-white);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-gray-200);
`

const Description = styled.p`
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-8);
  line-height: var(--line-height-relaxed);
`

const Button = styled.button<{ $loading?: boolean }>`
  background-color: ${props => props.$loading ? 'var(--color-gray-400)' : 'var(--color-primary)'};
  color: var(--color-white);
  padding: var(--spacing-4) var(--spacing-8);
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: ${props => props.$loading ? 'not-allowed' : 'pointer'};
  transition: var(--transition-base);
  
  &:hover {
    background-color: ${props => props.$loading ? 'var(--color-gray-400)' : 'var(--color-primary-dark)'};
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

export default function AdminFaq() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setStatus(null)
    
    try {
      const response = await fetch('/api/setup-faq', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus({ type: 'success', message: 'Page FAQ créée avec succès dans Sanity Studio!' })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setStatus({ type: 'error', message: data.error || 'Erreur lors de la création' })
      }
    } catch (error) {
      console.error('Erreur:', error)
      setStatus({ type: 'error', message: 'Erreur de connexion à l\'API' })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Container>
      <Title>Administration - Page FAQ</Title>
      
      <Card>
        <Description>
          Créez automatiquement la page "FAQ" dans Sanity Studio avec des questions 
          fréquentes organisées par catégories, recherche intégrée et section contact.
        </Description>
        
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating}
          $loading={isGenerating}
        >
          {isGenerating ? 'Génération en cours...' : 'Créer la Page FAQ dans Studio'}
        </Button>
        
        {status && (
          <Status $type={status.type}>
            {status.message}
          </Status>
        )}
      </Card>
    </Container>
  )
}
