import { defineType, defineField } from 'sanity'
import { getThemeFields } from '../shared/themeFields'

export default defineType({
  name: 'ctaBlock',
  title: 'CTA Block',
  type: 'object',
  description: 'Call-to-action puissant avec boutons et image',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Titre principal du CTA',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description ou message du CTA',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      description: 'Style d\'affichage du CTA',
      options: {
        list: [
          { title: 'Centré', value: 'centered' },
          { title: 'Split (texte à gauche)', value: 'split-left' },
          { title: 'Split (texte à droite)', value: 'split-right' },
          { title: 'Avec image de fond', value: 'background-image' },
          { title: 'Pleine largeur', value: 'fullwidth' },
          { title: 'Compact', value: 'compact' },
          { title: 'Bannière', value: 'banner' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'centered',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Image d\'accompagnement (pour layouts split et background)',
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
    }),
    defineField({
      name: 'buttons',
      title: 'Boutons d\'action',
      type: 'array',
      description: 'Boutons CTA (maximum 3)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Texte du bouton',
              type: 'string',
              validation: (Rule) => Rule.required().max(50),
            },
            {
              name: 'href',
              title: 'Lien',
              type: 'string',
              description: 'URL ou slug de la page',
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
                  { title: 'Lien simple', value: 'link' },
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
                  { title: 'Extra grand', value: 'xl' },
                ],
                layout: 'radio',
              },
              initialValue: 'lg',
            },
            {
              name: 'icon',
              title: 'Icône',
              type: 'string',
              description: 'Nom d\'icône Lucide ou emoji',
              options: {
                list: [
                  { title: 'Aucune', value: '' },
                  { title: '→ Flèche droite', value: 'arrow-right' },
                  { title: '↗ Flèche externe', value: 'external-link' },
                  { title: '↓ Télécharger', value: 'download' },
                  { title: '✉ Email', value: 'mail' },
                  { title: '☎ Téléphone', value: 'phone' },
                  { title: '🚀 Fusée', value: 'rocket' },
                  { title: '✓ Validation', value: 'check' },
                  { title: '▶ Play', value: 'play' },
                ],
              },
            },
            {
              name: 'iconPosition',
              title: 'Position de l\'icône',
              type: 'string',
              options: {
                list: [
                  { title: 'Gauche', value: 'left' },
                  { title: 'Droite', value: 'right' },
                ],
              },
              initialValue: 'right',
              hidden: ({ parent }) => !parent?.icon,
            },
            {
              name: 'openInNewTab',
              title: 'Ouvrir dans un nouvel onglet',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              text: 'text',
              variant: 'variant',
            },
            prepare({ text, variant }) {
              return {
                title: text || 'Bouton sans texte',
                subtitle: `Style: ${variant || 'primary'}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(3),
    }),
    defineField({
      name: 'features',
      title: 'Points clés',
      type: 'array',
      description: 'Liste de points clés ou avantages (optionnel)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icône',
              type: 'string',
              description: 'Emoji ou nom d\'icône',
              initialValue: '✓',
            },
            {
              name: 'text',
              title: 'Texte',
              type: 'string',
              validation: (Rule) => Rule.required().max(100),
            },
          ],
          preview: {
            select: {
              icon: 'icon',
              text: 'text',
            },
            prepare({ icon, text }) {
              return {
                title: `${icon || '•'} ${text || 'Point clé'}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'urgency',
      title: 'Message d\'urgence',
      type: 'object',
      description: 'Ajouter un message d\'urgence ou de promotion',
      fields: [
        {
          name: 'enabled',
          title: 'Activer',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'text',
          title: 'Texte',
          type: 'string',
          description: 'Ex: Offre limitée, Plus que 3 places disponibles',
          validation: (Rule) => Rule.max(100),
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'icon',
          title: 'Icône',
          type: 'string',
          description: 'Emoji ou icône',
          initialValue: '⏰',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'style',
          title: 'Style',
          type: 'string',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Succès', value: 'success' },
              { title: 'Attention', value: 'warning' },
              { title: 'Urgent', value: 'urgent' },
            ],
          },
          initialValue: 'warning',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    defineField({
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
    }),
    defineField({
      name: 'size',
      title: 'Taille du bloc',
      type: 'string',
      description: 'Taille globale du bloc CTA',
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
      layout: 'layout',
      buttons: 'buttons',
    },
    prepare({ title, layout, buttons }) {
      const buttonCount = buttons?.length || 0
      return {
        title: title || 'Call-to-action',
        subtitle: `${layout} • ${buttonCount} bouton(s)`,
      }
    },
  },
})
