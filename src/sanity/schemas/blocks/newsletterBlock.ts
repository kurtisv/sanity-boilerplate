import { defineType, defineField } from 'sanity'
import { getThemeFields } from '../shared/themeFields'

export default defineType({
  name: 'newsletterBlock',
  title: 'Newsletter Block',
  type: 'object',
  description: 'Formulaire d\'inscription à la newsletter',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Titre principal du formulaire',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description ou message d\'incitation',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      description: 'Style d\'affichage du formulaire',
      options: {
        list: [
          { title: 'Centré', value: 'centered' },
          { title: 'Inline (horizontal)', value: 'inline' },
          { title: 'Split (texte à gauche)', value: 'split-left' },
          { title: 'Split (texte à droite)', value: 'split-right' },
          { title: 'Avec image', value: 'with-image' },
          { title: 'Bannière', value: 'banner' },
          { title: 'Popup', value: 'popup' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'centered',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Image d\'accompagnement (pour layouts split et with-image)',
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
      name: 'formFields',
      title: 'Champs du formulaire',
      type: 'array',
      description: 'Champs à afficher dans le formulaire',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'fieldType',
              title: 'Type de champ',
              type: 'string',
              options: {
                list: [
                  { title: '📧 Email', value: 'email' },
                  { title: '👤 Prénom', value: 'firstName' },
                  { title: '👤 Nom', value: 'lastName' },
                  { title: '🏢 Entreprise', value: 'company' },
                  { title: '📞 Téléphone', value: 'phone' },
                  { title: '⚙️ Champ personnalisé', value: 'custom' },
                ],
                layout: 'dropdown',
              },
              initialValue: 'email',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.max(50),
            },
            {
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
              validation: (Rule) => Rule.max(100),
            },
            {
              name: 'required',
              title: 'Obligatoire',
              type: 'boolean',
              initialValue: true,
            },
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
              }
            },
          },
        },
      ],
      initialValue: [
        {
          fieldType: 'email',
          label: 'Adresse email',
          placeholder: 'votre@email.com',
          required: true,
        },
      ],
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'submitButton',
      title: 'Bouton d\'inscription',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Texte du bouton',
          type: 'string',
          initialValue: 'S\'inscrire',
          validation: (Rule) => Rule.required().max(50),
        },
        {
          name: 'loadingText',
          title: 'Texte pendant l\'envoi',
          type: 'string',
          initialValue: 'Inscription...',
          validation: (Rule) => Rule.max(50),
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
        {
          name: 'size',
          title: 'Taille',
          type: 'string',
          options: {
            list: [
              { title: 'Petit', value: 'sm' },
              { title: 'Moyen', value: 'md' },
              { title: 'Grand', value: 'lg' },
            ],
          },
          initialValue: 'md',
        },
      ],
    }),
    defineField({
      name: 'successMessage',
      title: 'Message de succès',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Merci pour votre inscription !',
          validation: (Rule) => Rule.required().max(100),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Vous recevrez bientôt notre prochaine newsletter.',
          validation: (Rule) => Rule.max(200),
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Avantages',
      type: 'array',
      description: 'Liste d\'avantages de l\'inscription (optionnel)',
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
                title: `${icon || '•'} ${text || 'Avantage'}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'privacyText',
      title: 'Texte de confidentialité',
      type: 'text',
      description: 'Texte sur la protection des données',
      rows: 2,
      initialValue: 'Nous respectons votre vie privée. Désabonnement possible à tout moment.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'privacyLink',
      title: 'Lien politique de confidentialité',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Activer',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'text',
          title: 'Texte du lien',
          type: 'string',
          initialValue: 'Politique de confidentialité',
          validation: (Rule) => Rule.max(50),
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'href',
          title: 'URL',
          type: 'string',
          initialValue: '/privacy',
          validation: (Rule) => Rule.required(),
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    }),
    defineField({
      name: 'provider',
      title: 'Fournisseur',
      type: 'object',
      description: 'Configuration du service de newsletter',
      fields: [
        {
          name: 'service',
          title: 'Service',
          type: 'string',
          options: {
            list: [
              { title: 'Mailchimp', value: 'mailchimp' },
              { title: 'ConvertKit', value: 'convertkit' },
              { title: 'Sendinblue', value: 'sendinblue' },
              { title: 'Mailjet', value: 'mailjet' },
              { title: 'SendGrid', value: 'sendgrid' },
              { title: 'Custom API', value: 'custom' },
            ],
          },
          initialValue: 'mailchimp',
        },
        {
          name: 'apiEndpoint',
          title: 'Endpoint API',
          type: 'url',
          description: 'URL de l\'endpoint d\'inscription',
        },
        {
          name: 'listId',
          title: 'ID de la liste',
          type: 'string',
          description: 'ID de la liste d\'abonnés',
        },
      ],
    }),
    defineField({
      name: 'popup',
      title: 'Configuration popup',
      type: 'object',
      description: 'Options pour le mode popup',
      fields: [
        {
          name: 'trigger',
          title: 'Déclencheur',
          type: 'string',
          options: {
            list: [
              { title: 'Au chargement', value: 'onload' },
              { title: 'Après délai', value: 'delay' },
              { title: 'Au scroll', value: 'scroll' },
              { title: 'Intention de sortie', value: 'exit-intent' },
              { title: 'Manuel', value: 'manual' },
            ],
          },
          initialValue: 'delay',
        },
        {
          name: 'delay',
          title: 'Délai (secondes)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(60),
          initialValue: 5,
          hidden: ({ parent }) => parent?.trigger !== 'delay',
        },
        {
          name: 'scrollPercent',
          title: 'Pourcentage de scroll',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
          initialValue: 50,
          hidden: ({ parent }) => parent?.trigger !== 'scroll',
        },
        {
          name: 'showOnce',
          title: 'Afficher une seule fois',
          type: 'boolean',
          description: 'Ne pas réafficher si déjà vu',
          initialValue: true,
        },
      ],
      hidden: ({ parent }) => parent?.layout !== 'popup',
    }),
    
    // Champs de thème unifiés
    ...getThemeFields(),
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      provider: 'provider.service',
    },
    prepare({ title, layout, provider }) {
      return {
        title: title || 'Inscription newsletter',
        subtitle: `${layout} • ${provider || 'mailchimp'}`,
      }
    },
  },
})
