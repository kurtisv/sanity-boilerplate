# 🚨 Les 7 Types d'Erreurs et Solutions

## 📋 Table des Matières

1. [Erreur #1 : Noms de Champs Incorrects](#erreur-1--noms-de-champs-incorrects)
2. [Erreur #2 : Tableaux Null](#erreur-2--tableaux-null)
3. [Erreur #3 : Types de Données Incorrects](#erreur-3--types-de-données-incorrects)
4. [Erreur #4 : Clés _key Manquantes](#erreur-4--clés-_key-manquantes)
5. [Erreur #5 : Champs Requis Manquants](#erreur-5--champs-requis-manquants)
6. [Erreur #6 : Styles Manquants](#erreur-6--styles-manquants)
7. [Erreur #7 : Header et Footer Mal Configurés](#erreur-7--header-et-footer-mal-configurés)

---

## Erreur #1 : Noms de Champs Incorrects

### 🔴 Symptôme
- Champs ignorés par Sanity
- Données ne s'affichent pas sur le site
- Aucune erreur visible dans la console

### 🔍 Cause
Utilisation de noms supposés au lieu des noms réels du schéma

### 💡 Exemples

#### Exemple 1 : Champ `seo`
```typescript
// ❌ ERREUR
{
  _type: 'page',
  title: 'Accueil',
  seo: {
    title: 'Accueil - Mon Site',
    description: 'Bienvenue'
  }
}

// ✅ CORRECT
{
  _type: 'page',
  title: 'Accueil',
  seoTitle: 'Accueil - Mon Site',
  seoDescription: 'Bienvenue',
  seoKeywords: ['accueil', 'site']
}
```

#### Exemple 2 : Champ `blocks`
```typescript
// ❌ ERREUR
{
  _type: 'page',
  blocks: [...]
}

// ✅ CORRECT
{
  _type: 'page',
  pageBuilder: [...]
}
```

#### Exemple 3 : Champ `url`
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
    { _key: generateKey('cta', 1), text: 'Contact', href: '/contact' }
  ]
}
```

### ✅ Solution
**Lire les schémas Sanity AVANT de créer du contenu**

Fichiers à lire :
- `src/sanity/schemas/page.ts`
- `src/sanity/schemas/blocks/[nomDuBloc].ts`

### 📊 Tableau de Référence

| ❌ NOM SUPPOSÉ | ✅ NOM RÉEL | Schéma |
|----------------|-------------|---------|
| `seo` | `seoTitle`, `seoDescription`, `seoKeywords` | page.ts |
| `blocks` | `pageBuilder` | page.ts |
| `url` | `href` | ctaButton |
| `style` | `variant` | ctaButton |
| `contentAlignment` | `textAlignment` | heroSettings |
| `role` | `position` | teamMember |

---

## Erreur #2 : Tableaux Null

### 🔴 Symptôme
```
Cannot read properties of null (reading 'length')
```

### 🔍 Cause
- Tableaux omis dans les données
- Composants React tentent d'accéder à `.length` sur `null`

### 💡 Exemples

#### Exemple 1 : `ctaButtons` omis
```typescript
// ❌ ERREUR
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

// ✅ CORRECT
{
  _type: 'heroBlock',
  title: 'Bienvenue',
  subtitle: 'Notre site',
  ctaButtons: []  // Défini, même vide
}
```

#### Exemple 2 : `features` omis
```typescript
// ❌ ERREUR
{
  _type: 'featureGridBlock',
  title: 'Nos Services'
  // features omis
}

// ✅ CORRECT
{
  _type: 'featureGridBlock',
  title: 'Nos Services',
  features: []
}
```

#### Exemple 3 : `seoKeywords` omis
```typescript
// ❌ ERREUR
{
  _type: 'page',
  title: 'Accueil',
  seoTitle: 'Accueil'
  // seoKeywords omis
}

// ✅ CORRECT
{
  _type: 'page',
  title: 'Accueil',
  seoTitle: 'Accueil',
  seoKeywords: []
}
```

### ✅ Solution
**Toujours définir les tableaux, même vides `[]`**

### 📋 Tableaux à TOUJOURS Définir

| Bloc | Champ | Exemple |
|------|-------|---------|
| heroBlock | `ctaButtons` | `ctaButtons: []` |
| featureGridBlock | `features` | `features: []` |
| statsBlock | `stats` | `stats: []` |
| teamBlock | `members` | `members: []` |
| contactBlock | `formFields` | `formFields: []` |
| page | `seoKeywords` | `seoKeywords: []` |
| headerSettings | `navigationMenu`, `socialLinks` | `navigationMenu: []` |
| footerSettings | `columns`, `socialLinks`, `bottomLinks` | `columns: []` |

---

## Erreur #3 : Types de Données Incorrects

### 🔴 Symptôme
- Validation Sanity échoue
- Erreur "Type mismatch"
- Données ne sont pas sauvegardées

### 🔍 Cause
Type incorrect (Number au lieu de String, String au lieu d'Array, etc.)

### 💡 Exemples

#### Exemple 1 : `stats[].number` en Number
```typescript
// ❌ ERREUR
{
  _type: 'statsBlock',
  stats: [
    { 
      _key: generateKey('stat', 1),
      number: 95,  // ❌ Number
      label: 'Clients satisfaits'
    }
  ]
}

// ✅ CORRECT
{
  _type: 'statsBlock',
  stats: [
    { 
      _key: generateKey('stat', 1),
      number: '95',  // ✅ String
      label: 'Clients satisfaits'
    }
  ]
}
```

#### Exemple 2 : `seoKeywords` en String
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

#### Exemple 3 : `slug` en String
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

### ✅ Solution
**Vérifier les types dans les schémas et les respecter**

### 📊 Tableau de Référence des Types

| Champ | Type Attendu | ❌ Erreur | ✅ Correct |
|-------|--------------|-----------|------------|
| `stats[].number` | **String** | `95` | `'95'` |
| `seoKeywords` | **Array** | `'mot1, mot2'` | `['mot1', 'mot2']` |
| `slug` | **Object** | `'accueil'` | `{ current: 'accueil' }` |

---

## Erreur #4 : Clés _key Manquantes

### 🔴 Symptôme
```
Warning: Each child in a list should have a unique "key" prop
```

### 🔍 Cause
`_key` manquant dans les éléments d'array

### 💡 Exemples

#### Exemple 1 : `features` sans `_key`
```typescript
// ❌ ERREUR
{
  features: [
    { title: 'Feature 1', description: '...' },
    { title: 'Feature 2', description: '...' }
  ]
}

// ✅ CORRECT
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

#### Exemple 2 : `navigationMenu` sans `_key`
```typescript
// ❌ ERREUR
{
  navigationMenu: [
    { text: 'Accueil', link: '/accueil' },
    { text: 'Services', link: '/services' }
  ]
}

// ✅ CORRECT
{
  navigationMenu: [
    { _key: generateKey('nav', 1), text: 'Accueil', link: '/accueil' },
    { _key: generateKey('nav', 2), text: 'Services', link: '/services' }
  ]
}
```

### ✅ Solution
**Générer des `_key` uniques pour tous les éléments d'array**

```typescript
// Helper function
const generateKey = (prefix: string, index?: number) => 
  `${prefix}-${Date.now()}-${index || Math.random().toString(36).substr(2, 9)}`
```

---

## Erreur #5 : Champs Requis Manquants

### 🔴 Symptôme
- Validation Sanity échoue
- Erreur "Required field missing"
- Document ne peut pas être créé

### 🔍 Cause
Champs obligatoires omis (marqués `.required()` dans le schéma)

### 💡 Exemples

#### Exemple 1 : `title` manquant
```typescript
// ❌ ERREUR
{
  _type: 'statsBlock',
  subtitle: 'Nos chiffres',
  stats: [...]
  // title omis (requis)
}

// ✅ CORRECT
{
  _type: 'statsBlock',
  title: 'Nos Statistiques',  // ✅ Ajouté
  subtitle: 'Nos chiffres',
  stats: [...]
}
```

#### Exemple 2 : `label` manquant dans stats
```typescript
// ❌ ERREUR
{
  stats: [
    {
      _key: generateKey('stat', 1),
      number: '95'
      // label omis (requis)
    }
  ]
}

// ✅ CORRECT
{
  stats: [
    {
      _key: generateKey('stat', 1),
      number: '95',
      label: 'Clients satisfaits'  // ✅ Ajouté
    }
  ]
}
```

### ✅ Solution
**Vérifier les validations `.required()` dans les schémas**

### 📋 Champs Requis Courants

| Bloc | Champs Requis |
|------|---------------|
| page | `title`, `slug` |
| heroBlock | `title` |
| featureGridBlock | `title`, `features[].title` |
| statsBlock | `title`, `stats[].number`, `stats[].label` |
| teamBlock | `title`, `members[].name`, `members[].position` |
| contactBlock | `title`, `formFields[].fieldType`, `formFields[].label` |

---

## Erreur #6 : Styles Manquants

### 🔴 Symptôme
- Aucun design appliqué
- Page très basique (noir/blanc)
- Pas d'espacement personnalisé
- Pas de style de cartes

### 🔍 Cause
Champ `styling` omis

### 💡 Exemples

#### Exemple 1 : Bloc sans styling
```typescript
// ❌ ERREUR
{
  _type: 'featureGridBlock',
  title: 'Nos Services',
  subtitle: 'Des services de qualité',
  features: [...]
  // styling omis → Design basique
}

// ✅ CORRECT
{
  _type: 'featureGridBlock',
  title: 'Nos Services',
  subtitle: 'Des services de qualité',
  features: [...],
  backgroundSettings: {
    backgroundType: 'color',
    backgroundColor: '#f8fafc'
  },
  styling: {
    textColor: '#64748b',
    headingColor: '#334155',
    accentColor: '#10b981',
    alignment: 'center',
    spacing: 'comfortable',
    cardStyle: 'elevated',
    borderRadius: 'lg'
  }
}
```

### ✅ Solution
**Toujours définir `backgroundSettings` ET `styling`**

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

## Erreur #7 : Header et Footer Mal Configurés

### 🔴 Symptômes
- Header/Footer génériques
- Liens cassés (404)
- Informations de contact manquantes
- Menu mobile non fonctionnel

### 🔍 Causes
1. Documents `headerSettings`/`footerSettings` non créés
2. Liens vers pages inexistantes
3. `contactInfo` omis
4. `mobileMenu.enabled: false`
5. `_key` manquants

### 💡 Exemples

#### Erreur 1 : Liens Incorrects
```typescript
// ❌ ERREUR
{
  navigationMenu: [
    { text: 'Services', link: '/nos-services' }  // Page n'existe pas
  ]
}

// ✅ CORRECT
{
  navigationMenu: [
    { _key: generateKey('nav', 1), text: 'Services', link: '/services' }
  ]
}
```

#### Erreur 2 : ContactInfo Manquant
```typescript
// ❌ ERREUR
{
  _type: 'footerSettings',
  columns: [...]
  // contactInfo omis
}

// ✅ CORRECT
{
  _type: 'footerSettings',
  columns: [...],
  contactInfo: {
    address: '123 Rue Principale',
    phone: '(514) 555-0123',
    email: 'info@site.com',
    hours: 'Lun-Ven: 9h-17h'
  }
}
```

#### Erreur 3 : Menu Mobile Désactivé
```typescript
// ❌ ERREUR
{
  mobileMenu: {
    enabled: false
  }
}

// ✅ CORRECT
{
  mobileMenu: {
    enabled: true,
    breakpoint: 768
  }
}
```

#### Erreur 4 : `_key` Manquants
```typescript
// ❌ ERREUR
{
  socialLinks: [
    { platform: 'facebook', url: '...' }
  ]
}

// ✅ CORRECT
{
  socialLinks: [
    { _key: generateKey('social', 1), platform: 'facebook', url: '...' }
  ]
}
```

### ✅ Solution
**Suivre le guide complet dans 04_HEADER_FOOTER_STYLING.md**

### 📋 Checklist Header

- [ ] Document `headerSettings` créé
- [ ] Logo défini
- [ ] `navigationMenu` avec `_key` pour chaque élément
- [ ] Liens correspondent aux pages créées
- [ ] `ctaButton` défini
- [ ] `mobileMenu.enabled: true`

### 📋 Checklist Footer

- [ ] Document `footerSettings` créé
- [ ] `columns` avec `_key` pour chaque élément
- [ ] `contactInfo` complet (address, phone, email, hours)
- [ ] `socialLinks` avec `_key` pour chaque élément
- [ ] `copyrightText` défini
- [ ] `bottomLinks` définis

---

## ✅ Résumé des 7 Erreurs

| # | Erreur | Solution Rapide |
|---|--------|-----------------|
| 1 | Noms de champs | Lire les schémas |
| 2 | Tableaux null | Toujours définir `[]` |
| 3 | Types incorrects | Vérifier les types |
| 4 | `_key` manquants | Générer avec `generateKey()` |
| 5 | Champs requis | Vérifier `.required()` |
| 6 | Styles manquants | Définir `styling` |
| 7 | Header/Footer | Suivre le guide |

---

**🎯 Éviter ces 7 erreurs = Site parfait !**

**Créé le** : Novembre 2024  
**Version** : 3.0 Final
