# 🎬 SYSTÈME D'AUTO-GÉNÉRATION AU PREMIER DÉMARRAGE

## 📋 VUE D'ENSEMBLE

Le système d'auto-génération détecte automatiquement si le Studio Sanity est vierge et propose de générer instantanément toute la structure du site avec pages, header et footer.

### ✨ Objectifs

1. **Zéro configuration manuelle** - Le client voit immédiatement un site fonctionnel
2. **Traçabilité complète** - Tous les documents générés sont marqués `generatedByAgents: true`
3. **Personnalisation immédiate** - Le client peut modifier tout le contenu via le Studio
4. **Expérience fluide** - Génération en 10-15 secondes avec feedback en temps réel

---

## 🏗️ ARCHITECTURE

### Composants principaux

```
┌─────────────────────────────────────────────────────────────┐
│                    SANITY STUDIO                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  InitBanner Component (React)                        │  │
│  │  - Détecte si dataset vierge                         │  │
│  │  - Affiche banner de bienvenue                       │  │
│  │  - Bouton "Générer mon site"                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│                    API Route                                 │
│              /api/init-site (POST)                          │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  initAgent.js                                        │  │
│  │  - Orchestre la génération                           │  │
│  │  - Appelle pageGeneratorAgent pour chaque page       │  │
│  │  - Crée header et footer                             │  │
│  │  - Marque tous les documents                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  SANITY DATASET                                      │  │
│  │  - 5 pages créées                                    │  │
│  │  - Header configuré                                  │  │
│  │  - Footer configuré                                  │  │
│  │  - Tous marqués generatedByAgents: true              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 FICHIERS CRÉÉS

### 1. Agent d'initialisation
**`agents/initAgent.js`**
- Détecte si dataset vierge
- Orchestre la génération complète
- Crée pages, header, footer
- Marque tous les documents
- Génère rapport d'initialisation

### 2. API Route
**`src/app/api/init-site/route.ts`**
- `GET` - Vérifie si site initialisé
- `POST` - Lance la génération automatique

### 3. Composant React
**`src/sanity/components/InitBanner.tsx`**
- Banner de bienvenue
- Bouton de génération
- Feedback en temps réel
- Rafraîchissement automatique

### 4. Layout Studio
**`src/sanity/plugins/studioLayout.tsx`**
- Intègre le banner dans le Studio
- Layout personnalisé

### 5. Configuration Sanity
**`sanity.config.ts`** (modifié)
- Intègre le layout personnalisé

### 6. Schémas mis à jour
**`src/sanity/schemas/page.ts`**
**`src/sanity/schemas/settings/headerSettings.ts`**
**`src/sanity/schemas/settings/footerSettings.ts`**
- Ajout des champs `generatedByAgents`, `generatedAt`, `generationContext`

---

## 🚀 WORKFLOW COMPLET

### Étape 1: Premier démarrage du Studio
```
Client ouvre: http://localhost:3000/studio
```

### Étape 2: Détection automatique
```javascript
// InitBanner.tsx
useEffect(() => {
  fetch('/api/init-site')
    .then(res => res.json())
    .then(data => {
      if (data.needsInit) {
        // Afficher le banner
      }
    })
})
```

### Étape 3: Affichage du banner
```
🎬 Bienvenue dans votre Studio Sanity !

Votre site n'est pas encore initialisé. Le système d'agents peut générer automatiquement :

✅ 5 pages de base (Accueil, Services, À propos, Contact, Blog)
✅ Header avec navigation complète
✅ Footer avec liens et informations de contact
✅ Blocs de contenu prêts à personnaliser

