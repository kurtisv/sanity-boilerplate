'use client'

import React from 'react'
import styled from 'styled-components'

// Utilisation des design tokens du système
const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-16) var(--spacing-6);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--spacing-8) var(--spacing-4);
  }
`

const Content = styled.div`
  max-width: var(--max-width-4xl);
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
  margin-bottom: var(--spacing-12);
  opacity: 0.9;
  line-height: var(--line-height-relaxed);
`

const Description = styled.div`
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  opacity: 0.8;
  
  p {
    margin-bottom: var(--spacing-6);
  }
`

const Button = styled.button`
  background-color: var(--color-white);
  color: var(--color-primary);
  padding: var(--spacing-4) var(--spacing-8);
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);
  margin-top: var(--spacing-8);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`

export default function AboutContent() {
  return (
    <Container>
      <Content>
        <Title>À Propos de Nous</Title>
        <Subtitle>
          Experts en développement web moderne avec Next.js et Sanity CMS
        </Subtitle>
        <Description>
          <p>
            Notre équipe se spécialise dans la création de sites web performants et maintenables 
            en utilisant les technologies les plus récentes du marché.
          </p>
          <p>
            Avec Next.js 16, React 19, TypeScript et Sanity CMS, nous livrons des solutions 
            professionnelles qui répondent aux besoins de nos clients.
          </p>
        </Description>
        <Button onClick={() => window.location.href = '/contact'}>
          Nous Contacter
        </Button>
      </Content>
    </Container>
  )
}
