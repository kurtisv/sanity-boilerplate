'use client'

import Link from 'next/link'
import styled from 'styled-components'

/**
 * DemoNavigation Component
 * 
 * Bouton flottant pour accéder à la page de démonstration
 */

const DemoNavContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`

const DemoButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
  transition: all 0.2s ease;
  
  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 20px 35px -5px rgba(59, 130, 246, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
`

export default function DemoNavigation() {
  return (
    <DemoNavContainer>
      <DemoButton href="/demo">
        🚀 Voir la Démo
      </DemoButton>
    </DemoNavContainer>
  )
}
