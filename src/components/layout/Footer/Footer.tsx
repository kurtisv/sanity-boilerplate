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
  copyrightText?: string
  socialLinks?: SocialLinks
  footerBackgroundColor?: string
  footerTextColor?: string
}

export default function Footer({
  footerText,
  footerColumns,
  copyrightText,
  socialLinks,
  footerBackgroundColor,
  footerTextColor,
}: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  return (
    <S.FooterContainer $bgColor={footerBackgroundColor} $textColor={footerTextColor}>
      <S.FooterContent>
        {/* Texte et colonnes */}
        <S.FooterGrid>
          {/* Texte du footer */}
          {footerText && (
            <S.FooterTextSection>
              <S.FooterText>{footerText}</S.FooterText>
            </S.FooterTextSection>
          )}
          
          {/* Colonnes */}
          {footerColumns?.map((column, index) => (
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
            {copyrightText || `© ${currentYear} Tous droits réservés.`}
          </S.Copyright>
        </S.CopyrightSection>
      </S.FooterContent>
    </S.FooterContainer>
  )
}
