import { defineType, defineField } from 'sanity'
import { getThemeFields } from '../shared/themeFields'

export default defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  description: 'Vidéo YouTube, Vimeo ou hébergée avec options de lecture',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      description: 'Titre principal de la section vidéo',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description de la vidéo',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'videoType',
      title: 'Type de vidéo',
      type: 'string',
      description: 'Source de la vidéo',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'Vidéo hébergée', value: 'hosted' },
          { title: 'URL externe', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'youtube',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeId',
      title: 'ID YouTube',
      type: 'string',
      description: 'ID de la vidéo YouTube (ex: dQw4w9WgXcQ)',
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as any
        if (parent?.videoType === 'youtube' && !value) {
          return 'ID YouTube requis'
        }
        return true
      }),
      hidden: ({ parent }) => parent?.videoType !== 'youtube',
    }),
    defineField({
      name: 'vimeoId',
      title: 'ID Vimeo',
      type: 'string',
      description: 'ID de la vidéo Vimeo (ex: 123456789)',
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as any
        if (parent?.videoType === 'vimeo' && !value) {
          return 'ID Vimeo requis'
        }
        return true
      }),
      hidden: ({ parent }) => parent?.videoType !== 'vimeo',
    }),
    defineField({
      name: 'hostedVideo',
      title: 'Vidéo hébergée',
      type: 'file',
      description: 'Fichier vidéo (MP4, WebM)',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as any
        if (parent?.videoType === 'hosted' && !value) {
          return 'Fichier vidéo requis'
        }
        return true
      }),
      hidden: ({ parent }) => parent?.videoType !== 'hosted',
    }),
    defineField({
      name: 'externalUrl',
      title: 'URL externe',
      type: 'url',
      description: 'URL de la vidéo externe',
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as any
        if (parent?.videoType === 'external' && !value) {
          return 'URL externe requise'
        }
        return true
      }),
      hidden: ({ parent }) => parent?.videoType !== 'external',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Miniature personnalisée',
      type: 'image',
      description: 'Image de prévisualisation (optionnel, auto pour YouTube/Vimeo)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      description: 'Style d\'affichage de la vidéo',
      options: {
        list: [
          { title: 'Standard (16:9)', value: 'standard' },
          { title: 'Cinéma (21:9)', value: 'cinema' },
          { title: 'Carré (1:1)', value: 'square' },
          { title: 'Vertical (9:16)', value: 'vertical' },
          { title: 'Pleine largeur', value: 'fullwidth' },
          { title: 'Avec sidebar', value: 'with-sidebar' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Ratio personnalisé',
      type: 'string',
      description: 'Ratio d\'aspect personnalisé (ex: 16:9, 4:3)',
      validation: (Rule) => Rule.regex(/^\d+:\d+$/, {
        name: 'aspect ratio',
        invert: false,
      }).error('Format invalide. Utilisez le format "16:9"'),
    }),
    defineField({
      name: 'autoplay',
      title: 'Lecture automatique',
      type: 'boolean',
      description: 'Démarrer la vidéo automatiquement',
      initialValue: false,
    }),
    defineField({
      name: 'loop',
      title: 'Lecture en boucle',
      type: 'boolean',
      description: 'Rejouer la vidéo en boucle',
      initialValue: false,
    }),
    defineField({
      name: 'muted',
      title: 'Muet par défaut',
      type: 'boolean',
      description: 'Démarrer la vidéo en mode muet',
      initialValue: false,
    }),
    defineField({
      name: 'controls',
      title: 'Afficher les contrôles',
      type: 'boolean',
      description: 'Afficher les contrôles de lecture',
      initialValue: true,
    }),
    defineField({
      name: 'playButton',
      title: 'Bouton de lecture',
      type: 'object',
      description: 'Personnaliser le bouton de lecture',
      fields: [
        {
          name: 'style',
          title: 'Style',
          type: 'string',
          options: {
            list: [
              { title: 'Icône simple', value: 'simple' },
              { title: 'Cercle', value: 'circle' },
              { title: 'Carré arrondi', value: 'rounded' },
              { title: 'Avec fond coloré', value: 'colored' },
              { title: 'Avec effet glassmorphism', value: 'glass' },
            ],
          },
          initialValue: 'circle',
        },
        {
          name: 'size',
          title: 'Taille',
          type: 'string',
          options: {
            list: [
              { title: 'Petit', value: 'small' },
              { title: 'Moyen', value: 'medium' },
              { title: 'Grand', value: 'large' },
              { title: 'Extra grand', value: 'xl' },
            ],
          },
          initialValue: 'large',
        },
        {
          name: 'color',
          title: 'Couleur',
          type: 'string',
          initialValue: '#3b82f6',
        },
      ],
    }),
    defineField({
      name: 'overlay',
      title: 'Superposition',
      type: 'object',
      description: 'Ajouter une superposition sur la miniature',
      fields: [
        {
          name: 'enabled',
          title: 'Activer',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'color',
          title: 'Couleur',
          type: 'string',
          initialValue: '#000000',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'opacity',
          title: 'Opacité (%)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
          initialValue: 30,
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Légende',
      type: 'text',
      description: 'Légende ou description sous la vidéo',
      rows: 2,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'transcript',
      title: 'Transcription',
      type: 'object',
      description: 'Ajouter une transcription de la vidéo',
      fields: [
        {
          name: 'enabled',
          title: 'Activer',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'text',
          title: 'Texte de la transcription',
          type: 'text',
          rows: 10,
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'collapsible',
          title: 'Pliable',
          type: 'boolean',
          description: 'Permettre de plier/déplier la transcription',
          initialValue: true,
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    
    // Champs de thème unifiés
    ...getThemeFields(),
  ],
  preview: {
    select: {
      title: 'title',
      videoType: 'videoType',
      thumbnail: 'thumbnail',
    },
    prepare({ title, videoType, thumbnail }) {
      return {
        title: title || 'Bloc vidéo',
        subtitle: `Type: ${videoType || 'youtube'}`,
        media: thumbnail,
      }
    },
  },
})
