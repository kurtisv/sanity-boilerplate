# 🎯 Guide d'Appropriation Rapide du Projet

Ce guide vous permettra de comprendre et de maîtriser rapidement le boilerplate Sanity + Next.js.

---

## 📚 Étapes pour S'Approprier le Projet

### Étape 1 : Comprendre l'Architecture Globale (30 min)

**Objectif** : Avoir une vue d'ensemble du projet.

**Actions** :

1. **Lisez le README.md** pour comprendre les fonctionnalités principales
2. **Explorez la structure** :
   ```bash
   # Ouvrez le projet dans votre éditeur
   code .
   
   # Examinez les dossiers principaux
   src/app/          # Routes Next.js
   src/components/   # Composants React
   src/sanity/       # Configuration Sanity
   ```

3. **Identifiez les fichiers clés** :
   - `package.json` : Dépendances et scripts
   - `next.config.ts` : Configuration Next.js
   - `sanity.config.ts` : Configuration Sanity Studio
   - `.env.local` : Variables d'environnement

**✅ Validation** : Vous comprenez où se trouvent les routes, les composants et les schémas Sanity.

---

### Étape 2 : Installer et Lancer le Projet (15 min)

**Objectif** : Avoir le projet fonctionnel en local.

**Actions** :

```bash
# 1. Installer les dépendances
npm install

# 2. Copier les variables d'environnement
cp env.example .env.local

# 3. Éditer .env.local avec vos informations Sanity
# (Voir README.md section "Configuration")

# 4. Démarrer le serveur
npm run dev
```

**Testez** :
- ✅ Site principal : `http://localhost:3000`
- ✅ Studio Sanity : `http://localhost:3000/studio`
- ✅ Page admin : `http://localhost:3000/admin`

**✅ Validation** : Le site s'affiche sans erreur.

---

### Étape 3 : Explorer le Sanity Studio (20 min)

**Objectif** : Comprendre comment gérer le contenu.

**Actions** :

1. **Accédez au Studio** : `http://localhost:3000/studio`

2. **Explorez les sections** :
   - **Pages** : Gestion des pages du site
   - **Settings** : Paramètres globaux (Header, Footer)
   - **Documentation** : Documentation des blocs

3. **Créez une page de test** :
   - Cliquez sur **Pages** → **Create**
   - Titre : "Ma Première Page"
   - Slug : "test"
   - Ajoutez un **Hero Block** :
     - Titre : "Test"
     - Sous-titre : "Ceci est un test"
   - Cliquez sur **Publish**

4. **Visitez votre page** : `http://localhost:3000/test`

**✅ Validation** : Votre page de test s'affiche correctement.

---

### Étape 4 : Comprendre le Système de Blocs (30 min)

**Objectif** : Maîtriser les 9 blocs universels.

**Actions** :

1. **Visitez la page de démo** : `http://localhost:3000/demo`
   - Observez tous les blocs en action

2. **Examinez les schémas Sanity** :
   ```bash
   # Ouvrez les fichiers de schémas
   src/sanity/schemas/blocks/heroBlock.ts
   src/sanity/schemas/blocks/featureGridBlock.ts
   src/sanity/schemas/blocks/contactBlock.ts
   ```

3. **Examinez les composants React** :
   ```bash
   # Ouvrez les composants
   src/components/blocks/HeroBlock/HeroBlock-fixed.tsx
   src/components/blocks/FeatureGridBlock/FeatureGridBlock-fixed.tsx
   ```

4. **Testez chaque bloc** :
   - Dans le Studio, créez une nouvelle page
   - Ajoutez chaque type de bloc
   - Observez les options disponibles
   - Publiez et visualisez

**✅ Validation** : Vous savez ajouter et configurer tous les blocs.

---

### Étape 5 : Comprendre le Flux de Données (30 min)

**Objectif** : Comprendre comment les données circulent de Sanity vers le site.

**Actions** :

1. **Examinez le client Sanity** :
   ```typescript
   // src/sanity/lib/client.ts
   // Client pour récupérer les données
   ```

