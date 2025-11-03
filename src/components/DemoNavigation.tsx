'use client'

import Link from 'next/link'
import { Button } from './ui'
import styles from './DemoNavigation.module.css'

/**
 * DemoNavigation Component
 * 
 * Bouton flottant pour accéder à la page de démonstration
 */
export default function DemoNavigation() {
  return (
    <div className={styles.demoNav}>
      <Link href="/demo" passHref>
        <Button size="lg" className={styles.demoButton}>
          🚀 Voir la Démo
        </Button>
      </Link>
    </div>
  )
}
