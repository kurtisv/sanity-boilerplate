'use client'

import { ReactNode, HTMLAttributes } from 'react'
import * as S from './Card.styles'

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  variant?: CardVariant
  padding?: CardPadding
  hoverable?: boolean
  clickable?: boolean
  children: ReactNode
  className?: string
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

interface CardBodyProps {
  children: ReactNode
  className?: string
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

/**
 * Card Component
 * 
 * Composant carte flexible avec support pour:
 * - Multiples variants (default, outlined, elevated, filled)
 * - Différents niveaux de padding
 * - États hover et clickable
 * - Sous-composants Header, Body, Footer
 * 
 * @example
 * // Carte simple
 * <Card>
 *   <Card.Body>
 *     <h3>Titre</h3>
 *     <p>Contenu de la carte</p>
 *   </Card.Body>
 * </Card>
 * 
 * // Carte complète
 * <Card variant="elevated" hoverable>
 *   <Card.Header>
 *     <h2>En-tête</h2>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Corps de la carte</p>
 *   </Card.Body>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 */
export function Card({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <S.Card
      $variant={variant}
      $padding={padding}
      $hoverable={hoverable}
      $clickable={clickable}
      className={className}
      {...props}
    >
      {children}
    </S.Card>
  )
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <S.CardHeader className={className}>
      {children}
    </S.CardHeader>
  )
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <S.CardBody className={className}>
      {children}
    </S.CardBody>
  )
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <S.CardFooter className={className}>
      {children}
    </S.CardFooter>
  )
}

// Attach sub-components to main Card component
Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
