'use client'

import { useState } from 'react'
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

interface ProfessionalDemoProps {
  page: Page | null
}

export default function ProfessionalDemo({ page }: ProfessionalDemoProps) {
  const [showGuide, setShowGuide] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)

  // Si pas de page démo, afficher l'interface d'onboarding
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
              🚀
            </div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Bienvenue dans la Démonstration
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#4a5568',
              lineHeight: '1.6'
            }}>
              Découvrez la puissance du système de blocs universels de ce boilerplate
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
              🎯 Pour commencer votre expérience
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
                  <strong>Importez la démonstration</strong><br />
                  <span style={{ color: '#718096', fontSize: '0.9rem' }}>
                    Créez automatiquement une page avec tous les blocs disponibles
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
                  <strong>Explorez les fonctionnalités</strong><br />
                  <span style={{ color: '#718096', fontSize: '0.9rem' }}>
                    Découvrez chaque bloc et ses possibilités de personnalisation
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
                  background: '#9f7aea',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>3</div>
                <div>
                  <strong>Personnalisez dans Studio</strong><br />
                  <span style={{ color: '#718096', fontSize: '0.9rem' }}>
                    Modifiez le contenu directement dans l'interface Sanity
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
              href="/admin/demo"
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
              🚀 Importer la Démonstration
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
              🎨 Ouvrir Sanity Studio
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
              💡 <strong>Première visite ?</strong> L'import de la démo est recommandé pour découvrir 
              toutes les possibilités du boilerplate en quelques secondes.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Si pas de blocs, interface simplifiée
  if (!page.pageBuilder || page.pageBuilder.length === 0) {
    return (
      <div style={{
        background: '#f7fafc',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '600px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '1rem'
          }}>
            {page.title}
          </h1>
          <p style={{
            color: '#718096',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Cette page existe mais ne contient pas encore de blocs de démonstration.
            Ajoutez du contenu via Sanity Studio pour voir la magie opérer !
          </p>
          <Link 
            href="/studio"
            style={{
              background: '#4299e1',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-block'
            }}
          >
            🎨 Éditer dans Studio
          </Link>
        </div>
      </div>
    )
  }

  // Interface de démonstration avec guide
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
          border: '2px solid #4299e1'
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
              🎯 Guide de Démonstration
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
            Faites défiler pour découvrir tous les blocs disponibles. 
            Chaque section montre un type de contenu différent.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            <Link
              href="/studio"
              style={{
                background: '#4299e1',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}
            >
              Éditer
            </Link>
            <Link
              href="/admin/demo"
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
              Réimporter
            </Link>
          </div>
        </div>
      )}

      {/* Contenu de la démonstration */}
      <main style={{ width: '100%', minHeight: '100vh' }}>
        <BlockRenderer blocks={page.pageBuilder} />
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
          🎨 Personnaliser dans Studio
        </Link>
      </div>
    </div>
  )
}
