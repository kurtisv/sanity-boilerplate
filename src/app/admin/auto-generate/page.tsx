'use client'

import { useState } from 'react'
import styled from 'styled-components'

const projectTypes = [
  { id: 'corporate', name: 'Site vitrine entreprise', icon: '🏢' },
  { id: 'ecommerce', name: 'Site e-commerce', icon: '🛒' },
  { id: 'blog', name: 'Blog / Magazine', icon: '📰' },
  { id: 'portfolio', name: 'Portfolio', icon: '🎨' },
  { id: 'services', name: 'Site de services', icon: '💼' },
  { id: 'landing', name: 'Landing page produit', icon: '🚀' },
  { id: 'custom', name: 'Personnalisé', icon: '⚙️' }
]

const specialBlocks = [
  { id: 'booking', name: 'Formulaire de réservation', icon: '📅' },
  { id: 'map', name: 'Carte interactive', icon: '🗺️' },
  { id: 'gallery', name: 'Galerie photos/vidéos', icon: '🖼️' },
  { id: 'testimonials', name: 'Témoignages clients', icon: '💬' },
  { id: 'pricing', name: 'Grille de tarifs', icon: '💰' },
  { id: 'countdown', name: 'Compte à rebours', icon: '⏰' },
  { id: 'comparison', name: 'Tableau comparatif', icon: '📊' },
  { id: 'socialProof', name: 'Preuve sociale', icon: '🏆' }
]

const designStyles = [
  { id: 'modern-minimal', name: 'Moderne et minimaliste', icon: '✨' },
  { id: 'professional-corporate', name: 'Professionnel et corporate', icon: '💼' },
  { id: 'creative-colorful', name: 'Créatif et coloré', icon: '🎨' },
  { id: 'elegant-luxury', name: 'Élégant et luxueux', icon: '👑' }
]

export default function AutoGeneratePage() {
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState({
    projectType: '',
    siteName: '',
    siteDescription: '',
    industry: '',
    pages: [],
    specialBlocks: [],
    primaryColor: '#667eea',
    designStyle: 'modern-minimal'
  })
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0, message: '' })
  const [result, setResult] = useState(null)

  const updateConfig = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const toggleArrayItem = (key: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item: string) => item !== value)
        : [...prev[key], value]
    }))
  }

  const handleGenerate = async () => {
    setGenerating(true)
    setProgress({ current: 0, total: config.specialBlocks.length + config.pages.length + 1, message: 'Démarrage...' })

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
                setResult(data.result)
                setGenerating(false)
              } else if (data.type === 'error') {
                throw new Error(data.error)
              }
            }
          }
        }
      }
    } catch (error: any) {
      console.error(error)
      alert('Erreur: ' + error.message)
      setGenerating(false)
    }
  }

  if (result) {
    return (
      <Container>
        <Header>
          <Title>🎉 Génération Terminée !</Title>
        </Header>

        <ResultCard>
          <ResultTitle>Résumé de la génération</ResultTitle>
          
          <StatGrid>
            <Stat>
              <StatNumber>{result.blocks?.filter((b: any) => b.success).length || 0}</StatNumber>
              <StatLabel>Blocs créés</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>{result.pages?.filter((p: any) => p.success).length || 0}</StatNumber>
              <StatLabel>Pages créées</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>{result.duration}s</StatNumber>
              <StatLabel>Durée totale</StatLabel>
            </Stat>
            <Stat>
              <StatIcon>{result.compatibility ? '✅' : '⚠️'}</StatIcon>
              <StatLabel>Compatibilité</StatLabel>
            </Stat>
          </StatGrid>

          <NextSteps>
            <h3>Prochaines étapes :</h3>
            <ol>
              <li>Ouvrez Sanity Studio : <a href="/studio" target="_blank">http://localhost:3000/studio</a></li>
              <li>Personnalisez les pages et blocs créés</li>
              <li>Ajoutez vos images et contenus</li>
              <li>Publiez votre site !</li>
            </ol>
          </NextSteps>

          <ButtonGroup>
            <Button onClick={() => window.location.href = '/studio'}>
              🎨 Ouvrir Studio
            </Button>
            <Button onClick={() => window.location.reload()} $secondary>
              🔄 Nouvelle génération
            </Button>
          </ButtonGroup>
        </ResultCard>
      </Container>
    )
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
        <Title>🤖 Assistant de Création Automatique</Title>
        <Subtitle>Créez votre site complet en quelques clics</Subtitle>
      </Header>

      <StepsIndicator>
        {[1, 2, 3, 4, 5].map(num => (
          <StepDot key={num} $active={step === num} $completed={step > num}>
            {step > num ? '✓' : num}
          </StepDot>
        ))}
      </StepsIndicator>

      <Form>
        {step === 1 && (
          <Step>
            <StepTitle>📋 Type de projet</StepTitle>
            <Grid>
              {projectTypes.map(type => (
                <Card
                  key={type.id}
                  $selected={config.projectType === type.id}
                  onClick={() => updateConfig('projectType', type.id)}
                >
                  <CardIcon>{type.icon}</CardIcon>
                  <CardTitle>{type.name}</CardTitle>
                </Card>
              ))}
            </Grid>
          </Step>
        )}

        {step === 2 && (
          <Step>
            <StepTitle>📝 Informations de base</StepTitle>
            <Input
              placeholder="Nom de votre entreprise/site"
              value={config.siteName}
              onChange={e => updateConfig('siteName', e.target.value)}
            />
            <TextArea
              placeholder="Description courte (1-2 phrases)"
              value={config.siteDescription}
              onChange={e => updateConfig('siteDescription', e.target.value)}
              rows={3}
            />
            <Input
              placeholder="Secteur d'activité"
              value={config.industry}
              onChange={e => updateConfig('industry', e.target.value)}
            />
          </Step>
        )}

        {step === 3 && (
          <Step>
            <StepTitle>📄 Pages à créer</StepTitle>
            <CheckboxGrid>
              {['Accueil', 'Services', 'À propos', 'Contact', 'Blog', 'Tarifs', 'Portfolio', 'FAQ'].map(page => (
                <Checkbox key={page}>
                  <input
                    type="checkbox"
                    checked={config.pages.includes(page.toLowerCase())}
                    onChange={() => toggleArrayItem('pages', page.toLowerCase())}
                  />
                  <span>{page}</span>
                </Checkbox>
              ))}
            </CheckboxGrid>
          </Step>
        )}

        {step === 4 && (
          <Step>
            <StepTitle>🧩 Blocs spéciaux</StepTitle>
            <Grid>
              {specialBlocks.map(block => (
                <Card
                  key={block.id}
                  $selected={config.specialBlocks.includes(block.id)}
                  onClick={() => toggleArrayItem('specialBlocks', block.id)}
                  $small
                >
                  <CardIcon>{block.icon}</CardIcon>
                  <CardTitle>{block.name}</CardTitle>
                </Card>
              ))}
            </Grid>
          </Step>
        )}

        {step === 5 && (
          <Step>
            <StepTitle>🎨 Style et préférences</StepTitle>
            
            <Label>Couleur principale</Label>
            <ColorPicker>
              <Input
                type="color"
                value={config.primaryColor}
                onChange={e => updateConfig('primaryColor', e.target.value)}
              />
              <Input
                type="text"
                value={config.primaryColor}
                onChange={e => updateConfig('primaryColor', e.target.value)}
                placeholder="#667eea"
              />
            </ColorPicker>

            <Label>Style de design</Label>
            <Grid>
              {designStyles.map(style => (
                <Card
                  key={style.id}
                  $selected={config.designStyle === style.id}
                  onClick={() => updateConfig('designStyle', style.id)}
                  $small
                >
                  <CardIcon>{style.icon}</CardIcon>
                  <CardTitle>{style.name}</CardTitle>
                </Card>
              ))}
            </Grid>
          </Step>
        )}
      </Form>

      <ButtonGroup>
        {step > 1 && (
          <Button onClick={() => setStep(step - 1)} $secondary>
            ← Précédent
          </Button>
        )}
        
        {step < 5 ? (
          <Button onClick={() => setStep(step + 1)}>
            Suivant →
          </Button>
        ) : (
          <Button onClick={handleGenerate} $primary>
            🚀 Générer mon site
          </Button>
        )}
      </ButtonGroup>
    </Container>
  )
}

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
`

const StepsIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
`

