import { defineField } from 'sanity'

export default {
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre principal',
      type: 'string',
      description: 'Le titre principal du hero',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description ou sous-titre du hero',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'cta',
      title: 'Bouton d\'action',
      type: 'object',
      description: 'Bouton principal du hero',
      fields: [
        {
          name: 'text',
          title: 'Texte du bouton',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'link',
          title: 'Lien',
          type: 'string',
          description: 'URL ou slug de la page (ex: /contact, https://example.com)',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'style',
          title: 'Style du bouton',
          type: 'string',
          options: {
            list: [
              { title: 'Principal (rempli)', value: 'primary' },
              { title: 'Secondaire (contour)', value: 'secondary' },
              { title: 'Fantôme (transparent)', value: 'ghost' },
            ],
            layout: 'radio',
          },
          initialValue: 'primary',
        },
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Image de fond',
      type: 'image',
      description: 'Image de fond du hero (optionnelle)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'backgroundOverlay',
      title: 'Superposition de fond',
      type: 'object',
      description: 'Couleur de superposition sur l\'image de fond',
      fields: [
        {
          name: 'enabled',
          title: 'Activer la superposition',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'color',
          title: 'Couleur de superposition',
          type: 'string',
          description: 'Couleur HEX ou rgba()',
          initialValue: 'rgba(0, 0, 0, 0.4)',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    defineField({
      name: 'textAlignment',
      title: 'Alignement du texte',
      type: 'string',
      description: 'Position du contenu dans le hero',
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
      name: 'verticalAlignment',
      title: 'Alignement vertical',
      type: 'string',
      description: 'Position verticale du contenu',
      options: {
        list: [
          { title: 'Haut', value: 'top' },
          { title: 'Centre', value: 'center' },
          { title: 'Bas', value: 'bottom' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'height',
      title: 'Hauteur du hero',
      type: 'string',
      description: 'Hauteur de la section hero',
      options: {
        list: [
          { title: 'Petite (400px)', value: 'small' },
          { title: 'Moyenne (600px)', value: 'medium' },
          { title: 'Grande (800px)', value: 'large' },
          { title: 'Plein écran', value: 'fullscreen' },
        ],
        layout: 'radio',
      },
      initialValue: 'large',
    }),
    defineField({
      name: 'textColor',
      title: 'Couleur du texte',
      type: 'string',
      description: 'Couleur du texte (code HEX)',
      initialValue: '#ffffff',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Couleur de fond',
      type: 'string',
      description: 'Couleur de fond si pas d\'image (code HEX)',
      initialValue: '#1f2937',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hero sans titre',
        subtitle: subtitle || 'Aucune description',
        media,
      }
    },
  },
} as const
