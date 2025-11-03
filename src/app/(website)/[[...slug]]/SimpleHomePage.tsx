'use client'

import Link from 'next/link'

export default function SimpleHomePage() {
  return (
    <div style={{ 
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#2d3748'
    }}>

      {/* Hero Section Classique */}
      <section style={{ 
        padding: '5rem 0 4rem', 
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto', 
          padding: '0 2rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '1rem',
            lineHeight: '1.2',
            letterSpacing: '-0.025em'
          }}>
            Sanity + Next.js Boilerplate
          </h1>
          
          <p style={{
            fontSize: '1.375rem',
            color: '#4a5568',
            marginBottom: '2.5rem',
            fontWeight: '400',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto 2.5rem'
          }}>
            Solution professionnelle prête à l'emploi pour créer des sites web modernes 
            avec un système de gestion de contenu intégré.
          </p>
          
          {/* Boutons d'Action Principaux */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            <Link href="/demo" style={{
              background: '#2b6cb0',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'all 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(43, 108, 176, 0.3)',
              border: 'none'
            }}>
              📋 Explorer la Démonstration
            </Link>
            
            <Link href="/studio" style={{
              background: '#ffffff',
              color: '#2d3748',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'all 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '2px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              🎨 Accéder au Studio
            </Link>
          </div>
          
          {/* Informations Complémentaires */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '600px',
            margin: '0 auto',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '0.75rem'
            }}>
              🚀 Commencez en 2 minutes
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#718096',
              lineHeight: '1.6',
              margin: 0
            }}>
              Explorez la <strong>démonstration</strong> pour voir les fonctionnalités disponibles, 
              ou accédez directement au <strong>Studio Sanity</strong> pour commencer à créer votre contenu.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <Link href="/admin/site-settings" style={{
                color: '#2b6cb0',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                display: 'inline-block',
                padding: '0.5rem 1rem',
                border: '1px solid #2b6cb0',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }}>
                ⚙️ Configurer Header & Footer dans Sanity Studio
              </Link>
            </div>
            
            <div style={{
              marginTop: '1rem',
              fontSize: '0.8rem',
              color: '#718096',
              fontStyle: 'italic'
            }}>
              💡 Le header et footer actuels utilisent les paramètres configurés dans Sanity Studio → Paramètres du site
            </div>
          </div>
        </div>
      </section>

      {/* Section Explicative */}
      <section style={{ padding: '5rem 0', background: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: '700',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Que pouvez-vous faire ?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#4a5568',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Deux options principales s'offrent à vous pour découvrir ce boilerplate
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Option 1: Démo */}
            <div style={{
              background: '#ffffff',
              border: '2px solid #e2e8f0',
              borderRadius: '16px',
              padding: '2.5rem',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #2b6cb0 0%, #3182ce 100%)',
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
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '1rem'
              }}>
                Explorer la Démonstration
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4a5568',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                Découvrez tous les blocs et fonctionnalités disponibles dans une page 
                de démonstration complète. Idéal pour comprendre les possibilités.
              </p>
              <Link href="/demo" style={{
                background: '#2b6cb0',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'inline-block',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(43, 108, 176, 0.3)'
              }}>
                Voir la Démo →
              </Link>
            </div>
            
            {/* Option 2: Studio */}
            <div style={{
              background: '#ffffff',
              border: '2px solid #e2e8f0',
              borderRadius: '16px',
              padding: '2.5rem',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
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
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '1rem'
              }}>
                Accéder au Studio Sanity
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4a5568',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                Plongez directement dans l'interface d'administration pour créer 
                et gérer votre contenu. Commencez à construire votre site.
              </p>
              <Link href="/studio" style={{
                background: '#4a5568',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'inline-block',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(74, 85, 104, 0.3)'
              }}>
                Ouvrir le Studio →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