const StepDot = styled.div<{ $active?: boolean; $completed?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background: ${p => p.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : p.$completed ? '#10b981' : '#e5e7eb'};
  color: ${p => p.$active || p.$completed ? 'white' : '#9ca3af'};
  transition: all 0.3s;
`

const Form = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  min-height: 400px;
`

const Step = styled.div``

const StepTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #1f2937;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`

const Card = styled.div<{ $selected?: boolean; $small?: boolean }>`
  padding: ${p => p.$small ? '15px' : '25px'};
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
  font-size: 2.5rem;
  margin-bottom: 10px;
`

const CardTitle = styled.div`
  font-weight: 500;
  color: #374151;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 15px;
  transition: border-color 0.2s;

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
  margin-bottom: 15px;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
`

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
    background: #f0f4ff;
  }

  input {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  span {
    font-weight: 500;
  }
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
  color: #374151;
`

const ColorPicker = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;

  input[type="color"] {
    width: 60px;
    height: 50px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  input[type="text"] {
    flex: 1;
    margin-bottom: 0;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`

const Button = styled.button<{ $primary?: boolean; $secondary?: boolean }>`
  padding: 14px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${p => p.$primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : p.$secondary ? 'white' : '#667eea'};
  color: ${p => p.$secondary ? '#667eea' : 'white'};
  border: ${p => p.$secondary ? '2px solid #667eea' : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ProgressCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 60px 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 20px;
`

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${p => p.$progress}%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s;
`

const ProgressText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
`

const ProgressMessage = styled.div`
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 30px;
`

const Spinner = styled.div`
  font-size: 3rem;
  animation: spin 2s linear infinite;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const ResultCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const ResultTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #1f2937;
  text-align: center;
`

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`

const Stat = styled.div`
  text-align: center;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
`

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 5px;
`

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 5px;
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
`

const NextSteps = styled.div`
  background: #f0f4ff;
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 30px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: #1f2937;
  }

  ol {
    margin-left: 20px;
    line-height: 1.8;
  }

  a {
    color: #667eea;
    text-decoration: underline;
  }
`
