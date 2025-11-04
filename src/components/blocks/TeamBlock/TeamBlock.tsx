'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import * as S from './TeamBlock.styles'

type SocialLinks = {
  linkedin?: string
  twitter?: string
  github?: string
  website?: string
  email?: string
}

type TeamMember = {
  name: string
  position: string
  photo: {
    asset: {
      _id: string
      url: string
    }
  }
  bio?: string
  skills?: string[]
  socialLinks?: SocialLinks
  featured: boolean
  order: number
}

type TestimonialAuthor = {
  name: string
  position?: string
  company?: string
  photo?: {
    asset: {
      _id: string
      url: string
    }
  }
}

type Testimonial = {
  content: string
  author: TestimonialAuthor
  rating: number
  featured: boolean
  date?: string
}

type GridSettings = {
  columns: {
    desktop: number
    tablet: number
    mobile: number
  }
  gap: 'small' | 'medium' | 'large'
}

type CarouselSettings = {
  autoplay: boolean
  autoplaySpeed: number
  showDots: boolean
  showArrows: boolean
}

type TeamBlockProps = {
  title?: string
  subtitle?: string
  blockType: 'team' | 'testimonials' | 'mixed'
  layout: 'grid' | 'carousel' | 'list' | 'hero-grid'
  teamMembers?: TeamMember[]
  testimonials?: Testimonial[]
  gridSettings?: GridSettings
  carouselSettings?: CarouselSettings
  cardStyle?: 'minimal' | 'bordered' | 'shadow' | 'colored' | 'glass'
  showSocialLinks?: boolean
  showSkills?: boolean
  styling?: {
    backgroundColor: string
    textColor: string
    accentColor: string
    spacing: 'compact' | 'normal' | 'large'
  }
}

/**
 * TeamBlock Component
 * 
 * Bloc équipe et témoignages avec:
 * - Affichage équipe, témoignages ou mixte
 * - 4 layouts (grid, carousel, list, hero-grid)
 * - Cartes membres avec photos, bio, compétences
 * - Témoignages avec notes et photos
 * - Réseaux sociaux intégrés
 * - Animations et effets hover
 * 
 * @example
 * <TeamBlock
 *   title="Notre Équipe"
 *   blockType="team"
 *   layout="grid"
 *   teamMembers={[...]}
 *   showSocialLinks={true}
 * />
 */
