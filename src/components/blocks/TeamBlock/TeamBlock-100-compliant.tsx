'use client'

import React from 'react'
import styled from 'styled-components'

// ✅ CONFORME AU SCHÉMA - Interface 100% alignée sur teamBlock.ts
interface TeamBlockProps {
  // Champs de base du schéma
  title?: string                   // ✅ validation: Rule.max(100)
  subtitle?: string                // ✅ validation: Rule.max(300)
  
  // ✅ CONFORME : blockType selon le schéma
  blockType?: 'team' | 'testimonials' | 'mixed'
  
  // ✅ CONFORME : layout selon le schéma
  layout?: 'grid' | 'carousel' | 'list' | 'hero-grid'
  
  // ✅ CONFORME : teamMembers array selon le schéma
  teamMembers?: Array<{
    _key?: string                  // ✅ Clé unique obligatoire
    name: string                   // ✅ validation: Rule.required().max(100)
    position: string               // ✅ validation: Rule.required().max(100)
    photo?: {                      // ✅ Type image Sanity
      asset: {
        _ref: string
        url?: string
      }
      hotspot?: {
        x: number
        y: number
      }
    }
    imageUrl?: string              // ✅ URL alternative
    bio?: string                   // ✅ validation: Rule.max(500)
    skills?: string[]              // ✅ array de compétences
    socialLinks?: {                // ✅ objet selon le schéma
      linkedin?: string            // ✅ type url
      twitter?: string             // ✅ type url
      github?: string              // ✅ type url
      website?: string             // ✅ type url
      email?: string               // ✅ type email
    }
    featured?: boolean             // ✅ mise en avant
    order?: number                 // ✅ ordre d'affichage
  }>
  
  // ✅ CONFORME : testimonials array selon le schéma
  testimonials?: Array<{
    _key?: string                  // ✅ Clé unique obligatoire
    content: string                // ✅ validation: Rule.required().max(500)
    author: {                      // ✅ objet auteur selon le schéma
      name: string                 // ✅ validation: Rule.required().max(100)
      position?: string            // ✅ validation: Rule.max(100)
      company?: string             // ✅ validation: Rule.max(100)
      photo?: {                    // ✅ Type image Sanity
        asset: {
          _ref: string
          url?: string
        }
        hotspot?: {
          x: number
          y: number
        }
      }
    }
    rating?: number                // ✅ validation: Rule.min(1).max(5)
    featured?: boolean             // ✅ mise en avant
    date?: string                  // ✅ type date
  }>
  
  // ✅ CONFORME : gridSettings selon le schéma
  gridSettings?: {
    columns?: {
      desktop?: number             // ✅ validation: Rule.min(1).max(6)
      tablet?: number              // ✅ validation: Rule.min(1).max(4)
      mobile?: number              // ✅ validation: Rule.min(1).max(2)
    }
    gap?: 'none' | 'small' | 'medium' | 'large'  // ✅ selon le schéma
    aspectRatio?: 'square' | 'portrait' | 'landscape' | 'auto'  // ✅ selon le schéma
  }
  
  // ✅ CONFORME : cardSettings selon le schéma
  cardSettings?: {
    style?: 'minimal' | 'bordered' | 'shadow' | 'elevated' | 'colored' | 'glass'  // ✅ selon le schéma
    showPhoto?: boolean            // ✅ boolean
    showBio?: boolean              // ✅ boolean
    showSkills?: boolean           // ✅ boolean
    showSocialLinks?: boolean      // ✅ boolean
    photoStyle?: 'circle' | 'square' | 'rounded'  // ✅ selon le schéma
  }
  
  // ✅ CONFORME : animationSettings selon le schéma
  animationSettings?: {
    enableAnimations?: boolean     // ✅ boolean
    animationType?: 'fade' | 'slideUp' | 'slideLeft' | 'zoom' | 'rotate'  // ✅ selon le schéma
    duration?: number              // ✅ validation: Rule.min(100).max(3000)
    delay?: number                 // ✅ validation: Rule.min(0).max(1000)
    staggerDelay?: number          // ✅ validation: Rule.min(0).max(500)
  }
  
