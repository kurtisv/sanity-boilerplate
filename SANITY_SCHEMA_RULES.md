# 📋 RÈGLES STRICTES POUR LES SCHÉMAS SANITY

## ⚠️ CRITIQUES - À RESPECTER ABSOLUMENT

### 1. TYPES DE CHAMPS VALIDES

**Types de base uniquement:**
- ✅ `string` - Texte court
- ✅ `text` - Texte long (textarea)
- ✅ `number` - Nombres
- ✅ `boolean` - Vrai/Faux
- ✅ `date` - Date seulement
- ✅ `datetime` - Date et heure
- ✅ `url` - URLs
- ✅ `email` - Emails
- ✅ `slug` - Slugs pour URLs
- ✅ `array` - Tableaux
- ✅ `object` - Objets
- ✅ `image` - Images
- ✅ `file` - Fichiers
- ✅ `reference` - Références à d'autres documents
- ✅ `document` - Type de document
- ✅ `block` - Contenu riche (Portable Text)

**❌ TYPES INTERDITS:**
- ❌ `color` - N'existe PAS dans Sanity (utiliser `string` à la place)
- ❌ `select` - Utiliser `string` avec `options.list`
- ❌ `textarea` - Utiliser `text`
- ❌ `dropdown` - Utiliser `string` avec `options.list`
- ❌ Tout type personnalisé non défini

### 2. EXPORTS DE MODULES

**✅ TOUJOURS utiliser export default:**
```typescript
export default defineType({
  name: 'monBlock',
  // ...
})
```

**❌ JAMAIS utiliser export nommé:**
```typescript
// ❌ INTERDIT
export const monBlockSchema = defineType({...})
export const monBlock = defineType({...})
```

### 3. CHAMPS ARRAY - CLÉS _key

**✅ Les _key sont GÉNÉRÉES AUTOMATIQUEMENT par Sanity**

Pour les éléments d'array dans les **valeurs par défaut** ou **données à créer**:
```typescript
// ✅ BON - Dans les données d'API
members: [
  {
    _key: 'member-001', // Générer avec une fonction
    name: 'John',
  }
]
```

**❌ JAMAIS définir _key comme champ dans le schéma:**
```typescript
// ❌ INTERDIT
defineField({
  name: '_key',  // ❌ Réservé par Sanity
  type: 'string'
})
```

### 4. VALIDATION DES CHAMPS

**Règles de validation valides:**
- `Rule.required()` - Champ obligatoire
- `Rule.max(n)` - Longueur/valeur maximale
- `Rule.min(n)` - Longueur/valeur minimale
- `Rule.email()` - Validation email (sur type 'string')
- `Rule.uri()` - Validation URL
- `Rule.unique()` - Valeur unique
- `Rule.custom((value) => {})` - Validation personnalisée

**Limites de longueur courantes:**
```typescript
title: Rule.required().max(100)        // Titres
subtitle: Rule.max(200)                // Sous-titres  
description: Rule.max(300)             // Descriptions
text: Rule.max(500)                    // Textes moyens
bio: Rule.max(1000)                    // Biographies
label: Rule.max(50)                    // Labels courts
placeholder: Rule.max(100)             // Placeholders
iconEmoji: Rule.max(10)                // Emojis
```

### 5. ICÔNES DANS LES SCHÉMAS

**✅ TOUJOURS utiliser des fonctions pour les icônes:**
```typescript
export default defineType({
  name: 'monBlock',
  icon: () => '🎨',  // ✅ Fonction retournant emoji
  // ...
})
```

**❌ JAMAIS importer depuis @heroicons ou autres:**
```typescript
// ❌ INTERDIT
import { MapIcon } from '@sanity/icons'
import { StarIcon } from '@heroicons/react/24/solid'

export default defineType({
  icon: MapIcon  // ❌ Package peut manquer
})
```

### 6. STRUCTURE DES BLOCS (type: 'object')

Pour un bloc utilisé dans le page builder:

```typescript
export default defineType({
  name: 'monBlock',
  title: 'Mon Block',
  type: 'object',  // ✅ 'object' pour les blocs dans pageBuilder
  fields: [
    // Vos champs
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'Mon Block',
        subtitle: 'Description du bloc'
      }
    }
  }
})
```

**Type 'document' vs 'object':**
- `type: 'object'` - Pour blocs dans pageBuilder
- `type: 'document'` - Pour documents indépendants (pages, posts, etc.)

### 7. OPTIONS POUR LISTES DÉROULANTES

**✅ CORRECT:**
```typescript
defineField({
  name: 'theme',
  type: 'string',
  options: {
    list: [
      { title: 'Sombre', value: 'dark' },
      { title: 'Clair', value: 'light' }
    ],
    layout: 'radio' // ou 'dropdown' (optionnel)
  },
  initialValue: 'dark'
})
```

**❌ INTERDIT:**
```typescript
defineField({
  name: 'theme',
  type: 'select',  // ❌ Type n'existe pas
  options: ['dark', 'light']  // ❌ Format invalide
})
```

