'use client'

import { useState } from 'react'
import styled from 'styled-components'

const projectTypes = [
  { id: 'corporate', name: 'Site vitrine entreprise', icon: '🏢', description: 'Site professionnel pour présenter votre entreprise' },
  { id: 'ecommerce', name: 'Site e-commerce', icon: '🛒', description: 'Boutique en ligne avec catalogue produits' },
  { id: 'blog', name: 'Blog / Magazine', icon: '📰', description: 'Site de contenu et articles' },
  { id: 'portfolio', name: 'Portfolio', icon: '🎨', description: 'Showcase de vos projets et réalisations' },
  { id: 'services', name: 'Site de services', icon: '💼', description: 'Présentation de vos services professionnels' },
  { id: 'landing', name: 'Landing page produit', icon: '🚀', description: 'Page unique pour un produit/service' },
  { id: 'restaurant', name: 'Restaurant / Café', icon: '🍽️', description: 'Site avec menu et réservations' },
  { id: 'health', name: 'Santé / Bien-être', icon: '💆', description: 'Clinique, spa, massothérapie' },
  { id: 'custom', name: 'Personnalisé', icon: '⚙️', description: 'Configuration sur mesure' }
]

const availableBlocks = [
  { id: 'hero', name: 'Hero (En-tête)', icon: '🦸', category: 'essentiel', description: 'Section d\'accueil avec titre et CTA' },
  { id: 'text', name: 'Bloc de texte', icon: '📝', category: 'contenu', description: 'Texte riche avec formatage' },
  { id: 'features', name: 'Grille de fonctionnalités', icon: '⭐', category: 'contenu', description: 'Présentation des avantages/services' },
  { id: 'gallery', name: 'Galerie d\'images', icon: '🖼️', category: 'media', description: 'Galerie photos avec lightbox' },
  { id: 'testimonials', name: 'Témoignages', icon: '💬', category: 'social', description: 'Avis et témoignages clients' },
  { id: 'team', name: 'Équipe', icon: '👥', category: 'contenu', description: 'Présentation de l\'équipe' },
  { id: 'stats', name: 'Statistiques', icon: '📊', category: 'contenu', description: 'Chiffres clés en valeur' },
  { id: 'pricing', name: 'Tarifs', icon: '💰', category: 'commercial', description: 'Grille de prix/forfaits' },
  { id: 'contact', name: 'Formulaire de contact', icon: '📞', category: 'essentiel', description: 'Formulaire avec carte' },
  { id: 'cta', name: 'Call-to-Action', icon: '🎯', category: 'commercial', description: 'Section d\'appel à l\'action' },
  { id: 'faq', name: 'FAQ', icon: '❓', category: 'contenu', description: 'Questions fréquentes' },
  { id: 'blog', name: 'Articles de blog', icon: '📰', category: 'contenu', description: 'Liste d\'articles' },
  { id: 'video', name: 'Vidéo', icon: '🎥', category: 'media', description: 'Vidéo YouTube/Vimeo' },
  { id: 'map', name: 'Carte interactive', icon: '🗺️', category: 'localisation', description: 'Google Maps intégré' },
  { id: 'countdown', name: 'Compte à rebours', icon: '⏰', category: 'special', description: 'Timer pour événement' },
  { id: 'comparison', name: 'Tableau comparatif', icon: '📋', category: 'commercial', description: 'Comparaison produits/services' },
  { id: 'socialProof', name: 'Preuve sociale', icon: '🏆', category: 'social', description: 'Logos clients et stats' },
  { id: 'newsletter', name: 'Newsletter', icon: '✉️', category: 'marketing', description: 'Inscription newsletter' },
  { id: 'logoGrid', name: 'Logos partenaires', icon: '🏢', category: 'social', description: 'Grille de logos' },
  { id: 'accordion', name: 'Accordéon', icon: '📑', category: 'contenu', description: 'Contenu pliable' },
  { id: 'tabs', name: 'Onglets', icon: '📂', category: 'contenu', description: 'Contenu en onglets' },
  { id: 'booking', name: 'Réservation', icon: '📅', category: 'special', description: 'Système de réservation' },
  { id: 'serviceList', name: 'Liste de services', icon: '📋', category: 'commercial', description: 'Services avec filtres' },
  { id: 'pricingTable', name: 'Tableau de prix', icon: '💵', category: 'commercial', description: 'Tableau détaillé des tarifs' }
]

