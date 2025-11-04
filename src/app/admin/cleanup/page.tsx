'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CleanupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCleanup = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/cleanup-studio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || 'Erreur lors du nettoyage')
      }
    } catch (err) {
      setError('Erreur de connexion')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '0.5rem'
        }}>
          🧹 Nettoyage Complet Studio
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#6b7280'
        }}>
          Suppression de TOUTES les pages dans Sanity Studio
        </p>
      </header>

      {/* Navigation */}
      <nav style={{
        marginBottom: '2rem',
        padding: '1rem',
        background: '#f9fafb',
        borderRadius: '0.5rem',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <Link href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>🏠 Accueil</Link>
        <Link href="/studio" style={{ color: '#3b82f6', textDecoration: 'none' }}>🎨 Studio</Link>
        <Link href="/studio-showcase" style={{ color: '#3b82f6', textDecoration: 'none' }}>🖼️ Vitrine</Link>
      </nav>

      {/* Problèmes identifiés */}
      <div style={{
        background: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#92400e',
          marginBottom: '1rem'
        }}>
          ⚠️ Problèmes détectés
        </h2>
        <ul style={{ color: '#92400e', lineHeight: '1.6' }}>
          <li><strong>TOUTES les pages :</strong> Suppression complète de toutes les pages dans Studio</li>
          <li><strong>Images inexistantes :</strong> Références vers image-placeholder-1, 2, 3, 4</li>
          <li><strong>Fonctions manquantes :</strong> generateFeatureKey, generateCtaKey</li>
          <li><strong>Brouillons orphelins :</strong> Drafts non publiés</li>
        </ul>
      </div>

      {/* Bouton de nettoyage */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button
          onClick={handleCleanup}
          disabled={isLoading}
          style={{
            background: isLoading ? '#9ca3af' : '#dc2626',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0 auto'
          }}
        >
          {isLoading ? '🔄 Suppression en cours...' : '🗑️ SUPPRIMER TOUTES LES PAGES'}
        </button>
      </div>

      {/* Résultats */}
      {result && (
        <div style={{
          background: '#d1fae5',
          border: '1px solid #10b981',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#065f46',
            marginBottom: '1rem'
          }}>
            ✅ Nettoyage réussi !
          </h3>
          <div style={{ color: '#065f46' }}>
            <p><strong>Images cassées supprimées :</strong> {result.cleaned.brokenImages}</p>
            <p><strong>TOUTES les pages supprimées :</strong> {result.cleaned.allPages}</p>
            <p><strong>Brouillons supprimés :</strong> {result.cleaned.drafts}</p>
          </div>
        </div>
      )}

      {/* Erreurs */}
      {error && (
        <div style={{
          background: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#dc2626',
            marginBottom: '0.5rem'
          }}>
            ❌ Erreur
          </h3>
          <p style={{ color: '#dc2626' }}>{error}</p>
        </div>
      )}

      {/* Instructions */}
      <div style={{
        background: '#eff6ff',
        border: '1px solid #3b82f6',
        borderRadius: '0.5rem',
        padding: '1.5rem'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#1e40af',
          marginBottom: '1rem'
        }}>
          📋 Après le nettoyage
        </h3>
        <ol style={{ color: '#1e40af', lineHeight: '1.6' }}>
          <li><strong>TOUTES les pages seront supprimées</strong> - Studio sera complètement vide</li>
          <li>Vous pouvez créer de nouvelles pages propres dans Sanity Studio</li>
          <li>Les erreurs de références d'images seront corrigées</li>
          <li>Le système sera prêt pour de nouveaux contenus sans erreurs</li>
        </ol>
      </div>
    </div>
  )
}