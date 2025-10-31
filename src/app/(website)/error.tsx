'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main style={{padding: '6rem 1.5rem', textAlign: 'center'}}>
      <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Une erreur est survenue</h1>
      <p style={{color: '#6b7280', marginBottom: '1rem'}}>{error.message || "Veuillez réessayer plus tard."}</p>
      <button onClick={reset} style={{padding: '0.5rem 1rem', borderRadius: 6, background: '#111827', color: '#fff'}}>
        Réessayer
      </button>
    </main>
  )
}
