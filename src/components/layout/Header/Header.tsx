'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as S from './Header.styles'

type MenuItem = {
  title: string
  link: string
  submenu?: {
    title: string
    link: string
  }[]
}

type HeaderProps = {
  logoType?: 'image' | 'text'
  logo?: {
    asset: {
      url: string
    }
  }
  logoText?: string
  navigationMenu?: MenuItem[]
  headerCta?: {
    text: string
    link: string
  }
  headerBackgroundColor?: string
  headerTextColor?: string
}

export default function Header({
  logoType = 'image',
  logo,
  logoText,
  navigationMenu,
  headerCta,
  headerBackgroundColor,
  headerTextColor,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  // Detect scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const toggleSubmenu = (index: number) => {
    setActiveSubmenu(activeSubmenu === index ? null : index)
  }

  return (
    <S.HeaderContainer $bgColor={headerBackgroundColor} $textColor={headerTextColor} $scrolled={scrolled}>
      <S.HeaderContent>
        {/* Logo */}
        {(logo || logoText) && (
          <S.LogoLink href="/" aria-label="Page d'accueil">
            {logoType === 'image' && logo ? (
              <S.LogoWrapper>
                <Image
                  src={logo.asset.url}
                  alt="Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </S.LogoWrapper>
            ) : logoType === 'text' && logoText ? (
              <S.LogoText>{logoText}</S.LogoText>
            ) : null}
          </S.LogoLink>
        )}

        {/* Desktop Navigation */}
        {navigationMenu && navigationMenu.length > 0 && (
          <S.DesktopNavigation role="navigation" aria-label="Navigation principale">
            {navigationMenu.map((item, index) => (
              <S.NavItem key={index}>
                <S.NavLink href={item.link}>
                  {item.title}
                </S.NavLink>
                
                {/* Desktop Submenu */}
                {item.submenu && item.submenu.length > 0 && (
                  <S.Submenu aria-label={`Sous-menu ${item.title}`}>
                    {item.submenu.map((subItem, subIndex) => (
                      <S.SubmenuItem key={subIndex}>
                        <S.SubmenuLink href={subItem.link}>
                          {subItem.title}
                        </S.SubmenuLink>
                      </S.SubmenuItem>
                    ))}
                  </S.Submenu>
                )}
              </S.NavItem>
            ))}
          </S.DesktopNavigation>
        )}

        {/* CTA Button */}
        {headerCta?.text && (
          <S.CTAButton href={headerCta.link}>
            {headerCta.text}
          </S.CTAButton>
        )}

        {/* Hamburger Menu Button */}
        <S.HamburgerButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileMenuOpen}
          $isOpen={mobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </S.HamburgerButton>
      </S.HeaderContent>

      {/* Mobile Menu Overlay */}
      <S.MobileMenuOverlay
        $isOpen={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />

      {/* Mobile Menu */}
      <S.MobileMenu $isOpen={mobileMenuOpen} role="dialog" aria-modal="true">
        <S.MobileMenuHeader>
          {(logo || logoText) && (
            <S.LogoLink href="/">
              {logoType === 'image' && logo ? (
                <S.MobileLogoWrapper>
                  <Image
                    src={logo.asset.url}
                    alt="Logo"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </S.MobileLogoWrapper>
              ) : logoType === 'text' && logoText ? (
                <S.LogoText>{logoText}</S.LogoText>
              ) : null}
            </S.LogoLink>
          )}
          <S.CloseButton
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </S.CloseButton>
        </S.MobileMenuHeader>

        <S.MobileNavigation>
          {navigationMenu?.map((item, index) => (
            <S.MobileNavItem key={index}>
              <S.MobileNavLinkWrapper>
                <S.MobileNavLink
                  href={item.link}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </S.MobileNavLink>
                {item.submenu && item.submenu.length > 0 && (
                  <S.SubmenuToggle
                    onClick={() => toggleSubmenu(index)}
                    aria-label={`${activeSubmenu === index ? 'Fermer' : 'Ouvrir'} le sous-menu ${item.title}`}
                    aria-expanded={activeSubmenu === index}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      style={{
                        transform: activeSubmenu === index ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </S.SubmenuToggle>
                )}
              </S.MobileNavLinkWrapper>
              
              {/* Mobile Submenu */}
              {item.submenu && item.submenu.length > 0 && (
                <S.MobileSubmenu $isOpen={activeSubmenu === index}>
                  {item.submenu.map((subItem, subIndex) => (
                    <S.MobileSubmenuItem key={subIndex}>
                      <S.MobileSubmenuLink
                        href={subItem.link}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.title}
                      </S.MobileSubmenuLink>
                    </S.MobileSubmenuItem>
                  ))}
                </S.MobileSubmenu>
              )}
            </S.MobileNavItem>
          ))}
        </S.MobileNavigation>

        {/* Mobile CTA */}
        {headerCta?.text && (
          <S.MobileCTAButton
            href={headerCta.link}
            onClick={() => setMobileMenuOpen(false)}
          >
            {headerCta.text}
          </S.MobileCTAButton>
        )}
      </S.MobileMenu>
    </S.HeaderContainer>
  )
}
