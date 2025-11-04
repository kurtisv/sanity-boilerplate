'use client'

import Link from 'next/link'

export default function SimpleHomePage() {
  return (
    <div style={{ 
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#2d3748',
      minHeight: '100vh'
    }}>

      {/* Hero Section Principal */}
      <section style={{ 
        padding: '6rem 0 5rem', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          padding: '0 2rem'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            fontSize: '3rem',
            backdropFilter: 'blur(10px)'
          }}>
            🚀
          </div>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            lineHeight: '1.2',
            letterSpacing: '-0.025em'
          }}>
            Boilerplate Next.js + Sanity
          </h1>
          
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '3rem',
            fontWeight: '300',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            opacity: '0.95'
          }}>
            Solution professionnelle complète pour créer des sites web modernes avec un système de gestion de contenu intégré et des blocs universels personnalisables.
          </p>
          
          {/* Boutons d'Action Principaux */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/demo" style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '1.25rem 2.5rem',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'all 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              📋 Voir la Démonstration
            </Link>
            
            <Link href="/studio" style={{
              background: 'white',
              color: '#667eea',
              padding: '1.25rem 2.5rem',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'all 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}>
              🎨 Accéder au Studio
            </Link>
          </div>
        </div>
      </section>

      {/* Section Présentation */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '600',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Qu'est-ce que ce boilerplate ?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#4a5568',
              lineHeight: '1.6',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Une base technique professionnelle qui vous permet de créer rapidement des sites web modernes avec un système de blocs universels entièrement personnalisables.
            </p>
          </div>
          
          {/* Fonctionnalités */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧩</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1a202c' }}>
                Système de Blocs
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                8 blocs universels prêts à l'emploi : Hero, Features, Gallery, Team, Contact, et plus encore.
              </p>
            </div>
            
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1a202c' }}>
                Next.js + Sanity
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Framework moderne avec CMS headless pour une performance optimale et une gestion de contenu intuitive.
              </p>
            </div>
            
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1a202c' }}>
                Prêt à l'Emploi
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Configuration complète, déploiement automatisé, et interface d'administration intégrée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Actions */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Commencez votre exploration
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#4a5568',
              lineHeight: '1.6'
            }}>
              Choisissez votre point d'entrée pour découvrir les fonctionnalités
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {/* Démonstration */}
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '16px',
              padding: '2.5rem',
              textAlign: 'center',
              transition: 'all 0.3s'
            }}>
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
                📋
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '1rem'
              }}>
                Page Démonstration
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4a5568',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                Explorez tous les blocs disponibles dans une mise en page professionnelle. Parfait pour comprendre les possibilités du système.
              </p>
              <Link href="/demo" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'inline-block',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
              }}>
                Explorer la Démo →
              </Link>
            </div>
            
            {/* Studio */}
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '16px',
              padding: '2.5rem',
              textAlign: 'center',
              transition: 'all 0.3s'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem'
              }}>
                🎨
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '1rem'
              }}>
                Sanity Studio
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4a5568',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                Interface d'administration complète pour créer et gérer votre contenu. Créez vos pages, configurez vos blocs, et publiez instantanément.
              </p>
              <Link href="/studio" style={{
                background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'inline-block',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(45, 55, 72, 0.4)'
              }}>
                Ouvrir le Studio →
              </Link>
            </div>

            {/* Services */}
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '16px',
              padding: '2.5rem',
              textAlign: 'center',
              transition: 'all 0.3s'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem'
              }}>
                🛠️
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '1rem'
              }}>
                Nos Services
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4a5568',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                Découvrez nos services de développement web professionnel. Solutions complètes avec Next.js et Sanity CMS.
              </p>
              <Link href="/services" style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'inline-block',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)'
              }}>
                Voir nos Services →
              </Link>
            </div>

            {/* Vitrine Studio */}
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '16px',
              padding: '2.5rem',
              textAlign: 'center',
              transition: 'all 0.3s'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem'
              }}>
                🖼️
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '1rem'
              }}>
                Vitrine Studio
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4a5568',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                Page qui présente automatiquement tous les blocs que vous créez dans Studio. Mise à jour en temps réel et design professionnel.
              </p>
              <Link href="/studio-showcase" style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'inline-block',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
              }}>
                Voir la Vitrine →
              </Link>
            </div>
          </div>
          
          {/* Toutes les Pages */}
          <div style={{ marginTop: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '1rem'
              }}>
                Toutes les Pages Disponibles
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4a5568',
                lineHeight: '1.6'
              }}>
                Explorez l'ensemble des pages créées pour ce boilerplate professionnel
              </p>
            </div>

            {/* Pages Business */}
            <div style={{ marginBottom: '3rem' }}>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                📊 Pages Business
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                <Link href="/about" style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>👥</div>
                  <div>
                    <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#1a202c', margin: '0 0 0.3rem' }}>
                      À Propos
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#4a5568', margin: '0' }}>
                      Équipe & mission
                    </p>
                  </div>
                </Link>

                <Link href="/services" style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>🛠️</div>
                  <div>
                    <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#1a202c', margin: '0 0 0.3rem' }}>
                      Services
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#4a5568', margin: '0' }}>
                      Nos expertises
                    </p>
                  </div>
                </Link>

                <Link href="/pricing" style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>💰</div>
                  <div>
                    <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#1a202c', margin: '0 0 0.3rem' }}>
                      Tarifs
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#4a5568', margin: '0' }}>
                      Plans & devis
                    </p>
                  </div>
                </Link>

                <Link href="/contact" style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>📞</div>
                  <div>
                    <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#1a202c', margin: '0 0 0.3rem' }}>
                      Contact
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#4a5568', margin: '0' }}>
                      Nous joindre
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Pages Contenu */}
            <div style={{ marginBottom: '3rem' }}>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                📝 Pages Contenu
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                <Link href="/portfolio" style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>🎨</div>
                  <div>
                    <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#1a202c', margin: '0 0 0.3rem' }}>
                      Portfolio
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#4a5568', margin: '0' }}>
                      Nos réalisations
                    </p>
                  </div>
                </Link>

                <Link href="/blog" style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>📝</div>
                  <div>
                    <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#1a202c', margin: '0 0 0.3rem' }}>
                      Blog
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#4a5568', margin: '0' }}>
                      Articles tech
                    </p>
                  </div>
                </Link>

                <Link href="/faq" style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>❓</div>
                  <div>
                    <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#1a202c', margin: '0 0 0.3rem' }}>
                      FAQ
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#4a5568', margin: '0' }}>
                      Questions/réponses
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Pages Légales & Autres */}
            <div>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                ⚖️ Pages Légales & Autres
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                <Link href="/legal" style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>⚖️</div>
                  <div>
                    <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#1a202c', margin: '0 0 0.3rem' }}>
                      Mentions Légales
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#4a5568', margin: '0' }}>
                      Légal & RGPD
                    </p>
                  </div>
                </Link>

                <Link href="/careers" style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>💼</div>
                  <div>
                    <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#1a202c', margin: '0 0 0.3rem' }}>
                      Carrières
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: '#4a5568', margin: '0' }}>
                      Offres d'emploi
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
