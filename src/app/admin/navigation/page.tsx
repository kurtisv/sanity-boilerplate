'use client'

import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-8);
  background-color: #f8fafc;
`

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: var(--spacing-8);
`

const Title = styled.h1`
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: #1a202c;
  margin-bottom: var(--spacing-2);
`

const Subtitle = styled.p`
  color: #4a5568;
  font-size: var(--font-size-lg);
`

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-6);
`

const Card = styled.div`
  background: white;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
  border: 1px solid #e2e8f0;
`

const CardTitle = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: #1a202c;
  margin-bottom: var(--spacing-4);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
`

const CardDescription = styled.p`
  color: #4a5568;
  margin-bottom: var(--spacing-6);
  line-height: 1.6;
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  
  ${props => props.$variant === 'primary' ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-lg);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  ` : `
    background: #f7fafc;
    color: #4a5568;
    border: 1px solid #e2e8f0;
    
    &:hover {
      background: #edf2f7;
      border-color: #cbd5e0;
    }
  `}
`

const StatusMessage = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-sm);
  
  ${props => {
    switch (props.$type) {
      case 'success':
        return 'background: #f0fff4; color: #22543d; border: 1px solid #9ae6b4;'
      case 'error':
        return 'background: #fed7d7; color: #742a2a; border: 1px solid #feb2b2;'
      case 'info':
        return 'background: #ebf8ff; color: #2a4365; border: 1px solid #90cdf4;'
      default:
        return ''
    }
  }}
`

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: var(--spacing-4) 0;
`

const FeatureItem = styled.li`
  padding: var(--spacing-2) 0;
  color: #4a5568;
  font-size: var(--font-size-sm);
  
  &:before {
    content: '✅';
    margin-right: var(--spacing-2);
  }
`

export default function AdminNavigationPage() {
  const [headerLoading, setHeaderLoading] = useState(false)
  const [footerLoading, setFooterLoading] = useState(false)
  const [headerStatus, setHeaderStatus] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)
  const [footerStatus, setFooterStatus] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)

  const handleGenerateHeader = async () => {
    setHeaderLoading(true)
    setHeaderStatus(null)
    
    try {
      const response = await fetch('/api/setup-header', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setHeaderStatus({ 
          type: 'success', 
          message: 'Header Settings créés avec succès ! Vous pouvez maintenant les modifier dans Sanity Studio.' 
        })
      } else {
        setHeaderStatus({ 
          type: 'error', 
          message: `Erreur: ${data.error || 'Erreur inconnue'}` 
        })
      }
    } catch (error) {
      setHeaderStatus({ 
        type: 'error', 
        message: 'Erreur de connexion. Vérifiez votre configuration Sanity.' 
      })
    } finally {
      setHeaderLoading(false)
    }
  }

  const handleGenerateFooter = async () => {
    setFooterLoading(true)
    setFooterStatus(null)
    
    try {
      const response = await fetch('/api/setup-footer', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setFooterStatus({ 
          type: 'success', 
          message: 'Footer Settings créés avec succès ! Vous pouvez maintenant les modifier dans Sanity Studio.' 
        })
      } else {
        setFooterStatus({ 
          type: 'error', 
          message: `Erreur: ${data.error || 'Erreur inconnue'}` 
        })
      }
    } catch (error) {
      setFooterStatus({ 
        type: 'error', 
        message: 'Erreur de connexion. Vérifiez votre configuration Sanity.' 
      })
    } finally {
      setFooterLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <Title>🧭 Configuration Navigation</Title>
        <Subtitle>
          Générez automatiquement les configurations Header et Footer dans Sanity Studio avec tous les liens vers vos pages.
        </Subtitle>
      </Header>

      <Grid>
        {/* Header Settings */}
        <Card>
          <CardTitle>
            🔝 Header Settings
          </CardTitle>
          <CardDescription>
            Configurez la navigation principale du site avec menu déroulant et liens vers toutes les pages créées.
          </CardDescription>
          
          <FeatureList>
            <FeatureItem>Navigation complète avec 9 pages</FeatureItem>
            <FeatureItem>Menus déroulants (Pages, Légal)</FeatureItem>
            <FeatureItem>Logo et CTA configurables</FeatureItem>
            <FeatureItem>Responsive mobile/desktop</FeatureItem>
          </FeatureList>

          {headerStatus && (
            <StatusMessage $type={headerStatus.type}>
              {headerStatus.message}
            </StatusMessage>
          )}

          <Button 
            $variant="primary" 
            onClick={handleGenerateHeader}
            disabled={headerLoading}
          >
            {headerLoading ? '⏳ Génération...' : '🚀 Générer Header Settings'}
          </Button>
        </Card>

        {/* Footer Settings */}
        <Card>
          <CardTitle>
            🔽 Footer Settings
          </CardTitle>
          <CardDescription>
            Configurez le pied de page avec colonnes organisées, réseaux sociaux et copyright.
          </CardDescription>
          
          <FeatureList>
            <FeatureItem>4 colonnes organisées par catégories</FeatureItem>
            <FeatureItem>Tous les liens vers les 9 pages</FeatureItem>
            <FeatureItem>Réseaux sociaux configurables</FeatureItem>
            <FeatureItem>Texte descriptif et copyright</FeatureItem>
          </FeatureList>

          {footerStatus && (
            <StatusMessage $type={footerStatus.type}>
              {footerStatus.message}
            </StatusMessage>
          )}

          <Button 
            $variant="primary" 
            onClick={handleGenerateFooter}
            disabled={footerLoading}
          >
            {footerLoading ? '⏳ Génération...' : '🚀 Générer Footer Settings'}
          </Button>
        </Card>
      </Grid>

      {/* Instructions */}
      <Card style={{ maxWidth: '1200px', margin: 'var(--spacing-8) auto 0' }}>
        <CardTitle>
          📋 Instructions d'Utilisation
        </CardTitle>
        <CardDescription>
          <strong>Étapes recommandées :</strong>
        </CardDescription>
        <FeatureList>
          <FeatureItem>Cliquez sur "Générer Header Settings" pour créer la navigation</FeatureItem>
          <FeatureItem>Cliquez sur "Générer Footer Settings" pour créer le pied de page</FeatureItem>
          <FeatureItem>Allez dans Sanity Studio → Settings → Header/Footer pour personnaliser</FeatureItem>
          <FeatureItem>Modifiez les couleurs, textes, liens selon vos besoins</FeatureItem>
          <FeatureItem>Les changements sont automatiquement reflétés sur le site</FeatureItem>
        </FeatureList>
        
        <div style={{ marginTop: 'var(--spacing-4)', padding: 'var(--spacing-4)', background: '#f7fafc', borderRadius: 'var(--border-radius-md)' }}>
          <strong>💡 Astuce :</strong> Une fois générés, vous pouvez modifier tous les paramètres directement dans Sanity Studio sans toucher au code !
        </div>
      </Card>
    </Container>
  )
}
