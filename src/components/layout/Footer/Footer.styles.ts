import styled from 'styled-components'
import Link from 'next/link'

// === FOOTER CONTAINER (Full Width) ===
export const FooterContainer = styled.footer<{ $bgColor?: string; $textColor?: string }>`
  width: 100%;
  background-color: ${props => props.$bgColor || '#f8fafc'};
  color: ${props => props.$textColor || '#4a5568'};
  border-top: 2px solid #e2e8f0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
`

// === FOOTER CONTENT (Max 1200px) ===
export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem 1.5rem;
  }
`

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

export const FooterTextSection = styled.div`
  grid-column: span 1;
  
  @media (min-width: 1024px) {
    grid-column: span 2;
  }
`

export const FooterText = styled.p`
  color: #4a5568;
  line-height: 1.6;
  font-size: 1rem;
  margin: 0 0 1.5rem 0;
`

export const FooterColumn = styled.div``

export const ColumnTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a202c;
  letter-spacing: 0;
  text-transform: none;
`

export const FooterLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const FooterLinkItem = styled.li``

export const FooterLink = styled(Link)`
  color: #4a5568;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  display: inline-block;
  text-decoration: none;
  
  &:hover {
    color: #2b6cb0;
    transform: translateX(2px);
  }
  
  &:focus-visible {
    outline: 2px solid #2b6cb0;
    outline-offset: 2px;
    border-radius: 4px;
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
  border-top: 1px solid #e2e8f0;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`

export const Copyright = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 0;
`
