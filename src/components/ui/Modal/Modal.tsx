'use client'

import { useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import * as S from './Modal.styles'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: ModalSize
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  children: ReactNode
  className?: string
}

/**
 * Modal Component
 * 
 * Composant modal accessible avec support pour:
 * - Différentes tailles (sm, md, lg, xl, full)
 * - Fermeture par overlay ou touche Escape
 * - Gestion du focus et accessibilité
 * - Animation d'entrée/sortie
 * - Portal pour rendu hors du DOM parent
 * 
 * @example
 * // Modal simple
 * <Modal isOpen={isOpen} onClose={handleClose} title="Confirmation">
 *   <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
 * </Modal>
 * 
 * // Modal grande taille
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={handleClose} 
 *   size="lg"
 *   title="Détails du produit"
 * >
 *   <ProductDetails />
 * </Modal>
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  children,
  className,
}: ModalProps) {
  // Gestion de la touche Escape
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  // Gestion du scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Gestion du focus
  useEffect(() => {
    if (!isOpen) return

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          event.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          event.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isOpen])

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <S.Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <S.Modal
        $size={size}
        $isOpen={isOpen}
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {(title || showCloseButton) && (
          <S.Header>
            {title && (
              <S.Title id="modal-title">
                {title}
              </S.Title>
            )}
            
            {showCloseButton && (
              <S.CloseButton
                onClick={onClose}
                aria-label="Fermer la modal"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </S.CloseButton>
            )}
          </S.Header>
        )}
        
        <S.Content>
          {children}
        </S.Content>
      </S.Modal>
    </S.Overlay>
  )

  // Utiliser un portal pour rendre la modal à la racine du DOM
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return null
}
