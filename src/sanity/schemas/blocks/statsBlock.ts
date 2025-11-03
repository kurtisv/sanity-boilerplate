import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'statsBlock',
  title: 'Stats Block',
  type: 'object',
  description: 'Statistiques animées avec compteurs, graphiques et effets visuels',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Titre principal de la section statistiques',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description ou contexte des statistiques',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'layout',
      title: 'Mise en page',
      type: 'string',
      description: 'Style d\'affichage des statistiques',
      options: {
        list: [
          { title: 'Ligne horizontale', value: 'horizontal' },
          { title: 'Grille 2x2', value: 'grid-2x2' },
          { title: 'Grille 3 colonnes', value: 'grid-3col' },
          { title: 'Grille 4 colonnes', value: 'grid-4col' },
          { title: 'Carrousel', value: 'carousel' },
          { title: 'Héros + Stats', value: 'hero-stats' },
        ],
      },
      initialValue: 'grid-3col',
    }),
    defineField({
      name: 'stats',
      title: 'Statistiques',
      type: 'array',
      description: 'Liste des statistiques à afficher',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Nombre',
              type: 'number',
              description: 'La valeur numérique (sera animée)',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'suffix',
              title: 'Suffixe',
              type: 'string',
              description: 'Unité ou suffixe (%, +, K, M, etc.)',
              validation: (Rule) => Rule.max(10),
            }),
            defineField({
              name: 'prefix',
              title: 'Préfixe',
              type: 'string',
              description: 'Préfixe ($, €, etc.)',
              validation: (Rule) => Rule.max(10),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Description de la statistique',
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: 'description',
              title: 'Description détaillée',
              type: 'text',
              description: 'Explication supplémentaire (optionnelle)',
              rows: 2,
              validation: (Rule) => Rule.max(200),
            }),
            defineField({
              name: 'icon',
              title: 'Icône',
              type: 'string',
              description: 'Emoji ou icône à afficher',
              validation: (Rule) => Rule.max(10),
            }),
            defineField({
              name: 'color',
              title: 'Couleur personnalisée',
              type: 'string',
              description: 'Couleur spécifique pour cette stat (format HEX)',
              validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Format HEX requis (ex: #2563eb)'),
            }),
            defineField({
              name: 'featured',
              title: 'Statistique mise en avant',
              type: 'boolean',
              description: 'Afficher cette stat en plus grand',
              initialValue: false,
            }),
            defineField({
              name: 'animationType',
              title: 'Type d\'animation',
              type: 'string',
              description: 'Style d\'animation pour le compteur',
              options: {
                list: [
                  { title: 'Compteur classique', value: 'counter' },
                  { title: 'Progression', value: 'progress' },
                  { title: 'Pulsation', value: 'pulse' },
                  { title: 'Rebond', value: 'bounce' },
                  { title: 'Fondu', value: 'fade' },
                ],
              },
              initialValue: 'counter',
            }),
            defineField({
              name: 'animationDuration',
              title: 'Durée d\'animation (secondes)',
              type: 'number',
              description: 'Durée de l\'animation en secondes',
              initialValue: 2,
              validation: (Rule) => Rule.min(0.5).max(5),
            }),
            defineField({
              name: 'order',
              title: 'Ordre d\'affichage',
              type: 'number',
              description: 'Ordre de tri (plus petit = premier)',
              initialValue: 0,
            }),
          ],
          preview: {
            select: {
              number: 'number',
              suffix: 'suffix',
              prefix: 'prefix',
              label: 'label',
              icon: 'icon',
              featured: 'featured',
            },
            prepare({ number, suffix, prefix, label, icon, featured }) {
              const displayNumber = `${prefix || ''}${number || 0}${suffix || ''}`
              return {
                title: `${icon ? icon + ' ' : ''}${displayNumber}`,
                subtitle: `${label || 'Sans label'}${featured ? ' • ⭐ Mis en avant' : ''}`,
                media: featured ? '📊' : '📈',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(12).error('Entre 1 et 12 statistiques maximum'),
    }),
    defineField({
      name: 'animationSettings',
      title: 'Paramètres d\'animation',
      type: 'object',
      fields: [
        defineField({
          name: 'enableAnimations',
          title: 'Activer les animations',
          type: 'boolean',
          description: 'Animer les compteurs au scroll',
          initialValue: true,
        }),
        defineField({
          name: 'triggerOffset',
          title: 'Décalage de déclenchement',
          type: 'number',
          description: 'Pourcentage de visibilité pour déclencher (0-100)',
          initialValue: 50,
          validation: (Rule) => Rule.min(0).max(100),
          hidden: ({ parent }) => !parent?.enableAnimations,
        }),
        defineField({
          name: 'staggerDelay',
          title: 'Délai entre animations (ms)',
          type: 'number',
          description: 'Délai entre chaque animation de stat',
          initialValue: 200,
          validation: (Rule) => Rule.min(0).max(1000),
          hidden: ({ parent }) => !parent?.enableAnimations,
        }),
        defineField({
          name: 'easing',
          title: 'Type d\'accélération',
          type: 'string',
          options: {
            list: [
              { title: 'Linéaire', value: 'linear' },
              { title: 'Ease In', value: 'easeIn' },
              { title: 'Ease Out', value: 'easeOut' },
              { title: 'Ease In Out', value: 'easeInOut' },
              { title: 'Bounce', value: 'bounce' },
            ],
          },
          initialValue: 'easeOut',
          hidden: ({ parent }) => !parent?.enableAnimations,
        }),
      ],
    }),
    defineField({
      name: 'backgroundSettings',
      title: 'Arrière-plan',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundType',
          title: 'Type d\'arrière-plan',
          type: 'string',
          options: {
            list: [
              { title: 'Couleur unie', value: 'solid' },
              { title: 'Dégradé', value: 'gradient' },
              { title: 'Image', value: 'image' },
              { title: 'Motif', value: 'pattern' },
            ],
          },
          initialValue: 'solid',
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Couleur de fond',
          type: 'string',
          description: 'Couleur de fond principale (format HEX)',
          initialValue: '#ffffff',
          validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Format HEX requis (ex: #ffffff)'),
        }),
        defineField({
          name: 'gradientColors',
          title: 'Couleurs du dégradé',
          type: 'object',
          fields: [
            defineField({
              name: 'from',
              title: 'Couleur de début',
              type: 'string',
              validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Format HEX requis'),
            }),
            defineField({
              name: 'to',
              title: 'Couleur de fin',
              type: 'string',
              validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Format HEX requis'),
            }),
            defineField({
              name: 'direction',
              title: 'Direction',
              type: 'string',
              options: {
                list: [
                  { title: 'Haut vers bas', value: 'to-b' },
                  { title: 'Gauche vers droite', value: 'to-r' },
                  { title: 'Diagonal ↘', value: 'to-br' },
                  { title: 'Diagonal ↙', value: 'to-bl' },
                ],
              },
              initialValue: 'to-br',
            }),
          ],
          hidden: ({ parent }) => parent?.backgroundType !== 'gradient',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Image de fond',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.backgroundType !== 'image',
        }),
        defineField({
          name: 'overlay',
          title: 'Superposition',
          type: 'object',
          fields: [
            defineField({
              name: 'enabled',
              title: 'Activer la superposition',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'color',
              title: 'Couleur de superposition',
              type: 'string',
              initialValue: '#000000',
              validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Format HEX requis'),
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: 'opacity',
              title: 'Opacité (%)',
              type: 'number',
              initialValue: 50,
              validation: (Rule) => Rule.min(0).max(100),
              hidden: ({ parent }) => !parent?.enabled,
            }),
          ],
          hidden: ({ parent }) => parent?.backgroundType === 'solid',
        }),
      ],
    }),
    defineField({
      name: 'styling',
      title: 'Apparence',
      type: 'object',
      fields: [
        defineField({
          name: 'textColor',
          title: 'Couleur du texte',
          type: 'string',
          description: 'Couleur du texte principal (format HEX)',
          initialValue: '#1f2937',
          validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Format HEX requis (ex: #1f2937)'),
        }),
        defineField({
          name: 'numberColor',
          title: 'Couleur des nombres',
          type: 'string',
          description: 'Couleur spécifique pour les chiffres (format HEX)',
          initialValue: '#2563eb',
          validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Format HEX requis (ex: #2563eb)'),
        }),
        defineField({
          name: 'cardStyle',
          title: 'Style des cartes',
          type: 'string',
          options: {
            list: [
              { title: 'Minimal', value: 'minimal' },
              { title: 'Avec bordure', value: 'bordered' },
              { title: 'Avec ombre', value: 'shadow' },
              { title: 'Coloré', value: 'colored' },
              { title: 'Effet verre', value: 'glass' },
            ],
          },
          initialValue: 'shadow',
        }),
        defineField({
          name: 'spacing',
          title: 'Espacement',
          type: 'string',
          options: {
            list: [
              { title: 'Compact', value: 'compact' },
              { title: 'Normal', value: 'normal' },
              { title: 'Large', value: 'large' },
            ],
          },
          initialValue: 'normal',
        }),
        defineField({
          name: 'alignment',
          title: 'Alignement du contenu',
          type: 'string',
          options: {
            list: [
              { title: 'Gauche', value: 'left' },
              { title: 'Centré', value: 'center' },
              { title: 'Droite', value: 'right' },
            ],
          },
          initialValue: 'center',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      statsCount: 'stats.length',
      enableAnimations: 'animationSettings.enableAnimations',
    },
    prepare({ title, layout, statsCount, enableAnimations }) {
      return {
        title: title || 'Bloc de statistiques',
        subtitle: `${layout} • ${statsCount || 0} stats${enableAnimations ? ' • Animé' : ''}`,
        media: '📊',
      }
    },
  },
})
