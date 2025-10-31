'use client'

import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
  font-size: clamp(4rem, 15vw, 8rem);
  font-weight: 900;
  color: #3b82f6;
  line-height: 1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
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
  margin: 0 0 2rem 0;
  max-width: 500px;
  line-height: 1.6;
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

const Button = styled(Link)<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  min-width: 140px;
  
  ${props => props.$variant === 'primary' ? `
    background: #3b82f6;
    color: white;
    
    &:hover {
      background: #2563eb;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
  ` : `
    background: transparent;
    color: #6b7280;
    border: 2px solid #e5e7eb;
    
    &:hover {
      border-color: #3b82f6;
      color: #3b82f6;
      transform: translateY(-1px);
    }
  `}
`

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: 2px solid #e5e7eb;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
  
  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
    transform: translateY(-1px);
  }
`

const Illustration = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  opacity: 0.7;
`

export default function NotFound() {
  const router = useRouter()

  return (
    <Container>
      <Illustration>🔍</Illustration>
      <ErrorCode>404</ErrorCode>
      <Title>Page introuvable</Title>
      <Description>
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée. 
        Vérifiez l'URL ou retournez à l'accueil.
      </Description>
      <ButtonGroup>
        <Button href="/" $variant="primary">
          Retour à l'accueil
        </Button>
        <BackButton onClick={() => router.back()}>
          Page précédente
        </BackButton>
      </ButtonGroup>
    </Container>
  )
}
