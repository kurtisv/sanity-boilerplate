'use client'

import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: {
    asset?: {
      _ref: string
      url?: string
    }
  }
  author?: {
    name: string
    photo?: {
      asset?: {
        _ref: string
      }
    }
  }
  category?: {
    title: string
    color?: string
  }
  publishedAt?: string
  readingTime?: number
}

interface BlogBlockProps {
  title?: string
  subtitle?: string
  layout?: 'grid-2' | 'grid-3' | 'masonry' | 'list' | 'featured-grid'
  source?: 'all' | 'category' | 'author' | 'selected'
  selectedCategory?: string
  selectedAuthor?: string
  selectedPosts?: BlogPost[]
  postsPerPage?: number
  showFilters?: boolean
  showSearch?: boolean
  showPagination?: boolean
  cardStyle?: 'minimal' | 'bordered' | 'shadow' | 'elevated' | 'overlay'
  showExcerpt?: boolean
  showAuthor?: boolean
  showCategory?: boolean
  showDate?: boolean
  showReadingTime?: boolean
  ctaButton?: {
    text: string
    href: string
  }
  backgroundSettings?: {
    backgroundColor?: string
  }
  styling?: {
    textColor?: string
    headingColor?: string
  }
}

const BlogSection = styled.section<{ $backgroundColor?: string }>`
  position: relative;
  width: 100%;
  padding: 6rem 0;
  background: ${props => props.$backgroundColor || 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)'};
`

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`

const Title = styled.h2<{ $color?: string }>`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  color: ${props => props.$color || '#1f2937'};
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Subtitle = styled.p<{ $color?: string }>`
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.7;
  color: ${props => props.$color || '#6b7280'};
  max-width: 700px;
  margin: 0 auto;
`

const BlogGrid = styled.div<{ $layout?: string }>`
  display: grid;
  gap: 2rem;
  
  ${props => {
    switch (props.$layout) {
      case 'grid-2':
        return `
          grid-template-columns: repeat(2, 1fr);
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }
        `
      case 'grid-3':
        return `
          grid-template-columns: repeat(3, 1fr);
          @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
          }
        `
      case 'masonry':
        return `
          columns: 3;
          column-gap: 2rem;
          @media (max-width: 1024px) {
            columns: 2;
          }
          @media (max-width: 640px) {
            columns: 1;
          }
        `
      case 'list':
        return `
          grid-template-columns: 1fr;
          max-width: 800px;
          margin: 0 auto;
        `
      case 'featured-grid':
        return `
          grid-template-columns: repeat(2, 1fr);
          
          & > article:first-child {
            grid-column: 1 / -1;
          }
          
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
            
            & > article:first-child {
              grid-column: 1;
            }
          }
        `
      default:
        return `
          grid-template-columns: repeat(3, 1fr);
          @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
          }
        `
    }
  }}
`

const BlogCard = styled.article<{ $cardStyle?: string; $isMasonry?: boolean; $isFeatured?: boolean }>`
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${props => props.$isMasonry && `
    break-inside: avoid;
    margin-bottom: 2rem;
  `}
  
  ${props => {
    switch (props.$cardStyle) {
      case 'shadow':
        return `
          background: #ffffff;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          
          &:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: translateY(-8px);
          }
        `
      case 'elevated':
        return `
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
          
          &:hover {
            box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.2);
            transform: translateY(-10px);
          }
        `
      case 'bordered':
        return `
          background: #ffffff;
          border: 2px solid #e5e7eb;
          
          &:hover {
            border-color: #667eea;
            transform: translateY(-5px);
          }
        `
      case 'overlay':
        return `
          background: #000000;
          
          &:hover img {
            transform: scale(1.05);
          }
        `
      default:
        return `
          background: #ffffff;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          
          &:hover {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
            transform: translateY(-5px);
          }
        `
    }
  }}
`

const ImageWrapper = styled.div<{ $height?: string }>`
  position: relative;
  width: 100%;
  height: ${props => props.$height || '250px'};
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  img {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
`

const Category = styled.div<{ $color?: string }>`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: ${props => props.$color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  font-size: 0.8125rem;
  font-weight: 700;
  border-radius: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`

const Content = styled.div`
  padding: 1.5rem;
`

const PostTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
  line-height: 1.3;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: #667eea;
    }
  }
`

const Excerpt = styled.p`
  font-size: 0.9375rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
`

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const AuthorPhoto = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
`

const CTASection = styled.div`
  margin-top: 4rem;
  text-align: center;
`

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1.0625rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`

export default function BlogBlock({
  title,
  subtitle,
  layout = 'grid-3',
  selectedPosts = [],
  cardStyle = 'shadow',
  showExcerpt = true,
  showAuthor = true,
  showCategory = true,
  showDate = true,
  showReadingTime = true,
  ctaButton,
  backgroundSettings,
  styling
}: BlogBlockProps) {
  const isMasonry = layout === 'masonry'
  
  // Mock posts si aucun n'est fourni
  const posts = selectedPosts.length > 0 ? selectedPosts : []

  return (
    <BlogSection $backgroundColor={backgroundSettings?.backgroundColor}>
      <Container>
        {(title || subtitle) && (
          <Header>
            {title && <Title $color={styling?.headingColor}>{title}</Title>}
            {subtitle && <Subtitle $color={styling?.textColor}>{subtitle}</Subtitle>}
          </Header>
        )}
        
        <BlogGrid $layout={layout}>
          {posts.map((post, index) => {
            const imageUrl = post.featuredImage?.asset?._ref 
              ? urlFor(post.featuredImage).width(800).height(500).url()
              : null
            
            const isFeatured = layout === 'featured-grid' && index === 0

            return (
              <BlogCard
                key={post._id}
                $cardStyle={cardStyle}
                $isMasonry={isMasonry}
                $isFeatured={isFeatured}
              >
                <ImageWrapper $height={isFeatured ? '400px' : '250px'}>
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                  {showCategory && post.category && (
                    <Category $color={post.category.color}>
                      {post.category.title}
                    </Category>
                  )}
                </ImageWrapper>
                
                <Content>
                  <PostTitle>
                    <Link href={`/blog/${post.slug.current}`}>
                      {post.title}
                    </Link>
                  </PostTitle>
                  
                  {showExcerpt && post.excerpt && (
                    <Excerpt>{post.excerpt}</Excerpt>
                  )}
                  
                  <Meta>
                    {showAuthor && post.author && (
                      <Author>
                        <AuthorPhoto>
                          {post.author.name.charAt(0)}
                        </AuthorPhoto>
                        <span>{post.author.name}</span>
                      </Author>
                    )}
                    {showDate && post.publishedAt && (
                      <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
                    )}
                    {showReadingTime && post.readingTime && (
                      <span>{post.readingTime} min de lecture</span>
                    )}
                  </Meta>
                </Content>
              </BlogCard>
            )
          })}
        </BlogGrid>
        
        {ctaButton && (
          <CTASection>
            <CTAButton href={ctaButton.href}>
              {ctaButton.text}
            </CTAButton>
          </CTASection>
        )}
      </Container>
    </BlogSection>
  )
}
