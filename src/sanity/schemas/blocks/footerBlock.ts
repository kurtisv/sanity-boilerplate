import { defineField } from 'sanity'

export default {
  name: 'footerBlock',
  title: 'Footer',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Texte principal',
      type: 'text',
      description: 'Texte de description du footer',
      rows: 3,
    }),
    defineField({
      name: 'columns',
      title: 'Colonnes de liens',
      type: 'array',
      description: 'Colonnes avec liens organisés par catégorie',
      of: [
        {
          type: 'object',
          title: 'Colonne',
          fields: [
            {
              name: 'title',
              title: 'Titre de la colonne',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'links',
              title: 'Liens',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Lien',
                  fields: [
                    {
                      name: 'title',
                      title: 'Titre',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'link',
                      title: 'URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
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
            },
          ],
          preview: {
            select: {
              title: 'title',
              links: 'links',
            },
            prepare({ title, links }) {
              return {
                title,
                subtitle: `${links?.length || 0} lien(s)`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Réseaux sociaux',
      type: 'object',
      description: 'Liens vers les réseaux sociaux',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Texte de copyright',
      type: 'string',
      description: 'Texte affiché en bas du footer',
      initialValue: '© 2025 Mon Site. Tous droits réservés.',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Couleur de fond',
      type: 'string',
      description: 'Couleur de fond du footer (code HEX)',
      initialValue: '#f8f9fa',
    }),
    defineField({
      name: 'textColor',
      title: 'Couleur du texte',
      type: 'string',
      description: 'Couleur du texte du footer (code HEX)',
      initialValue: '#6c757d',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
        subtitle: 'Configuration du pied de page',
      }
    },
  },
} as const
