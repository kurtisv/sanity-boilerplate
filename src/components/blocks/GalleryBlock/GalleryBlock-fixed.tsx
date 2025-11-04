'use client'

import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

// ✅ CONFORME AU SCHÉMA - Interface strictement alignée sur galleryBlock.ts
interface GalleryBlockProps {
  // Champs de base du schéma
  title?: string                   // ✅ validation: Rule.max(100)
  subtitle?: string                // ✅ validation: Rule.max(300)
  
  // ✅ CONFORME : layout selon le schéma
  layout?: 'grid' | 'masonry' | 'carousel' | 'mosaic'
  
  // ✅ CONFORME : images array selon le schéma
  images?: Array<{
    _key?: string                  // ✅ Clé générée automatiquement par Sanity
    image?: {
      asset?: {
        _ref: string
        url?: string
      }
      hotspot?: any
      crop?: any
    }
    alt: string                    // ✅ validation: Rule.required().max(100)
    caption?: string               // ✅ validation: Rule.max(200)
    category?: string              // ✅ validation: Rule.max(50)
    featured?: boolean             // ✅ boolean
  }>
  
  // ✅ CONFORME : gridSettings objet selon le schéma
  gridSettings?: {
    columns?: {
      desktop?: number             // ✅ validation: Rule.min(1).max(6)
      tablet?: number              // ✅ validation: Rule.min(1).max(4)
      mobile?: number              // ✅ validation: Rule.min(1).max(2)
    }
    aspectRatio?: '1:1' | '4:3' | '16:9' | '3:4' | 'auto'
    gap?: 'none' | 'small' | 'medium' | 'large'
  }
  
  // ✅ CONFORME : carouselSettings objet selon le schéma
  carouselSettings?: {
    autoplay?: boolean
    autoplaySpeed?: number         // ✅ validation: Rule.min(2).max(10)
    showDots?: boolean
    showArrows?: boolean
    slidesToShow?: {
      desktop?: number             // ✅ validation: Rule.min(1).max(5)
      tablet?: number              // ✅ validation: Rule.min(1).max(3)
      mobile?: number              // ✅ validation: Rule.min(1).max(2)
    }
  }
  
  // ✅ CONFORME : filterOptions objet selon le schéma
  filterOptions?: {
    enableFilters?: boolean
    filterStyle?: 'buttons' | 'dropdown' | 'tags'
    showAllOption?: boolean
  }
  
  // ✅ CONFORME : lightboxOptions objet selon le schéma
  lightboxOptions?: {
    enableLightbox?: boolean
    showCaptions?: boolean
    showCounter?: boolean
    enableZoom?: boolean
  }
  
  // ✅ CONFORME : backgroundSettings selon themeFields
  backgroundSettings?: {
    backgroundType?: 'solid' | 'color' | 'gradient' | 'image' | 'transparent'
    backgroundColor?: string
  }
  
  // ✅ CONFORME : styling selon themeFields
  styling?: {
    containerPadding?: string
    containerMaxWidth?: string
  }
}

// Styled Components
const GalleryContainer = styled.div<{ $backgroundType?: string; $backgroundColor?: string }>`
  padding: 3rem 0;
  background: ${({ $backgroundType, $backgroundColor }) => {
    if ($backgroundType === 'color' && $backgroundColor) return $backgroundColor;
    if ($backgroundType === 'transparent') return 'transparent';
    return '#ffffff';
  }};
`

const GalleryHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1f2937;
  }
  
  p {
    font-size: 1.125rem;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
  }
`

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${({ $active }) => $active ? '#3b82f6' : '#e5e7eb'};
  background: ${({ $active }) => $active ? '#3b82f6' : 'white'};
  color: ${({ $active }) => $active ? 'white' : '#374151'};
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #3b82f6;
    background: ${({ $active }) => $active ? '#2563eb' : '#f3f4f6'};
  }
`

