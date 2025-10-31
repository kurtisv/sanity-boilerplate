import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  __experimental_singleton: true as any,
  fields: [
    // === SECTION HEADER ===
    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      description: 'Configuration de l\'en-tête du site',
      options: {
        collapsible: false,
      },
      fields: [
        {
          name: 'logo',
          title: 'Logo',
          type: 'image',
          description: 'Logo affiché dans le header',
          options: {
            hotspot: true,
          },
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
          name: 'backgroundColor',
          title: 'Couleur de fond',
          type: 'string',
          description: 'Couleur de fond du header (code HEX)',
          initialValue: '#ffffff',
        },
        {
          name: 'textColor',
          title: 'Couleur du texte',
          type: 'string',
          description: 'Couleur du texte du header (code HEX)',
          initialValue: '#000000',
        },
      ],
    }),

    // === SECTION FOOTER ===
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      description: 'Configuration du pied de page du site',
      options: {
        collapsible: false,
      },
      fields: [
        {
          name: 'text',
          title: 'Texte descriptif',
          type: 'text',
          description: 'Texte affiché dans le footer',
        },
        {
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
        },
        {
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
        },
        {
          name: 'copyrightText',
          title: 'Texte de copyright',
          type: 'string',
          description: 'Texte affiché en bas du footer',
          placeholder: '© 2025 Tous droits réservés',
        },
        {
          name: 'backgroundColor',
          title: 'Couleur de fond',
          type: 'string',
          description: 'Couleur de fond du footer (code HEX)',
          initialValue: '#111827',
        },
        {
          name: 'textColor',
          title: 'Couleur du texte',
          type: 'string',
          description: 'Couleur du texte du footer (code HEX)',
          initialValue: '#ffffff',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Paramètres du site',
        subtitle: 'Configuration Header & Footer',
      }
    },
  },
})
