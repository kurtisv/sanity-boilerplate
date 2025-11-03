'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import * as S from './GalleryBlock.styles'

type GalleryImage = {
  image: {
    asset: {
      _id: string
      url: string
    }
  }
  alt: string
  caption?: string
  category?: string
  featured: boolean
}

type GridSettings = {
  columns: {
    desktop: number
    tablet: number
    mobile: number
  }
  aspectRatio: '1:1' | '4:3' | '16:9' | '3:4' | 'auto'
  gap: 'none' | 'small' | 'medium' | 'large'
}

type CarouselSettings = {
  autoplay: boolean
  autoplaySpeed: number
  showDots: boolean
  showArrows: boolean
  slidesToShow: {
    desktop: number
    tablet: number
    mobile: number
  }
}

type FilterOptions = {
  enableFilters: boolean
  filterStyle: 'buttons' | 'dropdown' | 'tags'
  showAllOption: boolean
}

type LightboxOptions = {
  enableLightbox: boolean
  showCaptions: boolean
  showCounter: boolean
  enableZoom: boolean
}

type GalleryBlockProps = {
  title?: string
  subtitle?: string
  layout: 'grid' | 'masonry' | 'carousel' | 'mosaic'
  images: GalleryImage[]
  gridSettings: GridSettings
  carouselSettings: CarouselSettings
  filterOptions: FilterOptions
  lightboxOptions: LightboxOptions
  styling: {
    backgroundColor: string
    textColor: string
    spacing: 'compact' | 'normal' | 'large'
    borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full'
  }
}

/**
 * GalleryBlock Component
 * 
 * Galerie d'images professionnelle avec:
 * - 4 layouts (grid, masonry, carousel, mosaic)
 * - Filtres par catégories
 * - Lightbox avec navigation
 * - Lazy loading optimisé
 * - Responsive design
 * - Animations fluides
 * 
 * @example
 * <GalleryBlock
 *   title="Notre Portfolio"
 *   layout="masonry"
 *   images={[...]}
 *   lightboxOptions={{ enableLightbox: true }}
 * />
 */
