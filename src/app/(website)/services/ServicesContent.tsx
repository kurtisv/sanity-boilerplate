'use client'

import React from 'react'
import styled from 'styled-components'

// Utilisation des design tokens du système
const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-16) var(--spacing-6);
  background-color: var(--color-gray-50);
  
  @media (max-width: 768px) {
    padding: var(--spacing-8) var(--spacing-4);
  }
`

const Title = styled.h1`
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: var(--spacing-12);
  
  // Utilisation des dégradés du système
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-4xl);
  }
`

const Content = styled.div`
  max-width: var(--max-width-4xl);
  margin: 0 auto;
  text-align: center;
`

export default function ServicesContent() {
  return (
    <Container>
      <Content>
        <Title>Nos Services</Title>
        <p>Contenu de la page Services en attente de génération dans Sanity Studio.</p>
      </Content>
    </Container>
  )
}
