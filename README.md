# Sanity + Next.js Boilerplate

A production-ready, enterprise-grade boilerplate for building dynamic websites and web applications with **Sanity CMS** and **Next.js**. This boilerplate implements a **block-based page builder** architecture that allows content managers to create rich, dynamic pages without writing code.

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

## 📋 Référence Rapide des Paramètres

### Paramètres du Site (Configuration Globale)

| Paramètre | Type | Utilité | Valeur par défaut |
|-----------|------|---------|-------------------|
| **Header** |
| `logo` | Image | Logo de votre site | - |
| `layout` | split/center/left | Disposition des éléments | `split` |
| `navigationMenu` | Array | Menu principal de navigation | - |
| `cta` | Object | Bouton d'appel à l'action | - |
| `backgroundColor` | HEX | Couleur de fond du header | `#ffffff` |
| `textColor` | HEX | Couleur du texte du header | `#000000` |
| **Footer** |
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
| **TextBlock** | Contenu riche avec éditeur visuel | Alignement, Largeur, Couleur fond, Espacement |

### 💡 Exemples d'Utilisation Pratiques

#### Créer un Menu de Navigation avec Sous-menu
```javascript
// Dans Sanity Studio → Paramètres du site → Header → Navigation Menu
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

#### Empêcher l'Indexation d'une Page de Test
```javascript
// Dans Page → Onglet Avancé
noIndex: true  // Active <meta name="robots" content="noindex">
// Utilisé pour: pages en construction, pages de remerciement, pages internes
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

## 📁 Project Structure

```
sanity-boilerplate/
├── public/                      # Static assets
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (sanity)/           # Route group for Sanity Studio
│   │   │   ├── studio/         # Sanity Studio at /studio
│   │   │   └── layout.tsx      # Studio-specific layout
│   │   ├── (website)/          # Route group for public website
│   │   │   ├── [[...slug]]/    # Catch-all dynamic routes
│   │   │   │   └── page.tsx    # Dynamic page renderer
│   │   │   └── layout.tsx      # Website layout (Header/Footer)
│   │   ├── favicon.ico
│   │   └── globals.css         # Global CSS reset
│   │
│   ├── components/
│   │   ├── BlockRenderer/      # Dynamic block rendering system
│   │   │   ├── BlockRenderer.tsx
│   │   │   └── index.ts
│   │   ├── blocks/             # Content blocks (page builder components)
│   │   │   └── TextBlock/      # Rich text block component
│   │   │       ├── TextBlock.tsx
│   │   │       ├── TextBlock.styles.ts
│   │   │       └── index.ts
│   │   ├── common/             # Reusable UI components
│   │   └── layout/             # Layout components
│   │       ├── Header/
│   │       └── Footer/
│   │
│   ├── sanity/                 # Sanity CMS configuration
│   │   ├── env.ts              # Environment variables
│   │   ├── lib/                # Sanity utilities
│   │   │   ├── client.ts       # Sanity API client
│   │   │   ├── image.ts        # Image URL builder
│   │   │   ├── queries.ts      # GROQ queries
│   │   │   └── live.ts         # Real-time updates
│   │   ├── schemas/            # Content schemas
│   │   │   ├── page.ts         # Page document schema
│   │   │   ├── blocks/         # Block schemas
│   │   │   │   └── textBlock.ts
│   │   │   └── settings/       # Global settings
│   │   │       ├── headerSettings.ts
│   │   │       └── footerSettings.ts
│   │   ├── schemaTypes/        # Schema registry
│   │   │   └── index.ts
│   │   └── structure.ts        # Studio structure
│   │
│   └── styles/
│       └── brand.css           # Design tokens (CSS variables)
│
├── sanity.config.ts            # Sanity Studio configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

---

## 🧩 How It Works: The Block System

### Concept

The boilerplate uses a **Block-Based Architecture** where:

1. **Content Managers** add content blocks in Sanity Studio
2. **Blocks** are modular components (TextBlock, HeroBlock, etc.)
3. **BlockRenderer** dynamically renders the correct component based on block type
4. **Pages** are composed of multiple blocks in any order

### Data Flow

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
│  HeroBlock      │
│  ImageBlock     │
└─────────────────┘
```

### Example: How a Page Renders

1. **User visits** `yoursite.com/about`

2. **Page component** fetches data:
```typescript
const pageData = await client.fetch(pageBySlugQuery, { slug: 'about' })
// Returns: { title: "About", pageBuilder: [{ _type: 'textBlock', content: [...] }] }
```

