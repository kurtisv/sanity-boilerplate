# 🚀 Sanity + Next.js Professional Boilerplate

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Sanity](https://img.shields.io/badge/Sanity-CMS-red?style=for-the-badge&logo=sanity)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**Un boilerplate moderne et professionnel pour créer des sites web performants**

[🚀 Voir la Démo](http://localhost:3000/demo) • [📖 Documentation](#documentation) • [🎨 Studio](http://localhost:3000/studio) • [⚙️ Administration](http://localhost:3000/admin/demo)

</div>

---

## ✨ **Aperçu du Projet**

Ce boilerplate combine **Next.js 16** et **Sanity CMS** pour offrir une solution complète de développement web moderne. Il propose un système de blocs universels, une interface d'administration intuitive et un design professionnel prêt pour la production.

### 🎯 **Fonctionnalités Principales**

- 🏗️ **Système de Blocs Universels** - 8 blocs prêts à l'emploi (Hero, Stats, Features, Contact, etc.)
- 🎨 **Design Professionnel** - Interface moderne avec Tailwind CSS et design system
- 🚀 **Import Automatique** - Interface d'administration pour importer la démo en un clic
- 📱 **100% Responsive** - Design adaptatif mobile-first
- ⚡ **Performance Optimisée** - Next.js 16 avec App Router et Server Components
- 🔧 **TypeScript Complet** - Sécurité de type sur tout le projet
- 📊 **SEO Avancé** - Métadonnées dynamiques et optimisation automatique
- 🎪 **Thèmes Personnalisables** - Système de design cohérent et extensible

## 🚀 **Démarrage Rapide**

### **Prérequis**

- Node.js 18+ 
- npm ou yarn
- Compte Sanity (gratuit)

### **Installation**

```bash
# 1. Cloner le projet
git clone https://github.com/votre-username/sanity-next-boilerplate.git
cd sanity-next-boilerplate

# 2. Installer les dépendances
npm install

# 3. Configuration Sanity
npm run sanity:init

# 4. Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos informations Sanity

# 5. Démarrer le serveur de développement
npm run dev
```

### **Configuration Automatique de la Démo**

```bash
# Option 1: Interface web (recommandé)
# Allez sur http://localhost:3000/admin/demo

# Option 2: Script en ligne de commande
npm run demo:setup

# Option 3: Import simple
npm run demo:import
```

### **URLs Importantes**

- 🏠 **Site principal** : `http://localhost:3000`
- 📋 **Page de démo** : `http://localhost:3000/demo`
- 🎨 **Sanity Studio** : `http://localhost:3000/studio`
- ⚙️ **Administration** : `http://localhost:3000/admin/demo`

---

## 🧩 **Blocs Universels Inclus**

| Bloc | Icône | Description | Fonctionnalités |
|------|-------|-------------|-----------------|
| **HeroBlock** | 🦸 | Bannière principale | Gradients, boutons multiples, layouts |
| **StatsBlock** | 📊 | Statistiques animées | Compteurs, animations, graphiques |
| **FeatureGridBlock** | ⭐ | Grille de fonctionnalités | Icônes, descriptions, layouts flexibles |
| **TextBlock** | 📝 | Contenu riche | Portable Text, listes, formatage |
| **GalleryBlock** | 🖼️ | Galerie d'images | Lightbox, filtres, masonry |
| **TeamBlock** | 👥 | Équipe et témoignages | Photos, réseaux sociaux, compétences |
| **ContactBlock** | 📧 | Formulaire de contact | Validation, layouts, configuration |
| **HeaderBlock** | 🎯 | En-tête de site | Logo, navigation, CTA |
| **FooterBlock** | 🦶 | Pied de page | Liens, réseaux sociaux, colonnes |

---

## 🏗️ **Architecture Technique**

### **Stack Technologique**

```
Frontend:
├── Next.js 16 (App Router)
├── React 19
├── TypeScript 5
├── Tailwind CSS
└── Styled Components

Backend:
├── Sanity CMS
├── GROQ (requêtes)
└── Sanity Studio

Outils:
├── ESLint + Prettier
├── Husky (Git hooks)
└── Scripts d'automatisation
```

### **Structure du Projet**

```
src/
├── app/                    # App Router Next.js
│   ├── (website)/         # Routes du site
│   ├── (sanity)/          # Sanity Studio
│   ├── admin/             # Interface d'administration
│   └── api/               # API Routes
├── components/            # Composants React
│   ├── blocks/           # Blocs universels
│   ├── layout/           # Header, Footer
│   └── ui/               # Composants UI
├── sanity/               # Configuration Sanity
│   ├── schemas/          # Schémas de contenu
│   ├── lib/              # Client et utilitaires
│   └── structure.ts      # Structure du Studio
├── styles/               # Styles globaux
└── hooks/                # Hooks personnalisés
```

## 📖 **Guide d'Utilisation**

### **1. Créer une Nouvelle Page**

1. Allez sur `http://localhost:3000/studio`
2. Cliquez sur **"Pages"** dans le menu
3. Cliquez sur **"Create new Page"**
4. Remplissez les informations de base :
   - **Titre** : Le nom de votre page
   - **Slug** : L'URL de la page (ex: `about-us`)
   - **Description SEO** : Pour le référencement

### **2. Ajouter des Blocs**

1. Dans l'éditeur de page, cliquez sur **"Add item"** dans la section Page Builder
2. Choisissez le type de bloc souhaité
3. Configurez le contenu et les options
4. Prévisualisez en temps réel
5. Publiez quand vous êtes satisfait

### **3. Personnaliser le Design**

#### **Couleurs et Thème**
```css
/* src/styles/design-system.css */
:root {
  --color-primary: #1e40af;        /* Votre couleur principale */
  --color-secondary: #64748b;      /* Couleur secondaire */
  --font-family-primary: 'Inter';  /* Police principale */
}
```

#### **Ajouter un Nouveau Bloc**
```typescript
// 1. Créer le schéma Sanity
// src/sanity/schemas/blocks/monNouveauBlock.ts

// 2. Créer le composant React
// src/components/blocks/MonNouveauBlock.tsx

// 3. L'ajouter au BlockRenderer
// src/components/BlockRenderer.tsx
```

---

## 🔧 **Scripts Disponibles**

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Construit l'application pour la production |
| `npm run start` | Démarre le serveur de production |
| `npm run demo:import` | Importe la démo automatiquement |
| `npm run demo:setup` | Configuration complète de la démo |
| `npm run demo:reset` | Remet à zéro et réimporte la démo |

---

## 🚀 **Déploiement**

### **Vercel (Recommandé)**

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Déployer
vercel

# 3. Configurer les variables d'environnement sur Vercel
# NEXT_PUBLIC_SANITY_PROJECT_ID
# NEXT_PUBLIC_SANITY_DATASET
# SANITY_API_TOKEN (pour les webhooks)
```

### **Netlify**

```bash
# 1. Build du projet
npm run build

# 2. Déployer le dossier .next
# Configurer les variables d'environnement dans Netlify
```

---

## 🛠️ **Personnalisation Avancée**

### **Ajouter un Nouveau Type de Contenu**

1. **Créer le schéma Sanity** :
```typescript
// src/sanity/schemas/monType.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'monType',
  title: 'Mon Type',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required()
    })
  ]
})
```

2. **L'enregistrer** :
```typescript
// src/sanity/schemaTypes/index.ts
import monType from './schemas/monType'

