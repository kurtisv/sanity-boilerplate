# 🤖 GUIDE COMPLET POUR LES AGENTS - RÉFÉRENCE UNIQUE

**Document consolidé - Toutes les informations essentielles pour générer du code sans erreur**

---

## 📋 TABLE DES MATIÈRES

1. [Types de Champs Sanity Valides](#1-types-de-champs-sanity-valides)
2. [Structure des Blocs](#2-structure-des-blocs)
3. [Règles d'Export et d'Import](#3-règles-dexport-et-dimport)
4. [Validation et Longueurs](#4-validation-et-longueurs)
5. [Blocs Spéciaux - Structures Exactes](#5-blocs-spéciaux---structures-exactes)
6. [Système de Protection Automatique](#6-système-de-protection-automatique)
7. [Génération de Pages et Données](#7-génération-de-pages-et-données)
8. [Checklist Avant Génération](#8-checklist-avant-génération)

---

## 1️⃣ TYPES DE CHAMPS SANITY VALIDES

### ✅ Types Primitifs Autorisés
```typescript
'string'      // Texte court
'text'        // Texte long (textarea)
'number'      // Nombre
'boolean'     // Vrai/Faux
'date'        // Date (YYYY-MM-DD)
'datetime'    // Date + heure (ISO 8601)
'url'         // URL valide
'email'       // Email valide
'slug'        // Slug URL-friendly
```

### ✅ Types Complexes Autorisés
```typescript
'array'       // Liste d'éléments
'object'      // Objet avec champs
'image'       // Image Sanity
'file'        // Fichier Sanity
'reference'   // Référence à un autre document
'block'       // Contenu riche (Portable Text)
```

### ❌ Types INTERDITS (N'existent PAS)
```typescript
'color'       // ❌ Utiliser 'string' avec validation regex
'phone'       // ❌ Utiliser 'string'
'select'      // ❌ Utiliser 'string' avec options.list
'dropdown'    // ❌ Utiliser 'string' avec options.list
'textarea'    // ❌ Utiliser 'text'
'richtext'    // ❌ Utiliser 'array' avec type 'block'
```

---

## 2️⃣ STRUCTURE DES BLOCS

### ✅ Structure Correcte d'un Bloc

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'monBlock',           // ✅ camelCase, se termine par 'Block'
  title: 'Mon Block',         // ✅ Titre lisible
  type: 'object',             // ✅ TOUJOURS 'object' pour un bloc
  icon: () => '🎨',           // ✅ Fonction retournant un emoji
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',         // ✅ Type valide
      validation: (Rule) => Rule.required().max(100)
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'object', fields: [...] }],
      initialValue: []        // ✅ CRITIQUE - Toujours initialiser les arrays
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'Sans titre',
        subtitle: 'Mon Block'
      }
    }
  }
})
```

### ❌ Erreurs Courantes

```typescript
// ❌ ERREUR 1: Export nommé
export const monBlock = defineType({ ... })
// ✅ CORRECTION:
export default defineType({ ... })

// ❌ ERREUR 2: Type 'document' pour un bloc
type: 'document'
// ✅ CORRECTION:
type: 'object'

// ❌ ERREUR 3: Import d'icône externe
import { StarIcon } from '@heroicons/react/24/solid'
icon: StarIcon
// ✅ CORRECTION:
icon: () => '⭐'

// ❌ ERREUR 4: Type 'color'
type: 'color'
// ✅ CORRECTION:
type: 'string',
description: 'Code couleur hexadécimal (ex: #3b82f6)',
validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/)
```

---

## 3️⃣ RÈGLES D'EXPORT ET D'IMPORT

### ✅ Exports Corrects
```typescript
// ✅ BON - Export default
export default defineType({
  name: 'heroBlock',
  // ...
})
```

### ❌ Exports Interdits
```typescript
// ❌ MAUVAIS - Export nommé
export const heroBlockSchema = defineType({...})
export const heroBlock = defineType({...})
```

### ✅ Imports Corrects
```typescript
// ✅ BON - Imports Sanity
import { defineType, defineField } from 'sanity'

