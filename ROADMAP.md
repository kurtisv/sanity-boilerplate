# 🗺️ FEUILLE DE ROUTE - SYSTÈME MULTI-AGENTS v4.0

## 📊 Vue d'ensemble

Ce document définit l'ordre optimal de mise à jour du pipeline d'agents pour obtenir une cascade fiable et intelligente.

---

## 🎯 Objectifs principaux

1. **Améliorer la cohérence** entre les agents
2. **Renforcer la communication** via EventBus et contrats
3. **Augmenter l'autonomie** avec auto-correction adaptative
4. **Garantir la traçabilité** via manifest central

---

## 📋 Ordre de développement (Priorités)

### ✅ ÉTAPE 0: Infrastructure commune (COMPLÉTÉ)

**Fichiers créés:**
- ✅ `core/contracts.js` - Contrat universel de handover
- ✅ `core/eventBus.js` - Système de communication interne
- ✅ `core/context.json` - Mémoire contextuelle partagée
- ✅ `core/artifacts.js` - Gestion centralisée des artefacts
- ✅ `core/mediaDefaults.json` - Pool de 16 images par défaut
- ✅ `core/headerFooterSync.js` - Synchronisation header/footer

**Agents déjà conformes:**
- ✅ `compatibilityAgent` - Format handover complet
- ✅ `diagnosticAgent` - Intégration avec diagnosticFixAgent
- ✅ `diagnosticFixAgent` - 23 corrections automatiques
- ✅ `publisherAgent` - Handover et manifest
- ✅ `cleanupAgent` - Status 'done' et handover final

---

### 🔨 ÉTAPE 1: builderAgent (PRIORITÉ HAUTE)

**Raison:** Cœur de la génération du site. Doit être le premier à implémenter le contrat global.

**Améliorations requises:**
- [ ] Adopter `core/contracts.js` pour créer les handovers
- [ ] Intégrer `core/mediaDefaults.json` pour injection automatique d'images
- [ ] Utiliser `core/headerFooterSync.js` pour synchroniser header/footer
- [ ] Publier des événements via `core/eventBus.js`
- [ ] Mettre à jour `core/artifacts.js` avec les blocs créés
- [ ] Initialiser tous les arrays avec `initialValue: []`
- [ ] Ajouter validation des schémas avant écriture

**Fichiers à modifier:**
- `agents/builderAgent.js`

**Tests de validation:**
```bash
npm run agents:run -- builder --prompt="Créer un heroBlock moderne"
# Vérifier: handover créé, images injectées, header/footer synchronisés
```

---

### 🔨 ÉTAPE 2: compatibilityAgent (COMPLÉTÉ ✅)

**Status:** Déjà conforme au système v4.0

**Améliorations appliquées:**
- ✅ Format handover complet avec contextId
- ✅ Sauvegarde dans `out/<contextId>/`
- ✅ Artifacts avec report + manifest
- ✅ Stage: 'compat'

---

### 🔨 ÉTAPE 3: diagnosticFixAgent-v2 (PRIORITÉ HAUTE)

**Raison:** Doit être unifié et rendre ses corrections adaptatives.

**Améliorations requises:**
- [ ] Charger `core/context.json` pour apprendre des erreurs récurrentes
- [ ] Mettre à jour `learnedPatterns` après chaque correction
- [ ] Utiliser `core/eventBus.js` pour publier `fix:applied`
- [ ] Créer des règles de correction dynamiques basées sur l'historique
- [ ] Ajouter support pour nouveaux types d'erreurs

**Fichiers à modifier:**
- `agents/diagnosticFixAgent.js`

**Tests de validation:**
```bash
npm run agents:run -- diagnostic --dry-run=false
# Vérifier: corrections adaptatives, context.json mis à jour
```

---

### 🔨 ÉTAPE 4: diagnosticAgent (COMPLÉTÉ ✅)

**Status:** Déjà conforme et intégré avec diagnosticFixAgent