const blockCategories = [
  { id: 'essentiel', name: 'Essentiels', icon: '⭐' },
  { id: 'contenu', name: 'Contenu', icon: '📝' },
  { id: 'media', name: 'Média', icon: '🎬' },
  { id: 'commercial', name: 'Commercial', icon: '💼' },
  { id: 'social', name: 'Social', icon: '👥' },
  { id: 'marketing', name: 'Marketing', icon: '📈' },
  { id: 'special', name: 'Spéciaux', icon: '✨' },
  { id: 'localisation', name: 'Localisation', icon: '📍' }
]

const defaultPages = [
  { id: 'accueil', name: 'Accueil', icon: '🏠', required: true, description: 'Page d\'accueil principale' },
  { id: 'services', name: 'Services', icon: '💼', description: 'Présentation de vos services' },
  { id: 'a-propos', name: 'À propos', icon: 'ℹ️', description: 'Histoire et équipe' },
  { id: 'contact', name: 'Contact', icon: '📞', required: true, description: 'Formulaire de contact' },
  { id: 'blog', name: 'Blog', icon: '📰', description: 'Articles et actualités' },
  { id: 'tarifs', name: 'Tarifs', icon: '💰', description: 'Grille tarifaire' },
  { id: 'portfolio', name: 'Portfolio', icon: '🎨', description: 'Vos réalisations' },
  { id: 'faq', name: 'FAQ', icon: '❓', description: 'Questions fréquentes' },
  { id: 'temoignages', name: 'Témoignages', icon: '💬', description: 'Avis clients' },
  { id: 'equipe', name: 'Équipe', icon: '👥', description: 'Présentation de l\'équipe' }
]

const designStyles = [
  { id: 'modern-minimal', name: 'Moderne et minimaliste', icon: '✨', description: 'Design épuré et contemporain' },
  { id: 'professional-corporate', name: 'Professionnel et corporate', icon: '💼', description: 'Style sérieux et professionnel' },
  { id: 'creative-colorful', name: 'Créatif et coloré', icon: '🎨', description: 'Design vibrant et original' },
  { id: 'elegant-luxury', name: 'Élégant et luxueux', icon: '👑', description: 'Style haut de gamme' }
]

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 10px;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto;
`

const InfoBanner = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  margin: 0 auto 30px;
  max-width: 900px;
  color: white;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.6;
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const StepsIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
`

const StepDot = styled.div<{ $active?: boolean; $completed?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: ${p => p.$active ? 'white' : p.$completed ? '#10b981' : 'rgba(255, 255, 255, 0.3)'};
  color: ${p => p.$active ? '#667eea' : p.$completed ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1);
  }
`

const Form = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`

const Step = styled.div`
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

const StepTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #1f2937;
  text-align: center;
`

const StepSubtitle = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 25px;
  text-align: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`

const Card = styled.div<{ $selected?: boolean; $small?: boolean }>`
  padding: ${p => p.$small ? '15px' : '20px'};
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

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 5px;
`

const CardDescription = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 5px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 20px;
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
  margin-bottom: 20px;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
  color: #374151;
`

const PagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`

const PageCard = styled.div<{ $selected?: boolean; $required?: boolean }>`
  padding: 20px;
  border: 2px solid ${p => p.$selected ? '#667eea' : '#e5e7eb'};
  border-radius: 8px;
  cursor: ${p => p.$required ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  background: ${p => p.$selected ? '#f0f4ff' : p.$required ? '#f9fafb' : 'white'};
  opacity: ${p => p.$required ? 0.7 : 1};

  &:hover {
    border-color: ${p => p.$required ? '#e5e7eb' : '#667eea'};
    transform: ${p => p.$required ? 'none' : 'translateY(-2px)'};
    box-shadow: ${p => p.$required ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.15)'};
  }
`

const PageCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`

const PageIcon = styled.span`
  font-size: 1.5rem;
`

const PageName = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: #374151;
  flex: 1;
`

const RequiredBadge = styled.span`
  background: #10b981;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
`

const PageDescription = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 10px;
`

const PageBlockCount = styled.div`
  font-size: 0.85rem;
  color: #667eea;
  font-weight: 600;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e5e7eb;
`

const SelectedPagesInfo = styled.div`
  text-align: center;
  padding: 15px;
  background: #f0f4ff;
  border-radius: 8px;
  color: #667eea;
  font-weight: 600;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #f9fafb;
  border-radius: 8px;
`

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 15px;
`

const EmptyText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`

const EmptySubtext = styled.div`
  font-size: 0.95rem;
  color: #6b7280;
`

const PageSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
`

const PageTab = styled.button<{ $active?: boolean }>`
  padding: 12px 20px;
  border: 2px solid ${p => p.$active ? '#667eea' : '#e5e7eb'};
  border-radius: 8px;
  background: ${p => p.$active ? '#f0f4ff' : 'white'};
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    border-color: #667eea;
  }
`

const PageTabBadge = styled.span`
  background: #667eea;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
`

const BlockConfiguration = styled.div`
  margin-top: 20px;
`

const BlockConfigHeader = styled.div`
  margin-bottom: 20px;

  h3 {
    font-size: 1.3rem;
    color: #1f2937;
    margin-bottom: 5px;
  }
`

const BlockConfigSubtext = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
`

const CategoryFilter = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

const CategoryButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${p => p.$active ? '#667eea' : '#e5e7eb'};
  border-radius: 6px;
  background: ${p => p.$active ? '#667eea' : 'white'};
  color: ${p => p.$active ? 'white' : '#374151'};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    border-color: #667eea;
  }
`

const BlocksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 30px;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
`

const BlockCard = styled.div`
  padding: 15px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  background: white;

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }
`

const BlockIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 8px;
`

const BlockName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 4px;
  color: #374151;
`

const BlockDescription = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`

const SelectedBlocks = styled.div`
  background: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
`

const SelectedBlocksTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #374151;
`

const SelectedBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 8px;
`

const BlockOrder = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
`

const SelectedBlockInfo = styled.div`
  flex: 1;
`

const SelectedBlockName = styled.div`
  font-weight: 600;
  color: #374151;
`

const BlockActions = styled.div`
  display: flex;
  gap: 4px;
`

const BlockActionButton = styled.button<{ $danger?: boolean }>`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background: ${p => p.$danger ? '#ef4444' : '#e5e7eb'};
  color: ${p => p.$danger ? 'white' : '#374151'};
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${p => p.$danger ? '#dc2626' : '#d1d5db'};
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
  margin-top: 30px;
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
    transform: none;
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
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin: 30px 0;
`

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: ${p => p.$progress}%;
  transition: width 0.3s ease;
`

const ProgressMessage = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 20px;
`

const ProgressText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
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

const SuccessCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`

const SuccessTitle = styled.h2`
  font-size: 2rem;
  color: #10b981;
  margin-bottom: 15px;
`

const SuccessMessage = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 30px;
`

