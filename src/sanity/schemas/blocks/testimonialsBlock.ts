import { defineType, defineField } from 'sanity'
import { getThemeFields } from '../shared/themeFields'

export default defineType({
  name: 'testimonialsBlock',
  title: 'Testimonials Block',
  type: 'object',
  description: 'Témoignages clients avec notes et photos',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      description: 'Titre principal de la section témoignages',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description de la section témoignages',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      description: 'Style d\'affichage des témoignages',
      options: {
        list: [
          { title: 'Grille 2 colonnes', value: 'grid-2' },
          { title: 'Grille 3 colonnes', value: 'grid-3' },
          { title: 'Grille 4 colonnes', value: 'grid-4' },
          { title: 'Liste verticale', value: 'list' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'Masonry (mosaïque)', value: 'masonry' },
          { title: 'Slider plein écran', value: 'fullscreen-slider' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'grid-3',
    }),
    defineField({
      name: 'testimonials',
      title: 'Témoignages',
      type: 'array',
      description: 'Ajoutez vos témoignages clients',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nom du client',
              type: 'string',
              validation: (Rule) => Rule.required().max(100),
            },
            {
              name: 'role',
              title: 'Rôle/Entreprise',
              type: 'string',
              description: 'Titre ou nom de l\'entreprise',
              validation: (Rule) => Rule.max(100),
            },
            {
              name: 'photo',
              title: 'Photo',
              type: 'image',
              description: 'Photo du client',
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
            },
            {
              name: 'comment',
              title: 'Témoignage',
              type: 'text',
              description: 'Le témoignage du client',
              rows: 4,
              validation: (Rule) => Rule.required().max(500),
            },
            {
              name: 'rating',
              title: 'Note',
              type: 'number',
              description: 'Note sur 5 étoiles',
              validation: (Rule) => Rule.min(1).max(5).integer(),
              initialValue: 5,
            },
            {
              name: 'date',
              title: 'Date',
              type: 'date',
              description: 'Date du témoignage',
            },
            {
              name: 'verified',
              title: 'Témoignage vérifié',
              type: 'boolean',
              description: 'Marquer comme vérifié',
              initialValue: false,
            },
            {
              name: 'featured',
              title: 'Mettre en avant',
              type: 'boolean',
              description: 'Mettre ce témoignage en évidence',
              initialValue: false,
            },
            {
              name: 'source',
              title: 'Source',
              type: 'string',
              description: 'Plateforme d\'origine du témoignage',
              options: {
                list: [
                  { title: 'Google', value: 'google' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Trustpilot', value: 'trustpilot' },
                  { title: 'Site web', value: 'website' },
                  { title: 'Email', value: 'email' },
                  { title: 'Autre', value: 'other' },
                ],
              },
            },
            {
              name: 'sourceUrl',
              title: 'URL de la source',
              type: 'url',
              description: 'Lien vers le témoignage original',
            },
          ],
          preview: {
            select: {
              name: 'name',
              role: 'role',
              rating: 'rating',
              photo: 'photo',
            },
            prepare({ name, role, rating, photo }) {
              const stars = '⭐'.repeat(rating || 0)
              return {
                title: name || 'Client sans nom',
                subtitle: `${stars} • ${role || 'Aucun rôle'}`,
                media: photo,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(20),
    }),
    defineField({
      name: 'cardStyle',
      title: 'Style des cartes',
      type: 'string',
      description: 'Apparence des cartes de témoignages',
      options: {
        list: [
          { title: 'Minimal', value: 'minimal' },
          { title: 'Avec bordure', value: 'bordered' },
          { title: 'Avec ombre', value: 'shadow' },
          { title: 'Élevé', value: 'elevated' },
          { title: 'Avec fond coloré', value: 'colored' },
          { title: 'Glassmorphism', value: 'glass' },
          { title: 'Avec guillemets', value: 'quote' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'elevated',
    }),
    defineField({
      name: 'showRating',
      title: 'Afficher les notes',
      type: 'boolean',
      description: 'Afficher les étoiles de notation',
      initialValue: true,
    }),
    defineField({
      name: 'showPhoto',
      title: 'Afficher les photos',
      type: 'boolean',
      description: 'Afficher les photos des clients',
      initialValue: true,
    }),
    defineField({
      name: 'showRole',
      title: 'Afficher le rôle',
      type: 'boolean',
      description: 'Afficher le rôle/entreprise',
      initialValue: true,
    }),
    defineField({
      name: 'showDate',
      title: 'Afficher la date',
      type: 'boolean',
      description: 'Afficher la date du témoignage',
      initialValue: false,
    }),
    defineField({
      name: 'showVerified',
      title: 'Afficher le badge vérifié',
      type: 'boolean',
      description: 'Afficher un badge pour les témoignages vérifiés',
      initialValue: true,
    }),
    defineField({
      name: 'showSource',
      title: 'Afficher la source',
      type: 'boolean',
      description: 'Afficher la plateforme d\'origine',
      initialValue: false,
    }),
    defineField({
      name: 'autoplay',
      title: 'Lecture automatique',
      type: 'object',
      description: 'Configuration du carousel automatique',
      fields: [
        {
          name: 'enabled',
          title: 'Activer',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'delay',
          title: 'Délai (secondes)',
          type: 'number',
          description: 'Temps entre chaque témoignage',
          validation: (Rule) => Rule.min(2).max(20),
          initialValue: 5,
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
      testimonials: 'testimonials',
      layout: 'layout',
    },
    prepare({ title, testimonials, layout }) {
      const count = testimonials?.length || 0
      return {
        title: title || 'Témoignages clients',
        subtitle: `${count} témoignage(s) • ${layout}`,
      }
    },
  },
})
