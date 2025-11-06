import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Article de blog',
  type: 'document',
  description: 'Articles de blog avec auteur, catégories et tags',
  groups: [
    {
      name: 'content',
      title: 'Contenu',
      default: true,
    },
    {
      name: 'meta',
      title: 'Métadonnées',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Contenu
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Titre de l\'article',
      validation: (Rule) => Rule.required().max(100),
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
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      description: 'Court résumé de l\'article (160 caractères max)',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'blockContent',
      description: 'Contenu principal de l\'article',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Légende',
          type: 'string',
        },
      ],
      group: 'content',
    }),
    
    // Métadonnées
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'meta',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
      group: 'meta',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Dernière mise à jour',
      type: 'datetime',
      group: 'meta',
    }),
    defineField({
      name: 'featured',
      title: 'Article en vedette',
      type: 'boolean',
      description: 'Mettre cet article en avant sur la page d\'accueil',
      initialValue: false,
      group: 'meta',
    }),
    defineField({
      name: 'readingTime',
      title: 'Temps de lecture (minutes)',
      type: 'number',
      description: 'Temps de lecture estimé en minutes',
      validation: (Rule) => Rule.min(1).max(120),
      group: 'meta',
    }),
    
    // SEO
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
      name: 'seoKeywords',
      title: 'Mots-clés SEO',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
      category: 'category.title',
    },
    prepare({ title, author, media, category }) {
      return {
        title: title || 'Article sans titre',
        subtitle: `${author || 'Auteur inconnu'} • ${category || 'Sans catégorie'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Date de publication (récent)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Date de publication (ancien)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Titre (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
