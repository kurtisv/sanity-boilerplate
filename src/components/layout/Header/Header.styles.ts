import styled from 'styled-components'
import Link from 'next/link'

// === HEADER CONTAINER ===
export const HeaderContainer = styled.header<{ $bgColor?: string; $textColor?: string; $scrolled?: boolean }>`
  background-color: ${props => props.$bgColor || 'var(--color-white)'};
  color: ${props => props.$textColor || 'var(--color-gray-900)'};
  box-shadow: ${props => props.$scrolled ? 'var(--shadow-md)' : 'var(--shadow-sm)'};
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
  transition: box-shadow var(--transition-base);
  backdrop-filter: blur(8px);
`

export const HeaderContent = styled.div`
  max-width: var(--max-width-container);
  margin: 0 auto;
  padding: var(--spacing-4) var(--spacing-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-4);
  
  @media (max-width: 768px) {
    padding: var(--spacing-3) var(--spacing-4);
  }
`

// === LOGO ===
export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  z-index: var(--z-index-dropdown);
  transition: opacity var(--transition-base);
  
  &:hover {
    opacity: 0.8;
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 4px;
    border-radius: var(--border-radius-base);
  }
`

export const LogoWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 40px;
  
  @media (max-width: 768px) {
    width: 120px;
    height: 36px;
  }
`

export const MobileLogoWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 36px;
`

// === LOGO TEXT ===
export const LogoText = styled.span`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: inherit;
  letter-spacing: -0.02em;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-xl);
  }
`

// === DESKTOP NAVIGATION ===
export const DesktopNavigation = styled.nav`
  display: none;
  align-items: center;
  gap: var(--spacing-8);
  margin-left: auto;
  
  @media (min-width: 1024px) {
    display: flex;
  }
`

export const NavItem = styled.div`
  position: relative;
  
  &:hover > div {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }
`

export const NavLink = styled(Link)`
  color: inherit;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  transition: opacity var(--transition-base);
  padding: var(--spacing-2) 0;
  display: inline-block;
  
  &:hover {
    opacity: 0.7;
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: var(--border-radius-base);
  }
`

// === DESKTOP SUBMENU ===
export const Submenu = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  top: 100%;
  margin-top: var(--spacing-3);
  min-width: 200px;
  background-color: var(--color-white);
  box-shadow: var(--shadow-xl);
  border-radius: var(--border-radius-lg);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all var(--transition-base);
  overflow: hidden;
  border: 1px solid var(--color-gray-100);
`

export const SubmenuItem = styled.div``

export const SubmenuLink = styled(Link)`
  display: block;
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-gray-700);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--color-gray-50);
    color: var(--color-primary);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: -2px;
  }
`

// === CTA BUTTON ===
export const CTAButton = styled(Link)`
  display: none;
  padding: var(--spacing-2) var(--spacing-5);
  background-color: var(--color-primary);
  color: var(--color-white);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-base);
  white-space: nowrap;
  
  &:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  @media (min-width: 1024px) {
    display: inline-block;
  }
`

// === HAMBURGER BUTTON ===
export const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: var(--z-index-modal);
  
  span {
    width: 28px;
    height: 2px;
    background-color: currentColor;
    border-radius: 2px;
    transition: all var(--transition-base);
    transform-origin: center;
    
    &:nth-child(1) {
      transform: ${props => props.$isOpen ? 'rotate(45deg) translateY(9px)' : 'rotate(0)'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.$isOpen ? '0' : '1'};
      transform: ${props => props.$isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }
    
    &:nth-child(3) {
      transform: ${props => props.$isOpen ? 'rotate(-45deg) translateY(-9px)' : 'rotate(0)'};
    }
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 4px;
    border-radius: var(--border-radius-base);
  }
  
  @media (min-width: 1024px) {
    display: none;
  }
`

// === MOBILE MENU ===
export const MobileMenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all var(--transition-base);
  z-index: var(--z-index-modal-backdrop);
  backdrop-filter: blur(2px);
`

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background-color: var(--color-white);
  box-shadow: var(--shadow-2xl);
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform var(--transition-slow);
  z-index: var(--z-index-modal);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 1024px) {
    display: none;
  }
`

export const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-100);
`

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-gray-700);
  border-radius: var(--border-radius-base);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--color-gray-100);
    color: var(--color-gray-900);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`

// === MOBILE NAVIGATION ===
export const MobileNavigation = styled.nav`
  flex: 1;
  padding: var(--spacing-2) 0;
  overflow-y: auto;
`

export const MobileNavItem = styled.div`
  border-bottom: 1px solid var(--color-gray-100);
`

export const MobileNavLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const MobileNavLink = styled(Link)`
  flex: 1;
  padding: var(--spacing-4);
  color: var(--color-gray-900);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-lg);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--color-gray-50);
    color: var(--color-primary);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: -2px;
  }
`

export const SubmenuToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-gray-600);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--color-gray-100);
    color: var(--color-gray-900);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: -2px;
  }
`

// === MOBILE SUBMENU ===
export const MobileSubmenu = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height var(--transition-slow);
  background-color: var(--color-gray-50);
`

export const MobileSubmenuItem = styled.div``

export const MobileSubmenuLink = styled(Link)`
  display: block;
  padding: var(--spacing-3) var(--spacing-4) var(--spacing-3) var(--spacing-8);
  color: var(--color-gray-700);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--color-gray-100);
    color: var(--color-primary);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: -2px;
  }
`

// === MOBILE CTA ===
export const MobileCTAButton = styled(Link)`
  display: block;
  margin: var(--spacing-4);
  padding: var(--spacing-4);
  background-color: var(--color-primary);
  color: var(--color-white);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
  text-align: center;
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-base);
  
  &:hover {
    background-color: var(--color-primary-dark);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`