const GridContainer = styled.div<{ 
  $layout: string
  $columns: { desktop: number; tablet: number; mobile: number }
  $gap: string
  $aspectRatio: string
}>`
  display: grid;
  gap: ${({ $gap }) => {
    switch ($gap) {
      case 'none': return '0'
      case 'small': return '0.5rem'
      case 'large': return '2rem'
      default: return '1rem'
    }
  }};
  
  grid-template-columns: repeat(${({ $columns }) => $columns.mobile}, 1fr);
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(${({ $columns }) => $columns.tablet}, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(${({ $columns }) => $columns.desktop}, 1fr);
  }
  
  ${({ $layout }) => $layout === 'masonry' && `
    column-count: 1;
    column-gap: 1rem;
    
    @media (min-width: 768px) {
      column-count: 2;
    }
    
    @media (min-width: 1024px) {
      column-count: 3;
    }
  `}
`

const ImageCard = styled.div<{ $featured: boolean; $aspectRatio: string }>`
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  ${({ $featured }) => $featured && `
    grid-column: span 2;
    grid-row: span 2;
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: ${({ $aspectRatio }) => {
      switch ($aspectRatio) {
        case '1:1': return '1'
        case '4:3': return '4/3'
        case '16:9': return '16/9'
        case '3:4': return '3/4'
        default: return 'auto'
      }
    }};
    overflow: hidden;
  }
  
  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &:hover .overlay {
    opacity: 1;
  }
  
  .zoom-icon {
    color: white;
    width: 2rem;
    height: 2rem;
  }
`

const Caption = styled.div`
  padding: 1rem;
  
  h3 {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1f2937;
  }
  
  p {
    color: #6b7280;
    font-size: 0.875rem;
  }
`

const Lightbox = styled.div<{ $show: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: ${({ $show }) => $show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const LightboxContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`

const LightboxControls = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`

const ControlButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
  
  &.prev {
    left: 1rem;
  }
  
  &.next {
    right: 1rem;
  }
`

