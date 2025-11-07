# 📐 GUIDE COMPLET DES SCHÉMAS SANITY

**Référence complète pour créer des schémas Sanity sans erreur**

---

## 📋 TABLE DES MATIÈRES

1. [Types de Champs Complets](#1-types-de-champs-complets)
2. [Structure d'un Bloc](#2-structure-dun-bloc)
3. [Validation et Règles](#3-validation-et-règles)
4. [Champs Spéciaux](#4-champs-spéciaux)
5. [Blocs Standards - Templates](#5-blocs-standards---templates)
6. [Exemples Complets](#6-exemples-complets)

---

## 1️⃣ TYPES DE CHAMPS COMPLETS

### Types Primitifs

| Type | Usage | Exemple | Notes |
|------|-------|---------|-------|
| `string` | Texte court | Titre, nom, label | Max 200 chars recommandé |
| `text` | Texte long | Description, bio | Textarea multi-lignes |
| `number` | Nombre | Prix, quantité, âge | Entier ou décimal |
| `boolean` | Vrai/Faux | Actif, publié, featured | Checkbox |
| `date` | Date | Date de naissance | Format YYYY-MM-DD |
| `datetime` | Date + heure | Publication | ISO 8601 |
| `url` | URL | Lien externe | Validation auto |
| `email` | Email | Contact | Validation auto |
| `slug` | Slug URL | URL-friendly | Auto-généré depuis un champ |

### Types Complexes

| Type | Usage | Exemple | Notes |
|------|-------|---------|-------|
| `array` | Liste | Items, membres, features | Requiert `of` |
| `object` | Objet | Settings, config | Champs imbriqués |
| `image` | Image | Photo, logo, background | Sanity CDN |
| `file` | Fichier | PDF, document | Upload |
| `reference` | Référence | Lien vers doc | Autre document |
| `block` | Contenu riche | Article, description | Portable Text |

### ❌ Types INTERDITS

```typescript
// Ces types N'EXISTENT PAS dans Sanity
'color'       // Utiliser 'string' + regex
'phone'       // Utiliser 'string'
'select'      // Utiliser 'string' + options.list
'dropdown'    // Utiliser 'string' + options.list
'textarea'    // Utiliser 'text'
'richtext'    // Utiliser 'array' + type 'block'
```

---

## 2️⃣ STRUCTURE D'UN BLOC

### Template de Base

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'monBlock',           // ✅ camelCase, finit par 'Block'
  title: 'Mon Block',         // ✅ Titre affiché dans Studio
  type: 'object',             // ✅ TOUJOURS 'object' pour un bloc
  icon: () => '🎨',           // ✅ Fonction retournant emoji
  
  fields: [
    // Champs ici
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Sans titre',
        subtitle: subtitle || 'Mon Block'
      }
    }
  }
})
```

### Champs Communs

```typescript
fields: [
  // Titre
  defineField({
    name: 'title',
    title: 'Titre',
    type: 'string',
    validation: (Rule) => Rule.required().max(100)
  }),
  
  // Sous-titre
  defineField({
    name: 'subtitle',
    title: 'Sous-titre',
    type: 'text',
    validation: (Rule) => Rule.max(200)
  }),
  
  // Layout
  defineField({
    name: 'layout',
    title: 'Disposition',
    type: 'string',
    options: {
      list: [
        { title: 'Grille', value: 'grid' },
        { title: 'Liste', value: 'list' }
      ],
      layout: 'radio'
    },
    initialValue: 'grid',
    validation: (Rule) => Rule.required()
  }),
  
  // Array
  defineField({
    name: 'items',
    title: 'Éléments',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          { name: 'title', type: 'string', validation: (Rule) => Rule.required() },
          { name: 'description', type: 'text' }
        ]
      }
    ],
    initialValue: [],  // ✅ CRITIQUE
    validation: (Rule) => Rule.min(1).max(10)
  })
]
```

---

## 3️⃣ VALIDATION ET RÈGLES

### Règles de Validation Disponibles

```typescript
// Obligatoire
validation: (Rule) => Rule.required()

// Longueur
validation: (Rule) => Rule.min(3).max(100)

// Email
validation: (Rule) => Rule.email()

// URL
validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] })

// Regex
validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
  name: 'hex',
  invert: false
}).error('Format hex invalide')

// Unique
validation: (Rule) => Rule.unique()

// Custom
validation: (Rule) => Rule.custom((value, context) => {
  if (!value) return true
  if (value.length < 10) return 'Trop court'
  return true
})

