import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactBlock',
  title: 'Contact Block',
  type: 'object',
  description: 'Formulaire de contact configurable avec validation et styles multiples',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Titre principal du formulaire de contact',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description ou instructions pour le formulaire',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'layout',
      title: 'Mise en page',
      type: 'string',
      description: 'Style de présentation du formulaire',
      options: {
        list: [
          { title: 'Centré', value: 'centered' },
          { title: 'Deux colonnes', value: 'two-columns' },
          { title: 'Avec sidebar', value: 'with-sidebar' },
          { title: 'Pleine largeur', value: 'full-width' },
        ],
      },
      initialValue: 'centered',
    }),
    defineField({
      name: 'formFields',
      title: 'Champs du formulaire',
      type: 'array',
      description: 'Configurez les champs à afficher dans le formulaire',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'fieldType',
              title: 'Type de champ',
              type: 'string',
              options: {
                list: [
                  { title: 'Nom', value: 'name' },
                  { title: 'Email', value: 'email' },
                  { title: 'Téléphone', value: 'phone' },
                  { title: 'Entreprise', value: 'company' },
                  { title: 'Sujet', value: 'subject' },
                  { title: 'Message', value: 'message' },
                  { title: 'Champ personnalisé', value: 'custom' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label du champ',
              type: 'string',
              description: 'Texte affiché au-dessus du champ',
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
              description: 'Texte d\'exemple dans le champ',
              validation: (Rule) => Rule.max(100),
            }),
            defineField({
              name: 'required',
              title: 'Champ obligatoire',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'width',
              title: 'Largeur',
              type: 'string',
              description: 'Largeur du champ dans la grille',
              options: {
                list: [
                  { title: 'Demi-largeur', value: 'half' },
                  { title: 'Pleine largeur', value: 'full' },
                ],
              },
              initialValue: 'full',
            }),
          ],
          preview: {
            select: {
              fieldType: 'fieldType',
              label: 'label',
              required: 'required',
            },
            prepare({ fieldType, label, required }) {
              return {
                title: label || fieldType,
                subtitle: `${fieldType}${required ? ' (obligatoire)' : ''}`,
                media: required ? '🔴' : '⚪',
              }
            },
          },
        },
      ],
      initialValue: [
        {
          fieldType: 'name',
          label: 'Nom complet',
          placeholder: 'Votre nom et prénom',
          required: true,
          width: 'full',
        },
        {
          fieldType: 'email',
          label: 'Adresse email',
          placeholder: 'votre@email.com',
          required: true,
          width: 'full',
        },
        {
          fieldType: 'subject',
          label: 'Sujet',
          placeholder: 'Objet de votre message',
          required: false,
          width: 'full',
        },
        {
          fieldType: 'message',
          label: 'Message',
          placeholder: 'Décrivez votre demande...',
          required: true,
          width: 'full',
        },
      ],
    }),
    defineField({
      name: 'submitButton',
      title: 'Bouton d\'envoi',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Texte du bouton',
          type: 'string',
          initialValue: 'Envoyer le message',
          validation: (Rule) => Rule.required().max(30),
        }),
        defineField({
          name: 'loadingText',
          title: 'Texte pendant l\'envoi',
          type: 'string',
          initialValue: 'Envoi en cours...',
          validation: (Rule) => Rule.max(30),
        }),
      ],
    }),
    defineField({
      name: 'successMessage',
      title: 'Message de succès',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre de confirmation',
          type: 'string',
          initialValue: 'Message envoyé !',
          validation: (Rule) => Rule.required().max(50),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Merci pour votre message. Nous vous répondrons dans les plus brefs délais.',
          rows: 2,
          validation: (Rule) => Rule.max(200),
        }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Informations de contact',
      type: 'object',
      description: 'Informations affichées à côté du formulaire (pour layout avec sidebar)',
      fields: [
        defineField({
          name: 'showContactInfo',
          title: 'Afficher les informations de contact',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'address',
          title: 'Adresse',
          type: 'text',
          rows: 2,
          hidden: ({ parent }) => !parent?.showContactInfo,
        }),
        defineField({
          name: 'phone',
          title: 'Téléphone',
          type: 'string',
          hidden: ({ parent }) => !parent?.showContactInfo,
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.email(),
          hidden: ({ parent }) => !parent?.showContactInfo,
        }),
        defineField({
          name: 'hours',
          title: 'Horaires d\'ouverture',
          type: 'text',
          rows: 3,
          hidden: ({ parent }) => !parent?.showContactInfo,
        }),
      ],
    }),
    defineField({
      name: 'styling',
      title: 'Apparence',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundColor',
          title: 'Couleur de fond',
          type: 'string',
          description: 'Couleur de fond de la section (format HEX)',
          initialValue: '#ffffff',
          validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Format HEX requis (ex: #ffffff)'),
        }),
        defineField({
          name: 'textColor',
          title: 'Couleur du texte',
          type: 'string',
          description: 'Couleur du texte (format HEX)',
          initialValue: '#1f2937',
          validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Format HEX requis (ex: #1f2937)'),
        }),
        defineField({
          name: 'spacing',
          title: 'Espacement',
          type: 'string',
          options: {
            list: [
              { title: 'Compact', value: 'compact' },
              { title: 'Normal', value: 'normal' },
              { title: 'Large', value: 'large' },
            ],
          },
          initialValue: 'normal',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      fieldsCount: 'formFields.length',
    },
    prepare({ title, layout, fieldsCount }) {
      return {
        title: title || 'Formulaire de contact',
        subtitle: `${layout} • ${fieldsCount || 0} champs`,
        media: '📧',
      }
    },
  },
})