[🚀 Générer mon site]  [Plus tard]
```

### Étape 4: Génération (clic sur le bouton)
```javascript
// POST /api/init-site
{
  siteName: "Mon Site",
  primaryColor: "#3b82f6",
  designStyle: "modern"
}
```

### Étape 5: Orchestration par initAgent
```javascript
// agents/initAgent.js
1. Vérifier que dataset est vierge
2. Générer 5 pages (Accueil, Services, À propos, Contact, Blog)
3. Créer header avec navigation
4. Créer footer avec liens
5. Marquer tous les documents avec generatedByAgents: true
6. Créer document de bienvenue
7. Retourner rapport complet
```

### Étape 6: Feedback et rafraîchissement
```
🎉 Site initialisé avec succès !
5 pages créées • Header et Footer configurés • Durée: 12s

Le Studio va se rafraîchir automatiquement...
```

### Étape 7: Studio rafraîchi
```
Le client voit maintenant:
- 📄 Pages (5 pages)
  - Accueil ✨ (généré par les agents)
  - Services ✨
  - À propos ✨
  - Contact ✨
  - Blog ✨
- ⚙️ Paramètres du site
  - Header ✨
  - Footer ✨
```

---

## 📊 PAGES GÉNÉRÉES

### 1. Accueil (/)
**Blocs:**
- `heroBlock` - Bannière de bienvenue
- `featureGridBlock` - Grille de fonctionnalités
- `statsBlock` - Statistiques
- `contactBlock` - Formulaire de contact

### 2. Services (/services)
**Blocs:**
- `heroBlock` - Titre de la page
- `featureGridBlock` - Liste des services

### 3. À propos (/about)
**Blocs:**
- `heroBlock` - Titre de la page
- `textBlock` - Contenu texte

### 4. Contact (/contact)
**Blocs:**
- `heroBlock` - Titre de la page
- `contactBlock` - Formulaire de contact

### 5. Blog (/blog)
**Blocs:**
- `heroBlock` - Titre de la page
- `blogBlock` - Liste des articles

---

## 🎯 HEADER GÉNÉRÉ

```javascript
{
  _type: 'headerSettings',
  _id: 'headerSettings',
  title: 'Navigation principale',
  logo: {
    text: 'Mon Site'
  },
  menuItems: [
    { label: 'Accueil', url: '/' },
    { label: 'Services', url: '/services' },
    { label: 'À propos', url: '/about' },
    { label: 'Blog', url: '/blog' },
    { label: 'Contact', url: '/contact' }
  ],
  generatedByAgents: true,
  generatedAt: '2024-11-07T...'
}
```

---

## 🦶 FOOTER GÉNÉRÉ

```javascript
{
  _type: 'footerSettings',
  _id: 'footerSettings',
  title: 'Bas de page',
  columns: [
    {
      title: 'Navigation',
      links: [
        { label: 'Accueil', url: '/' },
        { label: 'Services', url: '/services' },
        { label: 'À propos', url: '/about' }
      ]
    },
    {
      title: 'Légal',
      links: [
        { label: 'Mentions légales', url: '/mentions-legales' },
        { label: 'Politique de confidentialité', url: '/confidentialite' }
      ]
    }
  ],
  contactInfo: {
    email: 'contact@site.com',
    phone: '+1 (000) 000-0000'
  },
  generatedByAgents: true,
  generatedAt: '2024-11-07T...'
}
```

---

## 🔍 TRAÇABILITÉ

### Champs ajoutés à tous les documents

```typescript
{
  generatedByAgents: boolean      // true si généré automatiquement
  generatedAt: datetime           // Date de génération
  generationContext: string       // UUID du contexte (pour pages)
}
```

### Vérification dans le Studio

1. Ouvrir une page générée
2. Aller dans l'onglet **"Avancé"**
3. Voir les champs:
   - ✅ Généré par les agents: `true`
   - 📅 Date de génération: `2024-11-07T...`
   - 🆔 Contexte de génération: `uuid-xxx`

### Requête GROQ pour lister les documents générés

```groq
*[generatedByAgents == true] {
  _type,
  _id,
  title,
  generatedAt,
  generationContext
}
```

---

## 🧪 TESTS

### Test 1: Vérifier la détection
```bash
curl http://localhost:3000/api/init-site
```

**Résultat attendu (dataset vierge):**
```json
{
  "initialized": false,
  "needsInit": true,
  "message": "Site non initialisé - génération automatique disponible"
}
```

### Test 2: Lancer la génération
```bash
curl -X POST http://localhost:3000/api/init-site \
  -H "Content-Type: application/json" \
  -d '{"siteName": "Test Site", "primaryColor": "#3b82f6"}'