2. **Examinez les requêtes GROQ** :
   ```typescript
   // src/sanity/lib/queries.ts
   // Requêtes pour récupérer les pages
   export const pageBySlugQuery = groq`...`
   ```

3. **Examinez une page dynamique** :
   ```typescript
   // src/app/(website)/[slug]/page.tsx
   // 1. Récupère les données avec client.fetch()
   // 2. Passe les données au BlockRenderer
   // 3. Affiche les blocs
   ```

4. **Examinez le BlockRenderer** :
   ```typescript
   // src/components/BlockRenderer.tsx
   // Switch qui rend le bon composant selon le type de bloc
   ```

**Schéma du flux** :
```
Utilisateur → URL (/about)
    ↓
Next.js App Router (src/app/(website)/[slug]/page.tsx)
    ↓
Sanity Client (src/sanity/lib/client.ts)
    ↓
Requête GROQ (src/sanity/lib/queries.ts)
    ↓
Données Sanity (page + blocs)
    ↓
BlockRenderer (src/components/BlockRenderer.tsx)
    ↓
Composants de blocs (src/components/blocks/)
    ↓
Page HTML rendue
```

**✅ Validation** : Vous comprenez le chemin des données de Sanity vers l'affichage.

---

### Étape 6 : Utiliser les APIs d'Auto-génération (20 min)

**Objectif** : Générer rapidement des pages complètes.

**Actions** :

1. **Visitez l'interface admin** : `http://localhost:3000/admin`

2. **Testez une API** :
   ```bash
   # Via curl
   curl -X POST http://localhost:3000/api/setup-about
   
   # Ou cliquez sur le bouton dans l'interface admin
   ```

3. **Vérifiez dans le Studio** :
   - Allez sur `/studio` → **Pages**
   - Vous devriez voir la nouvelle page "À Propos"

4. **Visitez la page générée** : `http://localhost:3000/about`

5. **Examinez le code de l'API** :
   ```typescript
   // src/app/api/setup-about/route.ts
   // Voir comment la page est créée
   ```

**✅ Validation** : Vous savez générer des pages automatiquement.

---

### Étape 7 : Personnaliser un Bloc (45 min)

**Objectif** : Modifier un bloc existant pour comprendre le code.

**Actions** :

1. **Choisissez un bloc simple** : `HeroBlock`

2. **Modifiez le schéma Sanity** :
   ```typescript
   // src/sanity/schemas/blocks/heroBlock.ts
   
   // Ajoutez un nouveau champ (exemple)
   {
     name: 'showDate',
     title: 'Afficher la date',
     type: 'boolean',
     initialValue: false
   }
   ```

3. **Modifiez le composant React** :
   ```typescript
   // src/components/blocks/HeroBlock/HeroBlock-fixed.tsx
   
   // Ajoutez la logique pour afficher la date
   {showDate && (
     <p>{new Date().toLocaleDateString()}</p>
   )}
   ```

4. **Testez** :
   - Rechargez le Studio
   - Éditez une page avec un Hero Block
   - Cochez "Afficher la date"
   - Publiez et vérifiez

**✅ Validation** : Vous savez modifier un bloc existant.

---

### Étape 8 : Créer un Nouveau Bloc (60 min)

**Objectif** : Créer votre propre bloc personnalisé.

**Actions** :

1. **Créez le schéma Sanity** :
   ```typescript
   // src/sanity/schemas/blocks/customBlock.ts
   
   import { defineType } from 'sanity'
   
   export default defineType({
     name: 'customBlock',
     title: '🎨 Mon Bloc Personnalisé',
     type: 'object',
     fields: [
       {
         name: 'title',
         title: 'Titre',
         type: 'string',
         validation: Rule => Rule.required()
       },
       {
         name: 'description',
         title: 'Description',
         type: 'text'
       }
     ]
   })
   ```

2. **Enregistrez le schéma** :
   ```typescript
   // src/sanity/schemas/index.ts
   
   import customBlock from './blocks/customBlock'
   
   export const schemaTypes = [
     // ... autres schémas
     customBlock,
   ]
   ```

