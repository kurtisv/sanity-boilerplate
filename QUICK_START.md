# ⚡ Quick Start - Démarrage Ultra-Rapide

Ce guide vous permet de démarrer en **moins de 10 minutes**.

---

## 🚀 Installation Express (5 minutes)

```bash
# 1. Cloner et installer
git clone https://github.com/votre-username/sanity-next-boilerplate.git
cd sanity-next-boilerplate
npm install

# 2. Configuration Sanity
cp env.example .env.local
# Éditez .env.local avec vos informations Sanity

# 3. Démarrer
npm run dev
```

**✅ Votre site est maintenant sur** : `http://localhost:3000`

---

## 🔑 Variables d'Environnement Minimales

Éditez `.env.local` avec ces 4 variables obligatoires :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=votre-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=votre-read-token
SANITY_API_TOKEN=votre-write-token
```

**Où les trouver ?**
1. Allez sur [sanity.io/manage](https://www.sanity.io/manage)
2. Sélectionnez votre projet
3. **API** → **Tokens** → Créez 2 tokens (Viewer + Editor)

---

## 📍 URLs Essentielles

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | 🏠 Site principal |
| `http://localhost:3000/studio` | 🎨 Sanity Studio (CMS) |
| `http://localhost:3000/demo` | 📋 Page de démonstration |
| `http://localhost:3000/admin` | ⚙️ Interface d'administration |

---

## 🎯 Première Action : Générer du Contenu

### Option 1 : Via l'Interface (Recommandé)

```
1. Allez sur http://localhost:3000/admin
2. Cliquez sur "Importer la Démo"
3. Attendez 10 secondes
4. Visitez http://localhost:3000/demo
```

### Option 2 : Via la Ligne de Commande

```bash
npm run demo:import
```

---

## 📝 Créer Votre Première Page (2 minutes)

### Dans Sanity Studio

```
1. Allez sur http://localhost:3000/studio
2. Cliquez sur "Pages" → "Create"
3. Remplissez :
   - Title: "Ma Page"
   - Slug: "ma-page"
4. Ajoutez un bloc Hero :
   - Title: "Bienvenue"
   - Subtitle: "Ceci est ma première page"
5. Cliquez sur "Publish"
6. Visitez http://localhost:3000/ma-page
```

### Via API (Avancé)

```bash
# Créer une page "À Propos"
curl -X POST http://localhost:3000/api/setup-about

# Créer une page "Contact"
curl -X POST http://localhost:3000/api/setup-contact

# Créer une page "Services"
curl -X POST http://localhost:3000/api/setup-services
```

---

## 🧩 Les 9 Blocs Disponibles

| Bloc | Description | Usage |
|------|-------------|-------|
| 🦸 **Hero** | En-tête principal | Page d'accueil, landing pages |
| ⭐ **Features** | Grille de fonctionnalités | Présenter des avantages |
| 📊 **Stats** | Statistiques | Chiffres clés |
| 👥 **Team** | Équipe | Page À Propos |
| 📞 **Contact** | Formulaire de contact | Page Contact |
| 🖼️ **Gallery** | Galerie d'images | Portfolio, projets |
| 📝 **Text** | Contenu riche | Articles, descriptions |
| 🎯 **Header** | En-tête du site | Navigation |
| 🦶 **Footer** | Pied de page | Liens, copyright |

---

## 💻 Commandes Essentielles

```bash
# Développement
npm run dev              # Démarrer le serveur (port 3000)

# Production
npm run build           # Build de production
npm run start           # Serveur de production

# Démo
npm run demo:import     # Importer le contenu de démo
npm run demo:reset      # Réinitialiser la démo

# Maintenance
npm run fix:stats-keys  # Corriger les clés stats
```

---

## 🔧 Commandes Git Utiles

```bash
# Sauvegarder vos modifications
git add .
git commit -m "Mon premier commit"
git push

# Créer une nouvelle branche
git checkout -b ma-nouvelle-fonctionnalite

# Voir l'état
git status
```

---

## 🎨 Personnalisation Rapide

### Changer les Couleurs

```typescript
// src/styles/design-tokens.ts
export const colors = {
  primary: '#667eea',    // ← Changez ici
  secondary: '#764ba2',  // ← Et ici
  // ...
}
```

### Ajouter un Nouveau Bloc

```bash
# 1. Créer le schéma
src/sanity/schemas/blocks/monBloc.ts

# 2. Créer le composant
src/components/blocks/MonBloc/MonBloc.tsx

# 3. Enregistrer dans index.ts
src/sanity/schemas/index.ts

# 4. Ajouter au BlockRenderer
src/components/BlockRenderer.tsx
```

---

## 🐛 Problèmes Fréquents

### Le Studio ne s'affiche pas

```bash
rm -rf .next
npm run dev
```

### Erreur "Missing environment variable"

```bash
# Vérifiez que .env.local existe
cat .env.local

# Si absent, copiez l'exemple
cp env.example .env.local
```

### Les images ne s'affichent pas

Vérifiez `next.config.ts` :
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'cdn.sanity.io' }
  ]
}
```

### Erreur TypeScript

```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Prochaines Étapes

1. ✅ **Lisez le README.md** - Documentation complète
2. ✅ **Suivez le GUIDE_APPROPRIATION.md** - Apprentissage étape par étape
3. ✅ **Consultez FICHIERS_IMPORTANTS.md** - Référence des fichiers
4. ✅ **Créez votre premier projet** - Mettez en pratique

---

## 🎯 Checklist de Démarrage

- [ ] Projet cloné et dépendances installées
- [ ] Variables d'environnement configurées
- [ ] Serveur démarré (`npm run dev`)
- [ ] Studio Sanity accessible (`/studio`)
- [ ] Contenu de démo importé
- [ ] Première page créée
- [ ] Page visible sur le site

**Une fois cette checklist complétée, vous êtes prêt à développer ! 🚀**

---

## 💡 Astuces Pro

### Raccourcis Clavier Studio

- `Ctrl/Cmd + S` : Sauvegarder
- `Ctrl/Cmd + Shift + P` : Publier
- `Ctrl/Cmd + K` : Recherche rapide

### Développement Efficace

```bash
# Terminal 1 : Serveur Next.js
npm run dev

# Terminal 2 : Logs Sanity
# (Si vous utilisez Sanity CLI)
sanity logs
```

### Preview en Temps Réel

1. Dans le Studio, cliquez sur "Preview"
2. Modifiez le contenu
3. Observez les changements en direct

---

## 🔗 Liens Utiles

- **Documentation Next.js** : [nextjs.org/docs](https://nextjs.org/docs)
- **Documentation Sanity** : [sanity.io/docs](https://www.sanity.io/docs)
- **TypeScript Handbook** : [typescriptlang.org/docs](https://www.typescriptlang.org/docs)
- **React Documentation** : [react.dev](https://react.dev)

---

## 🆘 Besoin d'Aide ?

1. **Consultez le README.md** - Documentation complète
2. **Lisez le Troubleshooting** - Solutions aux erreurs courantes
3. **Ouvrez une Issue** - Sur GitHub
4. **Rejoignez la communauté** - Discord/Slack

---

**Bon développement ! 🎉**

*Ce guide vous a permis de démarrer en moins de 10 minutes. Pour aller plus loin, consultez les autres documents de documentation.*
