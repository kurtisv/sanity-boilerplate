import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  icon: () => '🦸',
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
    defineField({
      name: 'backgroundSettings',
      title: 'Paramètres de fond',
      type: 'object',
      description: 'Configuration du fond du hero',
      fields: [
        {
          name: 'backgroundType',
          title: 'Type de fond',
          type: 'string',
          options: {
            list: [
              { title: 'Couleur unie', value: 'solid' },
              { title: 'Dégradé', value: 'gradient' },
              { title: 'Image', value: 'image' },
            ],
            layout: 'radio',
          },
          initialValue: 'solid',
        },
        {
          name: 'backgroundColor',
          title: 'Couleur de fond',
          type: 'string',
          description: 'Couleur de fond (code HEX)',
          initialValue: '#1f2937',
          hidden: ({ parent }) => parent?.backgroundType !== 'solid',
        },
        {
          name: 'gradientColors',
          title: 'Couleurs du dégradé',
          type: 'object',
          fields: [
            {
              name: 'from',
              title: 'Couleur de départ',
              type: 'string',
              description: 'Couleur HEX de départ',
              initialValue: '#2563eb',
            },
            {
              name: 'to',
              title: 'Couleur d\'arrivée',
              type: 'string',
              description: 'Couleur HEX d\'arrivée',
              initialValue: '#7c3aed',
            },
            {
              name: 'direction',
              title: 'Direction du dégradé',
              type: 'string',
              options: {
                list: [
                  { title: 'Vers le bas', value: 'to-b' },
                  { title: 'Vers le haut', value: 'to-t' },
                  { title: 'Vers la droite', value: 'to-r' },
                  { title: 'Vers la gauche', value: 'to-l' },
                  { title: 'Diagonal bas-droite', value: 'to-br' },
                  { title: 'Diagonal bas-gauche', value: 'to-bl' },
                  { title: 'Diagonal haut-droite', value: 'to-tr' },
                  { title: 'Diagonal haut-gauche', value: 'to-tl' },
                ],
              },
              initialValue: 'to-br',
            },
          ],
          hidden: ({ parent }) => parent?.backgroundType !== 'gradient',
        },
        {
          name: 'backgroundImage',
          title: 'Image de fond',
          type: 'image',
          description: 'Image de fond du hero',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.backgroundType !== 'image',
        },
        {
          name: 'backgroundOverlay',
          title: 'Superposition',
          type: 'object',
          description: 'Superposition sur l\'image de fond',
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
          hidden: ({ parent }) => parent?.backgroundType !== 'image',
        },
      ],
    }),
    defineField({
      name: 'styling',
      title: 'Styles et apparence',
      type: 'object',
      description: 'Configuration des styles du hero',
      fields: [
        {
          name: 'textColor',
          title: 'Couleur du texte',
          type: 'string',
          description: 'Couleur du texte (code HEX)',
          initialValue: '#ffffff',
        },
        {
          name: 'textAlignment',
          title: 'Alignement du texte',
          type: 'string',
          options: {
            list: [
              { title: 'Gauche', value: 'left' },
              { title: 'Centre', value: 'center' },
              { title: 'Droite', value: 'right' },
            ],
            layout: 'radio',
          },
          initialValue: 'center',
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
        {
          name: 'height',
          title: 'Hauteur du hero',
          type: 'string',
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
        },
        {
          name: 'spacing',
          title: 'Espacement',
          type: 'string',
          options: {
            list: [
              { title: 'Compact', value: 'compact' },
              { title: 'Normal', value: 'normal' },
              { title: 'Large', value: 'large' },
            ],
            layout: 'radio',
          },
          initialValue: 'normal',
        },
      ],
    }),
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