3. **Ajoutez au constructeur de page** :
   ```typescript
   // src/sanity/schemas/page.ts
   
   {
     name: 'blocks',
     type: 'array',
     of: [
       { type: 'heroBlock' },
       // ... autres blocs
       { type: 'customBlock' }, // ← Ajoutez ici
     ]
   }
   ```

4. **Créez le composant React** :
   ```typescript
   // src/components/blocks/CustomBlock/CustomBlock.tsx
   
   export default function CustomBlock({ title, description }) {
     return (
       <section className="custom-block">
         <h2>{title}</h2>
         <p>{description}</p>
       </section>
     )
   }
   ```

5. **Ajoutez au BlockRenderer** :
   ```typescript
   // src/components/BlockRenderer.tsx
   
   import CustomBlock from './blocks/CustomBlock/CustomBlock'
   
   switch (block._type) {
     // ... autres cas
     case 'customBlock':
       return <CustomBlock key={block._key} {...block} />
   }
   ```

6. **Testez** :
   - Rechargez le Studio
   - Créez une page
   - Ajoutez votre nouveau bloc
   - Publiez et vérifiez

**✅ Validation** : Vous savez créer un bloc de A à Z.

---

### Étape 9 : Comprendre le Système de Thème (30 min)

**Objectif** : Maîtriser le système de thème unifié.

**Actions** :

1. **Examinez les tokens de design** :
   ```typescript
   // src/styles/design-tokens.ts
   // Couleurs, espacements, typographie
   ```

2. **Examinez les champs de thème** :
   ```typescript
   // src/sanity/schemas/shared/themeFields.ts
   // Champs réutilisables pour tous les blocs
   ```

3. **Examinez les utilitaires** :
   ```typescript
   // src/lib/theme-utils.ts
   // Fonctions pour appliquer les styles
   ```

4. **Testez dans le Studio** :
   - Éditez une page
   - Cliquez sur un bloc Hero
   - Allez dans l'onglet "Arrière-plan"
   - Testez différents dégradés
   - Publiez et observez les changements

**✅ Validation** : Vous comprenez comment personnaliser les styles.

---

### Étape 10 : Déployer le Projet (30 min)

**Objectif** : Mettre le site en production.

**Actions** :

