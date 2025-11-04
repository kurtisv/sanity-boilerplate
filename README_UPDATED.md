# 🚀 Sanity + Next.js Professional Boilerplate

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Sanity](https://img.shields.io/badge/Sanity-CMS-red?style=for-the-badge&logo=sanity)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Styled Components](https://img.shields.io/badge/Styled--Components-DB7093?style=for-the-badge&logo=styled-components)

**Un boilerplate moderne et professionnel pour créer des sites web performants**

[🚀 Voir la Démo](http://localhost:3000/demo) • [📖 Documentation](#documentation) • [🎨 Studio](http://localhost:3000/studio) • [⚙️ Administration](http://localhost:3000/admin)

</div>

---

## ✨ **Aperçu du Projet**

Ce boilerplate combine **Next.js 16** et **Sanity CMS** pour offrir une solution complète de développement web moderne. Il propose un système de blocs universels, une interface d'administration intuitive et un design professionnel prêt pour la production.

### 🎯 **Fonctionnalités Principales**

- 🧩 **Système de Blocs Avancé** - 9 blocs universels avec 60+ options de personnalisation
- 🎨 **Système de Thème Unifié** - 18 dégradés prédéfinis + dégradés personnalisés 3 couleurs
- ✅ **14 APIs d'Auto-génération** - Pages prêtes à l'emploi 100% conformes aux validations Sanity
- 🎯 **60+ Icônes Intégrées** - Lucide React avec styles et positions configurables
- 🔐 **Validations Sanity Strictes** - Toutes les APIs respectent les contraintes de validation
- 🚀 **Performance Optimisée** - Next.js 16 + React 19 avec imports dynamiques
- 🔧 **Code Propre & Structuré** - Architecture modulaire avec types centralisés
- 📊 **SEO Avancé** - Métadonnées dynamiques et gestion 404 correcte

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

### **Configuration Automatique**

```bash
# Option 1: Interface web (recommandé)
# Allez sur http://localhost:3000/admin

# Option 2: Import simple
npm run demo:import
```

### **URLs Importantes**

- 🏠 **Site principal** : `http://localhost:3000`
- 📋 **Page de démo** : `http://localhost:3000/demo`
- 🎨 **Sanity Studio** : `http://localhost:3000/studio`
- ⚙️ **Administration** : `http://localhost:3000/admin`

---

## ✅ **14 APIs d'Auto-génération Validées**

Toutes les APIs d'auto-génération sont **100% conformes aux validations Sanity** :

| API | Description | Status |
|-----|-------------|--------|
| `/api/import-demo` | Page de démonstration | ✅ Validé |
| `/api/setup-services` | Page Services | ✅ Validé |
| `/api/setup-contact` | Page Contact complète | ✅ Validé |
| `/api/setup-about` | Page À Propos | ✅ Validé |
| `/api/setup-studio-showcase` | Vitrine Studio | ✅ Validé |
| `/api/import-home` | Page Home | ✅ Validé |
| `/api/setup-contact-simple` | Contact simplifié | ✅ Validé |
| `/api/setup-careers` | Page Carrières | ✅ Validé |
| `/api/setup-blog` | Page Blog | ✅ Validé |
| `/api/setup-faq` | Page FAQ | ✅ Validé |
| `/api/setup-legal` | Mentions Légales | ✅ Validé |
| `/api/setup-pricing` | Page Tarifs | ✅ Validé |
| `/api/setup-portfolio` | Portfolio | ✅ Validé |

**🎉 Plus aucune erreur de validation Sanity !**

---

## 🔐 **Règles de Validation Sanity**

### **Longueurs de Texte**

| Champ | Limite | Bloc |
|-------|--------|------|
| `seoDescription` | 160 caractères | Page |
| `title` | 100 caractères | Hero, Features |
| `subtitle` | 100 caractères | Hero, Contact |
| `description` | 100 caractères | Features |
| `label` | 50 caractères | FormFields |
| `placeholder` | 100 caractères | FormFields |
| `number` | 20 caractères (String) | Stats |

### **Types de Champs ContactBlock**

✅ **Types valides** :
- `name` - Nom complet
- `email` - Adresse email
- `phone` - Téléphone
- `company` - Entreprise
- `subject` - Sujet
- `message` - Message long
- `textarea` - Texte multiligne
- `url` - URL
- `custom` - Champ personnalisé

❌ **Types INVALIDES** :
- `text` - Utiliser `name` ou `custom`
- `tel` - Utiliser `phone`
- `select` (avec options) - Utiliser `subject` ou `custom`

### **Structure des Blocs**

#### **FeatureGridBlock**
```typescript
{
  _key: 'feature-1',           // ✅ Obligatoire
  iconType: 'emoji',           // ✅ Obligatoire
  iconEmoji: '🎨',            // ✅ Si iconType='emoji'
  title: 'Mon titre',          // ✅ Max 100 chars
  description: 'Ma description' // ✅ Max 100 chars
}
```

#### **StatsBlock**
```typescript
{
  _key: 'stat-1',              // ✅ Obligatoire
  number: '150+',              // ✅ STRING max 20 chars
  label: 'Projets',            // ✅ Max 100 chars
  description: 'Complétés'     // ✅ Max 200 chars
}
```

#### **TeamBlock**
```typescript
{
  displayType: 'team',         // ✅ Obligatoire
  layout: 'grid',              // ✅ Obligatoire
  gridColumns: 3,              // ✅ Si layout='grid'
  members: [{
    _key: 'member-1',          // ✅ Obligatoire
    name: 'Sarah',             // ✅ Required
    position: 'Developer'      // ✅ Required (PAS 'role')
  }]
}
```

#### **ContactBlock**
```typescript
{
  formFields: [{
    _key: 'field-1',           // ✅ Obligatoire
    fieldType: 'name',         // ✅ Type valide uniquement
    label: 'Nom',              // ✅ Max 50 chars
    placeholder: 'Votre nom',  // ✅ Max 100 chars
    required: true
  }]
}
```

---

## 🧩 **Blocs Universels Inclus**

| Bloc | Icône | Description | Validations |
|------|-------|-------------|-------------|
| **HeroBlock** | 🦸 | Bannière principale | title ≤ 100, subtitle ≤ 300 |
| **StatsBlock** | 📊 | Statistiques animées | number String ≤ 20 chars |
| **FeatureGridBlock** | ⭐ | Grille de fonctionnalités | _key requis, iconType+iconEmoji |
| **TextBlock** | 📝 | Contenu riche | Portable Text |
| **GalleryBlock** | 🖼️ | Galerie d'images | ⚠️ Ne PAS utiliser en auto-génération |
| **TeamBlock** | 👥 | Équipe et témoignages | displayType, position requis |
| **ContactBlock** | 📧 | Formulaire de contact | fieldType valides uniquement |
| **HeaderBlock** | 🎯 | En-tête de site | - |
| **FooterBlock** | 🦶 | Pied de page | - |

---

## 🏗️ **Architecture Technique**

### **Stack Technologique**

```
Frontend:
├── Next.js 16.0.1 (App Router + RSC)
├── React 19.2.0 (avec React Compiler)
├── TypeScript 5 (types centralisés)
├── Styled Components 6.1.19
├── Lucide React 0.445.0 (icônes)
└── TailwindCSS (utilitaires)

Backend & CMS:
├── Sanity CMS 4.12.0
├── GROQ (requêtes optimisées)
├── PortableText (contenu riche)
└── Sanity Studio (interface admin)

Architecture:
├── Système de blocs modulaires
├── Thèmes unifiés centralisés
├── Types TypeScript partagés
├── Imports dynamiques (performance)
└── Configuration centralisée
```

### **Structure du Projet**

```
src/
├── app/                    # App Router Next.js
│   ├── (website)/         # Routes du site
│   ├── (sanity)/          # Sanity Studio
│   ├── admin/             # Interface d'administration
│   └── api/               # API Routes (14 validées)
├── components/            # Composants React
│   ├── blocks/           # Blocs universels
│   ├── layout/           # Header, Footer
│   └── ui/               # Composants UI
├── sanity/               # Configuration Sanity
│   ├── schemas/          # Schémas de contenu
│   │   ├── blocks/       # 9 blocs avec validations
│   │   └── shared/       # themeFields.ts
│   ├── lib/              # Client et utilitaires
│   └── structure.ts      # Structure du Studio
├── styles/               # Styles globaux
└── types/                # Types TypeScript centralisés
```

---

## 📖 **Guide d'Utilisation**

### **1. Créer une Nouvelle Page**

1. Allez sur `http://localhost:3000/studio`
2. Cliquez sur **"Pages"** dans le menu
3. Cliquez sur **"Create new Page"**
4. Remplissez les informations :
   - **Titre** : Le nom de votre page
   - **Slug** : L'URL de la page (ex: `about-us`)
   - **Description SEO** : Max 160 caractères

### **2. Ajouter des Blocs**

1. Dans l'éditeur de page, cliquez sur **"Add item"**
2. Choisissez le type de bloc souhaité
3. **Respectez les validations** :
   - Limites de caractères
   - Types de champs valides
   - Champs obligatoires (_key, displayType, etc.)
4. Prévisualisez en temps réel
5. Publiez quand validé

### **3. Utiliser les APIs d'Auto-génération**

```bash
# Générer une page via l'API
curl -X POST http://localhost:3000/api/setup-services

# Ou via l'interface admin
# http://localhost:3000/admin/pages
```

---

## 🔧 **Création d'une Nouvelle API**

### **Template avec Validations**

```typescript
// src/app/api/setup-ma-page/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { generateCtaKey, generateFeatureKey } from '@/lib/generate-unique-keys'

export async function POST(request: NextRequest) {
  try {
    const pageData = {
      _type: 'page',
      title: 'Ma Page',
      slug: { current: 'ma-page', _type: 'slug' },
      seoTitle: 'Ma Page - Site',  // Max 60 caractères
      seoDescription: 'Description de ma page pour le SEO.',  // Max 160 caractères
      
      pageBuilder: [
        // ✅ HeroBlock avec validations
        {
          _type: 'heroBlock',
          _key: 'ma-page-hero',
          title: 'Mon Titre',          // ✅ Max 100 caractères
          subtitle: 'Mon sous-titre',  // ✅ Max 300 caractères
          
          ctaButtons: [
            {
              _key: generateCtaKey('action'),  // ✅ _key obligatoire
              text: 'Mon Bouton',
              href: '/contact',
              variant: 'primary'
            }
          ],
          
          layout: 'centered',
          heroSettings: {
            height: 'large',
            alignment: 'center'
          }
        },
        
        // ✅ FeatureGridBlock avec validations
        {
          _type: 'featureGridBlock',
          _key: 'ma-page-features',
          title: 'Fonctionnalités',    // ✅ Max 100 caractères
          subtitle: 'Nos services',     // ✅ Max 100 caractères
          gridLayout: '3-balanced',
          
          features: [
            {
              _key: generateFeatureKey('perf'),  // ✅ _key obligatoire
              iconType: 'emoji',                 // ✅ Obligatoire
              iconEmoji: '⚡',                   // ✅ Si iconType='emoji'
              title: 'Performance',              // ✅ Max 100 chars
              description: 'Rapide et efficace'  // ✅ Max 100 chars
            }
          ]
        },
        
        // ✅ ContactBlock avec validations
        {
          _type: 'contactBlock',
          _key: 'ma-page-contact',
          title: 'Nous Contacter',     // ✅ Max 100 caractères
          subtitle: 'Parlons projet',  // ✅ Max 100 caractères
          layout: 'centered',
          
          formFields: [
            {
              _key: 'field-name',              // ✅ _key obligatoire
              fieldType: 'name',               // ✅ Type valide
              label: 'Nom complet',            // ✅ Max 50 chars
              placeholder: 'Votre nom',        // ✅ Max 100 chars
              required: true
            },
            {
              _key: 'field-email',
              fieldType: 'email',              // ✅ Type valide
              label: 'Email',
              placeholder: 'votre@email.com',
              required: true
            }
          ]
        }
      ]
    }

    const result = await client.create(pageData)
    
    return NextResponse.json({ 
      success: true, 
      page: result 
    })
    
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 })
  }
}
```

---

## 📋 **Checklist de Validation**

Avant de créer une API d'auto-génération :

- [ ] **Longueurs** : Respecter toutes les limites de caractères
- [ ] **Types** : Utiliser uniquement les types valides (name, email, phone, etc.)
- [ ] **_key** : Ajouter `_key` unique à TOUS les éléments d'array
- [ ] **displayType** : Ajouter dans teamBlock
- [ ] **position** : Utiliser `position` (PAS `role`) dans teamBlock
- [ ] **iconType+iconEmoji** : Les deux obligatoires si iconType='emoji'
- [ ] **number String** : Dans statsBlock, `number` doit être String
- [ ] **GalleryBlock** : ❌ Ne PAS utiliser (nécessite upload d'images)
- [ ] **fieldType valides** : Uniquement name, email, phone, company, subject, message, textarea, url, custom

---

## 🛠️ **Scripts Disponibles**

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Construit l'application pour la production |
| `npm run start` | Démarre le serveur de production |
| `npm run demo:import` | Importe la démo automatiquement |

---

## 🚀 **Déploiement**

### **Vercel (Recommandé)**

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Déployer
vercel

# 3. Configurer les variables d'environnement
# NEXT_PUBLIC_SANITY_PROJECT_ID
# NEXT_PUBLIC_SANITY_DATASET
# SANITY_API_TOKEN (scope "Editor")
```

---

## 🐛 **Dépannage**

### **Erreurs de Validation Sanity**

**Problème** : "Value 'text' did not match any allowed values"
```typescript
// ❌ ERREUR
fieldType: 'text'

// ✅ CORRECT
fieldType: 'name'  // ou 'custom'
```

**Problème** : "Must be at most 100 characters long"
```typescript
// ❌ ERREUR
title: 'Un titre extrêmement long qui dépasse les 100 caractères autorisés'

// ✅ CORRECT  
title: 'Un titre concis'  // < 100 caractères
```

**Problème** : "Encountered two children with the same key"
```typescript
// ❌ ERREUR - Pas de _key
features: [
  { title: 'Feature 1' },
  { title: 'Feature 2' }
]

// ✅ CORRECT
features: [
  { _key: 'feature-1', title: 'Feature 1' },
  { _key: 'feature-2', title: 'Feature 2' }
]
```

---

## 📚 **Documentation Complète**

- 📖 [Manuel d'Auto-implémentation](./MANUEL_AUTO_IMPLEMENTATION.md)
- 🔐 [Guide des Validations](./MANUEL_AUTO_IMPLEMENTATION.md#-règles-de-validation-sanity)
- 🎨 [Système de Thème](./MANUEL_AUTO_IMPLEMENTATION.md#-système-de-thème-unifié)
- 🧩 [Référence des Blocs](./MANUEL_AUTO_IMPLEMENTATION.md#-blocs-disponibles)

---

## 🤝 **Contribution**

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. **Respecter les validations Sanity**
4. Commit (`git commit -m 'Ajout de ma feature'`)
5. Push (`git push origin feature/ma-feature`)
6. Ouvrir une Pull Request

---

## 📄 **Licence**

MIT License - Voir [LICENSE](./LICENSE) pour plus de détails.

---

## 🙏 **Remerciements**

- [Sanity.io](https://www.sanity.io/) - CMS headless puissant
- [Next.js](https://nextjs.org/) - Framework React moderne
- [Vercel](https://vercel.com/) - Plateforme de déploiement
- [Styled Components](https://styled-components.com/) - CSS-in-JS

---

<div align="center">

**Créé avec ❤️ par [Votre Nom]**

[🌟 Star sur GitHub](https://github.com/votre-username/sanity-next-boilerplate) • [🐛 Reporter un Bug](https://github.com/votre-username/sanity-next-boilerplate/issues) • [💡 Demander une Feature](https://github.com/votre-username/sanity-next-boilerplate/issues)

</div>
