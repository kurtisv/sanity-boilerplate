# 📁 Fichiers Importants du Projet

Ce document liste tous les fichiers clés du projet avec leur rôle et leur importance.

---

## 🔧 Configuration Racine

### `package.json`
**Rôle** : Gestion des dépendances et scripts npm  
**Importance** : ⭐⭐⭐⭐⭐  
**Contenu clé** :
- Dépendances : Next.js 16, React 19, Sanity 4.12, TypeScript 5
- Scripts : `dev`, `build`, `start`, `demo:import`

### `.env.local` (non versionné)
**Rôle** : Variables d'environnement sensibles  
**Importance** : ⭐⭐⭐⭐⭐  
**Variables requises** :
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `SANITY_API_READ_TOKEN`

### `env.example`
**Rôle** : Template des variables d'environnement  
**Importance** : ⭐⭐⭐⭐  
**Usage** : Copier vers `.env.local` et remplir les valeurs

### `next.config.ts`
**Rôle** : Configuration Next.js  
**Importance** : ⭐⭐⭐⭐  
**Contenu clé** :
- React Compiler activé
- Styled Components configuré
- Images Sanity CDN autorisées

### `sanity.config.ts`
**Rôle** : Configuration Sanity Studio  
**Importance** : ⭐⭐⭐⭐⭐  
**Contenu clé** :
- basePath: `/studio`
- Plugins : structureTool, visionTool
- Import des schémas

### `tsconfig.json`
**Rôle** : Configuration TypeScript  
**Importance** : ⭐⭐⭐⭐  
**Contenu clé** :
- Alias `@/*` → `./src/*`
- Mode strict activé
- JSX : react-jsx

---

## 🎨 Sanity - Configuration

### `src/sanity/env.ts`
**Rôle** : Variables d'environnement Sanity  
**Importance** : ⭐⭐⭐⭐⭐  
**Exports** : `projectId`, `dataset`, `apiVersion`

### `src/sanity/structure.ts`
**Rôle** : Structure du Sanity Studio  
**Importance** : ⭐⭐⭐⭐  
**Contenu** : Organisation des sections du Studio

### `src/sanity/schemas/index.ts`
**Rôle** : Export de tous les schémas Sanity  
**Importance** : ⭐⭐⭐⭐⭐  
**Contenu** : 14 schémas (pages, blocs, settings)

---

## 📄 Sanity - Schémas de Documents

### `src/sanity/schemas/page.ts`
**Rôle** : Schéma de page principale  
**Importance** : ⭐⭐⭐⭐⭐  
**Champs** :
- `title`, `slug`, `seo`
- `blocks[]` : Constructeur de page
- `pageStyles` : Styles globaux

### `src/sanity/schemas/blockContent.ts`
**Rôle** : Contenu riche (Portable Text)  
**Importance** : ⭐⭐⭐⭐  
**Usage** : Texte formaté dans les blocs

### `src/sanity/schemas/siteSettings.ts`
**Rôle** : Paramètres globaux du site  
**Importance** : ⭐⭐⭐  
**Champs** : Titre, description, logo, réseaux sociaux

---

## 🧩 Sanity - Schémas de Blocs

### `src/sanity/schemas/blocks/heroBlock.ts`
**Rôle** : Schéma du bloc Hero  
**Importance** : ⭐⭐⭐⭐⭐  
**Champs** : title, subtitle, ctaButtons, backgroundSettings

### `src/sanity/schemas/blocks/featureGridBlock.ts`
**Rôle** : Schéma du bloc Features  
**Importance** : ⭐⭐⭐⭐  
**Champs** : title, features[], layout

### `src/sanity/schemas/blocks/contactBlock.ts`
**Rôle** : Schéma du bloc Contact  
**Importance** : ⭐⭐⭐⭐  
**Champs** : title, formFields[], contactInfo

### `src/sanity/schemas/blocks/statsBlock.ts`
**Rôle** : Schéma du bloc Stats  
**Importance** : ⭐⭐⭐  
**Champs** : title, stats[], layout

### `src/sanity/schemas/blocks/teamBlock.ts`
**Rôle** : Schéma du bloc Team  
**Importance** : ⭐⭐⭐  
**Champs** : title, members[], displayType, layout

### `src/sanity/schemas/blocks/galleryBlock.ts`
**Rôle** : Schéma du bloc Gallery  
**Importance** : ⭐⭐⭐  
**Champs** : title, images[], layout

