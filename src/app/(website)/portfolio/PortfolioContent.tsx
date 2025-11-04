'use client'

import React from 'react'
import styled from 'styled-components'

// Utilisation des design tokens du système
const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-16) var(--spacing-6);
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-16);
`

const ProjectCard = styled.div`
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

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-4xl);
  color: var(--color-white);
`

const ProjectInfo = styled.div`
  padding: var(--spacing-6);
`

const ProjectTitle = styled.h3`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-3);
  color: var(--color-gray-900);
`

const ProjectDescription = styled.p`
  color: var(--color-gray-600);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-4);
`

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-4);
`

const Tag = styled.span`
  background: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`

const ProjectLink = styled.button`
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

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-8);
  text-align: center;
`

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: var(--spacing-6);
  border-radius: var(--border-radius-xl);
  backdrop-filter: blur(10px);
`

const StatNumber = styled.div`
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-2);
`

const StatLabel = styled.div`
  font-size: var(--font-size-base);
  opacity: 0.9);
`

const CTASection = styled.div`
  text-align: center;
  margin-top: var(--spacing-16);
  
  p {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-6);
    opacity: 0.9;
  }
`

const CTAButton = styled.button`
  background-color: var(--color-white);
  color: var(--color-primary);
  padding: var(--spacing-4) var(--spacing-8);
  border: none;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`

export default function PortfolioContent() {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Mode',
      description: 'Boutique en ligne moderne avec Next.js et Sanity CMS. Gestion des produits, commandes et paiements sécurisés.',
      tags: ['Next.js', 'Sanity', 'Stripe', 'E-commerce'],
      icon: '🛍️'
    },
    {
      id: 2,
      title: 'Application SaaS',
      description: 'Plateforme SaaS complète avec tableau de bord, authentification et API REST. Interface utilisateur moderne.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'SaaS'],
      icon: '📊'
    },
    {
      id: 3,
      title: 'Site Vitrine Corporate',
      description: 'Site institutionnel pour grande entreprise avec CMS headless et optimisation SEO avancée.',
      tags: ['Next.js', 'Sanity', 'SEO', 'Corporate'],
      icon: '🏢'
    },
    {
      id: 4,
      title: 'Blog Tech',
      description: 'Blog technique avec système de commentaires, recherche avancée et newsletter intégrée.',
      tags: ['Next.js', 'MDX', 'Blog', 'Newsletter'],
      icon: '📝'
    },
    {
      id: 5,
      title: 'Portfolio Créatif',
      description: 'Portfolio d\'artiste avec galerie interactive, animations fluides et gestion de contenu intuitive.',
      tags: ['Next.js', 'Framer Motion', 'Galerie', 'Art'],
      icon: '🎨'
    },
    {
      id: 6,
      title: 'App Mobile Hybrid',
      description: 'Application mobile hybride avec React Native et backend Node.js. Synchronisation temps réel.',
      tags: ['React Native', 'Node.js', 'Mobile', 'Real-time'],
      icon: '📱'
    }
  ]

  return (
    <Container>
      <Content>
        <Header>
          <Title>Notre Portfolio</Title>
          <Subtitle>
            Découvrez nos réalisations et études de cas. Des projets variés 
            qui témoignent de notre expertise technique et créative.
          </Subtitle>
        </Header>

        <ProjectsGrid>
          {projects.map(project => (
            <ProjectCard key={project.id}>
              <ProjectImage>
                {project.icon}
              </ProjectImage>
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectTags>
                  {project.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </ProjectTags>
                <ProjectLink onClick={() => window.location.href = '/contact'}>
                  Voir le Projet
                </ProjectLink>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>

        <Stats>
          <StatItem>
            <StatNumber>50+</StatNumber>
            <StatLabel>Projets Réalisés</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>98%</StatNumber>
            <StatLabel>Clients Satisfaits</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>5 ans</StatNumber>
            <StatLabel>Expérience Moyenne</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>24h</StatNumber>
            <StatLabel>Support Réactif</StatLabel>
          </StatItem>
        </Stats>

        <CTASection>
          <p>
            Prêt à concrétiser votre projet ? Discutons de vos besoins !
          </p>
          <CTAButton onClick={() => window.location.href = '/contact'}>
            Démarrer un Projet
          </CTAButton>
        </CTASection>
      </Content>
    </Container>
  )
}
