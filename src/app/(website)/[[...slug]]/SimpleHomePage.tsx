'use client'

import Link from 'next/link'

/**
 * Page d'accueil affichée uniquement si aucune page n'a été générée dans Sanity
 * Redirige l'utilisateur vers le Studio pour initialiser le site automatiquement
 */
export default function SimpleHomePage() {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        textAlign: 'center',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        padding: '4rem 3rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          fontSize: '4rem'
        }}>
          🎬
        </div>

        <h1 style={{
          fontSize: '3rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }}>
          Site non initialisé
        </h1>

        <p style={{
          fontSize: '1.3rem',
          marginBottom: '2rem',
          opacity: '0.95',
          lineHeight: '1.6'
        }}>
          Aucune page n'a encore été créée dans Sanity.
          <br />
          Ouvrez le Studio pour générer automatiquement votre site complet en quelques secondes.
        </p>

        <div style={{
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '3rem',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            marginBottom: '1rem'
          }}>
            ✨ Le système d'agents va générer :
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: '0',
            margin: '0',
            fontSize: '1.1rem',
            lineHeight: '2'
          }}>
            <li>✅ 5 pages de base (Accueil, Services, À propos, Contact, Blog)</li>
            <li>✅ Header avec navigation complète</li>
            <li>✅ Footer avec liens et informations</li>
            <li>✅ Blocs de contenu prêts à personnaliser</li>
          </ul>
        </div>

        <Link href="/studio" style={{
          background: 'white',
          color: '#667eea',
          padding: '1.5rem 3rem',
          borderRadius: '16px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '1.2rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          transition: 'all 0.3s'
        }}>
          🎨 Ouvrir le Studio Sanity
        </Link>

        <p style={{
          fontSize: '0.9rem',
          marginTop: '2rem',
          opacity: '0.8'
        }}>
          💡 La génération prend environ 10-15 secondes
        </p>
      </div>
    </div>
  )
}