### `src/sanity/schemas/blocks/textBlock.ts`
**Rôle** : Schéma du bloc Text  
**Importance** : ⭐⭐⭐⭐  
**Champs** : title, content (Portable Text)

### `src/sanity/schemas/blocks/headerBlock.ts`
**Rôle** : Schéma du bloc Header  
**Importance** : ⭐⭐⭐  
**Champs** : logo, navigation, ctaButton

### `src/sanity/schemas/blocks/footerBlock.ts`
**Rôle** : Schéma du bloc Footer  
**Importance** : ⭐⭐⭐  
**Champs** : columns, socialLinks, copyright

---

## 🎨 Sanity - Champs Partagés

### `src/sanity/schemas/shared/themeFields.ts`
**Rôle** : Système de thème unifié  
**Importance** : ⭐⭐⭐⭐⭐  
**Exports** :
- `colorOptions` : 20+ couleurs prédéfinies
- `gradientOptions` : 18 dégradés
- `backgroundSettingsField` : Gestion des fonds
- `stylingField` : Styles d'apparence
- Fonctions : `getThemeFields()`, `getBasicStyleFields()`

### `src/sanity/schemas/shared/commonFields.ts`
**Rôle** : Champs communs réutilisables  
**Importance** : ⭐⭐⭐  
**Contenu** : Champs partagés entre plusieurs schémas

---

## 🔍 Sanity - Bibliothèque

### `src/sanity/lib/client.ts`
**Rôle** : Client Sanity pour les requêtes  
**Importance** : ⭐⭐⭐⭐⭐  
**Exports** :
- `client` : Client principal
- `clientFetch` : Fonction de requête

### `src/sanity/lib/queries.ts`
**Rôle** : Requêtes GROQ prédéfinies  
**Importance** : ⭐⭐⭐⭐⭐  
**Exports** :
- `pageBySlugQuery` : Récupérer une page
- `allPagesQuery` : Toutes les pages
- `headerSettingsQuery` : Paramètres header
- `footerSettingsQuery` : Paramètres footer

### `src/sanity/lib/image.ts`
**Rôle** : Gestion des images Sanity  
**Importance** : ⭐⭐⭐⭐  
**Exports** : Fonctions pour optimiser les images

---

## 🌐 Next.js - Routes Publiques

### `src/app/(website)/page.tsx`
**Rôle** : Page d'accueil  
**Importance** : ⭐⭐⭐⭐⭐  
**Logique** : Affiche la page "home" ou génère automatiquement

### `src/app/(website)/[slug]/page.tsx`
**Rôle** : Pages dynamiques  
**Importance** : ⭐⭐⭐⭐⭐  
**Logique** :
1. Récupère la page par slug
2. Génère les métadonnées SEO
3. Affiche les blocs via BlockRenderer

### `src/app/(website)/demo/page.tsx`
**Rôle** : Page de démonstration  
**Importance** : ⭐⭐⭐  
**Contenu** : Affiche tous les blocs disponibles

### `src/app/layout.tsx`
**Rôle** : Layout racine de l'application  
**Importance** : ⭐⭐⭐⭐⭐  
**Contenu** : HTML, body, providers globaux

### `src/app/globals.css`
**Rôle** : Styles CSS globaux  
**Importance** : ⭐⭐⭐⭐  
**Contenu** : Reset CSS, variables, classes utilitaires

---

## 🎨 Next.js - Sanity Studio

### `src/app/(sanity)/studio/[[...tool]]/page.tsx`
**Rôle** : Montage du Sanity Studio  
**Importance** : ⭐⭐⭐⭐⭐  
**URL** : `/studio`

---

## ⚙️ Next.js - Administration

### `src/app/admin/page.tsx`
**Rôle** : Page d'administration principale  
**Importance** : ⭐⭐⭐  
**Contenu** : Liste des outils d'administration

### `src/app/admin/massage-complete/page.tsx`
**Rôle** : Générateur de site de massothérapie  
**Importance** : ⭐⭐  
**Contenu** : Interface pour générer un site complet

---

## 🔌 Next.js - API Routes

### `src/app/api/import-demo/route.ts`
**Rôle** : API d'import de la démo  
**Importance** : ⭐⭐⭐⭐  
**Endpoint** : `POST /api/import-demo`  
**Action** : Crée la page de démonstration

