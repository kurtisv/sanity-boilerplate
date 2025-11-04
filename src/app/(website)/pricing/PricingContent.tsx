'use client'

import React from 'react'
import styled from 'styled-components'

// Utilisation des design tokens du système
const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-16) var(--spacing-6);
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--spacing-8) var(--spacing-4);
  }
`

const Content = styled.div`
  max-width: var(--max-width-6xl);
  margin: 0 auto;
  text-align: center;
  color: var(--color-white);
`

const Title = styled.h1`
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-6);
  
  @media (max-width: var(--breakpoint-md)) {
    font-size: var(--font-size-4xl);
  }
`

const Subtitle = styled.p`
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-16);
  opacity: 0.9;
  line-height: var(--line-height-relaxed);
`

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-16);
`

const PlanCard = styled.div<{ $featured?: boolean }>`
  background: var(--color-white);
  color: var(--color-gray-900);
  padding: var(--spacing-8);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-xl);
  position: relative;
  transform: ${props => props.$featured ? 'scale(1.05)' : 'scale(1)'};
  border: ${props => props.$featured ? '3px solid var(--color-primary)' : '1px solid var(--color-gray-200)'};
  
  ${props => props.$featured && `
    &::before {
      content: 'Recommandé';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-primary);
      color: var(--color-white);
      padding: var(--spacing-2) var(--spacing-4);
      border-radius: var(--border-radius-full);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
    }
  `}
`

const PlanName = styled.h3`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-4);
  color: var(--color-gray-900);
`

const PlanPrice = styled.div`
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
`

const PlanPeriod = styled.div`
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-6);
`

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: var(--spacing-8);
  
  li {
    padding: var(--spacing-2) 0;
    color: var(--color-gray-700);
    
    &::before {
      content: '✅';
      margin-right: var(--spacing-2);
    }
  }
`

const PlanButton = styled.button<{ $primary?: boolean }>`
  width: 100%;
  padding: var(--spacing-4) var(--spacing-6);
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);
  
  background-color: ${props => props.$primary ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.$primary ? 'var(--color-white)' : 'var(--color-primary)'};
  border: ${props => props.$primary ? 'none' : '2px solid var(--color-primary)'};
  
  &:hover {
    background-color: ${props => props.$primary ? 'var(--color-primary-dark)' : 'var(--color-primary)'};
    color: var(--color-white);
    transform: translateY(-2px);
  }
`

const ContactSection = styled.div`
  text-align: center;
  
  p {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-6);
    opacity: 0.9;
  }
`

const ContactButton = styled.button`
  background-color: var(--color-white);
  color: var(--color-primary);
  padding: var(--spacing-4) var(--spacing-8);
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`

export default function PricingContent() {
  return (
    <Container>
      <Content>
        <Title>Nos Tarifs</Title>
        <Subtitle>
          Des solutions adaptées à tous vos besoins de développement web
        </Subtitle>
        
        <PlansGrid>
          <PlanCard>
            <PlanName>Starter</PlanName>
            <PlanPrice>2 500€</PlanPrice>
            <PlanPeriod>Site vitrine</PlanPeriod>
            <PlanFeatures>
              <li>Site vitrine 5 pages</li>
              <li>Design responsive</li>
              <li>Optimisation SEO de base</li>
              <li>Formulaire de contact</li>
              <li>1 mois de support</li>
            </PlanFeatures>
            <PlanButton onClick={() => window.location.href = '/contact'}>
              Choisir ce plan
            </PlanButton>
          </PlanCard>
          
          <PlanCard $featured>
            <PlanName>Professional</PlanName>
            <PlanPrice>5 500€</PlanPrice>
            <PlanPeriod>Site complet</PlanPeriod>
            <PlanFeatures>
              <li>Site complet avec CMS</li>
              <li>Design sur mesure</li>
              <li>Optimisation SEO avancée</li>
              <li>Intégrations tierces</li>
              <li>Formation utilisateur</li>
              <li>3 mois de support</li>
            </PlanFeatures>
            <PlanButton $primary onClick={() => window.location.href = '/contact'}>
              Choisir ce plan
            </PlanButton>
          </PlanCard>
          
          <PlanCard>
            <PlanName>Enterprise</PlanName>
            <PlanPrice>Sur devis</PlanPrice>
            <PlanPeriod>Solution sur mesure</PlanPeriod>
            <PlanFeatures>
              <li>Application web complexe</li>
              <li>Architecture personnalisée</li>
              <li>Intégrations avancées</li>
              <li>Support prioritaire</li>
              <li>Maintenance incluse</li>
              <li>Évolutions continues</li>
            </PlanFeatures>
            <PlanButton onClick={() => window.location.href = '/contact'}>
              Nous contacter
            </PlanButton>
          </PlanCard>
        </PlansGrid>
        
        <ContactSection>
          <p>
            Besoin d'une solution personnalisée ? Contactez-nous pour un devis sur mesure.
          </p>
          <ContactButton onClick={() => window.location.href = '/contact'}>
            Demander un Devis Gratuit
          </ContactButton>
        </ContactSection>
      </Content>
    </Container>
  )
}