export const schemaTypes = [monType, /* autres schémas */]
```

### **Personnaliser Sanity Studio**

```typescript
// src/sanity/structure.ts
export const structure = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title('Mon Type')
        .child(S.documentTypeList('monType'))
    ])
```

---

## 🐛 **Dépannage**

### **Problèmes Courants**

**Erreur : "SANITY_API_TOKEN manquant"**
```bash
# Solution : Créer un token API sur sanity.io/manage
# L'ajouter dans .env.local
SANITY_API_TOKEN=sk_test_votre_token
```

**Erreur d'hydratation React**
```bash
# Solution : Vérifier que les composants utilisent 'use client'
# pour les styled-components et hooks
```

**Page de démo vide**
```bash
# Solution : Importer la démo
npm run demo:import
# ou via l'interface : http://localhost:3000/admin/demo
```

---

# Documentation Française

## 🎯 Qu'est-ce que ce Boilerplate?

Il s'agit d'une **solution CMS headless** qui sépare la gestion du contenu de la présentation :

- **Sanity Studio** : Un CMS personnalisable pour créer et éditer du contenu
- **Frontend Next.js** : Un framework React moderne qui affiche le contenu
- **Système de blocs** : Une architecture modulaire où les pages sont construites à partir de blocs de contenu réutilisables

### Conçu pour :

- **Équipes marketing** qui ont besoin de créer des landing pages, articles de blog et contenu marketing
- **Développeurs** qui veulent une base de code évolutive et maintenable avec des patterns clairs
- **Agences** qui construisent des sites clients avec des éditeurs non techniques
- **Startups** nécessitant une itération rapide sur le contenu sans déploiements de code

---

## 🧩 **Blocs Disponibles**

### 🦸 **Hero Block**
Bannière principale avec titre, sous-titre, CTA et image de fond
- **8 tailles** : petit, moyen, grand, plein écran
- **3 styles de boutons** : primary, secondary, ghost
- **Alignements** : horizontal et vertical configurables
- **Superposition** : couleur personnalisable sur image

### 🎯 **FeatureGrid Block**
Grille de fonctionnalités avec icônes et descriptions
- **8 layouts** : 2-col, 3-col, 4-col, 2x2, asymétriques, masonry, liste
- **5 styles de cartes** : minimal, bordure, ombre, coloré, glassmorphism
- **4 styles d'icônes** : simple, cercle, carré, dégradé
- **28 icônes emoji** : ⭐ ❤️ ⚡ 🛡️ 🚀 🌍 👥 ⚙️ et plus

### 📝 **TextBlock**
Bloc de contenu riche avec Portable Text
- **Éditeur WYSIWYG** : gras, italique, listes, liens
- **Images intégrées** avec légendes
- **3 alignements** : gauche, centre, droite
- **Largeurs** : étroite, normale, large, pleine

## 📋 **Référence Rapide des Paramètres**

### Paramètres Header (Document headerSettings)

| Paramètre | Type | Utilité | Valeur par défaut |
|-----------|------|---------|-------------------|
| `logoType` | image/text | Type de logo (image ou texte) | `image` |
| `logo` | Image | Logo image de votre site | - |
| `logoText` | String | Texte du logo (si logoType=text) | - |
| `navigationMenu` | Array | Menu principal de navigation | - |
| `cta` | Object | Bouton d'appel à l'action | - |
| `backgroundColor` | HEX | Couleur de fond du header | `#ffffff` |
| `textColor` | HEX | Couleur du texte du header | `#000000` |

### Paramètres Footer (Document footerSettings)

| Paramètre | Type | Utilité | Valeur par défaut |
|-----------|------|---------|-------------------|
| `text` | Text | Texte descriptif du footer | - |
| `columns` | Array | Colonnes de liens organisés | - |
| `socialLinks` | Object | Liens réseaux sociaux | - |
| `copyrightText` | String | Texte de copyright | - |
| `backgroundColor` | HEX | Couleur de fond du footer | `#111827` |
| `textColor` | HEX | Couleur du texte du footer | `#ffffff` |

### Paramètres de Page

| Onglet | Paramètre | Type | Utilité | Requis |
|--------|-----------|------|---------|--------|
| **Contenu** |
| | `title` | String | Titre de la page | ✅ |
| | `slug` | Slug | URL de la page | ✅ |
| | `pageBuilder` | Array | Blocs de contenu | - |
| **SEO** |
| | `seoTitle` | String | Titre pour Google (60 car.) | - |
| | `seoDescription` | Text | Description pour Google (160 car.) | - |
| | `seoImage` | Image | Image partage social (1200x630) | - |
| | `seoKeywords` | Tags | Mots-clés pour référencement | - |
| **Avancé** |
| | `customCss` | Text | CSS personnalisé page | - |
| | `customJs` | Text | JavaScript personnalisé page | - |
| | `noIndex` | Boolean | Empêcher indexation Google | false |
| | `publishedAt` | DateTime | Date de publication | - |

