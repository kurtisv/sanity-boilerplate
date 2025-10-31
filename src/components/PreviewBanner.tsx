'use client'

import styled from 'styled-components'

const Banner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #ff6b35;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 9999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const ExitLink = styled.a`
  color: white;
  text-decoration: underline;
  margin-left: 0.5rem;
  
  &:hover {
    text-decoration: none;
  }
`

export default function PreviewBanner() {
  return (
    <Banner>
      🔍 Mode Aperçu - Vous voyez les brouillons
      <ExitLink href="/api/exit-preview">
        Quitter l'aperçu
      </ExitLink>
    </Banner>
  )
}
