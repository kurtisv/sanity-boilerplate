import { defineType, defineField } from 'sanity'
import { getIconField } from '../shared/themeFields'
import { getThemeFields } from '../shared/themeFields'

export default defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  description: 'Bannière principale avec titre, CTA et image de fond',
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
      name: 'ctaButtons',
      title: 'Boutons d\'action',
      type: 'array',
      description: 'Boutons CTA du hero (maximum 3)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Texte du bouton',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Lien',
              type: 'string',
              description: 'URL ou slug de la page (ex: /contact, https://example.com)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'variant',
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
            {
              name: 'size',
              title: 'Taille du bouton',
              type: 'string',
              options: {
                list: [
                  { title: 'Petit', value: 'sm' },
                  { title: 'Moyen', value: 'md' },
                  { title: 'Grand', value: 'lg' },
                ],
                layout: 'radio',
              },
              initialValue: 'md',
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'variant',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Bouton sans texte',
                subtitle: `Style: ${subtitle || 'primary'}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'layout',
      title: 'Layout du hero',
      type: 'string',
      description: 'Disposition du contenu',
      options: {
        list: [
          { title: 'Centré', value: 'centered' },
          { title: 'Gauche avec image', value: 'left-image' },
          { title: 'Droite avec image', value: 'right-image' },
          { title: 'Pleine largeur', value: 'fullwidth' },
        ],
        layout: 'radio',
      },
      initialValue: 'centered',
    }),
    // Champs de thème unifiés
    ...getThemeFields(),
    // Champs spécifiques au Hero Block
    defineField({
      name: 'heroSettings',
      title: 'Paramètres spécifiques',
      type: 'object',
      description: 'Configuration spécifique au bloc hero',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'height',
          title: 'Hauteur du hero',
          type: 'string',
          options: {
            list: [
              { title: 'Petit (400px)', value: 'small' },
              { title: 'Moyen (600px)', value: 'medium' },
              { title: 'Grand (800px)', value: 'large' },
              { title: 'Plein écran', value: 'fullscreen' },
            ],
          },
          initialValue: 'large',
        },
        {
          name: 'verticalAlignment',
          title: 'Alignement vertical',
          type: 'string',
          options: {
            list: [
              { title: 'Haut', value: 'top' },
              { title: 'Centre', value: 'center' },
              { title: 'Bas', value: 'bottom' },
            ],
            layout: 'radio',
          },
          initialValue: 'center',
        },
      ],
    }),

    // Champ d'icône pour le hero
    ...getIconField(),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: any }) {
      return {
        title: title || 'Hero sans titre',
        subtitle: subtitle || 'Aucune description',
        media,
      }
    },
  },
})
