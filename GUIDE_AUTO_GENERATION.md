# 🤖 Guide d'Auto-Génération Automatique

Ce guide explique comment utiliser le système d'auto-génération pour créer automatiquement des blocs et des pages pour votre site Sanity.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Méthode 1: Interface Web (Recommandé)](#méthode-1-interface-web-recommandé)
- [Méthode 2: CLI Interactif](#méthode-2-cli-interactif)
- [Méthode 3: Configuration Manuelle](#méthode-3-configuration-manuelle)
- [Types de projets](#types-de-projets)
- [Blocs disponibles](#blocs-disponibles)
- [Personnalisation](#personnalisation)

---

## Vue d'ensemble

Le système d'auto-génération utilise **Claude Sonnet 4** pour créer automatiquement :
- ✅ Blocs Sanity personnalisés (schémas + composants React)
- ✅ Pages complètes avec contenu
- ✅ Vérification de compatibilité automatique
- ✅ Intégration au système existant

### Prérequis

1. **Clé API Anthropic** configurée dans `.env.local`
2. **Node.js** et **npm** installés
3. **Projet Sanity** configuré

---

## Méthode 1: Interface Web (Recommandé)

### Étapes

1. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

2. **Ouvrir l'interface d'auto-génération**
   ```
   http://localhost:3000/admin/auto-generate
   ```

3. **Suivre le questionnaire en 5 étapes**
   - **Étape 1**: Choisir le type de projet
   - **Étape 2**: Renseigner les informations de base
   - **Étape 3**: Sélectionner les pages à créer
   - **Étape 4**: Choisir les blocs spéciaux
   - **Étape 5**: Définir le style et les préférences

4. **Lancer la génération**
   - Cliquer sur "🚀 Générer mon site"
   - Suivre la progression en temps réel
   - Consulter le résumé final

5. **Personnaliser dans Sanity Studio**
   - Ouvrir http://localhost:3000/studio
   - Modifier les pages et blocs créés
   - Ajouter vos images et contenus

---

## Méthode 2: CLI Interactif

### Commande

```bash
npm run agents:interactive
```

### Exemple de session

```
🤖 ASSISTANT DE CRÉATION AUTOMATIQUE
═══════════════════════════════════════════════════════════

Bienvenue ! Je vais vous guider pour créer automatiquement
des blocs et des pages pour votre site Sanity.

📋 ÉTAPE 1/5 - TYPE DE PROJET

Quel type de site souhaitez-vous créer ?
1. Site vitrine entreprise
2. Site e-commerce
3. Blog / Magazine
4. Portfolio
5. Site de services (massothérapie, salon, etc.)
6. Landing page produit
7. Autre (personnalisé)

Votre choix (1-7): 5

📝 ÉTAPE 2/5 - INFORMATIONS DE BASE

Nom de votre entreprise/site: Centre de Massothérapie Zen
Description courte (1 phrase): Centre de massothérapie offrant des soins personnalisés
Secteur d'activité: Santé et bien-être

📄 ÉTAPE 3/5 - PAGES À CRÉER

Quelles pages souhaitez-vous créer ? (séparées par des virgules)
Exemples: accueil, services, à propos, contact, blog, tarifs

Pages: accueil, services, tarifs, contact, à propos

🧩 ÉTAPE 4/5 - BLOCS SPÉCIAUX

Avez-vous besoin de blocs spéciaux ?
1. Formulaire de réservation
2. Carte interactive avec localisation
3. Galerie photos/vidéos
4. Témoignages clients
5. Grille de tarifs
6. Compte à rebours (événement/promotion)
7. Tableau comparatif
8. Preuve sociale (logos clients, stats)
9. Aucun bloc spécial

Numéros des blocs souhaités (ex: 1,3,4): 1,2,4,5

🎨 ÉTAPE 5/5 - STYLE ET PRÉFÉRENCES

Couleur principale de votre marque (ex: #667eea, bleu, rouge):
Couleur: #10b981

Style de design préféré:
1. Moderne et minimaliste
2. Professionnel et corporate
3. Créatif et coloré
4. Élégant et luxueux

Style (1-4): 1

📊 RÉCAPITULATIF
{
  "projectType": "services",
  "siteName": "Centre de Massothérapie Zen",
  "siteDescription": "Centre de massothérapie offrant des soins personnalisés",
  "industry": "Santé et bien-être",
  "pages": ["accueil", "services", "tarifs", "contact", "à propos"],
  "specialBlocks": ["booking", "map", "testimonials", "pricing"],
  "primaryColor": "#10b981",
  "designStyle": "modern-minimal"
}

✨ Configuration enregistrée !

Voulez-vous lancer la génération automatique maintenant ?
(o/n): o

🚀 Lancement de la génération automatique...
```

---

## Méthode 3: Configuration Manuelle

### 1. Créer un fichier de configuration

Créez `project-config.json` à la racine :

```json
{
  "projectType": "services",
  "siteName": "Mon Entreprise",
  "siteDescription": "Description de mon entreprise",
  "industry": "Secteur d'activité",
  "pages": ["accueil", "services", "contact"],
  "specialBlocks": ["map", "testimonials", "pricing"],
  "primaryColor": "#667eea",
  "designStyle": "modern-minimal"
}
```

### 2. Lancer la génération

```bash
npm run agents:generate
```

---

## Types de projets

| Type | Description | Pages suggérées |
|------|-------------|-----------------|
| **corporate** | Site vitrine entreprise | Accueil, Services, À propos, Contact, Blog |
| **ecommerce** | Site e-commerce | Accueil, Produits, Panier, Contact |
| **blog** | Blog / Magazine | Accueil, Articles, Catégories, À propos |
| **portfolio** | Portfolio créatif | Accueil, Projets, À propos, Contact |
| **services** | Site de services | Accueil, Services, Tarifs, Réservation, Contact |
| **landing** | Landing page produit | Page unique avec sections |
| **custom** | Personnalisé | À définir |

---

## Blocs disponibles

### Blocs spéciaux générables

| Bloc | Description | Cas d'usage |
|------|-------------|-------------|
| **🗺️ MapBlock** | Carte interactive | Localisation, directions |
| **📅 BookingBlock** | Réservation en ligne | Rendez-vous, événements |
| **🖼️ GalleryBlock** | Galerie avancée | Portfolio, produits |
| **💬 TestimonialsBlock** | Témoignages | Preuve sociale |
| **💰 PricingBlock** | Grille de tarifs | Services, abonnements |
| **⏰ CountdownBlock** | Compte à rebours | Promotions, événements |
| **📊 ComparisonTableBlock** | Tableau comparatif | Produits, plans |
| **🏆 SocialProofBlock** | Preuve sociale | Logos clients, stats |

### Blocs de base (toujours disponibles)

- TextBlock, HeroBlock, FeatureGridBlock
- ContactBlock, StatsBlock, TeamBlock
- HeaderBlock, FooterBlock, GalleryBlock
- BlogBlock, CTABlock, FAQBlock
- VideoBlock, AccordionBlock, TabsBlock
- NewsletterBlock, LogoCloudBlock

---

## Personnalisation

### Après la génération

1. **Ouvrir Sanity Studio**
   ```
   http://localhost:3000/studio
   ```

2. **Modifier les pages créées**
   - Aller dans "Pages"
   - Cliquer sur une page
   - Modifier les blocs et le contenu

3. **Ajouter des images**
   - Uploader vos images dans les blocs
   - Configurer les galeries

4. **Ajuster les styles**
   - Modifier les couleurs dans les blocs
   - Changer les layouts
   - Personnaliser les thèmes

### Régénérer un bloc spécifique

Si vous voulez régénérer un seul bloc :

```bash
npm run agents:run -- builder --prompt="Créer un [NomBlock] avec..." --dry-run=false
```

---

## Résolution de problèmes

### La génération échoue

**Vérifier la clé API**
```bash
# Dans .env.local
ANTHROPIC_API_KEY=sk-ant-api03-...
CLAUDE_MODEL=claude-sonnet-4-20250514
```

**Vérifier les logs**
```bash
# Consulter generation-summary.json
cat generation-summary.json
```

### Erreurs de compatibilité

**Lancer les vérifications manuellement**
```bash
npm run agents:run -- compat --dry-run=false
```

**Corriger les erreurs TypeScript**
```bash
npx tsc --noEmit
```

### Rate limiting Claude

Si vous générez trop de blocs rapidement, ajoutez des pauses :
- Le système ajoute automatiquement 2s entre chaque génération
- Réduisez le nombre de blocs par session

---

## Exemples de projets

### Site de Massothérapie

```json
{
  "projectType": "services",
  "siteName": "Centre Zen",
  "pages": ["accueil", "services", "tarifs", "réservation", "contact"],
  "specialBlocks": ["booking", "map", "testimonials", "pricing"],
  "primaryColor": "#10b981",
  "designStyle": "modern-minimal"
}
```

### Portfolio Créatif

```json
{
  "projectType": "portfolio",
  "siteName": "John Doe Design",
  "pages": ["accueil", "projets", "à propos", "contact"],
  "specialBlocks": ["gallery", "testimonials", "socialProof"],
  "primaryColor": "#8b5cf6",
  "designStyle": "creative-colorful"
}
```

### Site E-commerce

```json
{
  "projectType": "ecommerce",
  "siteName": "Ma Boutique",
  "pages": ["accueil", "produits", "panier", "contact"],
  "specialBlocks": ["comparison", "pricing", "testimonials", "socialProof"],
  "primaryColor": "#ef4444",
  "designStyle": "professional-corporate"
}
```

---

## Commandes utiles

```bash
# Questionnaire interactif
npm run agents:interactive

# Générer depuis config existante
npm run agents:generate

# Générer un bloc unique
npm run agents:run -- builder --prompt="..." --dry-run=false

# Vérifier compatibilité
npm run agents:run -- compat

# Nettoyer code non utilisé
npm run agents:run -- cleanup

# Démarrer le dev server
npm run dev
```

---

## Support

Pour plus d'informations, consultez :
- `agents/README.md` - Documentation des agents
- `README.md` - Documentation générale du projet
- Sanity Documentation: https://www.sanity.io/docs
- Claude API: https://docs.anthropic.com/

---

**Créé avec ❤️ et Claude Sonnet 4**
