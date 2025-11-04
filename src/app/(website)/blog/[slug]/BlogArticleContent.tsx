'use client'

import React from 'react'
import styled from 'styled-components'

// Utilisation des design tokens du système
const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-8) var(--spacing-6);
  background-color: var(--color-gray-50);
  
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--spacing-6) var(--spacing-4);
  }
`

const Article = styled.article`
  max-width: var(--max-width-3xl);
  margin: 0 auto;
  background: var(--color-white);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
`

const Header = styled.header`
  padding: var(--spacing-12) var(--spacing-8);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: var(--color-white);
  text-align: center;
  
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--spacing-8) var(--spacing-6);
  }
`

const Category = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  margin-bottom: var(--spacing-4);
`

const Title = styled.h1`
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-6);
  line-height: var(--line-height-tight);
  
  @media (max-width: var(--breakpoint-md)) {
    font-size: var(--font-size-3xl);
  }
`

const Meta = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-6);
  font-size: var(--font-size-sm);
  opacity: 0.9;
  
  @media (max-width: var(--breakpoint-sm)) {
    flex-direction: column;
    gap: var(--spacing-2);
  }
`

const Content = styled.div`
  padding: var(--spacing-12) var(--spacing-8);
  
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--spacing-8) var(--spacing-6);
  }
`

const Excerpt = styled.div`
  font-size: var(--font-size-xl);
  color: var(--color-gray-600);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-8);
  padding: var(--spacing-6);
  background: var(--color-gray-50);
  border-radius: var(--border-radius-lg);
  border-left: 4px solid var(--color-primary);
`

const ArticleContent = styled.div`
  color: var(--color-gray-800);
  line-height: var(--line-height-relaxed);
  
  h2 {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-gray-900);
    margin: var(--spacing-8) 0 var(--spacing-4);
  }
  
  h3 {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-gray-900);
    margin: var(--spacing-6) 0 var(--spacing-3);
  }
  
  p {
    margin-bottom: var(--spacing-4);
  }
  
  ul, ol {
    margin-bottom: var(--spacing-4);
    padding-left: var(--spacing-6);
    
    li {
      margin-bottom: var(--spacing-2);
    }
  }
  
  blockquote {
    border-left: 4px solid var(--color-primary);
    padding-left: var(--spacing-4);
    margin: var(--spacing-6) 0;
    font-style: italic;
    color: var(--color-gray-600);
  }
  
  code {
    background: var(--color-gray-100);
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--border-radius-sm);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
  }
  
  pre {
    background: var(--color-gray-900);
    color: var(--color-white);
    padding: var(--spacing-4);
    border-radius: var(--border-radius-lg);
    overflow-x: auto;
    margin: var(--spacing-6) 0;
    
    code {
      background: none;
      padding: 0;
      color: inherit;
    }
  }
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin: var(--spacing-8) 0;
  padding-top: var(--spacing-6);
  border-top: 1px solid var(--color-gray-200);
`

const Tag = styled.span`
  background: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
`

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-8);
  padding-top: var(--spacing-6);
  border-top: 1px solid var(--color-gray-200);
  
  @media (max-width: var(--breakpoint-sm)) {
    flex-direction: column;
    gap: var(--spacing-4);
  }
`

const NavButton = styled.button`
  background: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-3) var(--spacing-6);
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);
  
  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
  }
`

const BackButton = styled(NavButton)`
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  
  &:hover {
    background: var(--color-primary);
    color: var(--color-white);
  }
`

const RelatedSection = styled.div`
  margin-top: var(--spacing-12);
  padding: var(--spacing-8);
  background: var(--color-gray-50);
  border-radius: var(--border-radius-lg);
`

const RelatedTitle = styled.h3`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-6);
  text-align: center;
`

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-4);
`

const RelatedCard = styled.div`
  background: var(--color-white);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-base);
  cursor: pointer;
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  
  h4 {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-gray-900);
    margin-bottom: var(--spacing-2);
  }
  
  p {
    font-size: var(--font-size-sm);
    color: var(--color-gray-600);
    margin-bottom: var(--spacing-2);
  }
  
  span {
    font-size: var(--font-size-xs);
    color: var(--color-gray-500);
  }
`

type Props = {
  slug: string
}

export default function BlogArticleContent({ slug }: Props) {
  // NOTE: Dans un vrai projet, récupérer les données de l'article depuis Sanity
  const article = {
    title: 'Guide complet Next.js 16 avec App Router',
    category: 'Next.js',
    date: '15 novembre 2024',
    readTime: '8 min de lecture',
    author: 'Alexandre Martin',
    excerpt: 'Découvrez les nouvelles fonctionnalités de Next.js 16 et comment migrer vers l\'App Router pour des performances optimales et une meilleure expérience développeur.',
    tags: ['Next.js', 'React', 'App Router', 'Performance', 'Migration'],
    content: `
Next.js 16 marque une étape importante dans l'évolution du framework React le plus populaire. Cette version apporte des améliorations significatives en termes de performances, de développement et d'expérience utilisateur.

