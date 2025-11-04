# 📘 Manuel d'Auto-Implémentation Studio
> **Documentation technique interne pour l'IA Claude**

## 🎯 Introduction

### Finalité du Système Studio
Le **Sanity Next.js Boilerplate** utilise un système de **blocs modulaires** où :
- **Sanity Studio** = Interface d'administration pour créer/éditer du contenu
- **Next.js Frontend** = Rendu dynamique des pages basé sur les données Sanity
- **Système de Blocs** = Architecture modulaire pour construire des pages

### Rôle de ce Manuel
Ce manuel permet à l'IA Claude de :
1. **Analyser** la structure existante du projet
2. **Comprendre** les conventions et patterns
3. **Auto-implémenter** de nouvelles pages conformes au système
4. **Maintenir** la cohérence architecturale

---

## 📖 Lecture et Analyse du README

### Informations Clés à Extraire

#### 1. **Structure du Projet**
```
src/
├── app/                    # Next.js App Router
│   ├── (website)/         # Routes publiques
│   ├── (sanity)/          # Sanity Studio
│   └── admin/             # Interface d'administration
├── components/            # Composants React
│   ├── blocks/           # Blocs Sanity
│   ├── common/           # Composants réutilisables
│   └── layout/           # Layout (Header, Footer)
├── sanity/               # Configuration Sanity
│   ├── schemas/          # Schémas de contenu
│   └── lib/              # Client et requêtes
├── types/                # Types TypeScript centralisés
├── utils/                # Utilitaires communs
└── config/               # Configuration centralisée
```

#### 2. **Conventions de Nommage**
- **Pages** : `kebab-case` (ex: `demo-page`)
- **Composants** : `PascalCase` (ex: `DemoPage`)
- **Fichiers** : `camelCase` pour JS/TS, `kebab-case` pour routes
- **Schémas Sanity** : `camelCase` (ex: `demoPageBlock`)

#### 3. **Dépendances Critiques**
- **Next.js 16.0.1** avec App Router
- **Sanity 4.12.0** pour le CMS
- **TypeScript 5** pour la sécurité des types
- **Styled Components 6.1.19** pour le styling

#### 4. **Logique d'Organisation**
- **Route dynamique** : `[[...slug]]/page.tsx` gère toutes les pages
- **Auto-génération** : Pages créées automatiquement si inexistantes
- **Blocs modulaires** : Pages construites avec des blocs réutilisables

---

## ⚙️ Procédure d'Auto-Implémentation

### Étape 1 : Analyse du README
```typescript
// Extraire les informations du README
const projectInfo = {
  structure: "Next.js 16 + Sanity CMS + TypeScript",
  architecture: "Système de blocs modulaires",
  conventions: "kebab-case routes, PascalCase components",
  patterns: "Auto-génération + Blocs réutilisables"
}
```

### Étape 2 : Création de la Structure de Page

#### A. **Route Next.js** (`src/app/(website)/[nom-page]/page.tsx`)
```typescript
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import [NomPage]Content from './[NomPage]Content'
import type { Block } from '@/types/blocks'

type Page = {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  seoTitle?: string
  seoDescription?: string
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '[Titre de la Page]',
    description: '[Description SEO]',
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
    return <[NomPage]Content />
  }
}
```

