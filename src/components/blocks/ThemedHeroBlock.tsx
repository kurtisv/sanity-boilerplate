'use client'

import React from 'react'
import Link from 'next/link'
import { applyTheme, type ThemeSettings } from '@/lib/theme-utils'
import '@/styles/theme-utilities.css'

type ThemedHeroBlockProps = {
  title: string
  subtitle?: string
  ctaButtons?: Array<{
    text: string
    href: string
    variant: 'primary' | 'secondary' | 'ghost'
    size: 'sm' | 'md' | 'lg'
  }>
  layout?: 'centered' | 'left-image' | 'right-image' | 'fullwidth'
  heroSettings?: {
    height?: 'small' | 'medium' | 'large' | 'fullscreen'
    verticalAlignment?: 'top' | 'center' | 'bottom'
  }
} & ThemeSettings

export default function ThemedHeroBlock({
  title,
  subtitle,
  ctaButtons = [],
  layout = 'centered',
  heroSettings,
  backgroundSettings,
  styling,
  typography,
}: ThemedHeroBlockProps) {
  // Appliquer le thème
  const theme = applyTheme({ backgroundSettings, styling, typography })
  
  // Déterminer la hauteur
  const getHeightClass = () => {
    switch (heroSettings?.height) {
      case 'small': return 'min-h-[400px]'
      case 'medium': return 'min-h-[600px]'
      case 'large': return 'min-h-[800px]'
      case 'fullscreen': return 'min-h-screen'
      default: return 'min-h-[600px]'
    }
  }

  // Déterminer l'alignement vertical
  const getVerticalAlignmentClass = () => {
    switch (heroSettings?.verticalAlignment) {
      case 'top': return 'items-start pt-20'
      case 'bottom': return 'items-end pb-20'
      case 'center':
      default: return 'items-center'
    }
  }

  // Styles pour la superposition d'image
  const overlayStyle = backgroundSettings?.backgroundImage?.overlay?.enabled ? {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: backgroundSettings.backgroundImage.overlay.color,
    opacity: (backgroundSettings.backgroundImage.overlay.opacity || 50) / 100,
    zIndex: 1,
  } : undefined

  return (
    <section
      className={`
        relative w-full flex ${getVerticalAlignmentClass()} ${getHeightClass()}
        ${theme.containerClasses}
      `}
      style={theme.containerStyle}
    >
      {/* Superposition pour image de fond */}
      {overlayStyle && <div style={overlayStyle} />}
      
      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`
          ${layout === 'centered' ? 'text-center' : ''}
          ${layout === 'left-image' ? 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center' : ''}
          ${layout === 'right-image' ? 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center' : ''}
        `}>
          
          {/* Contenu textuel */}
          <div className={`
            ${layout === 'right-image' ? 'lg:order-1' : ''}
            ${styling?.alignment === 'left' ? 'text-left' : ''}
            ${styling?.alignment === 'center' ? 'text-center' : ''}
            ${styling?.alignment === 'right' ? 'text-right' : ''}
          `}>
            {/* Titre principal */}
            <h1 
              className={`
                font-bold mb-6 leading-tight
                ${theme.headingClasses}
                ${typography?.headingSize === 'sm' ? 'text-4xl' : ''}
                ${typography?.headingSize === 'md' ? 'text-5xl' : ''}
                ${typography?.headingSize === 'lg' ? 'text-6xl' : ''}
                ${typography?.headingSize === 'xl' ? 'text-7xl' : ''}
                ${typography?.headingSize === '2xl' ? 'text-8xl' : ''}
                ${!typography?.headingSize ? 'text-5xl lg:text-6xl' : ''}
              `}
              style={{ color: styling?.headingColor || styling?.textColor }}
            >
              {title}
            </h1>

            {/* Sous-titre */}
            {subtitle && (
              <p 
                className={`
                  mb-8 max-w-3xl
                  ${theme.textClasses}
                  ${typography?.textSize === 'sm' ? 'text-lg' : ''}
                  ${typography?.textSize === 'md' ? 'text-xl' : ''}
                  ${typography?.textSize === 'lg' ? 'text-2xl' : ''}
                  ${!typography?.textSize ? 'text-xl lg:text-2xl' : ''}
                  ${styling?.alignment === 'center' ? 'mx-auto' : ''}
                `}
                style={{ color: styling?.textColor }}
              >
                {subtitle}
              </p>
            )}

            {/* Boutons CTA */}
            {ctaButtons.length > 0 && (
              <div className={`
                flex gap-4 flex-wrap
                ${styling?.alignment === 'center' ? 'justify-center' : ''}
                ${styling?.alignment === 'right' ? 'justify-end' : ''}
                ${styling?.alignment === 'left' ? 'justify-start' : ''}
              `}>
                {ctaButtons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.href}
                    className={`
                      inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold
                      transition-all duration-300 transform hover:scale-105
                      ${button.size === 'sm' ? 'px-6 py-3 text-sm' : ''}
                      ${button.size === 'lg' ? 'px-10 py-5 text-lg' : ''}
                      ${button.variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' : ''}
                      ${button.variant === 'secondary' ? 'bg-white hover:bg-gray-50 text-gray-900 shadow-lg border border-gray-200' : ''}
                      ${button.variant === 'ghost' ? 'bg-transparent hover:bg-white/10 text-current border border-current' : ''}
                    `}
                    style={button.variant === 'primary' ? { backgroundColor: styling?.accentColor } : undefined}
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Image (pour layouts avec image) */}
          {(layout === 'left-image' || layout === 'right-image') && (
            <div className="relative">
              {backgroundSettings?.backgroundImage?.asset?.url ? (
                <img
                  src={backgroundSettings.backgroundImage.asset.url}
                  alt={backgroundSettings.backgroundImage.alt || title}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-lg">Image placeholder</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
