'use client'

import React from 'react'
import { applyPageStyles, type PageStyleSettings } from '@/lib/theme-utils'
import '@/styles/theme-utilities.css'

interface PageWrapperProps {
  children: React.ReactNode
  pageStyles?: PageStyleSettings
  className?: string
}

export default function PageWrapper({ 
  children, 
  pageStyles, 
  className = '' 
}: PageWrapperProps) {
  // Appliquer les styles de page
  const pageTheme = applyPageStyles(pageStyles)
  
  // Styles pour la superposition d'image de fond
  const overlayStyle = pageStyles?.pageBackgroundSettings?.backgroundImage?.overlay?.enabled ? {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: pageStyles.pageBackgroundSettings.backgroundImage.overlay.color,
    opacity: (pageStyles.pageBackgroundSettings.backgroundImage.overlay.opacity || 50) / 100,
    zIndex: 1,
  } : undefined

  return (
    <div
      className={`min-h-screen relative page-styled ${className}`}
      style={pageTheme.containerStyle}
    >
      {/* Superposition pour image de fond */}
      {overlayStyle && <div style={overlayStyle} />}
      
      {/* Contenu principal */}
      <div className={`relative z-10 ${pageTheme.containerClasses}`}>
        {/* Container pour les blocs avec espacement */}
        <div className={`flex flex-col ${pageTheme.blocksGapClass}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

// Hook pour utiliser les styles de page
export function usePageStyles(pageStyles?: PageStyleSettings) {
  return applyPageStyles(pageStyles)
}
