# 🚀 Sanity Next.js Professional Boilerplate

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Sanity](https://img.shields.io/badge/Sanity-4.12.0-red)](https://www.sanity.io/)
[![styled-components](https://img.shields.io/badge/styled--components-6.1.19-pink)](https://styled-components.com/)

Un boilerplate moderne combinant **Next.js 16** + **Sanity CMS** avec un système de **7 blocs modulaires**, thème unifié et normalisation des props pour créer des sites web professionnels rapidement.

## 📋 Table des Matières

- [🎯 Fonctionnalités](#-fonctionnalités)
- [⚡ Getting Started (5 minutes)](#-getting-started-5-minutes)
- [🏗️ Architecture](#️-architecture)
- [🧩 Système de Blocs](#-système-de-blocs)
- [🎨 Thème Unifié](#-thème-unifié)
- [🔧 Composants UI](#-composants-ui)
- [📜 Scripts](#-scripts)
- [🚀 Déploiement](#-déploiement)
- [🔧 Troubleshooting](#-troubleshooting)
- [❓ FAQ](#-faq)

## 🎯 Fonctionnalités

### Stack Technique
- **Next.js 16** (App Router + Turbopack)
- **React 19** (Server Components)
- **TypeScript 5** (strict mode)
- **styled-components 6** (CSS-in-JS)
- **Sanity CMS v4** (headless CMS)

### Système de Blocs
- **7 blocs universels** prêts à l'emploi
- **Auto-génération** de contenu
- **Normalisation des props** (gestion null/undefined)
- **Thème unifié** avec 18 dégradés + design tokens
- **Interface admin** intégrée

## ⚡ Getting Started (5 minutes)

### 1. Installation
```bash
git clone [URL_DU_REPO]
cd sanity-boilerplate
npm install
```

### 2. Configuration Sanity
```bash
npx sanity@latest init
# Suivre les instructions (créer compte, projet, dataset "production")
```

### 3. Variables d'environnement
```bash
cp env.example .env.local
```

Éditer `.env.local` :
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-editor-token  # NOTE: Créer avec scope "Editor"
```

### 4. Lancement
```bash
npm run dev
# Ouvrir http://localhost:3000
```

## 🏗️ Architecture

```
src/
├── app/                    # Next.js 16 App Router
│   ├── (website)/         # Routes publiques
│   │   └── [[...slug]]/   # Route dynamique principale
│   ├── (sanity)/          # Sanity Studio (/studio)
│   └── admin/             # Interface d'administration
├── components/
│   ├── BlockRenderer/     # Rendu dynamique des blocs
│   ├── blocks/           # 7 blocs Sanity
│   ├── layout/           # PageWrapper
│   └── ui/               # Composants réutilisables
├── sanity/
│   ├── schemas/blocks/   # Schémas des 7 blocs
│   ├── schemas/shared/   # themeFields.ts (système unifié)
│   └── lib/              # Client et requêtes GROQ
├── types/blocks.ts       # Types centralisés (source unique)
├── styles/
│   ├── brand.css         # Design tokens
│   └── theme-utilities.css
└── lib/theme-utils.ts    # Fonctions de thème
```

## 🧩 Système de Blocs

### 7 Blocs Disponibles

| Bloc | Description | Champs Essentiels |
|------|-------------|-------------------|
| 📝 **TextBlock** | Contenu riche | `content`, `alignment`, `maxWidth` |
| 🦸 **HeroBlock** | Sections héro | `title`, `subtitle`, `ctaButtons`, `backgroundSettings` |
| ⭐ **FeatureGridBlock** | Grilles fonctionnalités | `features[]`, `gridLayout`, `cardStyle` |
| 📞 **ContactBlock** | Formulaires | `formFields[]`, `submitButton`, `layout` |
| 🖼️ **GalleryBlock** | Galeries images | `images[]`, `layout`, `lightboxOptions` |
| 👥 **TeamBlock** | Équipes/témoignages | `teamMembers[]`, `blockType`, `socialLinks` |
| 📊 **StatsBlock** | Statistiques animées | `stats[]`, `animationSettings`, `layout` |

### Normalisation des Props (Anti-Erreurs)

**Problème** : Sanity peut envoyer `null/undefined`
**Solution** : Normalisation automatique dans tous les blocs

```typescript
// ✅ Pattern appliqué partout
const normalizedFormFields = formFields || []
const normalizedSubmitButton = submitButton || { text: 'Envoyer', loadingText: 'Envoi...' }
const normalizedImages = images?.filter(img => img?.asset) || []

// ✅ Clés React uniques
const uniqueKey = block._key ? `${block._key}-${index}` : `${block._type}-${index}`
```

### Créer un Nouveau Bloc

1. **Schéma** : `src/sanity/schemas/blocks/monBloc.ts`
2. **Composant** : `src/components/blocks/MonBloc/MonBloc.tsx`
3. **Types** : Ajouter dans `src/types/blocks.ts`
4. **Enregistrer** : `BlockRenderer` + `schemaTypes/index.ts`

## 🎨 Thème Unifié

### Design Tokens (brand.css)
```css
:root {
  /* Couleurs */
  --color-primary: #2563eb;
  --color-secondary: #10b981;
  
  /* Espacements */
  --spacing-4: 1rem;    /* 16px */
  --spacing-8: 2rem;    /* 32px */
  
  /* Typographie */
  --font-size-xl: 1.25rem;
  --font-weight-semibold: 600;
  
  /* Breakpoints */
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
}
```

### Styled Components (Convention $props)
```typescript
const StyledComponent = styled.div<{ $variant: string; $size: string }>`
  background-color: var(--color-primary);
  padding: var(--spacing-8);
  
  ${props => props.$variant === 'large' && css`
    font-size: var(--font-size-xl);
  `}
  
  @media (max-width: var(--breakpoint-md)) {
    padding: var(--spacing-4);
  }
`
```

### Backgrounds Avancés
- **18 dégradés prédéfinis** : ocean, sunset, fire, forest, etc.
- **Dégradés personnalisés** : 3 couleurs + 9 directions + radial
- **Images** : avec overlay configurable
- **Couleurs solides** : 20+ couleurs prédéfinies

### Utilisation
```typescript
import { applyTheme } from '@/lib/theme-utils'

const theme = applyTheme({
  backgroundSettings: {
    backgroundType: 'gradient',
    gradientSettings: { preset: 'ocean' }
  },
  styling: { alignment: 'center', spacing: 'large' }
})
```

## 🔧 Composants UI

### Imports Critiques (⚠️ Important)
```typescript
// ✅ TOUJOURS faire
import BlockRenderer from '@/components/BlockRenderer'
import type { Block } from '@/types/blocks'  // Source unique

// ❌ JAMAIS faire
import type { Block } from '@/components/BlockRenderer'  // Erreur!
```

### PageWrapper + BlockRenderer
```typescript
// Utilisation automatique
<PageWrapper pageSettings={page.pageSettings}>
  <BlockRenderer blocks={page.pageBuilder} />
</PageWrapper>
```

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Serveur développement (Turbopack) |
| `npm run build` | Build production |
| `npm run start` | Serveur production |
| `npm run demo:import` | Importer contenu démo |
| `npm run demo:reset` | Réinitialiser démo |

## 🚀 Déploiement

### Variables d'Environnement

| Variable | Requis | Description |
|----------|--------|-------------|
| `NEXT_PUBLIC_SITE_URL` | ✅ | URL publique (`https://monsite.com`) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | ID projet Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ | Dataset (`production`) |
| `SANITY_API_TOKEN` | ✅ | Token avec scope **Editor** |

### Vercel / Netlify
```bash
# Build command
npm run build

# Publish directory (Netlify)
.next
```

## 🔧 Troubleshooting

### Erreurs Runtime Communes

| Erreur | Cause | Solution |
|--------|-------|----------|
| `teamMembers is not iterable` | Prop `null` | `const normalized = teamMembers \|\| []` |
| `Cannot read properties of null (reading 'text')` | Objet `null` | `const normalized = submitButton \|\| { text: 'Default' }` |
| `Unable to resolve image URL from source (null)` | Image `null` | `if (!image?.asset) return null` |
| `Encountered two children with the same key` | Clés dupliquées | `key={block._key ? \`${block._key}-${index}\` : \`${block._type}-${index}\`}` |
| `ERR_NETWORK_CHANGED` | Serveur dev | `npm run dev` + Ctrl+Shift+R |

### Configuration Sanity
- **Token manquant** : Créer token avec permissions **Editor** dans Sanity Dashboard
- **CORS** : Configurer domaine dans Sanity Settings
- **Dataset** : Vérifier nom dans `.env.local`

## ❓ FAQ

**Q: Comment ajouter un bloc ?**
A: Schéma → Composant → Types → Enregistrer dans BlockRenderer

**Q: Override du thème ?**
A: Modifier `brand.css` ou utiliser `applyTheme()` avec nouvelles valeurs

**Q: Migration Tailwind ?**
A: Remplacer classes par styled-components + design tokens (`var(--spacing-4)`)

**Q: Performance Turbopack ?**
A: Hot reload 10x plus rapide, build optimisé, tree shaking automatique

**Q: SEO ?**
A: Métadonnées automatiques via `generateMetadata()` par page

---

## 🤝 Contribution

### Checklist
- [ ] Types TypeScript corrects
- [ ] styled-components uniquement (pas de Tailwind)
- [ ] Props normalisées (gestion null/undefined)
- [ ] Clés React uniques
- [ ] Tests visuels mobile

### Bonnes Pratiques
- **Imports** : `Block` depuis `@/types/blocks`
- **Styling** : Design tokens + `$props`
- **Images** : Vérifier `asset` avant `urlFor`
- **Props** : Normaliser systématiquement

---

**Sanity Next.js Professional Boilerplate** - Système moderne pour sites web professionnels avec Next.js 16 + Sanity CMS.
