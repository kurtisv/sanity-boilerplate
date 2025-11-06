'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from '../demo/AdminDemo.module.css'

interface StudioStatus {
  exists: boolean
  page?: {
    id: string
    title: string
    blocksCount: number
  }
}

export default function StudioShowcaseAdminPage() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)
  const [studioStatus, setStudioStatus] = useState<StudioStatus | null>(null)

  // Vérifier le statut de la page studio
  const checkStudioStatus = async () => {
    try {
      const response = await fetch('/api/studio-pages')
      const data = await response.json()
      const showcasePage = data.pages?.find((p: any) => p.slug === 'studio-showcase')
      setStudioStatus({
        exists: !!showcasePage,
        page: showcasePage ? {
          id: showcasePage.id,
          title: showcasePage.title,
          blocksCount: showcasePage.blocks?.length || 0
        } : undefined
      })
    } catch (error) {
      console.error('Erreur lors de la vérification:', error)
    }
  }

  // Créer la page studio
  const createStudioPage = async () => {
    setLoading(true)
    setStatus(null)

    try {
      setStatus({
        type: 'info',
        message: '⚠️ API setup-studio-showcase supprimée. Utilisez /admin/auto-generate pour créer des pages.'
      })
      setLoading(false)
      return

      const response = await fetch('/api/studio-pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: `✅ Page Vitrine Studio créée avec succès ! Slug: ${data.slug}`
        })
        await checkStudioStatus()
      } else {
        setStatus({
          type: 'error',
          message: `❌ Erreur: ${data.error}`
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `❌ Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
      })
    } finally {
      setLoading(false)
    }
  }

  // Charger le statut au montage
  useState(() => {
    checkStudioStatus()
  })

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <span>S</span>
            </div>
            <span className={styles.logoText}>Sanity Boilerplate</span>
          </Link>
          <nav className={styles.navigation}>
            <Link href="/demo" className={styles.navLink}>
              Démonstration
            </Link>
            <Link href="/studio" className={styles.navLink}>
              Studio
            </Link>
            <Link href="/admin/demo" className={styles.navLink}>
              Admin Démo
            </Link>
            <Link href="/admin/home" className={styles.navLink}>
              Admin Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.headerSection}>
            <h1 className={styles.title}>
              🎨 Administration de la Vitrine Studio
            </h1>
            <p className={styles.description}>
              Créez automatiquement une page vitrine qui présente tous les blocs que vous créez dans Sanity Studio. 
              Cette page se met à jour automatiquement et offre une présentation professionnelle de votre contenu.
            </p>
          </div>

          {/* Avantages de la page Studio */}
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>🎯 Pourquoi créer une vitrine Studio ?</h3>
            <div className={styles.infoList}>
              <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#48bb78', fontWeight: 'bold' }}>✓</span>
                <span><strong>Vitrine automatique</strong> : Présente vos blocs de manière professionnelle</span>
              </div>
              <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#48bb78', fontWeight: 'bold' }}>✓</span>
                <span><strong>Mise à jour en temps réel</strong> : Se synchronise avec votre contenu Studio</span>
              </div>
              <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#48bb78', fontWeight: 'bold' }}>✓</span>
                <span><strong>Expérience client</strong> : Navigation fluide et design cohérent</span>
              </div>
              <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#48bb78', fontWeight: 'bold' }}>✓</span>
                <span><strong>Zéro maintenance</strong> : Aucune configuration supplémentaire requise</span>
              </div>
            </div>
          </div>

          {/* Status Card */}
          {studioStatus && (
            <div className={`${styles.statusCard} ${studioStatus.exists ? styles.success : styles.info}`}>
              {studioStatus.exists ? (
                <div>
                  <div className={styles.statusTitle}>✅ Page vitrine existante</div>
                  <div className={styles.statusDetails}>
                    <p><strong>Titre:</strong> {studioStatus.page?.title}</p>
                    <p><strong>Blocs:</strong> {studioStatus.page?.blocksCount}</p>
                    <div className={styles.statusLinks}>
                      <Link 
                        href="/studio-showcase" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.statusLink}
                      >
                        Voir la vitrine →
                      </Link>
                      <Link 
                        href={`/studio/desk/page;${studioStatus.page?.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.statusLink}
                      >
                        Éditer dans Studio →
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles.statusTitle}>ℹ️ Aucune vitrine trouvée</div>
                  <p>La page vitrine n'existe pas encore dans Sanity. Créez-la pour présenter vos blocs de manière professionnelle.</p>
                </div>
              )}
            </div>
          )}

          {/* Status Message */}
          {status && (
            <div className={`${styles.statusCard} ${styles[status.type]}`}>
              <p>{status.message}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className={styles.buttonGroup}>
            <button 
              onClick={createStudioPage} 
              disabled={loading}
              className={`${styles.button} ${styles.primaryButton}`}
            >
              {loading && <div className={styles.spinner}></div>}
              {loading ? 'Création en cours...' : '🎨 Créer la Vitrine Studio'}
            </button>

            <button 
              onClick={checkStudioStatus}
              className={`${styles.button} ${styles.secondaryButton}`}
            >
              🔄 Vérifier le Statut
            </button>
          </div>

          {/* Instructions */}
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>📋 Instructions</h3>
            <ol className={styles.infoList}>
              <li>Assurez-vous que votre <span className={styles.infoCode}>SANITY_API_TOKEN</span> est configuré dans <span className={styles.infoCode}>.env.local</span></li>
              <li>Cliquez sur "Créer la Vitrine Studio" pour générer automatiquement la page</li>
              <li>La page sera créée avec le slug "studio-showcase" et sera accessible à /studio-showcase</li>
              <li>Vous pourrez ensuite la modifier dans Sanity Studio</li>
              <li>La page se mettra à jour automatiquement quand vous ajouterez du contenu</li>
            </ol>
          </div>

          {/* Content Preview */}
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>📄 Contenu de la Vitrine Studio</h3>
            <div className={styles.infoList}>
              <li><strong>🦸 Hero Block</strong> - Présentation de la vitrine avec liens vers Studio</li>
              <li><strong>📝 Text Block</strong> - Explication du système automatique</li>
              <li><strong>⭐ Feature Grid</strong> - Avantages de la vitrine automatique</li>
              <li><strong>📋 Text Block</strong> - Instructions pour commencer</li>
            </div>
          </div>

          {/* Workflow */}
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>🔄 Comment ça fonctionne</h3>
            <div className={styles.infoList}>
              <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f7fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>1. Création automatique</strong><br />
                <span style={{ color: '#718096', fontSize: '0.9rem' }}>
                  La page vitrine est générée avec un contenu professionnel expliquant le système
                </span>
              </div>
              <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f7fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>2. Ajout de contenu</strong><br />
                <span style={{ color: '#718096', fontSize: '0.9rem' }}>
                  Vous créez vos pages et blocs dans Sanity Studio normalement
                </span>
              </div>
              <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f7fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>3. Présentation automatique</strong><br />
                <span style={{ color: '#718096', fontSize: '0.9rem' }}>
                  Vos blocs apparaissent automatiquement dans la vitrine avec une mise en page professionnelle
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={styles.scriptsSection}>
            <h4 className={styles.scriptsTitle}>🔗 Liens Utiles</h4>
            <div className={styles.scriptsList}>
              <div className={styles.scriptItem}>
                <Link href="/admin/demo" className={styles.statusLink}>📋 Administration Démo</Link>
                <span> - Gérer la page de démonstration</span>
              </div>
              <div className={styles.scriptItem}>
                <Link href="/admin/home" className={styles.statusLink}>🏠 Administration Home</Link>
                <span> - Gérer la page d'accueil</span>
              </div>
              <div className={styles.scriptItem}>
                <Link href="/studio" className={styles.statusLink}>🎨 Sanity Studio</Link>
                <span> - Créer votre contenu</span>
              </div>
              <div className={styles.scriptItem}>
                <Link href="/studio-showcase" className={styles.statusLink}>🖼️ Vitrine Studio</Link>
                <span> - Voir le résultat final</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
