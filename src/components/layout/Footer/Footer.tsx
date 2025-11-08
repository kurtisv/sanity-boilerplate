'use client'

import Link from 'next/link'
import * as S from './Footer.styles'
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from './SocialIcons'

type FooterColumn = {
  title: string
  links: {
    title: string
    link: string
  }[]
}

type PublishedPage = {
  _id: string
  title: string
  slug: string
}

type SocialLinks = {
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  youtube?: string
}

type FooterProps = {
  footerText?: string
  footerColumns?: FooterColumn[]
  publishedPages?: PublishedPage[]
  copyrightText?: string
  socialLinks?: SocialLinks
  footerBackgroundColor?: string
  footerTextColor?: string
}

export default function Footer({
  footerText = "Solution professionnelle Next.js + Sanity CMS prête à l'emploi pour créer des sites web modernes et performants.",
  footerColumns = [],
  publishedPages = [],
  copyrightText = "Sanity Boilerplate. Conçu pour les développeurs modernes.",
  socialLinks,
  footerBackgroundColor = '#f8fafc',
  footerTextColor = '#4a5568',
}: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  // Construire les colonnes dynamiquement à partir des pages publiées
  // Si publishedPages est fourni, créer une colonne "Pages" automatiquement
  const dynamicColumns: FooterColumn[] = publishedPages && publishedPages.length > 0
    ? [
        {
          title: 'Pages',
          links: publishedPages.map(page => ({
            title: page.title,
            link: page.slug === 'home' ? '/' : `/${page.slug}`
          }))
        },
        ...footerColumns
      ]
    : footerColumns
  
  return (
    <S.FooterContainer $bgColor={footerBackgroundColor} $textColor={footerTextColor}>
      <S.FooterContent>
        {/* Texte et colonnes */}
        <S.FooterGrid>
          {/* Section Branding + Texte */}
          <S.FooterTextSection>
            {/* Logo et nom */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #2b6cb0 0%, #3182ce 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                S
              </div>
              <span style={{ 
                fontWeight: '700', 
                color: '#1a202c',
                fontSize: '1.25rem'
              }}>
                Sanity Boilerplate
              </span>
            </div>
            
            {/* Texte descriptif */}
            {footerText && (
              <S.FooterText>{footerText}</S.FooterText>
            )}
            
            {/* Boutons d'action */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <Link href="/demo" style={{
                background: '#2b6cb0',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.875rem',
                transition: 'all 0.2s'
              }}>
                Voir la Démo
              </Link>
              <Link href="/studio" style={{
                background: '#4a5568',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.875rem',
                transition: 'all 0.2s'
              }}>
                Ouvrir Studio
              </Link>
            </div>
          </S.FooterTextSection>
          
          {/* Colonnes */}
          {dynamicColumns?.map((column, index) => (
            <S.FooterColumn key={index}>
              <S.ColumnTitle>{column.title}</S.ColumnTitle>
              <S.FooterLinksList>
                {column.links?.map((link, linkIndex) => (
                  <S.FooterLinkItem key={linkIndex}>
                    <S.FooterLink href={link.link}>
                      {link.title}
                    </S.FooterLink>
                  </S.FooterLinkItem>
                ))}
              </S.FooterLinksList>
            </S.FooterColumn>
          ))}
        </S.FooterGrid>
        
        {/* Réseaux sociaux */}
        {socialLinks && Object.values(socialLinks).some(link => link) && (
          <S.SocialSection>
            <S.SocialLinks>
              {socialLinks.facebook && (
                <S.SocialLink
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </S.SocialLink>
              )}
              
              {socialLinks.twitter && (
                <S.SocialLink
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </S.SocialLink>
              )}
              
              {socialLinks.instagram && (
                <S.SocialLink
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </S.SocialLink>
              )}
              
              {socialLinks.linkedin && (
                <S.SocialLink
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </S.SocialLink>
              )}
              
              {socialLinks.youtube && (
                <S.SocialLink
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <YouTubeIcon />
                </S.SocialLink>
              )}
            </S.SocialLinks>
          </S.SocialSection>
        )}
        
        {/* Copyright */}
        <S.CopyrightSection>
          <S.Copyright>
            © {currentYear} {copyrightText}
          </S.Copyright>
          
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            fontSize: '0.875rem',
            color: '#718096'
          }}>
            <span>Made with ❤️ for developers</span>
          </div>
        </S.CopyrightSection>
      </S.FooterContent>
    </S.FooterContainer>
  )
}