## Les Nouveautés Principales

### App Router Stabilisé
L'App Router, introduit en version expérimentale, est maintenant stable et recommandé pour tous les nouveaux projets. Il offre :

- **Routing basé sur les fichiers** : Plus intuitif et flexible
- **Layouts imbriqués** : Réutilisation optimisée des composants
- **Server Components par défaut** : Performances améliorées
- **Streaming et Suspense** : Chargement progressif

### Turbopack en Production
Turbopack, le successeur de Webpack, est maintenant disponible en production :

- **10x plus rapide** que Webpack pour le développement
- **Compilation incrémentale** optimisée
- **Hot Module Replacement** ultra-rapide
- **Tree-shaking** amélioré

## Migration vers l'App Router

### Structure des Dossiers
\`\`\`
app/
├── layout.tsx          # Layout racine
├── page.tsx           # Page d'accueil
├── loading.tsx        # UI de chargement
├── error.tsx          # Gestion d'erreurs
└── about/
    ├── page.tsx       # Page /about
    └── layout.tsx     # Layout spécifique
\`\`\`

### Server Components
Les Server Components sont le nouveau paradigme par défaut :

\`\`\`typescript
// app/page.tsx - Server Component par défaut
export default async function HomePage() {
  const data = await fetch('https://api.example.com/data')
  const posts = await data.json()
  
  return (
    <div>
      <h1>Articles</h1>
      {posts.map(post => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </div>
  )
}
\`\`\`

### Client Components
Utilisez la directive 'use client' uniquement quand nécessaire :

\`\`\`typescript
'use client'

import { useState } from 'react'

export default function InteractiveButton() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Cliqué {count} fois
    </button>
  )
}
\`\`\`

## Optimisations de Performance

### Streaming et Suspense
Next.js 16 améliore le streaming pour un chargement plus fluide :

\`\`\`typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>Ma Page</h1>
      <Suspense fallback={<div>Chargement...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  )
}
\`\`\`

### Optimisation des Images
Le composant Image continue d'évoluer :

\`\`\`typescript
import Image from 'next/image'

export default function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
      priority
      placeholder="blur"
    />
  )
}
\`\`\`

## Bonnes Pratiques

1. **Utilisez les Server Components** par défaut
2. **Minimisez les Client Components** aux interactions nécessaires
3. **Exploitez le streaming** pour les données lentes
4. **Optimisez les images** avec le composant Next.js
5. **Structurez vos layouts** de manière hiérarchique

## Conclusion

Next.js 16 représente une évolution majeure vers un développement plus performant et une meilleure expérience utilisateur. La migration vers l'App Router, bien que nécessitant quelques ajustements, apporte des bénéfices significatifs à long terme.

L'adoption de ces nouvelles fonctionnalités vous permettra de créer des applications web plus rapides, plus maintenables et plus agréables à développer.
    `
  }

  const relatedArticles = [
    {
      title: 'React 19 : Nouveautés et Server Components',
      excerpt: 'Explorez les nouvelles fonctionnalités de React 19...',
      date: '8 Nov 2024'
    },
    {
      title: 'Optimisation SEO avec Next.js',
      excerpt: 'Techniques avancées pour optimiser le référencement...',
      date: '5 Nov 2024'
    },
    {
      title: 'TypeScript : Bonnes pratiques 2024',
      excerpt: 'Les patterns TypeScript essentiels...',
      date: '10 Nov 2024'
    }
  ]

  return (
    <Container>
      <Article>
        <Header>
          <Category>{article.category}</Category>
          <Title>{article.title}</Title>
          <Meta>
            <span>📅 {article.date}</span>
            <span>⏱️ {article.readTime}</span>
            <span>✍️ {article.author}</span>
          </Meta>
        </Header>

        <Content>
          <Excerpt>
            {article.excerpt}
          </Excerpt>

          <ArticleContent>
            {article.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index}>{paragraph.replace('## ', '')}</h2>
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={index}>{paragraph.replace('### ', '')}</h3>
              }
              if (paragraph.startsWith('```')) {
                return null // Géré par le parsing markdown complet
              }
              if (paragraph.trim()) {
                return <p key={index}>{paragraph}</p>
              }
              return null
            })}
          </ArticleContent>

          <Tags>
            {article.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>

          <Navigation>
            <BackButton onClick={() => window.location.href = '/blog'}>
              ← Retour au Blog
            </BackButton>
            <NavButton onClick={() => window.location.href = '/contact'}>
              Nous Contacter
            </NavButton>
          </Navigation>

          <RelatedSection>
            <RelatedTitle>Articles Similaires</RelatedTitle>
            <RelatedGrid>
              {relatedArticles.map((related, index) => (
                <RelatedCard key={index} onClick={() => window.location.href = `/blog/${index + 2}`}>
                  <h4>{related.title}</h4>
                  <p>{related.excerpt}</p>
                  <span>{related.date}</span>
                </RelatedCard>
              ))}
            </RelatedGrid>
          </RelatedSection>
        </Content>
      </Article>
    </Container>
  )
}
