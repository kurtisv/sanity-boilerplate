'use client'

import { useState } from 'react'
import Link from 'next/link'

type PageStatus = {
  type: 'success' | 'error' | 'info'
  message: string
} | null

export default function AdminPagesPage() {
  const [isGeneratingAll, setIsGeneratingAll] = useState(false)
  const [progress, setProgress] = useState(0)
  const [globalStatus, setGlobalStatus] = useState<PageStatus>(null)
  
  const [pageStatuses, setPageStatuses] = useState<Record<string, PageStatus>>({
    home: null,
    about: null,
    services: null,
    portfolio: null,
    pricing: null,
    contact: null,
    'contact-simple': null,
    blog: null,
    faq: null,
    legal: null,
    careers: null,
    demo: null,
    'studio-showcase': null
  })

  const pages = [
    { key: 'home', title: 'Home', icon: '🏠', description: 'Page d\'accueil du site', apiName: 'import-home' },
    { key: 'demo', title: 'Page Démo', icon: '🚀', description: 'Démonstration des blocs et fonctionnalités', apiName: 'import-demo' },
    { key: 'about', title: 'À Propos', icon: '👥', description: 'Équipe, mission et expertise technique' },
    { key: 'services', title: 'Services', icon: '🛠️', description: 'Nos prestations et processus de développement' },
    { key: 'portfolio', title: 'Portfolio', icon: '🎨', description: 'Réalisations et études de cas clients' },
    { key: 'pricing', title: 'Tarifs', icon: '💰', description: 'Plans tarifaires et devis personnalisés' },
    { key: 'contact', title: 'Contact', icon: '📞', description: 'Formulaire de contact complet' },
    { key: 'contact-simple', title: 'Contact Simple', icon: '📧', description: 'Formulaire de contact simplifié' },
    { key: 'blog', title: 'Blog', icon: '📝', description: 'Articles techniques et actualités' },
    { key: 'faq', title: 'FAQ', icon: '❓', description: 'Questions fréquentes et support' },
    { key: 'legal', title: 'Mentions Légales', icon: '⚖️', description: 'Informations légales et RGPD' },
    { key: 'careers', title: 'Carrières', icon: '💼', description: 'Offres d\'emploi et recrutement' },
    { key: 'studio-showcase', title: 'Vitrine Studio', icon: '✨', description: 'Présentation des capacités du Studio' }
  ]

  const handleGeneratePage = async (pageKey: string) => {
    setPageStatuses(prev => ({ ...prev, [pageKey]: null }))
    
    try {
      // Gérer les APIs spéciales
      let apiEndpoint = `/api/setup-${pageKey}`
      if (pageKey === 'home') {
        apiEndpoint = '/api/import-home'
      } else if (pageKey === 'demo') {
        apiEndpoint = '/api/import-demo'
      } else if (pageKey === 'studio-showcase') {
        apiEndpoint = '/api/setup-studio-showcase'
      }
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setPageStatuses(prev => ({ 
          ...prev, 
          [pageKey]: { 
            type: 'success', 
            message: 'Page créée avec succès !' 
          }
        }))
      } else {
        setPageStatuses(prev => ({ 
          ...prev, 
          [pageKey]: { 
            type: 'error', 
            message: `Erreur: ${data.error || 'Erreur inconnue'}` 
          }
        }))
      }
    } catch (error) {
      setPageStatuses(prev => ({ 
        ...prev, 
        [pageKey]: { 
          type: 'error', 
          message: 'Erreur de connexion. Vérifiez votre configuration Sanity.' 
        }
      }))
    }
  }

  const handleGenerateAll = async () => {
    setIsGeneratingAll(true)
    setProgress(0)
    setGlobalStatus({ type: 'info', message: 'Génération de toutes les pages en cours...' })
    
    // Réinitialiser tous les statuts
    setPageStatuses(Object.keys(pageStatuses).reduce((acc, key) => ({ ...acc, [key]: null }), {}))
    
    let successCount = 0
    let errorCount = 0
    
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]
      setProgress(((i + 1) / pages.length) * 100)
      
      try {
        // Gérer les APIs spéciales
        let apiEndpoint = `/api/setup-${page.key}`
        if (page.key === 'home') {
          apiEndpoint = '/api/import-home'
        } else if (page.key === 'demo') {
          apiEndpoint = '/api/import-demo'
        } else if (page.key === 'studio-showcase') {
          apiEndpoint = '/api/setup-studio-showcase'
        }
        
        const response = await fetch(apiEndpoint, {
          method: 'POST',
        })
        
        const data = await response.json()
        
        if (response.ok) {
          successCount++
          setPageStatuses(prev => ({ 
            ...prev, 
            [page.key]: { 
              type: 'success', 
              message: 'Créée avec succès !' 
            }
          }))
        } else {
          errorCount++
          setPageStatuses(prev => ({ 
            ...prev, 
            [page.key]: { 
              type: 'error', 
              message: `Erreur: ${data.error || 'Erreur inconnue'}` 
            }
          }))
        }
      } catch (error) {
        errorCount++
        setPageStatuses(prev => ({ 
          ...prev, 
          [page.key]: { 
            type: 'error', 
            message: 'Erreur de connexion' 
          }
        }))
      }
      
      // Petite pause entre les requêtes
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    setIsGeneratingAll(false)
    setGlobalStatus({
      type: errorCount === 0 ? 'success' : 'info',
      message: `Génération terminée ! ${successCount} pages créées, ${errorCount} erreurs.`
    })
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '100vh',
      background: '#f8fafc'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          📄 Générateur de Pages
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#6b7280',
          lineHeight: '1.6',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Créez instantanément <strong>13 pages professionnelles</strong> dans Sanity Studio avec du contenu validé à 100%
        </p>
      </div>

      {/* Navigation */}
      <nav style={{
        marginBottom: '2rem',
        padding: '1rem',
        background: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <Link href="/admin" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>← Dashboard Admin</Link>
        <Link href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>🏠 Accueil</Link>
        <Link href="/studio" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>🎨 Studio</Link>
        <Link href="/admin/cleanup" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>🧹 Nettoyage</Link>
      </nav>

      {/* Status global */}
      {globalStatus && (
        <div style={{
          background: globalStatus.type === 'success' ? '#d1fae5' : 
                     globalStatus.type === 'error' ? '#fee2e2' : '#dbeafe',
          border: `1px solid ${globalStatus.type === 'success' ? '#10b981' : 
                                globalStatus.type === 'error' ? '#ef4444' : '#3b82f6'}`,
          borderRadius: '0.75rem',
          padding: '1rem',
          marginBottom: '2rem',
          color: globalStatus.type === 'success' ? '#065f46' : 
                 globalStatus.type === 'error' ? '#dc2626' : '#1e40af'
        }}>
          {globalStatus.message}
          {isGeneratingAll && (
            <div style={{
              width: '100%',
              height: '8px',
              background: '#e5e7eb',
              borderRadius: '4px',
              marginTop: '0.75rem',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: '#3b82f6',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          )}
        </div>
      )}

      {/* Bouton génération globale */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <button
          onClick={handleGenerateAll}
          disabled={isGeneratingAll}
          style={{
            background: isGeneratingAll ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '0.75rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: isGeneratingAll ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            transition: 'all 0.2s'
          }}
        >
          {isGeneratingAll ? '🔄 Génération en cours...' : '🚀 Générer Toutes les Pages'}
        </button>
      </div>

      {/* Grille des pages */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {pages.map((page) => (
          <div
            key={page.key}
            style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.2s'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{page.icon}</span>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                margin: 0
              }}>
                {page.title}
              </h3>
            </div>
            
            <p style={{
              color: '#6b7280',
              marginBottom: '1rem',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              {page.description}
            </p>
            
            {pageStatuses[page.key] && (
              <div style={{
                background: pageStatuses[page.key]!.type === 'success' ? '#d1fae5' : '#fee2e2',
                border: `1px solid ${pageStatuses[page.key]!.type === 'success' ? '#10b981' : '#ef4444'}`,
                borderRadius: '0.5rem',
                padding: '0.75rem',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                color: pageStatuses[page.key]!.type === 'success' ? '#065f46' : '#dc2626'
              }}>
                {pageStatuses[page.key]!.message}
              </div>
            )}

            <button
              onClick={() => handleGeneratePage(page.key)}
              disabled={isGeneratingAll}
              style={{
                background: isGeneratingAll ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: isGeneratingAll ? 'not-allowed' : 'pointer',
                width: '100%',
                transition: 'all 0.2s'
              }}
            >
              {isGeneratingAll ? 'En cours...' : `Créer ${page.title}`}
            </button>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div style={{
        background: 'white',
        borderRadius: '0.75rem',
        padding: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          📋 Instructions
        </h3>
        <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
          <p><strong>1. Génération :</strong> Cliquez sur "Générer Toutes les Pages" ou sélectionnez individuellement</p>
          <p><strong>2. Studio :</strong> Accédez à Sanity Studio pour personnaliser le contenu</p>
          <p><strong>3. Édition :</strong> Modifiez textes, couleurs, images en temps réel</p>
          <p><strong>4. Publication :</strong> Vos changements apparaissent automatiquement sur le site</p>
        </div>
      </div>
    </div>
  )
}