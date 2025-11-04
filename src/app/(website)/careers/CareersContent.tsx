'use client'

import React from 'react'
import styled from 'styled-components'

// Utilisation des design tokens du système
const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-16) var(--spacing-6);
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  
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

const ValuesSection = styled.div`
  margin-bottom: var(--spacing-16);
`

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-12);
`

const ValueCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: var(--spacing-6);
  border-radius: var(--border-radius-xl);
  backdrop-filter: blur(10px);
  text-align: center;
  transition: var(--transition-base);
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.15);
  }
`

const ValueIcon = styled.div`
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-4);
`

const ValueTitle = styled.h3`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-3);
`

const ValueDescription = styled.p`
  opacity: 0.9;
  line-height: var(--line-height-relaxed);
`

const JobsSection = styled.div`
  background: var(--color-white);
  color: var(--color-gray-900);
  padding: var(--spacing-12);
  border-radius: var(--border-radius-2xl);
  margin-bottom: var(--spacing-16);
`

const SectionTitle = styled.h2`
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: var(--spacing-8);
  color: var(--color-gray-900);
`

const JobsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
`

const JobCard = styled.div`
  border: 2px solid var(--color-gray-200);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-6);
  transition: var(--transition-base);
  
  &:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-lg);
  }
`

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-4);
  
  @media (max-width: var(--breakpoint-sm)) {
    flex-direction: column;
    gap: var(--spacing-3);
  }
`

const JobInfo = styled.div`
  flex: 1;
`

const JobTitle = styled.h3`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-2);
`

const JobMeta = styled.div`
  display: flex;
  gap: var(--spacing-4);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  
  @media (max-width: var(--breakpoint-sm)) {
    flex-direction: column;
    gap: var(--spacing-1);
  }
`

const JobDescription = styled.p`
  color: var(--color-gray-700);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-4);
`

const JobTags = styled.div`
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
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
`

const ApplyButton = styled.button`
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

const NoJobsMessage = styled.div`
  text-align: center;
  padding: var(--spacing-12);
  color: var(--color-gray-600);
  
  h3 {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-4);
  }
  
  p {
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--spacing-6);
  }
`

const ContactButton = styled.button`
  background: var(--color-white);
  color: var(--color-primary);
  padding: var(--spacing-4) var(--spacing-8);
  border: 2px solid var(--color-primary);
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);
  
  &:hover {
    background: var(--color-primary);
    color: var(--color-white);
    transform: translateY(-2px);
  }
`

const BenefitsSection = styled.div`
  text-align: center;
`

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-12);
`

const BenefitItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-lg);
  backdrop-filter: blur(10px);
  
  h4 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-2);
  }
  
  p {
    opacity: 0.9;
    font-size: var(--font-size-sm);
  }
`

export default function CareersContent() {
  const values = [
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Nous utilisons les dernières technologies et encourageons la créativité dans nos solutions.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'Travail d\'équipe, partage de connaissances et entraide sont au cœur de notre culture.'
    },
    {
      icon: '📈',
      title: 'Croissance',
      description: 'Nous investissons dans le développement professionnel et personnel de chaque membre.'
    },
    {
      icon: '⚖️',
      title: 'Équilibre',
      description: 'Nous valorisons l\'équilibre vie professionnelle/personnelle et le bien-être au travail.'
    }
  ]

  const jobs = [
    {
      id: 1,
      title: 'Développeur Full-Stack Senior',
      location: 'Paris / Remote',
      type: 'CDI',
      experience: '5+ ans',
      description: 'Nous recherchons un développeur expérimenté en Next.js et React pour rejoindre notre équipe et travailler sur des projets innovants.',
      tags: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Sanity CMS'],
      active: true
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      location: 'Paris',
      type: 'CDI',
      experience: '3+ ans',
      description: 'Designer créatif pour concevoir des interfaces utilisateur modernes et intuitives pour nos clients.',
      tags: ['Figma', 'Design System', 'Prototyping', 'User Research'],
      active: false
    }
  ]

  const benefits = [
    { title: 'Salaire attractif', description: 'Rémunération compétitive + primes' },
    { title: 'Télétravail', description: 'Flexibilité totale sur le lieu de travail' },
    { title: 'Formation', description: 'Budget formation et conférences' },
    { title: 'Équipement', description: 'MacBook Pro + setup de votre choix' },
    { title: 'Congés', description: '25 jours + RTT + congés exceptionnels' },
    { title: 'Mutuelle', description: 'Couverture santé premium' }
  ]

  const activeJobs = jobs.filter(job => job.active)

  return (
    <Container>
      <Content>
        <Header>
          <Title>Rejoignez Notre Équipe</Title>
          <Subtitle>
            Nous recherchons des talents passionnés pour créer l'avenir du web ensemble. 
            Découvrez nos opportunités et notre culture d'entreprise.
          </Subtitle>
        </Header>

        <ValuesSection>
          <SectionTitle style={{ color: 'white', marginBottom: 'var(--spacing-8)' }}>
            Nos Valeurs
          </SectionTitle>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard key={index}>
                <ValueIcon>{value.icon}</ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ValuesSection>

        <JobsSection>
          <SectionTitle>Offres d'Emploi</SectionTitle>
          
          {activeJobs.length > 0 ? (
            <JobsList>
              {activeJobs.map(job => (
                <JobCard key={job.id}>
                  <JobHeader>
                    <JobInfo>
                      <JobTitle>{job.title}</JobTitle>
                      <JobMeta>
                        <span>📍 {job.location}</span>
                        <span>💼 {job.type}</span>
                        <span>⏱️ {job.experience}</span>
                      </JobMeta>
                    </JobInfo>
                    <ApplyButton onClick={() => window.location.href = '/contact'}>
                      Postuler
                    </ApplyButton>
                  </JobHeader>
                  <JobDescription>{job.description}</JobDescription>
                  <JobTags>
                    {job.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </JobTags>
                </JobCard>
              ))}
            </JobsList>
          ) : (
            <NoJobsMessage>
              <h3>Aucune offre actuellement</h3>
              <p>
                Nous n'avons pas d'offres ouvertes pour le moment, mais nous sommes toujours 
                intéressés par les profils talentueux. N'hésitez pas à nous envoyer une candidature spontanée !
              </p>
              <ContactButton onClick={() => window.location.href = '/contact'}>
                Candidature Spontanée
              </ContactButton>
            </NoJobsMessage>
          )}
        </JobsSection>

        <BenefitsSection>
          <SectionTitle style={{ color: 'white', marginBottom: 'var(--spacing-8)' }}>
            Avantages & Bénéfices
          </SectionTitle>
          <BenefitsGrid>
            {benefits.map((benefit, index) => (
              <BenefitItem key={index}>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </BenefitItem>
            ))}
          </BenefitsGrid>
          
          <ContactButton onClick={() => window.location.href = '/contact'}>
            Nous Contacter
          </ContactButton>
        </BenefitsSection>
      </Content>
    </Container>
  )
}
