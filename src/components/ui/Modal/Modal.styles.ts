import styled, { css, keyframes } from 'styled-components'
import { ModalSize } from './Modal'

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-modal);
  padding: var(--spacing-4);
  
  ${props => props.$isOpen && css`
    animation: ${fadeIn} var(--transition-base) ease-out;
  `}
  
  @media (max-width: 768px) {
    padding: var(--spacing-2);
    align-items: flex-end;
  }
`

export const Modal = styled.div<{ $size: ModalSize; $isOpen: boolean }>`
  background: var(--color-white);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-2xl);
  position: relative;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  ${props => props.$isOpen && css`
    animation: ${slideIn} var(--transition-base) ease-out;
  `}
  
  ${props => {
    switch (props.$size) {
      case 'sm':
        return css`
          width: 100%;
          max-width: 400px;
        `
      case 'lg':
        return css`
          width: 100%;
          max-width: 800px;
        `
      case 'xl':
        return css`
          width: 100%;
          max-width: 1200px;
        `
      case 'full':
        return css`
          width: 95vw;
          height: 95vh;
          max-width: none;
          max-height: none;
        `
      default: // md
        return css`
          width: 100%;
          max-width: 600px;
        `
    }
  }}
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
    border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;
    
    ${props => props.$size === 'full' && css`
      height: 100vh;
      border-radius: 0;
    `}
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-6) var(--spacing-6) var(--spacing-4) var(--spacing-6);
  border-bottom: 1px solid var(--color-gray-200);
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
  }
`

export const Title = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0;
  line-height: var(--line-height-tight);
`

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--color-gray-500);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  flex-shrink: 0;
  
  &:hover {
    background: var(--color-gray-100);
    color: var(--color-gray-700);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`

export const Content = styled.div`
  padding: var(--spacing-6);
  overflow-y: auto;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: var(--spacing-4);
  }
  
  /* Styles pour le scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-gray-100);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-gray-300);
    border-radius: 3px;
    
    &:hover {
      background: var(--color-gray-400);
    }
  }
`
