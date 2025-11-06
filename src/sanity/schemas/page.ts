import { defineType, defineField } from 'sanity'
import { getPageStyleFields } from './shared/themeFields'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  description: 'Pages du site avec constructeur de blocs',
  groups: [
    {
      name: 'content',
      title: 'Contenu',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'style',
      title: 'Style de la page',
    },
    {
      name: 'advanced',
      title: 'Avancé',
    },
  ],
  fields: [
    // Onglet Contenu
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Constructeur de page',
      type: 'array',
      description: 'Ajoutez et organisez vos composants',
      of: [
        { type: 'textBlock' },
        { type: 'heroBlock' },
        { type: 'headerBlock' },
        { type: 'footerBlock' },
        { type: 'featureGridBlock' },
        { type: 'contactBlock' },
        { type: 'galleryBlock' },
        { type: 'teamBlock' },
        { type: 'statsBlock' },
        { type: 'blogBlock' },
        { type: 'pricingBlock' },
        { type: 'testimonialsBlock' },
        { type: 'ctaBlock' },
        { type: 'faqBlock' },
        { type: 'logoCloudBlock' },
        { type: 'videoBlock' },
        { type: 'accordionBlock' },
        { type: 'tabsBlock' },
        { type: 'newsletterBlock' },
        { type: 'logoGridBlock' },
      ],
      group: 'content',
    }),
    
    // Onglet Style de la page
    ...getPageStyleFields(),
    
    // Onglet SEO
    defineField({
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string',
      description: 'Titre affiché dans les résultats de recherche (60 caractères max)',
      validation: (Rule) => Rule.max(60),
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Description SEO',
      type: 'text',
      description: 'Description affichée dans les résultats de recherche (160 caractères max)',
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'Image SEO (Open Graph)',
      type: 'image',
      description: 'Image utilisée lors du partage sur les réseaux sociaux',
      group: 'seo',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'Mots-clés',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'seo',
    }),
    
    // Onglet Avancé
    defineField({
      name: 'customCss',
      title: 'CSS personnalisé',
      type: 'text',
      description: 'CSS spécifique à cette page',
      group: 'advanced',
    }),
    defineField({
      name: 'customJs',
      title: 'JavaScript personnalisé',
      type: 'text',
      description: 'Code JavaScript spécifique à cette page',
      group: 'advanced',
    }),
    defineField({
      name: 'noIndex',
      title: 'Ne pas indexer',
      type: 'boolean',
      description: 'Empêcher les moteurs de recherche d\'indexer cette page',
      initialValue: false,
      group: 'advanced',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      group: 'advanced',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `/${subtitle}`,
      }
    },
  },
})
