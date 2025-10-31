'use client'

import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const SpinnerContainer = styled.div<{ $size?: 'small' | 'medium' | 'large'; $centered?: boolean }>`
  display: ${props => props.$centered ? 'flex' : 'inline-flex'};
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  
  ${props => props.$centered && `
    width: 100%;
    min-height: 200px;
  `}
`

const Spinner = styled.div<{ $size?: 'small' | 'medium' | 'large'; $color?: string }>`
  ${props => {
    switch (props.$size) {
      case 'small':
        return 'width: 1rem; height: 1rem; border-width: 2px;'
      case 'large':
        return 'width: 3rem; height: 3rem; border-width: 3px;'
      default:
        return 'width: 2rem; height: 2rem; border-width: 2px;'
    }
  }}
  
  border: ${props => props.$color ? `${props.$color}20` : '#e5e7eb'} solid;
  border-top: ${props => props.$color || '#3b82f6'} solid;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

const LoadingText = styled.span<{ $size?: 'small' | 'medium' | 'large' }>`
  color: #6b7280;
  font-weight: 500;
  animation: ${pulse} 2s ease-in-out infinite;
  
  ${props => {
    switch (props.$size) {
      case 'small':
        return 'font-size: 0.875rem;'
      case 'large':
        return 'font-size: 1.125rem;'
      default:
        return 'font-size: 1rem;'
    }
  }}
`

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
  text?: string
  centered?: boolean
  className?: string
}

export default function LoadingSpinner({ 
  size = 'medium', 
  color, 
  text, 
  centered = false,
  className 
}: LoadingSpinnerProps) {
  return (
    <SpinnerContainer $size={size} $centered={centered} className={className}>
      <Spinner $size={size} $color={color} />
      {text && <LoadingText $size={size}>{text}</LoadingText>}
    </SpinnerContainer>
  )
}

// Composant Skeleton pour les placeholders
const SkeletonElement = styled.div<{ 
  $height?: string
  $width?: string
  $borderRadius?: string
  $marginBottom?: string
}>`
  height: ${props => props.$height || '1rem'};
  width: ${props => props.$width || '100%'};
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  border-radius: ${props => props.$borderRadius || '0.25rem'};
  margin-bottom: ${props => props.$marginBottom || '0'};
`

interface SkeletonProps {
  height?: string
  width?: string
  borderRadius?: string
  marginBottom?: string
  className?: string
}

export function Skeleton({ 
  height, 
  width, 
  borderRadius, 
  marginBottom, 
  className 
}: SkeletonProps) {
  return (
    <SkeletonElement
      $height={height}
      $width={width}
      $borderRadius={borderRadius}
      $marginBottom={marginBottom}
      className={className}
    />
  )
}

// Composant pour skeleton de texte
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          height="1rem"
          width={i === lines - 1 ? '75%' : '100%'}
          marginBottom="0.5rem"
        />
      ))}
    </div>
  )
}

// Composant pour skeleton de carte
export function CardSkeleton() {
  return (
    <div>
      <Skeleton height="12rem" marginBottom="1rem" borderRadius="0.5rem" />
      <Skeleton height="1.5rem" width="80%" marginBottom="0.5rem" />
      <TextSkeleton lines={2} />
    </div>
  )
}
