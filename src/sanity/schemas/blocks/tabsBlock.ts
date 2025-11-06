import { defineType, defineField } from 'sanity'
import { getThemeFields } from '../shared/themeFields'

export default defineType({
  name: 'tabsBlock',
  title: 'Tabs Block',
  type: 'object',
  description: 'Contenu organisé en onglets',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      description: 'Titre principal de la section onglets',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description de la section onglets',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      description: 'Style d\'affichage des onglets',
      options: {
        list: [
          { title: 'Horizontal (haut)', value: 'horizontal-top' },
          { title: 'Horizontal (bas)', value: 'horizontal-bottom' },
          { title: 'Vertical (gauche)', value: 'vertical-left' },
          { title: 'Vertical (droite)', value: 'vertical-right' },
          { title: 'Pills', value: 'pills' },
          { title: 'Underline', value: 'underline' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'horizontal-top',
    }),
    defineField({
      name: 'tabs',
      title: 'Onglets',
      type: 'array',
      description: 'Ajoutez vos onglets',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Texte de l\'onglet',
              validation: (Rule) => Rule.required().max(50),
            },
            {
              name: 'content',
              title: 'Contenu',
              type: 'blockContent',
              description: 'Contenu riche de l\'onglet',
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
              name: 'badge',
              title: 'Badge',
              type: 'string',
              description: 'Badge affiché sur l\'onglet (ex: Nouveau, Populaire)',
              validation: (Rule) => Rule.max(20),
            },
            {
              name: 'badgeColor',
              title: 'Couleur du badge',
              type: 'string',
              options: {
                list: [
                  { title: 'Bleu', value: '#3b82f6' },
                  { title: 'Vert', value: '#10b981' },
                  { title: 'Rouge', value: '#ef4444' },
                  { title: 'Jaune', value: '#eab308' },
                  { title: 'Violet', value: '#8b5cf6' },
                ],
              },
              initialValue: '#3b82f6',
              hidden: ({ parent }) => !parent?.badge,
            },
            {
              name: 'defaultActive',
              title: 'Actif par défaut',
              type: 'boolean',
              description: 'Afficher cet onglet au chargement',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              label: 'label',
              icon: 'icon',
              badge: 'badge',
              defaultActive: 'defaultActive',
            },
            prepare({ label, icon, badge, defaultActive }) {
              return {
                title: `${icon || '📄'} ${label || 'Onglet sans label'}`,
                subtitle: `${badge || ''}${defaultActive ? ' • Actif par défaut' : ''}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).max(10),
    }),
    defineField({
      name: 'tabStyle',
      title: 'Style des onglets',
      type: 'string',
      description: 'Apparence des onglets',
      options: {
        list: [
          { title: 'Minimal', value: 'minimal' },
          { title: 'Avec bordure', value: 'bordered' },
          { title: 'Avec fond', value: 'filled' },
          { title: 'Avec ombre', value: 'shadow' },
          { title: 'Coloré', value: 'colored' },
        ],
        layout: 'radio',
      },
      initialValue: 'bordered',
    }),
    defineField({
      name: 'contentStyle',
      title: 'Style du contenu',
      type: 'string',
      description: 'Apparence du contenu des onglets',
      options: {
        list: [
          { title: 'Minimal', value: 'minimal' },
          { title: 'Avec bordure', value: 'bordered' },
          { title: 'Avec ombre', value: 'shadow' },
          { title: 'Élevé', value: 'elevated' },
        ],
        layout: 'radio',
      },
      initialValue: 'bordered',
    }),
    defineField({
      name: 'animation',
      title: 'Animation',
      type: 'string',
      description: 'Type d\'animation de transition',
      options: {
        list: [
          { title: 'Fondu', value: 'fade' },
          { title: 'Glissement gauche', value: 'slide-left' },
          { title: 'Glissement droite', value: 'slide-right' },
          { title: 'Zoom', value: 'zoom' },
          { title: 'Aucune', value: 'none' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'fade',
    }),
    defineField({
      name: 'persistent',
      title: 'Mémoriser l\'onglet actif',
      type: 'boolean',
      description: 'Sauvegarder l\'onglet actif dans l\'URL',
      initialValue: false,
    }),
    defineField({
      name: 'fullWidth',
      title: 'Onglets pleine largeur',
      type: 'boolean',
      description: 'Étendre les onglets sur toute la largeur',
      initialValue: false,
    }),
    
    // Champs de thème unifiés
    ...getThemeFields(),
  ],
  preview: {
    select: {
      title: 'title',
      tabs: 'tabs',
      layout: 'layout',
    },
    prepare({ title, tabs, layout }) {
      const count = tabs?.length || 0
      return {
        title: title || 'Onglets',
        subtitle: `${count} onglet(s) • ${layout}`,
      }
    },
  },
})