### Blocs de Contenu Disponibles

| Bloc | Description | Options Principales |
|------|-------------|-------------------|
| **HeroBlock** | Bannière principale avec CTA | 4 tailles, 3 styles boutons, alignements, image fond |
| **FeatureGridBlock** | Grille de fonctionnalités | 8 layouts, 5 styles cartes, 28 icônes emoji |
| **TextBlock** | Contenu riche avec éditeur visuel | Alignement, Largeur, Couleur fond, Espacement |

## 🌐 **Mode Preview Intégré**

Prévisualisez vos modifications avant publication !

### Configuration
```bash
# Variables d'environnement requises
SANITY_API_READ_TOKEN=sk_test_xxx  # Token avec permissions de lecture
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Utilisation
1. **Dans Sanity Studio** : Cliquez sur "Aperçu" sur n'importe quel document
2. **URL générée** : `http://localhost:3000/api/preview?slug=ma-page&secret=mon-secret`
3. **Mode activé** : Bannière de preview apparaît avec lien de sortie
4. **Contenu live** : Voir les brouillons et modifications en temps réel

### API Routes
- `/api/preview` : Active le mode preview
- `/api/exit-preview` : Désactive le mode preview

### 💡 Exemples d'Utilisation Pratiques

#### Créer un Menu de Navigation avec Sous-menu
```javascript
// Dans Sanity Studio → Header Settings → Navigation Menu
{
  title: "Services",
  link: "/services",
  submenu: [
    { title: "Web Design", link: "/services/web-design" },
    { title: "SEO", link: "/services/seo" },
    { title: "Marketing", link: "/services/marketing" }
  ]
}
```

#### Optimiser le SEO d'une Page
```javascript
// Dans Page → Onglet SEO
seoTitle: "Services Web Design à Montréal | Votre Entreprise"  // 55 caractères
seoDescription: "Découvrez nos services de web design professionnels. 
  Créations modernes, responsive et optimisées SEO. Devis gratuit."  // 132 caractères
seoImage: [Image 1200x630px avec texte visible]
seoKeywords: ["web design", "montréal", "création site web"]
```

#### Styliser un TextBlock pour une Section Hero
```javascript
// Options de mise en page du TextBlock
alignment: "center"
maxWidth: "wide"
backgroundColor: "#1e3a8a"  // Bleu foncé
paddingSize: "large"

// Le texte sera centré, large, avec fond bleu et espacement généreux
```

#### Créer un Hero Block Impactant
```javascript
// Configuration Hero Block
title: "Transformez votre présence digitale"
subtitle: "Créez des sites web modernes qui convertissent vos visiteurs en clients"
cta: {
  text: "Commencer maintenant",
  link: "/contact",
  style: "primary"
}
height: "large"
textAlignment: "center"
backgroundImage: [Image haute résolution]
backgroundOverlay: { enabled: true, color: "rgba(0, 0, 0, 0.4)" }
```

#### Configurer une FeatureGrid 3 Colonnes
```javascript
// Configuration FeatureGrid
title: "Pourquoi nous choisir ?"
gridLayout: "3-balanced"
cardStyle: "shadow"
iconStyle: "circle"
features: [
  {
    icon: "rocket",      // 🚀
    title: "Performance",
    description: "Sites ultra-rapides optimisés pour le SEO",
    iconColor: "#3b82f6"
  },
  {
    icon: "shield",      // 🛡️
    title: "Sécurité",
    description: "Protection avancée contre les menaces",
    iconColor: "#10b981"
  },
  {
    icon: "users",       // 👥
    title: "Support 24/7",
    description: "Équipe dédiée à votre succès",
    iconColor: "#f59e0b"
  }
]
```

#### Empêcher l'Indexation d'une Page de Test
```javascript
// Dans Page → Onglet Avancé
noIndex: true  // Active <meta name="robots" content="noindex">
// Utilisé pour: pages en construction, pages de remerciement, pages internes
```

---

## 🏗️ Architecture Technique

### Stack Technologique

```
┌─────────────────────────────────────────────────┐
│                 Next.js 16                       │
│              (App Router + RSC)                  │
├─────────────────────────────────────────────────┤
│  React 19  │  TypeScript  │  Styled Components  │
├─────────────────────────────────────────────────┤
│              Sanity CMS v4                       │
│         (Plateforme de contenu headless)         │
├─────────────────────────────────────────────────┤
│       Portable Text (Format texte riche)        │
│       @sanity/image-url (CDN d'images)          │
└─────────────────────────────────────────────────┘
```

### Technologies Principales

| Technologie | Version | Utilité |
|------------|---------|---------|
| **Next.js** | 16.0.1 | Framework React avec App Router, SSR et optimisations |
| **React** | 19.2.0 | Bibliothèque UI avec React Compiler activé |
| **Sanity** | 4.12.0 | CMS headless avec collaboration en temps réel |
| **TypeScript** | 5.x | Sécurité des types et expérience développeur |
| **Styled Components** | 6.1.19 | Styling CSS-in-JS avec encapsulation des composants |
| **@portabletext/react** | 4.0.3 | Rendu de texte riche pour le contenu Sanity |

---

## 📁 Structure du Projet

