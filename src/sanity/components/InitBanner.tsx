'use client'

import { useEffect, useState } from 'react'
import { Card, Text, Button, Flex, Stack, Spinner } from '@sanity/ui'

/**
 * Banner de bienvenue et d'initialisation automatique
 * Affiché uniquement si le site n'est pas encore initialisé
 */
export function InitBanner() {
  const [needsInit, setNeedsInit] = useState(false)
  const [loading, setLoading] = useState(true)
  const [initializing, setInitializing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkInitStatus()
  }, [])

  async function checkInitStatus() {
    try {
      const response = await fetch('/api/init-site')
      const data = await response.json()
      setNeedsInit(data.needsInit)
    } catch (err: any) {
      console.error('Erreur lors de la vérification:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleInit() {
    setInitializing(true)
    setError(null)

    try {
      const response = await fetch('/api/init-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteName: 'Mon Site',
          primaryColor: '#3b82f6',
          designStyle: 'modern'
        })
      })

      const data = await response.json()

      if (data.success) {
        setResult(data)
        setNeedsInit(false)
        
        // Rafraîchir le Studio après 2 secondes
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setError(data.error || 'Erreur lors de l\'initialisation')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setInitializing(false)
    }
  }

  if (loading) {
    return null
  }

  if (!needsInit && !result) {
    return null
  }

  if (result) {
    return (
      <Card padding={4} radius={2} shadow={1} tone="positive" style={{ marginBottom: '1rem' }}>
        <Stack space={3}>
          <Text size={2} weight="bold">
            🎉 Site initialisé avec succès !
          </Text>
          <Text size={1}>
            {result.results.pages.filter((p: any) => p.success).length} pages créées
            • Header et Footer configurés
            • Durée: {Math.round(result.duration / 1000)}s
          </Text>
          <Text size={1} muted>
            Le Studio va se rafraîchir automatiquement...
          </Text>
        </Stack>
      </Card>
    )
  }

  return (
    <Card padding={4} radius={2} shadow={1} tone="primary" style={{ marginBottom: '1rem' }}>
      <Stack space={4}>
        <Stack space={2}>
          <Text size={2} weight="bold">
            🎬 Bienvenue dans votre Studio Sanity !
          </Text>
          <Text size={1}>
            Votre site n'est pas encore initialisé. Le système d'agents peut générer automatiquement :
          </Text>
        </Stack>

        <Stack space={2}>
          <Flex gap={2} align="center">
            <Text size={1}>✅</Text>
            <Text size={1}>5 pages de base (Accueil, Services, À propos, Contact, Blog)</Text>
          </Flex>
          <Flex gap={2} align="center">
            <Text size={1}>✅</Text>
            <Text size={1}>Header avec navigation complète</Text>
          </Flex>
          <Flex gap={2} align="center">
            <Text size={1}>✅</Text>
            <Text size={1}>Footer avec liens et informations de contact</Text>
          </Flex>
          <Flex gap={2} align="center">
            <Text size={1}>✅</Text>
            <Text size={1}>Blocs de contenu prêts à personnaliser</Text>
          </Flex>
        </Stack>

        {error && (
          <Card padding={3} radius={2} tone="critical">
            <Text size={1}>❌ {error}</Text>
          </Card>
        )}

        <Flex gap={3}>
          <Button
            text={initializing ? 'Génération en cours...' : '🚀 Générer mon site'}
            tone="positive"
            onClick={handleInit}
            disabled={initializing}
            icon={initializing ? Spinner : undefined}
          />
          <Button
            text="Plus tard"
            mode="ghost"
            onClick={() => setNeedsInit(false)}
            disabled={initializing}
          />
        </Flex>

        <Text size={1} muted>
          💡 Cette opération prend environ 10-15 secondes. Vous pourrez personnaliser toutes les pages après la génération.
        </Text>
      </Stack>
    </Card>
  )
}
