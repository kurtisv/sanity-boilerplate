import styled from 'styled-components'
import Link from 'next/link'

// === FOOTER CONTAINER (Full Width) ===
export const FooterContainer = styled.footer<{ $bgColor?: string; $textColor?: string }>`
  width: 100%;
  background-color: ${props => props.$bgColor || 'var(--color-gray-900)'};
  color: ${props => props.$textColor || 'var(--color-white)'};
`

// === FOOTER CONTENT (Max 1200px) ===
export const FooterContent = styled.div`
  max-width: var(--max-width-container);
  margin: 0 auto;
  padding: var(--spacing-16) var(--spacing-6) var(--spacing-8);
  
  @media (max-width: 768px) {
    padding: var(--spacing-12) var(--spacing-4) var(--spacing-6);
  }
`

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-12);
  margin-bottom: var(--spacing-12);
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-8);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
  }
`

export const FooterTextSection = styled.div`
  grid-column: span 1;
  
  @media (min-width: 1024px) {
    grid-column: span 2;
  }
`

export const FooterText = styled.p`
  color: var(--color-gray-400);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-base);
  margin: 0;
`

export const FooterColumn = styled.div``

export const ColumnTitle = styled.h3`
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-4);
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: var(--font-size-sm);
`

export const FooterLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
`

export const FooterLinkItem = styled.li``

export const FooterLink = styled(Link)`
  color: var(--color-gray-400);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
  display: inline-block;
  
  &:hover {
    color: var(--color-white);
    transform: translateX(4px);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: var(--border-radius-base);
  }
`

export const SocialSection = styled.div`
  padding-top: var(--spacing-8);
  padding-bottom: var(--spacing-8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  
  @media (max-width: 640px) {
    padding-top: var(--spacing-6);
    padding-bottom: var(--spacing-6);
  }
`

export const SocialLinks = styled.div`
  display: flex;
  gap: var(--spacing-4);
  align-items: center;
`

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-gray-400);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-full);
  transition: all var(--transition-base);
  
  &:hover {
    color: var(--color-white);
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`

// === COPYRIGHT SECTION ===
export const CopyrightSection = styled.div`
  text-align: center;
  padding-top: var(--spacing-8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 640px) {
    padding-top: var(--spacing-6);
  }
`

export const Copyright = styled.p`
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  margin: 0;
`