```
sanity-boilerplate/
├── public/                      # Ressources statiques
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (sanity)/           # Groupe de routes pour Sanity Studio
│   │   │   ├── studio/         # Sanity Studio à /studio
│   │   │   └── layout.tsx      # Layout spécifique au Studio
│   │   ├── (website)/          # Groupe de routes pour le site public
│   │   │   ├── [[...slug]]/    # Routes dynamiques catch-all
│   │   │   │   └── page.tsx    # Rendu de page dynamique
│   │   │   └── layout.tsx      # Layout du site (Header/Footer)
│   │   ├── favicon.ico
│   │   └── globals.css         # CSS global reset
│   │
│   ├── components/
│   │   ├── BlockRenderer/      # Système de rendu dynamique des blocs
│   │   │   ├── BlockRenderer.tsx
│   │   │   └── index.ts
│   │   ├── blocks/             # Blocs de contenu (composants page builder)
│   │   │   └── TextBlock/      # Composant bloc de texte riche
│   │   │       ├── TextBlock.tsx
│   │   │       ├── TextBlock.styles.ts
│   │   │       └── index.ts
│   │   ├── common/             # Composants UI réutilisables
│   │   └── layout/             # Composants de layout
│   │       ├── Header/
│   │       └── Footer/
│   │
│   ├── sanity/                 # Configuration Sanity CMS
│   │   ├── env.ts              # Variables d'environnement
│   │   ├── lib/                # Utilitaires Sanity
│   │   │   ├── client.ts       # Client API Sanity
│   │   │   ├── image.ts        # Constructeur d'URL d'images
│   │   │   ├── queries.ts      # Requêtes GROQ
│   │   │   └── live.ts         # Mises à jour en temps réel
│   │   ├── schemas/            # Schémas de contenu
│   │   │   ├── page.ts         # Schéma document de page
│   │   │   ├── blocks/         # Schémas de blocs
│   │   │   │   ├── textBlock.ts
│   │   │   │   ├── heroBlock.ts
│   │   │   │   ├── featureGridBlock.ts
│   │   │   │   ├── headerBlock.ts
│   │   │   │   └── footerBlock.ts
│   │   │   └── settings/       # Paramètres globaux
│   │   │       ├── headerSettings.ts
│   │   │       └── footerSettings.ts
│   │   ├── schemaTypes/        # Registre des schémas
│   │   │   └── index.ts
│   │   └── structure.ts        # Structure du Studio
│   │
│   └── styles/
│       └── brand.css           # Design tokens (variables CSS)
│
├── sanity.config.ts            # Configuration Sanity Studio
├── next.config.ts              # Configuration Next.js
├── tsconfig.json               # Configuration TypeScript
└── package.json                # Dépendances
```

---

## 🧩 Comment ça Fonctionne : Le Système de Blocs

### Concept

Ce boilerplate utilise une **Architecture Basée sur les Blocs** où :

1. **Les gestionnaires de contenu** ajoutent des blocs de contenu dans Sanity Studio
2. **Les blocs** sont des composants modulaires (TextBlock, HeroBlock, etc.)
3. **BlockRenderer** rend dynamiquement le bon composant selon le type de bloc
4. **Les pages** sont composées de plusieurs blocs dans n'importe quel ordre

### Flux de Données

```
┌─────────────────┐
│  Sanity Studio  │ ← Content managers create pages
└────────┬────────┘
         │
         ↓ (Saves to Sanity Cloud)
┌─────────────────┐
│  Sanity CMS     │
└────────┬────────┘
         │
         ↓ (GROQ Query via API)
┌─────────────────┐
│  Next.js Page   │ ← Fetches page data
└────────┬────────┘
         │
         ↓ (Passes blocks array)
┌─────────────────┐
│ BlockRenderer   │ ← Switches on block._type
└────────┬────────┘
         │
         ↓ (Renders specific component)
┌─────────────────┐
│  TextBlock      │ ← Displays content
│  HeroBlock      │ ← Hero banners
│  FeatureGrid    │ ← Feature grids
└─────────────────┘
```

### Exemple : Comment une Page est Rendue

1. **L'utilisateur visite** `votresite.com/about`

2. **Le composant Page** récupère les données :
```typescript
const pageData = await client.fetch(pageBySlugQuery, { slug: 'about' })
// Returns: { title: "About", pageBuilder: [{ _type: 'textBlock', content: [...] }] }
```

3. **BlockRenderer** reçoit les blocs :
```typescript
<BlockRenderer blocks={pageData.pageBuilder} />
```

4. **L'instruction switch** sélectionne le composant :
```typescript
switch (block._type) {
  case 'textBlock':
    return <TextBlock {...block} />
}
```

5. **TextBlock** rend le contenu :
```typescript
<PortableText value={content} components={customComponents} />
```

---

## 🚀 Démarrage

### Prérequis

