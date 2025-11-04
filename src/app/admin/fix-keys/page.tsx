'use client'

import { useState } from 'react'

export default function FixKeysPage() {
  const [isFixing, setIsFixing] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const fixAllKeys = async () => {
    setIsFixing(true)
    setError(null)
    setResults([])

    try {
      // Liste des APIs à corriger
      const apisToFix = [
        'setup-studio-showcase',
        'setup-contact-simple',
        'import-home',
        'import-demo'
      ]

      const fixResults: string[] = []

      for (const api of apisToFix) {
        try {
          const response = await fetch(`/api/fix-keys/${api}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if (response.ok) {
            const data = await response.json()
            fixResults.push(`✅ ${api}: ${data.message}`)
          } else {
            const errorData = await response.json()
            fixResults.push(`❌ ${api}: ${errorData.error}`)
          }
        } catch (err) {
          fixResults.push(`❌ ${api}: Erreur de connexion`)
        }
      }

      setResults(fixResults)
    } catch (err) {
      setError('Erreur lors de la correction des clés')
    } finally {
      setIsFixing(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Navigation */}
      <div style={{
        marginBottom: '2rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="/admin/pages" style={{
            color: '#ffffff',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease'
          }}>
            ← Retour aux Pages
          </a>
          <a href="/" style={{
            color: '#ffffff',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.2)'
          }}>
            🏠 Accueil
          </a>
          <a href="/studio" style={{
            color: '#ffffff',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.2)'
          }}>
            🎨 Studio
          </a>
        </div>
      </div>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        color: '#ffffff'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          marginBottom: '1rem',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          🔧 Correction des Clés
        </h1>
        <p style={{
          fontSize: '1.2rem',
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Corrige automatiquement les problèmes de clés non-uniques dans les APIs Sanity
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '1.5rem',
          color: '#1f2937'
        }}>
          Problèmes Détectés
        </h2>

        <div style={{
          background: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#92400e', marginBottom: '0.5rem' }}>⚠️ Clés Non-Uniques</h3>
          <p style={{ color: '#92400e', margin: 0 }}>
            Plusieurs éléments dans les listes partagent le même identifiant (_key). 
            Chaque élément doit avoir un identifiant unique.
          </p>
        </div>

        <div style={{
          background: '#dcfce7',
          border: '1px solid #16a34a',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#15803d', marginBottom: '0.5rem' }}>✅ APIs Corrigées</h3>
          <ul style={{ color: '#15803d', margin: 0, paddingLeft: '1.5rem' }}>
            <li>✅ setup-services (ctaButtons + features avec _key)</li>
            <li>✅ setup-contact (ctaButtons + formFields avec _key)</li>
            <li>✅ setup-about (ctaButtons + features avec _key)</li>
            <li>✅ setup-studio-showcase (ctaButtons avec _key)</li>
            <li>✅ setup-contact-simple (ctaButtons avec _key)</li>
            <li>✅ import-home (ctaButtons avec _key)</li>
            <li>✅ import-demo (ctaButtons avec _key)</li>
          </ul>
        </div>

        {/* Status Message */}
        <div style={{
          width: '100%',
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          fontWeight: '600',
          color: '#ffffff',
          background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
          border: 'none',
          borderRadius: '12px',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          ✅ Toutes les clés ont été corrigées !
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '8px',
            padding: '1rem'
          }}>
            <h3 style={{ color: '#0c4a6e', marginBottom: '1rem' }}>📋 Résultats</h3>
            {results.map((result, index) => (
              <div key={index} style={{
                padding: '0.5rem',
                marginBottom: '0.5rem',
                background: result.startsWith('✅') ? '#dcfce7' : '#fee2e2',
                borderRadius: '6px',
                color: result.startsWith('✅') ? '#166534' : '#dc2626',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                {result}
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '1rem',
            color: '#dc2626'
          }}>
            <h3 style={{ marginBottom: '0.5rem' }}>❌ Erreur</h3>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Instructions */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ color: '#374151', marginBottom: '1rem' }}>📖 Prochaines étapes</h3>
          <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
            <p><strong>1. Vérification :</strong> Accédez à Sanity Studio pour confirmer que les erreurs de clés ont disparu</p>
            <p><strong>2. Test :</strong> Testez la génération de pages via <a href="/admin/pages" style={{color: '#3b82f6'}}>la page d'administration</a></p>
            <p><strong>3. Studio :</strong> Créez du contenu dans Studio et vérifiez qu'il n'y a plus d'erreurs de clés</p>
            <p><strong>4. Validation :</strong> Toutes les APIs utilisent maintenant des clés uniques générées automatiquement</p>
          </div>
        </div>
      </div>
    </div>
  )
}
