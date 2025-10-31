import styled from 'styled-components'

/**
 * Container - Wrapper réutilisable pour tous les composants
 * 
 * - Full width (100%)
 * - Contenu max 1200px centré
 * - Padding responsive
 * 
 * Utilisation:
 * <Container>
 *   Votre contenu ici
 * </Container>
 * 
 * Ou avec section full-width:
 * <Section>
 *   <Container>
 *     Votre contenu ici
 *   </Container>
 * </Section>
 */

// === SECTION (Full Width Background) ===
export const Section = styled.section<{ $bgColor?: string }>`
  width: 100%;
  background-color: ${props => props.$bgColor || 'transparent'};
`

// === CONTAINER (Max 1200px Content) ===
export const Container = styled.div<{ $noPadding?: boolean }>`
  max-width: var(--max-width-container);
  margin: 0 auto;
  padding: ${props => props.$noPadding ? '0' : '0 var(--spacing-6)'};
  
  @media (max-width: 768px) {
    padding: ${props => props.$noPadding ? '0' : '0 var(--spacing-4)'};
  }
`

export default Container
