'use client'

import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`

const Icon = styled.div`
  font-size: 5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  line-height: 1.2;
`

const Description = styled.p`
  font-size: 1.25rem;
  margin: 0 0 2rem 0;
  max-width: 600px;
  line-height: 1.6;
  opacity: 0.9;
`

const EstimatedTime = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 2rem 0;
  max-width: 400px;
  
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.125rem;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    color: #fbbf24;
  }
`

const ContactInfo = styled.div`
  margin-top: 3rem;
  opacity: 0.8;
  
  p {
    margin: 0.5rem 0;
    font-size: 1rem;
  }
  
  a {
    color: #fbbf24;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  margin-top: 2rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }
`

export default function MaintenancePage() {
  // Vous pouvez récupérer ces informations depuis Sanity ou les variables d'environnement
  const estimatedTime = process.env.NEXT_PUBLIC_MAINTENANCE_ETA || '2 heures'
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@yoursite.com'
  
  return (
    <Container>
      <Icon>🔧</Icon>
      <Title>Maintenance en cours</Title>
      <Description>
        Nous effectuons actuellement une maintenance programmée pour améliorer votre expérience. 
        Le site sera de nouveau disponible très bientôt.
      </Description>
      
      <EstimatedTime>
        <h3>Temps estimé</h3>
        <p>{estimatedTime}</p>
      </EstimatedTime>
      
      <ContactInfo>
        <p>Une question urgente ?</p>
        <p>Contactez-nous : <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
        <p>Ou suivez-nous sur nos réseaux sociaux pour les mises à jour</p>
      </ContactInfo>
      
      <BackButton href="/">
        Retour à l'accueil
      </BackButton>
    </Container>
  )
}