### `src/app/api/setup-about/route.ts`
**Rôle** : API de génération page À Propos  
**Importance** : ⭐⭐⭐  
**Endpoint** : `POST /api/setup-about`

### `src/app/api/setup-contact/route.ts`
**Rôle** : API de génération page Contact  
**Importance** : ⭐⭐⭐  
**Endpoint** : `POST /api/setup-contact`

### `src/app/api/setup-services/route.ts`
**Rôle** : API de génération page Services  
**Importance** : ⭐⭐⭐  
**Endpoint** : `POST /api/setup-services`

### `src/app/api/revalidate/route.ts`
**Rôle** : API de revalidation ISR  
**Importance** : ⭐⭐⭐⭐  
**Endpoint** : `POST /api/revalidate`  
**Usage** : Webhook Sanity pour revalider les pages

### `src/app/api/preview/route.ts`
**Rôle** : API de mode preview  
**Importance** : ⭐⭐⭐  
**Endpoint** : `GET /api/preview`

### `src/app/api/exit-preview/route.ts`
**Rôle** : API de sortie du mode preview  
**Importance** : ⭐⭐⭐  
**Endpoint** : `GET /api/exit-preview`

---

## 🧩 Composants - Blocs

### `src/components/BlockRenderer.tsx`
**Rôle** : Rendu dynamique des blocs  
**Importance** : ⭐⭐⭐⭐⭐  
**Logique** : Switch sur `block._type` pour rendre le bon composant

### `src/components/blocks/HeroBlock/HeroBlock-fixed.tsx`
**Rôle** : Composant Hero Block  
**Importance** : ⭐⭐⭐⭐⭐  
**Props** : title, subtitle, ctaButtons, backgroundSettings

### `src/components/blocks/FeatureGridBlock/FeatureGridBlock-fixed.tsx`
**Rôle** : Composant Feature Grid  
**Importance** : ⭐⭐⭐⭐  
**Props** : title, features, layout

### `src/components/blocks/ContactBlock/ContactBlock-fixed.tsx`
**Rôle** : Composant Contact  
**Importance** : ⭐⭐⭐⭐  
**Props** : title, formFields, contactInfo

### `src/components/blocks/StatsBlock/StatsBlock-fixed.tsx`
**Rôle** : Composant Stats  
**Importance** : ⭐⭐⭐  
**Props** : title, stats, layout

### `src/components/blocks/TeamBlock/TeamBlock-100-compliant.tsx`
**Rôle** : Composant Team  
**Importance** : ⭐⭐⭐  
**Props** : title, members, displayType, layout

### `src/components/blocks/GalleryBlock/GalleryBlock-fixed.tsx`
**Rôle** : Composant Gallery  
**Importance** : ⭐⭐⭐  
**Props** : title, images, layout

### `src/components/blocks/TextBlock/TextBlock-fixed.tsx`
**Rôle** : Composant Text  
**Importance** : ⭐⭐⭐⭐  
**Props** : title, content

### `src/components/blocks/HeaderBlock/HeaderBlock.tsx`
**Rôle** : Composant Header  
**Importance** : ⭐⭐⭐  
**Props** : logo, navigation, ctaButton

### `src/components/blocks/FooterBlock/FooterBlock.tsx`
**Rôle** : Composant Footer  
**Importance** : ⭐⭐⭐  
**Props** : columns, socialLinks, copyright

---

## 🎨 Composants - Layout

### `src/components/layout/PageWrapper.tsx`
**Rôle** : Wrapper de page avec styles globaux  
**Importance** : ⭐⭐⭐⭐⭐  
**Props** : children, pageStyles

### `src/components/layout/Header.tsx`
**Rôle** : En-tête du site  
**Importance** : ⭐⭐⭐⭐  
**Usage** : Navigation principale

### `src/components/layout/Footer.tsx`
**Rôle** : Pied de page du site  
**Importance** : ⭐⭐⭐⭐  
**Usage** : Liens, copyright

---

## 🎨 Styles

### `src/styles/theme-utilities.css`
**Rôle** : Classes CSS utilitaires  
**Importance** : ⭐⭐⭐⭐⭐  
**Contenu** :
- Variables CSS (couleurs, espacements)
- Classes utilitaires (bg-*, text-*, align-*)
- Classes d'animation

