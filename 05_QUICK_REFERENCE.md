# ⚡ RÉFÉRENCE RAPIDE - AIDE-MÉMOIRE

**Accès rapide aux informations essentielles**

---

## 🎯 TYPES SANITY VALIDES

```typescript
// ✅ VALIDES
'string' | 'text' | 'number' | 'boolean' | 'date' | 'datetime' |
'url' | 'email' | 'slug' | 'array' | 'object' | 'image' | 'file' |
'reference' | 'block'

// ❌ INTERDITS
'color' | 'phone' | 'select' | 'dropdown' | 'textarea' | 'richtext'
```

---

## 📏 LONGUEURS MAXIMALES

```typescript
title: 100
subtitle: 200
label: 50
placeholder: 100
description: 100-300  // Selon le contexte
text: 500
bio: 1000
content: 5000
iconEmoji: 10
```

---

## 🔧 STRUCTURE BLOC MINIMAL

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'monBlock',
  title: 'Mon Block',
  type: 'object',
  icon: () => '🎨',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100)
    })
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Sans titre',
        subtitle: 'Mon Block'
      }
    }
  }
})
```

---

## 🛡️ PROTECTION ARRAYS

```typescript
// ❌ DANGEREUX
array.length
array.map()
[...array, x]

// ✅ SÉCURISÉ
(array || []).length
array?.length || 0
(array || []).map()
[...(array || []), x]
```

---

## 🎨 COULEURS HEX

```typescript
{
  name: 'color',
  type: 'string',
  validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/),
  initialValue: '#ffffff'
}
```

---

## 📋 LISTES DÉROULANTES

```typescript
{
  name: 'layout',
  type: 'string',
  options: {
    list: [
      { title: 'Grille', value: 'grid' },
      { title: 'Liste', value: 'list' }
    ],
    layout: 'radio'
  },
  initialValue: 'grid'
}
```

---

## 🔑 CLÉS UNIQUES

```typescript
function generateKey(prefix = 'item') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Utilisation
{
  _key: generateKey('feature'),
  title: 'Feature'
}
```

---

## 📞 CONTACTBLOCK FIELDTYPES

```typescript
'name' | 'email' | 'phone' | 'company' | 'subject' | 
'message' | 'textarea' | 'url' | 'custom'
```

---

## 📊 STATSBLOCK

```typescript
stats: [{
  _key: 'stat-001',
  number: '95',  // ⚠️ STRING pas number!
  label: 'Label',
  description: 'Description',
  icon: '⚡'
}]
```

---

## ⭐ FEATUREGRIDBLOCK

```typescript
features: [{
  _key: 'feature-001',
  iconType: 'emoji',  // ⚠️ Obligatoire
  iconEmoji: '🎨',
  title: 'Title',
  description: 'Desc'  // max 100!
}]
```

---

## 👥 TEAMBLOCK

```typescript
{
  displayType: 'team',  // ⚠️ Obligatoire
  layout: 'grid',
  gridColumns: 3,
  members: [{
    _key: 'member-001',
    name: 'Name',
    position: 'Position',  // ⚠️ 'position' pas 'role'
    bio: 'Bio'
  }]
}
```

---

## 🦸 HEROBLOCK

```typescript
{
  _type: 'heroBlock',
  _key: generateKey('hero'),
  title: 'Title',
  subtitle: 'Subtitle',
  layout: 'centered',
  ctaButtons: [],  // ⚠️ Initialiser à []
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

---

## 📋 BLOCS DISPONIBLES (24)

```typescript
// ✅ BLOCS AVEC SCHÉMAS SANITY
textBlock, heroBlock, headerBlock, footerBlock,
featureGridBlock, contactBlock, galleryBlock, teamBlock,
statsBlock, blogBlock, pricingBlock, testimonialsBlock,
ctaBlock, faqBlock, logoCloudBlock, videoBlock,
accordionBlock, tabsBlock, newsletterBlock, logoGridBlock,
countdownBlock, mapBlock, comparisonTableBlock, socialProofBlock

// ❌ BLOCS NON DISPONIBLES (pas de schéma)
bookingBlock, serviceListBlock, pricingTableBlock
```

---

## 🔒 HOOKS DE SÉCURITÉ

```typescript
import { useSafeProps, useSafeArray, useSafeObject, useHasItems } from '@/components/blocks/withSafeProps'

export default function MyBlock(props: MyBlockProps) {
  const safeProps = useSafeProps(props)
  const items = useSafeArray(props.items)
  const settings = useSafeObject(props.settings, { layout: 'grid' })
  const hasItems = useHasItems(items)
  
  return (...)
}

// Alternative: HOC
import withSafeProps from '@/components/blocks/withSafeProps'
export default withSafeProps(MyBlock)
```

---

## 🎯 SETSTATE SÉCURISÉ

```typescript
// ❌ DANGEREUX
setConfig((prev: any) => ({
  ...prev,
  pages: prev.pages.map(...)
}))

// ✅ SÉCURISÉ
setConfig((prev: any) => {
  const pages = prev.pages || []
  return {
    ...prev,
    pages: pages.map(...)
  }
})
```

---

## 📦 JSX SÉCURISÉ

```typescript
// ❌ DANGEREUX
{items.map(item => <Item />)}
{data.length > 0 && <Message />}

// ✅ SÉCURISÉ
{(items || []).map(item => <Item key={item._key} />)}
{(data?.length || 0) > 0 && <Message />}
```

---

## ✅ CHECKLIST SCHÉMA

- [ ] Export default
- [ ] Type 'object'
- [ ] Icon = () => '🎨'
- [ ] Types valides
- [ ] Arrays: initialValue: []
- [ ] Options: initialValue
- [ ] Pas de _key défini
- [ ] Validations
- [ ] Preview

---

## ✅ CHECKLIST COMPOSANT

- [ ] useSafeProps(props)
- [ ] useSafeArray() pour arrays
- [ ] useSafeObject() pour objets
- [ ] (array || []).map()
- [ ] key={item._key}
- [ ] Fallbacks partout

---

## ✅ CHECKLIST DONNÉES

- [ ] Arrays: []
- [ ] Objets: {}
- [ ] _key uniques
- [ ] slug: { current: 'x' }
- [ ] FieldTypes valides
- [ ] stats.number STRING
- [ ] position pas role

---

## 🚨 ERREURS FRÉQUENTES

```typescript
// ❌ NE JAMAIS FAIRE
type: 'color'
export const myBlock = ...
import { Icon } from '@heroicons'
icon: Icon
items.length  // sans protection
ctaButtons: null
stats: [{ number: 95 }]  // number
members: [{ role: 'Dev' }]  // role
fieldType: 'text'  // contactBlock
```

---

## 🔗 DOCUMENTS COMPLETS

1. **01_AGENT_GUIDE_COMPLET.md** - Guide principal
2. **02_ERREURS_ET_CORRECTIONS.md** - Catalogue erreurs
3. **03_SANITY_SCHEMAS_GUIDE.md** - Schémas détaillés
4. **04_PROTECTION_SYSTEME.md** - Protection null
5. **05_QUICK_REFERENCE.md** - Ce document

---

## 📞 EN CAS DE DOUTE

1. Consulter **02_ERREURS_ET_CORRECTIONS.md**
2. Vérifier **01_AGENT_GUIDE_COMPLET.md**
3. Appliquer **04_PROTECTION_SYSTEME.md**

---

**⚡ RÉFÉRENCE RAPIDE - TOUJOURS À PORTÉE DE MAIN**

**Date de création:** 7 novembre 2025  
**Version:** 1.0  
**Statut:** ✅ Aide-mémoire officiel
