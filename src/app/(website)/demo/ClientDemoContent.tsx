'use client'

import BlockRenderer from '@/components/BlockRenderer/BlockRenderer'
import type { Block } from '@/types/blocks'
import Link from 'next/link'

type Page = {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  seoTitle?: string
  seoDescription?: string
}

interface ClientDemoContentProps {
  page: Page | null
}

export default function ClientDemoContent({ page }: ClientDemoContentProps) {
  if (!page) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ef4444' }}>
          📋 Page de Démo Non Trouvée
        </h1>
        <p style={{ marginBottom: '2rem', color: '#6b7280', maxWidth: '600px' }}>
          La page de démonstration n'existe pas encore dans Sanity Studio. 
          Vous devez d'abord l'importer pour voir tous les blocs en action.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link 
            href="/admin/demo"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              background: '#2563eb',
              color: 'white',
              border: '2px solid #2563eb'
            }}
          >
            🚀 Importer la Démo
          </Link>
          <Link 
            href="/studio"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              background: 'transparent',
              color: '#2563eb',
              border: '2px solid #2563eb'
            }}
          >
            🎨 Sanity Studio
          </Link>
        </div>
      </div>
    )
  }

  if (!page.pageBuilder || page.pageBuilder.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          {page.title}
        </h1>
        <p style={{ marginBottom: '2rem', color: '#6b7280' }}>
          Cette page existe mais ne contient pas encore de blocs.
          Ajoutez du contenu via Sanity Studio.
        </p>
        <Link 
          href="/studio"
          style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            background: '#2563eb',
            color: 'white'
          }}
        >
          🎨 Éditer dans Studio
        </Link>
      </div>
    )
  }

  return (
    <main style={{ width: '100%', minHeight: '100vh' }}>
      <BlockRenderer blocks={page.pageBuilder} />
    </main>
  )
}