```

**Résultat attendu:**
```json
{
  "success": true,
  "contextId": "uuid-xxx",
  "results": {
    "pages": [
      { "title": "Accueil", "success": true, "id": "page-xxx" },
      { "title": "Services", "success": true, "id": "page-xxx" },
      ...
    ],
    "header": { "success": true },
    "footer": { "success": true }
  },
  "duration": 12000
}
```

### Test 3: Vérifier dans Sanity Vision
```groq
*[_type == "page"] {
  _id,
  title,
  "slug": slug.current,
  generatedByAgents,
  generatedAt
}
```

### Test 4: Génération manuelle via CLI
```bash
cd agents
node initAgent.js --siteName="Mon Site" --color=#3b82f6
```

---

## ⚙️ CONFIGURATION

### Variables d'environnement requises
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxx
```

### Personnalisation des pages par défaut

Modifier `agents/initAgent.js`:
```javascript
const DEFAULT_PAGES = [
  {
    title: 'Accueil',
    slug: 'home',
    description: 'Page d\'accueil...',
    blocks: ['heroBlock', 'featureGridBlock']
  },
  // Ajouter vos pages ici
]
```

### Personnalisation du header

Modifier `agents/initAgent.js`:
```javascript
const HEADER_TEMPLATE = {
  _type: 'headerSettings',
  menuItems: [
    // Vos items de menu
  ]
}
```

---

## 🎯 CRITÈRES DE SUCCÈS

✅ **Le Studio contient automatiquement toutes les pages clés au premier lancement**
✅ **Le header et le footer sont visibles et personnalisables**
✅ **Chaque page et bloc contient `generatedByAgents: true`**
✅ **Aucune erreur Sanity ni validation manquante**
✅ **L'utilisateur est informé que les pages ont été générées**
✅ **Génération complète en moins de 20 secondes**
✅ **Rafraîchissement automatique du Studio après génération**

---

## 🚀 UTILISATION

### Pour le développeur

1. **Déployer le code**
2. **Configurer les variables d'environnement**
3. **Lancer le serveur Next.js**

### Pour le client

1. **Ouvrir le Studio** (`http://localhost:3000/studio`)
2. **Voir le banner de bienvenue**
3. **Cliquer sur "🚀 Générer mon site"**
4. **Attendre 10-15 secondes**
5. **Le Studio se rafraîchit automatiquement**
6. **Personnaliser les pages via l'interface**

---

## 📚 DOCUMENTATION ASSOCIÉE

- `agents/initAgent.js` - Agent d'initialisation
- `agents/pageGeneratorAgent.js` - Génération de pages
- `src/app/api/init-site/route.ts` - API route
- `src/sanity/components/InitBanner.tsx` - Composant React
- `src/sanity/plugins/studioLayout.tsx` - Layout Studio

---

## 🎉 RÉSULTAT FINAL

**Le client ouvre le Studio pour la première fois et voit immédiatement:**

1. ✅ Un banner de bienvenue expliquant le système
2. ✅ Un bouton pour générer automatiquement le site
3. ✅ Après 10-15 secondes, un site complet avec 5 pages
4. ✅ Header et footer configurés
5. ✅ Tous les documents marqués comme générés par les agents
6. ✅ Possibilité de personnaliser immédiatement via le Studio

**Zéro ligne de code à écrire. Zéro configuration manuelle. Site prêt en quelques secondes. 🚀**
