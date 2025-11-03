'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './AdminDemo.module.css'

interface DemoStatus {
  exists: boolean
  page?: {
    id: string
    title: string
    blocksCount: number
  }
}

export default function DemoAdminPage() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)
  const [demoStatus, setDemoStatus] = useState<DemoStatus | null>(null)

  // Vérifier le statut de la démo
  const checkDemoStatus = async () => {
    try {
      const response = await fetch('/api/import-demo')
      const data = await response.json()
      setDemoStatus(data)
    } catch (error) {
      console.error('Erreur lors de la vérification:', error)
    }
  }

  // Importer la démo
  const importDemo = async () => {
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/import-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: `✅ Démo importée avec succès ! ${data.data.blocksCount} blocs créés.`
        })
        await checkDemoStatus()
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
    checkDemoStatus()
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
            <Link href="/admin/home" className={styles.navLink}>
              Admin Home
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
              🚀 Administration de la Démo
            </h1>
            <p className={styles.description}>
              Gérez l'importation automatique de la page de démonstration dans Sanity Studio. 
              Cette interface utilise les données du fichier DEMO_SETUP.md pour créer automatiquement 
              tous les blocs configurés.
            </p>
          </div>

          {/* Status Card */}
          {demoStatus && (
            <div className={`p-4 rounded-lg border-l-4 mb-6 ${
              demoStatus.exists 
                ? 'bg-green-50 border-green-400 text-green-800' 
                : 'bg-blue-50 border-blue-400 text-blue-800'
            }`}>
              {demoStatus.exists ? (
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-lg font-semibold">✅ Page de démo existante</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><strong>Titre:</strong> {demoStatus.page?.title}</p>
                    <p><strong>Blocs:</strong> {demoStatus.page?.blocksCount}</p>
                    <div className="flex space-x-4 mt-3">
                      <Link 
                        href="/demo" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Voir la démo →
                      </Link>
                      <Link 
                        href={`/studio/desk/page;${demoStatus.page?.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Éditer dans Studio →
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-lg font-semibold">ℹ️ Aucune page de démo trouvée</span>
                </div>
              )}
            </div>
          )}

          {/* Status Message */}
          {status && (
            <div className={`p-4 rounded-lg border-l-4 mb-6 ${
              status.type === 'success' 
                ? 'bg-green-50 border-green-400 text-green-800'
                : status.type === 'error'
                ? 'bg-red-50 border-red-400 text-red-800'
                : 'bg-blue-50 border-blue-400 text-blue-800'
            }`}>
              <p className="font-medium">{status.message}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={importDemo} 
              disabled={loading}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg"
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              )}
              {loading ? 'Import en cours...' : '🚀 Importer la Démo'}
            </button>

            <button 
              onClick={checkDemoStatus}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200"
            >
              🔄 Vérifier le Statut
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Assurez-vous que votre <code className="bg-gray-200 px-2 py-1 rounded text-sm">SANITY_API_TOKEN</code> est configuré dans <code className="bg-gray-200 px-2 py-1 rounded text-sm">.env.local</code></li>
              <li>Cliquez sur "Importer la Démo" pour créer automatiquement la page</li>
              <li>La page sera créée avec le slug "demo" et tous les blocs configurés</li>
              <li>Consultez <code className="bg-gray-200 px-2 py-1 rounded text-sm">DEMO_SETUP.md</code> pour plus de détails</li>
            </ol>
          </div>

          {/* Scripts Info */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">🛠️ Scripts disponibles</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <div><code className="bg-white px-2 py-1 rounded border">npm run demo:import</code> - Import via script Node.js</div>
              <div><code className="bg-white px-2 py-1 rounded border">npm run demo:setup</code> - Configuration complète</div>
              <div><code className="bg-white px-2 py-1 rounded border">npm run demo:reset</code> - Reset et réimport</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
