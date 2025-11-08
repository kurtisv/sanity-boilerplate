'use client'

import { LayoutProps } from 'sanity'
import { InitBanner } from '../components/InitBanner'

/**
 * Layout personnalisé du Studio avec banner d'initialisation
 */
export function StudioLayout(props: LayoutProps) {
  return (
    <>
      <div style={{ padding: '1rem 1rem 0 1rem' }}>
        <InitBanner />
      </div>
      {props.renderDefault(props)}
    </>
  )
}