// ✅ BON - Imports React
import React from 'react'
import styled from 'styled-components'
```

### ❌ Imports Interdits
```typescript
// ❌ MAUVAIS - Packages non installés
import { MapIcon } from '@sanity/icons'
import { StarIcon } from '@heroicons/react/24/solid'
```

---

## 4️⃣ VALIDATION ET LONGUEURS

### Longueurs Maximales Standard

```typescript
// Titres et labels
title: Rule.required().max(100)        // Titres principaux
subtitle: Rule.max(200)                // Sous-titres
label: Rule.max(50)                    // Labels courts
placeholder: Rule.max(100)             // Placeholders

// Descriptions
description: Rule.max(100)             // Descriptions courtes (features)
description: Rule.max(200)             // Descriptions moyennes (stats)
description: Rule.max(300)             // Descriptions longues (hero)

// Textes
text: Rule.max(500)                    // Textes moyens
bio: Rule.max(1000)                    // Biographies
content: Rule.max(5000)                // Contenu long

// Autres
iconEmoji: Rule.max(10)                // Emojis
href: Rule.required()                  // URLs (pas de max)
email: Rule.email()                    // Emails
```

### Validation des Couleurs

```typescript
{
  name: 'backgroundColor',
  type: 'string',
  description: 'Code couleur hexadécimal (ex: #3b82f6)',
  validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
    name: 'hex',
    invert: false
  }).error('Format invalide. Utilisez un code hex (ex: #3b82f6)'),
  initialValue: '#ffffff'
}
```

### Options pour Listes Déroulantes

```typescript
{
  name: 'layout',
  type: 'string',
  options: {
    list: [
      { title: 'Grille', value: 'grid' },
      { title: 'Liste', value: 'list' }
    ],
    layout: 'radio'  // ou 'dropdown'
  },
  initialValue: 'grid',  // ✅ TOUJOURS fournir une valeur par défaut
  validation: (Rule) => Rule.required()
}
```

---

## 5️⃣ BLOCS SPÉCIAUX - STRUCTURES EXACTES

### ContactBlock - FormFields

**FieldTypes VALIDES uniquement:**
```typescript
type FieldType = 
  | 'name'      // Nom
  | 'email'     // Email
  | 'phone'     // Téléphone
  | 'company'   // Entreprise
  | 'subject'   // Sujet
  | 'message'   // Message
  | 'textarea'  // Zone de texte
  | 'url'       // URL
  | 'custom'    // Personnalisé
