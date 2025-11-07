# 🔍 DIAGNOSTIC: Problème de pages non visibles dans Studio

## 📋 ANALYSE EFFECTUÉE

### 1. ✅ cleanupAgent - PAS LE PROBLÈME
**Vérifié:** `agents/cleanupAgent.js`
- Ne supprime QUE les fichiers du code source (fichiers vides, exports non utilisés, tests orphelins)
- Ne touche PAS aux documents Sanity
- Logs confirment: `Fichiers supprimés: 0`

### 2. ✅ publisherAgent - PAS LE PROBLÈME  
**Vérifié:** `agents/publisherAgent.js`
- Ne fait que VÉRIFIER les pages existantes
- N'effectue AUCUNE suppression
- Fonction `verifyPages()` fait seulement un `client.fetch()`

### 3. ✅ diagnosticAgent - PAS LE PROBLÈME
**Vérifié:** `agents/diagnosticAgent.js`
- Crée un document de test: `test.diagnostic.{timestamp}`
- Le supprime immédiatement après (ligne 102)
- N'affecte PAS les pages créées par pageGeneratorAgent

### 4. ✅ Schémas Sanity - TOUS PRÉSENTS
**Vérifié:** `src/sanity/schemas/index.ts`
- ✅ `page` enregistré
- ✅ `heroBlock` enregistré
- ✅ `featureGridBlock` enregistré
- ✅ `statsBlock` enregistré
- ✅ `contactBlock` enregistré

### 5. ✅ pageBuilder - BLOCS AUTORISÉS
**Vérifié:** `src/sanity/schemas/page.ts` (lignes 53-78)
- Tous les blocs utilisés sont dans la liste `of: []`

### 6. ✅ Structure Studio - CONFIGURÉE
**Vérifié:** `src/sanity/structure.ts` (lignes 43-51)
```typescript
S.listItem()
  .title('📄 Pages')
  .id('pages')
  .child(
    S.documentTypeList('page')
      .title('Pages')
      .filter('_type == "page"')
      .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
  )
```

## 🐛 HYPOTHÈSES DU PROBLÈME

### Hypothèse #1: Pages créées en draft
**Status:** ✅ CORRIGÉ
- Problème: `client.create()` créait des drafts (`drafts.xxx`)
- Solution appliquée: Utiliser `createOrReplace()` avec `_id` explicite
- Code modifié: `pageGeneratorAgent.js` lignes 153-168

### Hypothèse #2: Erreur de validation Sanity
**Status:** ⚠️ À VÉRIFIER
- Les blocs créés pourraient ne pas respecter exactement le schéma
- Champs manquants ou types incorrects
- Sanity rejette silencieusement les documents invalides

### Hypothèse #3: Timing / Race condition
**Status:** ⚠️ À VÉRIFIER
- Les pages sont créées mais le Studio n'est pas encore rafraîchi
- Le cache CDN de Sanity n'est pas invalidé
- Délai nécessaire entre création et affichage

### Hypothèse #4: Permissions Sanity
**Status:** ⚠️ À VÉRIFIER
- Le token utilisé n'a peut-être pas les permissions de lecture
- Les pages sont créées mais invisibles pour le Studio

## 🧪 TESTS À EFFECTUER

### Test 1: Vérifier les pages via GROQ
```bash
# Dans Sanity Vision (http://localhost:3000/studio/vision)
*[_type == "page"] {
  _id,
  _createdAt,
  title,
  slug,
  "blocksCount": count(pageBuilder),
  "blocks": pageBuilder[]._type
}
```

**Résultat attendu:**
- Si vide → Les pages ne sont PAS créées
- Si présent → Les pages SONT créées mais pas visibles dans la structure

### Test 2: Vérifier les logs de création
```bash
# Chercher dans les logs du terminal
✅ Page créée et publiée: page-accueil-xxx
```

**Résultat attendu:**
- Si présent → La création a réussi
- Si absent → Erreur lors de la création

### Test 3: Créer une page manuellement
```bash
# Exécuter directement le pageGeneratorAgent
cd agents
node pageGeneratorAgent.js "Test Page" --dry-run=false
```

**Résultat attendu:**
- Vérifier si la page apparaît dans Studio
- Comparer l'ID généré avec ceux de l'API

### Test 4: Vérifier la structure des blocs
```javascript
// Dans le pageGeneratorAgent, ajouter un log avant création
console.log('📦 Page document:', JSON.stringify(pageDoc, null, 2))
```

**Résultat attendu:**
- Vérifier que tous les champs requis sont présents
- Vérifier que les blocs ont `_type` et `_key`

## 🔧 SOLUTIONS POSSIBLES

### Solution A: Ajouter initialValue aux arrays
**Problème:** Les arrays dans les blocs pourraient manquer d'initialValue

**Fix dans les schémas de blocs:**
```typescript
{
  name: 'features',
  type: 'array',
  initialValue: [],  // ✅ Ajouter ceci
  of: [...]
}
```

### Solution B: Valider avant création
**Problème:** Les documents invalides sont rejetés silencieusement

**Fix dans pageGeneratorAgent:**
```javascript
// Avant client.createOrReplace()
const validation = await client.config().dataset.validate(pageDoc)
if (!validation.valid) {
  console.error('❌ Document invalide:', validation.errors)
  throw new Error('Document validation failed')
}
```

### Solution C: Forcer le rafraîchissement du Studio
**Problème:** Le Studio ne se rafraîchit pas automatiquement

**Fix:** Ajouter un délai ou forcer le refresh
```javascript
// Après création
await new Promise(resolve => setTimeout(resolve, 2000))
```

### Solution D: Utiliser une transaction
**Problème:** Les documents ne sont pas atomiquement créés

**Fix dans pageGeneratorAgent:**
```javascript
const transaction = client.transaction()
transaction.createOrReplace(pageDoc)
await transaction.commit()
```

## 📊 ORDRE D'EXÉCUTION ACTUEL

```
1. analystAgent (analyse)
2. pageGeneratorAgent (création pages) ← LES PAGES SONT CRÉÉES ICI
3. reviewerAgent (validation schémas TS)
4. styleAgent (validation design)
5. compatibilityAgent (tests)
6. diagnosticAgent (diagnostic)
7. publisherAgent (vérification)
8. cleanupAgent (nettoyage code)
```

**Note:** Les pages sont créées à l'étape 2, mais les agents 3-8 ne les affectent PAS.

## ✅ PROCHAINES ÉTAPES

1. **Exécuter Test 1** (GROQ query) pour confirmer si les pages existent
2. **Vérifier les logs** pour voir les IDs créés
3. **Tester création manuelle** d'une page
4. **Ajouter logging détaillé** dans pageGeneratorAgent
5. **Vérifier permissions** du token Sanity

## 🎯 CONCLUSION ACTUELLE

**Les agents ne suppriment PAS les pages.**

Le problème est probablement:
- ⚠️ Les pages ne sont pas créées correctement (validation échoue)
- ⚠️ Les pages sont créées mais invisibles (permissions/cache)
- ⚠️ Les pages sont créées en draft malgré le fix
- ⚠️ Le Studio ne rafraîchit pas automatiquement

**Action recommandée:** Exécuter les tests ci-dessus pour identifier la cause exacte.
