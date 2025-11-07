# ⚠️ ERREURS COURANTES ET CORRECTIONS - CATALOGUE COMPLET

**Toutes les erreurs possibles et leurs solutions**

---

## 📋 TABLE DES MATIÈRES

1. [Erreurs de Types Sanity](#1-erreurs-de-types-sanity)
2. [Erreurs d'Export/Import](#2-erreurs-dexportimport)
3. [Erreurs de Validation](#3-erreurs-de-validation)
4. [Erreurs Runtime (null/undefined)](#4-erreurs-runtime-nullundefined)
5. [Erreurs de Structure de Données](#5-erreurs-de-structure-de-données)
6. [Erreurs de Blocs Spéciaux](#6-erreurs-de-blocs-spéciaux)
7. [Erreurs TypeScript](#7-erreurs-typescript)
8. [Solutions Systématiques](#8-solutions-systématiques)

---

## 1️⃣ ERREURS DE TYPES SANITY

### ❌ Erreur: "Unknown type: color"

**Cause:** Le type `color` n'existe pas dans Sanity

**Code problématique:**
```typescript
{
  name: 'backgroundColor',
  type: 'color'  // ❌ Type inexistant
}
```

**✅ Correction:**
```typescript
{
  name: 'backgroundColor',
  title: 'Couleur de fond',
  type: 'string',
  description: 'Code couleur hexadécimal (ex: #3b82f6)',
  validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
    name: 'hex',
    invert: false
  }).error('Format invalide. Utilisez un code hex (ex: #3b82f6)'),
  initialValue: '#ffffff'
}
```

### ❌ Erreur: "Unknown type: select"

**Cause:** Le type `select` n'existe pas, utiliser `string` avec `options.list`

**Code problématique:**
```typescript
{
  name: 'theme',
  type: 'select',  // ❌ Type inexistant
  options: ['dark', 'light']
}
```

**✅ Correction:**
```typescript
{
  name: 'theme',
  type: 'string',
  options: {
    list: [
      { title: 'Sombre', value: 'dark' },
      { title: 'Clair', value: 'light' }
    ],
    layout: 'radio'
  },
  initialValue: 'dark'
}
```

### ❌ Erreur: "Unknown type: textarea"

**Code problématique:**
```typescript
{
  name: 'description',
  type: 'textarea'  // ❌ Type inexistant
}
```

**✅ Correction:**
```typescript
{
  name: 'description',
  type: 'text'  // ✅ Type correct
}
```

---

## 2️⃣ ERREURS D'EXPORT/IMPORT

### ❌ Erreur: "Module has no default export"

**Cause:** Export nommé au lieu de default

**Code problématique:**
```typescript
export const heroBlockSchema = defineType({...})
export const heroBlock = defineType({...})
```

**✅ Correction:**
```typescript
export default defineType({...})
```

### ❌ Erreur: "Icon must be a function"

**Cause:** Import d'icône externe au lieu d'une fonction

**Code problématique:**
```typescript
import { StarIcon } from '@heroicons/react/24/solid'

export default defineType({
  icon: StarIcon  // ❌ Import externe
})
```

**✅ Correction:**
```typescript
// Pas d'import !
export default defineType({
  icon: () => '⭐'  // ✅ Fonction retournant emoji
})
```

### ❌ Erreur: "Cannot find module '@sanity/icons'"

**Cause:** Package non installé

**Code problématique:**
```typescript
import { MapIcon } from '@sanity/icons'
```

**✅ Correction:**
```typescript
// Ne pas importer, utiliser emoji
icon: () => '🗺️'
```

---

## 3️⃣ ERREURS DE VALIDATION

### ❌ Erreur: "Invalid field name '_key'"

**Cause:** Champ `_key` défini manuellement dans le schéma

**Code problématique:**
```typescript
defineField({
  name: '_key',  // ❌ Réservé par Sanity
  type: 'string'
})
```

**✅ Correction:**
```typescript
// Ne PAS définir _key dans le schéma
// Sanity le génère automatiquement pour les arrays
```

### ❌ Erreur: "options.list is not properly formatted"

**Code problématique:**
```typescript
options: {
  list: ['option1', 'option2']  // ❌ Format incorrect
}
```

**✅ Correction:**
```typescript
options: {
  list: [
    { title: 'Option 1', value: 'option1' },
    { title: 'Option 2', value: 'option2' }
  ]
}
```

### ❌ Erreur: "Validation failed: max length exceeded"

**Cause:** Texte trop long

**Code problématique:**
```typescript
title: 'Un titre extrêmement long qui dépasse largement les 100 caractères autorisés pour ce champ et qui causera une erreur de validation'
```

**✅ Correction:**
```typescript
// Respecter les limites
title: 'Titre concis'  // max 100 chars
subtitle: 'Sous-titre'  // max 200 chars
description: 'Description courte'  // max 100-300 selon le bloc
```

---

## 4️⃣ ERREURS RUNTIME (null/undefined)

### ❌ Erreur: "Cannot read properties of null (reading 'length')"

**Cause:** Accès à `.length` sur un tableau null/undefined

**Code problématique:**
```typescript
{ctaButtons.length > 0 && ...}
{items.map(item => ...)}
const total = pages.reduce((sum, page) => sum + page.blocks.length, 0)
```

**✅ Correction:**
```typescript
{(ctaButtons || []).length > 0 && ...}
{ctaButtons?.length > 0 && ...}
{(items || []).map(item => ...)}
const total = (pages || []).reduce((sum, page) => sum + (page.blocks?.length || 0), 0)
```

### ❌ Erreur: "Cannot read properties of undefined (reading 'map')"

**Code problématique:**
```typescript
config.pages.map(page => ...)
prev.pages.filter(p => ...)
```

**✅ Correction:**
```typescript
(config.pages || []).map(page => ...)
(prev.pages || []).filter(p => ...)
```

### ❌ Erreur: "Cannot spread null/undefined"

**Code problématique:**
```typescript
[...array, newItem]
[...p.blocks, newBlock]
```

**✅ Correction:**
```typescript
[...(array || []), newItem]
[...(p.blocks || []), newBlock]
```

### ❌ Erreur dans setState

**Code problématique:**
```typescript
setConfig((prev: any) => ({
  ...prev,
  pages: prev.pages.map(...)
}))
```

**✅ Correction:**
```typescript
setConfig((prev: any) => {
  const pages = prev.pages || []
  return {
    ...prev,
    pages: pages.map(...)
  }
})
```

---

## 5️⃣ ERREURS DE STRUCTURE DE DONNÉES

### ❌ Erreur: "Missing _key in array element"

**Cause:** Éléments d'array sans `_key` unique

**Code problématique:**
```typescript
members: [
  {
    name: 'John',  // ❌ Pas de _key
    position: 'Developer'
  }
]
```

**✅ Correction:**
```typescript
members: [
  {
    _key: `member-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: 'John',
    position: 'Developer'
  }
]
```

### ❌ Erreur: "Slug must be an object"

**Code problématique:**
```typescript
slug: 'ma-page'  // ❌ String au lieu d'objet
```

**✅ Correction:**
```typescript
slug: { current: 'ma-page' }  // ✅ Objet avec 'current'
```

### ❌ Erreur: "Array not initialized"

**Code problématique:**
```typescript
{
  _type: 'heroBlock',
  ctaButtons: null  // ❌ Causera une erreur
}
```

**✅ Correction:**
```typescript
{
  _type: 'heroBlock',
  ctaButtons: []  // ✅ Array vide, pas null
}
```

### ❌ Arrays sans initialValue dans les schémas

**⚠️ ERREUR CRITIQUE:** Plusieurs schémas n'ont PAS `initialValue: []` pour leurs arrays!

**Schémas à corriger:**
- `heroBlock.ts` ligne 91 - `ctaButtons` sans initialValue
- `featureGridBlock.ts` ligne 204 - `features` sans initialValue
- `teamBlock.ts` ligne 171 - `teamMembers` sans initialValue
- `teamBlock.ts` ligne 264 - `testimonials` sans initialValue
- `statsBlock.ts` ligne 162 - `stats` sans initialValue
- `contactBlock.ts` ligne 152 - `formFields` a initialValue ✅ (BON EXEMPLE)

**Code problématique:**
```typescript
defineField({
  name: 'ctaButtons',
  type: 'array',
  of: [...],
  validation: (Rule) => Rule.max(3)
  // ❌ Manque initialValue: []
})
```

**✅ Correction:**
```typescript
defineField({
  name: 'ctaButtons',
  type: 'array',
  of: [...],
  initialValue: [],  // ✅ OBLIGATOIRE
  validation: (Rule) => Rule.max(3)
})
```

---

## 6️⃣ ERREURS DE BLOCS SPÉCIAUX

### ❌ ContactBlock: Invalid fieldType

**Code problématique:**
```typescript
formFields: [
  {
    fieldType: 'text',    // ❌ N'existe pas
    fieldType: 'tel',     // ❌ N'existe pas
    fieldType: 'select'   // ❌ N'existe pas (ERREUR DANS LE SCHÉMA ACTUEL!)
  }
]
```

**⚠️ ERREUR CRITIQUE TROUVÉE:** Le schéma `contactBlock.ts` ligne 62 contient `{ title: '📋 Sélection', value: 'select' }` qui est INVALIDE!

**✅ Correction:**
```typescript
formFields: [
  {
    _key: 'field-name',
    fieldType: 'name',     // ✅ Valide
    fieldType: 'phone',    // ✅ Valide
    fieldType: 'subject',  // ✅ Valide
    label: 'Label',
    placeholder: 'Placeholder',
    required: true,
    width: 'half'
  }
]
```

**FieldTypes valides:** `name`, `email`, `phone`, `company`, `subject`, `message`, `textarea`, `url`, `custom`

**❌ FieldTypes INVALIDES:** `text`, `tel`, `select` (à supprimer du schéma)

### ❌ StatsBlock: number as Number

**Code problématique:**
```typescript
stats: [
  {
    number: 95  // ❌ Number au lieu de String
  }
]
```

**✅ Correction:**
```typescript
stats: [
  {
    _key: 'stat-001',
    number: '95',  // ✅ STRING obligatoire
    label: 'Satisfaction',
    description: 'Clients satisfaits',
    icon: '⚡'
  }
]
```

### ❌ FeatureGridBlock: Missing iconType

**Code problématique:**
```typescript
features: [
  {
    icon: '🎨',  // ❌ Manque iconType
    title: 'Feature'
  }
]
```

**✅ Correction:**
```typescript
features: [
  {
    _key: 'feature-001',
    iconType: 'emoji',  // ✅ Obligatoire
    iconEmoji: '🎨',    // ✅ Si iconType='emoji'
    title: 'Feature',
    description: 'Description'  // max 100 chars
  }
]
```

### ❌ FeatureGridBlock: Description max incorrect

**⚠️ ERREUR CRITIQUE TROUVÉE:** Le schéma `featureGridBlock.ts` ligne 150 a `validation: (Rule) => Rule.max(200)` mais devrait être max(100)!

**Code problématique:**
```typescript
{
  name: 'description',
  type: 'text',
  validation: (Rule) => Rule.max(200)  // ❌ Trop long!
}
```

**✅ Correction:**
```typescript
{
  name: 'description',
  type: 'text',
  validation: (Rule) => Rule.max(100)  // ✅ Correct selon la doc
}
```

### ❌ TeamBlock: Using 'role' instead of 'position'

**Code problématique:**
```typescript
members: [
  {
    name: 'John',
    role: 'Developer'  // ❌ Mauvais champ
  }
]
```

**✅ Correction:**
```typescript
{
  displayType: 'team',   // ✅ Obligatoire
  layout: 'grid',        // ✅ Obligatoire
  gridColumns: 3,        // ✅ Si layout='grid'
  members: [
    {
      _key: 'member-001',
      name: 'John',
      position: 'Developer',  // ✅ 'position' pas 'role'
      bio: 'Bio',
      email: 'john@example.com'
    }
  ]
}
```

### ❌ TeamBlock: Champ 'teamMembers' au lieu de 'members'

**⚠️ INCOHÉRENCE TROUVÉE:** Le schéma `teamBlock.ts` utilise `teamMembers` mais la doc dit `members`!

**Dans le schéma actuel:**
```typescript
defineField({
  name: 'teamMembers',  // ❌ Incohérent avec la doc
  title: 'Membres de l\'équipe',
  type: 'array',
  // ...
})
```

**Ce qui devrait être (selon la doc):**
```typescript
defineField({
  name: 'members',  // ✅ Cohérent
  title: 'Membres de l\'équipe',
  type: 'array',
  // ...
})
```

**OU mettre à jour la doc pour utiliser `teamMembers` partout.**

---

## 7️⃣ ERREURS TYPESCRIPT

### ❌ Erreur: "Parameter 'prev' implicitly has 'any' type"

**Code problématique:**
```typescript
setConfig((prev) => ({ ...prev, pages: [] }))
```

**✅ Correction:**
```typescript
setConfig((prev: any) => ({ ...prev, pages: [] }))
```

### ❌ Erreur: "Cannot find name 'Component'"

**Cause:** Styled component défini après son utilisation

**✅ Correction:**
```typescript
// Définir TOUS les styled components AVANT le composant principal
const StyledDiv = styled.div`...`
const StyledButton = styled.button`...`

export default function MyComponent() {
  return <StyledDiv>...</StyledDiv>
}
```

### ❌ Erreur: "Cannot redeclare block-scoped variable"

**Cause:** Styled components dupliqués

**✅ Correction:**
```typescript
// Supprimer les duplicatas
// Garder une seule définition de chaque styled component
```

---

## 8️⃣ SOLUTIONS SYSTÉMATIQUES

### Protection Automatique des Arrays

```typescript
// ✅ Pattern à appliquer PARTOUT
const safeArray = array || []
const safeLength = array?.length || 0
const safeMap = (array || []).map(...)
const safeFilter = (array || []).filter(...)
const safeReduce = (array || []).reduce(..., 0)
const safeFind = (array || []).find(...)
const safeSome = (array || []).some(...)
```

### Protection dans les Composants React

```typescript
import { useSafeProps, useSafeArray, useSafeObject } from '../withSafeProps'

export default function MyBlock(props: MyBlockProps) {
  // ✅ TOUJOURS normaliser les props
  const safeProps = useSafeProps(props)
  const items = useSafeArray(props.items)
  const settings = useSafeObject(props.settings, { layout: 'grid' })
  
  // Maintenant 100% sûr
  return (
    <div>
      {items.map(item => <Item key={item._key} {...item} />)}
    </div>
  )
}
```

### Initialisation Systématique

```typescript
// ✅ Dans les schémas
{
  name: 'items',
  type: 'array',
  of: [...],
  initialValue: []  // ✅ TOUJOURS
}

// ✅ Dans les données créées
{
  _type: 'myBlock',
  items: [],        // ✅ TOUJOURS
  settings: {},     // ✅ TOUJOURS
  title: ''         // ✅ TOUJOURS
}

// ✅ Dans les composants
const items = props.items || []
const settings = props.settings || {}
const title = props.title || ''
```

---

## 🎯 CHECKLIST ANTI-ERREURS

### Avant de Générer un Schéma:
- [ ] Pas de type 'color', 'select', 'textarea', etc.
- [ ] Export default (pas nommé)
- [ ] Icon = fonction emoji (pas d'import)
- [ ] Tous les arrays ont initialValue: []
- [ ] Tous les champs avec options ont initialValue
- [ ] Pas de champ _key défini
- [ ] Longueurs max respectées

### Avant de Générer un Composant:
- [ ] Imports de sécurité (useSafeProps, etc.)
- [ ] useSafeProps(props) en premier
- [ ] useSafeArray() pour tous les arrays
- [ ] useSafeObject() pour tous les objets
- [ ] Vérification (array || []).length avant .map()
- [ ] Optional chaining ?.  partout

### Avant de Générer des Données:
- [ ] Tous les arrays initialisés à []
- [ ] Tous les objets initialisés à {}
- [ ] _key uniques pour éléments d'array
- [ ] slug = { current: 'value' }
- [ ] FieldTypes valides pour contactBlock
- [ ] stats.number en STRING
- [ ] teamBlock avec position (pas role)

---

## 🚨 ERREURS À NE JAMAIS FAIRE

```typescript
// ❌ JAMAIS
type: 'color'
type: 'select'
export const myBlock = ...
import { Icon } from '@heroicons/react'
icon: Icon
items.length  // sans protection
items.map()   // sans protection
[...items, x]  // sans protection
_key: 'xxx'  // dans le schéma
ctaButtons: null
members: null
stats: [{ number: 95 }]  // number pas string
members: [{ role: 'Dev' }]  // role au lieu de position
fieldType: 'text'  // dans contactBlock
```

---

**⚠️ EN CAS D'ERREUR, CONSULTER CE DOCUMENT EN PREMIER**

**Date de création:** 7 novembre 2025  
**Version:** 1.0 - Catalogue complet  
**Statut:** ✅ Référence officielle