// Chaînage
validation: (Rule) => Rule.required().min(3).max(100).email()
```

### Longueurs Standard par Type de Champ

```typescript
// Titres et labels
title: Rule.required().max(100)
subtitle: Rule.max(200)
label: Rule.max(50)
placeholder: Rule.max(100)

// Descriptions
description: Rule.max(100)   // Features, cards
description: Rule.max(200)   // Stats, items
description: Rule.max(300)   // Hero, sections

// Textes
text: Rule.max(500)          // Textes moyens
bio: Rule.max(1000)          // Biographies
content: Rule.max(5000)      // Contenu long

// Autres
iconEmoji: Rule.max(10)      // Emojis
name: Rule.required().max(100)
email: Rule.email()
url: Rule.uri()
```

---

## 4️⃣ CHAMPS SPÉCIAUX

### Couleurs (Hex)

```typescript
defineField({
  name: 'backgroundColor',
  title: 'Couleur de fond',
  type: 'string',
  description: 'Code couleur hexadécimal (ex: #3b82f6)',
  validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
    name: 'hex',
    invert: false
  }).error('Format invalide. Utilisez un code hex (ex: #3b82f6)'),
  initialValue: '#ffffff'
})
```

### Listes Déroulantes

```typescript
defineField({
  name: 'theme',
  title: 'Thème',
  type: 'string',
  options: {
    list: [
      { title: 'Sombre', value: 'dark' },
      { title: 'Clair', value: 'light' },
      { title: 'Auto', value: 'auto' }
    ],
    layout: 'radio'  // ou 'dropdown'
  },
  initialValue: 'light',
  validation: (Rule) => Rule.required()
})
```

### Images

```typescript
defineField({
  name: 'image',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true  // Permet le recadrage
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      validation: (Rule) => Rule.required()
    })
  ]
})
```

### Slug

```typescript
defineField({
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: {
    source: 'title',  // Généré depuis le titre
    maxLength: 96
  },
  validation: (Rule) => Rule.required()
})
```

### Contenu Riche (Portable Text)

```typescript
defineField({
  name: 'content',
  title: 'Contenu',
  type: 'array',
  of: [
    {
      type: 'block',
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
  initialValue: []
})
```

### Champs Conditionnels

```typescript
defineField({
  name: 'buttonText',
  title: 'Texte du bouton',
  type: 'string',
  hidden: ({ parent }) => !parent?.showButton,  // Caché si showButton = false
  validation: (Rule) => Rule.custom((value, context) => {
    const parent = context.parent as any
    if (parent?.showButton && !value) {
      return 'Requis si le bouton est affiché'
    }
    return true
  })
})
```

---

## 5️⃣ BLOCS STANDARDS - TEMPLATES

### Hero Block

```typescript
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
      validation: (Rule) => Rule.max(300)
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
      initialValue: 'centered'
    }),
    defineField({
      name: 'ctaButtons',
      title: 'Boutons CTA',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', type: 'string', validation: (Rule) => Rule.required().max(50) },
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

### Feature Grid Block

```typescript
export default defineType({
  name: 'featureGridBlock',
  title: 'Feature Grid',
  type: 'object',
  icon: () => '⭐',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.max(100)
    }),
    defineField({
      name: 'features',
      title: 'Fonctionnalités',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'iconType',
              title: 'Type d\'icône',
              type: 'string',
              options: {
                list: [
                  { title: 'Emoji', value: 'emoji' },
                  { title: 'Lucide', value: 'lucide' }
                ]
              },
              initialValue: 'emoji',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'iconEmoji',
              title: 'Emoji',
              type: 'string',
              validation: (Rule) => Rule.max(10),
              hidden: ({ parent }) => parent?.iconType !== 'emoji'
            },
            {
              name: 'title',
              title: 'Titre',
              type: 'string',
              validation: (Rule) => Rule.required().max(100)
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.max(100)  // ⚠️ 100 pas 200!
            }
          ]
        }
      ],
      initialValue: [],
      validation: (Rule) => Rule.min(1).max(12)
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      options: {
        list: [
          { title: '2 colonnes', value: 'grid-2' },
          { title: '3 colonnes', value: 'grid-3' },
          { title: '4 colonnes', value: 'grid-4' }
        ]
      },
      initialValue: 'grid-3'
    })
  ]
})
```

### Contact Block

```typescript
export default defineType({
  name: 'contactBlock',
  title: 'Contact Block',
  type: 'object',
  icon: () => '📞',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required().max(100)
    }),
    defineField({
      name: 'formFields',
      title: 'Champs du formulaire',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'fieldType',
              title: 'Type de champ',
              type: 'string',
              options: {
                list: [
                  { title: 'Nom', value: 'name' },
                  { title: 'Email', value: 'email' },
                  { title: 'Téléphone', value: 'phone' },
                  { title: 'Entreprise', value: 'company' },
                  { title: 'Sujet', value: 'subject' },
                  { title: 'Message', value: 'message' },
                  { title: 'Zone de texte', value: 'textarea' },
                  { title: 'URL', value: 'url' },
                  { title: 'Personnalisé', value: 'custom' }
                ]
              },
              validation: (Rule) => Rule.required()
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required().max(50)
            },
            {
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
              validation: (Rule) => Rule.max(100)
            },
            {
              name: 'required',
              title: 'Obligatoire',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'width',
              title: 'Largeur',
              type: 'string',
              options: {
                list: [
                  { title: 'Moitié', value: 'half' },
                  { title: 'Pleine', value: 'full' }
                ]
              },
              initialValue: 'full'
            }
          ]
        }
      ],
      initialValue: []
    })
  ]
})
```

---

## 6️⃣ EXEMPLES COMPLETS

### Stats Block

```typescript
export default defineType({
  name: 'statsBlock',
  title: 'Stats Block',
  type: 'object',
  icon: () => '📊',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.max(100)
    }),
    defineField({
      name: 'stats',
      title: 'Statistiques',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Nombre',
              type: 'string',  // ⚠️ STRING pas number!
              validation: (Rule) => Rule.required().max(20)
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required().max(100)
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.max(200)
            },
            {
              name: 'icon',
              title: 'Icône',
              type: 'string',
              validation: (Rule) => Rule.max(10)
            }
          ]
        }
      ],
      initialValue: [],
      validation: (Rule) => Rule.min(1).max(6)
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      options: {
        list: [
          { title: '2 colonnes', value: 'grid-2col' },
          { title: '3 colonnes', value: 'grid-3col' },
          { title: '4 colonnes', value: 'grid-4col' }
        ]
      },
      initialValue: 'grid-4col'
    })
  ]
})
```

### Team Block

```typescript
export default defineType({
  name: 'teamBlock',
  title: 'Team Block',
  type: 'object',
  icon: () => '👥',
  fields: [
    defineField({
      name: 'displayType',
      title: 'Type d\'affichage',
      type: 'string',
      options: {
        list: [
          { title: 'Équipe', value: 'team' }
        ]
      },
      initialValue: 'team',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      options: {
        list: [
          { title: 'Grille', value: 'grid' },
          { title: 'Liste', value: 'list' }
        ]
      },
      initialValue: 'grid',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'gridColumns',
      title: 'Nombre de colonnes',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(4),
      initialValue: 3,
      hidden: ({ parent }) => parent?.layout !== 'grid'
    }),
    defineField({
      name: 'members',
      title: 'Membres',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nom',
              type: 'string',
              validation: (Rule) => Rule.required().max(100)
            },
            {
              name: 'position',  // ⚠️ 'position' pas 'role'
              title: 'Poste',
              type: 'string',
              validation: (Rule) => Rule.required().max(100)
            },
            {
              name: 'bio',
              title: 'Biographie',
              type: 'text',
              validation: (Rule) => Rule.max(500)
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
              validation: (Rule) => Rule.email()
            },
            {
              name: 'phone',
              title: 'Téléphone',
              type: 'string'
            }
          ]
        }
      ],
      initialValue: []
    })
  ]
})
```

---

## ✅ CHECKLIST FINALE

### Avant de Publier un Schéma:

- [ ] Export default (pas nommé)
- [ ] Type 'object' pour les blocs
- [ ] Icon = fonction emoji
- [ ] Tous les types de champs sont valides
- [ ] Tous les arrays ont initialValue: []
- [ ] Tous les champs avec options ont initialValue
- [ ] Pas de champ _key défini
- [ ] Validations sur champs requis
- [ ] Longueurs max respectées
- [ ] Preview défini avec fallbacks
- [ ] FieldTypes valides pour contactBlock
- [ ] stats.number en STRING
- [ ] teamBlock avec position (pas role)
- [ ] features avec iconType + iconEmoji

---

**📐 RÉFÉRENCE OFFICIELLE POUR TOUS LES SCHÉMAS SANITY**

**Date de création:** 7 novembre 2025  
**Version:** 1.0 - Guide complet  
**Statut:** ✅ Document de référence
