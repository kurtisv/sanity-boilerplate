# 🔧 FIX: Pages non visibles dans Sanity Studio

## 🔍 PROBLÈME IDENTIFIÉ

Les pages générées par le `pageGeneratorAgent` ne sont pas visibles dans Sanity Studio car elles étaient créées en mode "draft" par défaut.

## ✅ SOLUTION APPLIQUÉE

### Changement dans `pageGeneratorAgent.js`

**Avant:**
```javascript
const result = await client.create(pageDoc)
// Créait un document avec ID: drafts.xxx (non visible dans Studio)
```

**Après:**
```javascript
const pageId = `page-${slug}-${Date.now()}`
const pageDoc = {
  _id: pageId,  // ✅ ID explicite sans préfixe 'drafts.'
  _type: 'page',
  // ... autres champs
}
const result = await client.createOrReplace(pageDoc)
// Crée un document publié immédiatement visible dans Studio
```

## 📋 DÉTAILS TECHNIQUES

### Système de drafts Sanity

Sanity utilise un système de drafts/published:
- **Draft**: `drafts.xxx` - Document en cours d'édition (non publié)
- **Published**: `xxx` - Document publié et visible

### Pourquoi les pages n'étaient pas visibles

1. `client.create()` sans `_id` crée automatiquement un draft
2. Les drafts ne sont pas visibles dans la liste des documents publiés
3. Le Studio affiche par défaut les documents publiés

### Solution implémentée

1. ✅ Utiliser `createOrReplace()` avec un `_id` explicite
2. ✅ L'ID ne contient pas le préfixe `drafts.`
3. ✅ La page est immédiatement publiée et visible

## 🧪 VÉRIFICATION

Pour vérifier que les pages sont bien créées:

1. **Via le Studio:**
   ```
   http://localhost:3000/studio
   → Section "📄 Pages"
   → Les pages devraient être visibles
   ```

2. **Via GROQ Query:**
   ```javascript
   *[_type == "page"]
   ```

3. **Via les logs:**
   ```
   ✅ Page créée et publiée: page-accueil-1699999999999
   ```

## 📊 STRUCTURE DES PAGES

### Document Page
```javascript
{
  _id: 'page-accueil-1699999999999',
  _type: 'page',
  title: 'Accueil',
  slug: { current: 'accueil', _type: 'slug' },
  seoTitle: 'Accueil - Mon Site',
  seoDescription: 'Page Accueil de Mon Site',
  pageBuilder: [
    {
      _type: 'heroBlock',
      _key: 'hero-1699999999999',
      title: 'Bienvenue',
      // ... autres champs
    },
    // ... autres blocs
  ],
  publishedAt: '2024-11-07T21:00:00.000Z'
}
```

### Blocs dans pageBuilder

Les blocs sont des **objets** (type: 'object'), pas des documents:
- ✅ Ont `_type` et `_key`
- ❌ N'ont PAS `_id`
- ✅ Sont imbriqués dans le document page

## 🚀 PROCHAINES ÉTAPES

1. **Tester la génération:**
   ```bash
   http://localhost:3000/admin/auto-generate
   ```

2. **Vérifier dans Studio:**
   ```
   http://localhost:3000/studio
   → 📄 Pages
   ```

3. **Vérifier les blocs:**
   - Chaque page devrait avoir ses blocs dans `pageBuilder`
   - Les images devraient être injectées automatiquement

## 🐛 DEBUGGING

Si les pages ne sont toujours pas visibles:

1. **Vérifier les logs:**
   ```
   ✅ Page créée et publiée: page-xxx-xxx
   ```

2. **Vérifier dans Sanity Vision:**
   ```groq
   *[_type == "page"] {
     _id,
     title,
     slug,
     "blocksCount": count(pageBuilder)
   }
   ```

3. **Vérifier les erreurs:**
   - Erreurs de validation des champs
   - Champs manquants requis
   - Format incorrect des blocs

## ✅ RÉSULTAT ATTENDU

Après cette correction:
- ✅ Les pages sont créées et **immédiatement visibles** dans Studio
- ✅ Les pages apparaissent dans la section "📄 Pages"
- ✅ Les blocs sont correctement imbriqués dans `pageBuilder`
- ✅ Les images sont injectées automatiquement
- ✅ Les pages sont publiées (pas en draft)

---

**Date de correction:** 2024-11-07  
**Agent modifié:** `pageGeneratorAgent.js`  
**Lignes modifiées:** 153-168
