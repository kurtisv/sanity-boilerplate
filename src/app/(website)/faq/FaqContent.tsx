'use client'

import React, { useState } from 'react'
import styled from 'styled-components'

// Utilisation des design tokens du système
const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-16) var(--spacing-6);
  background-color: var(--color-gray-50);
  
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--spacing-8) var(--spacing-4);
  }
`

const Content = styled.div`
  max-width: var(--max-width-4xl);
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-16);
`

const Title = styled.h1`
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-6);
  
  @media (max-width: var(--breakpoint-md)) {
    font-size: var(--font-size-4xl);
  }
`

const Subtitle = styled.p`
  font-size: var(--font-size-xl);
  color: var(--color-gray-600);
  line-height: var(--line-height-relaxed);
`

const SearchBox = styled.div`
  max-width: var(--max-width-lg);
  margin: 0 auto var(--spacing-12);
  position: relative;
`

const SearchInput = styled.input`
  width: 100%;
  padding: var(--spacing-4) var(--spacing-6);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--border-radius-xl);
  font-size: var(--font-size-lg);
  transition: var(--transition-base);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  &::placeholder {
    color: var(--color-gray-400);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  right: var(--spacing-4);
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--font-size-xl);
  color: var(--color-gray-400);
`

const Categories = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-12);
  flex-wrap: wrap;
`

const CategoryButton = styled.button<{ $active?: boolean }>`
  padding: var(--spacing-3) var(--spacing-6);
  border: 2px solid ${props => props.$active ? 'var(--color-primary)' : 'var(--color-gray-300)'};
  background: ${props => props.$active ? 'var(--color-primary)' : 'var(--color-white)'};
  color: ${props => props.$active ? 'var(--color-white)' : 'var(--color-gray-700)'};
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-base);
  
  &:hover {
    border-color: var(--color-primary);
    background: ${props => props.$active ? 'var(--color-primary-dark)' : 'var(--color-primary)'};
    color: var(--color-white);
  }
`

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-16);
`

const FaqItem = styled.div`
  background: var(--color-white);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-gray-200);
  overflow: hidden;
  transition: var(--transition-base);
  
  &:hover {
    box-shadow: var(--shadow-lg);
  }
`

const FaqQuestion = styled.button<{ $isOpen?: boolean }>`
  width: 100%;
  padding: var(--spacing-6);
  background: none;
  border: none;
  text-align: left;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: var(--transition-base);
  
  &:hover {
    background: var(--color-gray-50);
  }
  
  &::after {
    content: '${props => props.$isOpen ? '−' : '+'}';
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
    transition: var(--transition-base);
  }
`

const FaqAnswer = styled.div<{ $isOpen?: boolean }>`
  padding: ${props => props.$isOpen ? 'var(--spacing-6)' : '0'};
  padding-top: 0;
  color: var(--color-gray-600);
  line-height: var(--line-height-relaxed);
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all var(--transition-base);
  
  p {
    margin-bottom: var(--spacing-4);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const CTASection = styled.div`
  background: var(--color-white);
  padding: var(--spacing-8);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
  text-align: center;
  border: 1px solid var(--color-gray-200);
`

const CTATitle = styled.h2`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-4);
`

const CTADescription = styled.p`
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-6);
  line-height: var(--line-height-relaxed);
`

const CTAButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-4) var(--spacing-8);
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);
  
  &:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-2px);
  }