  // ✅ CONFORME : backgroundSettings selon themeFields
  backgroundSettings?: {
    backgroundType?: 'solid' | 'color' | 'gradient' | 'image' | 'transparent'
    backgroundColor?: string
  }
  
  // ✅ CONFORME : styling selon themeFields
  styling?: {
    textColor?: string
    headingColor?: string
    accentColor?: string
    alignment?: 'left' | 'center' | 'right'
    spacing?: 'compact' | 'normal' | 'comfortable' | 'large' | 'xl'
  }
}

// Styled Components avec design tokens du système
const TeamSection = styled.section<{
  $backgroundColor?: string
}>`
  position: relative;
  width: 100%;
  padding: 4rem 0;
  background-color: ${props => props.$backgroundColor || 'transparent'};
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`

const TeamContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const TeamHeader = styled.div<{
  $textAlignment?: string
}>`
  text-align: ${props => props.$textAlignment || 'center'};
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`

const TeamTitle = styled.h2<{
  $color?: string
}>`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: ${props => props.$color || '#1f2937'};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const TeamSubtitle = styled.p<{
  $color?: string
}>`
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${props => props.$color || '#6b7280'};
  max-width: 600px;
  margin: 0 auto;
`

const TeamGrid = styled.div<{
  $layout?: string
  $columns?: { desktop?: number; tablet?: number; mobile?: number }
  $gap?: string
}>`
  display: grid;
  gap: ${props => {
    switch (props.$gap) {
      case 'none': return '0'
      case 'small': return '1rem'
      case 'large': return '3rem'
      default: return '2rem'
    }
  }};
  
  /* Layouts selon le schéma */
  ${props => {
    switch (props.$layout) {
      case 'grid':
        return `
          grid-template-columns: repeat(${props.$columns?.desktop || 3}, 1fr);
          @media (max-width: 1024px) {
            grid-template-columns: repeat(${props.$columns?.tablet || 2}, 1fr);
          }
          @media (max-width: 640px) {
            grid-template-columns: repeat(${props.$columns?.mobile || 1}, 1fr);
          }
        `
      case 'carousel':
        return `
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 2rem;
          padding-bottom: 1rem;
          
          > * {
            flex: 0 0 300px;
            scroll-snap-align: start;
          }
        `
      case 'list':
        return `
          grid-template-columns: 1fr;
          max-width: 800px;
          margin: 0 auto;
        `
      case 'hero-grid':
        return `
          grid-template-columns: 2fr 1fr;
          align-items: center;
          @media (max-width: 1024px) {
            grid-template-columns: 1fr;
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

const MemberCard = styled.div<{
  $cardStyle?: string
  $featured?: boolean
  $textAlignment?: string
  $animationType?: string
  $isVisible?: boolean
}>`
  position: relative;
  text-align: ${props => props.$textAlignment || 'center'};
  transition: all 0.3s ease;
  
  /* Animation d'entrée selon le schéma */
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => {
    if (!props.$isVisible) {
      switch (props.$animationType) {
        case 'slideUp': return 'translateY(30px)'
        case 'slideLeft': return 'translateX(30px)'
        case 'zoom': return 'scale(0.8)'
        case 'rotate': return 'rotate(-5deg) scale(0.8)'
        default: return 'translateY(20px)'
      }
    }
    return 'translateY(0) scale(1) rotate(0)'
  }};
  
  /* Styles de cartes selon le schéma */
  ${props => {
    const baseStyles = `
      padding: 2rem;
      border-radius: 1rem;
    `
    
    switch (props.$cardStyle) {
      case 'minimal':
        return `
          ${baseStyles}
          background: transparent;
        `
      case 'bordered':
        return `
          ${baseStyles}
          background: #ffffff;
          border: 2px solid #e5e7eb;
          
          &:hover {
            border-color: #3b82f6;
          }
        `
      case 'shadow':
        return `
          ${baseStyles}
          background: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          
          &:hover {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            transform: translateY(-4px);
          }
        `
      case 'elevated':
        return `
          ${baseStyles}
          background: #ffffff;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          
          &:hover {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            transform: translateY(-8px);
          }
        `
      case 'colored':
        return `
          ${baseStyles}
          background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%);
          border: 1px solid #e5e7eb;
          
          &:hover {
            background: linear-gradient(135deg, #e5e7eb 0%, #f9fafb 100%);
          }
        `
      case 'glass':
        return `
          ${baseStyles}
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          
          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `
      default:
        return `
          ${baseStyles}
          background: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        `
    }
  }}
  
  /* Mise en avant */
  ${props => props.$featured && `
    border: 2px solid #3b82f6;
    transform: scale(1.02);
    
    &:hover {
      transform: scale(1.05);
    }
  `}
`

const MemberImage = styled.div<{
  $photoStyle?: string
  $aspectRatio?: string
}>`
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Styles de photo selon le schéma */
  ${props => {
    switch (props.$photoStyle) {
      case 'circle':
        return 'border-radius: 50%;'
      case 'square':
        return 'border-radius: 0;'
      case 'rounded':
        return 'border-radius: 1rem;'
      default:
        return 'border-radius: 50%;'
    }
  }}
  
  /* Aspect ratio selon le schéma */
  ${props => {
    switch (props.$aspectRatio) {
      case 'square':
        return 'aspect-ratio: 1 / 1;'
      case 'portrait':
        return 'aspect-ratio: 3 / 4; height: 160px;'
      case 'landscape':
        return 'aspect-ratio: 4 / 3; height: 90px;'
      default:
        return 'aspect-ratio: 1 / 1;'
    }
  }}
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const MemberName = styled.h3<{
  $color?: string
}>`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: ${props => props.$color || '#1f2937'};
  margin-bottom: 0.5rem;
`

const MemberPosition = styled.p<{
  $color?: string
}>`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.$color || '#3b82f6'};
  margin-bottom: 1rem;
`

const MemberBio = styled.p<{
  $color?: string
}>`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${props => props.$color || '#6b7280'};
  margin-bottom: 1rem;
`

const MemberSkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
`

const SkillTag = styled.span`
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: #3b82f6;
    color: white;
    transform: translateY(-2px);
  }
`

const TestimonialCard = styled.div<{
  $cardStyle?: string
  $featured?: boolean
}>`
  background: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: relative;
  
  ${props => props.$featured && `
    border: 2px solid #3b82f6;
    transform: scale(1.02);
  `}
  
  &:before {
    content: '"';
    position: absolute;
    top: -1rem;
    left: 2rem;
    font-size: 4rem;
    color: #3b82f6;
    font-family: serif;
  }
`

const TestimonialContent = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #374151;
  margin-bottom: 1.5rem;
  font-style: italic;
`

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const AuthorImage = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const AuthorInfo = styled.div`
  flex: 1;
  
  h4 {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
  }
`

const Rating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-left: auto;
`

export default function TeamBlock({
  title,
  subtitle,
  blockType = 'team',
  layout = 'grid',
  teamMembers = [],
  testimonials = [],
  gridSettings,
  cardSettings,
  animationSettings,
  backgroundSettings,
  styling
}: TeamBlockProps) {
  
  // ✅ NORMALISATION DES PROPS - Éviter les erreurs runtime
  const normalizedTeamMembers = teamMembers?.sort((a, b) => (a.order || 0) - (b.order || 0)) || []
  const normalizedTestimonials = testimonials || []
  
  const normalizedGridSettings = {
    columns: {
      desktop: gridSettings?.columns?.desktop || 3,    // ✅ Min 1 Max 6
      tablet: gridSettings?.columns?.tablet || 2,      // ✅ Min 1 Max 4
      mobile: gridSettings?.columns?.mobile || 1       // ✅ Min 1 Max 2
    },
    gap: gridSettings?.gap || 'medium',
    aspectRatio: gridSettings?.aspectRatio || 'square'
  }
  
  const normalizedCardSettings = {
    style: cardSettings?.style || 'shadow',
    showPhoto: cardSettings?.showPhoto !== false,
    showBio: cardSettings?.showBio !== false,
    showSkills: cardSettings?.showSkills !== false,
    showSocialLinks: cardSettings?.showSocialLinks !== false,
    photoStyle: cardSettings?.photoStyle || 'circle'
  }
  
  const normalizedAnimationSettings = {
    enableAnimations: animationSettings?.enableAnimations !== false,
    animationType: animationSettings?.animationType || 'fade',
    duration: animationSettings?.duration || 600,     // ✅ Min 100 Max 3000
    delay: animationSettings?.delay || 200,           // ✅ Min 0 Max 1000
    staggerDelay: animationSettings?.staggerDelay || 100  // ✅ Min 0 Max 500
  }
  
  const normalizedStyling = {
    textColor: styling?.textColor || '#374151',
    headingColor: styling?.headingColor || '#1f2937',
    accentColor: styling?.accentColor || '#3b82f6',
    alignment: styling?.alignment || 'center'
  }

  // Obtenir l'URL de l'image Sanity
  const getImageUrl = (photo?: typeof normalizedTeamMembers[0]['photo']) => {
    if (!photo) return null
    return photo.asset?.url || `https://cdn.sanity.io/images/PROJECT_ID/DATASET/${photo.asset?._ref?.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`
  }

  // Rendu d'un membre de l'équipe
  const renderMember = (member: typeof normalizedTeamMembers[0], index: number) => {
    const imageUrl = getImageUrl(member.photo) || member.imageUrl
    
    return (
      <MemberCard
        key={member._key || `member-${index}`}  // ✅ Clé unique
        $cardStyle={normalizedCardSettings.style}
        $featured={member.featured}
        $textAlignment={normalizedStyling.alignment}
        $animationType={normalizedAnimationSettings.animationType}
        $isVisible={true} // Simplification pour cet exemple
        style={{
          transitionDelay: normalizedAnimationSettings.enableAnimations 
            ? `${normalizedAnimationSettings.delay + (index * normalizedAnimationSettings.staggerDelay)}ms` 
            : '0ms'
        }}
      >
        {/* Image */}
        {normalizedCardSettings.showPhoto && (
          <MemberImage
            $photoStyle={normalizedCardSettings.photoStyle}
            $aspectRatio={normalizedGridSettings.aspectRatio}
          >
            {imageUrl ? (
              <img src={imageUrl} alt={member.name} />
            ) : (
              <span style={{ fontSize: '3rem', color: '#9ca3af' }}>👤</span>
            )}
          </MemberImage>
        )}
        
        {/* Nom - ✅ Max 100 caractères selon validation */}
        <MemberName $color={normalizedStyling.headingColor}>
          {member.name?.slice(0, 100)} {/* ✅ Respect limite validation */}
        </MemberName>

        {/* Position - ✅ Max 100 caractères selon validation */}
        <MemberPosition $color={normalizedStyling.accentColor}>
          {member.position?.slice(0, 100)} {/* ✅ Respect limite validation */}
        </MemberPosition>

        {/* Bio - ✅ Max 500 caractères selon validation */}
        {normalizedCardSettings.showBio && member.bio && (
          <MemberBio $color={normalizedStyling.textColor}>
            {member.bio.slice(0, 500)} {/* ✅ Respect limite validation */}
          </MemberBio>
        )}

        {/* Compétences */}
        {normalizedCardSettings.showSkills && member.skills && member.skills.length > 0 && (
          <MemberSkills>
            {member.skills.slice(0, 6).map((skill, skillIndex) => (
              <SkillTag key={`skill-${index}-${skillIndex}`}>
                {skill}
              </SkillTag>
            ))}
          </MemberSkills>
        )}

        {/* Liens sociaux */}
        {normalizedCardSettings.showSocialLinks && member.socialLinks && (
          <SocialLinks>
            {member.socialLinks.linkedin && (
              <SocialLink href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                💼
              </SocialLink>
            )}
            {member.socialLinks.twitter && (
              <SocialLink href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                🐦
              </SocialLink>
            )}
            {member.socialLinks.github && (
              <SocialLink href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
                💻
              </SocialLink>
            )}
            {member.socialLinks.website && (
              <SocialLink href={member.socialLinks.website} target="_blank" rel="noopener noreferrer">
                🌐
              </SocialLink>
            )}
            {member.socialLinks.email && (
              <SocialLink href={`mailto:${member.socialLinks.email}`}>
                📧
              </SocialLink>
            )}
          </SocialLinks>
        )}
      </MemberCard>
    )
  }

  // Rendu d'un témoignage
  const renderTestimonial = (testimonial: typeof normalizedTestimonials[0], index: number) => {
    const authorImageUrl = getImageUrl(testimonial.author.photo)
    
    return (
      <TestimonialCard
        key={testimonial._key || `testimonial-${index}`}  // ✅ Clé unique
        $cardStyle={normalizedCardSettings.style}
        $featured={testimonial.featured}
      >
        {/* Contenu - ✅ Max 500 caractères selon validation */}
        <TestimonialContent>
          {testimonial.content?.slice(0, 500)} {/* ✅ Respect limite validation */}
        </TestimonialContent>
        
        <TestimonialAuthor>
          {/* Photo auteur */}
          <AuthorImage>
            {authorImageUrl ? (
              <img src={authorImageUrl} alt={testimonial.author.name} />
            ) : (
              <span style={{ fontSize: '1.5rem', color: '#9ca3af' }}>👤</span>
            )}
          </AuthorImage>
          
          {/* Infos auteur */}
          <AuthorInfo>
            <h4>{testimonial.author.name?.slice(0, 100)}</h4> {/* ✅ Max 100 selon validation */}
            <p>
              {testimonial.author.position?.slice(0, 100)} {/* ✅ Max 100 selon validation */}
              {testimonial.author.company && ` - ${testimonial.author.company.slice(0, 100)}`} {/* ✅ Max 100 selon validation */}
            </p>
          </AuthorInfo>
          
          {/* Note - ✅ Min 1 Max 5 selon validation */}
          {testimonial.rating && (
            <Rating>
              {Array.from({ length: Math.min(Math.max(testimonial.rating, 1), 5) }, (_, i) => (
                <span key={i}>⭐</span>
              ))}
            </Rating>
          )}
        </TestimonialAuthor>
      </TestimonialCard>
    )
  }

  // Déterminer quoi afficher selon blockType
  const shouldShowTeam = blockType === 'team' || blockType === 'mixed'
  const shouldShowTestimonials = blockType === 'testimonials' || blockType === 'mixed'
  
  // Si pas de contenu, ne rien afficher
  if ((!shouldShowTeam || !normalizedTeamMembers.length) && 
      (!shouldShowTestimonials || !normalizedTestimonials.length)) {
    return null
  }

  return (
    <TeamSection
      $backgroundColor={backgroundSettings?.backgroundColor}
    >
      <TeamContainer>
        {/* En-tête de section */}
        {(title || subtitle) && (
          <TeamHeader $textAlignment={normalizedStyling.alignment}>
            {title && (
              <TeamTitle $color={normalizedStyling.headingColor}>
                {title.slice(0, 100)} {/* ✅ Max 100 selon validation */}
              </TeamTitle>
            )}
            {subtitle && (
              <TeamSubtitle $color={normalizedStyling.textColor}>
                {subtitle.slice(0, 300)} {/* ✅ Max 300 selon validation */}
              </TeamSubtitle>
            )}
          </TeamHeader>
        )}

        {/* Équipe */}
        {shouldShowTeam && normalizedTeamMembers.length > 0 && (
          <TeamGrid
            $layout={layout}
            $columns={normalizedGridSettings.columns}
            $gap={normalizedGridSettings.gap}
          >
            {normalizedTeamMembers.map((member, index) => renderMember(member, index))}
          </TeamGrid>
        )}

        {/* Témoignages */}
        {shouldShowTestimonials && normalizedTestimonials.length > 0 && (
          <TeamGrid
            $layout={layout}
            $columns={normalizedGridSettings.columns}
            $gap={normalizedGridSettings.gap}
            style={{ marginTop: shouldShowTeam ? '3rem' : '0' }}
          >
            {normalizedTestimonials.map((testimonial, index) => renderTestimonial(testimonial, index))}
          </TeamGrid>
        )}
      </TeamContainer>
    </TeamSection>
  )
}
