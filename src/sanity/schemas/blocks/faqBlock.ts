import { defineType, defineField } from 'sanity'
import { getThemeFields } from '../shared/themeFields'

export default defineType({
  name: 'faqBlock',
  title: 'FAQ Block',
  type: 'object',
  description: 'Questions fréquentes avec accordéon et catégories',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      description: 'Titre principal de la section FAQ',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description de la section FAQ',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      description: 'Style d\'affichage des questions',
      options: {
        list: [
          { title: 'Colonne unique', value: 'single-column' },
          { title: 'Deux colonnes', value: 'two-columns' },
          { title: 'Avec sidebar', value: 'with-sidebar' },
          { title: 'Accordéon compact', value: 'accordion-compact' },
          { title: 'Grille de cartes', value: 'card-grid' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'single-column',
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      description: 'Ajoutez vos questions fréquentes',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required().max(200),
            },
            {
              name: 'answer',
              title: 'Réponse',
              type: 'text',
              description: 'Réponse détaillée à la question',
              rows: 4,
              validation: (Rule) => Rule.required().max(1000),
            },
            {
              name: 'category',
              title: 'Catégorie',
              type: 'string',
              description: 'Catégorie de la question',
              options: {
                list: [
                  { title: 'Général', value: 'general' },
                  { title: 'Tarifs', value: 'pricing' },
                  { title: 'Technique', value: 'technical' },
                  { title: 'Compte', value: 'account' },
                  { title: 'Paiement', value: 'payment' },
                  { title: 'Livraison', value: 'shipping' },
                  { title: 'Support', value: 'support' },
                  { title: 'Sécurité', value: 'security' },
                  { title: 'Autre', value: 'other' },
                ],
                layout: 'dropdown',
              },
              initialValue: 'general',
            },
            {
              name: 'icon',
              title: 'Icône',
              type: 'string',
              description: 'Emoji ou nom d\'icône (optionnel)',
              validation: (Rule) => Rule.max(50),
            },
            {
              name: 'featured',
              title: 'Question en vedette',
              type: 'boolean',
              description: 'Mettre cette question en évidence',
              initialValue: false,
            },
            {
              name: 'displayOrder',
              title: 'Ordre d\'affichage',
              type: 'number',
              description: 'Ordre d\'affichage (plus petit = premier)',
              validation: (Rule) => Rule.min(0).max(100),
              initialValue: 0,
            },
          ],
          preview: {
            select: {
              question: 'question',
              category: 'category',
              featured: 'featured',
            },
            prepare({ question, category, featured }) {
              return {
                title: question || 'Question sans titre',
                subtitle: `${category || 'general'}${featured ? ' • En vedette' : ''}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(50),
    }),
    defineField({
      name: 'showCategories',
      title: 'Afficher les catégories',
      type: 'boolean',
      description: 'Permettre le filtrage par catégorie',
      initialValue: true,
    }),
    defineField({
      name: 'showSearch',
      title: 'Afficher la recherche',
      type: 'boolean',
      description: 'Ajouter une barre de recherche',
      initialValue: true,
    }),
    defineField({
      name: 'defaultOpen',
      title: 'Ouvrir par défaut',
      type: 'string',
      description: 'Comportement d\'ouverture des questions',
      options: {
        list: [
          { title: 'Toutes fermées', value: 'none' },
          { title: 'Première ouverte', value: 'first' },
          { title: 'Questions en vedette', value: 'featured' },
          { title: 'Toutes ouvertes', value: 'all' },
        ],
        layout: 'radio',
      },
      initialValue: 'first',
    }),
    defineField({
      name: 'allowMultipleOpen',
      title: 'Autoriser plusieurs ouvertures',
      type: 'boolean',
      description: 'Permettre d\'ouvrir plusieurs questions en même temps',
      initialValue: false,
    }),
    defineField({
      name: 'cardStyle',
      title: 'Style des cartes',
      type: 'string',
      description: 'Apparence des cartes de questions',
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
      name: 'contactSection',
      title: 'Section contact',
      type: 'object',
      description: 'Ajouter une section "Question non résolue ?"',
      fields: [
        {
          name: 'enabled',
          title: 'Activer',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Vous ne trouvez pas votre réponse ?',
          validation: (Rule) => Rule.max(100),
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Notre équipe est là pour vous aider. Contactez-nous !',
          validation: (Rule) => Rule.max(200),
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'buttonText',
          title: 'Texte du bouton',
          type: 'string',
          initialValue: 'Nous contacter',
          validation: (Rule) => Rule.max(50),
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'buttonHref',
          title: 'Lien du bouton',
          type: 'string',
          initialValue: '/contact',
          validation: (Rule) => Rule.required(),
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    defineField({
      name: 'schema',
      title: 'Schema.org FAQ',
      type: 'object',
      description: 'Ajouter les données structurées pour le SEO',
      fields: [
        {
          name: 'enabled',
          title: 'Activer',
          type: 'boolean',
          description: 'Ajouter le markup Schema.org FAQPage',
          initialValue: true,
        },
      ],
    }),
    
    // Champs de thème unifiés
    ...getThemeFields(),
  ],
  preview: {
    select: {
      title: 'title',
      questions: 'questions',
      layout: 'layout',
    },
    prepare({ title, questions, layout }) {
      const count = questions?.length || 0
      return {
        title: title || 'Questions fréquentes',
        subtitle: `${count} question(s) • ${layout}`,
      }
    },
  },
})
