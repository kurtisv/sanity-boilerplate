# 🤖 Guide pour les Agents - Respect des Règles Sanity

## 📌 Important

Les agents de génération de blocs **DOIVENT** respecter strictement les règles définies dans `/SANITY_SCHEMA_RULES.md`.

## 🎯 Modifications Apportées

### builderAgent.js

Le prompt Claude a été mis à jour avec toutes les règles Sanity critiques:

1. **Exports corrects**: Toujours `export default defineType({`
2. **Types valides**: Pas de `color`, `select`, etc.
3. **Icônes**: Fonctions emoji, pas d'imports externes
4. **Validations**: Longueurs max correctes
5. **Champs spéciaux**: ContactBlock, StatsBlock, FeatureGrid, TeamBlock

### Template Fallback

Le template générique a été amélioré pour être 100% conforme:
- Icône emoji
- Validations avec max()
- Preview complet
- Export default

## 🚀 Utilisation

```bash
# Générer un nouveau bloc
npm run agents:run -- builder --prompt="Créer un testimonialBlock" --dry-run=false
```

Le bloc généré respectera automatiquement toutes les règles Sanity.

## ✅ Vérifications Automatiques

Avant de générer un bloc, l'agent vérifie:

- [ ] Export default utilisé
- [ ] Aucun type interdit (color, select)
- [ ] Icône en fonction emoji
- [ ] Validations avec Rule.max()
- [ ] Preview présent et correct
- [ ] Types de champs valides uniquement

## 📚 Référence Complète

Consultez `/SANITY_SCHEMA_RULES.md` pour la liste exhaustive des règles.

## 🐛 Debugging

Si un bloc généré cause des erreurs:

1. Vérifier que le type de document existe
2. Vérifier les types de champs
3. Vérifier les validations
4. Consulter la checklist dans SANITY_SCHEMA_RULES.md

## 🔄 Mise à Jour

Si Sanity ajoute/supprime des types:
1. Mettre à jour `/SANITY_SCHEMA_RULES.md`
2. Mettre à jour le prompt dans `builderAgent.js`
3. Tester avec `npm run agents:run`