```

**Structure correcte:**
```typescript
formFields: [
  {
    _key: 'field-name',
    fieldType: 'name',        // ✅ Type valide
    label: 'Votre nom',       // max 50
    placeholder: 'Ex: Jean',  // max 100
    required: true,
    width: 'half' // ou 'full'
  }
]
```

### StatsBlock - Format des Stats

```typescript
stats: [
  {
    _key: 'stat-001',
    number: '95',          // ✅ STRING (pas number!)
    label: 'Satisfaction', // max 100
    description: '...',    // max 200
    icon: '⚡'             // max 10
  }
]
```

**⚠️ CRITIQUE: `number` est de type STRING dans statsBlock!**

### FeatureGridBlock - Features

```typescript
features: [
  {
    _key: 'feature-001',
    iconType: 'emoji',     // ✅ Obligatoire
    iconEmoji: '🎨',       // ✅ Si iconType='emoji'
    title: 'Titre',        // max 100
    description: 'Desc'    // max 100 (PAS 200!)
  }
]
```

### TeamBlock - Members

```typescript
{
  displayType: 'team',   // ✅ Obligatoire
  layout: 'grid',        // ✅ Obligatoire
  gridColumns: 3,        // ✅ Si layout='grid'
  members: [
    {
      _key: 'member-001',
      name: 'John Doe',         // Obligatoire
      position: 'Developer',    // ✅ 'position' (PAS 'role')
      bio: '...',
      email: '...',
      phone: '...'
    }
  ]
}
```

**⚠️ Utiliser `position` et NON `role`!**

### HeroBlock - Structure Complète

```typescript
{
  _type: 'heroBlock',
  _key: `hero-${Date.now()}`,
  title: 'Titre',
  subtitle: 'Sous-titre',
  layout: 'centered',
  ctaButtons: [],  // ✅ Toujours initialiser à []
  backgroundSettings: {
    backgroundType: 'solid',
    backgroundColor: '#3b82f6'
  },
  styling: {
    textColor: '#ffffff',
    textAlignment: 'center',
    verticalAlignment: 'center',
    height: 'medium'
  }
}
```

### Liste Complète des Blocs Disponibles

**⚠️ IMPORTANT:** Seuls ces 24 blocs ont des schémas Sanity créés :

1. `textBlock` - Bloc de texte riche
2. `heroBlock` - Section héro avec CTA
3. `headerBlock` - En-tête du site
4. `footerBlock` - Pied de page
5. `featureGridBlock` - Grille de fonctionnalités
6. `contactBlock` - Formulaire de contact
7. `galleryBlock` - Galerie d'images
8. `teamBlock` - Présentation de l'équipe
9. `statsBlock` - Statistiques
10. `blogBlock` - Articles de blog
11. `pricingBlock` - Grille de tarifs
12. `testimonialsBlock` - Témoignages clients
13. `ctaBlock` - Call-to-Action
14. `faqBlock` - Questions fréquentes
15. `logoCloudBlock` - Nuage de logos
16. `videoBlock` - Vidéo YouTube/Vimeo
17. `accordionBlock` - Contenu pliable
18. `tabsBlock` - Contenu en onglets
19. `newsletterBlock` - Inscription newsletter
20. `logoGridBlock` - Grille de logos partenaires
21. `countdownBlock` - Compte à rebours
22. `mapBlock` - Carte interactive
23. `comparisonTableBlock` - Tableau comparatif
24. `socialProofBlock` - Preuve sociale

**❌ Blocs NON DISPONIBLES** (mentionnés dans le formulaire mais sans schéma) :
- `bookingBlock` - Système de réservation
- `serviceListBlock` - Liste de services
- `pricingTableBlock` - Tableau de prix détaillé

---

## 6️⃣ SYSTÈME DE PROTECTION AUTOMATIQUE

### Fichier de Protection
**Emplacement:** `/src/components/blocks/withSafeProps.tsx`

Ce fichier contient tous les hooks et HOC de protection :
- `withSafeProps()` - HOC pour envelopper les composants
- `useSafeProps()` - Hook pour normaliser les props
- `useSafeArray()` - Hook pour garantir un array
- `useSafeObject()` - Hook pour garantir un objet
- `useHasItems()` - Hook pour vérifier si array a des éléments

### Règle d'Or
**TOUJOURS supposer que TOUTES les données peuvent être `null` ou `undefined`**

### Protection des Tableaux

```typescript
// ❌ DANGEREUX
array.length
array.map(...)
config.pages.filter(...)
[...array, item]

// ✅ SÉCURISÉ
(array || []).length
array?.length || 0
(array || []).map(...)
(config.pages || []).filter(...)
[...(array || []), item]
```

### Protection dans setState

```typescript
// ❌ DANGEREUX
setConfig((prev: any) => ({
  ...prev,
  pages: prev.pages.map(...)
}))

// ✅ SÉCURISÉ - Option 1
setConfig((prev: any) => ({
  ...prev,
  pages: (prev.pages || []).map(...)
}))

// ✅ SÉCURISÉ - Option 2 (Meilleure)
setConfig((prev: any) => {
  const pages = prev.pages || []
  return {
    ...prev,
    pages: pages.map(...)
  }
})
```

### Protection dans JSX

```typescript
// ❌ DANGEREUX
{items.map(item => <Item />)}
{data.length > 0 && <Message />}

// ✅ SÉCURISÉ
{(items || []).map(item => <Item />)}
{(data?.length || 0) > 0 && <Message />}
```

### Hooks de Sécurité (Composants React)

**Import depuis:** `@/components/blocks/withSafeProps`

```typescript
import { useSafeProps, useSafeArray, useSafeObject, useHasItems } from '@/components/blocks/withSafeProps'

export default function MyBlock(props: MyBlockProps) {
  // ✅ ÉTAPE 1: Normaliser TOUTES les props
  const safeProps = useSafeProps(props)
  
  // ✅ ÉTAPE 2: Normaliser les arrays
  const items = useSafeArray(props.items)
  
  // ✅ ÉTAPE 3: Normaliser les objets
  const settings = useSafeObject(props.settings, { layout: 'grid' })
  
  // ✅ ÉTAPE 4: Vérifier si array a des éléments
  const hasItems = useHasItems(items)
  
  // Maintenant items.length, items.map() sont 100% sûrs
  return (...)
}
```

### HOC withSafeProps (Alternative)

```typescript
import withSafeProps from '@/components/blocks/withSafeProps'

