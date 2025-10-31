import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'headerSettings',
  title: 'Header',
  type: 'document',
  icon: () => '🎯',
  description: 'Configuration de l\'en-tête du site (logo, navigation, couleurs)',
  fields: [
    defineField({
      name: 'logoType',
      title: 'Type de logo',
      type: 'string',
      description: 'Choisir entre une image ou du texte',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Texte', value: 'text' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'logo',
      title: 'Logo (Image)',
      type: 'image',
      description: 'Logo image affiché dans le header',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.logoType !== 'image',
    }),
    defineField({
      name: 'logoText',
      title: 'Logo (Texte)',
      type: 'string',
      description: 'Texte du logo',
      hidden: ({ parent }) => parent?.logoType !== 'text',
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
})
