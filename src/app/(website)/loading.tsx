'use client'

import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const Container = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  animation: ${fadeIn} 0.3s ease-in-out;
`

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1.5rem;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  animation: ${pulse} 2s ease-in-out infinite;
`

const Description = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  text-align: center;
  max-width: 400px;
  line-height: 1.5;
`

const SkeletonContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 3rem;
  padding: 0 1rem;
`

const SkeletonBlock = styled.div<{ $height?: string; $width?: string; $marginBottom?: string }>`
  height: ${props => props.$height || '1rem'};
  width: ${props => props.$width || '100%'};
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  border-radius: 0.25rem;
  margin-bottom: ${props => props.$marginBottom || '1rem'};
`

const SkeletonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

export default function Loading() {
  return (
    <Container>
      <Spinner />
      <Title>Chargement en cours...</Title>
      <Description>
        Nous préparons le contenu pour vous. Cela ne devrait prendre qu'un instant.
      </Description>
      
      {/* Skeleton loader pour simuler le contenu */}
      <SkeletonContainer>
        {/* Titre de page */}
        <SkeletonBlock $height="2.5rem" $width="60%" $marginBottom="2rem" />
        
        {/* Paragraphes */}
        <SkeletonBlock $height="1rem" $width="100%" />
        <SkeletonBlock $height="1rem" $width="85%" />
        <SkeletonBlock $height="1rem" $width="92%" $marginBottom="2rem" />
        
        {/* Grille de contenu */}
        <SkeletonRow>
          <SkeletonBlock $height="8rem" $width="100%" />
          <SkeletonBlock $height="8rem" $width="100%" />
          <SkeletonBlock $height="8rem" $width="100%" />
        </SkeletonRow>
        
        {/* Plus de contenu */}
        <SkeletonBlock $height="1rem" $width="100%" />
        <SkeletonBlock $height="1rem" $width="78%" />
        <SkeletonBlock $height="1rem" $width="65%" />
      </SkeletonContainer>
    </Container>
  )
}