export default function GalleryBlock({
  title,
  subtitle,
  layout = 'grid',
  images = [],
  gridSettings = {
    columns: { desktop: 3, tablet: 2, mobile: 1 },
    aspectRatio: '4:3',
    gap: 'medium'
  },
  carouselSettings = {
    autoplay: false,
    autoplaySpeed: 5,
    showDots: true,
    showArrows: true,
    slidesToShow: { desktop: 3, tablet: 2, mobile: 1 }
  },
  filterOptions = {
    enableFilters: false,
    filterStyle: 'buttons',
    showAllOption: true
  },
  lightboxOptions = {
    enableLightbox: true,
    showCaptions: true,
    showCounter: true,
    enableZoom: true
  },
  styling = {
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    spacing: 'normal',
    borderRadius: 'medium'
  },
}: GalleryBlockProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Extraire les catégories uniques
  const categories = useMemo(() => {
    const cats = images
      .filter(img => img.category)
      .map(img => img.category!)
      .filter((cat, index, arr) => arr.indexOf(cat) === index)
    
    return filterOptions.showAllOption ? ['all', ...cats] : cats
  }, [images, filterOptions.showAllOption])

  // Filtrer les images par catégorie
  const filteredImages = useMemo(() => {
    if (!filterOptions.enableFilters || selectedCategory === 'all') {
      return images
    }
    return images.filter(img => img.category === selectedCategory)
  }, [images, selectedCategory, filterOptions.enableFilters])

  // Gestion de la lightbox
  const openLightbox = (index: number) => {
    if (lightboxOptions.enableLightbox) {
      setLightboxIndex(index)
      document.body.style.overflow = 'hidden'
    }
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
    }
  }

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1)
    }
  }

  // Gestion du carrousel
  const nextSlide = () => {
    const maxSlide = Math.max(0, filteredImages.length - carouselSettings.slidesToShow.desktop)
    setCurrentSlide(prev => (prev >= maxSlide ? 0 : prev + 1))
  }

  const prevSlide = () => {
    const maxSlide = Math.max(0, filteredImages.length - carouselSettings.slidesToShow.desktop)
    setCurrentSlide(prev => (prev <= 0 ? maxSlide : prev - 1))
  }

  // Rendu d'une image
  const renderImage = (image: GalleryImage, index: number) => {
    // Support pour les URLs directes (démo) et les assets Sanity
    const imageUrl = (image as any).imageUrl || urlFor(image.image).width(800).height(600).url()
    
    return (
      <S.ImageWrapper
        key={index}
        $layout={layout}
        $aspectRatio={gridSettings.aspectRatio}
        $borderRadius={styling.borderRadius}
        $featured={image.featured}
        onClick={() => openLightbox(index)}
      >
        <S.ImageContainer>
          <Image
            src={imageUrl}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
          
          {image.caption && (
            <S.ImageOverlay>
              <S.ImageCaption $textColor={styling.textColor}>
                {image.caption}
              </S.ImageCaption>
            </S.ImageOverlay>
          )}
        </S.ImageContainer>
      </S.ImageWrapper>
    )
  }

  // Rendu des filtres
  const renderFilters = () => {
    if (!filterOptions.enableFilters || categories.length <= 1) return null

    return (
      <S.FiltersWrapper>
        {filterOptions.filterStyle === 'buttons' && (
          <S.FilterButtons>
            {categories.map(category => (
              <S.FilterButton
                key={category}
                $active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Tout' : category}
              </S.FilterButton>
            ))}
          </S.FilterButtons>
        )}

        {filterOptions.filterStyle === 'dropdown' && (
          <S.FilterSelect
            value={selectedCategory}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Toutes les catégories' : category}
              </option>
            ))}
          </S.FilterSelect>
        )}

        {filterOptions.filterStyle === 'tags' && (
          <S.FilterTags>
            {categories.map(category => (
              <S.FilterTag
                key={category}
                $active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Tout' : category}
              </S.FilterTag>
            ))}
          </S.FilterTags>
        )}
      </S.FiltersWrapper>
    )
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <S.Section $backgroundColor={styling.backgroundColor} $spacing={styling.spacing}>
      <S.Container>
        {/* En-tête */}
        {(title || subtitle) && (
          <S.Header>
            {title && (
              <S.Title $textColor={styling.textColor}>
                {title}
              </S.Title>
            )}
            {subtitle && (
              <S.Subtitle $textColor={styling.textColor}>
                {subtitle}
              </S.Subtitle>
            )}
          </S.Header>
        )}

        {/* Filtres */}
        {renderFilters()}

        {/* Galerie */}
        <S.GalleryContainer $layout={layout}>
          {layout === 'grid' && (
            <S.GridGallery
              $columns={gridSettings.columns}
              $gap={gridSettings.gap}
            >
              {filteredImages.map((image, index) => renderImage(image, index))}
            </S.GridGallery>
          )}

          {layout === 'masonry' && (
            <S.MasonryGallery
              $columns={gridSettings.columns}
              $gap={gridSettings.gap}
            >
              {filteredImages.map((image, index) => renderImage(image, index))}
            </S.MasonryGallery>
          )}

          {layout === 'carousel' && (
            <S.CarouselContainer>
              <S.CarouselTrack
                $currentSlide={currentSlide}
                $slidesToShow={carouselSettings.slidesToShow.desktop}
              >
                {filteredImages.map((image, index) => renderImage(image, index))}
              </S.CarouselTrack>
              
              {carouselSettings.showArrows && (
                <>
                  <S.CarouselArrow $position="left" onClick={prevSlide}>
                    ←
                  </S.CarouselArrow>
                  <S.CarouselArrow $position="right" onClick={nextSlide}>
                    →
                  </S.CarouselArrow>
                </>
              )}
              
              {carouselSettings.showDots && (
                <S.CarouselDots>
                  {Array.from({ length: Math.ceil(filteredImages.length / carouselSettings.slidesToShow.desktop) }).map((_, index) => (
                    <S.CarouselDot
                      key={index}
                      $active={Math.floor(currentSlide / carouselSettings.slidesToShow.desktop) === index}
                      onClick={() => setCurrentSlide(index * carouselSettings.slidesToShow.desktop)}
                    />
                  ))}
                </S.CarouselDots>
              )}
            </S.CarouselContainer>
          )}

          {layout === 'mosaic' && (
            <S.MosaicGallery $gap={gridSettings.gap}>
              {filteredImages.map((image, index) => renderImage(image, index))}
            </S.MosaicGallery>
          )}
        </S.GalleryContainer>

        {/* Lightbox */}
        {lightboxIndex !== null && lightboxOptions.enableLightbox && (
          <S.Lightbox onClick={closeLightbox}>
            <S.LightboxContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <S.LightboxImage>
                <Image
                  src={(filteredImages[lightboxIndex] as any).imageUrl || urlFor(filteredImages[lightboxIndex].image).width(1200).height(900).url()}
                  alt={filteredImages[lightboxIndex].alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </S.LightboxImage>

              {lightboxOptions.showCounter && (
                <S.LightboxCounter>
                  {lightboxIndex + 1} / {filteredImages.length}
                </S.LightboxCounter>
              )}

              {lightboxOptions.showCaptions && filteredImages[lightboxIndex].caption && (
                <S.LightboxCaption>
                  {filteredImages[lightboxIndex].caption}
                </S.LightboxCaption>
              )}

              <S.LightboxClose onClick={closeLightbox}>
                ×
              </S.LightboxClose>

              <S.LightboxArrow $position="left" onClick={prevImage}>
                ←
              </S.LightboxArrow>
              <S.LightboxArrow $position="right" onClick={nextImage}>
                →
              </S.LightboxArrow>
            </S.LightboxContent>
          </S.Lightbox>
        )}
      </S.Container>
    </S.Section>
  )
}