3. **BlockRenderer** receives blocks:
```typescript
<BlockRenderer blocks={pageData.pageBuilder} />
```

4. **Switch statement** selects component:
```typescript
switch (block._type) {
  case 'textBlock':
    return <TextBlock {...block} />
}
```

5. **TextBlock** renders content:
```typescript
<PortableText value={content} components={customComponents} />
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm
- A Sanity account (free at [sanity.io](https://sanity.io))

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd sanity-boilerplate
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-30
```

Get your Project ID from:
- Sanity Dashboard: https://www.sanity.io/manage
- Or run: `npx sanity init` in your project

4. **Run the development server**
```bash
npm run dev
```

5. **Access the applications**
- **Website**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio

---

## 📝 What's Been Built

### ✅ Core Infrastructure

#### 1. **Sanity Integration**
- Sanity client configuration
- GROQ queries for fetching data
- Image CDN integration
- Real-time updates support

#### 2. **Next.js App Router Setup**
- Route groups for Studio vs Website
- Dynamic catch-all routing
- Server and client component patterns
- Styled Components integration

#### 3. **Design System**
- CSS custom properties (design tokens)
- Responsive spacing system
- Color palette
- Typography scale
- Brand variables in `src/styles/brand.css`

### ✅ Content Models (Schemas)

#### 1. **Paramètres du Site** (`src/sanity/schemas/siteSettings.ts`)
Document singleton pour la configuration globale du site (Header & Footer).

##### Section Header
- **`logo`** (Image)
  - Logo affiché dans l'en-tête
  - Support hotspot pour recadrage intelligent
  
- **`layout`** (Choix: split | center | left)
  - `split`: Logo à gauche, menu à droite (par défaut)
  - `center`: Tous les éléments centrés
  - `left`: Tous les éléments alignés à gauche
  
- **`navigationMenu`** (Array d'objets)
  - **`title`**: Texte du lien (requis)
  - **`link`**: URL ou slug (ex: `/about`) (requis)
  - **`submenu`**: Menu déroulant optionnel (array d'objets)
    - **`title`**: Texte du sous-lien
    - **`link`**: URL du sous-lien
  
- **`cta`** (Objet - optionnel)
  - **`text`**: Texte du bouton d'action
  - **`link`**: URL du bouton
  
- **`backgroundColor`** (String HEX)
  - Couleur de fond du header (défaut: `#ffffff`)
  
- **`textColor`** (String HEX)
  - Couleur du texte du header (défaut: `#000000`)

##### Section Footer
- **`text`** (Texte)
  - Description ou texte principal du footer
  
- **`columns`** (Array de colonnes)
  - **`title`**: Titre de la colonne
  - **`links`**: Array de liens
    - **`title`**: Texte du lien
    - **`link`**: URL du lien
  
- **`socialLinks`** (Objet)
  - **`facebook`**: URL Facebook
  - **`twitter`**: URL Twitter/X
  - **`instagram`**: URL Instagram
  - **`linkedin`**: URL LinkedIn
  - **`youtube`**: URL YouTube
  
- **`copyrightText`** (String)
  - Texte de copyright (ex: "© 2025 Tous droits réservés")
  
- **`backgroundColor`** (String HEX)
  - Couleur de fond du footer (défaut: `#111827`)
  
- **`textColor`** (String HEX)
  - Couleur du texte du footer (défaut: `#ffffff`)

#### 2. **Page Schema** (`src/sanity/schemas/page.ts`)
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
2. **Paramètres du Site**: Cliquez sur "Paramètres du site"
3. **Configurer le Header**:
   - Uploadez votre logo
   - Choisissez la disposition (split/center/left)
   - Ajoutez les liens de navigation avec `+` dans "Menu de navigation"
   - (Optionnel) Ajoutez un bouton CTA
   - Personnalisez les couleurs de fond et texte
4. **Configurer le Footer**:
   - Rédigez le texte descriptif
   - Organisez vos liens en colonnes
   - Ajoutez les URLs de réseaux sociaux
   - Définissez le texte de copyright
   - Personnalisez les couleurs
5. **Publier**: Cliquez sur "Publish"

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

For questions or issues:
- Check existing documentation files
- Review the TextBlock implementation as a reference
- Consult Sanity and Next.js official docs

---

**Built with ❤️ using Next.js and Sanity CMS**
