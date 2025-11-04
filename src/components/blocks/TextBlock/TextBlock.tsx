'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import {
  Container,
  Content,
  RichText,
  Link,
  Underline,
  InlineCode,
  Blockquote,
  UnorderedList,
  OrderedList,
  ListItem,
  ImageWrapper,
  ImageContainer,
  ImageCaption
} from './TextBlock.styles'

/**
 * TextBlock Component
 * 
 * Renders rich text content from Sanity CMS with full formatting support:
 * - Multiple heading levels (H1-H4)
 * - Text formatting (bold, italic, underline, code)
 * - Links with target options
 * - Blockquotes
 * - Ordered and unordered lists
 * - Inline images with captions
 * - Customizable alignment, max-width, background color, and padding
 */

type TextBlockProps = {
  _type?: string
  _key?: string
  content?: any[]
  alignment?: 'left' | 'center' | 'right'
  maxWidth?: 'narrow' | 'medium' | 'wide' | 'full'
  backgroundColor?: string
  paddingSize?: 'small' | 'medium' | 'large'
}

function TextBlock(props: TextBlockProps) {
  const {
    content,
    alignment = 'left',
    maxWidth = 'wide',
    backgroundColor = '',
    paddingSize = 'medium',
  } = props

  // Don't render if no content
  if (!content || !Array.isArray(content) || content.length === 0) {
    return null
  }

  // Portable Text component configuration
  const components: PortableTextComponents = {
    block: {
      h1: ({ children }) => <h1>{children}</h1>,
      h2: ({ children }) => <h2>{children}</h2>,
      h3: ({ children }) => <h3>{children}</h3>,
      h4: ({ children }) => <h4>{children}</h4>,
      normal: ({ children }) => <p>{children}</p>,
      blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
    },

    list: {
      bullet: ({ children }) => <UnorderedList>{children}</UnorderedList>,
      number: ({ children }) => <OrderedList>{children}</OrderedList>,
    },

    listItem: {
      bullet: ({ children }) => <ListItem>{children}</ListItem>,
      number: ({ children }) => <ListItem>{children}</ListItem>,
    },

    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      underline: ({ children }) => <Underline>{children}</Underline>,
      code: ({ children }) => <InlineCode>{children}</InlineCode>,
      link: ({ value, children }) => {
        const target = value?.blank ? '_blank' : '_self'
        const rel = value?.blank ? 'noopener noreferrer' : undefined
        return (
          <Link href={value?.href || '#'} target={target} rel={rel}>
            {children}
          </Link>
        )
      },
    },

    types: {
      image: ({ value }) => {
        if (!value?.asset) return null

        const imageUrl = urlFor(value.asset)
          .width(1200)
          .quality(85)
          .auto('format')
          .url()

        return (
          <ImageWrapper>
            <ImageContainer>
              <Image
                src={imageUrl}
                alt={value.alt || 'Image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                style={{ objectFit: 'cover' }}
              />
            </ImageContainer>
            {value.caption && (
              <ImageCaption>{value.caption}</ImageCaption>
            )}
          </ImageWrapper>
        )
      },
    },
  }

  return (
    <Container $bgColor={backgroundColor}>
      <Content $maxWidth={maxWidth} $padding={paddingSize}>
        <RichText $alignment={alignment}>
          <PortableText value={content} components={components} />
        </RichText>
      </Content>
    </Container>
  )
}

export default TextBlock
