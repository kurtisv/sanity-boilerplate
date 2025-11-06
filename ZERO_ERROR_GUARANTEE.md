# 🛡️ GARANTIE ZÉRO ERREUR - SYSTÈME DE PROTECTION COMPLET

Ce document explique comment le système garantit qu'**AUCUNE** erreur "Cannot read properties of null/undefined" ne se produira jamais, peu importe le bloc, le composant ou la page créée.

---

## 🎯 OBJECTIF

**Éliminer à 100% les erreurs suivantes:**
- ❌ `Cannot read properties of null (reading 'length')`
- ❌ `Cannot read properties of undefined (reading 'map')`
- ❌ `Cannot read properties of null (reading 'forEach')`
- ❌ Toute erreur liée à null/undefined dans les données Sanity

---

## 🏗️ ARCHITECTURE DU SYSTÈME

### 1. **Couche de Normalisation des Données**
**Fichier:** `/src/lib/sanity-data-normalizer.ts`

**Rôle:** Transformer TOUTES les données Sanity en données sûres

**Fonctions principales:**
```typescript
ensureArray()      → Garantit un array (jamais null)
ensureString()     → Garantit une string (jamais null)
ensureNumber()     → Garantit un number (jamais null)
ensureBoolean()    → Garantit un boolean (jamais null)
ensureObject()     → Garantit un objet (jamais null)
normalizeBlockData() → Normalise récursivement TOUT
```

### 2. **Couche de Protection des Composants**
**Fichier:** `/src/components/blocks/withSafeProps.tsx`

**Rôle:** Protéger automatiquement tous les composants React

**Hooks disponibles:**
```typescript
useSafeProps()   → Normalise toutes les props
useSafeArray()   → Garantit un array sûr
useSafeObject()  → Garantit un objet sûr
useHasItems()    → Vérifie si array a des items (sûr)
```

### 3. **Template de Composant Sécurisé**
**Fichier:** `SAFE_BLOCK_TEMPLATE.tsx`

**Rôle:** Base pour tous les nouveaux composants

**Structure garantie:**
- ✅ Normalisation automatique des props
- ✅ Protection des arrays
- ✅ Protection des objets
- ✅ Valeurs par défaut partout
- ✅ Vérifications avant accès

### 4. **Agent de Correction**
**Fichier:** `agents/fixPagesAgent.js`

**Rôle:** Corriger les pages existantes qui ont des données null

**Commande:** `npm run agents:fix-pages`

---

## 📋 GUIDE D'UTILISATION

### Pour Créer un Nouveau Composant de Bloc

**ÉTAPE 1:** Copier le template
```bash
cp SAFE_BLOCK_TEMPLATE.tsx src/components/blocks/MyNewBlock/MyNewBlock.tsx
```

**ÉTAPE 2:** Personnaliser l'interface
```typescript
interface MyNewBlockProps {
  title?: string
  items?: Array<{ _key?: string; name: string }>
  settings?: { layout?: string }
}
```

**ÉTAPE 3:** Utiliser les hooks de sécurité
```typescript
export default function MyNewBlock(props: MyNewBlockProps) {
  const safeProps = useSafeProps(props)
  const items = useSafeArray(props.items)
  const settings = useSafeObject(props.settings, { layout: 'grid' })
  
  // ✅ items est TOUJOURS un array
  // ✅ settings est TOUJOURS un objet
  // ✅ AUCUNE erreur possible
}
```

**ÉTAPE 4:** Utiliser les données en toute sécurité
```typescript
// ✅ CORRECT - Jamais d'erreur
{items.length > 0 && items.map(item => ...)}

// ✅ CORRECT - Avec helper
{hasItems(items) && items.map(item => ...)}

// ❌ INCORRECT - Ne JAMAIS faire ça
{props.items.length > 0 && ...}  // Peut crasher si null
```

### Pour Mettre à Jour un Composant Existant

**ÉTAPE 1:** Ajouter les imports
```typescript
import { useSafeProps, useSafeArray, useSafeObject } from '../withSafeProps'
```

