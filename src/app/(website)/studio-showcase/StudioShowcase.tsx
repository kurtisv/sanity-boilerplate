'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import BlockRenderer from '@/components/BlockRenderer/BlockRenderer'
import type { Block } from '@/types/blocks'

type Page = {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  seoTitle?: string
  seoDescription?: string
}

interface StudioShowcaseProps {
  page: Page | null
}

interface StudioPage {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  _updatedAt: string
}

export default function StudioShowcase({ page }: StudioShowcaseProps) {
  const [studioPages, setStudioPages] = useState<StudioPage[]>([])
  const [loading, setLoading] = useState(true)
  const [showGuide, setShowGuide] = useState(true)

  // Récupérer toutes les pages créées dans Studio
  useEffect(() => {
    const fetchStudioPages = async () => {
      try {
        const response = await fetch('/api/studio-pages')
        if (response.ok) {
          const data = await response.json()
          setStudioPages(data.pages || [])
        }
      } catch (error) {
        console.error('Erreur lors du chargement des pages Studio:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudioPages()
  }, [])

  // Si pas de page vitrine, afficher l'interface d'onboarding
  if (!page) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '3rem',
          maxWidth: '800px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2rem'
            }}>
              🎨
            </div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Vitrine Studio
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#4a5568',
              lineHeight: '1.6'
            }}>
              Créez automatiquement une page qui présente tous vos blocs Studio de manière professionnelle
            </p>
          </div>

          {/* Étapes */}
          <div style={{
            background: '#f7fafc',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              🎯 Créer votre vitrine en 2 étapes
            </h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'white',
                borderRadius: '8px',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#48bb78',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>1</div>
                <div>
                  <strong>Créez la page vitrine</strong><br />
                  <span style={{ color: '#718096', fontSize: '0.9rem' }}>
                    Générez automatiquement une page professionnelle pour présenter vos blocs
                  </span>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'white',
                borderRadius: '8px',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#4299e1',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>2</div>
                <div>
                  <strong>Créez votre contenu</strong><br />
                  <span style={{ color: '#718096', fontSize: '0.9rem' }}>
                    Ajoutez des pages et des blocs dans Studio, ils apparaîtront automatiquement ici
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link 
              href="/admin/studio-showcase"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s'
              }}
            >
              🎨 Créer la Vitrine
            </Link>
            
            <Link 
              href="/studio"
              style={{
                background: 'white',
                color: '#4a5568',
                padding: '1rem 2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '2px solid #e2e8f0',
                transition: 'all 0.3s'
              }}
            >
              🏗️ Ouvrir Studio
            </Link>
          </div>

          {/* Info supplémentaire */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#fff5f5',
            borderRadius: '8px',
            border: '1px solid #fed7d7'
          }}>
            <p style={{
              fontSize: '0.9rem',
              color: '#c53030',
              margin: 0
            }}>
              💡 <strong>Première visite ?</strong> Créez d'abord la vitrine, puis ajoutez votre contenu dans Studio. 
              La page se mettra à jour automatiquement.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Interface de vitrine avec contenu
  return (
    <div style={{ position: 'relative' }}>
      {/* Guide flottant */}
      {showGuide && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          zIndex: 1000,
          maxWidth: '300px',
          border: '2px solid #667eea'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#2d3748',
              margin: 0
            }}>
              🎨 Vitrine Studio
            </h4>
            <button
              onClick={() => setShowGuide(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: '#a0aec0'
              }}
            >
              ×
            </button>
          </div>
          
          <p style={{
            fontSize: '0.9rem',
            color: '#4a5568',
            lineHeight: '1.5',
            marginBottom: '1rem'
          }}>
            Cette page présente automatiquement tous vos blocs Studio. 
            Ajoutez du contenu dans Studio pour le voir apparaître ici.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            <Link
              href="/studio"
              style={{
                background: '#667eea',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}
            >
              Créer Contenu
            </Link>
            <Link
              href="/admin/studio-showcase"
              style={{
                background: '#f7fafc',
                color: '#4a5568',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '500',
                border: '1px solid #e2e8f0'
              }}
            >
              Gérer
            </Link>
          </div>
        </div>
      )}

      {/* Contenu principal de la vitrine */}
      <main style={{ width: '100%', minHeight: '100vh' }}>
        {/* Afficher le contenu de la page vitrine */}
        <BlockRenderer blocks={page.pageBuilder || []} />
        
        {/* Section des pages Studio créées */}
        {studioPages.length > 0 && (
          <section style={{
            padding: '5rem 0',
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 2rem'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: '600',
                  color: '#1a202c',
                  marginBottom: '1rem'
                }}>
                  🏗️ Vos Pages Studio
                </h2>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#4a5568',
                  lineHeight: '1.6'
                }}>
                  {studioPages.length} page{studioPages.length > 1 ? 's' : ''} créée{studioPages.length > 1 ? 's' : ''} dans Sanity Studio
                </p>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{
                    display: 'inline-block',
                    width: '40px',
                    height: '40px',
                    border: '4px solid #e2e8f0',
                    borderTop: '4px solid #667eea',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <p style={{ marginTop: '1rem', color: '#4a5568' }}>Chargement de vos pages...</p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '2rem'
                }}>
                  {studioPages.map((studioPage) => (
                    <div
                      key={studioPage._id}
                      style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '2rem',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                        border: '1px solid #e2e8f0',
                        transition: 'all 0.3s'
                      }}
                    >
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#1a202c',
                        marginBottom: '0.5rem'
                      }}>
                        {studioPage.title}
                      </h3>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#718096',
                        marginBottom: '1rem'
                      }}>
                        {studioPage.pageBuilder?.length || 0} bloc{(studioPage.pageBuilder?.length || 0) > 1 ? 's' : ''}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        flexWrap: 'wrap'
                      }}>
                        <Link
                          href={`/${studioPage.slug.current}`}
                          style={{
                            background: '#667eea',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '0.85rem',
                            fontWeight: '500'
                          }}
                        >
                          Voir la page
                        </Link>
                        <Link
                          href={`/studio/desk/page;${studioPage._id}`}
                          style={{
                            background: '#f7fafc',
                            color: '#4a5568',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          Éditer
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Bouton d'action flottant */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000
      }}>
        <Link
          href="/studio"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s'
          }}
        >
          🏗️ Créer du Contenu
        </Link>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
