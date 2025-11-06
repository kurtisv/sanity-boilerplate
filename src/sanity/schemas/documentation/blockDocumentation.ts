import { defineType, defineField } from 'sanity'

/**
 * Documentation des blocs
 * 
 * Ce schéma contient la documentation détaillée de chaque bloc
 * pour aider les utilisateurs à comprendre leur utilité et usage.
 */
export default defineType({
  name: 'blockDocumentation',
  title: 'Documentation des Blocs',
  type: 'document',
  icon: () => '📚',
  fields: [
    defineField({
      name: 'blockType',
      title: 'Type de bloc',
      type: 'string',
      description: 'Nom technique du bloc',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          // Blocs de base
          { title: '📝 Bloc de texte (textBlock)', value: 'textBlock' },
          { title: '🦸 Bloc héro (heroBlock)', value: 'heroBlock' },
          { title: '🎯 Bloc header (headerBlock)', value: 'headerBlock' },
          { title: '🦶 Bloc footer (footerBlock)', value: 'footerBlock' },
          
          // Blocs de contenu
          { title: '⭐ Grille de fonctionnalités (featureGridBlock)', value: 'featureGridBlock' },
          { title: '📞 Bloc contact (contactBlock)', value: 'contactBlock' },
          { title: '🖼️ Galerie d\'images (galleryBlock)', value: 'galleryBlock' },
          { title: '👥 Bloc équipe (teamBlock)', value: 'teamBlock' },
          { title: '📊 Bloc statistiques (statsBlock)', value: 'statsBlock' },
          
          // Nouveaux blocs - Blog & Contenu
          { title: '📰 Bloc blog (blogBlock)', value: 'blogBlock' },
          { title: '📹 Bloc vidéo (videoBlock)', value: 'videoBlock' },
          { title: '🎵 Bloc accordéon (accordionBlock)', value: 'accordionBlock' },
          { title: '📑 Bloc onglets (tabsBlock)', value: 'tabsBlock' },
          
          // Nouveaux blocs - Marketing
          { title: '💰 Bloc tarifs (pricingBlock)', value: 'pricingBlock' },
          { title: '💬 Bloc témoignages (testimonialsBlock)', value: 'testimonialsBlock' },
          { title: '🎯 Bloc CTA (ctaBlock)', value: 'ctaBlock' },
          { title: '📧 Bloc newsletter (newsletterBlock)', value: 'newsletterBlock' },
          
          // Nouveaux blocs - Support & Autres
          { title: '❓ Bloc FAQ (faqBlock)', value: 'faqBlock' },
          { title: '🏢 Bloc logos (logoCloudBlock)', value: 'logoCloudBlock' },
        ],
      },
    }),
    
    defineField({
      name: 'title',
      title: 'Titre du bloc',
      type: 'string',
      description: 'Nom affiché du bloc',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description courte du bloc',
      validation: (Rule) => Rule.required().max(200),
    }),
    
    defineField({
      name: 'purpose',
      title: 'Utilité du bloc',
      type: 'array',
      description: 'À quoi sert ce bloc ? Quels sont ses objectifs ?',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Titre H3', value: 'h3' },
          ],
          lists: [
            { title: 'Puces', value: 'bullet' },
            { title: 'Numérotée', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'whenToUse',
      title: 'Quand l\'utiliser',
      type: 'array',
      description: 'Dans quelles situations utiliser ce bloc ?',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Titre H3', value: 'h3' },
          ],
          lists: [
            { title: 'Puces', value: 'bullet' },
            { title: 'Numérotée', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'howToUse',
      title: 'Comment l\'utiliser',
      type: 'array',
      description: 'Guide étape par étape pour utiliser ce bloc',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Titre H3', value: 'h3' },
          ],
          lists: [
            { title: 'Puces', value: 'bullet' },
            { title: 'Numérotée', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'bestPractices',
      title: 'Bonnes pratiques',
      type: 'array',
      description: 'Conseils et bonnes pratiques pour optimiser l\'utilisation',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Titre H3', value: 'h3' },
          ],
          lists: [
            { title: 'Puces', value: 'bullet' },
            { title: 'Numérotée', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
          },
        },
      ],
    }),
    
    defineField({
      name: 'examples',
      title: 'Exemples d\'utilisation',
      type: 'array',
      description: 'Exemples concrets d\'utilisation du bloc',
      of: [
        {
          type: 'object',
          name: 'example',
          title: 'Exemple',
          fields: [
            {
              name: 'title',
              title: 'Titre de l\'exemple',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'screenshot',
              title: 'Capture d\'écran (optionnel)',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Texte alternatif',
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              description: 'description',
              media: 'screenshot',
            },
          },
        },
      ],
    }),
    
    defineField({
      name: 'availableOptions',
      title: 'Options disponibles',
      type: 'array',
      description: 'Liste des options et paramètres configurables',
      of: [
        {
          type: 'object',
          name: 'option',
          title: 'Option',
          fields: [
            {
              name: 'name',
              title: 'Nom de l\'option',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'required',
              title: 'Obligatoire',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'defaultValue',
              title: 'Valeur par défaut',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
              required: 'required',
            },
            prepare({ title, subtitle, required }) {
              return {
                title: `${title}${required ? ' *' : ''}`,
                subtitle: subtitle,
              }
            },
          },
        },
      ],
    }),
    
    defineField({
      name: 'tips',
      title: 'Astuces et conseils',
      type: 'array',
      description: 'Astuces pour optimiser l\'utilisation du bloc',
      of: [
        {
          type: 'object',
          name: 'tip',
          title: 'Astuce',
          fields: [
            {
              name: 'type',
              title: 'Type d\'astuce',
              type: 'string',
              options: {
                list: [
                  { title: '💡 Conseil', value: 'tip' },
                  { title: '⚠️ Attention', value: 'warning' },
                  { title: '✅ Bonne pratique', value: 'best-practice' },
                  { title: '❌ À éviter', value: 'avoid' },
                ],
              },
              initialValue: 'tip',
            },
            {
              name: 'content',
              title: 'Contenu',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              type: 'type',
              content: 'content',
            },
            prepare({ type, content }) {
              const typeLabels = {
                tip: '💡 Conseil',
                warning: '⚠️ Attention',
                'best-practice': '✅ Bonne pratique',
                avoid: '❌ À éviter',
              }
              return {
                title: typeLabels[type as keyof typeof typeLabels] || type,
                subtitle: content?.substring(0, 60) + '...',
              }
            },
          },
        },
      ],
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      blockType: 'blockType',
      description: 'description',
    },
    prepare({ title, blockType, description }) {
      return {
        title: title,
        subtitle: `${blockType} - ${description?.substring(0, 50)}...`,
      }
    },
  },
})
