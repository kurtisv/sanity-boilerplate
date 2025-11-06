import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Catégorie',
  type: 'document',
  description: 'Catégories pour les articles de blog',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Nom de la catégorie',
      validation: (Rule) => Rule.required().max(50),
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
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description de la catégorie',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'color',
      title: 'Couleur',
      type: 'string',
      description: 'Couleur associée à la catégorie (HEX)',
      options: {
        list: [
          { title: 'Bleu', value: '#3b82f6' },
          { title: 'Vert', value: '#10b981' },
          { title: 'Rouge', value: '#ef4444' },
          { title: 'Jaune', value: '#eab308' },
          { title: 'Violet', value: '#8b5cf6' },
          { title: 'Rose', value: '#ec4899' },
          { title: 'Orange', value: '#f97316' },
          { title: 'Teal', value: '#14b8a6' },
          { title: 'Indigo', value: '#6366f1' },
          { title: 'Gris', value: '#64748b' },
        ],
      },
      initialValue: '#3b82f6',
    }),
    defineField({
      name: 'icon',
      title: 'Icône',
      type: 'string',
      description: 'Emoji ou nom d\'icône Lucide',
      placeholder: 'Ex: 📝, 💻, 🎨',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'featured',
      title: 'Catégorie en vedette',
      type: 'boolean',
      description: 'Afficher cette catégorie en priorité',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Ordre d\'affichage (plus petit = premier)',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      icon: 'icon',
    },
    prepare({ title, subtitle, icon }) {
      return {
        title: `${icon || '📁'} ${title || 'Catégorie sans titre'}`,
        subtitle: subtitle || 'Aucune description',
      }
    },
  },
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Titre (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