1. **Créez un compte Vercel** : [vercel.com](https://vercel.com)

2. **Installez Vercel CLI** :
   ```bash
   npm i -g vercel
   ```

3. **Déployez** :
   ```bash
   vercel
   ```

4. **Configurez les variables d'environnement** :
   - Allez sur le dashboard Vercel
   - Settings → Environment Variables
   - Ajoutez toutes les variables de `.env.local`

5. **Testez le site en production**

**✅ Validation** : Votre site est en ligne et fonctionnel.

---

## 🎓 Parcours d'Apprentissage Recommandé

### Niveau Débutant (4-6 heures)

1. ✅ Étape 1 : Architecture globale
2. ✅ Étape 2 : Installation
3. ✅ Étape 3 : Explorer le Studio
4. ✅ Étape 4 : Système de blocs
5. ✅ Étape 6 : APIs d'auto-génération

**Résultat** : Vous savez utiliser le boilerplate et créer des pages.

---

### Niveau Intermédiaire (6-8 heures)

1. ✅ Étape 5 : Flux de données
2. ✅ Étape 7 : Personnaliser un bloc
3. ✅ Étape 9 : Système de thème

**Résultat** : Vous savez modifier et personnaliser le boilerplate.

---

### Niveau Avancé (8-12 heures)

1. ✅ Étape 8 : Créer un nouveau bloc
2. ✅ Étape 10 : Déploiement
3. ✅ Créer vos propres APIs d'auto-génération
4. ✅ Optimiser les performances
5. ✅ Ajouter des fonctionnalités avancées

**Résultat** : Vous maîtrisez complètement le boilerplate.

---

## 📝 Checklist de Maîtrise

Cochez au fur et à mesure de votre progression :

### Compréhension Générale
- [ ] Je comprends l'architecture du projet
- [ ] Je sais où se trouvent les fichiers importants
- [ ] Je comprends le rôle de Next.js et Sanity

### Sanity Studio
- [ ] Je sais créer une page dans le Studio
- [ ] Je sais ajouter et configurer des blocs
- [ ] Je comprends les schémas Sanity

### Développement
- [ ] Je sais modifier un composant React
- [ ] Je sais modifier un schéma Sanity
- [ ] Je comprends le flux de données
- [ ] Je sais utiliser les requêtes GROQ

### Blocs
- [ ] Je connais les 9 blocs disponibles
- [ ] Je sais personnaliser un bloc existant
- [ ] Je sais créer un nouveau bloc

### Système de Thème
- [ ] Je comprends les tokens de design
- [ ] Je sais appliquer des styles personnalisés
- [ ] Je sais utiliser les dégradés prédéfinis

### APIs
- [ ] Je sais utiliser les APIs d'auto-génération
- [ ] Je comprends comment créer une API
- [ ] Je sais générer du contenu programmatiquement

### Déploiement
- [ ] Je sais déployer sur Vercel
- [ ] Je sais configurer les variables d'environnement
- [ ] Je sais gérer les erreurs en production

---

## 🚀 Prochaines Étapes

Une fois que vous maîtrisez le boilerplate :

1. **Créez votre premier projet client**
   - Utilisez le boilerplate comme base
   - Personnalisez les blocs selon les besoins
   - Ajoutez vos propres fonctionnalités

2. **Contribuez au projet**
   - Créez de nouveaux blocs
   - Améliorez la documentation
   - Partagez vos retours

3. **Explorez les fonctionnalités avancées**
   - Internationalisation (i18n)
   - Authentification
   - E-commerce
   - Blog avec catégories

---

## 💡 Conseils pour Réussir

### 1. Prenez votre temps
Ne cherchez pas à tout comprendre d'un coup. Avancez étape par étape.

### 2. Pratiquez
La meilleure façon d'apprendre est de créer des pages de test et d'expérimenter.

### 3. Lisez le code
N'hésitez pas à ouvrir les fichiers et à lire le code. C'est souvent plus clair que la documentation.

### 4. Utilisez les outils de développement
- React DevTools
- Console du navigateur
- Sanity Vision (dans le Studio)

### 5. Consultez la documentation officielle
- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

### 6. Posez des questions
Si vous êtes bloqué, n'hésitez pas à :
- Ouvrir une issue sur GitHub
- Consulter les discussions
- Demander de l'aide à la communauté

---

## 🎯 Objectifs par Semaine

### Semaine 1 : Découverte
- [ ] Installation et configuration
- [ ] Explorer le Studio
- [ ] Créer quelques pages de test
- [ ] Comprendre les blocs de base

### Semaine 2 : Approfondissement
- [ ] Comprendre le flux de données
- [ ] Modifier des blocs existants
- [ ] Utiliser les APIs d'auto-génération
- [ ] Personnaliser les styles

### Semaine 3 : Création
- [ ] Créer un nouveau bloc
- [ ] Créer une API personnalisée
- [ ] Optimiser les performances
- [ ] Préparer le déploiement

### Semaine 4 : Production
- [ ] Déployer le site
- [ ] Tester en production
- [ ] Corriger les bugs
- [ ] Documenter vos modifications

---

## 📚 Ressources Complémentaires

### Documentation
- [README.md](./README.md) - Documentation complète du projet
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Tutoriels
- [Next.js Learn](https://nextjs.org/learn)
- [Sanity Learn](https://www.sanity.io/learn)
- [React Documentation](https://react.dev/learn)

### Communauté
- [Next.js Discord](https://nextjs.org/discord)
- [Sanity Slack](https://slack.sanity.io/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

**Bon apprentissage ! 🚀**

N'oubliez pas : la maîtrise vient avec la pratique. Prenez le temps d'expérimenter et de créer vos propres projets.
