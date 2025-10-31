import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'featureGridBlock',
  title: 'Grille de fonctionnalités',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      description: 'Titre principal de la grille (optionnel)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description de la section (optionnel)',
      rows: 3,
    }),
    defineField({
      name: 'gridLayout',
      title: 'Disposition de la grille',
      type: 'string',
      description: 'Choisissez le nombre de colonnes et le style',
      options: {
        list: [
          { title: '2 colonnes - Simple', value: '2-simple' },
          { title: '3 colonnes - Équilibrée', value: '3-balanced' },
          { title: '4 colonnes - Compacte', value: '4-compact' },
          { title: '2x2 - Carré', value: '2x2-square' },
          { title: '1+2 - Asymétrique', value: '1-2-asymmetric' },
          { title: '2+1 - Asymétrique inversée', value: '2-1-asymmetric' },
          { title: 'Masonry - Mosaïque', value: 'masonry' },
          { title: 'Liste verticale', value: 'vertical-list' },
        ],
        layout: 'dropdown',
      },
      initialValue: '3-balanced',
    }),
    defineField({
      name: 'features',
      title: 'Fonctionnalités',
      type: 'array',
      description: 'Ajoutez vos fonctionnalités',
      of: [
        {
          type: 'object',
          title: 'Fonctionnalité',
          fields: [
            {
              name: 'icon',
              title: 'Icône',
              type: 'string',
              description: 'Choisissez une icône pour votre fonctionnalité',
              options: {
                list: [
                  { title: '⭐ Étoile', value: 'star' },
                  { title: '❤️ Cœur', value: 'heart' },
                  { title: '⚡ Éclair', value: 'zap' },
                  { title: '🛡️ Bouclier', value: 'shield' },
                  { title: '🚀 Fusée', value: 'rocket' },
                  { title: '🌍 Globe', value: 'globe' },
                  { title: '👥 Utilisateurs', value: 'users' },
                  { title: '⚙️ Paramètres', value: 'settings' },
                  { title: '🔒 Cadenas', value: 'lock' },
                  { title: '📱 Smartphone', value: 'smartphone' },
                  { title: '📶 Wifi', value: 'wifi' },
                  { title: '📷 Caméra', value: 'camera' },
                  { title: '📧 Email', value: 'mail' },
                  { title: '📞 Téléphone', value: 'phone' },
                  { title: '📍 Localisation', value: 'map-pin' },
                  { title: '🕐 Horloge', value: 'clock' },
                  { title: '✅ Validation', value: 'check-circle' },
                  { title: '⚠️ Alerte', value: 'alert-circle' },
                  { title: 'ℹ️ Information', value: 'info' },
                  { title: '💡 Ampoule', value: 'lightbulb' },
                  { title: '🎯 Cible', value: 'target' },
                  { title: '📈 Tendance', value: 'trending' },
                  { title: '🏆 Récompense', value: 'award' },
                  { title: '🎁 Cadeau', value: 'gift' },
                  { title: '🔥 Feu', value: 'fire' },
                  { title: '💎 Diamant', value: 'diamond' },
                  { title: '👑 Couronne', value: 'crown' },
                  { title: '✨ Magie', value: 'magic' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
              initialValue: 'star',
            },
            {
              name: 'iconColor',
              title: 'Couleur de l\'icône',
              type: 'string',
              description: 'Couleur HEX de l\'icône',
              initialValue: '#3b82f6',
            },
            {
              name: 'title',
              title: 'Titre',
              type: 'string',
              validation: (Rule) => Rule.required().max(60),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.max(200),
            },
            {
              name: 'link',
              title: 'Lien (optionnel)',
              type: 'object',
              fields: [
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                },
                {
                  name: 'text',
                  title: 'Texte du lien',
                  type: 'string',
                  initialValue: 'En savoir plus',
                },
              ],
            },
            {
              name: 'featured',
              title: 'Mise en avant',
              type: 'boolean',
              description: 'Mettre cette fonctionnalité en évidence',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              icon: 'icon',
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: title || 'Fonctionnalité sans titre',
                subtitle: subtitle || 'Aucune description',
                media: icon ? undefined : undefined, // On pourrait ajouter une icône ici
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(12),
    }),
    defineField({
      name: 'cardStyle',
      title: 'Style des cartes',
      type: 'string',
      description: 'Apparence des cartes de fonctionnalités',
      options: {
        list: [
          { title: 'Minimaliste', value: 'minimal' },
          { title: 'Avec bordure', value: 'bordered' },
          { title: 'Avec ombre', value: 'shadow' },
          { title: 'Avec fond coloré', value: 'colored' },
          { title: 'Glassmorphism', value: 'glass' },
        ],
        layout: 'radio',
      },
      initialValue: 'shadow',
    }),
    defineField({
      name: 'iconStyle',
      title: 'Style des icônes',
      type: 'string',
      description: 'Présentation des icônes',
      options: {
        list: [
          { title: 'Icône simple', value: 'simple' },
          { title: 'Avec fond circulaire', value: 'circle' },
          { title: 'Avec fond carré', value: 'square' },
          { title: 'Avec fond dégradé', value: 'gradient' },
        ],
        layout: 'radio',
      },
      initialValue: 'circle',
    }),
    defineField({
      name: 'textAlignment',
      title: 'Alignement du texte',
      type: 'string',
      options: {
        list: [
          { title: 'Gauche', value: 'left' },
          { title: 'Centre', value: 'center' },
          { title: 'Droite', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'spacing',
      title: 'Espacement',
      type: 'string',
      description: 'Espacement entre les éléments',
      options: {
        list: [
          { title: 'Compact', value: 'compact' },
          { title: 'Normal', value: 'normal' },
          { title: 'Large', value: 'large' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Couleur de fond',
      type: 'string',
      description: 'Couleur de fond de la section (code HEX)',
      initialValue: '#ffffff',
    }),
    defineField({
      name: 'textColor',
      title: 'Couleur du texte',
      type: 'string',
      description: 'Couleur du texte principal (code HEX)',
      initialValue: '#1f2937',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      features: 'features',
      gridLayout: 'gridLayout',
    },
    prepare({ title, features, gridLayout }) {
      const featureCount = features?.length || 0
      return {
        title: title || 'Grille de fonctionnalités',
        subtitle: `${featureCount} fonctionnalité(s) - ${gridLayout}`,
      }
    },
  },
})
