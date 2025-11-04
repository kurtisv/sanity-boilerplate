'use client'

import React, { useState } from 'react'
import styled from 'styled-components'

// Utilisation des design tokens du système
const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-16) var(--spacing-6);
  background: linear-gradient(135deg, #2d1b69 0%, #11998e 100%);
  
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--spacing-8) var(--spacing-4);
  }
`

const Content = styled.div`
  max-width: var(--max-width-6xl);
  margin: 0 auto;
  color: var(--color-white);
`

const Header = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-16);
`

const Title = styled.h1`
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-6);
  
  @media (max-width: var(--breakpoint-md)) {
    font-size: var(--font-size-4xl);
  }
`

const Subtitle = styled.p`
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-8);
  opacity: 0.9;
  line-height: var(--line-height-relaxed);
`

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-12);
  flex-wrap: wrap;
`

const FilterButton = styled.button<{ $active?: boolean }>`
  padding: var(--spacing-3) var(--spacing-6);
  border: 2px solid ${props => props.$active ? 'var(--color-white)' : 'rgba(255, 255, 255, 0.3)'};
  background: ${props => props.$active ? 'var(--color-white)' : 'transparent'};
  color: ${props => props.$active ? 'var(--color-gray-900)' : 'var(--color-white)'};
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-base);
  
  &:hover {
    border-color: var(--color-white);
    background: var(--color-white);
    color: var(--color-gray-900);
  }
`

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-16);
`

const ArticleCard = styled.div`
  background: var(--color-white);
  color: var(--color-gray-900);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  transition: var(--transition-base);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-2xl);
  }
`

const ArticleImage = styled.div<{ $category: string }>`
  height: 200px;
  background: ${props => {
    const gradients = {
      'next.js': 'linear-gradient(45deg, #000000, #ffffff)',
      'react': 'linear-gradient(45deg, #61dafb, #21232a)',
      'sanity': 'linear-gradient(45deg, #f03e2f, #ff6b35)',
      'typescript': 'linear-gradient(45deg, #3178c6, #235a97)',
      'tutorial': 'linear-gradient(45deg, #667eea, #764ba2)'
    }
    return gradients[props.$category as keyof typeof gradients] || gradients.tutorial
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-4xl);
  color: var(--color-white);
`

const ArticleContent = styled.div`
  padding: var(--spacing-6);
`

const ArticleCategory = styled.span`
  display: inline-block;
  background: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  margin-bottom: var(--spacing-3);
`

const ArticleTitle = styled.h3`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-3);
  color: var(--color-gray-900);
  line-height: var(--line-height-tight);
`

const ArticleExcerpt = styled.p`
  color: var(--color-gray-600);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-4);
`

const ArticleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-4);
`

const ReadMoreButton = styled.button`
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);
  
  &:hover {
    background: var(--color-primary);
    color: var(--color-white);
  }
`

const Newsletter = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: var(--spacing-8);
  border-radius: var(--border-radius-xl);
  backdrop-filter: blur(10px);
  text-align: center;
`

const NewsletterTitle = styled.h2`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-4);
`

const NewsletterDescription = styled.p`
  margin-bottom: var(--spacing-6);
  opacity: 0.9;
`

const NewsletterForm = styled.form`
  display: flex;
  gap: var(--spacing-4);
  max-width: var(--max-width-md);
  margin: 0 auto;
  
  @media (max-width: var(--breakpoint-sm)) {
    flex-direction: column;
  }
`

const NewsletterInput = styled.input`
  flex: 1;
  padding: var(--spacing-3) var(--spacing-4);
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  
  &::placeholder {
    color: var(--color-gray-400);
  }
`

const NewsletterButton = styled.button`
  background-color: var(--color-white);
  color: var(--color-gray-900);
  padding: var(--spacing-3) var(--spacing-6);
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`