- Node.js 18+ installé
- npm, yarn, ou pnpm
- Un compte Sanity (gratuit sur [sanity.io](https://sanity.io))

### Installation

1. **Cloner le repository**
```bash
git clone <your-repo-url>
cd sanity-boilerplate
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

Créer un fichier `.env.local` :
```bash
# Configuration Sanity (Obligatoire)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-30

# Mode Preview (Optionnel mais recommandé)
SANITY_API_READ_TOKEN=sk_test_xxxxx  # Token avec permissions de lecture
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Production (Optionnel)
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

**Obtenir votre configuration Sanity :**
- **Projet ID** : Tableau de bord Sanity → https://www.sanity.io/manage
- **Read Token** : Sanity Dashboard → API → Tokens → "Add API token"
  - Nom : "Preview Token"  
  - Permissions : "Viewer"

4. **Lancer le serveur de développement**
```bash
npm run dev
```

5. **Accéder aux applications**
- **Site web** : http://localhost:3000
- **Sanity Studio** : http://localhost:3000/studio

---

## 📝 Ce qui a été Construit

### ✅ Infrastructure de Base

#### 1. **Intégration Sanity**
- Configuration du client Sanity
- Requêtes GROQ pour récupérer les données
- Intégration CDN d'images
- Support des mises à jour en temps réel

#### 2. **Configuration Next.js App Router**
- Groupes de routes pour Studio vs Site web
- Routage dynamique catch-all
- Server and client component patterns
- Styled Components integration

#### 3. **Design System**
- CSS custom properties (design tokens)
- Responsive spacing system
- Color palette
- Typography scale
- Brand variables in `src/styles/brand.css`

### ✅ Content Models (Schemas)

#### 1. **Header Settings** (`src/sanity/schemas/settings/headerSettings.ts`)
Document pour la configuration de l'en-tête du site.

- **`logoType`** (Choix: image | text)
  - Type de logo à afficher
  
- **`logo`** (Image - si logoType=image)
  - Logo image avec support hotspot
  
- **`logoText`** (String - si logoType=text)
  - Texte du logo comme alternative à l'image
  
- **`navigationMenu`** (Array d'objets)
  - **`title`**: Texte du lien (requis)
  - **`link`**: URL ou slug (requis)
  - **`submenu`**: Menu déroulant optionnel
  
- **`cta`** (Objet - optionnel)
  - **`text`**: Texte du bouton d'action
  - **`link`**: URL du bouton
  
- **`backgroundColor`** / **`textColor`** (String HEX)
  - Couleurs personnalisables

#### 2. **Footer Settings** (`src/sanity/schemas/settings/footerSettings.ts`)
Document pour la configuration du pied de page.

- **`text`** (Texte)
  - Description principale du footer
  
- **`columns`** (Array de colonnes)
  - **`title`**: Titre de la colonne
  - **`links`**: Array de liens avec titre et URL
  
- **`socialLinks`** (Objet)
  - Liens vers réseaux sociaux (Facebook, Twitter, Instagram, LinkedIn, YouTube)
  
- **`copyrightText`** (String)
  - Texte de copyright
  
- **`backgroundColor`** / **`textColor`** (String HEX)
  - Couleurs personnalisables

#### 3. **Page Schema** (`src/sanity/schemas/page.ts`)
Document principal pour créer des pages dynamiques avec constructeur de blocs.

##### Onglet Contenu
- **`title`** (String - requis)
  - Titre de la page affiché dans le Studio
  
- **`slug`** (Slug - requis)
  - URL de la page (généré automatiquement depuis le titre)
  - Modifiable manuellement si nécessaire
  - Max 96 caractères
  
- **`pageBuilder`** (Array de blocs)
  - Constructeur visuel pour assembler la page
  - Blocs disponibles: TextBlock (extensible)
  - Drag & drop pour réorganiser les blocs

##### Onglet SEO
- **`seoTitle`** (String)
  - Titre affiché dans les résultats Google (max 60 caractères)
  - Si vide, utilise le titre de la page
  
- **`seoDescription`** (Text)
  - Description pour les résultats de recherche (max 160 caractères)
  - Améliore le taux de clic (CTR)
  
- **`seoImage`** (Image)
  - Image Open Graph pour les partages sociaux
  - Recommandé: 1200x630px
  
- **`seoKeywords`** (Array de strings - tags)
  - Mots-clés pour référencement interne
  - Format tags pour faciliter la saisie

##### Onglet Avancé
- **`customCss`** (Text)
  - CSS spécifique à cette page uniquement
  - Utile pour styles exceptionnels
  
- **`customJs`** (Text)
  - JavaScript personnalisé pour cette page
  - Ex: scripts de suivi, widgets tiers
  
- **`noIndex`** (Boolean - défaut: false)
  - Empêche l'indexation par Google
  - Active la balise `<meta name="robots" content="noindex">`
  
- **`publishedAt`** (DateTime)
  - Date de publication de la page
  - Utilisable pour tri chronologique

#### 3. **TextBlock Schema** (`src/sanity/schemas/blocks/textBlock.ts`)
Bloc de contenu riche pour le constructeur de pages.

**Fonctionnalités de l'éditeur:**
- Titres (H1, H2, H3, H4)
- Styles de texte (gras, italique, souligné, code)
- Listes (ordonnées et non-ordonnées)
- Citations (blockquotes)
- Liens (avec option "nouvel onglet")
- Images inline (avec alt text et légende)

**Options de mise en page:**
- **`alignment`**: left | center | right
- **`maxWidth`**: narrow | medium | wide | full
- **`backgroundColor`**: Couleur de fond HEX
- **`paddingSize`**: small | medium | large

### ✅ Components

#### 1. **BlockRenderer** (`src/components/BlockRenderer/`)
The heart of the block system.

**Purpose**: Dynamically renders blocks based on their `_type`.

**Code Pattern:**
```typescript
export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case 'textBlock':
            return <TextBlock key={block._key} {...block} />
          // Add more cases here
          default:
            return null
        }
      })}
    </>
  )
}
```

#### 2. **TextBlock Component** (`src/components/blocks/TextBlock/`)
A fully-featured rich text block with Portable Text rendering.

**Features:**
- Renders all Sanity Portable Text formats
- Custom styled components for each element
- Image optimization via Sanity CDN
- Responsive design
- Accessibility compliant

**Props:**
- `content`: Portable Text array
- `alignment`: 'left' | 'center' | 'right'
- `maxWidth`: 'narrow' | 'medium' | 'wide' | 'full'
- `backgroundColor`: CSS color value
- `paddingSize`: 'small' | 'medium' | 'large'

#### 3. **Layout Components**
- **Header**: Responsive navigation with mobile menu
- **Footer**: Multi-column footer with links

---

## 🛠️ How to Create New Components

### Step-by-Step Guide

#### Step 1: Create the Sanity Schema

Create a new schema file in `src/sanity/schemas/blocks/`:

```typescript
// src/sanity/schemas/blocks/heroBlock.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text' },
        { name: 'link', type: 'url', title: 'Button Link' },
      ],
    }),
  ],
})
```

#### Step 2: Register the Schema

Add to `src/sanity/schemaTypes/index.ts`:

```typescript
import heroBlock from '../schemas/blocks/heroBlock'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // ... existing types
    heroBlock,  // Add your new block
  ],
}
```

Add to page builder in `src/sanity/schemas/page.ts`:

```typescript
defineField({
  name: 'pageBuilder',
  type: 'array',
  of: [
    { type: 'textBlock' },
    { type: 'heroBlock' },  // Add here
  ],
})
```

#### Step 3: Create the React Component

Create component files in `src/components/blocks/HeroBlock/`:

**HeroBlock.tsx:**
```typescript
'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import * as S from './HeroBlock.styles'

type HeroBlockProps = {
  title: string
  subtitle?: string
  backgroundImage?: any
  ctaButton?: {
    text: string
    link: string
  }
}

export default function HeroBlock({
  title,
  subtitle,
  backgroundImage,
  ctaButton,
}: HeroBlockProps) {
  return (
    <S.Container>
      {backgroundImage && (
        <S.BackgroundImage>
          <Image
            src={urlFor(backgroundImage).width(1920).url()}
            alt={backgroundImage.alt || ''}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </S.BackgroundImage>
      )}
      <S.Content>
        <S.Title>{title}</S.Title>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
        {ctaButton && (
          <S.CTAButton href={ctaButton.link}>
            {ctaButton.text}
          </S.CTAButton>
        )}
      </S.Content>
    </S.Container>
  )
}
```

**HeroBlock.styles.ts:**
```typescript
import styled from 'styled-components'

export const Container = styled.section`
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

export const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }
`

export const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-white);
  max-width: 800px;
  padding: var(--spacing-16) var(--spacing-6);
`

export const Title = styled.h1`
  font-size: var(--font-size-6xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-6);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-4xl);
  }
`

export const Subtitle = styled.p`
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-8);
  line-height: var(--line-height-relaxed);
`

export const CTAButton = styled.a`
  display: inline-block;
  padding: var(--spacing-4) var(--spacing-8);
  background: var(--color-primary);
  color: var(--color-white);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--border-radius-lg);
  transition: transform var(--transition-base);
  
  &:hover {
    transform: translateY(-2px);
    background: var(--color-primary-dark);
  }
`
```

**index.ts:**
```typescript
export { default } from './HeroBlock'
```

#### Step 4: Add to BlockRenderer

Update `src/components/BlockRenderer/BlockRenderer.tsx`:

```typescript
import TextBlock from '@/components/blocks/TextBlock/TextBlock'
import HeroBlock from '@/components/blocks/HeroBlock/HeroBlock'  // Import

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case 'textBlock':
            return <TextBlock key={block._key} {...block} />
          case 'heroBlock':  // Add case
            return <HeroBlock key={block._key} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
```

#### Step 5: Update GROQ Query (if needed)

If your block needs special data fetching, update `src/sanity/lib/queries.ts`:

```typescript
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    pageBuilder[] {
      _type,
      _key,
      _type == 'textBlock' => {
        // ... textBlock fields
      },
      _type == 'heroBlock' => {
        title,
        subtitle,
        backgroundImage {
          asset->{
            _id,
            url
          },
          alt
        },
        ctaButton
      }
    },
    // ... rest of query
  }
`
```

---

## 🤖 Prompting AI to Build Components

### Effective AI Prompts

When working with AI assistants (like Claude, ChatGPT, etc.) to build components, use this pattern:

#### Template Prompt:

```
I need you to create a [BLOCK_NAME] component for my Sanity + Next.js boilerplate.

Context:
- This boilerplate uses Sanity CMS for content management
- Frontend is Next.js 16 with App Router
- Styling with Styled Components
- Block-based page builder architecture

Requirements:
1. Create Sanity schema in src/sanity/schemas/blocks/[blockName].ts
2. Create React component in src/components/blocks/[BlockName]/
3. Include styled components file
4. Follow existing patterns (see TextBlock as reference)

The block should have:
- [Field 1]: [description]
- [Field 2]: [description]
- [Feature 1]: [description]

Design requirements:
- [Responsive behavior]
- [Styling preferences]
- [Accessibility needs]

Please ensure:
- TypeScript types are properly defined
- Component is marked with 'use client' if it uses hooks
- Follows the existing architectural patterns
- Includes proper error handling
```

#### Example Real Prompt:

```
I need you to create a FeatureGrid component for my Sanity + Next.js boilerplate.

Context:
- This boilerplate uses Sanity CMS for content management
- Frontend is Next.js 16 with App Router
- Styling with Styled Components
- Block-based page builder architecture

Requirements:
1. Create Sanity schema in src/sanity/schemas/blocks/featureGrid.ts
2. Create React component in src/components/blocks/FeatureGrid/
3. Include styled components file
4. Follow existing patterns (see TextBlock as reference)

The block should have:
- Section title (optional)
- Array of features, each with:
  - Icon (image upload)
  - Title (string)
  - Description (text)
  - Optional link
- Layout options: 2, 3, or 4 columns
- Background color option

Design requirements:
- Responsive: 1 column on mobile, 2 on tablet, configurable on desktop
- Card-based design with hover effects
- Icons should be circular and consistent size
- Center-aligned content

Please ensure:
- TypeScript types are properly defined
- Component is marked with 'use client' if needed
- Follows the existing architectural patterns
- Uses CSS custom properties from brand.css
```

### What AI Should Output:

1. **Sanity Schema** - Complete schema with all fields and validation
2. **Component File** - TypeScript React component with props interface
3. **Styles File** - Styled components following design system
4. **Integration Code** - Code snippets for BlockRenderer and queries
5. **Usage Instructions** - How to use the block in Sanity Studio

---

## 🎨 Design System

### CSS Custom Properties

All design tokens are centralized in `src/styles/brand.css`:

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-secondary: #10b981;
  --color-gray-900: #111827;
  
  /* Typography */
  --font-size-base: 1rem;
  --font-size-xl: 1.25rem;
  --font-weight-bold: 700;
  
  /* Spacing */
  --spacing-4: 1rem;
  --spacing-8: 2rem;
  --spacing-16: 4rem;
  
  /* Breakpoints */
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
}
```

### Using Design Tokens:

```typescript
export const Title = styled.h1`
  font-size: var(--font-size-5xl);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-6);
  
  @media (max-width: var(--breakpoint-md)) {
    font-size: var(--font-size-3xl);
  }
`
```

---

## 📊 Content Management Workflow

### Pour les Gestionnaires de Contenu:

#### Configuration Initiale du Site

1. **Accéder au Studio**: Allez sur `/studio`
2. **Configurer le Header**: Cliquez sur "Header Settings"
   - Choisissez le type de logo (image ou texte)
   - Uploadez votre logo ou saisissez le texte
   - Ajoutez les liens de navigation avec `+` dans "Menu de navigation"
   - (Optionnel) Ajoutez un bouton CTA
   - Personnalisez les couleurs de fond et texte
   - Cliquez sur "Publish"
3. **Configurer le Footer**: Cliquez sur "Footer Settings"
   - Rédigez le texte descriptif
   - Organisez vos liens en colonnes
   - Ajoutez les URLs de réseaux sociaux
   - Définissez le texte de copyright
   - Personnalisez les couleurs
   - Cliquez sur "Publish"

#### Créer une Nouvelle Page

1. **Créer**: Cliquez sur "Page" → "Create new"
2. **Onglet Contenu**:
   - Saisissez le titre (le slug se génère automatiquement)
   - Ajoutez des blocs via "Page Builder"
   - Cliquez sur `+` pour ajouter un TextBlock
   - Réorganisez avec drag & drop
3. **Onglet SEO** (recommandé):
   - Titre SEO optimisé (60 caractères max)
   - Description accrocheuse (160 caractères max)
   - Image pour partages sociaux
   - Mots-clés pertinents
4. **Onglet Avancé** (optionnel):
   - CSS/JS personnalisés si nécessaire
   - Cochez "Ne pas indexer" pour pages temporaires
5. **Publier**: Cliquez sur "Publish"

#### Modifier un Bloc TextBlock

1. Dans le constructeur de page, cliquez sur un TextBlock
2. **Éditez le contenu**:
   - Utilisez la barre d'outils pour formater (gras, italique, etc.)
   - Ajoutez des liens avec l'icône de lien
   - Insérez des images depuis l'éditeur
   - Créez des listes avec les icônes dédiées
3. **Options de mise en page**:
   - **Alignement**: Gauche, centré ou droite
   - **Largeur max**: Étroit (prose), Moyen, Large, Pleine largeur
   - **Couleur de fond**: Code HEX (ex: `#f3f4f6`)
   - **Espacement**: Small (compact), Medium, Large (aéré)
