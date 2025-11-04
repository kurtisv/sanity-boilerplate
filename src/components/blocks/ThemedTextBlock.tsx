'use client'

import React from 'react'
import { PortableText } from '@portabletext/react'
import { applyTheme, type ThemeSettings } from '@/lib/theme-utils'
import { IconWrapper } from '@/components/ui/Icon'
import '@/styles/theme-utilities.css'

type ThemedTextBlockProps = {
  content?: any[]
  alignment?: 'left' | 'center' | 'right'
  maxWidth?: 'small' | 'medium' | 'wide' | 'full'
  paddingSize?: 'small' | 'medium' | 'large'
} & ThemeSettings

export default function ThemedTextBlock({
  content,
  alignment = 'left',
  maxWidth = 'wide',
  paddingSize = 'medium',
  backgroundSettings,
  styling,
  typography,
  icon,
}: ThemedTextBlockProps) {
  // Appliquer le thème
  const theme = applyTheme({ backgroundSettings, styling, typography, icon })

  // Classes pour la largeur maximale
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'small': return 'max-w-2xl'
      case 'medium': return 'max-w-4xl'
      case 'wide': return 'max-w-6xl'
      case 'full': return 'max-w-full'
      default: return 'max-w-6xl'
    }
  }

  // Classes pour l'espacement
  const getPaddingClass = () => {
    switch (paddingSize) {
      case 'small': return 'py-8'
      case 'medium': return 'py-12'
      case 'large': return 'py-16'
      default: return 'py-12'
    }
  }

  // Classes pour l'alignement
  const getAlignmentClass = () => {
    switch (alignment) {
      case 'center': return 'text-center mx-auto'
      case 'right': return 'text-right ml-auto'
      case 'left':
      default: return 'text-left'
    }
  }

  // Composants pour PortableText
  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => (
        <p className={`mb-4 ${theme.textClasses}`} style={{ color: styling?.textColor }}>
          {children}
        </p>
      ),
      h1: ({ children }: any) => (
        <h1 className={`text-4xl font-bold mb-6 ${theme.headingClasses}`} style={{ color: styling?.headingColor }}>
          {children}
        </h1>
      ),
      h2: ({ children }: any) => (
        <h2 className={`text-3xl font-bold mb-5 ${theme.headingClasses}`} style={{ color: styling?.headingColor }}>
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className={`text-2xl font-bold mb-4 ${theme.headingClasses}`} style={{ color: styling?.headingColor }}>
          {children}
        </h3>
      ),
      h4: ({ children }: any) => (
        <h4 className={`text-xl font-bold mb-3 ${theme.headingClasses}`} style={{ color: styling?.headingColor }}>
          {children}
        </h4>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside mb-4 space-y-2">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside mb-4 space-y-2">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className={theme.textClasses} style={{ color: styling?.textColor }}>
          {children}
        </li>
      ),
      number: ({ children }: any) => (
        <li className={theme.textClasses} style={{ color: styling?.textColor }}>
          {children}
        </li>
      ),
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          className="underline hover:no-underline transition-all duration-200"
          style={{ color: styling?.accentColor || '#3b82f6' }}
          target={value.blank ? '_blank' : undefined}
          rel={value.blank ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      ),
    },
  }

  if (!content || content.length === 0) {
    return null
  }

  return (
    <section
      className={`w-full ${getPaddingClass()} ${theme.containerClasses}`}
      style={theme.containerStyle}
    >
      <div className={`${getMaxWidthClass()} ${getAlignmentClass()} px-4 sm:px-6 lg:px-8`}>
        <IconWrapper icon={theme.iconConfig}>
          <div className="prose prose-lg max-w-none">
            <PortableText
              value={content}
              components={portableTextComponents}
            />
          </div>
        </IconWrapper>
      </div>
    </section>
  )
}