#### B. **Composant de Contenu** (`[NomPage]Content.tsx`)
```typescript
'use client'

import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem;
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export default function [NomPage]Content() {
  return (
    <Container>
      <Title>[Titre de la Page]</Title>
      {/* Contenu de la page */}
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

#### B. **API d'Auto-génération** (`src/app/api/setup-[nom-page]/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    const pageData = {
      _type: 'page',
      title: '[Titre de la Page]',
      slug: { current: '[nom-page]' },
      seoTitle: '[Titre SEO]',
      seoDescription: '[Description SEO]',
      pageBuilder: [
        {
          _type: 'heroBlock',
          _key: 'hero',
          title: '[Titre Hero]',
          subtitle: '[Sous-titre]',
          // Configuration du bloc...
        }
      ]
    }

    const result = await client.create(pageData)
    
    return NextResponse.json({ 
      success: true, 
      page: result 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
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

## ✅ Bonnes Pratiques

### 1. **Code Propre et Cohérent**
- Utiliser les **types centralisés** (`/src/types/blocks.ts`)
- Respecter les **conventions de nommage** établies
- Réutiliser les **utilitaires communs** (`/src/utils/common.ts`)
- Appliquer le **système de thème unifié**

### 2. **Réutilisation des Blocs**
```typescript
// Utiliser les blocs existants
const blocks = [
  { _type: 'heroBlock', ... },      // Bannière
  { _type: 'textBlock', ... },      // Contenu riche
  { _type: 'featureGridBlock', ... }, // Fonctionnalités
  { _type: 'contactBlock', ... },   // Contact
]
```

### 3. **Design et Hiérarchie**
- Respecter le **design system** existant
- Utiliser les **couleurs et espacements** standardisés
- Maintenir la **cohérence visuelle** avec les autres pages
- Appliquer les **patterns responsive** établis

### 4. **Documentation**
- Commenter le **code complexe**
- Documenter les **APIs créées**
- Mettre à jour le **README** si nécessaire
- Ajouter des **exemples d'utilisation**

---

## 🔧 Exemple Concret : Création d'une "Services Page"

### 1. **Analyse du README**
```
Objectif : Créer une page "/services" avec auto-génération
Structure : Suivre le pattern existant (/demo, /studio-showcase)
Blocs : Hero + Features + Contact
```

### 2. **Implémentation**

#### Fichier : `src/app/(website)/services/page.tsx`
```typescript
import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import ServicesContent from './ServicesContent'
import ClientPageContent from '../ClientPageContent'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Services - Sanity Next.js Boilerplate',
    description: 'Découvrez nos services de développement web avec Next.js et Sanity CMS.',
  }
}

export default async function ServicesPage() {
  try {
    const page = await client.fetch(pageBySlugQuery, { slug: 'services' })
    
    if (!page) {
      return <ServicesContent />
    }
    
    return <ClientPageContent page={page} />
  } catch (error) {
    return <ServicesContent />
  }
}
```

#### Fichier : `src/app/api/setup-services/route.ts`
```typescript
import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST() {
  try {
    const servicesPage = {
      _type: 'page',
      title: 'Services',
      slug: { current: 'services' },
      seoTitle: 'Services - Développement Web Professionnel',
      seoDescription: 'Services de développement web avec Next.js et Sanity CMS.',
      pageBuilder: [
        {
          _type: 'heroBlock',
          _key: 'services-hero',
          title: 'Nos Services',
          subtitle: 'Solutions de développement web modernes et performantes',
          backgroundSettings: {
            backgroundType: 'gradient',
            gradientSettings: {
              gradientType: 'preset',
              preset: 'ocean'
            }
          }
        },
        {
          _type: 'featureGridBlock',
          _key: 'services-features',
          title: 'Ce que nous proposons',
          gridLayout: '3-balanced',
          features: [
            {
              icon: 'code',
              title: 'Développement Web',
              description: 'Sites web modernes avec Next.js',
              iconColor: '#3b82f6'
            },
            {
              icon: 'database',
              title: 'CMS Sanity',
              description: 'Gestion de contenu intuitive',
              iconColor: '#10b981'
            },
            {
              icon: 'zap',
              title: 'Performance',
              description: 'Optimisation et vitesse',
              iconColor: '#f59e0b'
            }
          ]
        }
      ]
    }

    const result = await client.create(servicesPage)
    
    return NextResponse.json({ success: true, page: result })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
```

### 3. **Liaison au Système**
- Ajouter le lien dans la navigation principale
- Créer la page admin `/admin/services`
- Tester l'auto-génération
- Valider le rendu dans Studio

---

## 🎯 Objectif Final

### Critères de Réussite
✅ **Auto-implémentation autonome** : L'IA peut créer des pages sans intervention
✅ **Cohérence architecturale** : Respect des patterns existants
✅ **Reproductibilité** : Processus standardisé et documenté
✅ **Maintenabilité** : Code propre et évolutif

### Validation
1. **Fonctionnelle** : La page s'affiche correctement
2. **Technique** : Code conforme aux standards
3. **Studio** : Éditable dans Sanity Studio
4. **SEO** : Métadonnées correctes
5. **Responsive** : Adaptation mobile

---

## 📚 Ressources Complémentaires

- **README.md** : Documentation principale du projet
- **src/types/blocks.ts** : Types TypeScript centralisés
- **src/config/constants.ts** : Configuration centralisée
- **src/utils/common.ts** : Utilitaires partagés
- **Exemples existants** : `/demo`, `/studio-showcase`, `/admin`

---

*Ce manuel permet à l'IA Claude d'auto-implémenter des pages de manière autonome, cohérente et reproductible dans le système Sanity Next.js Boilerplate.*