### `src/styles/design-tokens.ts`
**Rôle** : Tokens de design TypeScript  
**Importance** : ⭐⭐⭐⭐  
**Exports** : Couleurs, espacements, typographie

### `src/styles/global.css`
**Rôle** : Styles globaux supplémentaires  
**Importance** : ⭐⭐⭐  
**Contenu** : Reset CSS, styles de base

---

## 🛠️ Bibliothèques Utilitaires

### `src/lib/theme-utils.ts`
**Rôle** : Utilitaires pour le système de thème  
**Importance** : ⭐⭐⭐⭐⭐  
**Exports** :
- `getBackgroundStyles()` : Styles de fond
- `getStyleClasses()` : Classes CSS
- `applyTheme()` : Application complète du thème

### `src/lib/sanity.ts`
**Rôle** : Utilitaires Sanity supplémentaires  
**Importance** : ⭐⭐⭐  
**Exports** : Fonctions helper pour Sanity

---

## 📝 Types TypeScript

### `src/types/blocks.ts`
**Rôle** : Types TypeScript des blocs  
**Importance** : ⭐⭐⭐⭐⭐  
**Exports** :
- `HeroBlockData`
- `FeatureGridBlockData`
- `ContactBlockData`
- `Block` (union type)
- `PageStyleSettings`

### `src/types/sanity.ts`
**Rôle** : Types TypeScript Sanity  
**Importance** : ⭐⭐⭐⭐  
**Exports** : Types pour les données Sanity

---

## 📜 Scripts Node.js

### `scripts/import-demo.js`
**Rôle** : Script d'import de la démo  
**Importance** : ⭐⭐⭐  
**Usage** : `npm run demo:import`

### `scripts/setup-demo.js`
**Rôle** : Script de configuration de la démo  
**Importance** : ⭐⭐⭐  
**Usage** : `npm run demo:setup`

### `scripts/fix-stats-keys.js`
**Rôle** : Script de correction des clés stats  
**Importance** : ⭐⭐  
**Usage** : `npm run fix:stats-keys`

---

## 📚 Documentation

### `README.md`
**Rôle** : Documentation principale du projet  
**Importance** : ⭐⭐⭐⭐⭐  
**Contenu** : Installation, utilisation, architecture

### `GUIDE_APPROPRIATION.md`
**Rôle** : Guide d'apprentissage étape par étape  
**Importance** : ⭐⭐⭐⭐⭐  
**Contenu** : 10 étapes pour maîtriser le projet

### `FICHIERS_IMPORTANTS.md` (ce fichier)
**Rôle** : Liste des fichiers clés  
**Importance** : ⭐⭐⭐⭐  
**Contenu** : Référence rapide des fichiers

---

## 🗂️ Autres Fichiers

### `.gitignore`
**Rôle** : Fichiers ignorés par Git  
**Importance** : ⭐⭐⭐⭐  
**Contenu** : node_modules, .next, .env.local

### `next-env.d.ts`
**Rôle** : Types TypeScript Next.js  
**Importance** : ⭐⭐⭐  
**Usage** : Généré automatiquement

### `sanity.cli.ts`
**Rôle** : Configuration Sanity CLI  
**Importance** : ⭐⭐⭐  
**Usage** : Commandes Sanity en ligne de commande

---

## 📊 Statistiques du Projet

- **Total de fichiers TypeScript** : ~100+
- **Total de schémas Sanity** : 14
- **Total de blocs** : 9
- **Total d'APIs** : 14+
- **Total de composants React** : 30+

---

## 🎯 Fichiers à Modifier en Priorité

Pour personnaliser le boilerplate, commencez par ces fichiers :

1. **`.env.local`** - Configuration de base
2. **`src/sanity/schemas/blocks/`** - Personnaliser les blocs
3. **`src/components/blocks/`** - Modifier l'apparence des blocs
4. **`src/styles/theme-utilities.css`** - Personnaliser les styles
5. **`src/sanity/schemas/shared/themeFields.ts`** - Ajouter des options de thème

---

## 🚫 Fichiers à NE PAS Modifier

Ces fichiers sont générés automatiquement ou critiques :

- `.next/` - Build Next.js (généré)
- `node_modules/` - Dépendances (généré)
- `next-env.d.ts` - Types Next.js (généré)
- `package-lock.json` - Lock des dépendances (géré par npm)

---

**Utilisez ce document comme référence rapide pour naviguer dans le projet !**
