'use client'

import styled from 'styled-components'
import Link from 'next/link'
import { useEffect } from 'react'

const Container = styled.main`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  text-align: center;
`

const ErrorCode = styled.div`
  font-size: clamp(3rem, 12vw, 6rem);
  font-weight: 900;
  color: #ef4444;
  line-height: 1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Title = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
  line-height: 1.2;
`

const Description = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0 0 1rem 0;
  max-width: 500px;
  line-height: 1.6;
`

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0 2rem 0;
  max-width: 600px;
  
  code {
    background: #fee2e2;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.875rem;
    color: #dc2626;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
  
  ${props => props.$variant === 'primary' ? `
    background: #ef4444;
    color: white;
    
    &:hover {
      background: #dc2626;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    }
  ` : `
    background: transparent;
    color: #6b7280;
    border: 2px solid #e5e7eb;
    
    &:hover {
      border-color: #ef4444;
      color: #ef4444;
      transform: translateY(-1px);
    }
  `}
`

const LinkButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  min-width: 140px;
  background: transparent;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  
  &:hover {
    border-color: #ef4444;
    color: #ef4444;
    transform: translateY(-1px);
  }
`

const Illustration = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  opacity: 0.7;
`

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log l'erreur pour le debugging
    console.error('Application error:', error)
  }, [error])

  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <Container>
      <Illustration>⚠️</Illustration>
      <ErrorCode>500</ErrorCode>
      <Title>Une erreur est survenue</Title>
      <Description>
        Désolé, quelque chose s'est mal passé. Notre équipe a été notifiée et travaille sur le problème.
      </Description>
      
      {isDevelopment && error.message && (
        <ErrorMessage>
          <strong>Erreur de développement :</strong><br />
          <code>{error.message}</code>
          {error.digest && (
            <>
              <br /><br />
              <strong>Digest :</strong> <code>{error.digest}</code>
            </>
          )}
        </ErrorMessage>
      )}
      
      <ButtonGroup>
        <Button onClick={reset} $variant="primary">
          Réessayer
        </Button>
        <LinkButton href="/">
          Retour à l'accueil
        </LinkButton>
      </ButtonGroup>
    </Container>
  )
}