4. **Sauvegarder**: Les modifications sont auto-sauvegardées

### Pour les Développeurs:

1. **Définir le schéma**: Créer le schema dans `src/sanity/schemas/blocks/`
2. **Construire le composant**: Créer le composant React dans `src/components/blocks/`
3. **Enregistrer le bloc**: Ajouter au switch du BlockRenderer
4. **Mettre à jour les requêtes**: Ajouter les champs au GROQ query
5. **Tester**: Créer une page de test dans le Studio

---

## 🔍 Key Patterns & Best Practices

### 1. **Component Pattern**

```typescript
// All blocks follow this structure:
'use client'  // Only if using hooks/client features

import * as S from './BlockName.styles'

type BlockNameProps = {
  // Props match Sanity schema fields
}

export default function BlockName(props: BlockNameProps) {
  // Component logic
  return (
    <S.Container>
      {/* JSX */}
    </S.Container>
  )
}
```

### 2. **Sanity Schema Pattern**

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blockName',  // Unique identifier
  title: 'Block Name',  // Display name in Studio
  type: 'object',  // Always 'object' for blocks
  fields: [
    defineField({
      name: 'fieldName',
      title: 'Field Label',
      type: 'string',  // or 'text', 'image', 'array', etc.
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    // How block appears in Studio list
  },
})
```

### 3. **Styled Components Pattern**

```typescript
import styled from 'styled-components'