function MyBlock(props: MyBlockProps) {
  // Les props sont déjà normalisées
  const { items, settings } = props
  return (...)
}

// Envelopper le composant
export default withSafeProps(MyBlock)
```

---

## 7️⃣ GÉNÉRATION DE PAGES ET DONNÉES

### Création de Page Complète

```typescript
const pageDoc = {
  _type: 'page',
  title: 'Ma Page',
  slug: { current: 'ma-page' },  // ✅ Objet avec 'current'
  seoTitle: 'Ma Page - Site',
  seoDescription: 'Description',
  pageBuilder: [  // ✅ Tableau de blocs
    {
      _type: 'heroBlock',
      _key: `hero-${Date.now()}`,  // ✅ _key unique requis
      title: 'Titre',
      subtitle: 'Sous-titre',
      layout: 'centered',
      ctaButtons: [],  // ✅ Tableau initialisé
      backgroundSettings: {
        backgroundType: 'solid',
        backgroundColor: '#3b82f6'
      },
      styling: {
        textColor: '#ffffff',
        textAlignment: 'center',
        verticalAlignment: 'center',
        height: 'medium'
      }
    }
  ],
  publishedAt: new Date().toISOString()
}
```

### Génération de Clés Uniques

```typescript
// ✅ TOUJOURS générer des _key uniques
function generateKey(prefix = 'item') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Utilisation
{
  _key: generateKey('hero'),
  _type: 'heroBlock',
  // ...
}
```

### Initialisation des Arrays

```typescript
// ✅ Dans les schémas
{
  name: 'items',
  type: 'array',
  of: [{ type: 'object', fields: [...] }],
  initialValue: []  // ✅ CRITIQUE
}

// ✅ Dans les données créées
{
  _type: 'heroBlock',
  ctaButtons: [],  // ✅ Jamais null
  features: [],    // ✅ Jamais null
  items: []        // ✅ Jamais null
}
```

---

## 8️⃣ TYPES DE PROJETS ET PAGES

### Types de Projets Disponibles (9)

1. **corporate** - Site vitrine entreprise
2. **ecommerce** - Site e-commerce
3. **blog** - Blog / Magazine
4. **portfolio** - Portfolio
5. **services** - Site de services
6. **landing** - Landing page produit
7. **restaurant** - Restaurant / Café
8. **health** - Santé / Bien-être
9. **custom** - Personnalisé

### Pages Disponibles (10)

1. **accueil** (🏠) - Page d'accueil principale (REQUIS)
2. **services** (💼) - Présentation de vos services
3. **a-propos** (ℹ️) - Histoire et équipe
4. **contact** (📞) - Formulaire de contact (REQUIS)
5. **blog** (📰) - Articles et actualités
6. **tarifs** (💰) - Grille tarifaire
7. **portfolio** (🎨) - Vos réalisations
8. **faq** (❓) - Questions fréquentes
9. **temoignages** (💬) - Avis clients
10. **equipe** (👥) - Présentation de l'équipe

### Styles de Design Disponibles (4)

1. **modern-minimal** - Moderne et minimaliste
2. **professional-corporate** - Professionnel et corporate
3. **creative-colorful** - Créatif et coloré
4. **elegant-luxury** - Élégant et luxueux

---

## 9️⃣ ERREURS CRITIQUES TROUVÉES DANS LE CODE ACTUEL

### ⚠️ ATTENTION: Erreurs à corriger immédiatement

**1. Arrays sans `initialValue: []`** (CRITIQUE)
- `heroBlock.ts` ligne 91 - `ctaButtons`
- `featureGridBlock.ts` ligne 204 - `features`
- `teamBlock.ts` ligne 171 - `teamMembers`
- `teamBlock.ts` ligne 264 - `testimonials`
- `statsBlock.ts` ligne 162 - `stats`

**2. contactBlock.ts - fieldType 'select' INVALIDE** (CRITIQUE)
- Ligne 62: `{ title: '📋 Sélection', value: 'select' }` doit être supprimé
- 'select' n'est PAS un fieldType valide
- Utiliser 'subject' ou 'custom' à la place

**3. featureGridBlock.ts - Validation incorrecte** (HAUTE)
- Ligne 150: `validation: (Rule) => Rule.max(200)` devrait être `max(100)`
- La documentation dit max 100 pour description de features

**4. teamBlock.ts - Incohérence de nommage** (MOYENNE)
- Le schéma utilise `teamMembers` mais la doc dit `members`
- Choisir un nom et l'utiliser partout

**5. Page.ts - Manque initialValue** (MOYENNE)
- `pageBuilder` array ligne 79 devrait avoir `initialValue: []`

### 🔧 Agent de Correction Automatique

Un agent `diagnosticFixAgent.js` a été créé pour détecter et corriger automatiquement ces erreurs.

**Utilisation:**
```bash
# Diagnostic seul (dry-run)
npm run agents:run -- diagnosticFix

