'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderBlockProps {
  logo?: {
    asset?: {
      url: string
    }
    alt?: string
  }
  logoText?: string
  layout?: 'split' | 'center' | 'left'
  navigationMenu?: Array<{
    _key?: string
    title: string
    link: string
    submenu?: Array<{
      _key?: string
      title: string
      link: string
    }>
  }>
  cta?: {
    text?: string
    link?: string
  }
  backgroundSettings?: any
  styling?: any
}

export default function HeaderBlock({
  logo,
  logoText,
  layout = 'split',
  navigationMenu = [],
  cta,
  backgroundSettings,
  styling
}: HeaderBlockProps) {
  const containerStyle = {
    backgroundColor: backgroundSettings?.backgroundColor || '#ffffff',
    color: styling?.textColor || '#374151',
    padding: '1rem 2rem',
    borderBottom: '1px solid #e5e7eb'
  }

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: styling?.headingColor || '#1f2937'
  }

  const navStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  }

  const linkStyle = {
    textDecoration: 'none',
    color: styling?.textColor || '#374151',
    fontWeight: '500',
    transition: 'color 0.2s ease'
  }

  const ctaStyle = {
    backgroundColor: styling?.accentColor || '#3b82f6',
    color: '#ffffff',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.2s ease'
  }

  const getLayoutStyle = () => {
    switch (layout) {
      case 'center':
        return { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '1rem' }
      case 'left':
        return { display: 'flex', alignItems: 'center', gap: '2rem' }
      default: // split
        return { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    }
  }

  return (
    <header style={{ ...containerStyle, ...getLayoutStyle() }}>
      {/* Logo */}
      <div style={logoStyle}>
        {logo?.asset?.url ? (
          <Image
            src={logo.asset.url}
            alt={logo.alt || 'Logo'}
            width={120}
            height={40}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          logoText || 'Mon Site'
        )}
      </div>

      {/* Navigation */}
      {navigationMenu.length > 0 && (
        <nav style={navStyle}>
          {navigationMenu.map((item, index) => (
            <div key={item._key || index} style={{ position: 'relative' }}>
              <Link href={item.link} style={linkStyle}>
                {item.title}
              </Link>
              {/* Submenu simple (peut être amélioré avec un dropdown) */}
              {item.submenu && item.submenu.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                  display: 'none', // Caché par défaut, peut être géré avec du state
                  minWidth: '150px',
                  zIndex: 10
                }}>
                  {item.submenu.map((subItem, subIndex) => (
                    <Link
                      key={subItem._key || subIndex}
                      href={subItem.link}
                      style={{
                        ...linkStyle,
                        display: 'block',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem'
                      }}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* CTA Button */}
      {cta?.text && cta?.link && (
        <Link href={cta.link} style={ctaStyle}>
          {cta.text}
        </Link>
      )}
    </header>
  )
}
