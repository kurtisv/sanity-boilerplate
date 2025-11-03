import { Metadata } from 'next'
import ThemeDemo from '@/components/examples/ThemeDemo'

export const metadata: Metadata = {
  title: 'Démonstration du Système de Thème',
  description: 'Testez et explorez le système de thème avec les modes clair, sombre et automatique.',
}

/**
 * Page de démonstration du système de thème
 * 
 * Cette page permet de tester et visualiser :
 * - Les différents thèmes (clair, sombre, automatique)
 * - Les variantes du composant ThemeToggle
 * - La palette de couleurs adaptative
 * - Les transitions entre thèmes
 */
export default function ThemeDemoPage() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      padding: 'var(--spacing-8) var(--spacing-4)',
      background: 'var(--theme-bg-secondary)'
    }}>
      <ThemeDemo />
    </main>
  )
}