**Améliorations appliquées:**
- ✅ Invoque diagnosticFixAgent automatiquement
- ✅ Format handover complet
- ✅ Sauvegarde dans `out/<contextId>/`

---

### 🔨 ÉTAPE 5: pageGeneratorAgent (PRIORITÉ MOYENNE)

**Raison:** Crée les pages finales selon le plan généré par analystAgent.

**Améliorations requises:**
- [ ] Adopter `core/contracts.js` pour les handovers
- [ ] Injecter automatiquement les images depuis `core/mediaDefaults.json`
- [ ] Initialiser tous les arrays avec `initialValue: []`
- [ ] Utiliser `core/headerFooterSync.js` pour cohérence
- [ ] Publier événements via `core/eventBus.js`
- [ ] Mettre à jour `core/artifacts.js` avec les pages créées

**Fichiers à modifier:**
- `agents/pageGeneratorAgent.js`

**Tests de validation:**
```bash
npm run agents:run -- pagegen --plan=corporate
# Vérifier: pages créées, images injectées, manifest mis à jour
```

---

### 🔨 ÉTAPE 6: reviewerAgent (PRIORITÉ MOYENNE)

**Raison:** Nettoie les schémas et renforce les règles visuelles.

**Améliorations requises:**
- [ ] Créer l'agent s'il n'existe pas
- [ ] Scanner tous les schémas pour erreurs structurelles
- [ ] Vérifier `export default defineType()`
- [ ] Valider les types color (string + regex)
- [ ] Vérifier les icônes (emoji uniquement)
- [ ] Auto-corriger si possible
- [ ] Publier événements via `core/eventBus.js`

**Fichiers à créer/modifier:**
- `agents/reviewerAgent.js` (nouveau ou améliorer existant)

**Tests de validation:**
```bash
npm run agents:run -- reviewer --auto-fix=true
# Vérifier: schémas corrigés, rapport détaillé
```

---

### 🔨 ÉTAPE 7: styleAgent (PRIORITÉ MOYENNE)

**Raison:** Applique la validation visuelle et conventions de design.

**Améliorations requises:**
- [ ] Améliorer l'agent existant
- [ ] Vérifier regex HEX pour couleurs
- [ ] Valider `initialValue` pour layout/theme
- [ ] Vérifier `options.list` (format correct)
- [ ] Générer patch .diff si nécessaire
- [ ] Publier événements via `core/eventBus.js`

**Fichiers à modifier:**
- `agents/styleAgent.js`

**Tests de validation:**
```bash
npm run agents:run -- style --generate-patch=true
# Vérifier: issues détectées, patch généré
```

---

### 🔨 ÉTAPE 8: publisherAgent (COMPLÉTÉ ✅)

**Status:** Déjà conforme avec manifest central

**Améliorations appliquées:**
- ✅ Consomme handover global
- ✅ Vérifie status avant publication
- ✅ Sauvegarde handover pour cleanupAgent

---

### 🔨 ÉTAPE 9: seniorAgent (PRIORITÉ HAUTE)

**Raison:** Superviseur final — orchestre tous les autres via EventBus.

**Améliorations requises:**
- [ ] Créer l'agent orchestrateur
- [ ] S'abonner à tous les événements via `core/eventBus.js`
- [ ] Centraliser les logs dans `out/senior-agent.log`
- [ ] Gérer la mémoire contextuelle (`core/context.json`)
- [ ] Relancer automatiquement les agents en cas d'échec
- [ ] Générer rapport global du pipeline
- [ ] Implémenter self-healing (fix → diagnostic → publish)

**Fichiers à créer:**
- `agents/seniorAgent.js` (nouveau)

**Tests de validation:**
```bash
npm run agents:run -- senior --full-pipeline=true
# Vérifier: pipeline complet, auto-correction, rapport final
```

---

## 🔄 Mises à jour secondaires

### analystAgent
- [ ] Reconnaître modèles de site (landing, blog, e-commerce)
- [ ] Générer plan dynamique selon le type
- [ ] Utiliser `core/contracts.js` pour handover

