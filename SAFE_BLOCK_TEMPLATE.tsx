/**
 * TEMPLATE DE BLOC SÉCURISÉ
 * 
 * Utilisez ce template pour créer TOUS les nouveaux blocs
 * Il garantit qu'aucune erreur "Cannot read properties of null" ne se produira
 * 
 * INSTRUCTIONS:
 * 1. Copiez ce fichier
 * 2. Renommez-le selon votre bloc (ex: MyNewBlock.tsx)
 * 3. Remplacez "SafeBlock" par le nom de votre bloc
 * 4. Ajoutez vos props spécifiques dans l'interface
 * 5. Ajoutez votre logique et votre JSX
 * 
 * ⚠️ NE SUPPRIMEZ JAMAIS les imports et hooks de sécurité !
 */

'use client'

import React from 'react'
import styled from 'styled-components'
import { useSafeProps, useSafeArray, useSafeObject } from './src/components/blocks/withSafeProps'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface SafeBlockProps {
  // Champs de base (toujours optionnels avec ?)
  title?: string
  subtitle?: string
  
  // ✅ ARRAYS - Toujours optionnels, seront normalisés automatiquement
  items?: Array<{
    _key?: string
    title: string
    description?: string
  }>
  
  // ✅ OBJETS - Toujours optionnels, seront normalisés automatiquement
  settings?: {
    layout?: string
    columns?: number
  }
  
  // ✅ BOOLEANS - Toujours optionnels
  showTitle?: boolean
  
  // Ajoutez vos props ici...
}

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const BlockContainer = styled.section`
  padding: 4rem 2rem;
  background-color: ${(props: any) => props.theme?.colors?.background || '#ffffff'};
`

const BlockTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${(props: any) => props.theme?.colors?.text || '#1a202c'};
`

const BlockSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${(props: any) => props.theme?.colors?.textSecondary || '#718096'};
  margin-bottom: 2rem;
`

const ItemsGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns || 3}, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Item = styled.div`
  padding: 2rem;
  border-radius: 8px;
  background: #f7fafc;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }
`

const ItemTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const ItemDescription = styled.p`
  font-size: 1rem;
  color: #718096;
`

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export default function SafeBlock(props: SafeBlockProps) {
  // ✅ ÉTAPE 1: Normaliser TOUTES les props
  const safeProps = useSafeProps(props)
  
  // ✅ ÉTAPE 2: Extraire les props avec valeurs par défaut
  const {
    title,
    subtitle,
    showTitle = true
  } = safeProps
  
  // ✅ ÉTAPE 3: Normaliser les arrays spécifiquement
  const items = useSafeArray(props.items)
  
  // ✅ ÉTAPE 4: Normaliser les objets spécifiquement
  const settings = useSafeObject(props.settings, {
    layout: 'grid',
    columns: 3
  })
  
  // ============================================================================
  // LOGIQUE DU COMPOSANT
  // ============================================================================
  
  // Vous pouvez maintenant utiliser items.length, items.map(), etc. en toute sécurité
  const hasItems = items.length > 0
  
  // ============================================================================
  // RENDU
  // ============================================================================
  
  return (
    <BlockContainer>
      {/* Titre */}
      {showTitle && title && <BlockTitle>{title}</BlockTitle>}
      {subtitle && <BlockSubtitle>{subtitle}</BlockSubtitle>}
      
      {/* Items - JAMAIS d'erreur car items est toujours un array */}
      {hasItems && (
        <ItemsGrid $columns={settings.columns}>
          {items.map((item, index) => (
            <Item key={item._key || `item-${index}`}>
              <ItemTitle>{item.title}</ItemTitle>
              {item.description && (
                <ItemDescription>{item.description}</ItemDescription>
              )}
            </Item>
          ))}
        </ItemsGrid>
      )}
      
      {/* Message si pas d'items */}
      {!hasItems && (
        <p style={{ textAlign: 'center', color: '#a0aec0' }}>
          Aucun élément à afficher
        </p>
      )}
    </BlockContainer>
  )
}

// ============================================================================
// NOTES IMPORTANTES
// ============================================================================

/**
 * ✅ CE QUI EST GARANTI PAR CE TEMPLATE:
 * 
 * 1. Aucune erreur "Cannot read properties of null"
 * 2. Aucune erreur "Cannot read properties of undefined"
 * 3. Aucune erreur ".length of null"
 * 4. Aucune erreur ".map() of null"
 * 5. Tous les arrays sont toujours des arrays
 * 6. Tous les objets sont toujours des objets
 * 7. Toutes les props ont des valeurs par défaut sûres
 * 
 * ❌ CE QU'IL NE FAUT JAMAIS FAIRE:
 * 
 * 1. Accéder directement à props.items.length (utiliser useSafeArray)
 * 2. Faire props.items.map() sans vérification (utiliser useSafeArray)
 * 3. Accéder à props.settings.value sans vérification (utiliser useSafeObject)
 * 4. Supprimer les hooks useSafeProps, useSafeArray, useSafeObject
 * 
 * ✅ BONNES PRATIQUES:
 * 
 * 1. Toujours utiliser useSafeProps(props) en premier
 * 2. Toujours utiliser useSafeArray() pour les arrays
 * 3. Toujours utiliser useSafeObject() pour les objets
 * 4. Toujours fournir des valeurs par défaut
 * 5. Toujours vérifier hasItems avant de mapper
 * 6. Toujours utiliser optional chaining (?.) pour les objets imbriqués
 */