export default function BlogContent() {
  const [activeFilter, setActiveFilter] = useState('all')

  const categories = [
    { id: 'all', label: 'Tous les articles' },
    { id: 'next.js', label: 'Next.js' },
    { id: 'react', label: 'React' },
    { id: 'sanity', label: 'Sanity CMS' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'tutorial', label: 'Tutoriels' }
  ]

  const articles = [
    {
      id: 1,
      title: 'Guide complet Next.js 16 avec App Router',
      excerpt: 'Découvrez les nouvelles fonctionnalités de Next.js 16 et comment migrer vers l\'App Router pour des performances optimales.',
      category: 'next.js',
      date: '15 Nov 2024',
      readTime: '8 min',
      icon: '⚡'
    },
    {
      id: 2,
      title: 'Sanity CMS : Le headless CMS moderne',
      excerpt: 'Pourquoi choisir Sanity CMS pour vos projets et comment l\'intégrer efficacement avec Next.js.',
      category: 'sanity',
      date: '12 Nov 2024',
      readTime: '6 min',
      icon: '🎨'
    },
    {
      id: 3,
      title: 'TypeScript : Bonnes pratiques 2024',
      excerpt: 'Les patterns TypeScript essentiels pour écrire du code robuste et maintenable dans vos applications React.',
      category: 'typescript',
      date: '10 Nov 2024',
      readTime: '10 min',
      icon: '🔧'
    },
    {
      id: 4,
      title: 'React 19 : Nouveautés et Server Components',
      excerpt: 'Explorez les nouvelles fonctionnalités de React 19 et comment utiliser les Server Components efficacement.',
      category: 'react',
      date: '8 Nov 2024',
      readTime: '7 min',
      icon: '⚛️'
    },
    {
      id: 5,
      title: 'Optimisation SEO avec Next.js',
      excerpt: 'Techniques avancées pour optimiser le référencement de vos applications Next.js et améliorer les Core Web Vitals.',
      category: 'tutorial',
      date: '5 Nov 2024',
      readTime: '12 min',
      icon: '🚀'
    },
    {
      id: 6,
      title: 'Styled Components vs CSS Modules',
      excerpt: 'Comparaison détaillée des solutions de styling en React et pourquoi nous préférons styled-components.',
      category: 'tutorial',
      date: '3 Nov 2024',
      readTime: '9 min',
      icon: '💅'
    }
  ]

  const filteredArticles = activeFilter === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeFilter)

  return (
    <Container>
      <Content>
        <Header>
          <Title>Notre Blog</Title>
          <Subtitle>
            Articles et tutoriels sur le développement web moderne. 
            Restez à jour avec les dernières technologies et bonnes pratiques.
          </Subtitle>
        </Header>

        <FilterBar>
          {categories.map(category => (
            <FilterButton
              key={category.id}
              $active={activeFilter === category.id}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </FilterButton>
          ))}
        </FilterBar>

        <ArticlesGrid>
          {filteredArticles.map(article => (
            <ArticleCard key={article.id}>
              <ArticleImage $category={article.category}>
                {article.icon}
              </ArticleImage>
              <ArticleContent>
                <ArticleCategory>{article.category}</ArticleCategory>
                <ArticleTitle>{article.title}</ArticleTitle>
                <ArticleExcerpt>{article.excerpt}</ArticleExcerpt>
                <ArticleMeta>
                  <span>{article.date}</span>
                  <span>{article.readTime} de lecture</span>
                </ArticleMeta>
                <ReadMoreButton onClick={() => window.location.href = `/blog/${article.id}`}>
                  Lire l'article
                </ReadMoreButton>
              </ArticleContent>
            </ArticleCard>
          ))}
        </ArticlesGrid>

        <Newsletter>
          <NewsletterTitle>📧 Newsletter Tech</NewsletterTitle>
          <NewsletterDescription>
            Recevez nos derniers articles et tutoriels directement dans votre boîte mail. 
            Pas de spam, que du contenu de qualité !
          </NewsletterDescription>
          <NewsletterForm onSubmit={(e) => e.preventDefault()}>
            <NewsletterInput
              type="email"
              placeholder="votre@email.com"
              required
            />
            <NewsletterButton type="submit">
              S'abonner
            </NewsletterButton>
          </NewsletterForm>
        </Newsletter>
      </Content>
    </Container>
  )
}
