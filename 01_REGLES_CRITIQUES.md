# ⚠️ Les 6 Règles Critiques

## 📋 Table des Matières

1. [Règle #1 : Toujours Lire les Schémas](#règle-1--toujours-lire-les-schémas)
2. [Règle #2 : Toujours Définir les Tableaux](#règle-2--toujours-définir-les-tableaux)
3. [Règle #3 : Utiliser les Noms Exacts](#règle-3--utiliser-les-noms-exacts)
4. [Règle #4 : Respecter les Types](#règle-4--respecter-les-types)
5. [Règle #5 : Toujours Générer les _key](#règle-5--toujours-générer-les-_key)
6. [Règle #6 : Toujours Définir les Styles](#règle-6--toujours-définir-les-styles)

---

## RÈGLE #1 : Toujours Lire les Schémas

### ❌ Problème

Les noms de champs ne sont PAS intuitifs. Supposer les noms = **ERREURS GARANTIES**.

### ✅ Solution

**Lire les schémas Sanity AVANT de créer du contenu**

### 📁 Fichiers à Lire

```bash
src/sanity/schemas/page.ts
src/sanity/schemas/blocks/heroBlock.ts
src/sanity/schemas/blocks/featureGridBlock.ts
src/sanity/schemas/blocks/statsBlock.ts
src/sanity/schemas/blocks/teamBlock.ts
src/sanity/schemas/blocks/contactBlock.ts
src/sanity/schemas/shared/themeFields.ts
```

### 📝 Ce qu'il Faut Noter

1. **Noms EXACTS des champs**
2. **Types de données** (String, Number, Array, Object)
3. **Champs requis** (`.required()`)
4. **Validations** (`.max()`, `.min()`)

### 💡 Exemple Concret

```typescript
// ❌ ERREUR - Noms supposés
{
  _type: 'page',
  title: 'Accueil',
  slug: 'accueil',  // ❌ Devrait être un objet
  seo: {  // ❌ Ce champ n'existe pas
    title: 'Accueil - Mon Site',
    description: 'Bienvenue'
  },
  blocks: [...]  // ❌ Devrait être pageBuilder
}

// ✅ CORRECT - Noms du schéma page.ts
{
  _type: 'page',
  title: 'Accueil',
  slug: { current: 'accueil' },  // ✅ Objet avec current
  seoTitle: 'Accueil - Mon Site',  // ✅ Champs séparés
  seoDescription: 'Bienvenue',
  seoKeywords: ['accueil', 'site'],
  pageBuilder: [...]  // ✅ Nom exact
}
```

### 📊 Tableau de Référence

| ❌ NOM SUPPOSÉ | ✅ NOM RÉEL | Fichier |
|----------------|-------------|---------|
| `seo` | `seoTitle`, `seoDescription`, `seoKeywords` | page.ts |
| `blocks` | `pageBuilder` | page.ts |
| `url` | `href` | ctaButton |
| `style` | `variant` | ctaButton |
| `contentAlignment` | `textAlignment` | heroSettings |
| `role` | `position` | teamMember |

---

## RÈGLE #2 : Toujours Définir les Tableaux

### ❌ Problème

Les composants React utilisent `.length` sur les tableaux. Si un tableau est `null` → **CRASH**.

### ✅ Solution

**Toujours définir les tableaux, même vides `[]`**

### 💡 Exemple d'Erreur

```typescript
// ❌ ERREUR - Tableau omis
{
  _type: 'heroBlock',
  title: 'Bienvenue',
  subtitle: 'Notre site'
  // ctaButtons omis → null
}

// Dans le composant React
{ctaButtons.length > 0 && (  // ❌ CRASH
  <CTAContainer>
    {ctaButtons.map(...)}
  </CTAContainer>
)}

// Erreur: Cannot read properties of null (reading 'length')
```

### ✅ Solution

```typescript
// ✅ CORRECT - Tableau défini
{
  _type: 'heroBlock',
  title: 'Bienvenue',
  subtitle: 'Notre site',
  ctaButtons: []  // ✅ Défini, même vide !
}
```

### 📋 Tableaux à TOUJOURS Définir

| Bloc | Champ Tableau | Exemple |
|------|---------------|---------|
| heroBlock | `ctaButtons` | `ctaButtons: []` |
| featureGridBlock | `features` | `features: []` |
| statsBlock | `stats` | `stats: []` |
| teamBlock | `members` | `members: []` |
| contactBlock | `formFields` | `formFields: []` |
| page | `seoKeywords` | `seoKeywords: []` |
| headerSettings | `navigationMenu` | `navigationMenu: []` |
| footerSettings | `columns`, `socialLinks` | `columns: [], socialLinks: []` |

---

## RÈGLE #3 : Utiliser les Noms Exacts

### ❌ Problème

Sanity rejette les champs inconnus. Un seul caractère différent = champ ignoré.

### ✅ Solution

**Utiliser les noms EXACTS des schémas, caractère par caractère**

### 💡 Exemples d'Erreurs Courantes

#### Erreur 1 : Champ `seo`
```typescript
// ❌ ERREUR
{
  seo: {
    title: 'Mon Site',
    description: 'Description'
  }
}

// ✅ CORRECT
{
  seoTitle: 'Mon Site',
  seoDescription: 'Description',
  seoKeywords: []
}
```

#### Erreur 2 : Champ `blocks`
```typescript
// ❌ ERREUR
{ blocks: [...] }

// ✅ CORRECT
{ pageBuilder: [...] }
```

#### Erreur 3 : Champ `url`
```typescript
// ❌ ERREUR
{
  ctaButtons: [
    { text: 'Contact', url: '/contact' }
  ]
}

// ✅ CORRECT
{
  ctaButtons: [
    { text: 'Contact', href: '/contact' }
  ]
}
```

#### Erreur 4 : Champ `style`
```typescript
// ❌ ERREUR
{
  ctaButtons: [
    { text: 'Contact', href: '/contact', style: 'primary' }
  ]
}

// ✅ CORRECT
{
  ctaButtons: [
    { text: 'Contact', href: '/contact', variant: 'primary' }
  ]
}
```

#### Erreur 5 : Champ `contentAlignment`
```typescript
// ❌ ERREUR
{
  _type: 'heroBlock',
  heroSettings: {
    contentAlignment: 'center'
  }
}

// ✅ CORRECT
{
  _type: 'heroBlock',
  heroSettings: {
    textAlignment: 'center'
  }
}
```

#### Erreur 6 : Champ `role`
```typescript
// ❌ ERREUR
{
  _type: 'teamBlock',
  members: [
    { name: 'Jean', role: 'Développeur' }
  ]
}

// ✅ CORRECT
{
  _type: 'teamBlock',
  members: [
    { name: 'Jean', position: 'Développeur' }
  ]
}
```

---

## RÈGLE #4 : Respecter les Types

### ❌ Problème

Sanity valide les types strictement. Type incorrect = validation échoue.

### ✅ Solution

**Vérifier les types dans les schémas et les respecter**

### 💡 Exemples d'Erreurs de Types

#### Erreur 1 : `stats[].number` en Number
```typescript
// ❌ ERREUR
{
  _type: 'statsBlock',
  stats: [
    { number: 95, label: 'Clients satisfaits' }  // ❌ Number
  ]
}

// ✅ CORRECT
{
  _type: 'statsBlock',
  stats: [
    { number: '95', label: 'Clients satisfaits' }  // ✅ String
  ]
}
```

#### Erreur 2 : `seoKeywords` en String
```typescript
// ❌ ERREUR
{
  seoKeywords: 'massage, détente, bien-être'  // ❌ String
}

// ✅ CORRECT
{
  seoKeywords: ['massage', 'détente', 'bien-être']  // ✅ Array
}
```

#### Erreur 3 : `slug` en String
```typescript
// ❌ ERREUR
{
  slug: 'accueil'  // ❌ String
}

// ✅ CORRECT
{
  slug: { current: 'accueil' }  // ✅ Object
}
```

### 📊 Tableau de Référence des Types

| Champ | Type Attendu | Exemple Correct |
|-------|--------------|-----------------|
| `stats[].number` | **String** | `'95'` |
| `seoKeywords` | **Array** | `['mot1', 'mot2']` |
| `slug` | **Object** | `{ current: 'slug' }` |
| `ctaButtons` | **Array** | `[{...}]` |
| `features` | **Array** | `[{...}]` |
| `members` | **Array** | `[{...}]` |

---

## RÈGLE #5 : Toujours Générer les _key

### ❌ Problème

- Sanity exige des `_key` uniques pour tous les éléments d'array
- React exige des `key` pour les listes
- Sans `_key` → Erreurs de validation + Warnings React

### ✅ Solution

**Générer des `_key` uniques pour TOUS les éléments d'array**

### 💡 Exemple d'Erreur

```typescript
// ❌ ERREUR - Pas de _key
{
  features: [
    { title: 'Feature 1', description: '...' },
    { title: 'Feature 2', description: '...' }
  ]
}

// Résultats:
// - Validation Sanity échoue
// - Warning React: "Each child should have a unique key prop"
```

### ✅ Solution avec Helper Function

```typescript
// Helper function
const generateKey = (prefix: string, index?: number) => 
  `${prefix}-${Date.now()}-${index || Math.random().toString(36).substr(2, 9)}`

// ✅ CORRECT - Avec _key
{
  features: [
    { 
      _key: generateKey('feature', 1),
      title: 'Feature 1',
      description: '...'
    },
    { 
      _key: generateKey('feature', 2),
      title: 'Feature 2',
      description: '...'
    }
  ]
}
```

### 📋 Éléments Nécessitant un _key

**Tous les éléments d'array** :

| Array | Prefix Recommandé | Exemple |
|-------|-------------------|---------|
| `ctaButtons[]` | `'cta'` | `_key: generateKey('cta', 1)` |
| `features[]` | `'feature'` | `_key: generateKey('feature', 1)` |
| `stats[]` | `'stat'` | `_key: generateKey('stat', 1)` |
| `members[]` | `'member'` | `_key: generateKey('member', 1)` |
| `formFields[]` | `'field'` | `_key: generateKey('field', 1)` |
| `navigationMenu[]` | `'nav'` | `_key: generateKey('nav', 1)` |
| `socialLinks[]` | `'social'` | `_key: generateKey('social', 1)` |
| `columns[]` | `'col'` | `_key: generateKey('col', 1)` |
| `links[]` | `'link'` | `_key: generateKey('link', 1)` |

---

## RÈGLE #6 : Toujours Définir les Styles

### ❌ Problème

Sans le champ `styling`, **aucun design n'est appliqué**. La page reste très basique.

### ✅ Solution

**Toujours définir `backgroundSettings` ET `styling` pour chaque bloc**

### 💡 Exemple d'Erreur

```typescript
// ❌ ERREUR - Pas de styling
{
  _type: 'featureGridBlock',
  title: 'Nos Services',
  subtitle: 'Des services de qualité',
  features: [...]
  // styling omis
}

// Résultat:
// - Couleurs par défaut (noir/blanc)
// - Pas d'espacement personnalisé
// - Pas de style de cartes
// - Design très basique
```

### ✅ Solution Complète

```typescript
// ✅ CORRECT - Avec styling complet
{
  _type: 'featureGridBlock',
  title: 'Nos Services',
  subtitle: 'Des services de qualité',
  features: [...],
  
  // Background
  backgroundSettings: {
    backgroundType: 'color',
    backgroundColor: '#f8fafc'
  },
  
  // Styling
  styling: {
    textColor: '#64748b',        // Couleur du texte
    headingColor: '#334155',     // Couleur des titres
    accentColor: '#10b981',      // Couleur d'accent
    alignment: 'center',         // Alignement
    spacing: 'comfortable',      // Espacement
    cardStyle: 'elevated',       // Style des cartes
    borderRadius: 'lg'           // Coins arrondis
  }
}
```

### 📊 Champs Styling Obligatoires

| Champ | Valeurs Possibles | Description |
|-------|-------------------|-------------|
| `textColor` | Hex color | Couleur du texte principal |
| `headingColor` | Hex color | Couleur des titres |
| `accentColor` | Hex color | Couleur d'accent (liens, boutons) |
| `alignment` | `'left'`, `'center'`, `'right'` | Alignement du texte |
| `spacing` | `'compact'`, `'normal'`, `'comfortable'`, `'large'`, `'xl'` | Espacement vertical |
| `cardStyle` | `'flat'`, `'bordered'`, `'elevated'`, `'shadow'` | Style des cartes |
| `borderRadius` | `'none'`, `'sm'`, `'md'`, `'lg'`, `'xl'` | Coins arrondis |

### 🎨 Templates de Styling

#### Zen et Apaisant
```typescript
styling: {
  textColor: '#64748b',
  headingColor: '#334155',
  accentColor: '#10b981',
  alignment: 'center',
  spacing: 'comfortable',
  cardStyle: 'elevated',
  borderRadius: 'lg'
}
```

#### Professionnel
```typescript
styling: {
  textColor: '#475569',
  headingColor: '#1e293b',
  accentColor: '#3b82f6',
  alignment: 'left',
  spacing: 'normal',
  cardStyle: 'bordered',
  borderRadius: 'md'
}
```

---

## ✅ Checklist des 6 Règles

Avant de créer du contenu, vérifier :

- [ ] **Règle #1** : J'ai lu les schémas Sanity
- [ ] **Règle #2** : Tous mes tableaux sont définis (même vides)
- [ ] **Règle #3** : J'utilise les noms exacts des schémas
- [ ] **Règle #4** : Je respecte les types de données
- [ ] **Règle #5** : J'ai généré les `_key` pour tous les éléments
- [ ] **Règle #6** : J'ai défini `styling` pour tous les blocs

---

**🎯 Suivre ces 6 règles = Zéro erreur garantie !**

**Créé le** : Novembre 2024  
**Version** : 3.0 Final