`

export default function FaqContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const categories = [
    { id: 'all', label: 'Toutes' },
    { id: 'general', label: 'Général' },
    { id: 'technical', label: 'Technique' },
    { id: 'pricing', label: 'Tarifs' },
    { id: 'process', label: 'Processus' }
  ]

  const faqs = [
    {
      id: 1,
      category: 'general',
      question: 'Quels types de sites web développez-vous ?',
      answer: 'Nous développons tous types de sites web : sites vitrines, e-commerce, applications SaaS, blogs, portfolios et applications web complexes. Notre expertise couvre Next.js, React, et les CMS headless comme Sanity.'
    },
    {
      id: 2,
      category: 'technical',
      question: 'Pourquoi utiliser Next.js et Sanity CMS ?',
      answer: 'Next.js offre des performances exceptionnelles avec le rendu côté serveur et la génération statique. Sanity CMS permet une gestion de contenu flexible et moderne. Cette combinaison garantit des sites rapides, SEO-friendly et facilement maintenables.'
    },
    {
      id: 3,
      category: 'pricing',
      question: 'Combien coûte un site web ?',
      answer: 'Nos tarifs varient selon la complexité : à partir de 2 500€ pour un site vitrine, 5 500€ pour un site complet avec CMS, et sur devis pour les applications complexes. Chaque projet est unique et nous proposons toujours un devis personnalisé.'
    },
    {
      id: 4,
      category: 'process',
      question: 'Combien de temps prend le développement ?',
      answer: 'Un site vitrine prend généralement 2-4 semaines, un site avec CMS 4-8 semaines, et une application complexe 8-16 semaines. Les délais dépendent de la complexité et de la réactivité dans les échanges.'
    },
    {
      id: 5,
      category: 'technical',
      question: 'Le site sera-t-il responsive et optimisé SEO ?',
      answer: 'Absolument ! Tous nos sites sont responsive (adaptés mobile/tablette) et optimisés SEO dès le développement. Nous utilisons les meilleures pratiques pour garantir de bonnes performances et un bon référencement.'
    },
    {
      id: 6,
      category: 'process',
      question: 'Proposez-vous de la maintenance après livraison ?',
      answer: 'Oui, nous proposons des contrats de maintenance incluant mises à jour de sécurité, sauvegardes, monitoring et support technique. La période de support gratuit varie selon l\'offre choisie.'
    },
    {
      id: 7,
      category: 'general',
      question: 'Puis-je modifier le contenu moi-même ?',
      answer: 'Avec Sanity CMS, vous pouvez facilement modifier textes, images et contenu via une interface intuitive. Nous fournissons une formation complète et de la documentation pour vous accompagner.'
    },
    {
      id: 8,
      category: 'pricing',
      question: 'Y a-t-il des frais cachés ?',
      answer: 'Aucun frais caché ! Nos devis sont transparents et incluent tout : développement, tests, formation et support initial. Seuls l\'hébergement et le nom de domaine sont à prévoir en plus.'
    }
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <Container>
      <Content>
        <Header>
          <Title>Questions Fréquentes</Title>
          <Subtitle>
            Trouvez rapidement les réponses à vos questions sur nos services 
            de développement web et notre processus de travail.
          </Subtitle>
        </Header>

        <SearchBox>
          <SearchInput
            type="text"
            placeholder="Rechercher une question..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon>🔍</SearchIcon>
        </SearchBox>

        <Categories>
          {categories.map(category => (
            <CategoryButton
              key={category.id}
              $active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </CategoryButton>
          ))}
        </Categories>

        <FaqList>
          {filteredFaqs.map(faq => (
            <FaqItem key={faq.id}>
              <FaqQuestion
                $isOpen={openItems.has(faq.id)}
                onClick={() => toggleItem(faq.id)}
              >
                {faq.question}
              </FaqQuestion>
              <FaqAnswer $isOpen={openItems.has(faq.id)}>
                <p>{faq.answer}</p>
              </FaqAnswer>
            </FaqItem>
          ))}
        </FaqList>

        {filteredFaqs.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-8)', color: 'var(--color-gray-500)' }}>
            Aucune question trouvée pour "{searchTerm}" dans la catégorie sélectionnée.
          </div>
        )}

        <CTASection>
          <CTATitle>Vous ne trouvez pas votre réponse ?</CTATitle>
          <CTADescription>
            Notre équipe est là pour répondre à toutes vos questions spécifiques 
            et vous accompagner dans votre projet.
          </CTADescription>
          <CTAButton onClick={() => window.location.href = '/contact'}>
            Nous Contacter
          </CTAButton>
        </CTASection>
      </Content>
    </Container>
  )
}
