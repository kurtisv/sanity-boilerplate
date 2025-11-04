/**
 * BlockRenderer - Composant principal pour le rendu des blocs
 * 
 * Rend dynamiquement les blocs basés sur leur type.
 * Utilise des imports dynamiques pour optimiser les performances.
 * 
 * Pour ajouter un nouveau bloc :
 * 1. Importer le composant avec dynamic()
 * 2. Ajouter un case dans le switch
 * 3. Retourner le composant avec ses props
 */

'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Type temporaire pour éviter les conflits pendant la refactorisation
type BlockData = {
  _type: string
  _key: string
  [key: string]: any
}

// Imports dynamiques pour optimiser le bundle
const TextBlock = dynamic(() => import('@/components/blocks/TextBlock/TextBlock'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded" />
})

const HeroBlock = dynamic(() => import('@/components/blocks/HeroBlock'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded" />
})

const FeatureGridBlock = dynamic(() => import('@/components/blocks/FeatureGridBlock'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded" />
})

const ContactBlock = dynamic(() => import('@/components/blocks/ContactBlock'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded" />
})

const GalleryBlock = dynamic(() => import('@/components/blocks/GalleryBlock'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded" />
})

const TeamBlock = dynamic(() => import('@/components/blocks/TeamBlock/TeamBlock'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded" />
})

const StatsBlock = dynamic(() => import('@/components/blocks/StatsBlock/StatsBlock'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-48 rounded" />
})

interface BlockRendererProps {
  blocks?: BlockData[]
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <div className="space-y-0">
      {blocks.map((block) => {
        switch (block._type) {
          case 'textBlock':
            return <TextBlock key={block._key} {...(block as any)} />
          
          case 'heroBlock':
            return <HeroBlock key={block._key} {...(block as any)} />
          
          case 'featureGridBlock':
            return <FeatureGridBlock key={block._key} {...(block as any)} />
          
          case 'contactBlock':
            return <ContactBlock key={block._key} {...(block as any)} />
          
          case 'galleryBlock':
            return <GalleryBlock key={block._key} {...(block as any)} />
          
          case 'teamBlock':
            return <TeamBlock key={block._key} {...(block as any)} />
          
          case 'statsBlock':
            return <StatsBlock key={block._key} {...(block as any)} />
          
          default:
            // Log des blocs non reconnus pour le debug
            if (process.env.NODE_ENV === 'development') {
              console.warn(`Bloc non reconnu: ${block._type}`)
            }
            return null
        }
      })}
    </div>
  )
}
