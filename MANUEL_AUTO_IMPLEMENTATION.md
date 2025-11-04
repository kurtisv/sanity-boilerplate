# 📘 Manuel d'Auto-Implémentation Studio
> **Documentation technique interne pour l'IA Claude - Version 2024**

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

### 4. **Système de Thème Unifié**
```typescript
// ✅ Utiliser les dégradés prédéfinis (18 disponibles)
backgroundSettings: {
  backgroundType: 'gradient',
  gradientSettings: {
    gradientType: 'preset',
    preset: 'ocean', // ocean, sunset, fire, forest, etc.
    intensity: 100
  }
}

// ✅ Utiliser les icônes Lucide intégrées (60+ disponibles)
iconSettings: {
  iconType: 'emoji',
  iconEmoji: '🎯', // ou utiliser Lucide: 'zap', 'code', 'database'
  iconSize: 'large',
  iconColor: '#3b82f6'
}
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

## 📚 Ressources Complémentaires (2024)

### Fichiers Critiques
- **README.md** : Documentation principale (mise à jour avec 7 blocs)
- **src/types/blocks.ts** : Types des 7 blocs (source unique)
- **src/sanity/schemas/shared/themeFields.ts** : Système de thème unifié
- **src/styles/brand.css** : Design tokens centralisés
- **src/lib/theme-utils.ts** : Fonctions utilitaires de thème

### Exemples de Référence
- **Page Services** : `/services` (exemple dans ce manuel)
- **Page Démo** : `/demo` (tous les blocs en action)
- **Interface Admin** : `/admin/services` (auto-génération)

### Troubleshooting
- **Erreurs d'imports** : Consulter la section troubleshooting du README
- **Permissions Sanity** : Vérifier SANITY_API_TOKEN avec droits Editor
- **Blocs non reconnus** : Utiliser uniquement les 7 blocs disponibles

---

*Ce manuel permet à l'IA Claude d'auto-implémenter des pages de manière autonome, cohérente et reproductible dans le système Sanity Next.js Professional Boilerplate (Version 2024).*
