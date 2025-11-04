# 📘 Manuel d'Auto-Implémentation Studio
> **Documentation technique interne pour l'IA Claude - Version 2024**

## 📋 Table des Matières

- [🎯 Introduction](#-introduction)
- [📖 Stack Technique](#-stack-technique)
- [🚨 Règles de Conformité Sanity](#-règles-de-conformité-sanity)
- [⚠️ Imports Critiques](#️-imports-critiques)
- [⚙️ Procédure d'Auto-Implémentation](#️-procédure-dauto-implémentation)
- [🎨 Système de Thème Unifié](#-système-de-thème-unifié)
- [🔧 Troubleshooting](#-troubleshooting)
- [✅ Checklists](#-checklists)
- [🧠 Prompt Prêt à Copier](#-prompt-prêt-à-copier)
- [📝 Changelog](#-changelog)

---

## 🎯 Introduction

### Finalité du Système Studio
Le **Sanity Next.js Professional Boilerplate** utilise un système de **7 blocs modulaires** où :
- **Sanity Studio** = Interface d'administration pour créer/éditer du contenu
- **Next.js 16 Frontend** = Rendu dynamique des pages basé sur les données Sanity
- **Système de 7 Blocs** = Architecture modulaire pour construire des pages professionnelles
- **Styled Components** = Système de styling CSS-in-JS avec design tokens

### Rôle de ce Manuel
Ce manuel permet à l'IA Claude de :
1. **Analyser** la structure existante du projet (7 blocs + système de thème)
2. **Comprendre** les conventions et patterns (Styled Components + TypeScript)
3. **Auto-implémenter** de nouvelles pages conformes au système
4. **Maintenir** la cohérence architecturale et le système de design

---

## 📖 Stack Technique

### Technologies Confirmées (Version 2024)
- **Next.js 16.0.1** (App Router + Turbopack)
- **React 19.2.0** (Server Components)
- **TypeScript 5** (strict mode)
- **styled-components 6.1.19** (CSS-in-JS exclusif)
- **Sanity CMS 4.12.0** (headless CMS)

### 7 Blocs Disponibles
```typescript
// Source unique des types : /src/types/blocks.ts
export type Block = 
  | TextBlockData      // 📝 Contenu riche avec éditeur visuel
  | HeroBlockData      // 🦸 Sections héro avec boutons CTA
  | FeatureGridBlockData // ⭐ Grilles de fonctionnalités
  | ContactBlockData   // 📞 Formulaires de contact
  | GalleryBlockData   // 🖼️ Galeries d'images
  | TeamBlockData      // 👥 Équipes et témoignages
  | StatsBlockData     // 📊 Statistiques et compteurs
```

---

## 🔐 **Règles de Validation Sanity**

> **⚠️ SECTION CRITIQUE - ABSOLUMENT OBLIGATOIRE**

### 📏 **Longueurs de Texte Maximales**

**Page**: seoDescription ≤ 160 chars
**Hero**: title ≤ 100, subtitle ≤ 300, max 3 ctaButtons
**Features**: title ≤ 100, description ≤ 100
**Stats**: number STRING ≤ 20, label ≤ 100, description ≤ 200
**Contact**: title ≤ 100, subtitle ≤ 100, label ≤ 50, placeholder ≤ 100
**Team**: bio ≤ 500

### 🔑 **Types de Champs ContactBlock**

**✅ VALIDES**: name, email, phone, company, subject, message, textarea, url, custom
**❌ INVALIDES**: text (→ name), tel (→ phone), select (→ subject/custom)

### 🔑 **Champs _key Obligatoires**

TOUS les éléments d'array DOIVENT avoir un `_key` unique :
- features: `_key: generateFeatureKey('perf')`
- stats: `_key: 'stat-1'`
- members: `_key: 'member-1'`
- formFields: `_key: generateFieldKey('name')`
- ctaButtons: `_key: generateCtaKey('action')`

### ⚠️ **GalleryBlock - NE PAS AUTO-GÉNÉRER**

Le GalleryBlock nécessite l'upload d'images réelles. Ne PAS utiliser en auto-génération.

### 📋 **Structure des Blocs**

**TeamBlock**: `displayType: 'team'`, `layout: 'grid'`, `members` (PAS teamMembers), `position` (PAS role)
**StatsBlock**: `number` en STRING (pas Number)
**FeatureGridBlock**: `iconType + iconEmoji` obligatoires si emoji
**ContactBlock**: `formFields` (PAS fields), fieldType valides uniquement

---

## 🚨 Règles de Conformité Sanity

> **⚠️ RÈGLE ABSOLUE - CONFORMITÉ OBLIGATOIRE AUX SCHÉMAS SANITY**

### 📐 Principe Fondamental
**TOUTES les implémentations (APIs, composants, types) DOIVENT suivre EXACTEMENT les schémas Sanity définis.**

### ✅ Règles de Conformité Obligatoires

#### **1. Structure des Données**
```typescript
// ✅ CORRECT - Respecte le schéma heroBlock.ts
{
  _type: 'heroBlock',
  title: 'Mon Titre',
  heroSettings: {           // ✅ Objet défini dans le schéma
    height: 'large',
    verticalAlignment: 'center',
    textAlignment: 'center'
  },
  ctaButtons: [             // ✅ Array défini dans le schéma
    {
      text: 'Mon Bouton',
      href: '/contact',
      variant: 'primary'
    }
  ]
}

// ❌ INCORRECT - Ne respecte pas le schéma
{
  _type: 'heroBlock',
  title: 'Mon Titre',
  height: 'large',          // ❌ Devrait être dans heroSettings
  textAlignment: 'center',  // ❌ Devrait être dans heroSettings
  primaryButton: {          // ❌ Devrait être ctaButtons array
    text: 'Mon Bouton'
  }
}
```

#### **2. Champs Requis vs Optionnels**
```typescript
// ✅ CORRECT - Tous les champs requis présents
animationSettings: {
  enableAnimations: true,     // ✅ Requis
  triggerOffset: 50,         // ✅ Requis pour IntersectionObserver
  animationType: 'countUp',  // ✅ Requis
  duration: 2000,           // ✅ Requis
  staggerDelay: 200,        // ✅ Requis
  easing: 'easeOutQuart'    // ✅ Requis
}

// ❌ INCORRECT - Champs manquants
animationSettings: {
  enableAnimations: true,
  // ❌ triggerOffset manquant → erreur IntersectionObserver
  // ❌ staggerDelay manquant → animations cassées
}
```

#### **3. Types de Données**
```typescript
// ✅ CORRECT - Types respectés
{
  number: '150+',           // ✅ string (pour StatsBlock)
  imageUrl: 'https://...',  // ✅ url (pour TeamBlock)
  featured: true,           // ✅ boolean
  skills: ['React', 'TS']   // ✅ array of strings
}

// ❌ INCORRECT - Types incorrects
{
  number: 150,              // ❌ number au lieu de string
  imageUrl: { asset: {} },  // ❌ objet au lieu d'url
  featured: 'true',         // ❌ string au lieu de boolean
  skills: 'React, TS'       // ❌ string au lieu d'array
}
```

### 🔍 Procédure de Vérification

#### **Avant Toute Implémentation :**
1. **Lire le schéma** correspondant dans `/src/sanity/schemas/blocks/`
2. **Identifier les champs requis** et leurs types exacts
3. **Vérifier la structure** des objets imbriqués
4. **Respecter les noms** de champs exactement (case-sensitive)
5. **Tester la conformité** avant déploiement

#### **Outils de Vérification :**
```bash
# Vérifier les schémas Sanity
find src/sanity/schemas -name "*.ts" -exec grep -l "defineField" {} \;

# Vérifier les APIs
find src/app/api -name "*.ts" -exec grep -l "_type:" {} \;
```

### 🚫 Erreurs Communes à Éviter

#### **1. Champs au Mauvais Niveau**
```typescript
// ❌ ERREUR COMMUNE
{
  _type: 'heroBlock',
  height: 'large',          // ❌ Devrait être dans heroSettings
  textAlignment: 'center'   // ❌ Devrait être dans heroSettings
}
```

#### **2. Noms de Champs Incorrects**
```typescript
// ❌ ERREUR COMMUNE
{
  _type: 'teamBlock',
  members: [...],           // ❌ Devrait être 'teamMembers'
  role: 'Developer'         // ❌ Devrait être 'position'
}
```

#### **3. Valeurs Non-Finies**
```typescript
// ❌ ERREUR COMMUNE - Cause des erreurs IntersectionObserver
const threshold = triggerOffset / 100  // ❌ Si triggerOffset est undefined

// ✅ CORRECT - Valeurs sécurisées
const threshold = Math.max(0, Math.min(1, (triggerOffset || 50) / 100))
```

#### **4. Contraintes de Validation Manquées**
```typescript
// ❌ ERREUR - Dépassement des limites de validation
{
  _type: 'heroBlock',
  title: 'Un titre extrêmement long qui dépasse les 100 caractères autorisés par le schéma Sanity et qui causera une erreur de validation',  // ❌ Max 100 caractères
  ctaButtons: [
    { text: 'Bouton 1' },
    { text: 'Bouton 2' },
    { text: 'Bouton 3' },
    { text: 'Bouton 4' }    // ❌ Max 3 boutons autorisés
  ]
}

// ✅ CORRECT - Respecte les limites
{
  _type: 'heroBlock',
  title: 'Titre respectant la limite',  // ✅ < 100 caractères
  ctaButtons: [
    { text: 'Bouton 1' },
    { text: 'Bouton 2' },
    { text: 'Bouton 3' }    // ✅ Max 3 boutons
  ]
}
```

#### **5. Types de Données Incorrects**
```typescript
// ❌ ERREUR - Types incorrects selon les schémas
{
  _type: 'statsBlock',
  stats: [
    {
      number: 150,          // ❌ Doit être string selon le schéma
      featured: 'true',     // ❌ Doit être boolean
      color: 'blue'         // ❌ Doit être format HEX (#rrggbb)
    }
  ]
}

// ✅ CORRECT - Types conformes
{
  _type: 'statsBlock',
  stats: [
    {
      number: '150+',       // ✅ string
      featured: true,       // ✅ boolean
      color: '#3b82f6'      // ✅ format HEX
    }
  ]
}
```

#### **6. Champs Conditionnels Manqués**
```typescript
// ❌ ERREUR - Champs conditionnels manqués
{
  _type: 'featureGridBlock',
  features: [
    {
      iconType: 'emoji',
      // ❌ iconEmoji manquant quand iconType = 'emoji'
      title: 'Ma fonctionnalité'
    }
  ]
}

// ✅ CORRECT - Champs conditionnels présents
{
  _type: 'featureGridBlock',
  features: [
    {
      iconType: 'emoji',
      iconEmoji: '🚀',      // ✅ Présent quand iconType = 'emoji'
      title: 'Ma fonctionnalité'
    }
  ]
}
```

### 🔑 Règle Critique des Clés Uniques

> **⚠️ ERREUR REACT COMMUNE - CLÉS DUPLIQUÉES**

#### **Problème Fréquent**
```
Encountered two children with the same key, `text`. 
Keys should be unique so that components maintain their identity across updates.
```

#### **Cause**
Dans Sanity, **chaque élément dans un array doit avoir un `_key` unique** :

```typescript
// ❌ ERREUR - Spans sans _key
children: [
  {
    _type: 'span',
    text: 'Mon texte',  // ❌ Pas de _key
    marks: []
  },
  {
    _type: 'span', 
    text: 'Autre texte', // ❌ Pas de _key
    marks: ['strong']
  }
]

// ✅ CORRECT - Chaque span a un _key unique
children: [
  {
    _type: 'span',
    _key: 'intro-text',     // ✅ Clé unique
    text: 'Mon texte',
    marks: []
  },
  {
    _type: 'span',
    _key: 'strong-text',    // ✅ Clé unique différente
    text: 'Autre texte',
    marks: ['strong']
  }
]
```

#### **Solution Obligatoire**
**TOUS les éléments d'array doivent avoir un `_key` unique :**

```typescript
// ✅ Blocs de contenu
content: [
  {
    _type: 'block',
    _key: 'title-block',        // ✅ Clé unique
    children: [
      {
        _type: 'span',
        _key: 'title-span',      // ✅ Clé unique
        text: 'Mon titre'
      }
    ]
  }
]

// ✅ Features
features: [
  {
    _key: 'feature-performance',  // ✅ Clé unique
    title: 'Performance'
  },
  {
    _key: 'feature-design',       // ✅ Clé unique
    title: 'Design'
  }
]

// ✅ Stats
stats: [
  {
    _key: 'stat-projects',        // ✅ Clé unique
    number: '150+'
  }
]

// ✅ Team Members
teamMembers: [
  {
    _key: 'member-sarah',         // ✅ Clé unique
    name: 'Sarah Martin'
  }
]
```

### 📏 Contraintes de Validation Critiques

> **⚠️ LIMITES STRICTES - RESPECTER ABSOLUMENT**

#### **Limites de Caractères par Bloc**

```typescript
// HeroBlock
{
  title: 'Max 100 caractères',           // validation: Rule.max(100)
  subtitle: 'Max 300 caractères',        // validation: Rule.max(300)
  ctaButtons: [...],                     // validation: Rule.max(3)
}

// ContactBlock  
{
  formFields: [
    {
      label: 'Max 50 caractères',         // validation: Rule.max(50)
      placeholder: 'Max 100 caractères',  // validation: Rule.max(100)
    }
  ],
  submitButton: {
    text: 'Max 30 caractères',           // validation: Rule.max(30)
    loadingText: 'Max 30 caractères',    // validation: Rule.max(30)
  }
}

// StatsBlock
{
  stats: [
    {
      number: 'Max 20 caractères',       // validation: Rule.max(20)
      label: 'Max 100 caractères',       // validation: Rule.max(100)
      description: 'Max 200 caractères', // validation: Rule.max(200)
      color: '#3b82f6',                  // validation: Rule.regex(/^#[0-9A-Fa-f]{6}$/)
    }
  ]
}

// FeatureGridBlock
{
  features: [
    {
      title: 'Max 60 caractères',        // validation: Rule.max(60)
      description: 'Max 200 caractères', // validation: Rule.max(200)
    }
  ]
}
```

#### **Limites de Quantité**

```typescript
// Limites d'éléments dans les arrays
{
  ctaButtons: [...],        // Max 3 éléments (heroBlock)
  formFields: [...],        // Pas de limite spécifique (contactBlock)
  stats: [...],            // Min 1, Max 12 éléments (statsBlock)
  features: [...],         // Min 1, Max 12 éléments (featureGridBlock)
  teamMembers: [...],      // Généralement Max 20 éléments
}
```

#### **Formats Requis**

```typescript
// Formats spécifiques obligatoires
{
  color: '#3b82f6',                    // Format HEX obligatoire: /^#[0-9A-Fa-f]{6}$/
  email: 'user@example.com',           // Format email valide
  triggerOffset: 50,                   // Nombre entre 0 et 100
  animationDuration: 2000,             // Nombre entre 100 et 10000 (ms)
  staggerDelay: 200,                   // Nombre entre 0 et 1000 (ms)
}
```

#### **Champs Conditionnels Obligatoires**

```typescript
// Si iconType = 'emoji', alors iconEmoji requis
{
  iconType: 'emoji',
  iconEmoji: '🚀',          // ⚠️ OBLIGATOIRE si iconType = 'emoji'
}

// Si iconType = 'lucide', alors iconLucide requis  
{
  iconType: 'lucide',
  iconLucide: 'star',       // ⚠️ OBLIGATOIRE si iconType = 'lucide'
}

// Si backgroundType = 'gradient', alors gradientSettings requis
{
  backgroundType: 'gradient',
  gradientSettings: {       // ⚠️ OBLIGATOIRE si backgroundType = 'gradient'
    gradientType: 'preset',
    preset: 'ocean'
  }
}

// Si showContactInfo = true, alors champs contact requis
{
  contactInfo: {
    showContactInfo: true,
    email: 'contact@example.com',  // ⚠️ OBLIGATOIRE si showContactInfo = true
    phone: '+33123456789',         // ⚠️ OBLIGATOIRE si showContactInfo = true
  }
}
```

### 📋 Checklist de Conformité

- [ ] **Structure** : Tous les champs sont au bon niveau hiérarchique
- [ ] **Noms** : Tous les noms de champs correspondent exactement au schéma
- [ ] **Types** : Tous les types de données sont respectés (string, number, boolean, array)
- [ ] **Requis** : Tous les champs requis sont présents
- [ ] **Optionnels** : Les champs optionnels ont des valeurs par défaut sécurisées
- [ ] **Imbrication** : Les objets imbriqués respectent la structure du schéma
- [ ] **Arrays** : Les tableaux contiennent les bons types d'éléments
- [ ] **Clés Uniques** : **TOUS les éléments d'array ont un `_key` unique** ⚠️
- [ ] **Limites** : **Respecter toutes les limites de caractères et quantités** ⚠️
- [ ] **Formats** : **Couleurs HEX, emails, nombres dans les bonnes plages** ⚠️
- [ ] **Conditionnels** : **Champs conditionnels présents selon les dépendances** ⚠️
- [ ] **Validation** : Les valeurs respectent les contraintes de validation

---

## ⚠️ Imports Critiques

> **🚨 SECTION CRITIQUE - À RESPECTER ABSOLUMENT**

### ✅ Pattern d'Imports Obligatoire
```typescript
// ✅ TOUJOURS FAIRE - Pattern correct
import BlockRenderer from '@/components/BlockRenderer'        // Composant
import type { Block } from '@/types/blocks'                   // Types depuis source unique
import type { PageStyleSettings } from '@/lib/theme-utils'

// ✅ Normalisation des props (obligatoire)
const normalizedFormFields = formFields || []
const normalizedSubmitButton = submitButton || { text: 'Envoyer', loadingText: 'Envoi...' }
const normalizedImages = images?.filter(img => img?.asset) || []

// ✅ Clés React uniques
const uniqueKey = block._key ? `${block._key}-${index}` : `${block._type}-${index}`
```

### ❌ Erreurs à Éviter Absolument
```typescript
// ❌ JAMAIS FAIRE - Erreurs communes
import type { Block } from '@/components/BlockRenderer'  // ERREUR! Conflit de types
import BlockRenderer, { Block } from '@/components/BlockRenderer'  // ERREUR! Mélange
import { Block } from '@/components/BlockRenderer'  // ERREUR! Mauvaise source

// ❌ Props non normalisées (cause des erreurs runtime)
const items = teamMembers.map(...)  // ERREUR si teamMembers est null
const buttonText = submitButton.text  // ERREUR si submitButton est null
```

---

## 📖 Lecture et Analyse du README

### Informations Clés à Extraire (Mise à Jour 2024)

#### 1. **Technologies Stack Réel**
```
┌─────────────────────────────────────────────────┐
│                 Next.js 16.0.1                  │
│              (App Router + RSC)                 │
├─────────────────────────────────────────────────┤
│  React 19.2.0  │  TypeScript 5  │ Styled Components 6.1.19 │
├─────────────────────────────────────────────────┤
│              Sanity CMS 4.12.0                 │
│         (Headless Content Platform)             │
├─────────────────────────────────────────────────┤
│       @portabletext/react 4.0.3                │
│       @sanity/image-url + Lucide Icons         │
└─────────────────────────────────────────────────┘
```

#### 2. **Structure du Projet Réelle**
```
src/
├── app/                    # Next.js 16 App Router
│   ├── (website)/         # Routes publiques
│   │   ├── [[...slug]]/   # Route dynamique principale
│   │   ├── demo/          # Page démo avec blocs
│   │   └── services/      # Page services (exemple)
│   ├── (sanity)/          # Sanity Studio intégré
│   └── admin/             # Interface d'administration
├── components/            # Composants React
│   ├── BlockRenderer/     # Rendu dynamique des 7 blocs
│   ├── blocks/           # 7 blocs Sanity disponibles
│   │   ├── TextBlock/    # 📝 Contenu riche
│   │   ├── HeroBlock.tsx # 🦸 Sections héro
│   │   ├── FeatureGridBlock.tsx # ⭐ Grilles fonctionnalités
│   │   ├── ContactBlock/ # 📞 Formulaires contact
│   │   ├── GalleryBlock/ # 🖼️ Galeries images
│   │   ├── TeamBlock/    # 👥 Équipes/témoignages
│   │   └── StatsBlock/   # 📊 Statistiques
│   ├── common/           # Composants réutilisables
│   └── layout/           # Layout (Header, Footer)
├── sanity/               # Configuration Sanity
│   ├── schemas/          # Schémas de contenu
│   │   ├── blocks/       # Schémas des 7 blocs
│   │   ├── shared/       # themeFields.ts (système unifié)
│   │   └── settings/     # Paramètres globaux
│   └── lib/              # Client et requêtes GROQ
├── types/                # Types TypeScript centralisés
│   └── blocks.ts         # Types des 7 blocs (source unique)
├── styles/               # Système de styling
│   ├── brand.css         # Design tokens
│   └── theme-utilities.css # Classes utilitaires
└── lib/                  # Utilitaires
    └── theme-utils.ts    # Fonctions de thème
```

#### 3. **7 Blocs Disponibles (Liste Exacte)**
```typescript
// Source unique des types : /src/types/blocks.ts
export type Block = 
  | TextBlockData      // 📝 Contenu riche avec éditeur visuel
  | HeroBlockData      // 🦸 Sections héro avec boutons CTA
  | FeatureGridBlockData // ⭐ Grilles de fonctionnalités
  | ContactBlockData   // 📞 Formulaires de contact
  | GalleryBlockData   // 🖼️ Galeries d'images
  | TeamBlockData      // 👥 Équipes et témoignages
  | StatsBlockData     // 📊 Statistiques et compteurs
```

#### 4. **Système de Thème Unifié**
- **18 dégradés prédéfinis** (Sunset, Ocean, Fire, etc.)
- **Dégradés personnalisés** (3 couleurs + 9 directions + radial)
- **60+ icônes Lucide React** intégrées
- **Styles de page globaux** configurables depuis Studio

---

## ⚙️ Procédure d'Auto-Implémentation

### Étape 1 : Analyse du README
```typescript
// Extraire les informations du README (Version 2024)
const projectInfo = {
  structure: "Next.js 16.0.1 + Sanity CMS 4.12.0 + TypeScript 5",
  architecture: "Système de 7 blocs modulaires + Thème unifié",
  styling: "Styled Components 6.1.19 + Design tokens",
  blocks: "7 blocs disponibles (TextBlock, HeroBlock, FeatureGridBlock, ContactBlock, GalleryBlock, TeamBlock, StatsBlock)",
  patterns: "Auto-génération + Route dynamique [[...slug]]",
  imports: "TOUJOURS importer Block depuis @/types/blocks"
}
```

### Étape 2 : Création de la Structure de Page

#### A. **⚠️ IMPORTS CRITIQUES - Éviter les Erreurs**
```typescript
// ✅ CORRECT - Pattern d'imports obligatoire
import BlockRenderer from '@/components/BlockRenderer'        // Composant
import type { Block } from '@/types/blocks'                   // Types
import type { PageStyleSettings } from '@/lib/theme-utils'

// ❌ INCORRECT - Ne jamais faire ceci
import type { Block } from '@/components/BlockRenderer'  // ERREUR!
```

#### B. **Route Next.js** (`src/app/(website)/[nom-page]/page.tsx`)
```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ClientPageContent from '../[[...slug]]/ClientPageContent'
import [NomPage]Content from './[NomPage]Content'
import type { Block } from '@/types/blocks'                   // ✅ Source correcte
import type { PageStyleSettings } from '@/lib/theme-utils'

type Page = {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
} & PageStyleSettings

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '[Titre de la Page] - Sanity Next.js Boilerplate',
    description: '[Description SEO optimisée]',
  }
}

export default async function [NomPage]Page() {
  try {
    const page: Page = await client.fetch(pageBySlugQuery, { slug: '[nom-page]' })
    
    if (!page) {
      return <[NomPage]Content />
    }
    
    return <ClientPageContent page={page} />
  } catch (error) {
    console.error('Erreur lors du chargement de la page:', error)
    return <[NomPage]Content />
  }
}
```

#### C. **Composant de Contenu avec Styled Components** (`[NomPage]Content.tsx`)
```typescript
'use client'

import React from 'react'
import styled from 'styled-components'

// Utilisation des design tokens du système
const Container = styled.div`
  min-height: 100vh;
  padding: var(--spacing-16) var(--spacing-6);
  background-color: var(--color-gray-50);
  
  @media (max-width: 768px) {
    padding: var(--spacing-8) var(--spacing-4);
  }
`

const Title = styled.h1`
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: var(--spacing-12);
  
  // Utilisation des dégradés du système
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-4xl);
  }
`

const Content = styled.div`
  max-width: var(--max-width-4xl);
  margin: 0 auto;
  text-align: center;
`

export default function [NomPage]Content() {
  return (
    <Container>
      <Content>
        <Title>[Titre de la Page]</Title>
        <p>Contenu de la page en attente de génération dans Sanity Studio.</p>
      </Content>
    </Container>
  )
}
```

### Étape 3 : Intégration Admin

#### A. **Page d'Administration** (`src/app/admin/[nom-page]/page.tsx`)
```typescript
'use client'

import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'

export default function Admin[NomPage]() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/setup-[nom-page]', {
        method: 'POST',
      })
      
      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <AdminLayout title="[Titre de la Page]">
      <button onClick={handleGenerate} disabled={isGenerating}>
        {isGenerating ? 'Génération...' : 'Créer la Page dans Studio'}
      </button>
    </AdminLayout>
  )
}
```

#### B. **API d'Auto-génération avec les 7 Blocs** (`src/app/api/setup-[nom-page]/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Début de la création de la page [nom-page] dans Sanity...')

    const pageData = {
      _type: 'page',
      title: '[Titre de la Page]',
      slug: { 
        current: '[nom-page]',
        _type: 'slug'
      },
      seoTitle: '[Titre SEO] - Sanity Next.js Boilerplate',
      seoDescription: '[Description SEO optimisée pour les moteurs de recherche]',
      seoKeywords: ['[mot-clé1]', '[mot-clé2]', '[mot-clé3]'],
      
      // Construction avec les 7 blocs disponibles
      pageBuilder: [
        // 🦸 HeroBlock - Section d'accueil
        {
          _type: 'heroBlock',
          _key: '[nom-page]-hero',
          title: '[Titre Principal]',
          subtitle: '[Sous-titre descriptif de la page]',
          
          // Boutons CTA
          primaryButton: {
            text: '🚀 Action Principale',
            link: '/demo',
            style: 'primary'
          },
          secondaryButton: {
            text: '📖 En Savoir Plus',
            link: '/studio',
            style: 'secondary'
          },
          
          // Configuration du style avec le système de thème
          height: 'large',
          textAlignment: 'center',
          
          // Arrière-plan avec dégradé du système
          backgroundSettings: {
            backgroundType: 'gradient',
            gradientSettings: {
              gradientType: 'preset',
              preset: 'ocean', // Un des 18 dégradés disponibles
              intensity: 100
            }
          },
          
          // Icône du système Lucide
          iconType: 'emoji',
          iconEmoji: '🎯',
          iconSize: 'large',
          iconPosition: 'above'
        },
        
        // ⭐ FeatureGridBlock - Fonctionnalités
        {
          _type: 'featureGridBlock',
          _key: '[nom-page]-features',
          title: 'Fonctionnalités Principales',
          subtitle: 'Découvrez ce que nous proposons',
          
          gridLayout: '3-balanced',
          cardStyle: 'elevated',
          
          features: [
            {
              _key: 'feature-1',
              iconType: 'emoji',
              iconEmoji: '⚡',
              iconSize: 'large',
              iconColor: '#3b82f6',
              title: 'Performance',
              description: 'Solutions optimisées et rapides',
              featured: false
            },
            {
              _key: 'feature-2',
              iconType: 'emoji',
              iconEmoji: '🎨',
              iconSize: 'large',
              iconColor: '#10b981',
              title: 'Design Moderne',
              description: 'Interface utilisateur intuitive',
              featured: true // Mise en avant
            },
            {
              _key: 'feature-3',
              iconType: 'emoji',
              iconEmoji: '🔧',
              iconSize: 'large',
              iconColor: '#f59e0b',
              title: 'Facilité d\'usage',
              description: 'Configuration simple et rapide',
              featured: false
            }
          ],
          
          // Style de la section
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#f8fafc'
          },
          
          styling: {
            textAlignment: 'center',
            paddingSize: 'large'
          }
        },
        
        // 📞 ContactBlock - Formulaire de contact
        {
          _type: 'contactBlock',
          _key: '[nom-page]-contact',
          title: 'Nous Contacter',
          subtitle: 'Parlons de votre projet',
          
          layout: 'centered',
          
          formFields: [
            {
              fieldType: 'name',
              label: 'Nom complet',
              placeholder: 'Votre nom',
              required: true,
              width: 'half'
            },
            {
              fieldType: 'email',
              label: 'Email',
              placeholder: 'votre@email.com',
              required: true,
              width: 'half'
            },
            {
              fieldType: 'subject',
              label: 'Sujet',
              placeholder: 'Sujet de votre message',
              required: true,
              width: 'full'
            },
            {
              fieldType: 'message',
              label: 'Message',
              placeholder: 'Votre message...',
              required: true,
              width: 'full'
            }
          ],
          
          submitButton: {
            text: 'Envoyer le Message',
            loadingText: 'Envoi en cours...'
          },
          
          successMessage: {
            title: 'Message envoyé !',
            description: 'Nous vous répondrons dans les plus brefs délais.'
          },
          
          // Style avec fond blanc
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#ffffff'
          }
        }
      ]
    }

    console.log('📝 Création du document page dans Sanity...')
    const result = await client.create(pageData)
    
    console.log('✅ Page [nom-page] créée avec succès:', result._id)
    
    return NextResponse.json({ 
      success: true, 
      page: result,
      message: 'Page [nom-page] créée avec succès dans Sanity Studio'
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page [nom-page]:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: 'Vérifiez que Sanity est correctement configuré et que vous avez les permissions d\'écriture'
    }, { status: 500 })
  }
}
```

### Étape 4 : Liaison au Système

#### A. **Mise à jour du Routage**
- Ajouter la route dans la navigation principale
- Mettre à jour les liens internes
- Configurer les redirections si nécessaire

#### B. **Intégration Sanity**
- Vérifier que les schémas de blocs sont disponibles
- Tester la création de contenu dans Studio
- Valider le rendu frontend

---

## ✅ Bonnes Pratiques (Version 2024)

### 1. **⚠️ IMPORTS CRITIQUES - Éviter les Erreurs**
```typescript
// ✅ TOUJOURS FAIRE - Pattern d'imports obligatoire
import BlockRenderer from '@/components/BlockRenderer'        // Composant
import type { Block } from '@/types/blocks'                   // Types depuis source unique
import type { PageStyleSettings } from '@/lib/theme-utils'

// ❌ JAMAIS FAIRE - Erreurs communes
import type { Block } from '@/components/BlockRenderer'  // ERREUR! Conflit de types
import BlockRenderer, { Block } from '@/components/BlockRenderer'  // ERREUR! Mélange
```

### 2. **Système de Design Tokens**
```typescript
// ✅ Utiliser les design tokens du système
const StyledComponent = styled.div`
  // Couleurs du système
  background-color: var(--color-gray-50);
  color: var(--color-gray-900);
  
  // Espacements standardisés
  padding: var(--spacing-16) var(--spacing-6);
  margin-bottom: var(--spacing-12);
  
  // Typographie du système
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  
  // Responsive avec breakpoints
  @media (max-width: 768px) {
    padding: var(--spacing-8) var(--spacing-4);
    font-size: var(--font-size-lg);
  }
`
```

### 3. **Utilisation des 7 Blocs Disponibles**
```typescript
// ✅ Les 7 blocs disponibles dans le système
const availableBlocks = [
  { _type: 'textBlock', ... },        // 📝 Contenu riche
  { _type: 'heroBlock', ... },        // 🦸 Sections héro
  { _type: 'featureGridBlock', ... }, // ⭐ Grilles fonctionnalités
  { _type: 'contactBlock', ... },     // 📞 Formulaires contact
  { _type: 'galleryBlock', ... },     // 🖼️ Galeries images
  { _type: 'teamBlock', ... },        // 👥 Équipes/témoignages
  { _type: 'statsBlock', ... },       // 📊 Statistiques
]
```

---

## 🎨 Système de Thème Unifié

### Backgrounds Avancés

#### Couleurs Solides
```typescript
backgroundSettings: {
  backgroundType: 'color',
  backgroundColor: '#f8fafc' // 20+ couleurs prédéfinies
}
```

#### Dégradés Prédéfinis (18 disponibles)
```typescript
backgroundSettings: {
  backgroundType: 'gradient',
  gradientSettings: {
    gradientType: 'preset',
    preset: 'ocean', // ocean, sunset, fire, forest, midnight, etc.
    intensity: 100
  }
}
```

#### Dégradés Personnalisés (3 couleurs + 9 directions)
```typescript
backgroundSettings: {
  backgroundType: 'gradient',
  gradientSettings: {
    gradientType: 'custom',
    custom: {
      from: '#667eea',
      via: '#764ba2',    // Couleur intermédiaire
      to: '#f093fb',
      direction: 'to-br', // ↓↑→←↘↙↗↖ + radial
      intensity: 85
    }
  }
}
```

#### Images avec Overlay
```typescript
backgroundSettings: {
  backgroundType: 'image',
  backgroundImage: {
    asset: { url: 'https://...' },
    alt: 'Image de fond',
    overlay: {
      enabled: true,
      color: '#000000',
      opacity: 40
    }
  }
}
```

### Variants et Styles

#### Cards (6 variants)
```typescript
cardStyle: 'minimal'    // Bordure fine
cardStyle: 'bordered'   // Bordure épaisse
cardStyle: 'shadow'     // Ombre légère
cardStyle: 'elevated'   // Ombre forte
cardStyle: 'colored'    // Fond coloré
cardStyle: 'glass'      // Effet verre
```

#### Spacing (5 niveaux)
```typescript
spacing: 'compact'      // Espacement réduit
spacing: 'normal'       // Espacement standard
spacing: 'comfortable'  // Espacement large
spacing: 'large'        // Espacement très large
spacing: 'xl'          // Espacement maximum
```

#### Alignement
```typescript
alignment: 'left'       // Aligné à gauche
alignment: 'center'     // Centré
alignment: 'right'      // Aligné à droite
```

### Icônes

#### Emojis (recommandé pour simplicité)
```typescript
iconType: 'emoji',
iconEmoji: '🎯',        // Directement utilisable
iconSize: 'large',      // sm, md, lg, xl, 2xl
iconPosition: 'above'   // top, left, right, background
```

#### Lucide React (60+ icônes)
```typescript
iconType: 'lucide',
iconName: 'zap',        // zap, code, database, users, etc.
iconColor: '#3b82f6',
iconSize: 'large',
iconStyle: 'filled'     // normal, filled, outlined, shadow, circle
```

### Design Tokens (styled-components)
```typescript
const StyledComponent = styled.div`
  /* Couleurs système */
  background-color: var(--color-gray-50);
  color: var(--color-gray-900);
  
  /* Espacements standardisés */
  padding: var(--spacing-16) var(--spacing-6);
  margin-bottom: var(--spacing-12);
  
  /* Typographie système */
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  
  /* Responsive avec breakpoints */
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--spacing-8) var(--spacing-4);
    font-size: var(--font-size-lg);
  }
`
```

### 5. **Gestion des Erreurs et Permissions**
```typescript
// ✅ Vérifier les permissions Sanity
// Assurer que SANITY_API_TOKEN a les permissions "Editor"
// Gérer les erreurs de création gracieusement

try {
  const result = await client.create(pageData)
  console.log('✅ Page créée:', result._id)
} catch (error) {
  console.error('❌ Erreur Sanity:', error)
  // Vérifier les permissions et la configuration
}
```

---

## 🔧 Exemple Concret : Création d'une "Services Page"

### 1. **Analyse du README (Version 2024)**
```
Objectif : Créer une page "/services" avec auto-génération
Technologies : Next.js 16.0.1 + Sanity 4.12.0 + Styled Components 6.1.19
Blocs : HeroBlock + FeatureGridBlock + ContactBlock (3 des 7 blocs disponibles)
Thème : Utiliser les 18 dégradés prédéfinis + 60+ icônes Lucide
Imports : TOUJOURS importer Block depuis @/types/blocks
```

### 2. **Implémentation Correcte**

#### Fichier : `src/app/(website)/services/page.tsx`
```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ClientPageContent from '../[[...slug]]/ClientPageContent'
import ServicesContent from './ServicesContent'
import type { Block } from '@/types/blocks'                   // ✅ Source correcte
import type { PageStyleSettings } from '@/lib/theme-utils'

type Page = {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
} & PageStyleSettings

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Services - Sanity Next.js Professional Boilerplate',
    description: 'Services professionnels de développement web avec Next.js 16 et Sanity CMS 4.12.',
  }
}

export default async function ServicesPage() {
  try {
    const page: Page = await client.fetch(pageBySlugQuery, { slug: 'services' })
    
    if (!page) {
      return <ServicesContent />
    }
    
    return <ClientPageContent page={page} />
  } catch (error) {
    console.error('Erreur lors du chargement de la page services:', error)
    return <ServicesContent />
  }
}
```

#### Fichier : `src/app/api/setup-services/route.ts` (Utilisant les 7 Blocs)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Début de la création de la page Services dans Sanity...')

    const servicesPageData = {
      _type: 'page',
      title: 'Services',
      slug: { 
        current: 'services',
        _type: 'slug'
      },
      seoTitle: 'Services - Développement Web Professionnel',
      seoDescription: 'Services professionnels de développement web avec Next.js et Sanity CMS.',
      seoKeywords: ['services', 'développement web', 'next.js', 'sanity cms'],
      
      // Utilisation des 7 blocs disponibles
      pageBuilder: [
        // 🦸 HeroBlock avec système de thème
        {
          _type: 'heroBlock',
          _key: 'services-hero',
          title: 'Nos Services',
          subtitle: 'Solutions complètes de développement web moderne avec Next.js et Sanity CMS',
          
          primaryButton: {
            text: '📋 Voir nos Réalisations',
            link: '/demo',
            style: 'secondary'
          },
          secondaryButton: {
            text: '💬 Nous Contacter',
            link: '/studio',
            style: 'primary'
          },
          
          height: 'large',
          textAlignment: 'center',
          
          // Utilisation des 18 dégradés prédéfinis
          backgroundSettings: {
            backgroundType: 'gradient',
            gradientSettings: {
              gradientType: 'preset',
              preset: 'forest', // Un des 18 dégradés disponibles
              intensity: 100
            }
          },
          
          iconType: 'emoji',
          iconEmoji: '🛠️',
          iconSize: 'large',
          iconPosition: 'above'
        },
        
        // ⭐ FeatureGridBlock - Nos expertises
        {
          _type: 'featureGridBlock',
          _key: 'services-expertise',
          title: 'Nos Expertises',
          subtitle: 'Technologies modernes pour des solutions performantes',
          
          gridLayout: '3-balanced',
          cardStyle: 'elevated',
          
          features: [
            {
              _key: 'web-dev',
              iconType: 'emoji',
              iconEmoji: '🚀',
              iconSize: 'large',
              iconColor: '#667eea',
              title: 'Développement Web',
              description: 'Applications React/Next.js performantes et modernes',
              featured: false
            },
            {
              _key: 'cms-content',
              iconType: 'emoji',
              iconEmoji: '🎨',
              iconSize: 'large',
              iconColor: '#10b981',
              title: 'CMS & Gestion de Contenu',
              description: 'Solutions CMS headless avec Sanity pour une gestion flexible',
              featured: true
            },
            {
              _key: 'performance',
              iconType: 'emoji',
              iconEmoji: '⚡',
              iconSize: 'large',
              iconColor: '#f59e0b',
              title: 'Performance & Déploiement',
              description: 'Optimisation complète et déploiement cloud',
              featured: false
            }
          ],
          
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#f8fafc'
          },
          
          styling: {
            textAlignment: 'center',
            paddingSize: 'large'
          }
        },
        
        // 📊 StatsBlock - Chiffres clés
        {
          _type: 'statsBlock',
          _key: 'services-stats',
          title: 'Nos Résultats',
          subtitle: 'Quelques chiffres qui parlent',
          
          layout: 'grid-3col',
          
          stats: [
            {
              number: '50+',
              label: 'Projets Réalisés',
              description: 'Sites web et applications développés',
              icon: '🎯',
              featured: false
            },
            {
              number: '98%',
              label: 'Satisfaction Client',
              description: 'Taux de satisfaction de nos clients',
              icon: '⭐',
              featured: true
            },
            {
              number: '24h',
              label: 'Support Réactif',
              description: 'Temps de réponse moyen',
              icon: '🚀',
              featured: false
            }
          ],
          
          animationSettings: {
            enableAnimations: true,
            animationType: 'countUp',
            duration: 2000,
            delay: 200,
            easing: 'easeOutQuart'
          },
          
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#ffffff'
          }
        }
      ]
    }

    console.log('📝 Création du document page dans Sanity...')
    const result = await client.create(servicesPageData)
    
    console.log('✅ Page Services créée avec succès:', result._id)
    
    return NextResponse.json({ 
      success: true, 
      page: result,
      message: 'Page Services créée avec succès dans Sanity Studio'
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page Services:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: 'Vérifiez que Sanity est correctement configuré et que vous avez les permissions d\'écriture'
    }, { status: 500 })
  }
}
```

### 3. **Validation et Tests**
- ✅ Vérifier les imports (Block depuis @/types/blocks)
- ✅ Tester l'auto-génération via /admin/services
- ✅ Valider le rendu des 3 blocs utilisés
- ✅ Contrôler les dégradés et icônes
- ✅ Vérifier la responsivité mobile

---

## 🎯 Objectif Final (Version 2024)

### Critères de Réussite Mis à Jour
✅ **Auto-implémentation autonome** : L'IA peut créer des pages avec les 7 blocs
✅ **Imports corrects** : Pas d'erreurs de types ou de composants
✅ **Système de thème** : Utilisation des 18 dégradés + 60+ icônes
✅ **Styled Components** : Design tokens et CSS-in-JS cohérents
✅ **Permissions Sanity** : Gestion des erreurs et tokens Editor

### Validation Technique
1. **Imports** : Vérifier Block depuis @/types/blocks
2. **Blocs** : Utiliser uniquement les 7 blocs disponibles
3. **Thème** : Appliquer le système unifié (dégradés, icônes)
4. **Permissions** : SANITY_API_TOKEN avec droits Editor
5. **Responsive** : Design tokens et breakpoints

---

## 🔧 Troubleshooting

### Erreurs Runtime Communes

| Erreur | Cause | Solution Immédiate |
|--------|-------|-------------------|
| `teamMembers is not iterable` | Prop `null` au lieu de `[]` | `const normalized = teamMembers \|\| []` |
| `Cannot read properties of null (reading 'text')` | Objet `null` | `const normalized = submitButton \|\| { text: 'Default' }` |
| `Cannot read properties of null (reading 'showAllOption')` | Options `null` | `const normalized = filterOptions \|\| { showAllOption: true }` |
| `Unable to resolve image URL from source (null)` | Image `null` | `if (!image?.asset) return null` + filtres |
| `Encountered two children with the same key` | Clés dupliquées | `key={block._key ? \`${block._key}-${index}\` : \`${block._type}-${index}\`}` |
| `ERR_NETWORK_CHANGED` | Serveur dev planté | `npm run dev` + Ctrl+Shift+R |

### Configuration Sanity
- **Token manquant** : Créer token avec permissions **Editor** dans Sanity Dashboard
- **CORS** : Configurer domaine dans Sanity Settings → API → CORS Origins
- **Dataset** : Vérifier nom exact dans `.env.local`

---

## ✅ Checklists

### ☐ Setup Initial
- [ ] Variables d'environnement configurées (`.env.local`)
- [ ] Token Sanity avec permissions **Editor**
- [ ] CORS configuré dans Sanity Dashboard
- [ ] `npm run dev` fonctionne

### ☐ Création Page Admin
- [ ] Route admin créée : `src/app/admin/[slug]/page.tsx`
- [ ] Bouton d'auto-génération fonctionnel
- [ ] Gestion des états (loading, erreur)
- [ ] AdminLayout importé et utilisé

### ☐ API d'Auto-génération
- [ ] Route API créée : `src/app/api/setup-[slug]/route.ts`
- [ ] Imports Sanity corrects
- [ ] Blocs utilisés parmi les 7 disponibles
- [ ] Gestion d'erreurs complète
- [ ] Logs de debug présents

### ☐ Vérifications Visuelles
- [ ] Page s'affiche sans erreur console
- [ ] Blocs rendus correctement
- [ ] Responsive mobile fonctionnel
- [ ] Thème appliqué (dégradés, couleurs)
- [ ] Images chargées (si présentes)

---

## 🧠 Prompt Prêt à Copier

```text
Tu es un Staff Engineer Next.js 16 + TypeScript + styled-components + Sanity v4. Auto-implémente une NOUVELLE PAGE en suivant STRICTEMENT les conventions du repo.

**Contexte Stack Réel :**
- Next.js 16 (App Router + Turbopack), React 19, TypeScript 5
- styled-components 6 (CSS-in-JS exclusif), design tokens centralisés
- Sanity CMS v4 avec normalisation des props (gestion null/undefined)
- 7 blocs disponibles : textBlock, heroBlock, featureGridBlock, contactBlock, galleryBlock, teamBlock, statsBlock

**Livrables Attendus :**
1. Route Next.js : `src/app/(website)/[slug]/page.tsx`
2. Fallback client : `[NomPage]Content.tsx` (styled-components + design tokens)
3. Interface Admin : `src/app/admin/[slug]/page.tsx`
4. API auto-génération : `src/app/api/setup-[slug]/route.ts`

**Contraintes Critiques :**
- UNIQUEMENT styled-components (aucune classe Tailwind)
- Imports : `Block` depuis `@/types/blocks` (source unique)
- Normalisation : `const normalized = prop || defaultValue`
- Clés React : `${_key}-${index}` si doublons possibles
- Images : vérifier `image?.asset` avant `urlFor`

**Paramètres d'Entrée (à remplir) :**
- Slug : [ex: "services"]
- Titre : [ex: "Nos Services"]
- Blocs souhaités : [ex: heroBlock, featureGridBlock, contactBlock]
- Thème : [ex: gradient "ocean", alignment "center", spacing "large"]
- SEO : title/description/keywords

**Sortie Attendue :**
Fichiers complets TypeScript/TSX, compilables, avec normalisation des props et design tokens.
```

---

## 📝 Changelog

### Améliorations Appliquées (Version 2024)

✅ **Table des matières** cliquable ajoutée  
✅ **Section Imports Critiques** mise en évidence avec encadré d'avertissement  
✅ **Troubleshooting étendu** avec tableau des erreurs courantes + solutions  
✅ **Checklists par étape** (Setup, Admin, API, Vérifications visuelles)  
✅ **Prompt prêt à copier** structuré pour génération de nouvelles pages  
✅ **Cohérence terminologique** : "7 blocs", "normalisation des props", "styled-components"  
✅ **Snippets alignés** sur Next.js 16 + React 19 + styled-components v6  
✅ **Section Thème Unifié** renforcée avec mini-snippets copiables  

### Corrections Techniques
- Tous les exemples de code vérifiés et compilables
- Imports critiques clarifiés et mis en avant
- Normalisation des props systématisée
- Gestion des erreurs runtime documentée

### Version 2024.11.04 - Règles de Conformité Sanity
✅ **Section Conformité Sanity** ajoutée avec règles absolues  
✅ **Vérification schémas obligatoire** avant toute implémentation  
✅ **Exemples d'erreurs communes** avec corrections détaillées  
✅ **Checklist de conformité** pour validation systématique  
✅ **Procédure de vérification** étape par étape  
✅ **Protection valeurs non-finies** pour IntersectionObserver  
✅ **Structure hiérarchique** des champs respectée (heroSettings, etc.)  
✅ **Types de données** strictement alignés sur les schémas Sanity

---

*Ce manuel permet à l'IA Claude d'auto-implémenter des pages de manière autonome, cohérente et reproductible dans le système Sanity Next.js Professional Boilerplate (Version 2024).*
