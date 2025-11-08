import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footerSettings',
  title: 'Footer',
  type: 'document',
  description: 'Configuration du pied de page (liens, réseaux sociaux, copyright)',
  fields: [
    defineField({
      name: 'text',
      title: 'Texte descriptif',
      type: 'text',
      description: 'Texte affiché dans le footer',
    }),
    defineField({
      name: 'columns',
      title: 'Colonnes de liens',
      type: 'array',
      description: 'Organisez vos liens en colonnes',
      of: [
        {
          type: 'object',
          title: 'Colonne',
          fields: [
            {
              name: 'title',
              title: 'Titre de la colonne',
              type: 'string',
            },
            {
              name: 'links',
              title: 'Liens',
              type: 'array',
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
      description: 'Liens vers vos réseaux sociaux',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter / X',
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
      placeholder: '© 2025 Tous droits réservés',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Couleur de fond',
      type: 'string',
      description: 'Couleur de fond du footer (code HEX)',
      initialValue: '#111827',
    }),
    defineField({
      name: 'textColor',
      title: 'Couleur du texte',
      type: 'string',
      description: 'Couleur du texte du footer (code HEX)',
      initialValue: '#ffffff',
    }),
    defineField({
      name: 'generatedByAgents',
      title: 'Généré par les agents',
      type: 'boolean',
      description: 'Indique si ce footer a été généré automatiquement',
      readOnly: true,
    }),
    defineField({
      name: 'generatedAt',
      title: 'Date de génération',
      type: 'datetime',
      description: 'Date de génération automatique',
      readOnly: true,
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
})