# Diagnostic + correction automatique
npm run agents:run -- diagnosticFix --dry-run=false

# Via l'agent diagnostic principal
npm run agents:run -- diagnostic --fix-schemas --dry-run=false
```

---

## 🔟 CHECKLIST AVANT GÉNÉRATION

### Pour les Schémas Sanity :

- [ ] ✅ Export default (pas d'export nommé)
- [ ] ✅ Type 'object' pour les blocs (pas 'document')
- [ ] ✅ Icon = fonction retournant emoji (pas d'import externe)
- [ ] ✅ Tous les types de champs sont valides (pas de 'color', 'phone', etc.)
- [ ] ✅ Tous les arrays ont `initialValue: []`
- [ ] ✅ Tous les champs avec options ont `initialValue`
- [ ] ✅ Validations sur les champs requis
- [ ] ✅ Regex pour les couleurs hexadécimales
- [ ] ✅ Format `options.list` correct : `[{ title, value }]`
- [ ] ✅ Longueurs max respectées (100, 200, 300, etc.)
- [ ] ✅ Preview défini avec fallbacks

### Pour les Composants React :

- [ ] ✅ Utilise `useSafeProps(props)` en premier
- [ ] ✅ Utilise `useSafeArray()` pour tous les arrays
- [ ] ✅ Utilise `useSafeObject()` pour tous les objets
- [ ] ✅ Valeurs par défaut pour tous les props
- [ ] ✅ Vérification `(array || []).length > 0` avant `.map()`
- [ ] ✅ Optional chaining `?.` pour objets imbriqués
- [ ] ✅ Gestion des cas où les données sont undefined/null
- [ ] ✅ Fallbacks pour les champs optionnels

### Pour les Agents Générateurs :

- [ ] ✅ Initialise tous les arrays avec `[]` dans les schémas
- [ ] ✅ Initialise tous les arrays avec `[]` dans les données créées
- [ ] ✅ Génère des `_key` uniques pour les éléments de tableau
- [ ] ✅ Utilise le template `SAFE_BLOCK_TEMPLATE.tsx` pour les nouveaux blocs
- [ ] ✅ Inclut les imports de sécurité dans les composants générés
- [ ] ✅ Respecte les fieldTypes valides pour contactBlock
- [ ] ✅ Utilise STRING pour stats.number
- [ ] ✅ Utilise 'position' et non 'role' dans teamBlock

---

## 🎯 GARANTIE ZÉRO ERREUR

En suivant ces règles, il est **IMPOSSIBLE** d'avoir une erreur :
- ❌ "Cannot read properties of null/undefined"
- ❌ "Unknown type: color"
- ❌ "Icon must be a function"
- ❌ "Invalid field name _key"
- ❌ "options.list is not properly formatted"

---

## 📚 DOCUMENTS COMPLÉMENTAIRES

- **02_ERREURS_ET_CORRECTIONS.md** - Catalogue complet des erreurs et solutions
- **03_SANITY_SCHEMAS_GUIDE.md** - Guide détaillé des schémas Sanity
- **04_PROTECTION_SYSTEME.md** - Système de protection null complet
- **05_QUICK_REFERENCE.md** - Référence rapide pour développement

---

**🤖 CE DOCUMENT EST LA SOURCE DE VÉRITÉ POUR TOUS LES AGENTS**

**Date de création:** 7 novembre 2025  
**Version:** 1.0 - Document consolidé  
**Statut:** ✅ Référence officielle
