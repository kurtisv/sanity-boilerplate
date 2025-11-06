# 📘 RÉFÉRENCE SANITY POUR LES AGENTS

**Document unique de référence pour la génération de contenu Sanity**  
Ce document contient TOUTES les règles, validations, erreurs courantes et implémentations correctes.

---

## 🎯 TABLE DES MATIÈRES

1. [Types de Champs Valides](#types-de-champs-valides)
2. [Structure des Blocs](#structure-des-blocs)
3. [Erreurs Courantes et Corrections](#erreurs-courantes-et-corrections)
4. [Validations Requises](#validations-requises)
5. [Formats de Données](#formats-de-données)
6. [Exemples Complets](#exemples-complets)

---

## 1️⃣ TYPES DE CHAMPS VALIDES

### Types Primitifs Autorisés
```typescript
✅ VALIDES:
- string      // Texte court
- text        // Texte long (textarea)
- number      // Nombre
- boolean     // Vrai/Faux
- date        // Date (YYYY-MM-DD)
- datetime    // Date + heure (ISO 8601)
- url         // URL valide
- email       // Email valide
- slug        // Slug URL-friendly

❌ INVALIDES:
- color       // N'EXISTE PAS ! Utiliser 'string' avec validation regex
- phone       // N'EXISTE PAS ! Utiliser 'string'
- richtext    // N'EXISTE PAS ! Utiliser 'array' avec type 'block'
```

### Types Complexes Autorisés
```typescript
✅ VALIDES:
- array       // Liste d'éléments
- object      // Objet avec champs
- image       // Image Sanity
- file        // Fichier Sanity
- reference   // Référence à un autre document
- block       // Contenu riche (Portable Text)

❌ INVALIDES:
- document    // Seulement pour les schémas de niveau racine
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
      validation: (Rule) => Rule.required()
    }),
    // ... autres champs
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
validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
  name: 'hex',
  invert: false
})
```

---

## 3️⃣ ERREURS COURANTES ET CORRECTIONS

### Erreur: "Cannot read properties of null (reading 'length')"

**Cause:** Un tableau (`array`) est `null` ou `undefined` au lieu d'un tableau vide.

**❌ Code problématique:**
```typescript
{
  name: 'items',
  type: 'array',
  of: [{ type: 'string' }]
  // Pas d'initialValue !
}
```

**✅ Correction:**
```typescript
{
  name: 'items',
  type: 'array',
  of: [{ type: 'string' }],
  initialValue: []  // ✅ Toujours initialiser les arrays
}
```

### Erreur: "Unknown type: color"

**❌ Code problématique:**
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

### Erreur: "Icon must be a function"

**❌ Code problématique:**
```typescript
import { StarIcon } from '@heroicons/react/24/solid'
icon: StarIcon  // ❌ Import externe
```

**✅ Correction:**
```typescript
// Pas d'import !
icon: () => '⭐'  // ✅ Fonction retournant emoji
```

### Erreur: "options.list is not properly formatted"

**❌ Code problématique:**
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

---

## 4️⃣ VALIDATIONS REQUISES

### Champs Obligatoires

```typescript
// ✅ Toujours valider les champs critiques
{
  name: 'title',
  type: 'string',
  validation: (Rule) => Rule.required().min(3).max(100)
}

{
  name: 'slug',
  type: 'slug',
  validation: (Rule) => Rule.required(),
  options: {
    source: 'title',
    maxLength: 96
  }
}
```

### Champs avec Options (select, radio)

```typescript
// ✅ TOUJOURS fournir initialValue pour éviter null
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
  initialValue: 'grid',  // ✅ Valeur par défaut
  validation: (Rule) => Rule.required()
}
```

### Tableaux (Arrays)

```typescript
// ✅ TOUJOURS initialiser à []
{
  name: 'items',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'title', type: 'string' }
      ]
    }
  ],
  initialValue: [],  // ✅ CRITIQUE !
  validation: (Rule) => Rule.min(1).max(10)
}
```

---

## 5️⃣ FORMATS DE DONNÉES

### Blocs de Contenu Riche (Portable Text)

```typescript
// ✅ Format correct pour du contenu riche
{
  name: 'content',
  type: 'array',
  of: [
    {
      type: 'block',  // ✅ Type 'block' pour Portable Text
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' }
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lien',
            fields: [
              {
                name: 'href',
                type: 'url',
                validation: (Rule) => Rule.required()
              }
            ]
          }
        ]
      }
    }
  ],
  initialValue: []  // ✅ Toujours initialiser
}
```

### Données pour Création de Pages

```typescript
// ✅ Format correct pour créer une page via l'agent
const pageDoc = {
  _type: 'page',
  title: 'Ma Page',
  slug: { current: 'ma-page' },  // ✅ Objet avec 'current'
  seoTitle: 'Ma Page - Site',
  seoDescription: 'Description de ma page',
  pageBuilder: [  // ✅ Tableau de blocs
    {
      _type: 'heroBlock',
      _key: `hero-${Date.now()}`,  // ✅ _key unique requis
      title: 'Titre Hero',
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

### Clés Uniques (_key)

```typescript
// ✅ TOUJOURS générer des _key uniques pour les éléments de tableau
{
  _key: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// ✅ Ou utiliser une fonction helper
function generateKey(prefix = 'item') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
```

---

## 6️⃣ EXEMPLES COMPLETS

### Exemple 1: Bloc Hero Complet

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  icon: () => '🦸',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required().max(100)
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      validation: (Rule) => Rule.max(200)
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      options: {
        list: [
          { title: 'Centré', value: 'centered' },
          { title: 'Gauche', value: 'left' },
          { title: 'Droite', value: 'right' }
        ],
        layout: 'radio'
      },
      initialValue: 'centered',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'ctaButtons',
      title: 'Boutons CTA',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'href', type: 'string', validation: (Rule) => Rule.required() },
            {
              name: 'variant',
              type: 'string',
              options: {
                list: [
                  { title: 'Primaire', value: 'primary' },
                  { title: 'Secondaire', value: 'secondary' }
                ]
              },
              initialValue: 'primary'
            }
          ]
        }
      ],
      initialValue: []  // ✅ CRITIQUE
    }),
    defineField({
      name: 'backgroundSettings',
      title: 'Paramètres de fond',
      type: 'object',
      fields: [
        {
          name: 'backgroundType',
          type: 'string',
          options: {
            list: [
              { title: 'Couleur unie', value: 'solid' },
              { title: 'Dégradé', value: 'gradient' },
              { title: 'Image', value: 'image' }
            ]
          },
          initialValue: 'solid'
        },
        {
          name: 'backgroundColor',
          type: 'string',
          description: 'Code couleur hexadécimal (ex: #3b82f6)',
          validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Format hex invalide'),
          initialValue: '#3b82f6',
          hidden: ({ parent }) => parent?.backgroundType !== 'solid'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Hero sans titre',
        subtitle: subtitle || 'Hero Block'
      }
    }
  }
})
```

### Exemple 2: Création de Page avec Blocs

```javascript
// ✅ Code agent pour créer une page
async function createPage(client, pageName, config) {
  const slug = pageName.toLowerCase().replace(/\s+/g, '-')
  
  const pageDoc = {
    _type: 'page',
    title: pageName,
    slug: { current: slug },
    seoTitle: `${pageName} - ${config.siteName}`,
    seoDescription: `Page ${pageName}`,
    pageBuilder: [
      {
        _type: 'heroBlock',
        _key: `hero-${Date.now()}`,
        title: pageName,
        subtitle: `Bienvenue sur ${pageName}`,
        layout: 'centered',
        ctaButtons: [],  // ✅ Tableau vide, pas null
        backgroundSettings: {
          backgroundType: 'solid',
          backgroundColor: config.primaryColor || '#3b82f6'
        },
        styling: {
          textColor: '#ffffff',
          textAlignment: 'center',
          verticalAlignment: 'center',
          height: 'medium'
        }
      },
      {
        _type: 'textBlock',
        _key: `text-${Date.now()}`,
        content: [
          {
            _type: 'block',
            _key: `block-${Date.now()}`,
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: `Contenu de la page ${pageName}.`
              }
            ]
          }
        ]
      }
    ],
    publishedAt: new Date().toISOString()
  }
  
  return await client.create(pageDoc)
}
```

---

## 🚨 CHECKLIST DE VALIDATION AVANT CRÉATION

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
- [ ] ✅ Chaque élément de tableau a un `_key` unique
- [ ] ✅ Slug format : `{ current: 'slug-value' }`
- [ ] ✅ Preview défini avec fallbacks

### Pour les Composants React :

- [ ] ✅ Valeurs par défaut pour tous les props array : `items = []`
- [ ] ✅ Vérification null avant `.length` : `items && items.length > 0`
- [ ] ✅ Vérification null avant `.map()` : `items?.map(...)`
- [ ] ✅ Gestion des cas où les données sont undefined/null
- [ ] ✅ Fallbacks pour les champs optionnels

**Exemple de protection correcte :**
```typescript
// ❌ ERREUR - Crash si ctaButtons est null
{ctaButtons.length > 0 && ...}

// ✅ CORRECT - Valeur par défaut
function MyBlock({ ctaButtons = [] }) {
  return <>{ctaButtons.length > 0 && ...}</>
}

// ✅ CORRECT - Vérification null
{ctaButtons && ctaButtons.length > 0 && ...}

// ✅ CORRECT - Optional chaining
{ctaButtons?.map(item => ...)}
```

---

## 📚 RESSOURCES

- **Documentation Sanity:** https://www.sanity.io/docs
- **Types de schémas:** https://www.sanity.io/docs/schema-types
- **Portable Text:** https://www.sanity.io/docs/block-type
- **Validation:** https://www.sanity.io/docs/validation

---

---

## 🛡️ SYSTÈME DE PROTECTION AUTOMATIQUE

### Utilitaires de Normalisation (`/src/lib/sanity-data-normalizer.ts`)

**TOUJOURS utiliser ces fonctions pour garantir la sécurité:**

```typescript
import {
  ensureArray,      // Garantit qu'une valeur est un array
  ensureString,     // Garantit qu'une valeur est une string
  ensureNumber,     // Garantit qu'une valeur est un number
  ensureBoolean,    // Garantit qu'une valeur est un boolean
  ensureObject,     // Garantit qu'une valeur est un objet
  normalizeBlockData, // Normalise TOUTES les props d'un bloc
  hasItems,         // Vérifie si un array a des éléments (sûr)
  safeMap,          // Map un array de manière sûre
  safeFilter        // Filter un array de manière sûre
} from '@/lib/sanity-data-normalizer'
```

### HOC et Hooks de Protection (`/src/components/blocks/withSafeProps.tsx`)

**TOUJOURS utiliser ces hooks dans les composants:**

```typescript
import {
  withSafeProps,    // HOC pour envelopper un composant
  useSafeProps,     // Hook pour normaliser les props
  useSafeArray,     // Hook pour garantir un array
  useSafeObject,    // Hook pour garantir un objet
  useHasItems       // Hook pour vérifier si array a des items
} from '../withSafeProps'
```

### Template de Composant Sécurisé

**TOUJOURS utiliser `SAFE_BLOCK_TEMPLATE.tsx` comme base pour les nouveaux blocs**

Structure obligatoire:
```typescript
export default function MyBlock(props: MyBlockProps) {
  // ✅ ÉTAPE 1: Normaliser TOUTES les props
  const safeProps = useSafeProps(props)
  
  // ✅ ÉTAPE 2: Extraire avec valeurs par défaut
  const { title, subtitle } = safeProps
  
  // ✅ ÉTAPE 3: Normaliser les arrays
  const items = useSafeArray(props.items)
  
  // ✅ ÉTAPE 4: Normaliser les objets
  const settings = useSafeObject(props.settings, { layout: 'grid' })
  
  // Maintenant vous pouvez utiliser items.length, items.map() en toute sécurité
  return (...)
}
```

### Règles de Protection OBLIGATOIRES

**POUR LES COMPOSANTS REACT:**

1. ✅ **TOUJOURS** utiliser `useSafeProps(props)` en premier
2. ✅ **TOUJOURS** utiliser `useSafeArray()` pour les arrays
3. ✅ **TOUJOURS** utiliser `useSafeObject()` pour les objets
4. ✅ **TOUJOURS** fournir des valeurs par défaut
5. ✅ **TOUJOURS** vérifier `hasItems` ou `items.length > 0` avant de mapper
6. ✅ **TOUJOURS** utiliser optional chaining `?.` pour les objets imbriqués

**POUR LES AGENTS GÉNÉRATEURS:**

1. ✅ **TOUJOURS** initialiser les arrays avec `initialValue: []` dans les schémas
2. ✅ **TOUJOURS** initialiser les arrays avec `[]` dans les données créées
3. ✅ **TOUJOURS** générer des `_key` uniques pour les éléments de tableau
4. ✅ **TOUJOURS** utiliser le template `SAFE_BLOCK_TEMPLATE.tsx` pour les nouveaux blocs
5. ✅ **TOUJOURS** inclure les imports de sécurité dans les composants générés

---

**🎯 Ce document est la SEULE source de vérité pour les agents.**  
**Toute génération de code Sanity DOIT suivre ces règles.**

**🛡️ GARANTIE ZÉRO ERREUR:**
En suivant ces règles, il est IMPOSSIBLE d'avoir une erreur "Cannot read properties of null/undefined".
