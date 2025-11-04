'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminServicesPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleGenerateServices = async () => {
    setIsGenerating(true)
    setStatus('idle')
    setMessage('')

    try {
      console.log('🚀 Lancement de la génération de la page Services...')
      
      const response = await fetch('/api/setup-services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setMessage(data.message || 'Page Services créée avec succès !')
        console.log('✅ Page Services générée:', data.page)
        
        // Redirection automatique après 2 secondes
        setTimeout(() => {
          window.location.href = '/services'
        }, 2000)
      } else {
        setStatus('error')
        setMessage(data.error || 'Erreur lors de la création de la page Services')
        console.error('❌ Erreur:', data)
      }
    } catch (error) {
      setStatus('error')
      setMessage('Erreur de connexion à l\'API')
      console.error('❌ Erreur de fetch:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        padding: '3rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '2rem'
          }}>
            🛠️
          </div>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            Administration - Page Services
          </h1>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#4a5568',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Créez automatiquement la page Services dans Sanity Studio avec du contenu professionnel prêt à l'emploi.
          </p>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div style={{
            background: '#d1fae5',
            border: '1px solid #a7f3d0',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '2rem',
            color: '#065f46'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>✅</span>
              <strong>{message}</strong>
            </div>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
              Redirection vers la page Services dans 2 secondes...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '2rem',
            color: '#991b1b'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>❌</span>
              <strong>Erreur</strong>
            </div>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
              {message}
            </p>
          </div>
        )}

        {/* Contenu de la page */}
        <div style={{
          background: '#f8fafc',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            📋 Contenu qui sera créé :
          </h3>
          
          <ul style={{
            color: '#4a5568',
            lineHeight: '1.8',
            paddingLeft: '1.5rem'
          }}>
            <li><strong>🦸 HeroBlock</strong> - Présentation des services avec gradient "forest"</li>
            <li><strong>⭐ FeatureGridBlock</strong> - Nos expertises (3 services principaux)</li>
            <li><strong>⭐ FeatureGridBlock</strong> - Notre processus (3 étapes structurées)</li>
            <li><strong>📊 StatsBlock</strong> - Nos résultats en chiffres (projets, satisfaction, support)</li>
            <li><strong>🎯 SEO optimisé</strong> - Métadonnées et mots-clés configurés</li>
          </ul>
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleGenerateServices}
            disabled={isGenerating}
            style={{
              background: isGenerating 
                ? '#9ca3af' 
                : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
            }}
          >
            {isGenerating ? (
              <>
                <span style={{ 
                  animation: 'spin 1s linear infinite',
                  display: 'inline-block'
                }}>⏳</span>
                Génération en cours...
              </>
            ) : (
              <>
                🚀 Créer la Page Services
              </>
            )}
          </button>

          <Link href="/services" style={{
            background: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            👁️ Voir la Page Services
          </Link>
        </div>

        {/* Navigation */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/" style={{
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}>
              🏠 Accueil
            </Link>
            <Link href="/studio" style={{
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}>
              🎨 Sanity Studio
            </Link>
            <Link href="/demo" style={{
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}>
              📋 Démonstration
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
