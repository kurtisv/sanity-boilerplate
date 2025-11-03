'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from '../demo/AdminDemo.module.css'

interface HomeStatus {
  exists: boolean
  page?: {
    id: string
    title: string
    blocksCount: number
  }
}

export default function HomeAdminPage() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)
  const [homeStatus, setHomeStatus] = useState<HomeStatus | null>(null)

  // Vérifier le statut de la page home
  const checkHomeStatus = async () => {
    try {
      const response = await fetch('/api/import-home')
      const data = await response.json()
      setHomeStatus(data)
    } catch (error) {
      console.error('Erreur lors de la vérification:', error)
    }
  }

  // Importer la page home
  const importHome = async () => {
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/import-home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: `✅ Page d'accueil importée avec succès ! ${data.data.blocksCount} blocs créés.`
        })
        await checkHomeStatus()
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
    checkHomeStatus()
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
            <Link href="/admin/site-settings" className={styles.navLink}>
              Paramètres Site
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.headerSection}>
            <h1 className={styles.title}>
              🏠 Administration de la Page d'Accueil
            </h1>
            <p className={styles.description}>
              Gérez l'importation de la page d'accueil dans Sanity Studio. 
              Cette page sera accessible à l'adresse racine (/) de votre site et contiendra 
              les blocs principaux de présentation.
            </p>
          </div>

          {/* Status Card */}
          {homeStatus && (
            <div className={`${styles.statusCard} ${homeStatus.exists ? styles.success : styles.info}`}>
              {homeStatus.exists ? (
                <div>
                  <div className={styles.statusTitle}>✅ Page d'accueil existante</div>
                  <div className={styles.statusDetails}>
                    <p><strong>Titre:</strong> {homeStatus.page?.title}</p>
                    <p><strong>Blocs:</strong> {homeStatus.page?.blocksCount}</p>
                    <div className={styles.statusLinks}>
                      <Link 
                        href="/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.statusLink}
                      >
                        Voir la page d'accueil →
                      </Link>
                      <Link 
                        href={`/studio/desk/page;${homeStatus.page?.id}`} 
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
                  <div className={styles.statusTitle}>ℹ️ Aucune page d'accueil trouvée</div>
                  <p>La page d'accueil n'existe pas encore dans Sanity. Une page par défaut est actuellement affichée.</p>
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
              onClick={importHome} 
              disabled={loading}
              className={`${styles.button} ${styles.primaryButton}`}
            >
              {loading && <div className={styles.spinner}></div>}
              {loading ? 'Import en cours...' : '🏠 Importer la Page d\'Accueil'}
            </button>

            <button 
              onClick={checkHomeStatus}
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
              <li>Cliquez sur "Importer la Page d'Accueil" pour créer automatiquement la page</li>
              <li>La page sera créée avec le slug "home" et sera accessible à l'adresse racine (/)</li>
              <li>Vous pourrez ensuite la modifier dans Sanity Studio</li>
            </ol>
          </div>

          {/* Content Preview */}
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>📄 Contenu de la Page d'Accueil</h3>
            <div className={styles.infoList}>
              <li><strong>🦸 Hero Block</strong> - Bannière de bienvenue avec boutons CTA</li>
              <li><strong>⭐ Feature Grid</strong> - Présentation des fonctionnalités principales</li>
              <li><strong>📝 Text Block</strong> - Description du boilerplate</li>
              <li><strong>📧 Contact Block</strong> - Formulaire de contact</li>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={styles.scriptsSection}>
            <h4 className={styles.scriptsTitle}>🔗 Liens Utiles</h4>
            <div className={styles.scriptsList}>
              <div className={styles.scriptItem}>
                <Link href="/admin/demo" className={styles.statusLink}>⚙️ Administration Démo</Link>
                <span> - Gérer la page de démonstration</span>
              </div>
              <div className={styles.scriptItem}>
                <Link href="/studio" className={styles.statusLink}>🎨 Sanity Studio</Link>
                <span> - Éditer le contenu directement</span>
              </div>
              <div className={styles.scriptItem}>
                <Link href="/" className={styles.statusLink}>🏠 Page d'Accueil</Link>
                <span> - Voir le résultat final</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
