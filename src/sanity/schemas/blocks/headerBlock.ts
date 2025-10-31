import { defineField } from 'sanity'

export default {
  name: 'headerBlock',
  title: 'Header',
  type: 'object',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo (Image)',
      type: 'image',
      description: 'Logo image affiché dans le header',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoText',
      title: 'Logo (Texte)',
      type: 'string',
      description: 'Texte du logo (alternative à l\'image)',
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      description: 'Alignement des éléments du header',
      options: {
        list: [
          { title: 'Logo gauche / Menu droite', value: 'split' },
          { title: 'Centré', value: 'center' },
          { title: 'Gauche', value: 'left' },
        ],
        layout: 'radio',
      },
      initialValue: 'split',
    }),
    defineField({
      name: 'navigationMenu',
      title: 'Menu de navigation',
      type: 'array',
      description: 'Liens de navigation principaux',
      of: [
        {
          type: 'object',
          title: 'Item de menu',
          fields: [
            {
              name: 'title',
              title: 'Titre',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Lien',
              type: 'string',
              description: 'URL ou slug de la page (ex: /about)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'submenu',
              title: 'Sous-menu',
              type: 'array',
              description: 'Menu déroulant (optionnel)',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Titre',
                      type: 'string',
                    },
                    {
                      name: 'link',
                      title: 'Lien',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              link: 'link',
            },
            prepare({ title, link }) {
              return {
                title,
                subtitle: link,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Bouton CTA',
      type: 'object',
      description: 'Bouton d\'action dans le header (optionnel)',
      fields: [
        {
          name: 'text',
          title: 'Texte',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Lien',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Couleur de fond',
      type: 'string',
      description: 'Couleur de fond du header (code HEX)',
      initialValue: '#ffffff',
    }),
    defineField({
      name: 'textColor',
      title: 'Couleur du texte',
      type: 'string',
      description: 'Couleur du texte du header (code HEX)',
      initialValue: '#000000',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header',
        subtitle: 'Configuration de l\'en-tête',
      }
    },
  },
} as const
