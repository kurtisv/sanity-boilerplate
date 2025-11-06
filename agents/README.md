# 🤖 Agents Claude - Documentation

Système d'agents autonomes pour automatiser la création, validation et nettoyage de blocs Sanity.

## 📋 Table des matières

- [Installation](#installation)
- [Configuration](#configuration)
- [Agents disponibles](#agents-disponibles)
- [Utilisation](#utilisation)
- [Exemples](#exemples)
- [Architecture](#architecture)

---

## 🚀 Installation

Les agents sont déjà installés avec le projet. Aucune dépendance supplémentaire requise.

```bash
# Vérifier que dotenv est installé
npm list dotenv
```

---

## ⚙️ Configuration

### 1. Créer le fichier `.env`

```bash
# Copier depuis env.example
cp env.example .env
```

### 2. Ajouter votre clé Anthropic

Éditez `.env` et ajoutez :

```bash
# Agents Claude
ANTHROPIC_API_KEY=sk-ant-api03-...votre-clé...
CLAUDE_MODEL=claude-3-5-sonnet-20241022
```

> ⚠️ **IMPORTANT**: Ne commitez JAMAIS le fichier `.env` (déjà dans `.gitignore`)

### 3. Configuration avancée (optionnel)

Éditez `configs/agents.config.json` :

```json
{
  "dryRun": true,              // Mode dry-run par défaut
  "defaultModel": "claude-3-5-sonnet-20241022",
  "writeWhitelist": [          // Dossiers autorisés en écriture
    "src/sanity/schemas",
    "src/sanity/schemaTypes",
    "src/components/blocks",
    "src/app/api",
    "src/lib",
    "src/styles"
  ],
  "sanity": {
    "pushMode": "draft",       // draft ou published
    "datasets": ["production"]
  },
  "cleanup": {
    "aggressiveness": "prudent", // prudent, medium, aggressive
    "exclude": ["scripts", "public", "content-*", "**/*.md"]
  }
}
```

---

## 🤖 Agents disponibles

### 1. **Builder Agent** 🏗️

Génère automatiquement des blocs Sanity complets (schéma + composant + intégrations).

**Fonctionnalités:**
- Génération de schémas Sanity TypeScript
- Création de composants React
- Enregistrement automatique dans `schemaTypes/index.ts`
- Ajout au constructeur de page
- Intégration au `BlockRenderer`
- Mise à jour des requêtes GROQ (si nécessaire)

**Modes:**
- **Sans Claude** (fallback): Génère des templates minimaux valides
- **Avec Claude**: Génère du code sur mesure selon votre prompt

### 2. **Compatibility Agent** ✅

Vérifie la compatibilité et la qualité du code.

**Vérifications:**
- TypeScript (`tsc --noEmit`)
- ESLint (si configuré)
- Validations Sanity (règles projet)
- Build Next.js (en mode `--dry-run=false`)

**Règles Sanity validées:**
- `stats.number` en string
- `_key` obligatoire sur tous les arrays
- `featureGridBlock`: `iconType: 'emoji'` + `iconEmoji`
- `contactBlock`: `fieldType` dans la liste valide
- Longueurs maximales respectées

### 3. **Cleanup Agent** 🧹

Détecte et supprime le code non utilisé de manière sécurisée.

**Détection:**
- Imports non utilisés (`ts-prune`)
- Variables/fonctions mortes
- Fichiers orphelins
- APIs non référencées
- Schémas Sanity non utilisés

**Sécurité:**
- Mode dry-run par défaut
- Backups automatiques
- Confirmation avant suppression
- Tests post-cleanup (tsc + build)

---

## 📖 Utilisation

### Commande générale

```bash
npm run agents:run -- <agent> [options]
```

### Options communes

- `--dry-run=false` : Exécution réelle (par défaut: `true`)
- `--prompt="..."` : Prompt pour le Builder Agent

---

## 💡 Exemples

### Builder Agent

#### Générer un bloc simple (mode fallback)

```bash
npm run agents:run -- builder --prompt="Créer un logoGridBlock basique"
```

#### Générer un bloc personnalisé (avec Claude)

```bash
# Assurez-vous que ANTHROPIC_API_KEY est dans .env
npm run agents:run -- builder --prompt="Créer un testimonialCarouselBlock avec navigation, autoplay et filtres par catégorie" --dry-run=false
```

#### Générer un bloc complexe

```bash
npm run agents:run -- builder --prompt="Créer un productGridBlock avec:
- Filtres par catégorie et prix
- Tri (prix, popularité, nouveauté)
- Pagination
- Vue grille/liste
- Wishlist
- Quick view modal
Utilise Tailwind CSS et lucide-react pour les icônes" --dry-run=false
```

### Compatibility Agent

#### Vérification rapide (sans build)

```bash
npm run agents:run -- compat
```

#### Vérification complète (avec build Next.js)

```bash
npm run agents:run -- compat --dry-run=false
```

**Sortie exemple:**
```json
{
  "ok": true,
  "reports": {
    "typecheck": { "ok": true, "out": "...", "err": "" },
    "lint": { "ok": true, "out": "ESLint skipped (no config)", "err": "" },
    "sanity": { "ok": true, "out": "Validations passed", "err": "" },
    "build": { "ok": true, "out": "Build successful", "err": "" }
  }
}
```

### Cleanup Agent

#### Analyse (dry-run)

```bash
npm run agents:run -- cleanup
```

**Sortie exemple:**
```json
{
  "ok": true,
  "results": [
    { "action": "delete", "file": "src/lib/unused-helper.ts", "dryRun": true, "reason": "No references found" },
    { "action": "delete", "file": "src/components/OldComponent.tsx", "dryRun": true, "reason": "Orphaned file" }
  ]
}
```

#### Suppression réelle (après validation)

```bash
npm run agents:run -- cleanup --dry-run=false
```

---

## 🏗️ Architecture

### Structure des fichiers

```
agents/
├── README.md                    # Ce fichier
├── core/                        # Modules core
│   ├── anthropicClient.js       # Client Claude API
│   ├── fsWorkspace.js           # Gestion fichiers (write, delete, rollback)
│   ├── checks.js                # Vérifications (tsc, eslint, build)
│   └── sanityUtils.js           # Validations Sanity
├── builderAgent.js              # Agent de génération
├── compatibilityAgent.js        # Agent de validation
└── cleanupAgent.js              # Agent de nettoyage

configs/
└── agents.config.json           # Configuration globale

scripts/
└── run-agent.js                 # CLI principal
```

### Flux de travail Builder Agent

```
1. Prompt utilisateur
   ↓
2. Appel Claude API (ou fallback)
   ↓
3. Génération fichiers
   - Schéma Sanity (.ts)
   - Composant React (.tsx)
   ↓
4. Intégrations automatiques
   - schemaTypes/index.ts
   - page.ts (constructeur)
   - BlockRenderer.tsx
   ↓
5. Vérifications
   - TypeScript check
   - Validations Sanity
   ↓
6. Écriture (si dry-run=false)
   ↓
7. Rapport final
```

### Flux de travail Cleanup Agent

```
1. Analyse du code
   - ts-prune (exports non utilisés)
   - Grep imports
   - Analyse références
   ↓
2. Détection fichiers orphelins
   ↓
3. Plan de suppression
   - Tri par niveau de risque
   - Exclusion patterns (config)
   ↓
4. Dry-run: Affichage plan
   OU
   Exécution: Suppression + backup
   ↓
5. Post-cleanup checks
   - tsc --noEmit
   - npm run build
   ↓
6. Rollback si échec
```

---

## 🔒 Sécurité

### Garde-fous

1. **Whitelist d'écriture**: Seuls les dossiers autorisés peuvent être modifiés
2. **Dry-run par défaut**: Aucune modification sans `--dry-run=false`
3. **Backups automatiques**: Patch/diff créé avant toute suppression
4. **Validations post-action**: Build + typecheck après chaque modification
5. **Rollback automatique**: Si les tests échouent après modification

### Bonnes pratiques

- ✅ Toujours tester en dry-run d'abord
- ✅ Vérifier les diffs avant d'accepter
- ✅ Commiter avant d'exécuter des agents destructifs
- ✅ Garder des backups réguliers
- ✅ Ne jamais commiter `.env`

---

## 🐛 Dépannage

### "ANTHROPIC_API_KEY not found"

**Solution**: Créez `.env` à la racine avec votre clé:
```bash
cp env.example .env
# Éditez .env et ajoutez votre clé
```

### "Permission denied" lors de l'écriture

**Solution**: Vérifiez que le dossier cible est dans la whitelist (`configs/agents.config.json`)

### Build échoue après génération

**Solution**: Lancez le Compatibility Agent pour identifier l'erreur:
```bash
npm run agents:run -- compat --dry-run=false
```

### Claude génère du code incorrect

**Solution**: 
1. Affinez votre prompt avec plus de détails
2. Spécifiez les conventions du projet
3. Utilisez le mode fallback si nécessaire

---

## 📚 Ressources

- [Documentation Sanity](https://www.sanity.io/docs)
- [Documentation Claude](https://docs.anthropic.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Contribution

Pour améliorer les agents:

1. Modifiez les fichiers dans `agents/`
2. Testez avec `npm run agents:run -- <agent>`
3. Documentez les changements dans ce README
4. Commitez avec un message clair

---

## 📝 Changelog

### v1.0.0 (2025-11-06)
- ✅ Builder Agent avec fallback templates
- ✅ Compatibility Agent (tsc, eslint, sanity, build)
- ✅ Cleanup Agent (détection + suppression safe)
- ✅ Configuration centralisée
- ✅ Documentation complète

---

**Créé avec ❤️ pour automatiser votre workflow Sanity + Next.js**
