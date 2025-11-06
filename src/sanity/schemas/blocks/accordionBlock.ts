import { defineType, defineField } from 'sanity'
import { getThemeFields } from '../shared/themeFields'

export default defineType({
  name: 'accordionBlock',
  title: 'Accordion Block',
  type: 'object',
  description: 'Contenu pliable avec sections accordéon',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      description: 'Titre principal de la section accordéon',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description de la section accordéon',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      description: 'Style d\'affichage de l\'accordéon',
      options: {
        list: [
          { title: 'Colonne unique', value: 'single-column' },
          { title: 'Deux colonnes', value: 'two-columns' },
          { title: 'Avec sidebar', value: 'with-sidebar' },
        ],
        layout: 'radio',
      },
      initialValue: 'single-column',
    }),
    defineField({
      name: 'items',
      title: 'Éléments',
      type: 'array',
      description: 'Ajoutez vos éléments d\'accordéon',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titre',
              type: 'string',
              validation: (Rule) => Rule.required().max(200),
            },
            {
              name: 'content',
              title: 'Contenu',
              type: 'blockContent',
              description: 'Contenu riche de l\'élément',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icône',
              type: 'string',
              description: 'Emoji ou nom d\'icône Lucide (optionnel)',
              validation: (Rule) => Rule.max(50),
            },
            {
              name: 'iconColor',
              title: 'Couleur de l\'icône',
              type: 'string',
              initialValue: '#3b82f6',
              hidden: ({ parent }) => !parent?.icon,
            },
            {
              name: 'defaultOpen',
              title: 'Ouvert par défaut',
              type: 'boolean',
              description: 'Ouvrir cet élément au chargement',
              initialValue: false,
            },
            {
              name: 'featured',
              title: 'Mettre en avant',
              type: 'boolean',
              description: 'Mettre cet élément en évidence',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'title',
              icon: 'icon',
              defaultOpen: 'defaultOpen',
            },
            prepare({ title, icon, defaultOpen }) {
              return {
                title: `${icon || '▶'} ${title || 'Élément sans titre'}`,
                subtitle: defaultOpen ? 'Ouvert par défaut' : 'Fermé par défaut',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(30),
    }),
    defineField({
      name: 'allowMultipleOpen',
      title: 'Autoriser plusieurs ouvertures',
      type: 'boolean',
      description: 'Permettre d\'ouvrir plusieurs éléments en même temps',
      initialValue: false,
    }),
    defineField({
      name: 'cardStyle',
      title: 'Style des cartes',
      type: 'string',
      description: 'Apparence des éléments d\'accordéon',
      options: {
        list: [
          { title: 'Minimal', value: 'minimal' },
          { title: 'Avec bordure', value: 'bordered' },
          { title: 'Avec ombre', value: 'shadow' },
          { title: 'Élevé', value: 'elevated' },
          { title: 'Avec fond coloré', value: 'colored' },
        ],
        layout: 'radio',
      },
      initialValue: 'bordered',
    }),
    defineField({
      name: 'iconPosition',
      title: 'Position de l\'icône',
      type: 'string',
      description: 'Position de l\'icône de pliage',
      options: {
        list: [
          { title: 'Gauche', value: 'left' },
          { title: 'Droite', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'animation',
      title: 'Animation',
      type: 'string',
      description: 'Type d\'animation d\'ouverture/fermeture',
      options: {
        list: [
          { title: 'Glissement', value: 'slide' },
          { title: 'Fondu', value: 'fade' },
          { title: 'Glissement + Fondu', value: 'slide-fade' },
          { title: 'Aucune', value: 'none' },
        ],
        layout: 'radio',
      },
      initialValue: 'slide',
    }),
    defineField({
      name: 'spacing',
      title: 'Espacement',
      type: 'string',
      description: 'Espacement entre les éléments',
      options: {
        list: [
          { title: 'Compact', value: 'compact' },
          { title: 'Normal', value: 'normal' },
          { title: 'Large', value: 'large' },
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
      items: 'items',
      layout: 'layout',
    },
    prepare({ title, items, layout }) {
      const count = items?.length || 0
      return {
        title: title || 'Accordéon',
        subtitle: `${count} élément(s) • ${layout}`,
      }
    },
  },
})