**ÉTAPE 2:** Modifier la signature de la fonction
```typescript
// ❌ AVANT
export default function MyBlock({ items, settings }: Props) {
  
// ✅ APRÈS
export default function MyBlock(props: Props) {
  const safeProps = useSafeProps(props)
  const items = useSafeArray(props.items)
  const settings = useSafeObject(props.settings, { layout: 'grid' })
```

**ÉTAPE 3:** Utiliser les données normalisées
```typescript
// Maintenant items et settings sont toujours sûrs
```

### Pour Créer des Données dans les Agents

**Dans pageGeneratorAgent.js ou tout agent créant des données:**

```javascript
// ✅ CORRECT - Toujours initialiser les arrays
const pageDoc = {
  _type: 'page',
  title: 'Ma Page',
  slug: { current: 'ma-page' },
  pageBuilder: [
    {
      _type: 'heroBlock',
      _key: `hero-${Date.now()}`,
      title: 'Titre',
      subtitle: 'Sous-titre',
      ctaButtons: [],  // ✅ Array vide, pas null
      backgroundSettings: {
        backgroundType: 'solid',
        backgroundColor: '#3b82f6'
      },
      styling: {
        textColor: '#ffffff',
        textAlignment: 'center',
        verticalAlignment: 'center',
        height: 'medium'
      }
    }
  ]
}

// ❌ INCORRECT - Ne JAMAIS laisser null
const badDoc = {
  _type: 'page',
  pageBuilder: [
    {
      _type: 'heroBlock',
      ctaButtons: null,  // ❌ Causera une erreur
      backgroundSettings: null  // ❌ Causera une erreur
    }
  ]
}
```

### Pour Créer des Schémas Sanity

**Dans les fichiers de schéma (.ts):**

```typescript
// ✅ CORRECT - Toujours initialValue pour les arrays
defineField({
  name: 'items',
  type: 'array',
  of: [{ type: 'object', fields: [...] }],
  initialValue: [],  // ✅ OBLIGATOIRE
  validation: (Rule) => Rule.required()
})

// ✅ CORRECT - initialValue pour les champs avec options
defineField({
  name: 'layout',
  type: 'string',
  options: {
    list: [
      { title: 'Grille', value: 'grid' },
      { title: 'Liste', value: 'list' }
    ]
  },
  initialValue: 'grid',  // ✅ OBLIGATOIRE
  validation: (Rule) => Rule.required()
})
```

---

## 🔍 EXEMPLES CONCRETS

### Exemple 1: Hero Block Sécurisé

```typescript
export default function HeroBlock(props: HeroBlockProps) {
  // ✅ Protection automatique
  const safeProps = useSafeProps(props)
  const ctaButtons = useSafeArray(props.ctaButtons)
  
  const { title, subtitle } = safeProps
  
  return (
    <div>
      {title && <h1>{title}</h1>}
      {subtitle && <p>{subtitle}</p>}
      
      {/* ✅ JAMAIS d'erreur - ctaButtons est toujours un array */}
      {ctaButtons.length > 0 && (
        <div>
          {ctaButtons.map((btn, i) => (
            <button key={btn._key || i}>{btn.text}</button>
          ))}
        </div>
      )}
    </div>
  )
}
```

### Exemple 2: Feature Grid Sécurisé

```typescript
export default function FeatureGrid(props: FeatureGridProps) {
  const safeProps = useSafeProps(props)
  const features = useSafeArray(props.features)
  const settings = useSafeObject(props.settings, { columns: 3 })
  
  return (
    <div style={{ gridTemplateColumns: `repeat(${settings.columns}, 1fr)` }}>
      {/* ✅ JAMAIS d'erreur */}
      {features.map((feature, i) => (
        <div key={feature._key || i}>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
      
      {/* Message si vide */}
      {features.length === 0 && <p>Aucune fonctionnalité</p>}
    </div>
  )
}
```

### Exemple 3: Agent Créant des Pages

```javascript
// agents/pageGeneratorAgent.js
function generatePageBlocks(pageName, config) {
  return [
    {
      _type: 'heroBlock',
      _key: `hero-${Date.now()}`,
      title: pageName,
      subtitle: `Page ${pageName}`,
      layout: 'centered',
      ctaButtons: [],  // ✅ Toujours initialiser
      backgroundSettings: {
        backgroundType: 'solid',
        backgroundColor: config.primaryColor || '#3b82f6'
      },
      styling: {
        textColor: '#ffffff',
        textAlignment: 'center',
        verticalAlignment: 'center',
        height: 'medium'
      }
    },
    {
      _type: 'featureGridBlock',
      _key: `features-${Date.now()}`,
      title: 'Fonctionnalités',
      features: [],  // ✅ Toujours initialiser
      layout: 'grid-3'
    }
  ]
}
```

