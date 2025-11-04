'use client'

import Link from 'next/link'

export default function AdminDashboard() {
  const apis = [
    { name: 'import-demo', title: 'Page Démo', icon: '🚀', description: 'Démonstration complète des blocs', status: '✅ Validé' },
    { name: 'setup-services', title: 'Services', icon: '🛠️', description: 'Nos prestations et services', status: '✅ Validé' },
    { name: 'setup-contact', title: 'Contact', icon: '📞', description: 'Formulaire de contact complet', status: '✅ Validé' },
    { name: 'setup-about', title: 'À Propos', icon: '👥', description: 'Équipe et expertise', status: '✅ Validé' },
    { name: 'setup-studio-showcase', title: 'Vitrine Studio', icon: '✨', description: 'Présentation des capacités', status: '✅ Validé' },
    { name: 'import-home', title: 'Home', icon: '🏠', description: 'Page d\'accueil', status: '✅ Validé' },
    { name: 'setup-contact-simple', title: 'Contact Simple', icon: '📧', description: 'Formulaire contact simplifié', status: '✅ Validé' },
    { name: 'setup-careers', title: 'Carrières', icon: '💼', description: 'Offres d\'emploi', status: '✅ Validé' },
    { name: 'setup-blog', title: 'Blog', icon: '📝', description: 'Articles et actualités', status: '✅ Validé' },
    { name: 'setup-faq', title: 'FAQ', icon: '❓', description: 'Questions fréquentes', status: '✅ Validé' },
    { name: 'setup-legal', title: 'Mentions Légales', icon: '⚖️', description: 'Informations légales', status: '✅ Validé' },
    { name: 'setup-pricing', title: 'Tarifs', icon: '💰', description: 'Plans tarifaires', status: '✅ Validé' },
    { name: 'setup-portfolio', title: 'Portfolio', icon: '🎨', description: 'Réalisations clients', status: '✅ Validé' },
  ]

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
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '3rem',
        marginBottom: '2rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            🎯 Admin Dashboard
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#6b7280',
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Système d'auto-génération de pages avec <strong>14 APIs 100% validées</strong> par Sanity
          </p>
        </div>

        {/* CTA Principal */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link href="/admin/pages" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textDecoration: 'none',
            padding: '1.25rem 2.5rem',
            borderRadius: '0.75rem',
            fontSize: '1.1rem',
            fontWeight: '700',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            transition: 'transform 0.2s',
            display: 'inline-block'
          }}>
            🚀 Générer les Pages
          </Link>
          <Link href="/studio" style={{
            background: 'white',
            color: '#667eea',
            border: '2px solid #667eea',
            textDecoration: 'none',
            padding: '1.25rem 2.5rem',
            borderRadius: '0.75rem',
            fontSize: '1.1rem',
            fontWeight: '700',
            transition: 'all 0.2s',
            display: 'inline-block'
          }}>
            🎨 Ouvrir Sanity Studio
          </Link>
          <Link href="/" style={{
            background: '#f3f4f6',
            color: '#1f2937',
            textDecoration: 'none',
            padding: '1.25rem 2.5rem',
            borderRadius: '0.75rem',
            fontSize: '1.1rem',
            fontWeight: '700',
            transition: 'all 0.2s',
            display: 'inline-block'
          }}>
            🏠 Retour au Site
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: '#667eea',
            marginBottom: '0.5rem'
          }}>14</div>
          <div style={{
            fontSize: '1.1rem',
            color: '#6b7280',
            fontWeight: '600'
          }}>APIs Validées</div>
        </div>
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: '#10b981',
            marginBottom: '0.5rem'
          }}>100%</div>
          <div style={{
            fontSize: '1.1rem',
            color: '#6b7280',
            fontWeight: '600'
          }}>Conformité Sanity</div>
        </div>
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: '#f59e0b',
            marginBottom: '0.5rem'
          }}>9</div>
          <div style={{
            fontSize: '1.1rem',
            color: '#6b7280',
            fontWeight: '600'
          }}>Blocs Disponibles</div>
        </div>
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: '#ef4444',
            marginBottom: '0.5rem'
          }}>0</div>
          <div style={{
            fontSize: '1.1rem',
            color: '#6b7280',
            fontWeight: '600'
          }}>Erreurs de Validation</div>
        </div>
      </div>

      {/* Section APIs */}
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          ✅ 14 APIs d'Auto-génération Validées
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {apis.map((api) => (
            <div
              key={api.name}
              style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                padding: '1rem',
                transition: 'all 0.2s'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{api.icon}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    {api.title}
                  </h3>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#10b981',
                    fontWeight: '600',
                    marginTop: '0.25rem'
                  }}>
                    {api.status}
                  </div>
                </div>
              </div>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                margin: 0,
                lineHeight: '1.5'
              }}>
                {api.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section Validations */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Longueurs */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📏 Longueurs Maximales
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {validations.map((validation, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: '#f9fafb',
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div>
                  <div style={{
                    fontWeight: '600',
                    color: '#1f2937',
                    fontSize: '0.9rem'
                  }}>
                    {validation.title}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}>
                    {validation.type}
                  </div>
                </div>
                <div style={{
                  padding: '0.5rem 0.75rem',
                  background: '#dbeafe',
                  color: '#1e40af',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {validation.limit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Types de Champs */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🔑 Types ContactBlock
          </h2>
          
          {/* Types Valides */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#10b981',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              ✅ Types Valides
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {fieldTypes.valid.map((type) => (
                <span
                  key={type}
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: '#d1fae5',
                    color: '#065f46',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    border: '1px solid #10b981'
                  }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Types Invalides */}
          <div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#ef4444',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              ❌ Types Invalides
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {fieldTypes.invalid.map((type, index) => (
                <div
                  key={index}
                  style={{
                    padding: '0.75rem',
                    background: '#fee2e2',
                    borderRadius: '0.5rem',
                    border: '1px solid #ef4444',
                    fontSize: '0.875rem'
                  }}
                >
                  <span style={{
                    fontWeight: '700',
                    color: '#dc2626'
                  }}>
                    {type.wrong}
                  </span>
                  {' → '}
                  <span style={{
                    color: '#065f46'
                  }}>
                    {type.correct}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section Règles Importantes */}
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          ⚡ Règles Importantes
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            padding: '1.5rem',
            background: '#eff6ff',
            border: '2px solid #3b82f6',
            borderRadius: '0.75rem'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem'
            }}>🔑</div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#1e40af',
              marginBottom: '0.5rem'
            }}>
              _key Obligatoires
            </h3>
            <p style={{
              color: '#1e40af',
              fontSize: '0.9rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              Tous les éléments d'array doivent avoir un <code>_key</code> unique
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            background: '#fef3c7',
            border: '2px solid #f59e0b',
            borderRadius: '0.75rem'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem'
            }}>📊</div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#92400e',
              marginBottom: '0.5rem'
            }}>
              Stats en STRING
            </h3>
            <p style={{
              color: '#92400e',
              fontSize: '0.9rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              Dans StatsBlock, <code>number</code> doit être un STRING, pas un Number
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            background: '#fee2e2',
            border: '2px solid #ef4444',
            borderRadius: '0.75rem'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem'
            }}>🖼️</div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#991b1b',
              marginBottom: '0.5rem'
            }}>
              Pas de GalleryBlock
            </h3>
            <p style={{
              color: '#991b1b',
              fontSize: '0.9rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              Ne PAS utiliser GalleryBlock en auto-génération (nécessite upload)
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            background: '#d1fae5',
            border: '2px solid #10b981',
            borderRadius: '0.75rem'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem'
            }}>👥</div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#065f46',
              marginBottom: '0.5rem'
            }}>
              TeamBlock Structure
            </h3>
            <p style={{
              color: '#065f46',
              fontSize: '0.9rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              Utiliser <code>members</code> (PAS teamMembers) et <code>position</code> (PAS role)
            </p>
          </div>
        </div>
      </div>

      {/* Section Navigation Rapide */}
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '1.5rem'
        }}>
          🔗 Navigation Rapide
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <Link href="/admin/pages" style={{
            display: 'block',
            padding: '1.25rem',
            background: '#f3f4f6',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            color: '#1f2937',
            fontWeight: '600',
            textAlign: 'center',
            border: '2px solid #e5e7eb',
            transition: 'all 0.2s'
          }}>
            📄 Générer Pages
          </Link>
          <Link href="/studio" style={{
            display: 'block',
            padding: '1.25rem',
            background: '#f3f4f6',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            color: '#1f2937',
            fontWeight: '600',
            textAlign: 'center',
            border: '2px solid #e5e7eb',
            transition: 'all 0.2s'
          }}>
            🎨 Sanity Studio
          </Link>
          <Link href="/admin/cleanup" style={{
            display: 'block',
            padding: '1.25rem',
            background: '#f3f4f6',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            color: '#1f2937',
            fontWeight: '600',
            textAlign: 'center',
            border: '2px solid #e5e7eb',
            transition: 'all 0.2s'
          }}>
            🧹 Nettoyage
          </Link>
          <Link href="/demo" style={{
            display: 'block',
            padding: '1.25rem',
            background: '#f3f4f6',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            color: '#1f2937',
            fontWeight: '600',
            textAlign: 'center',
            border: '2px solid #e5e7eb',
            transition: 'all 0.2s'
          }}>
            🚀 Voir la Démo
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '3rem',
        padding: '2rem',
        color: 'white',
        opacity: 0.8
      }}>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>
          Sanity + Next.js Professional Boilerplate - 14 APIs Validées
        </p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>
          Toutes les APIs respectent 100% les validations Sanity
        </p>
      </div>
    </div>
  )
}