// Use $ prefix for transient props
export const Container = styled.section<{ $bgColor?: string }>`
  background-color: ${props => props.$bgColor || 'transparent'};
  // Always use CSS custom properties
  padding: var(--spacing-16) var(--spacing-6);
  
  // Mobile-first responsive design
  @media (max-width: 768px) {
    padding: var(--spacing-8) var(--spacing-4);
  }
`
```

### 4. **GROQ Query Pattern**

```typescript
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    pageBuilder[] {
      _type,
      _key,
      // Conditional fields based on block type
      _type == 'blockName' => {
        field1,
        field2,
        // Expand image references
        imageField {
          asset->{
            _id,
            url
          }
        }
      }
    }
  }
`
```

---

## 🚦 Development Workflow

### Daily Development

```bash
# Start dev server (both Next.js and Sanity Studio)
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Adding a New Block

1. Create schema → `src/sanity/schemas/blocks/`
2. Register schema → `src/sanity/schemaTypes/index.ts`
3. Add to page builder → `src/sanity/schemas/page.ts`
4. Create component → `src/components/blocks/`
5. Add to renderer → `src/components/BlockRenderer/`
6. Update query → `src/sanity/lib/queries.ts`
7. Test in Studio

### Modifying Existing Blocks

1. Update schema (be careful with breaking changes)
2. Update component props/logic
3. Update GROQ query if fields changed
4. Test with existing content

---

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Portable Text](https://github.com/portabletext/portabletext)
- [Styled Components](https://styled-components.com/docs)

### Helpful Files
- `TEXTBLOCK_USAGE.md` - Detailed TextBlock usage guide
- `SETUP.md` - Environment setup and troubleshooting

---

## 🤝 Contributing

When contributing new blocks or features:

1. Follow existing patterns and conventions
2. Use TypeScript for type safety
3. Add proper validation in Sanity schemas
4. Include responsive designs (mobile-first)
5. Use design tokens from `brand.css`
6. Test in Sanity Studio before committing
7. Document new features in README

---

## 📞 Support

Pour toute question ou problème:
- Consultez les fichiers de documentation existants
- Examinez l'implémentation du TextBlock comme référence
- Consultez la documentation officielle de Sanity et Next.js

---

**🇫🇷 [Documentation en Français](#documentation-française) | 🇬🇧 [English Documentation](#english-documentation)**

**Construit avec ❤️ en utilisant Next.js et Sanity CMS**

---
---
---

# English Documentation

**🇬🇧 [English Documentation](#english-documentation) | 🇫🇷 [Documentation en Français](#documentation-française)**

---

## 🎯 What Is This Boilerplate?

This is a **headless CMS solution** that separates content management from presentation:

- **Sanity Studio**: A customizable CMS for content managers to create and edit content
- **Next.js Frontend**: A modern React framework that renders the content
- **Block System**: A modular architecture where pages are built from reusable content blocks

### Built For:

- **Marketing teams** who need to create landing pages, blog posts, and marketing content
- **Developers** who want a scalable, maintainable codebase with clear patterns
- **Agencies** building client websites with non-technical content editors
- **Startups** needing rapid iteration on content without code deployments

---

## 📋 Quick Parameters Reference

### Header Settings (headerSettings document)

| Parameter | Type | Purpose | Default Value |
|-----------|------|---------|---------------|
| `logoType` | image/text | Logo type (image or text) | `image` |
| `logo` | Image | Logo image | - |
| `logoText` | String | Logo text (if logoType=text) | - |
| `navigationMenu` | Array | Main navigation menu | - |
| `cta` | Object | Call-to-action button | - |
| `backgroundColor` | HEX | Header background color | `#ffffff` |
| `textColor` | HEX | Header text color | `#000000` |