### designAgent
- [ ] Communiquer avec styleAgent
- [ ] Appliquer logique AI pour adapter designs selon secteur
- [ ] Publier événements design via EventBus

### fixPagesAgent
- [ ] Créer l'agent s'il n'existe pas
- [ ] Réparer automatiquement les pages Sanity
- [ ] Corriger ctaButtons, arrays, etc.
- [ ] Être appelé par diagnosticAgent

### cleanupAgent (COMPLÉTÉ ✅)
- ✅ Nettoie fichiers obsolètes
- ✅ Handover final avec status 'done'

### testerAgent
- [ ] Créer l'agent s'il n'existe pas
- [ ] Tests d'intégration (GROQ, API Next.js, SEO)
- [ ] Publier résultats via EventBus

---

## 🎯 Intelligence Layer (Écosystème auto-correctif)

### 1. Auto-correction adaptative
- **diagnosticFixAgent-v2** apprend des erreurs récurrentes
- Met à jour `core/context.json` avec patterns détectés
- Améliore ses règles de correction automatiquement

### 2. Design Loop
- **designAgent** → **styleAgent** → **reviewerAgent**
- Coopération pour affiner le visuel avant publication
- Validation multi-niveaux

### 3. Self-healing pipeline
- Si compatibilité ou diagnostic échoue
- **seniorAgent** relance automatiquement: fix → diagnostic → publish
- Jusqu'à 3 tentatives avant échec définitif

### 4. Manifest central
- Chaque agent ajoute ses résultats dans `out/<contextId>/manifest.json`
- Traçabilité complète du cycle de build
- Facilite le debugging et l'audit

---

## 📏 Règles d'intégrité des données

1. ✅ Chaque champ array doit avoir `initialValue: []`
2. ✅ Chaque bloc visuel doit contenir une image (réelle ou par défaut)
3. ✅ Chaque page doit avoir header et footer synchronisés
4. ✅ Chaque composant doit utiliser `export default defineType()`
5. ✅ Aucune validation `Rule.max` ne doit dépasser 500 sans justification

---

## ✅ Critères de succès final

- [ ] **0 erreur** Sanity/TypeScript/ESLint au build final
- [ ] **100% des pages** contiennent Hero, Footer et SEO Title
- [ ] **Toutes les images manquantes** remplacées automatiquement
- [ ] **Tous les handovers** respectent le contrat global
- [ ] **Publication validée** sans intervention manuelle
- [ ] **EventBus** opérationnel avec tous les agents
- [ ] **Manifest central** complet et à jour
- [ ] **Context.json** enrichi avec patterns appris

---

## 📊 Progression actuelle

```
Infrastructure:        ████████████████████ 100% ✅
compatibilityAgent:    ████████████████████ 100% ✅
diagnosticAgent:       ████████████████████ 100% ✅
diagnosticFixAgent:    ████████████████████ 100% ✅
publisherAgent:        ████████████████████ 100% ✅
cleanupAgent:          ████████████████████ 100% ✅

builderAgent:          ░░░░░░░░░░░░░░░░░░░░   0%
pageGeneratorAgent:    ░░░░░░░░░░░░░░░░░░░░   0%
reviewerAgent:         ░░░░░░░░░░░░░░░░░░░░   0%
styleAgent:            ░░░░░░░░░░░░░░░░░░░░   0%
seniorAgent:           ░░░░░░░░░░░░░░░░░░░░   0%

TOTAL:                 ██████░░░░░░░░░░░░░░  30%
```

---

## 🚀 Prochaines étapes immédiates

1. **Mettre à jour builderAgent** avec contrat global et injection d'images
2. **Améliorer diagnosticFixAgent-v2** avec corrections adaptatives
3. **Créer seniorAgent** comme orchestrateur principal
4. **Tester le pipeline complet** avec tous les agents

---

**Version:** 4.0  
**Dernière mise à jour:** 2025-01-07  
**Statut:** En cours de développement