const StatsGrid = styled.div`
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

export default function AutoGeneratePage() {
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState<any>({
    projectType: '',
    siteName: '',
    siteDescription: '',
    industry: '',
    targetAudience: '',
    pages: [] as any[],
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
    designStyle: 'modern-minimal',
    features: {
      multiLanguage: false,
      darkMode: false,
      animations: true,
      seo: true
    }
  })
  const [currentPageConfig, setCurrentPageConfig] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0, message: '' })
  const [result, setResult] = useState<any>(null)

  const updateConfig = (key: string, value: any) => {
    setConfig((prev: any) => ({ ...prev, [key]: value }))
  }

  const togglePage = (pageId: string) => {
    const page = defaultPages.find(p => p.id === pageId)
    if (!page) return
    
    setConfig((prev: any) => {
      const pages = prev.pages || []
      const exists = pages.find((p: any) => p.id === pageId)
      if (exists) {
        return {
          ...prev,
          pages: pages.filter((p: any) => p.id !== pageId)
        }
      } else {
        return {
          ...prev,
          pages: [...pages, {
            id: pageId,
            name: page.name,
            blocks: []
          }]
        }
      }
    })
  }

  const addBlockToPage = (pageId: string, blockId: string) => {
    const block = availableBlocks.find(b => b.id === blockId)
    if (!block) return

    setConfig((prev: any) => ({
      ...prev,
      pages: (prev.pages || []).map((p: any) => 
        p.id === pageId
          ? {
              ...p,
              blocks: [...(p.blocks || []), {
                type: blockId,
                name: block.name,
                enabled: true,
                order: (p.blocks?.length || 0)
              }]
            }
          : p
      )
    }))
  }

  const removeBlockFromPage = (pageId: string, blockIndex: number) => {
    setConfig((prev: any) => ({
      ...prev,
      pages: (prev.pages || []).map((p: any) => 
        p.id === pageId
          ? {
              ...p,
              blocks: (p.blocks || []).filter((_: any, i: number) => i !== blockIndex)
            }
          : p
      )
    }))
  }

  const moveBlock = (pageId: string, blockIndex: number, direction: 'up' | 'down') => {
    setConfig((prev: any) => ({
      ...prev,
      pages: (prev.pages || []).map((p: any) => {
        if (p.id !== pageId) return p
        
        const blocks = [...(p.blocks || [])]
        const newIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1
        
        if (newIndex < 0 || newIndex >= blocks.length) return p
        
        [blocks[blockIndex], blocks[newIndex]] = [blocks[newIndex], blocks[blockIndex]]
        
        return { ...p, blocks }
      })
    }))
  }

  const getPageBlocks = (pageId: string) => {
    const page = (config.pages || []).find((p: any) => p.id === pageId)
    return page?.blocks || []
  }

  const isPageSelected = (pageId: string) => {
    return (config.pages || []).some((p: any) => p.id === pageId)
  }

  const handleGenerate = async () => {
    setGenerating(true)
    const totalBlocks = (config.pages || []).reduce((sum: number, page: any) => sum + (page.blocks?.length || 0), 0)
    setProgress({ current: 0, total: totalBlocks + (config.pages?.length || 0) + 1, message: 'Démarrage...' })

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
            <StepSubtitle>Sélectionnez les pages que vous souhaitez inclure dans votre site</StepSubtitle>
            
            <PagesGrid>
              {defaultPages.map(page => (
                <PageCard
                  key={page.id}
                  $selected={isPageSelected(page.id)}
                  $required={page.required}
                  onClick={() => !page.required && togglePage(page.id)}
                >
                  <PageCardHeader>
                    <PageIcon>{page.icon}</PageIcon>
                    <PageName>{page.name}</PageName>
                    {page.required && <RequiredBadge>Requis</RequiredBadge>}
                  </PageCardHeader>
                  <PageDescription>{page.description}</PageDescription>
                  {isPageSelected(page.id) && (
                    <PageBlockCount>
                      {getPageBlocks(page.id).length} bloc(s) configuré(s)
                    </PageBlockCount>
                  )}
                </PageCard>
              ))}
            </PagesGrid>

            {(config.pages?.length || 0) > 0 && (
              <SelectedPagesInfo>
                ✅ {config.pages?.length || 0} page(s) sélectionnée(s)
              </SelectedPagesInfo>
            )}
          </Step>
        )}

        {step === 4 && (
          <Step>
            <StepTitle>🧩 Configuration des blocs</StepTitle>
            <StepSubtitle>Configurez les blocs pour chaque page sélectionnée</StepSubtitle>

            {(config.pages?.length || 0) === 0 ? (
              <EmptyState>
                <EmptyIcon>📄</EmptyIcon>
                <EmptyText>Aucune page sélectionnée</EmptyText>
                <EmptySubtext>Retournez à l'étape précédente pour sélectionner des pages</EmptySubtext>
              </EmptyState>
            ) : (
              <>
                <PageSelector>
                  {(config.pages || []).map((page: any) => (
                    <PageTab
                      key={page.id}
                      $active={currentPageConfig === page.id}
                      onClick={() => setCurrentPageConfig(page.id)}
                    >
                      {defaultPages.find(p => p.id === page.id)?.icon} {page.name}
                      <PageTabBadge>{page.blocks?.length || 0}</PageTabBadge>
                    </PageTab>
                  ))}
                </PageSelector>

                {currentPageConfig && (
                  <BlockConfiguration>
                    <BlockConfigHeader>
                      <h3>Blocs pour la page "{(config.pages || []).find((p: any) => p.id === currentPageConfig)?.name}"</h3>
                      <BlockConfigSubtext>Ajoutez et organisez les blocs dans l'ordre souhaité</BlockConfigSubtext>
                    </BlockConfigHeader>

                    <CategoryFilter>
                      <CategoryButton
                        $active={selectedCategory === 'all'}
                        onClick={() => setSelectedCategory('all')}
                      >
                        🌐 Tous
                      </CategoryButton>
                      {blockCategories.map(cat => (
                        <CategoryButton
                          key={cat.id}
                          $active={selectedCategory === cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                        >
                          {cat.icon} {cat.name}
                        </CategoryButton>
                      ))}
                    </CategoryFilter>

                    <BlocksGrid>
                      {availableBlocks
                        .filter(block => selectedCategory === 'all' || block.category === selectedCategory)
                        .map(block => (
                          <BlockCard
                            key={block.id}
                            onClick={() => addBlockToPage(currentPageConfig, block.id)}
                          >
                            <BlockIcon>{block.icon}</BlockIcon>
                            <BlockName>{block.name}</BlockName>
                            <BlockDescription>{block.description}</BlockDescription>
                          </BlockCard>
                        ))
                      }
                    </BlocksGrid>

                    {getPageBlocks(currentPageConfig).length > 0 && (
                      <SelectedBlocks>
                        <SelectedBlocksTitle>📋 Blocs sélectionnés ({getPageBlocks(currentPageConfig).length})</SelectedBlocksTitle>
                        {getPageBlocks(currentPageConfig).map((block: any, index: number) => (
                          <SelectedBlock key={index}>
                            <BlockOrder>{index + 1}</BlockOrder>
                            <SelectedBlockInfo>
                              <SelectedBlockName>{block.name}</SelectedBlockName>
                            </SelectedBlockInfo>
                            <BlockActions>
                              {index > 0 && (
                                <BlockActionButton
                                  onClick={() => moveBlock(currentPageConfig, index, 'up')}
                                  title="Monter"
                                >
                                  ↑
                                </BlockActionButton>
                              )}
                              {index < getPageBlocks(currentPageConfig).length - 1 && (
                                <BlockActionButton
                                  onClick={() => moveBlock(currentPageConfig, index, 'down')}
                                  title="Descendre"
                                >
                                  ↓
                                </BlockActionButton>
                              )}
                              <BlockActionButton
                                onClick={() => removeBlockFromPage(currentPageConfig, index)}
                                title="Supprimer"
                                $danger
                              >
                                ×
                              </BlockActionButton>
                            </BlockActions>
                          </SelectedBlock>
                        ))}
                      </SelectedBlocks>
                    )}
                  </BlockConfiguration>
                )}
              </>
            )}
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
