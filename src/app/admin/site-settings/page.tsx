'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from '../demo/AdminDemo.module.css'

interface SiteSettingsStatus {
  header: {
    exists: boolean
    configured: boolean
    data?: {
      logoText: string
      navigationCount: number
      backgroundColor: string
      textColor: string
    }
  }
  footer: {
    exists: boolean
    configured: boolean
    data?: {
      text: string
      columnsCount: number
      backgroundColor: string
      textColor: string
    }
  }
}

export default function SiteSettingsAdminPage() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)
  const [settingsStatus, setSettingsStatus] = useState<SiteSettingsStatus | null>(null)

  // Vérifier le statut des paramètres de site
  const checkSettingsStatus = async () => {
    try {
      const response = await fetch('/api/setup-site-settings')
      const data = await response.json()
      setSettingsStatus(data)
    } catch (error) {
      console.error('Erreur lors de la vérification:', error)
    }
  }

  // Configurer les paramètres de site
  const setupSiteSettings = async () => {
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/setup-site-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: `✅ Paramètres de site configurés avec succès ! Header et Footer créés.`
        })
        await checkSettingsStatus()
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
    checkSettingsStatus()
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
              ⚙️ Configuration des Paramètres de Site
            </h1>
            <p className={styles.description}>
              Configurez automatiquement les paramètres par défaut du header et footer 
              dans Sanity Studio. Ces paramètres fourniront une base professionnelle 
              que vos clients pourront personnaliser.
            </p>
          </div>

          {/* Status Cards */}
          {settingsStatus && (
            <div>
              {/* Header Status */}
              <div className={`${styles.statusCard} ${settingsStatus.header.configured ? styles.success : styles.info}`}>
                <div className={styles.statusTitle}>
                  {settingsStatus.header.configured ? '✅ Header configuré' : 'ℹ️ Header à configurer'}
                </div>
                <div className={styles.statusDetails}>
                  {settingsStatus.header.configured && settingsStatus.header.data ? (
                    <>
                      <p><strong>Logo:</strong> {settingsStatus.header.data.logoText}</p>
                      <p><strong>Navigation:</strong> {settingsStatus.header.data.navigationCount} éléments</p>
                      <p><strong>Couleurs:</strong> {settingsStatus.header.data.backgroundColor} / {settingsStatus.header.data.textColor}</p>
                    </>
                  ) : (
                    <p>Le header n'est pas encore configuré avec les paramètres par défaut.</p>
                  )}
                </div>
              </div>

              {/* Footer Status */}
              <div className={`${styles.statusCard} ${settingsStatus.footer.configured ? styles.success : styles.info}`}>
                <div className={styles.statusTitle}>
                  {settingsStatus.footer.configured ? '✅ Footer configuré' : 'ℹ️ Footer à configurer'}
                </div>
                <div className={styles.statusDetails}>
                  {settingsStatus.footer.configured && settingsStatus.footer.data ? (
                    <>
                      <p><strong>Description:</strong> {settingsStatus.footer.data.text}</p>
                      <p><strong>Colonnes:</strong> {settingsStatus.footer.data.columnsCount} sections</p>
                      <p><strong>Couleurs:</strong> {settingsStatus.footer.data.backgroundColor} / {settingsStatus.footer.data.textColor}</p>
                    </>
                  ) : (
                    <p>Le footer n'est pas encore configuré avec les paramètres par défaut.</p>
                  )}
                </div>
              </div>
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
              onClick={setupSiteSettings} 
              disabled={loading}
              className={`${styles.button} ${styles.primaryButton}`}
            >
              {loading && <div className={styles.spinner}></div>}
              {loading ? 'Configuration en cours...' : '⚙️ Configurer les Paramètres par Défaut'}
            </button>

            <button 
              onClick={checkSettingsStatus}
              className={`${styles.button} ${styles.secondaryButton}`}
            >
              🔄 Vérifier le Statut
            </button>
          </div>

          {/* Instructions */}
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>📋 Ce qui sera configuré</h3>
            <ol className={styles.infoList}>
              <li><strong>Header par défaut</strong> avec logo texte "Sanity Boilerplate"</li>
              <li><strong>Navigation principale</strong> : Accueil, Démonstration, Studio</li>
              <li><strong>Bouton CTA</strong> vers le Studio Sanity</li>
              <li><strong>Footer complet</strong> avec 3 colonnes organisées</li>
              <li><strong>Liens utiles</strong> vers toutes les sections importantes</li>
              <li><strong>Couleurs professionnelles</strong> cohérentes avec le design</li>
            </ol>
          </div>

          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>🎯 Workflow Recommandé</h3>
            <ol className={styles.infoList}>
              <li><strong>Étape 1</strong> : Cliquez sur "Configurer les Paramètres par Défaut" ci-dessus</li>
              <li><strong>Étape 2</strong> : Allez dans Sanity Studio → Paramètres du site</li>
              <li><strong>Étape 3</strong> : Personnalisez le Header (logo, navigation, couleurs)</li>
              <li><strong>Étape 4</strong> : Personnalisez le Footer (colonnes, liens, texte)</li>
              <li><strong>Étape 5</strong> : Publiez les modifications</li>
              <li><strong>Résultat</strong> : Header et Footer mis à jour automatiquement sur tout le site</li>
            </ol>
          </div>

          {/* Accès Studio */}
          {settingsStatus?.header.configured && (
            <div className={styles.scriptsSection}>
              <h4 className={styles.scriptsTitle}>🎨 Personnaliser dans Sanity Studio</h4>
              <div className={styles.scriptsList}>
                <div className={styles.scriptItem}>
                  <Link 
                    href="/studio/desk/headerSettings" 
                    target="_blank"
                    className={styles.statusLink}
                  >
                    ⚙️ Modifier le Header
                  </Link>
                  <span> - Logo, navigation, couleurs, CTA</span>
                </div>
                <div className={styles.scriptItem}>
                  <Link 
                    href="/studio/desk/footerSettings" 
                    target="_blank"
                    className={styles.statusLink}
                  >
                    🦶 Modifier le Footer
                  </Link>
                  <span> - Colonnes, liens, texte, réseaux sociaux</span>
                </div>
                <div className={styles.scriptItem}>
                  <Link href="/" className={styles.statusLink}>🏠 Voir le Résultat</Link>
                  <span> - Aperçu des modifications en temps réel</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>🔗 Autres Administrations</h3>
            <div className={styles.scriptsList}>
              <div className={styles.scriptItem}>
                <Link href="/admin/home" className={styles.statusLink}>🏠 Admin Home</Link>
                <span> - Créer page d'accueil éditable</span>
              </div>
              <div className={styles.scriptItem}>
                <Link href="/admin/demo" className={styles.statusLink}>📋 Admin Démo</Link>
                <span> - Gérer la page de démonstration</span>
              </div>
              <div className={styles.scriptItem}>
                <Link href="/studio" className={styles.statusLink}>🎨 Sanity Studio</Link>
                <span> - Accès complet au CMS</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
