import { defineType, defineField } from 'sanity'
import { getThemeFields } from '../shared/themeFields'

export default defineType({
  name: 'pricingBlock',
  title: 'Pricing Block',
  type: 'object',
  description: 'Grille de plans tarifaires avec fonctionnalités',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      description: 'Titre principal de la section tarifs',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description de la section tarifs',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      description: 'Style d\'affichage des plans',
      options: {
        list: [
          { title: '2 colonnes', value: 'grid-2' },
          { title: '3 colonnes', value: 'grid-3' },
          { title: '4 colonnes', value: 'grid-4' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'Comparaison tableau', value: 'table' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid-3',
    }),
    defineField({
      name: 'plans',
      title: 'Plans tarifaires',
      type: 'array',
      description: 'Ajoutez vos plans tarifaires',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nom du plan',
              type: 'string',
              validation: (Rule) => Rule.required().max(50),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.max(150),
            },
            {
              name: 'price',
              title: 'Prix',
              type: 'string',
              description: 'Prix affiché (ex: 29, 99, Gratuit)',
              validation: (Rule) => Rule.required().max(20),
            },
            {
              name: 'currency',
              title: 'Devise',
              type: 'string',
              options: {
                list: [
                  { title: '$ USD', value: 'USD' },
                  { title: '€ EUR', value: 'EUR' },
                  { title: '$ CAD', value: 'CAD' },
                  { title: '£ GBP', value: 'GBP' },
                  { title: '¥ JPY', value: 'JPY' },
                ],
              },
              initialValue: 'USD',
            },
            {
              name: 'period',
              title: 'Période',
              type: 'string',
              description: 'Période de facturation',
              options: {
                list: [
                  { title: 'Par mois', value: 'month' },
                  { title: 'Par an', value: 'year' },
                  { title: 'Par semaine', value: 'week' },
                  { title: 'Par jour', value: 'day' },
                  { title: 'Unique', value: 'once' },
                  { title: 'Personnalisé', value: 'custom' },
                ],
              },
              initialValue: 'month',
            },
            {
              name: 'customPeriod',
              title: 'Période personnalisée',
              type: 'string',
              validation: (Rule) => Rule.max(30),
              hidden: ({ parent }) => parent?.period !== 'custom',
            },
            {
              name: 'features',
              title: 'Fonctionnalités',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'text',
                      title: 'Texte',
                      type: 'string',
                      validation: (Rule) => Rule.required().max(100),
                    },
                    {
                      name: 'included',
                      title: 'Inclus',
                      type: 'boolean',
                      description: 'Cette fonctionnalité est-elle incluse ?',
                      initialValue: true,
                    },
                    {
                      name: 'highlight',
                      title: 'Mettre en évidence',
                      type: 'boolean',
                      description: 'Mettre cette fonctionnalité en évidence',
                      initialValue: false,
                    },
                  ],
                  preview: {
                    select: {
                      title: 'text',
                      included: 'included',
                    },
                    prepare({ title, included }) {
                      return {
                        title: title || 'Fonctionnalité',
                        subtitle: included ? '✓ Inclus' : '✗ Non inclus',
                      }
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1).max(20),
            },
            {
              name: 'ctaButton',
              title: 'Bouton d\'action',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Texte du bouton',
                  type: 'string',
                  validation: (Rule) => Rule.required().max(50),
                  initialValue: 'Choisir ce plan',
                },
                {
                  name: 'href',
                  title: 'Lien',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'variant',
                  title: 'Style du bouton',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Principal', value: 'primary' },
                      { title: 'Secondaire', value: 'secondary' },
                      { title: 'Fantôme', value: 'ghost' },
                    ],
                  },
                  initialValue: 'primary',
                },
              ],
            },
            {
              name: 'featured',
              title: 'Plan en vedette',
              type: 'boolean',
              description: 'Mettre ce plan en évidence',
              initialValue: false,
            },
            {
              name: 'badge',
              title: 'Badge',
              type: 'string',
              description: 'Badge affiché sur le plan (ex: Populaire, Meilleure valeur)',
              validation: (Rule) => Rule.max(30),
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
                  { title: 'Rose', value: '#ec4899' },
                  { title: 'Orange', value: '#f97316' },
                ],
              },
              initialValue: '#3b82f6',
              hidden: ({ parent }) => !parent?.badge,
            },
          ],
          preview: {
            select: {
              name: 'name',
              price: 'price',
              period: 'period',
              featured: 'featured',
            },
            prepare({ name, price, period, featured }) {
              return {
                title: name || 'Plan sans nom',
                subtitle: `${price}/${period}${featured ? ' • En vedette' : ''}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'cardStyle',
      title: 'Style des cartes',
      type: 'string',
      description: 'Apparence des cartes de tarifs',
      options: {
        list: [
          { title: 'Minimal', value: 'minimal' },
          { title: 'Avec bordure', value: 'bordered' },
          { title: 'Avec ombre', value: 'shadow' },
          { title: 'Élevé', value: 'elevated' },
          { title: 'Avec fond coloré', value: 'colored' },
          { title: 'Glassmorphism', value: 'glass' },
        ],
        layout: 'radio',
      },
      initialValue: 'elevated',
    }),
    defineField({
      name: 'billingToggle',
      title: 'Basculer mensuel/annuel',
      type: 'object',
      description: 'Permettre de basculer entre tarifs mensuels et annuels',
      fields: [
        {
          name: 'enabled',
          title: 'Activer',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'monthlyLabel',
          title: 'Label mensuel',
          type: 'string',
          initialValue: 'Mensuel',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'yearlyLabel',
          title: 'Label annuel',
          type: 'string',
          initialValue: 'Annuel',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'savingsText',
          title: 'Texte d\'économies',
          type: 'string',
          description: 'Ex: Économisez 20%',
          validation: (Rule) => Rule.max(50),
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    
    // Champs de thème unifiés
    ...getThemeFields(),
  ],
  preview: {
    select: {
      title: 'title',
      plans: 'plans',
      layout: 'layout',
    },
    prepare({ title, plans, layout }) {
      const planCount = plans?.length || 0
      return {
        title: title || 'Plans tarifaires',
        subtitle: `${planCount} plan(s) • ${layout}`,
      }
    },
  },
})