### Footer Settings (footerSettings document)

| Parameter | Type | Purpose | Default Value |
|-----------|------|---------|---------------|
| `text` | Text | Footer descriptive text | - |
| `columns` | Array | Organized link columns | - |
| `socialLinks` | Object | Social media links | - |
| `copyrightText` | String | Copyright text | - |
| `backgroundColor` | HEX | Footer background color | `#111827` |
| `textColor` | HEX | Footer text color | `#ffffff` |

### Page Parameters

| Tab | Parameter | Type | Purpose | Required |
|-----|-----------|------|---------|----------|
| **Content** |
| | `title` | String | Page title | ✅ |
| | `slug` | Slug | Page URL | ✅ |
| | `pageBuilder` | Array | Content blocks | - |
| **SEO** |
| | `seoTitle` | String | Google title (60 chars) | - |
| | `seoDescription` | Text | Google description (160 chars) | - |
| | `seoImage` | Image | Social sharing image (1200x630) | - |
| | `seoKeywords` | Tags | Keywords for SEO | - |
| **Advanced** |
| | `customCss` | Text | Page-specific CSS | - |
| | `customJs` | Text | Page-specific JavaScript | - |
| | `noIndex` | Boolean | Prevent Google indexing | false |
| | `publishedAt` | DateTime | Publication date | - |

### Available Content Blocks

| Block | Description | Main Options |
|-------|-------------|-------------|
| **TextBlock** | Rich content with visual editor | Alignment, Width, Background color, Padding |

### 💡 Practical Usage Examples

#### Create Navigation Menu with Submenu
```javascript
// In Sanity Studio → Header Settings → Navigation Menu
{
  title: "Services",
  link: "/services",
  submenu: [
    { title: "Web Design", link: "/services/web-design" },
    { title: "SEO", link: "/services/seo" },
    { title: "Marketing", link: "/services/marketing" }
  ]
}
```

#### Optimize Page SEO
```javascript
// In Page → SEO Tab
seoTitle: "Web Design Services in Montreal | Your Company"  // 55 characters
seoDescription: "Discover our professional web design services. 
  Modern, responsive and SEO-optimized creations. Free quote."  // 132 characters
seoImage: [Image 1200x630px with visible text]
seoKeywords: ["web design", "montreal", "website creation"]
```

#### Style a TextBlock for Hero Section
```javascript
// TextBlock layout options
alignment: "center"
maxWidth: "wide"
backgroundColor: "#1e3a8a"  // Dark blue
paddingSize: "large"

// Text will be centered, wide, with blue background and generous spacing
```

#### Prevent Indexing for Test Page
```javascript
// In Page → Advanced Tab
noIndex: true  // Activates <meta name="robots" content="noindex">
// Used for: pages under construction, thank you pages, internal pages
```

---

## 🏗️ Architecture Overview

### Tech Stack

```
┌─────────────────────────────────────────────────┐
│                 Next.js 16                       │
│              (App Router + RSC)                  │
├─────────────────────────────────────────────────┤
│  React 19  │  TypeScript  │  Styled Components  │
├─────────────────────────────────────────────────┤
│              Sanity CMS v4                       │
│         (Headless Content Platform)              │
├─────────────────────────────────────────────────┤
│       Portable Text (Rich Text Format)          │
│       @sanity/image-url (Image CDN)             │
└─────────────────────────────────────────────────┘
```

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.1 | React framework with App Router, SSR, and optimization |
| **React** | 19.2.0 | UI library with React Compiler enabled |
| **Sanity** | 4.12.0 | Headless CMS with real-time collaboration |
| **TypeScript** | 5.x | Type safety and developer experience |
| **Styled Components** | 6.1.19 | CSS-in-JS styling with component encapsulation |
| **@portabletext/react** | 4.0.3 | Rich text rendering for Sanity content |

---

## 📊 Content Management Workflow

### For Content Managers:

#### Initial Site Configuration

1. **Access Studio**: Go to `/studio`
2. **Configure Header**: Click on "Header Settings"
   - Choose logo type (image or text)
   - Upload your logo or enter text
   - Add navigation links with `+` in "Navigation Menu"
   - (Optional) Add a CTA button
   - Customize background and text colors
   - Click "Publish"
3. **Configure Footer**: Click on "Footer Settings"
   - Write descriptive text
   - Organize your links in columns
   - Add social media URLs
   - Define copyright text
   - Customize colors
   - Click "Publish"

#### Create a New Page

1. **Create**: Click "Page" → "Create new"
2. **Content Tab**:
   - Enter the title (slug auto-generates)
   - Add blocks via "Page Builder"
   - Click `+` to add a TextBlock
   - Reorder with drag & drop
3. **SEO Tab** (recommended):
   - Optimized SEO title (60 characters max)
   - Catchy description (160 characters max)
   - Image for social sharing
   - Relevant keywords
4. **Advanced Tab** (optional):
   - Custom CSS/JS if needed
   - Check "No index" for temporary pages
5. **Publish**: Click "Publish"

#### Edit a TextBlock

1. In page builder, click on a TextBlock
2. **Edit content**:
   - Use toolbar to format (bold, italic, etc.)
   - Add links with link icon
   - Insert images from editor
   - Create lists with dedicated icons
3. **Layout options**:
   - **Alignment**: Left, center, or right
   - **Max width**: Narrow (prose), Medium, Large, Full width
   - **Background color**: HEX code (ex: `#f3f4f6`)
   - **Padding**: Small (compact), Medium, Large (airy)
4. **Save**: Changes are auto-saved

### For Developers:

1. **Define schema**: Create schema in `src/sanity/schemas/blocks/`
2. **Build component**: Create React component in `src/components/blocks/`
3. **Register block**: Add to BlockRenderer switch
4. **Update queries**: Add fields to GROQ query
5. **Test**: Create test page in Studio

---

## 📞 Support

For questions or issues:
- Check existing documentation files
- Review the TextBlock implementation as a reference
- Consult Sanity and Next.js official docs

---

**🇬🇧 [English Documentation](#english-documentation) | 🇫🇷 [Documentation en Français](#documentation-française)**

**Built with ❤️ using Next.js and Sanity CMS**