export default function GalleryBlock({
  title,
  subtitle,
  layout = 'grid',
  images = [],
  gridSettings,
  carouselSettings,
  filterOptions,
  lightboxOptions,
  backgroundSettings,
  styling
}: GalleryBlockProps) {
  // ✅ Images par défaut si aucune image fournie
  const defaultImages = [
    {
      _key: 'default-image-1',
      image: null,
      alt: 'Image d\'exemple 1',
      caption: 'Première image de démonstration',
      category: 'exemple',
      featured: false
    },
    {
      _key: 'default-image-2', 
      image: null,
      alt: 'Image d\'exemple 2',
      caption: 'Deuxième image de démonstration',
      category: 'exemple',
      featured: true
    },
    {
      _key: 'default-image-3',
      image: null,
      alt: 'Image d\'exemple 3', 
      caption: 'Troisième image de démonstration',
      category: 'exemple',
      featured: false
    }
  ]
  
  // Utiliser les images par défaut si aucune image n'est fournie
  const displayImages = images.length > 0 ? images : defaultImages
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1)
  const [isZoomed, setIsZoomed] = useState(false)

  // Filtrer les images par catégorie
  const filteredImages = selectedCategory === 'all' 
    ? displayImages 
    : displayImages.filter(img => img.category === selectedCategory)

  // Obtenir les catégories uniques
  const categories = Array.from(new Set(displayImages.map(img => img.category).filter(Boolean)))

  // Gestion de la lightbox
  const openLightbox = useCallback((index: number) => {
    if (lightboxOptions?.enableLightbox) {
      setLightboxIndex(index)
    }
  }, [lightboxOptions?.enableLightbox])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(-1)
    setIsZoomed(false)
  }, [])

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length)
  }, [filteredImages.length])

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }, [filteredImages.length])

  // Configuration de la grille
  const gridConfig = {
    desktop: gridSettings?.columns?.desktop || 3,
    tablet: gridSettings?.columns?.tablet || 2,
    mobile: gridSettings?.columns?.mobile || 1
  }

  return (
    <GalleryContainer 
      $backgroundType={backgroundSettings?.backgroundType}
      $backgroundColor={backgroundSettings?.backgroundColor}
    >
      <div className="container mx-auto px-4" style={{ 
        maxWidth: styling?.containerMaxWidth || '1200px',
        padding: styling?.containerPadding || '0 1rem'
      }}>
        {/* En-tête */}
        {(title || subtitle) && (
          <GalleryHeader>
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </GalleryHeader>
        )}

        {/* Filtres */}
        {filterOptions?.enableFilters && categories.length > 0 && (
          <FilterBar>
            {filterOptions.showAllOption && (
              <FilterButton
                $active={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
              >
                Tout afficher
              </FilterButton>
            )}
            {categories.map((category) => (
              <FilterButton
                key={category}
                $active={selectedCategory === category}
                onClick={() => setSelectedCategory(category || 'all')}
              >
                {category}
              </FilterButton>
            ))}
          </FilterBar>
        )}

        {/* Grille d'images */}
        <GridContainer
          $layout={layout}
          $columns={gridConfig}
          $gap={gridSettings?.gap || 'medium'}
          $aspectRatio={gridSettings?.aspectRatio || '4:3'}
        >
          {filteredImages.map((imageItem, index) => {
            const imageUrl = imageItem.image?.asset?._ref 
              ? urlFor(imageItem.image).width(800).height(600).url()
              : `https://picsum.photos/800/600?random=${index + 1}`

            return (
              <ImageCard
                key={imageItem._key || `image-${index}`}
                $featured={imageItem.featured || false}
                $aspectRatio={gridSettings?.aspectRatio || '4:3'}
                onClick={() => openLightbox(index)}
              >
                <div className="image-container">
                  <Image
                    src={imageUrl}
                    alt={imageItem.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="overlay">
                    <div className="zoom-icon">🔍</div>
                  </div>
                </div>
                {imageItem.caption && (
                  <Caption>
                    <p>{imageItem.caption}</p>
                  </Caption>
                )}
              </ImageCard>
            )
          })}
        </GridContainer>

        {/* Lightbox */}
        <Lightbox $show={lightboxIndex >= 0}>
          {lightboxIndex >= 0 && filteredImages[lightboxIndex] && (
            <LightboxContent>
              <Image
                src={filteredImages[lightboxIndex].image?.asset?._ref 
                  ? urlFor(filteredImages[lightboxIndex].image).width(1200).height(800).url()
                  : `https://picsum.photos/1200/800?random=${lightboxIndex + 1}`
                }
                alt={filteredImages[lightboxIndex].alt}
                width={1200}
                height={800}
                className={isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              
              <LightboxControls>
                {lightboxOptions?.enableZoom && (
                  <ControlButton onClick={() => setIsZoomed(!isZoomed)}>
                    🔍
                  </ControlButton>
                )}
                <ControlButton onClick={closeLightbox}>
                  ✕
                </ControlButton>
              </LightboxControls>

              {filteredImages.length > 1 && (
                <>
                  <NavigationButton className="prev" onClick={prevImage}>
                    ‹
                  </NavigationButton>
                  <NavigationButton className="next" onClick={nextImage}>
                    ›
                  </NavigationButton>
                </>
              )}

              {lightboxOptions?.showCounter && (
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'white',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem'
                }}>
                  {lightboxIndex + 1} / {filteredImages.length}
                </div>
              )}

              {lightboxOptions?.showCaptions && filteredImages[lightboxIndex].caption && (
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  right: '1rem',
                  color: 'white',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '1rem',
                  borderRadius: '0.5rem'
                }}>
                  {filteredImages[lightboxIndex].caption}
                </div>
              )}
            </LightboxContent>
          )}
        </Lightbox>
      </div>
    </GalleryContainer>
  )
}
