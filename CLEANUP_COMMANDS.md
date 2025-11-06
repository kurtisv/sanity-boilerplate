# 🧹 LISTE DE NETTOYAGE DU PROJET

Cette liste contient tous les fichiers et dossiers à supprimer pour nettoyer le projet.
**Total estimé: ~60 fichiers/dossiers**

---

## 📝 CATÉGORIE 1: DOCUMENTS MARKDOWN REDONDANTS (17 fichiers)

Ces documents sont soit redondants, soit obsolètes. On garde seulement les essentiels.

### À SUPPRIMER:
```bash
rm 00_LIRE_EN_PREMIER.md
rm 01_REGLES_CRITIQUES.md
rm 02_TOUTES_LES_ERREURS.md
rm CLEANUP_SUMMARY.md
rm CONFORMITY_REPORT.md
rm DOCUMENTATION_INDEX.md
rm FICHIERS_IMPORTANTS.md
rm GUIDE_APPROPRIATION.md
rm MANUEL_AUTO_IMPLEMENTATION.md
rm NOUVEAUX_BLOCS_COMPLETS.md
rm NOUVEAUX_COMPOSANTS_REACT.md
rm TESTING_PLAN.md
rm WEBHOOK_SETUP.md
rm README_FINAL.md
```

### À GARDER:
- ✅ `README.md` (principal - à créer si manquant)
- ✅ `GUIDE_AUTO_GENERATION.md` (système d'auto-génération)
- ✅ `GUIDE_BLOCS_STUDIO.md` (guide des blocs)
- ✅ `QUICK_START.md` (démarrage rapide)

---

## 🗑️ CATÉGORIE 2: SCRIPTS INUTILISÉS/VIDES (3 fichiers)

```bash
rm scripts/add-common-fields.js
rm scripts/validate-schemas.js
rm cleanup-orphaned-docs.js
rm simple-test.js
rm test-apis.js
rm cleanup.bat
```

---

## 📂 CATÉGORIE 3: DOSSIERS VIDES (9 dossiers)

```bash
rmdir content-massotherapie
rmdir src/app/admin/create-demos
rmdir src/app/admin/kvks-manager
rmdir src/app/admin/massage-site-manager
rmdir src/app/admin/regenerate
rmdir src/app/api/admin
rmdir src/app/api/create-kvks-site
rmdir src/app/api/create-massage-site
rmdir src/app/api/get-all-pages
```

---

## 🧪 CATÉGORIE 4: PAGES DE TEST/DEMO (7 pages + APIs)

### Pages Admin de Test:
```bash
rm -r src/app/admin/demo
rm -r src/app/admin/fix-apis
rm -r src/app/admin/fix-keys
rm -r src/app/admin/migration
rm -r src/app/admin/navigation
```

### Pages Website de Test:
```bash
rm -r src/app/(website)/modern-home
rm -r src/app/(website)/styled-home
rm -r src/app/(website)/test-404
rm -r src/app/(website)/theme-demo
rm -r src/app/(website)/routing-analysis
```

### APIs de Test/Migration:
```bash
rm -r src/app/api/migrate-all-blocks
rm -r src/app/api/migrate-hero-blocks
rm -r src/app/api/test-stats
rm -r src/app/api/cleanup-studio
```

---

## 🎯 CATÉGORIE 5: PAGES ADMIN REDONDANTES (10 pages)

Ces pages admin créent du contenu, mais peuvent être remplacées par l'auto-générateur.

### Pages Admin à Supprimer (remplacées par auto-generate):
```bash
rm -r src/app/admin/about
rm -r src/app/admin/faq
rm -r src/app/admin/home
rm -r src/app/admin/legal
rm -r src/app/admin/pages
rm -r src/app/admin/portfolio
rm -r src/app/admin/pricing
rm -r src/app/admin/services
rm -r src/app/admin/site-settings
```

### APIs Correspondantes à Supprimer:
```bash
rm -r src/app/api/setup-about
rm -r src/app/api/setup-blog
rm -r src/app/api/setup-careers
rm -r src/app/api/setup-contact
rm -r src/app/api/setup-contact-simple
rm -r src/app/api/setup-faq
rm -r src/app/api/setup-footer
rm -r src/app/api/setup-header
rm -r src/app/api/setup-legal
rm -r src/app/api/setup-portfolio
rm -r src/app/api/setup-pricing
rm -r src/app/api/setup-services
rm -r src/app/api/setup-studio-showcase
rm -r src/app/api/import-home
```

---

## 📄 CATÉGORIE 6: FICHIERS DE CONFIGURATION OBSOLÈTES (3 fichiers)

```bash
rm demo-content.json
rm setup-env.bat
```

---

## 🧩 CATÉGORIE 7: COMPOSANTS INUTILISÉS (2 dossiers)

```bash
rmdir src/components/pages
rmdir src/components/ui
```

---

## 📋 RÉSUMÉ PAR PRIORITÉ

### 🔴 PRIORITÉ HAUTE (Impact minimal, sûr à supprimer):
1. Dossiers vides (9)
2. Scripts vides/obsolètes (6)
3. Documents markdown redondants (14)

### 🟡 PRIORITÉ MOYENNE (Pages de test):
4. Pages de test/demo (7)
5. APIs de test/migration (4)

### 🟠 PRIORITÉ BASSE (Vérifier avant suppression):
6. Pages admin redondantes (10)
7. APIs de setup redondantes (14)

---

## ✅ CE QU'ON GARDE

### Documentation Essentielle:
- `README.md` (à créer/compléter)
- `GUIDE_AUTO_GENERATION.md`
- `GUIDE_BLOCS_STUDIO.md`
- `QUICK_START.md`

### Agents Claude:
- `agents/` (tout le dossier)
- `scripts/interactive-builder.js`
- `scripts/orchestrator.js`
- `scripts/run-agent.js`

### Scripts Essentiels:
- `scripts/import-demo.js`
- `scripts/setup-demo.js`
- `scripts/fix-stats-keys.js`

### Pages Admin Essentielles:
- `src/app/admin/page.tsx` (dashboard principal)
- `src/app/admin/auto-generate/` (système d'auto-génération)
- `src/app/admin/cleanup/` (nettoyage)
- `src/app/admin/studio-showcase/` (vitrine)

### APIs Essentielles:
- `src/app/api/auto-generate/` (auto-génération)
- `src/app/api/import-demo/` (import démo)
- `src/app/api/delete-all-pages/` (nettoyage)
- `src/app/api/delete-page/` (suppression)
- `src/app/api/studio-pages/` (récupération pages)
- `src/app/api/preview/` (preview mode)
- `src/app/api/exit-preview/` (sortie preview)
- `src/app/api/revalidate/` (revalidation)

### Pages Website Essentielles:
- `src/app/(website)/[[...slug]]/` (routing dynamique)
- `src/app/(website)/demo/` (page démo)
- `src/app/(website)/about/` (à propos)
- `src/app/(website)/blog/` (blog)
- `src/app/(website)/careers/` (carrières)
- `src/app/(website)/contact/` (contact)
- `src/app/(website)/faq/` (FAQ)
- `src/app/(website)/legal/` (légal)
- `src/app/(website)/portfolio/` (portfolio)
- `src/app/(website)/pricing/` (tarifs)
- `src/app/(website)/services/` (services)
- `src/app/(website)/studio-showcase/` (vitrine studio)

### Tous les Composants:
- `src/components/blocks/` (tous les 24 blocs)
- `src/components/BlockRenderer/`
- `src/components/common/`
- `src/components/layout/`
- `src/components/seo/`

---

## 🚀 COMMANDES DE NETTOYAGE GROUPÉES

### ÉTAPE 1 - Nettoyage Sûr (Priorité Haute):
```bash
# Documents markdown
rm 00_LIRE_EN_PREMIER.md 01_REGLES_CRITIQUES.md 02_TOUTES_LES_ERREURS.md CLEANUP_SUMMARY.md CONFORMITY_REPORT.md DOCUMENTATION_INDEX.md FICHIERS_IMPORTANTS.md GUIDE_APPROPRIATION.md MANUEL_AUTO_IMPLEMENTATION.md NOUVEAUX_BLOCS_COMPLETS.md NOUVEAUX_COMPOSANTS_REACT.md TESTING_PLAN.md WEBHOOK_SETUP.md README_FINAL.md

# Scripts obsolètes
rm scripts/add-common-fields.js scripts/validate-schemas.js cleanup-orphaned-docs.js simple-test.js test-apis.js cleanup.bat demo-content.json setup-env.bat

# Dossiers vides
rmdir content-massotherapie src/app/admin/create-demos src/app/admin/kvks-manager src/app/admin/massage-site-manager src/app/admin/regenerate src/app/api/admin src/app/api/create-kvks-site src/app/api/create-massage-site src/app/api/get-all-pages src/components/pages src/components/ui
```

### ÉTAPE 2 - Pages de Test (Priorité Moyenne):
```bash
# Pages admin de test
rm -r src/app/admin/demo src/app/admin/fix-apis src/app/admin/fix-keys src/app/admin/migration src/app/admin/navigation

# Pages website de test
rm -r src/app/(website)/modern-home src/app/(website)/styled-home src/app/(website)/test-404 src/app/(website)/theme-demo src/app/(website)/routing-analysis

# APIs de test
rm -r src/app/api/migrate-all-blocks src/app/api/migrate-hero-blocks src/app/api/test-stats src/app/api/cleanup-studio
```

### ÉTAPE 3 - Pages Admin Redondantes (Priorité Basse - OPTIONNEL):
```bash
# Seulement si vous utilisez exclusivement auto-generate
rm -r src/app/admin/about src/app/admin/faq src/app/admin/home src/app/admin/legal src/app/admin/pages src/app/admin/portfolio src/app/admin/pricing src/app/admin/services src/app/admin/site-settings

# APIs correspondantes
rm -r src/app/api/setup-about src/app/api/setup-blog src/app/api/setup-careers src/app/api/setup-contact src/app/api/setup-contact-simple src/app/api/setup-faq src/app/api/setup-footer src/app/api/setup-header src/app/api/setup-legal src/app/api/setup-portfolio src/app/api/setup-pricing src/app/api/setup-services src/app/api/setup-studio-showcase src/app/api/import-home
```

---

## 📊 GAIN D'ESPACE ESTIMÉ

- Documents markdown: ~150 KB
- Scripts obsolètes: ~15 KB
- Pages de test: ~50 KB
- Pages admin redondantes: ~200 KB
- APIs redondantes: ~150 KB

**Total: ~565 KB + structure simplifiée**

---

## ⚠️ AVERTISSEMENTS

1. **Avant de supprimer l'ÉTAPE 3**, vérifiez que:
   - Votre système d'auto-génération fonctionne parfaitement
   - Vous n'avez pas besoin des pages admin individuelles
   - Toutes les APIs de setup peuvent être remplacées par auto-generate

2. **Après suppression**:
   - Testez que le site fonctionne toujours: `npm run dev`
   - Vérifiez que Sanity Studio fonctionne: `/studio`
   - Testez l'auto-génération: `/admin/auto-generate`

3. **Git**:
   - Faites un commit avant de commencer le nettoyage
   - Vous pourrez toujours revenir en arrière si besoin

---

## 🎯 COMMANDE UNIQUE (TOUT SUPPRIMER - DANGER)

**⚠️ ATTENTION: Cette commande supprime TOUT ce qui est listé ci-dessus**

```bash
# À vos risques et périls !
rm 00_LIRE_EN_PREMIER.md 01_REGLES_CRITIQUES.md 02_TOUTES_LES_ERREURS.md CLEANUP_SUMMARY.md CONFORMITY_REPORT.md DOCUMENTATION_INDEX.md FICHIERS_IMPORTANTS.md GUIDE_APPROPRIATION.md MANUEL_AUTO_IMPLEMENTATION.md NOUVEAUX_BLOCS_COMPLETS.md NOUVEAUX_COMPOSANTS_REACT.md TESTING_PLAN.md WEBHOOK_SETUP.md README_FINAL.md demo-content.json setup-env.bat cleanup-orphaned-docs.js simple-test.js test-apis.js cleanup.bat scripts/add-common-fields.js scripts/validate-schemas.js && rmdir content-massotherapie src/components/pages src/components/ui && rm -r src/app/admin/demo src/app/admin/fix-apis src/app/admin/fix-keys src/app/admin/migration src/app/admin/navigation src/app/admin/create-demos src/app/admin/kvks-manager src/app/admin/massage-site-manager src/app/admin/regenerate src/app/(website)/modern-home src/app/(website)/styled-home src/app/(website)/test-404 src/app/(website)/theme-demo src/app/(website)/routing-analysis src/app/api/migrate-all-blocks src/app/api/migrate-hero-blocks src/app/api/test-stats src/app/api/cleanup-studio src/app/api/admin src/app/api/create-kvks-site src/app/api/create-massage-site src/app/api/get-all-pages
```

---

**Créé le:** 2025-11-06
**Révision:** 1.0
