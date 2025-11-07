'use client'

import { useState } from 'react'
import styled from 'styled-components'

// Types de projets disponibles
const projectTypes = [
  { id: 'corporate', name: 'Site vitrine', icon: '🏢', desc: 'Site professionnel' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒', desc: 'Boutique en ligne' },
  { id: 'blog', name: 'Blog', icon: '📰', desc: 'Site de contenu' },
  { id: 'portfolio', name: 'Portfolio', icon: '🎨', desc: 'Showcase projets' },
  { id: 'landing', name: 'Landing page', icon: '🚀', desc: 'Page produit' },
  { id: 'restaurant', name: 'Restaurant', icon: '🍽️', desc: 'Menu & réservations' }
]

// Styles de design
const designStyles = [
  { id: 'modern', name: 'Moderne', icon: '✨', colors: ['#667eea', '#764ba2'] },
  { id: 'professional', name: 'Professionnel', icon: '💼', colors: ['#1e3a8a', '#3b82f6'] },
  { id: 'creative', name: 'Créatif', icon: '🎨', colors: ['#ec4899', '#8b5cf6'] },
  { id: 'elegant', name: 'Élégant', icon: '👑', colors: ['#1f2937', '#6b7280'] }
]

// Pages par défaut selon le type de projet
const pageTemplates: Record<string, string[]> = {
  corporate: ['Accueil', 'Services', 'À propos', 'Contact'],
  ecommerce: ['Accueil', 'Boutique', 'Panier', 'Contact'],
  blog: ['Accueil', 'Articles', 'À propos', 'Contact'],
  portfolio: ['Accueil', 'Projets', 'À propos', 'Contact'],
  landing: ['Accueil'],
  restaurant: ['Accueil', 'Menu', 'Réservation', 'Contact']
}

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 10px;
  font-weight: 700;
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
`

const InfoBanner = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  margin: 0 auto 30px;
  max-width: 800px;
  color: white;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.6;
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const Form = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`

const Section = styled.div`
  margin-bottom: 35px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #1f2937;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`

const SectionDesc = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 15px;
`

const Grid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.$cols || 3}, 1fr);
  gap: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Card = styled.div<{ $selected?: boolean }>`
  padding: 15px;
  border: 2px solid ${p => p.$selected ? '#667eea' : '#e5e7eb'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  background: ${p => p.$selected ? '#f0f4ff' : 'white'};

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }
`

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 8px;
`

const CardTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 3px;
`

const CardDesc = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 12px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 12px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;
  font-size: 0.95rem;
`

const ColorPreview = styled.div<{ $colors: string[] }>`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  justify-content: center;
`

const ColorDot = styled.div<{ $color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${p => p.$color};
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const PagesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const PageTag = styled.div<{ $removable?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f0f4ff;
  border: 1px solid #667eea;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 500;
  cursor: ${p => p.$removable ? 'pointer' : 'default'};
  
  &:hover {
    background: ${p => p.$removable ? '#e0e7ff' : '#f0f4ff'};
  }
`

const RemoveIcon = styled.span`
  font-size: 1.1rem;
  line-height: 1;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 30px;
`

const Button = styled.button<{ $primary?: boolean; $fullWidth?: boolean }>`
  flex: ${p => p.$fullWidth ? '1' : 'initial'};
  padding: 14px 28px;
  background: ${p => p.$primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f3f4f6'};
  color: ${p => p.$primary ? 'white' : '#374151'};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${p => p.$primary ? 'rgba(102, 126, 234, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const Summary = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`

const SummaryTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: #1f2937;
  font-weight: 600;
`

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
  
  &:last-child {
    border-bottom: none;
  }
`

const SummaryLabel = styled.span`
  color: #6b7280;
  font-size: 0.9rem;
`

const SummaryValue = styled.span`
  color: #1f2937;
  font-weight: 600;
  font-size: 0.9rem;
`

const ProgressCard = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
`

const ProgressFill = styled.div<{ $progress: number }>`
  width: ${p => p.$progress}%;
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s;
`

const ProgressText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 10px;
`

const ProgressMessage = styled.div`
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 20px;
`

const Spinner = styled.div`
  font-size: 3rem;
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

export default function AutoGeneratePage() {
  const [config, setConfig] = useState({
    projectType: '',
    siteName: '',
    siteDescription: '',
    industry: '',
    designStyle: '',
    primaryColor: '#667eea',
    pages: [] as string[],
    targetAudience: '',
    keyFeatures: ''
  })
  
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 10, message: '' })

  const updateConfig = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }))
    
    // Auto-sélectionner les pages selon le type de projet
    if (key === 'projectType' && value) {
      setConfig(prev => ({ ...prev, pages: pageTemplates[value] || [] }))
    }
    
    // Auto-sélectionner la couleur selon le style
    if (key === 'designStyle' && value) {
      const style = designStyles.find(s => s.id === value)
      if (style) {
        setConfig(prev => ({ ...prev, primaryColor: style.colors[0] }))
      }
    }
  }

  const togglePage = (page: string) => {
    setConfig(prev => ({
      ...prev,
      pages: prev.pages.includes(page)
        ? prev.pages.filter(p => p !== page)
        : [...prev.pages, page]
    }))
  }

  const removePage = (page: string) => {
    setConfig(prev => ({
      ...prev,
      pages: prev.pages.filter(p => p !== page)
    }))
  }

  const isValid = () => {
    return config.projectType && 
           config.siteName && 
           config.siteDescription && 
           config.designStyle && 
           config.pages.length > 0
  }

  const handleGenerate = async () => {
    if (!isValid()) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    setGenerating(true)
    setProgress({ current: 0, total: 10, message: 'Initialisation...' })

    try {
      const response = await fetch('/api/auto-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      })

      if (!response.ok) throw new Error('Erreur lors de la génération')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n').filter(Boolean)

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6))
              
              if (data.type === 'progress') {
                setProgress(data.progress)
              } else if (data.type === 'complete') {
                setGenerating(false)
                alert('✅ Site généré avec succès !')
                window.location.href = '/studio'
              } else if (data.type === 'error') {
                throw new Error(data.error)
              }
            }
          }
        }
      }
    } catch (error: any) {
      console.error(error)
      alert('❌ Erreur: ' + error.message)
      setGenerating(false)
    }
  }

  if (generating) {
    return (
      <Container>
        <Header>
          <Title>🤖 Génération en cours...</Title>
        </Header>

        <ProgressCard>
          <ProgressBar>
            <ProgressFill $progress={(progress.current / progress.total) * 100} />
          </ProgressBar>
          
          <ProgressText>
            {progress.current} / {progress.total} étapes
          </ProgressText>
          
          <ProgressMessage>{progress.message}</ProgressMessage>
          
          <Spinner>⚙️</Spinner>
        </ProgressCard>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <Title>🤖 Génération Automatique de Site</Title>
        <Subtitle>Créez votre site complet en quelques minutes</Subtitle>
      </Header>

      <InfoBanner>
        <strong>🎯 Comment ça marche ?</strong><br />
        Remplissez le formulaire ci-dessous avec les informations de votre projet.
        Notre système d'agents IA va générer automatiquement votre site avec des pages,
        blocs et images optimisés. Tout est personnalisable ensuite dans Sanity Studio.
      </InfoBanner>

      <Form>
        {/* SECTION 1: Type de projet */}
        <Section>
          <SectionTitle>
            <span>1️⃣</span> Type de projet
          </SectionTitle>
          <SectionDesc>Sélectionnez le type de site que vous souhaitez créer</SectionDesc>
          <Grid $cols={3}>
            {projectTypes.map(type => (
              <Card
                key={type.id}
                $selected={config.projectType === type.id}
                onClick={() => updateConfig('projectType', type.id)}
              >
                <CardIcon>{type.icon}</CardIcon>
                <CardTitle>{type.name}</CardTitle>
                <CardDesc>{type.desc}</CardDesc>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* SECTION 2: Informations de base */}
        <Section>
          <SectionTitle>
            <span>2️⃣</span> Informations de base
          </SectionTitle>
          <Label>Nom de votre entreprise/site *</Label>
          <Input
            placeholder="Ex: Mon Entreprise"
            value={config.siteName}
            onChange={e => updateConfig('siteName', e.target.value)}
          />
          
          <Label>Description courte (1-2 phrases) *</Label>
          <TextArea
            placeholder="Ex: Nous sommes une entreprise innovante spécialisée dans..."
            value={config.siteDescription}
            onChange={e => updateConfig('siteDescription', e.target.value)}
            rows={2}
          />
          
          <Label>Secteur d'activité *</Label>
          <Input
            placeholder="Ex: Technologie, Santé, Commerce, etc."
            value={config.industry}
            onChange={e => updateConfig('industry', e.target.value)}
          />
          
          <Label>Public cible (optionnel)</Label>
          <Input
            placeholder="Ex: Entreprises B2B, Particuliers, Professionnels..."
            value={config.targetAudience}
            onChange={e => updateConfig('targetAudience', e.target.value)}
          />
          
          <Label>Fonctionnalités clés (optionnel)</Label>
          <TextArea
            placeholder="Ex: Réservation en ligne, Paiement sécurisé, Blog..."
            value={config.keyFeatures}
            onChange={e => updateConfig('keyFeatures', e.target.value)}
            rows={2}
          />
        </Section>

        {/* SECTION 3: Style de design */}
        <Section>
          <SectionTitle>
            <span>3️⃣</span> Style de design
          </SectionTitle>
          <SectionDesc>Choisissez l'ambiance visuelle de votre site</SectionDesc>
          <Grid $cols={4}>
            {designStyles.map(style => (
              <Card
                key={style.id}
                $selected={config.designStyle === style.id}
                onClick={() => updateConfig('designStyle', style.id)}
              >
                <CardIcon>{style.icon}</CardIcon>
                <CardTitle>{style.name}</CardTitle>
                <ColorPreview $colors={style.colors}>
                  {style.colors.map(color => (
                    <ColorDot key={color} $color={color} />
                  ))}
                </ColorPreview>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* SECTION 4: Pages */}
        <Section>
          <SectionTitle>
            <span>4️⃣</span> Pages du site
          </SectionTitle>
          <SectionDesc>
            {config.projectType 
              ? `Pages suggérées pour un site ${projectTypes.find(t => t.id === config.projectType)?.name.toLowerCase()}. Vous pouvez ajouter ou retirer des pages.`
              : 'Sélectionnez d\'abord un type de projet pour voir les pages suggérées'}
          </SectionDesc>
          
          {config.pages.length > 0 ? (
            <PagesList>
              {config.pages.map(page => (
                <PageTag key={page} $removable onClick={() => removePage(page)}>
                  {page}
                  <RemoveIcon>×</RemoveIcon>
                </PageTag>
              ))}
            </PagesList>
          ) : (
            <PagesList>
              <PageTag>Aucune page sélectionnée</PageTag>
            </PagesList>
          )}
          
          <Input
            placeholder="Ajouter une page personnalisée (appuyez sur Entrée)"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                togglePage(e.currentTarget.value)
                e.currentTarget.value = ''
              }
            }}
            style={{ marginTop: '12px' }}
          />
        </Section>

        {/* RÉSUMÉ */}
        <Summary>
          <SummaryTitle>📋 Résumé de votre configuration</SummaryTitle>
          <SummaryItem>
            <SummaryLabel>Type de projet</SummaryLabel>
            <SummaryValue>{projectTypes.find(t => t.id === config.projectType)?.name || '-'}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Nom du site</SummaryLabel>
            <SummaryValue>{config.siteName || '-'}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Style de design</SummaryLabel>
            <SummaryValue>{designStyles.find(s => s.id === config.designStyle)?.name || '-'}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>Nombre de pages</SummaryLabel>
            <SummaryValue>{config.pages.length}</SummaryValue>
          </SummaryItem>
        </Summary>

        {/* BOUTONS */}
        <ButtonGroup>
          <Button $primary $fullWidth onClick={handleGenerate} disabled={!isValid()}>
            🚀 Générer mon site
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  )
}
