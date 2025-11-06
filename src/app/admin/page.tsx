'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Page {
  id: string
  title: string
  slug: string
}

interface PageTemplate {
  name: string
  title: string
  icon: string
  description: string
  api: string
  category: 'essential' | 'marketing' | 'content' | 'legal'
}

export default function AdminDashboard() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)
  const [activeTab, setActiveTab] = useState<'generate' | 'manage' | 'settings'>('generate')

  const pageTemplates: PageTemplate[] = [
    // Essentielles
    { name: 'home', title: 'Accueil', icon: '🏠', description: 'Page d\'accueil principale', api: 'import-home', category: 'essential' },
    { name: 'about', title: 'À Propos', icon: '👥', description: 'Présentation de l\'équipe', api: 'setup-about', category: 'essential' },
    { name: 'contact', title: 'Contact', icon: '📞', description: 'Formulaire de contact complet', api: 'setup-contact', category: 'essential' },
    { name: 'services', title: 'Services', icon: '🛠️', description: 'Nos prestations', api: 'setup-services', category: 'essential' },
    
    // Marketing
    { name: 'pricing', title: 'Tarifs', icon: '💰', description: 'Plans tarifaires', api: 'setup-pricing', category: 'marketing' },
    { name: 'demo', title: 'Démo', icon: '🚀', description: 'Démonstration complète', api: 'import-demo', category: 'marketing' },
    { name: 'showcase', title: 'Vitrine', icon: '✨', description: 'Présentation des capacités', api: 'setup-studio-showcase', category: 'marketing' },
    { name: 'portfolio', title: 'Portfolio', icon: '🎨', description: 'Réalisations clients', api: 'setup-portfolio', category: 'marketing' },
    
    // Contenu
    { name: 'blog', title: 'Blog', icon: '📝', description: 'Articles et actualités', api: 'setup-blog', category: 'content' },
    { name: 'faq', title: 'FAQ', icon: '❓', description: 'Questions fréquentes', api: 'setup-faq', category: 'content' },
    { name: 'careers', title: 'Carrières', icon: '💼', description: 'Offres d\'emploi', api: 'setup-careers', category: 'content' },
    
    // Légal
    { name: 'legal', title: 'Mentions Légales', icon: '⚖️', description: 'Informations légales', api: 'setup-legal', category: 'legal' },
  ]

  const categories = {
    essential: { title: 'Pages Essentielles', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '⭐' },
    marketing: { title: 'Marketing & Vente', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', emoji: '📈' },
    content: { title: 'Contenu & Blog', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', emoji: '📰' },
    legal: { title: 'Légal & Conformité', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', emoji: '⚖️' },
  }

  // Charger les pages existantes
  const loadPages = async () => {
    try {
      const response = await fetch('/api/delete-all-pages')
      const data = await response.json()
      if (data.success) {
        setPages(data.pages || [])
      }
    } catch (error) {
      console.error('Erreur lors du chargement des pages:', error)
    }
  }

  useEffect(() => {
    loadPages()
  }, [])

  // Générer une page
  const generatePage = async (api: string, title: string) => {
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch(`/api/${api}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: `✅ ${title} créée avec succès !`,
        })
        await loadPages()
      } else {
        setStatus({
          type: 'error',
          message: `❌ Erreur: ${data.error}`,
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `❌ Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      })
    } finally {
      setLoading(false)
    }
  }

  // Générer toutes les pages
  const generateAllPages = async () => {
    setLoading(true)
    setStatus({ type: 'info', message: '🔄 Génération de toutes les pages en cours...' })

    let successCount = 0
    let errorCount = 0

    for (const template of pageTemplates) {
      try {
        const response = await fetch(`/api/${template.api}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
          successCount++
        } else {
          errorCount++
        }
      } catch (error) {
        errorCount++
      }
    }

    setStatus({
      type: successCount > 0 ? 'success' : 'error',
      message: `✅ ${successCount} page(s) créée(s) • ❌ ${errorCount} erreur(s)`,
    })

    await loadPages()
    setLoading(false)
  }

  // Supprimer toutes les pages
  const deleteAllPages = async () => {
    if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer TOUTES les pages ? Cette action est irréversible.')) {
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/delete-all-pages', {
        method: 'POST',
      })

      const data = await response.json()

      if (data.success) {
        setStatus({
          type: 'success',
          message: `✅ ${data.deletedCount} page(s) supprimée(s)`,
        })
        await loadPages()
      } else {
        setStatus({
          type: 'error',
          message: `❌ Erreur: ${data.error}`,
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      })
    } finally {
      setLoading(false)
    }
  }

  // Supprimer une page spécifique
  const deletePage = async (pageId: string, pageTitle: string) => {
    if (!confirm(`⚠️ Supprimer la page "${pageTitle}" ?`)) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/delete-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus({
          type: 'success',
          message: `✅ Page "${pageTitle}" supprimée`,
        })
        await loadPages()
      } else {
        setStatus({
          type: 'error',
          message: `❌ Erreur: ${data.error}`,
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      })
    } finally {
      setLoading(false)
    }
  }

  // Configurer Header/Footer
  const setupHeaderFooter = async (type: 'header' | 'footer') => {
    setLoading(true)

    try {
      const response = await fetch(`/api/setup-${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      if (data.success) {
        setStatus({
          type: 'success',
          message: `✅ ${type === 'header' ? 'Header' : 'Footer'} configuré avec succès !`,
        })
      } else {
        setStatus({
          type: 'error',
          message: `❌ Erreur: ${data.error}`,
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: `❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      })
    } finally {
      setLoading(false)
    }
  }

  const apis = pageTemplates

  const validations = [
    { title: 'seoDescription', limit: '160 caractères', type: 'Page' },
    { title: 'title (Hero, Features)', limit: '100 caractères', type: 'Blocs' },
    { title: 'subtitle', limit: '100-300 caractères', type: 'Blocs' },
    { title: 'description', limit: '100 caractères', type: 'Features' },
    { title: 'label', limit: '50 caractères', type: 'FormFields' },
    { title: 'placeholder', limit: '100 caractères', type: 'FormFields' },
    { title: 'number (STRING)', limit: '20 caractères', type: 'Stats' },
  ]

  const fieldTypes = {
    valid: ['name', 'email', 'phone', 'company', 'subject', 'message', 'textarea', 'url', 'custom'],
    invalid: [
      { wrong: 'text', correct: 'name ou custom' },
      { wrong: 'tel', correct: 'phone' },
      { wrong: 'select', correct: 'subject ou custom' }
    ]
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 'var(--spacing-8)',
      fontFamily: 'var(--font-family-primary)',
    }}>
      <div style={{ maxWidth: 'var(--max-width-7xl)', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'var(--color-white)',
          borderRadius: 'var(--border-radius-2xl)',
          padding: 'var(--spacing-12)',
          marginBottom: 'var(--spacing-8)',
          boxShadow: 'var(--shadow-2xl)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-6)', marginBottom: 'var(--spacing-8)' }}>
            <div>
              <h1 style={{
                fontSize: 'var(--font-size-5xl)',
                fontWeight: 'var(--font-weight-extrabold)',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                marginBottom: 'var(--spacing-3)',
                letterSpacing: '-0.02em',
              }}>
                🎯 Gestionnaire de Boilerplate
              </h1>
              <p style={{ color: 'var(--color-gray-600)', margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}>
                Gérez toutes vos pages et configurations en un seul endroit
              </p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
              <Link href="/studio" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                padding: 'var(--spacing-3) var(--spacing-6)',
                borderRadius: 'var(--border-radius-lg)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all var(--transition-base)',
              }}>
                🎨 Studio
              </Link>
              <Link href="/" style={{
                background: 'var(--color-gray-100)',
                color: 'var(--color-gray-700)',
                textDecoration: 'none',
                padding: 'var(--spacing-3) var(--spacing-6)',
                borderRadius: 'var(--border-radius-lg)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)',
                transition: 'all var(--transition-base)',
              }}>
                🏠 Site
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--spacing-4)',
          }}>
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: 'var(--spacing-6)', borderRadius: 'var(--border-radius-xl)', textAlign: 'center', boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)' }}>
              <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)', color: 'white' }}>{pages.length}</div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.9)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--spacing-1)' }}>Pages Créées</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: 'var(--spacing-6)', borderRadius: 'var(--border-radius-xl)', textAlign: 'center', boxShadow: '0 4px 15px rgba(240, 147, 251, 0.3)' }}>
              <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)', color: 'white' }}>{pageTemplates.length}</div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.9)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--spacing-1)' }}>Templates</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', padding: 'var(--spacing-6)', borderRadius: 'var(--border-radius-xl)', textAlign: 'center', boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)' }}>
              <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)', color: 'white' }}>19</div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.9)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--spacing-1)' }}>Blocs</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', padding: 'var(--spacing-6)', borderRadius: 'var(--border-radius-xl)', textAlign: 'center', boxShadow: '0 4px 15px rgba(67, 233, 123, 0.3)' }}>
              <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-extrabold)', color: 'white' }}>100%</div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.9)', fontWeight: 'var(--font-weight-semibold)', marginTop: 'var(--spacing-1)' }}>Conformité</div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div style={{
            background: status.type === 'success' ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' : status.type === 'error' ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            border: `2px solid ${status.type === 'success' ? 'var(--color-success)' : status.type === 'error' ? 'var(--color-error)' : 'var(--color-info)'}`,
            borderRadius: 'var(--border-radius-xl)',
            padding: 'var(--spacing-6)',
            marginBottom: 'var(--spacing-8)',
            color: status.type === 'success' ? '#065f46' : status.type === 'error' ? '#991b1b' : '#1e40af',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-base)',
            boxShadow: 'var(--shadow-md)',
          }}>
            {status.message}
          </div>
        )}

        {/* Tabs */}
        <div style={{
          background: 'var(--color-white)',
          borderRadius: 'var(--border-radius-xl)',
          padding: 'var(--spacing-2)',
          marginBottom: 'var(--spacing-8)',
          display: 'flex',
          gap: 'var(--spacing-2)',
          boxShadow: 'var(--shadow-lg)',
        }}>
          {[
            { id: 'generate', label: 'Générer', icon: '🚀', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { id: 'manage', label: 'Gérer', icon: '📋', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
            { id: 'settings', label: 'Paramètres', icon: '⚙️', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1,
                padding: 'var(--spacing-4) var(--spacing-6)',
                background: activeTab === tab.id ? tab.gradient : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--color-gray-600)',
                border: 'none',
                borderRadius: 'var(--border-radius-lg)',
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-bold)',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                boxShadow: activeTab === tab.id ? '0 4px 15px rgba(0,0,0,0.2)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-2)',
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'generate' && (
          <div>
            {/* Actions Rapides */}
            <div style={{
              background: 'var(--color-white)',
              borderRadius: 'var(--border-radius-2xl)',
              padding: 'var(--spacing-8)',
              marginBottom: 'var(--spacing-8)',
              boxShadow: 'var(--shadow-xl)',
            }}>
              <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-6)', color: 'var(--color-gray-900)' }}>
                ⚡ Actions Rapides
              </h2>
              <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
                <button
                  onClick={generateAllPages}
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    padding: 'var(--spacing-4) var(--spacing-8)',
                    borderRadius: 'var(--border-radius-xl)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-bold)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
                    transition: 'all var(--transition-base)',
                  }}
                >
                  🚀 Générer Toutes les Pages
                </button>
                <button
                  onClick={deleteAllPages}
                  disabled={loading || pages.length === 0}
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    border: 'none',
                    padding: 'var(--spacing-4) var(--spacing-8)',
                    borderRadius: 'var(--border-radius-xl)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-bold)',
                    cursor: loading || pages.length === 0 ? 'not-allowed' : 'pointer',
                    opacity: loading || pages.length === 0 ? 0.6 : 1,
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
                    transition: 'all var(--transition-base)',
                  }}
                >
                  🗑️ Supprimer Toutes les Pages
                </button>
              </div>
            </div>

            {/* Templates par Catégorie */}
            {Object.entries(categories).map(([key, cat]) => {
              const templates = pageTemplates.filter(t => t.category === key)
              return (
                <div key={key} style={{
                  background: 'var(--color-white)',
                  borderRadius: 'var(--border-radius-2xl)',
                  padding: 'var(--spacing-8)',
                  marginBottom: 'var(--spacing-8)',
                  boxShadow: 'var(--shadow-xl)',
                }}>
                  <h2 style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    marginBottom: 'var(--spacing-6)',
                    background: cat.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                  }}>
                    {cat.emoji} {cat.title}
                  </h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 'var(--spacing-6)',
                  }}>
                    {templates.map((template) => (
                      <div key={template.name} style={{
                        background: 'var(--color-gray-50)',
                        border: '2px solid var(--color-gray-200)',
                        borderRadius: 'var(--border-radius-xl)',
                        padding: 'var(--spacing-6)',
                        transition: 'all var(--transition-base)',
                      }}>
                        <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-4)' }}>{template.icon}</div>
                        <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-2)', color: 'var(--color-gray-900)' }}>
                          {template.title}
                        </h3>
                        <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-4)', lineHeight: 'var(--line-height-relaxed)' }}>
                          {template.description}
                        </p>
                        <button
                          onClick={() => generatePage(template.api, template.title)}
                          disabled={loading}
                          style={{
                            width: '100%',
                            background: cat.gradient,
                            color: 'white',
                            border: 'none',
                            padding: 'var(--spacing-3)',
                            borderRadius: 'var(--border-radius-lg)',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.6 : 1,
                            transition: 'all var(--transition-base)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                          }}
                        >
                          Générer
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Onglet Gérer */}
        {activeTab === 'manage' && (
          <div style={{
            background: 'var(--color-white)',
            borderRadius: 'var(--border-radius-2xl)',
            padding: 'var(--spacing-8)',
            boxShadow: 'var(--shadow-xl)',
          }}>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-6)', color: 'var(--color-gray-900)' }}>
              📋 Pages Existantes ({pages.length})
            </h2>
            {pages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--spacing-16)', color: 'var(--color-gray-500)' }}>
                <div style={{ fontSize: '5rem', marginBottom: 'var(--spacing-4)' }}>📄</div>
                <p style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-2)' }}>Aucune page créée</p>
                <p style={{ fontSize: 'var(--font-size-base)' }}>Utilisez l'onglet "Générer" pour créer des pages</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                {pages.map((page) => (
                  <div key={page.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--spacing-6)',
                    background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                    border: '2px solid var(--color-gray-200)',
                    borderRadius: 'var(--border-radius-xl)',
                    transition: 'all var(--transition-base)',
                  }}>
                    <div>
                      <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-1)', color: 'var(--color-gray-900)' }}>
                        {page.title}
                      </h3>
                      <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
                        /{page.slug}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                      <Link
                        href={`/${page.slug}`}
                        target="_blank"
                        style={{
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          color: 'white',
                          textDecoration: 'none',
                          padding: 'var(--spacing-2) var(--spacing-4)',
                          borderRadius: 'var(--border-radius-lg)',
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-2)',
                          boxShadow: '0 4px 10px rgba(79, 172, 254, 0.3)',
                        }}
                      >
                        👁️ Voir
                      </Link>
                      <button
                        onClick={() => deletePage(page.id, page.title)}
                        disabled={loading}
                        style={{
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          color: 'white',
                          border: 'none',
                          padding: 'var(--spacing-2) var(--spacing-4)',
                          borderRadius: 'var(--border-radius-lg)',
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          opacity: loading ? 0.6 : 1,
                          boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)',
                        }}
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Onglet Paramètres */}
        {activeTab === 'settings' && (
          <div>
            {/* Header & Footer */}
            <div style={{
              background: 'var(--color-white)',
              borderRadius: 'var(--border-radius-2xl)',
              padding: 'var(--spacing-8)',
              marginBottom: 'var(--spacing-8)',
              boxShadow: 'var(--shadow-xl)',
            }}>
              <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-6)', color: 'var(--color-gray-900)' }}>
                🎨 Header & Footer
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-6)' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                  border: '2px solid var(--color-gray-200)',
                  borderRadius: 'var(--border-radius-xl)',
                  padding: 'var(--spacing-6)',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-4)' }}>🎯</div>
                  <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-2)', color: 'var(--color-gray-900)' }}>
                    Header
                  </h3>
                  <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-4)', lineHeight: 'var(--line-height-relaxed)' }}>
                    Navigation principale avec logo et menu
                  </p>
                  <button
                    onClick={() => setupHeaderFooter('header')}
                    disabled={loading}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      padding: 'var(--spacing-3)',
                      borderRadius: 'var(--border-radius-lg)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.6 : 1,
                      boxShadow: '0 4px 10px rgba(102, 126, 234, 0.4)',
                    }}
                  >
                    Configurer Header
                  </button>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                  border: '2px solid var(--color-gray-200)',
                  borderRadius: 'var(--border-radius-xl)',
                  padding: 'var(--spacing-6)',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-4)' }}>🦶</div>
                  <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-2)', color: 'var(--color-gray-900)' }}>
                    Footer
                  </h3>
                  <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-4)', lineHeight: 'var(--line-height-relaxed)' }}>
                    Pied de page avec liens et réseaux sociaux
                  </p>
                  <button
                    onClick={() => setupHeaderFooter('footer')}
                    disabled={loading}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      padding: 'var(--spacing-3)',
                      borderRadius: 'var(--border-radius-lg)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.6 : 1,
                      boxShadow: '0 4px 10px rgba(102, 126, 234, 0.4)',
                    }}
                  >
                    Configurer Footer
                  </button>
                </div>
              </div>
            </div>

            {/* Liens Utiles */}
            <div style={{
              background: 'var(--color-white)',
              borderRadius: 'var(--border-radius-2xl)',
              padding: 'var(--spacing-8)',
              boxShadow: 'var(--shadow-xl)',
            }}>
              <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-6)', color: 'var(--color-gray-900)' }}>
                🔗 Liens Utiles
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-4)' }}>
                {[
                  { href: '/studio', label: '🎨 Sanity Studio', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
                  { href: '/admin/pages', label: '📄 Générer Pages', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
                  { href: '/demo', label: '🚀 Voir la Démo', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
                  { href: '/admin/cleanup', label: '🧹 Nettoyage', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
                ].map((link) => (
                  <Link key={link.href} href={link.href} style={{
                    display: 'block',
                    padding: 'var(--spacing-4)',
                    background: link.gradient,
                    borderRadius: 'var(--border-radius-xl)',
                    textDecoration: 'none',
                    color: 'white',
                    fontWeight: 'var(--font-weight-semibold)',
                    textAlign: 'center',
                    transition: 'all var(--transition-base)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                  }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: 'var(--spacing-16)',
        padding: 'var(--spacing-8)',
        color: 'white',
        opacity: 0.9
      }}>
        <p style={{ fontSize: 'var(--font-size-base)', margin: 0, fontWeight: 'var(--font-weight-medium)' }}>
          Sanity + Next.js Professional Boilerplate
        </p>
        <p style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--spacing-2)', opacity: 0.8 }}>
          Système complet de gestion de pages avec {pageTemplates.length} templates et 19 blocs
        </p>
      </div>
    </div>
  )
}