### 8. CHAMPS CONDITIONNELS (hidden)

```typescript
defineField({
  name: 'buttonText',
  type: 'string',
  hidden: ({ parent }) => !parent?.showButton  // ✅ Fonction
})
```

### 9. INITIALVALUE vs DEFAULTVALUE

**✅ Utiliser `initialValue`:**
```typescript
defineField({
  name: 'layout',
  type: 'string',
  initialValue: 'grid'  // ✅ Correct
})
```

**❌ PAS `defaultValue`:**
```typescript
defaultValue: 'grid'  // ❌ N'existe pas dans Sanity
```

### 10. CHAMPS D'IMAGE

```typescript
defineField({
  name: 'image',
  type: 'image',
  options: {
    hotspot: true  // Permet le recadrage
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      validation: Rule => Rule.required()
    })
  ]
})
```

---

## 📊 TYPES DE BLOCS COURANTS

### ContactBlock - FormFields

**FieldTypes VALIDES pour contactBlock:**
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

### HeroBlock - CTA Buttons

```typescript
ctaButtons: [
  {
    _key: 'cta-001',
    text: 'Action',        // max 50
    href: '/link',         // Obligatoire
    variant: 'primary',    // primary|secondary|ghost
    size: 'md'             // sm|md|lg
  }
]
```

---

## 🚫 ERREURS COMMUNES À ÉVITER

### 1. Type 'color' n'existe pas
```typescript
// ❌ MAUVAIS
type: 'color'

// ✅ BON
type: 'string',
description: 'Hex color code (e.g., #FF5733)'
```

### 2. Export nommé au lieu de default
```typescript
// ❌ MAUVAIS
export const myBlockSchema = defineType({...})

// ✅ BON
export default defineType({...})
```

### 3. Imports de packages non installés
```typescript
// ❌ MAUVAIS
import { MapIcon } from '@sanity/icons'
import { StarIcon } from '@heroicons/react/24/solid'

// ✅ BON
icon: () => '🗺️'
```

### 4. Champ _key défini dans le schéma
```typescript
// ❌ MAUVAIS
defineField({
  name: '_key',
  type: 'string'
})

// ✅ BON
// Ne PAS définir _key - Sanity le génère automatiquement
```

### 5. FieldTypes invalides dans ContactBlock
```typescript
// ❌ MAUVAIS
fieldType: 'text'    // N'existe pas
fieldType: 'tel'     // N'existe pas
fieldType: 'select'  // N'existe pas

// ✅ BON
fieldType: 'name'
fieldType: 'phone'
fieldType: 'subject'
```

### 6. stats.number en Number au lieu de String
```typescript
// ❌ MAUVAIS
number: 95

// ✅ BON
number: '95'  // STRING obligatoire
```

### 7. Descriptions trop longues
```typescript
// ❌ MAUVAIS - Dépasse 100 chars dans features
description: 'Une très longue description qui fait plus de 100 caractères...'

// ✅ BON - Max 100 chars
description: 'Description concise et précise'
```

---

## ✅ CHECKLIST AVANT GÉNÉRATION

Avant de générer un bloc, vérifier:

- [ ] ✅ `export default defineType({` (pas export const)
- [ ] ✅ Tous les types de champs sont valides (pas de 'color', 'select', etc.)
- [ ] ✅ Icône utilise `icon: () => '🎨'` (pas d'import)
- [ ] ✅ Validation avec `Rule.max()` pour tous les strings
- [ ] ✅ `initialValue` (pas defaultValue)
- [ ] ✅ Pas de champ `_key` défini (généré auto)
- [ ] ✅ ContactBlock: fieldTypes valides uniquement
- [ ] ✅ StatsBlock: `number` en STRING
- [ ] ✅ FeatureGrid: `iconType` et `iconEmoji` présents
- [ ] ✅ TeamBlock: `displayType`, `layout`, `position` (pas role)
- [ ] ✅ Longueurs max respectées (100, 200, 300, etc.)

---

## 📚 RÉFÉRENCES

### Types Sanity Officiels
```typescript
'string' | 'text' | 'number' | 'boolean' | 'date' | 'datetime' | 
'url' | 'email' | 'slug' | 'array' | 'object' | 'image' | 'file' | 
'reference' | 'document' | 'block'
```

### Options Communes
```typescript
options: {
  list: Array<{title: string, value: string}>,
  layout: 'radio' | 'dropdown',
  hotspot: boolean,  // Pour images
  accept: string     // Pour files
}
```

### Validation Chain
```typescript
validation: Rule => Rule
  .required()
  .max(100)
  .min(1)
  .email()
  .uri()
  .unique()
  .custom((value, context) => {
    // Validation personnalisée
    return true // ou message d'erreur
  })
```

---

**📌 CE DOCUMENT DOIT ÊTRE CONSULTÉ PAR LES AGENTS AVANT TOUTE GÉNÉRATION DE SCHÉMA!**