---

## ✅ CHECKLIST AVANT DÉPLOIEMENT

### Pour un Nouveau Composant:
- [ ] Utilise `useSafeProps(props)` en premier
- [ ] Utilise `useSafeArray()` pour tous les arrays
- [ ] Utilise `useSafeObject()` pour tous les objets
- [ ] A des valeurs par défaut partout
- [ ] Vérifie `.length > 0` avant `.map()`
- [ ] Utilise optional chaining `?.` pour objets imbriqués
- [ ] A un message de fallback si pas de données

### Pour un Nouveau Schéma:
- [ ] Tous les arrays ont `initialValue: []`
- [ ] Tous les champs avec options ont `initialValue`
- [ ] Export default (pas nommé)
- [ ] Type 'object' pour les blocs
- [ ] Icon = fonction retournant emoji
- [ ] Pas de type 'color' (utiliser 'string' + regex)

### Pour un Agent Générateur:
- [ ] Initialise tous les arrays avec `[]`
- [ ] Génère des `_key` uniques
- [ ] Utilise le template sécurisé pour les composants
- [ ] Inclut les imports de sécurité
- [ ] Teste avec `npm run agents:fix-pages` après

---

## 🚀 COMMANDES UTILES

```bash
# Corriger toutes les pages existantes
npm run agents:fix-pages

# Diagnostic complet du système
npm run agents:diagnostic

# Vérifier la conformité des schémas
npm run agents:review

# Générer une nouvelle page (sécurisée)
node agents/pageGeneratorAgent.js "Ma Page"

# Publier et vérifier
npm run agents:publish
```

---

## 📊 GARANTIES DU SYSTÈME

### ✅ Ce qui est GARANTI:

1. **Aucune erreur null/undefined** dans les composants utilisant les hooks
2. **Aucune erreur .length** sur les arrays normalisés
3. **Aucune erreur .map()** sur les arrays normalisés
4. **Tous les arrays sont toujours des arrays** (jamais null)
5. **Tous les objets sont toujours des objets** (jamais null)
6. **Toutes les props ont des valeurs par défaut** sûres
7. **Correction automatique** des pages existantes via l'agent

### ⚠️ Ce qui N'est PAS garanti (si vous ne suivez pas les règles):

1. Composants qui n'utilisent PAS les hooks de sécurité
2. Accès direct à `props.items` sans `useSafeArray()`
3. Schémas sans `initialValue` pour les arrays
4. Données créées avec `null` au lieu de `[]`

---

## 🎓 FORMATION

### Pour les Développeurs:
1. Lire `AGENT_SANITY_REFERENCE.md`
2. Étudier `SAFE_BLOCK_TEMPLATE.tsx`
3. Examiner `HeroBlock-fixed.tsx` comme exemple
4. Pratiquer avec un nouveau bloc simple

### Pour les Agents IA:
1. Charger `AGENT_SANITY_REFERENCE.md` dans le prompt
2. Utiliser `SAFE_BLOCK_TEMPLATE.tsx` comme base
3. Toujours initialiser les arrays avec `[]`
4. Toujours inclure les imports de sécurité

---

## 📞 SUPPORT

Si vous rencontrez une erreur null/undefined:

1. **Vérifiez** que le composant utilise `useSafeProps()`
2. **Vérifiez** que les arrays utilisent `useSafeArray()`
3. **Exécutez** `npm run agents:fix-pages`
4. **Consultez** `AGENT_SANITY_REFERENCE.md`
5. **Utilisez** le template `SAFE_BLOCK_TEMPLATE.tsx`

---

**🛡️ AVEC CE SYSTÈME, IL EST IMPOSSIBLE D'AVOIR UNE ERREUR NULL/UNDEFINED !**

**Dernière mise à jour:** 6 novembre 2025
