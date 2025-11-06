import { defineType, defineField } from 'sanity'
import { getThemeFields } from '../shared/themeFields'

export default defineType({
  name: 'logoCloudBlock',
  title: 'Logo Cloud Block',
  type: 'object',
  description: 'Grille de logos clients, partenaires ou certifications',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      description: 'Titre principal de la section logos',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description de la section logos',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      description: 'Style d\'affichage des logos',
      options: {
        list: [
          { title: 'Grille 3 colonnes', value: 'grid-3' },
          { title: 'Grille 4 colonnes', value: 'grid-4' },
          { title: 'Grille 5 colonnes', value: 'grid-5' },
          { title: 'Grille 6 colonnes', value: 'grid-6' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'Défilement infini', value: 'infinite-scroll' },
          { title: 'Masonry', value: 'masonry' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'grid-4',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      description: 'Ajoutez vos logos',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nom',
              type: 'string',
              description: 'Nom de l\'entreprise ou organisation',
              validation: (Rule) => Rule.required().max(100),
            },
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
              description: 'Image du logo (PNG ou SVG recommandé)',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Texte alternatif',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Lien vers le site web (optionnel)',
            },
            {
              name: 'category',
              title: 'Catégorie',
              type: 'string',
              description: 'Type de logo',
              options: {
                list: [
                  { title: 'Client', value: 'client' },
                  { title: 'Partenaire', value: 'partner' },
                  { title: 'Investisseur', value: 'investor' },
                  { title: 'Certification', value: 'certification' },
                  { title: 'Média', value: 'media' },
                  { title: 'Sponsor', value: 'sponsor' },
                  { title: 'Technologie', value: 'technology' },
                  { title: 'Autre', value: 'other' },
                ],
                layout: 'dropdown',
              },
              initialValue: 'client',
            },
            {
              name: 'featured',
              title: 'Mettre en avant',
              type: 'boolean',
              description: 'Mettre ce logo en évidence',
              initialValue: false,
            },
            {
              name: 'displayOrder',
              title: 'Ordre d\'affichage',
              type: 'number',
              description: 'Ordre d\'affichage (plus petit = premier)',
              validation: (Rule) => Rule.min(0).max(100),
              initialValue: 0,
            },
          ],
          preview: {
            select: {
              name: 'name',
              category: 'category',
              logo: 'logo',
              featured: 'featured',
            },
            prepare({ name, category, logo, featured }) {
              return {
                title: name || 'Logo sans nom',
                subtitle: `${category || 'client'}${featured ? ' • En vedette' : ''}`,
                media: logo,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(50),
    }),
    defineField({
      name: 'logoStyle',
      title: 'Style des logos',
      type: 'string',
      description: 'Apparence des logos',
      options: {
        list: [
          { title: 'Normal (couleur)', value: 'normal' },
          { title: 'Noir et blanc', value: 'grayscale' },
          { title: 'Avec bordure', value: 'bordered' },
          { title: 'Avec ombre', value: 'shadow' },
          { title: 'Cercle', value: 'circle' },
          { title: 'Carré arrondi', value: 'rounded' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'grayscale',
    }),
    defineField({
      name: 'logoSize',
      title: 'Taille des logos',
      type: 'string',
      description: 'Taille d\'affichage des logos',
      options: {
        list: [
          { title: 'Petit', value: 'small' },
          { title: 'Moyen', value: 'medium' },
          { title: 'Grand', value: 'large' },
          { title: 'Extra grand', value: 'xl' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'hoverEffect',
      title: 'Effet au survol',
      type: 'string',
      description: 'Animation au survol des logos',
      options: {
        list: [
          { title: 'Aucun', value: 'none' },
          { title: 'Zoom', value: 'zoom' },
          { title: 'Élévation', value: 'lift' },
          { title: 'Rotation', value: 'rotate' },
          { title: 'Couleur', value: 'color' },
          { title: 'Brillance', value: 'shine' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'zoom',
    }),
    defineField({
      name: 'showCategories',
      title: 'Afficher les catégories',
      type: 'boolean',
      description: 'Permettre le filtrage par catégorie',
      initialValue: false,
    }),
    defineField({
      name: 'autoplay',
      title: 'Lecture automatique',
      type: 'object',
      description: 'Configuration du carousel/défilement automatique',
      fields: [
        {
          name: 'enabled',
          title: 'Activer',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'speed',
          title: 'Vitesse',
          type: 'string',
          options: {
            list: [
              { title: 'Très lent', value: 'very-slow' },
              { title: 'Lent', value: 'slow' },
              { title: 'Normal', value: 'normal' },
              { title: 'Rapide', value: 'fast' },
              { title: 'Très rapide', value: 'very-fast' },
            ],
          },
          initialValue: 'normal',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'pauseOnHover',
          title: 'Pause au survol',
          type: 'boolean',
          initialValue: true,
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    defineField({
      name: 'spacing',
      title: 'Espacement',
      type: 'string',
      description: 'Espacement entre les logos',
      options: {
        list: [
          { title: 'Compact', value: 'compact' },
          { title: 'Normal', value: 'normal' },
          { title: 'Large', value: 'large' },
          { title: 'Extra large', value: 'xl' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
    
    // Champs de thème unifiés
    ...getThemeFields(),
  ],
  preview: {
    select: {
      title: 'title',
      logos: 'logos',
      layout: 'layout',
    },
    prepare({ title, logos, layout }) {
      const count = logos?.length || 0
      return {
        title: title || 'Logos clients/partenaires',
        subtitle: `${count} logo(s) • ${layout}`,
      }
    },
  },
})
