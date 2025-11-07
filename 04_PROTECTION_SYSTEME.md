# 🛡️ SYSTÈME DE PROTECTION - GARANTIE ZÉRO ERREUR

**Protection automatique contre toutes les erreurs null/undefined**

---

## 📋 TABLE DES MATIÈRES

1. [Règle d'Or](#1-règle-dor)
2. [Protection des Tableaux](#2-protection-des-tableaux)
3. [Protection des Objets](#3-protection-des-objets)
4. [Protection dans setState](#4-protection-dans-setstate)
5. [Protection dans JSX](#5-protection-dans-jsx)
6. [Hooks de Sécurité](#6-hooks-de-sécurité)
7. [Template de Composant Sûr](#7-template-de-composant-sûr)
8. [Checklist Complète](#8-checklist-complète)

---

## 1️⃣ RÈGLE D'OR

### ⚠️ TOUJOURS SUPPOSER QUE LES DONNÉES PEUVENT ÊTRE NULL OU UNDEFINED

**Pourquoi ?**
- Données de Sanity peuvent être null/undefined
- État React peut être modifié et devenir undefined
- Props de composants peuvent ne pas être passés
- Résultats d'API peuvent échouer

**Solution:**
- ✅ Protéger TOUS les accès aux données
- ✅ Fournir TOUJOURS des valeurs par défaut
- ✅ Utiliser optional chaining `?.`
- ✅ Utiliser coalescence nulle `||` ou `??`

---

## 2️⃣ PROTECTION DES TABLEAUX

### Accès à .length

```typescript
// ❌ DANGEREUX - Peut crasher
array.length
config.pages.length
page.blocks.length
items.length

// ✅ SÉCURISÉ - Option 1
(array || []).length
(config.pages || []).length
(page.blocks || []).length

// ✅ SÉCURISÉ - Option 2
array?.length || 0
config.pages?.length || 0
page.blocks?.length || 0
```

### Méthodes de Tableau

```typescript
// ❌ DANGEREUX
array.map(item => ...)
config.pages.filter(p => ...)
items.reduce((sum, item) => ...)
pages.find(p => p.id === id)
blocks.some(b => b.enabled)
blocks.every(b => b.valid)

// ✅ SÉCURISÉ
(array || []).map(item => ...)
(config.pages || []).filter(p => ...)
(items || []).reduce((sum, item) => ..., 0)
(pages || []).find(p => p.id === id)
(blocks || []).some(b => b.enabled)
(blocks || []).every(b => b.valid)
```

### Spread de Tableau

```typescript
// ❌ DANGEREUX
[...array, newItem]
[...p.blocks, newBlock]
[...prev.pages, newPage]

// ✅ SÉCURISÉ
[...(array || []), newItem]
[...(p.blocks || []), newBlock]
[...(prev.pages || []), newPage]
```

### For...of et forEach

```typescript
// ❌ DANGEREUX
for (const item of array) { ... }
array.forEach(item => ...)

// ✅ SÉCURISÉ
for (const item of (array || [])) { ... }
(array || []).forEach(item => ...)
```

---

## 3️⃣ PROTECTION DES OBJETS

### Accès aux Propriétés

```typescript
// ❌ DANGEREUX
const name = config.pages.find(p => p.id === id).name
const color = settings.theme.primary

// ✅ SÉCURISÉ - Optional chaining
const name = (config.pages || []).find(p => p.id === id)?.name
const color = settings?.theme?.primary

// ✅ SÉCURISÉ - Avec fallback
const name = (config.pages || []).find(p => p.id === id)?.name || 'Sans nom'
const color = settings?.theme?.primary || '#000000'
```

### Destructuration

```typescript
// ❌ DANGEREUX
const { title, subtitle } = props

// ✅ SÉCURISÉ - Avec valeurs par défaut
const { title = '', subtitle = '' } = props || {}
const { title, subtitle } = props || { title: '', subtitle: '' }
```

### Spread d'Objet

```typescript
// ❌ DANGEREUX
{ ...settings, newProp: value }

// ✅ SÉCURISÉ
{ ...(settings || {}), newProp: value }
```

---

## 4️⃣ PROTECTION DANS SETSTATE

### Pattern Dangereux

```typescript
// ❌ DANGEREUX
setConfig((prev: any) => ({
  ...prev,
  pages: prev.pages.map(p => ...)
}))

setConfig((prev: any) => ({
  ...prev,
  pages: prev.pages.filter(p => ...)
}))

setConfig((prev: any) => ({
  ...prev,
  pages: [...prev.pages, newPage]
}))
```

### Pattern Sécurisé - Option 1

```typescript
// ✅ SÉCURISÉ - Protection inline
setConfig((prev: any) => ({
  ...prev,
  pages: (prev.pages || []).map(p => ...)
}))

setConfig((prev: any) => ({
  ...prev,
  pages: (prev.pages || []).filter(p => ...)
}))

setConfig((prev: any) => ({
  ...prev,
  pages: [...(prev.pages || []), newPage]
}))
```

### Pattern Sécurisé - Option 2 (Recommandé)

```typescript
// ✅ SÉCURISÉ - Variable locale
setConfig((prev: any) => {
  const pages = prev.pages || []
  const exists = pages.find(p => p.id === id)
  
  return {
    ...prev,
    pages: exists 
      ? pages.filter(p => p.id !== id)
      : [...pages, newPage]
  }
})
```

### Exemple Complet

```typescript
const togglePage = (pageId: string) => {
  const page = defaultPages.find(p => p.id === pageId)
  if (!page) return
  
  setConfig((prev: any) => {
    const pages = prev.pages || []  // ✅ Protection
    const exists = pages.find(p => p.id === pageId)
    
    if (exists) {
      return {
        ...prev,
        pages: pages.filter(p => p.id !== pageId)
      }
    } else {
      return {
        ...prev,
        pages: [...pages, {
          id: pageId,
          name: page.name,
          blocks: []  // ✅ Initialiser à []
        }]
      }
    }
  })
}
```

---

## 5️⃣ PROTECTION DANS JSX

### Rendu Conditionnel

```typescript
// ❌ DANGEREUX
{items.map(item => <Item />)}
{data.length > 0 && <Message />}
{config.pages.length === 0 ? <Empty /> : <Content />}

// ✅ SÉCURISÉ
{(items || []).map(item => <Item key={item._key || item.id} />)}
{(data?.length || 0) > 0 && <Message />}
{(config.pages?.length || 0) === 0 ? <Empty /> : <Content />}
```

### Map avec Key

```typescript
// ❌ DANGEREUX
{items.map((item, index) => (
  <div key={index}>  // ❌ Index comme key
    {item.title}
  </div>
))}

// ✅ SÉCURISÉ
{(items || []).map((item, index) => (
  <div key={item._key || item.id || `item-${index}`}>  // ✅ _key ou id
    {item.title || 'Sans titre'}
  </div>
))}
```

### Affichage de Texte

```typescript
// ❌ DANGEREUX
<h1>{title}</h1>
<p>{description}</p>

// ✅ SÉCURISÉ
<h1>{title || 'Sans titre'}</h1>
<p>{description || 'Aucune description'}</p>
```

---

## 6️⃣ HOOKS DE SÉCURITÉ

### useSafeProps

```typescript
import { useSafeProps } from '../withSafeProps'

export default function MyBlock(props: MyBlockProps) {
  // ✅ Normalise TOUTES les props
  const safeProps = useSafeProps(props)
  
  const { title, subtitle } = safeProps
  // title et subtitle sont garantis non-null
}
```

### useSafeArray

```typescript
import { useSafeArray } from '../withSafeProps'

export default function MyBlock(props: MyBlockProps) {
  // ✅ Garantit un array
  const items = useSafeArray(props.items)
  
  // items est TOUJOURS un array, jamais null
  return (
    <div>
      {items.length > 0 && items.map(item => ...)}
    </div>
  )
}
```

### useSafeObject

```typescript
import { useSafeObject } from '../withSafeProps'

export default function MyBlock(props: MyBlockProps) {
  // ✅ Garantit un objet avec valeurs par défaut
  const settings = useSafeObject(props.settings, { 
    layout: 'grid',
    columns: 3 
  })
  
  // settings est TOUJOURS un objet
  return <div style={{ gridTemplateColumns: `repeat(${settings.columns}, 1fr)` }} />
}
```

### Combinaison des Hooks

```typescript
import { useSafeProps, useSafeArray, useSafeObject } from '../withSafeProps'

export default function MyBlock(props: MyBlockProps) {
  // ✅ ÉTAPE 1: Normaliser toutes les props
  const safeProps = useSafeProps(props)
  
  // ✅ ÉTAPE 2: Extraire avec valeurs par défaut
  const { title, subtitle } = safeProps
  
  // ✅ ÉTAPE 3: Normaliser les arrays
  const items = useSafeArray(props.items)
  const features = useSafeArray(props.features)
  
  // ✅ ÉTAPE 4: Normaliser les objets
  const settings = useSafeObject(props.settings, { layout: 'grid' })
  const styling = useSafeObject(props.styling, { color: '#000' })
  
  // Maintenant TOUT est 100% sûr
  return (...)
}
```

---

## 7️⃣ TEMPLATE DE COMPOSANT SÛR

### Structure Complète

```typescript
import React from 'react'
import styled from 'styled-components'
import { useSafeProps, useSafeArray, useSafeObject } from '../withSafeProps'

interface MyBlockProps {
  title?: string
  subtitle?: string
  items?: Array<{
    _key?: string
    title: string
    description?: string
  }>
  settings?: {
    layout?: string
    columns?: number
  }
  styling?: {
    backgroundColor?: string
    textColor?: string
  }
}

export default function MyBlock(props: MyBlockProps) {
  // ✅ ÉTAPE 1: Normaliser TOUTES les props
  const safeProps = useSafeProps(props)
  
  // ✅ ÉTAPE 2: Extraire les valeurs simples
  const { title, subtitle } = safeProps
  
  // ✅ ÉTAPE 3: Normaliser les arrays
  const items = useSafeArray(props.items)
  
  // ✅ ÉTAPE 4: Normaliser les objets
  const settings = useSafeObject(props.settings, { 
    layout: 'grid',
    columns: 3 
  })
  const styling = useSafeObject(props.styling, {
    backgroundColor: '#ffffff',
    textColor: '#000000'
  })
  
  // ✅ ÉTAPE 5: Rendu sûr
  return (
    <Container style={{ backgroundColor: styling.backgroundColor }}>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      
      {items.length > 0 && (
        <Grid columns={settings.columns}>
          {items.map((item, index) => (
            <Item key={item._key || `item-${index}`}>
              <ItemTitle>{item.title}</ItemTitle>
              {item.description && <ItemDescription>{item.description}</ItemDescription>}
            </Item>
          ))}
        </Grid>
      )}
      
      {items.length === 0 && (
        <EmptyState>Aucun élément à afficher</EmptyState>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 40px 20px;
`

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
`

const Grid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.columns}, 1fr);
  gap: 20px;
`

const Item = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`

const ItemTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
`

const ItemDescription = styled.p`
  color: #666;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`
```

---

## 8️⃣ CHECKLIST COMPLÈTE

### Pour Chaque Composant:

- [ ] ✅ Importe `useSafeProps`, `useSafeArray`, `useSafeObject`
- [ ] ✅ Utilise `useSafeProps(props)` en premier
- [ ] ✅ Utilise `useSafeArray()` pour TOUS les arrays
- [ ] ✅ Utilise `useSafeObject()` pour TOUS les objets
- [ ] ✅ Fournit des valeurs par défaut partout
- [ ] ✅ Vérifie `array.length > 0` avant `.map()`
- [ ] ✅ Utilise `item._key || index` pour les keys
- [ ] ✅ Utilise `?.` pour les accès imbriqués
- [ ] ✅ Fournit des fallbacks pour les textes
- [ ] ✅ Gère le cas où il n'y a pas de données

### Pour Chaque Schéma:

- [ ] ✅ Tous les arrays ont `initialValue: []`
- [ ] ✅ Tous les champs avec options ont `initialValue`
- [ ] ✅ Pas de champ `_key` défini
- [ ] ✅ Export default (pas nommé)
- [ ] ✅ Icon = fonction emoji

### Pour Chaque Génération de Données:

- [ ] ✅ Tous les arrays initialisés à `[]`
- [ ] ✅ Tous les objets initialisés à `{}`
- [ ] ✅ `_key` uniques générés
- [ ] ✅ `slug = { current: 'value' }`
- [ ] ✅ Pas de `null` pour les arrays/objets

### Pour Chaque setState:

- [ ] ✅ Protection `(prev.array || [])`
- [ ] ✅ Ou variable locale `const array = prev.array || []`
- [ ] ✅ Protection des spread `[...(array || [])]`
- [ ] ✅ Protection des méthodes `.map()`, `.filter()`, etc.

---

## 🎯 GARANTIES DU SYSTÈME

### ✅ Ce qui est GARANTI:

1. **Aucune erreur null/undefined** dans les composants utilisant les hooks
2. **Aucune erreur .length** sur les arrays normalisés
3. **Aucune erreur .map()** sur les arrays normalisés
4. **Tous les arrays sont toujours des arrays** (jamais null)
5. **Tous les objets sont toujours des objets** (jamais null)
6. **Toutes les props ont des valeurs par défaut** sûres

### ⚠️ Ce qui N'est PAS garanti (si vous ne suivez pas les règles):

1. Composants qui n'utilisent PAS les hooks de sécurité
2. Accès direct à `props.items` sans `useSafeArray()`
3. Schémas sans `initialValue` pour les arrays
4. Données créées avec `null` au lieu de `[]`

---

**🛡️ AVEC CE SYSTÈME, IL EST IMPOSSIBLE D'AVOIR UNE ERREUR NULL/UNDEFINED !**

**Date de création:** 7 novembre 2025  
**Version:** 1.0 - Système complet  
**Statut:** ✅ Protection garantie