export default function TeamBlock({
  title,
  subtitle,
  blockType = 'team',
  layout = 'grid',
  teamMembers,
  testimonials,
  gridSettings,
  carouselSettings,
  cardStyle,
  showSocialLinks,
  showSkills,
  styling,
}: TeamBlockProps) {
  // Normaliser les props pour gérer les cas null/undefined de Sanity
  const normalizedTeamMembers = teamMembers || []
  const normalizedTestimonials = testimonials || []
  const normalizedGridSettings = gridSettings || {
    columns: { desktop: 3, tablet: 2, mobile: 1 },
    gap: 'medium' as const
  }
  const normalizedCarouselSettings = carouselSettings || {
    autoplay: true,
    autoplaySpeed: 5,
    showDots: true,
    showArrows: true
  }
  const normalizedCardStyle = cardStyle || 'shadow'
  const normalizedShowSocialLinks = showSocialLinks ?? true
  const normalizedShowSkills = showSkills ?? true
  const normalizedStyling = styling || {
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#3b82f6',
    spacing: 'normal' as const
  }
  const [currentSlide, setCurrentSlide] = useState(0)


  // Trier les membres par ordre puis par featured
  const sortedMembers = [...normalizedTeamMembers].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.order - b.order
  })

  // Trier les témoignages par featured puis par date
  const sortedTestimonials = [...normalizedTestimonials].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime()
    return 0
  })

  // Gestion du carrousel
  const nextSlide = () => {
    const items = blockType === 'team' ? sortedMembers : sortedTestimonials
    setCurrentSlide(prev => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    const items = blockType === 'team' ? sortedMembers : sortedTestimonials
    setCurrentSlide(prev => (prev - 1 + items.length) % items.length)
  }

  // Rendu des étoiles pour les témoignages
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <S.Star key={index} $filled={index < rating}>
        ⭐
      </S.Star>
    ))
  }

  // Rendu des réseaux sociaux
  const renderSocialLinks = (socialLinks?: SocialLinks) => {
    if (!socialLinks || !normalizedShowSocialLinks) return null

    const links = [
      { key: 'linkedin', url: socialLinks.linkedin, icon: '💼' },
      { key: 'twitter', url: socialLinks.twitter, icon: '🐦' },
      { key: 'github', url: socialLinks.github, icon: '💻' },
      { key: 'website', url: socialLinks.website, icon: '🌐' },
      { key: 'email', url: socialLinks.email, icon: '📧' },
    ].filter(link => link.url)

    if (links.length === 0) return null

    return (
      <S.SocialLinks>
        {links.map(link => (
          <S.SocialLink
            key={link.key}
            href={link.key === 'email' ? `mailto:${link.url}` : link.url}
            target={link.key !== 'email' ? '_blank' : undefined}
            rel={link.key !== 'email' ? 'noopener noreferrer' : undefined}
            $accentColor={normalizedStyling.accentColor}
          >
            <span>{link.icon}</span>
          </S.SocialLink>
        ))}
      </S.SocialLinks>
    )
  }

  // Rendu d'un membre d'équipe
  const renderTeamMember = (member: TeamMember, index: number) => {
    // Support pour les URLs directes (démo) et les assets Sanity
    const imageUrl = (member as any).photoUrl || urlFor(member.photo).width(400).height(400).url()

    return (
      <S.MemberCard
        key={index}
        $cardStyle={normalizedCardStyle}
        $featured={member.featured}
        $accentColor={normalizedStyling.accentColor}
      >
        <S.MemberPhoto $featured={member.featured}>
          <Image
            src={imageUrl}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </S.MemberPhoto>

        <S.MemberInfo>
          <S.MemberName $textColor={normalizedStyling.textColor} $featured={member.featured}>
            {member.name}
          </S.MemberName>
          
          <S.MemberPosition $accentColor={normalizedStyling.accentColor}>
            {member.position}
          </S.MemberPosition>

          {member.bio && (
            <S.MemberBio $textColor={normalizedStyling.textColor}>
              {member.bio}
            </S.MemberBio>
          )}

          {normalizedShowSkills && member.skills && member.skills.length > 0 && (
            <S.SkillsContainer>
              {member.skills.slice(0, 4).map((skill, skillIndex) => (
                <S.Skill key={skillIndex} $accentColor={normalizedStyling.accentColor}>
                  {skill}
                </S.Skill>
              ))}
              {member.skills.length > 4 && (
                <S.Skill $accentColor={normalizedStyling.accentColor}>
                  +{member.skills.length - 4}
                </S.Skill>
              )}
            </S.SkillsContainer>
          )}

          {renderSocialLinks(member.socialLinks)}
        </S.MemberInfo>
      </S.MemberCard>
    )
  }

  // Rendu d'un témoignage
  const renderTestimonial = (testimonial: Testimonial, index: number) => {
    const authorImageUrl = testimonial.author.photo 
      ? ((testimonial.author as any).photoUrl || urlFor(testimonial.author.photo).width(80).height(80).url())
      : null

    return (
      <S.TestimonialCard
        key={index}
        $cardStyle={normalizedCardStyle}
        $featured={testimonial.featured}
        $accentColor={normalizedStyling.accentColor}
      >
        <S.TestimonialContent>
          <S.TestimonialQuote $textColor={normalizedStyling.textColor}>
            "{testimonial.content}"
          </S.TestimonialQuote>

          <S.TestimonialRating>
            {renderStars(testimonial.rating)}
          </S.TestimonialRating>

          <S.TestimonialAuthor>
            {authorImageUrl && (
              <S.AuthorPhoto>
                <Image
                  src={authorImageUrl}
                  alt={testimonial.author.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </S.AuthorPhoto>
            )}
            
            <S.AuthorInfo>
              <S.AuthorName $textColor={normalizedStyling.textColor}>
                {testimonial.author.name}
              </S.AuthorName>
              
              {(testimonial.author.position || testimonial.author.company) && (
                <S.AuthorDetails $textColor={normalizedStyling.textColor}>
                  {testimonial.author.position}
                  {testimonial.author.position && testimonial.author.company && ' • '}
                  {testimonial.author.company}
                </S.AuthorDetails>
              )}
            </S.AuthorInfo>
          </S.TestimonialAuthor>
        </S.TestimonialContent>
      </S.TestimonialCard>
    )
  }

  // Fonction de rendu conditionnelle
  const renderItem = (item: TeamMember | Testimonial, index: number) => {
    if (blockType === 'team') {
      return renderTeamMember(item as TeamMember, index)
    } else {
      return renderTestimonial(item as Testimonial, index)
    }
  }

  const items = blockType === 'team' ? sortedMembers : sortedTestimonials

  if (items.length === 0) {
    return null
  }

  return (
    <S.Section $backgroundColor={normalizedStyling.backgroundColor} $spacing={normalizedStyling.spacing}>
      <S.Container>
        {/* En-tête */}
        {(title || subtitle) && (
          <S.Header>
            {title && (
              <S.Title $textColor={normalizedStyling.textColor}>
                {title}
              </S.Title>
            )}
            {subtitle && (
              <S.Subtitle $textColor={normalizedStyling.textColor}>
                {subtitle}
              </S.Subtitle>
            )}
          </S.Header>
        )}

        {/* Contenu */}
        <S.ContentContainer $layout={layout}>
          {layout === 'grid' && (
            <S.Grid
              $columns={normalizedGridSettings.columns}
              $gap={normalizedGridSettings.gap}
            >
              {items.map((item, index) => renderItem(item, index))}
            </S.Grid>
          )}

          {layout === 'carousel' && (
            <S.CarouselContainer>
              <S.CarouselTrack $currentSlide={currentSlide}>
                {items.map((item, index) => renderItem(item, index))}
              </S.CarouselTrack>
              
              {normalizedCarouselSettings.showArrows && (
                <>
                  <S.CarouselArrow $position="left" onClick={prevSlide}>
                    ←
                  </S.CarouselArrow>
                  <S.CarouselArrow $position="right" onClick={nextSlide}>
                    →
                  </S.CarouselArrow>
                </>
              )}
              
              {normalizedCarouselSettings.showDots && (
                <S.CarouselDots>
                  {items.map((_, index) => (
                    <S.CarouselDot
                      key={index}
                      $active={currentSlide === index}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </S.CarouselDots>
              )}
            </S.CarouselContainer>
          )}

          {layout === 'list' && (
            <S.List>
              {items.map((item, index) => renderItem(item, index))}
            </S.List>
          )}

          {layout === 'hero-grid' && (
            <S.HeroGrid>
              {items.length > 0 && (
                <S.HeroItem>
                  {renderItem(items[0], 0)}
                </S.HeroItem>
              )}
              
              {items.length > 1 && (
                <S.GridItems
                  $columns={normalizedGridSettings.columns}
                  $gap={normalizedGridSettings.gap}
                >
                  {items.slice(1).map((item, index) => renderItem(item, index + 1))}
                </S.GridItems>
              )}
            </S.HeroGrid>
          )}
        </S.ContentContainer>
      </S.Container>
    </S.Section>
  )
}
