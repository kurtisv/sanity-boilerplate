# 🚀 Sanity + Next.js Professional Boilerplate

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![Sanity](https://img.shields.io/badge/Sanity-4.12-red?style=for-the-badge&logo=sanity)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)

**Un boilerplate moderne et professionnel pour créer des sites web performants avec un système de blocs universels**

[🚀 Démo](#démarrage-rapide) • [📖 Documentation](#documentation-complète) • [🎨 Studio](#sanity-studio) • [⚙️ Admin](#interface-dadministration)

</div>

---

## 📋 Table des Matières

- [Présentation](#-présentation-du-projet)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Commandes](#-commandes-utiles)
- [Utilisation](#-démarrage-et-utilisation)
- [Architecture](#-architecture-du-projet)
- [Modules](#-documentation-des-modules)
- [Blocs](#-système-de-blocs)
- [APIs](#-apis-dauto-génération)
- [Déploiement](#-déploiement)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Présentation du Projet

Ce boilerplate combine **Next.js 16** (avec React 19) et **Sanity CMS** pour offrir une solution complète de développement web moderne.

### 🎯 Fonctionnalités Principales

- 🧩 **9 Blocs Universels** - Hero, Features, Stats, Team, Contact, Gallery, Text, Header, Footer
- 🎨 **Système de Thème** - 18 dégradés prédéfinis + personnalisés 3 couleurs
- ✅ **14+ APIs** - Pages prêtes à l'emploi 100% conformes Sanity
- 🎯 **60+ Icônes** - Lucide React intégrées
- 🚀 **Performance** - Next.js 16 + React 19 avec React Compiler
- 📊 **SEO Avancé** - Métadonnées dynamiques, sitemap automatique
- 🔧 **TypeScript** - Code typé et sécurisé

---

## 🔧 Prérequis

| Outil | Version Minimale | Recommandé |
|-------|------------------|------------|
| **Node.js** | 18.x | 20.x+ |
| **npm** | 9.x | 10.x+ |
| **Git** | 2.x | Dernière |

**Compte Sanity** : Créez un compte gratuit sur [sanity.io](https://www.sanity.io/)

---

## 📦 Installation

### Étape 1 : Cloner le Projet

```bash
git clone https://github.com/votre-username/sanity-next-boilerplate.git
cd sanity-next-boilerplate
```

### Étape 2 : Installer les Dépendances

```bash
npm install
```

### Étape 3 : Créer un Projet Sanity

```bash
# Installer Sanity CLI
npm install -g @sanity/cli

# Se connecter
sanity login

# Créer un projet
sanity init
```

Notez votre **Project ID** et **Dataset** (généralement "production").

---

## ⚙️ Configuration

### Variables d'Environnement

```bash
# Copier le fichier d'exemple
cp env.example .env.local
```

Éditez `.env.local` :

```env
# URL publique
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Configuration Sanity (publique)
NEXT_PUBLIC_SANITY_PROJECT_ID=votre-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-30

# Token lecture (Viewer)
SANITY_API_READ_TOKEN=votre-read-token

# Token écriture (Editor) - requis pour auto-génération
SANITY_API_TOKEN=votre-write-token
```

### Obtenir les Tokens

1. Allez sur [sanity.io/manage](https://www.sanity.io/manage)
2. Sélectionnez votre projet → **API** → **Tokens**
3. Créez deux tokens :
   - **Read Token** : Permissions "Viewer"
   - **Write Token** : Permissions "Editor"

---

## 🎮 Commandes Utiles

```bash
# Développement
npm run dev                  # Démarrer le serveur (port 3000)

# Production
npm run build               # Build de production
npm run start               # Serveur de production

# Scripts de démo
npm run demo:import         # Importer le contenu de démo
npm run demo:setup          # Configurer la démo
npm run demo:reset          # Réinitialiser (force)
npm run fix:stats-keys      # Corriger les clés stats

# Nettoyage
rm -rf .next                # Nettoyer le cache Next.js
```

---

## 🚀 Démarrage et Utilisation

### Première Utilisation

```bash
# 1. Démarrer le serveur
npm run dev

# 2. Accéder au Studio Sanity
# http://localhost:3000/studio

# 3. Générer du contenu de démo
npm run demo:import
# OU via l'interface : http://localhost:3000/admin
```

### URLs Importantes

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Site principal |
| `http://localhost:3000/demo` | Page de démonstration |
| `http://localhost:3000/studio` | Sanity Studio (CMS) |
| `http://localhost:3000/admin` | Interface d'administration |

### Créer Votre Première Page

**Via Sanity Studio** :

1. Allez sur `/studio` → **Pages** → **Create**
2. Remplissez :
   - **Title** : Titre de la page
   - **Slug** : URL (ex: `about` → `/about`)
3. Ajoutez des blocs via le **Page Builder**
4. Cliquez sur **Publish**
5. Visitez `http://localhost:3000/votre-slug`

**Via API** :

```bash
# Créer une page "À Propos"
curl -X POST http://localhost:3000/api/setup-about

# Créer une page "Contact"
curl -X POST http://localhost:3000/api/setup-contact
```

---

## 🏗️ Architecture du Projet

### Structure Simplifiée

```
sanity-boilerplate/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (website)/         # Routes publiques
│   │   │   ├── [slug]/        # Pages dynamiques
│   │   │   └── demo/          # Page démo
│   │   ├── (sanity)/          # Sanity Studio
│   │   ├── admin/             # Interface admin
│   │   └── api/               # API Routes (14+ APIs)
│   │
│   ├── components/            # Composants React
│   │   ├── blocks/            # 9 blocs universels
│   │   ├── layout/            # Layout (Header, Footer)
│   │   └── BlockRenderer.tsx  # Rendu dynamique
│   │
│   ├── sanity/                # Configuration Sanity
│   │   ├── schemas/           # Schémas (blocs, pages)
│   │   ├── lib/               # Client, queries GROQ
│   │   └── structure.ts       # Structure Studio
│   │
│   ├── styles/                # Styles
│   ├── lib/                   # Utilitaires
│   └── types/                 # Types TypeScript
│
├── scripts/                   # Scripts Node.js
├── public/                    # Fichiers statiques
├── .env.local                 # Variables (non versionné)
├── env.example                # Exemple de variables
├── next.config.ts             # Config Next.js
├── sanity.config.ts           # Config Sanity
├── tsconfig.json              # Config TypeScript
└── package.json               # Dépendances
```

### Flux de Données

```
Utilisateur → Next.js → Sanity (GROQ) → BlockRenderer → Composants → Page
```

---

## 📚 Documentation des Modules

### 1. Sanity Client

**Fichier** : `src/sanity/lib/client.ts`

```typescript
import { client } from '@/sanity/lib/client'

// Récupérer des données
const data = await client.fetch(query, params)
```

### 2. Requêtes GROQ

**Fichier** : `src/sanity/lib/queries.ts`

```typescript
import { pageBySlugQuery } from '@/sanity/lib/queries'

// Récupérer une page
const page = await client.fetch(pageBySlugQuery, { slug: 'about' })
```

### 3. BlockRenderer

**Fichier** : `src/components/BlockRenderer.tsx`

```typescript
import BlockRenderer from '@/components/BlockRenderer'

// Rendre les blocs
<BlockRenderer blocks={page.blocks} />
```

### 4. Système de Thème

**Fichier** : `src/lib/theme-utils.ts`

```typescript
import { applyTheme } from '@/lib/theme-utils'

const theme = applyTheme({ backgroundSettings, styling })
// Utiliser theme.containerStyle et theme.containerClasses
```

### 5. APIs d'Auto-génération

**Exemple** : `src/app/api/setup-about/route.ts`

```typescript
// POST /api/setup-about
// Génère une page "À Propos" complète
```

---

## 🧩 Système de Blocs

### 1. Hero Block

**Type** : `heroBlock`

**Champs** :
- `title` : Titre (max 100 caractères)
- `subtitle` : Sous-titre (max 300 caractères)
- `ctaButtons` : Boutons CTA (max 3)
- `backgroundSettings` : Fond (couleur, dégradé, image)

**Exemple** :
```json
{
  "_type": "heroBlock",
  "title": "Bienvenue",
  "subtitle": "Découvrez nos services",
  "backgroundSettings": {
    "backgroundType": "gradient",
    "gradientPreset": "blue-purple"
  }
}
```

### 2. Feature Grid Block

**Type** : `featureGridBlock`

**Champs** :
- `title` : Titre
- `features` : Liste de fonctionnalités (max 12)
  - `iconType` : 'emoji' ou 'lucide'
  - `iconEmoji` : Emoji (si iconType = 'emoji')
  - `title` : Titre
  - `description` : Description
- `layout` : 'grid-2', 'grid-3', 'grid-4', 'list'

### 3. Stats Block

**Type** : `statsBlock`

**Champs** :
- `title` : Titre
- `stats` : Liste de statistiques (max 6)
  - `number` : Nombre (STRING, max 20 caractères)
  - `label` : Label
  - `icon` : Icône emoji

**⚠️ Important** : `number` doit être une STRING, pas un Number !

### 4. Team Block

**Type** : `teamBlock`

**Champs** :
- `title` : Titre
- `displayType` : 'team', 'advisors', 'leadership'
- `layout` : 'grid', 'list', 'carousel'
- `gridColumns` : 2, 3, 4
- `members` : Liste des membres
  - `name` : Nom
  - `position` : Poste (pas "role" !)
  - `bio` : Biographie
  - `photo` : Photo

### 5. Contact Block

**Type** : `contactBlock`

**Champs** :
- `title` : Titre
- `formFields` : Champs du formulaire
  - `fieldType` : Type de champ (voir ci-dessous)
  - `label` : Label
  - `required` : Obligatoire
  - `width` : 'half' ou 'full'

**Types de champs valides** :
- `name` : Nom
- `email` : Email
- `phone` : Téléphone
- `company` : Entreprise
- `subject` : Sujet
- `message` : Message court
- `textarea` : Message long
- `url` : URL
- `custom` : Personnalisé

**❌ Types invalides** : `text`, `tel`, `select` (n'existent pas !)

### 6. Gallery Block

**Type** : `galleryBlock`

**Champs** :
- `title` : Titre
- `images` : Liste d'images
- `layout` : 'grid', 'masonry', 'carousel'

### 7. Text Block

**Type** : `textBlock`

**Champs** :
- `title` : Titre optionnel
- `content` : Contenu riche (Portable Text)
- `alignment` : 'left', 'center', 'right'

### 8. Header Block

**Type** : `headerBlock`

En-tête du site avec logo et navigation.

### 9. Footer Block

**Type** : `footerBlock`

Pied de page avec liens et informations.

---

## 🔄 APIs d'Auto-génération

**14+ APIs disponibles** pour générer des pages complètes :

| API | Description |
|-----|-------------|
| `/api/import-demo` | Page de démonstration |
| `/api/setup-about` | Page À Propos |
| `/api/setup-contact` | Page Contact |
| `/api/setup-services` | Page Services |
| `/api/setup-careers` | Page Carrières |
| `/api/setup-blog` | Page Blog |
| `/api/setup-faq` | Page FAQ |
| `/api/setup-legal` | Mentions Légales |
| `/api/setup-pricing` | Page Tarifs |
| `/api/setup-portfolio` | Portfolio |
| `/api/import-home` | Page Home |
| `/api/setup-contact-simple` | Contact simplifié |
| `/api/setup-studio-showcase` | Vitrine Studio |

**Utilisation** :

```bash
# Via curl
curl -X POST http://localhost:3000/api/setup-about

# Via fetch JavaScript
fetch('/api/setup-about', { method: 'POST' })
  .then(res => res.json())
  .then(data => console.log(data))
```

---

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Configurer les variables d'environnement dans Vercel Dashboard
```

### Variables d'environnement à configurer :

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN`
- `SANITY_API_TOKEN`

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## 🔧 Troubleshooting

### Erreur : "Missing environment variable"

**Solution** : Vérifiez que `.env.local` existe et contient toutes les variables.

```bash
cp env.example .env.local
# Éditez .env.local avec vos valeurs
```

### Erreur : "Invalid field name _key"

**Cause** : Vous avez défini `_key` dans un schéma Sanity.

**Solution** : Sanity génère automatiquement les `_key`. Ne les définissez jamais dans les schémas.

### Erreur : "fieldType 'text' is not valid"

**Cause** : Type de champ invalide dans `contactBlock`.

**Solution** : Utilisez uniquement les types valides : `name`, `email`, `phone`, `company`, `subject`, `message`, `textarea`, `url`, `custom`.

### Erreur : "number must be a string"

**Cause** : Dans `statsBlock`, `number` est un Number au lieu d'une String.

**Solution** :
```typescript
// ❌ Incorrect
number: 500

// ✅ Correct
number: '500'
```

### Le Studio ne s'affiche pas

**Solution** :
```bash
# Nettoyer le cache
rm -rf .next
npm run dev
```

### Les images ne s'affichent pas

**Vérifiez** : `next.config.ts` contient :
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
    },
  ],
}
```

### Erreur de build TypeScript

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 Licence

MIT License - Libre d'utilisation pour vos projets personnels et commerciaux.

---

## 🤝 Support

- **Documentation Sanity** : [sanity.io/docs](https://www.sanity.io/docs)
- **Documentation Next.js** : [nextjs.org/docs](https://nextjs.org/docs)
- **Issues** : Ouvrez une issue sur GitHub

---

**Créé avec ❤️ par votre équipe de développement**
