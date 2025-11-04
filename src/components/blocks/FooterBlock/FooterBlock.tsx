'use client'

import React from 'react'
import Link from 'next/link'

interface FooterBlockProps {
  text?: string
  columns?: Array<{
    _key?: string
    title: string
    links: Array<{
      _key?: string
      title: string
      link: string
    }>
  }>
  socialLinks?: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  copyrightText?: string
  backgroundSettings?: any
  styling?: any
}

export default function FooterBlock({
  text,
  columns = [],
  socialLinks,
  copyrightText = '© 2025 Mon Site. Tous droits réservés.',
  backgroundSettings,
  styling
}: FooterBlockProps) {
  const containerStyle = {
    backgroundColor: backgroundSettings?.backgroundColor || '#1f2937',
    color: styling?.textColor || '#ffffff',
    padding: '3rem 2rem 1rem',
    marginTop: 'auto'
  }

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  }

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: styling?.headingColor || '#ffffff',
    marginBottom: '0.5rem'
  }

  const linkStyle = {
    color: styling?.textColor || '#d1d5db',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    fontSize: '0.875rem'
  }

  const socialStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  }

  const socialLinkStyle = {
    color: styling?.accentColor || '#3b82f6',
    textDecoration: 'none',
    fontSize: '1.25rem',
    transition: 'color 0.2s ease'
  }

  const copyrightStyle = {
    borderTop: '1px solid #374151',
    paddingTop: '1rem',
    textAlign: 'center' as const,
    fontSize: '0.875rem',
    color: styling?.textColor || '#9ca3af'
  }

  const getSocialIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      facebook: '📘',
      twitter: '🐦',
      instagram: '📷',
      linkedin: '💼',
      youtube: '📺'
    }
    return icons[platform] || '🔗'
  }

  return (
    <footer style={containerStyle}>
      <div style={contentStyle}>
        {/* Main content */}
        <div style={gridStyle}>
          {/* Description */}
          {text && (
            <div style={columnStyle}>
              <p style={{ margin: 0, lineHeight: '1.6' }}>{text}</p>
              
              {/* Social Links */}
              {socialLinks && (
                <div style={socialStyle}>
                  {Object.entries(socialLinks).map(([platform, url]) => 
                    url ? (
                      <Link
                        key={platform}
                        href={url}
                        style={socialLinkStyle}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getSocialIcon(platform)}
                      </Link>
                    ) : null
                  )}
                </div>
              )}
            </div>
          )}

          {/* Columns */}
          {columns.map((column, index) => (
            <div key={column._key || index} style={columnStyle}>
              <h3 style={titleStyle}>{column.title}</h3>
              {column.links.map((link, linkIndex) => (
                <Link
                  key={link._key || linkIndex}
                  href={link.link}
                  style={linkStyle}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div style={copyrightStyle}>
          {copyrightText}
        </div>
      </div>
    </footer>
  )
}
