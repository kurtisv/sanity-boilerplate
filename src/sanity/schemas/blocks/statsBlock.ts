import { defineType, defineField } from 'sanity'
import { getThemeFields } from '../shared/themeFields'

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
          name: 'stat',
          title: 'Statistique',
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
                media: featured ? 'chart-bar' : 'trending-up',
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
          name: 'animationType',
          title: 'Type d\'animation',
          type: 'string',
          description: 'Type d\'animation pour les compteurs',
          options: {
            list: [
              { title: 'Count Up (compteur)', value: 'countUp' },
              { title: 'Fade In (apparition)', value: 'fadeIn' },
              { title: 'Slide Up (glissement)', value: 'slideUp' },
              { title: 'Scale (agrandissement)', value: 'scale' },
              { title: 'Bounce (rebond)', value: 'bounce' },
            ],
            layout: 'dropdown',
          },
          initialValue: 'countUp',
          hidden: ({ parent }) => !parent?.enableAnimations,
        }),
        defineField({
          name: 'duration',
          title: 'Durée de l\'animation (ms)',
          type: 'number',
          description: 'Durée totale de l\'animation en millisecondes',
          initialValue: 2000,
          validation: (Rule) => Rule.min(100).max(10000),
          hidden: ({ parent }) => !parent?.enableAnimations,
        }),
        defineField({
          name: 'delay',
          title: 'Délai avant animation (ms)',
          type: 'number',
          description: 'Délai avant le début de l\'animation',
          initialValue: 200,
          validation: (Rule) => Rule.min(0).max(2000),
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
              { title: 'Ease Out Quart', value: 'easeOutQuart' },
              { title: 'Ease Out Cubic', value: 'easeOutCubic' },
              { title: 'Ease Out Back', value: 'easeOutBack' },
              { title: 'Bounce', value: 'bounce' },
              { title: 'Elastic', value: 'elastic' },
            ],
          },
          initialValue: 'easeOut',
          hidden: ({ parent }) => !parent?.enableAnimations,
        }),
      ],
    }),

    // Champs de thème unifiés
    ...getThemeFields(),
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
        media: 'chart-bar',
      }
    },
  },
})
