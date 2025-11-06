import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Auteur',
  type: 'document',
  description: 'Auteurs des articles de blog',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      description: 'Nom et prénom de l\'auteur',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: 'Photo de profil de l\'auteur',
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
      ],
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
      description: 'Titre ou fonction de l\'auteur',
      validation: (Rule) => Rule.max(100),
      placeholder: 'Ex: Rédacteur en chef, Développeur, Designer',
    }),
    defineField({
      name: 'bio',
      title: 'Biographie',
      type: 'text',
      description: 'Courte biographie de l\'auteur',
      rows: 4,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Réseaux sociaux',
      type: 'object',
      description: 'Liens vers les profils sociaux de l\'auteur',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
          description: 'URL du profil Twitter',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'URL du profil LinkedIn',
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
          description: 'URL du profil GitHub',
        },
        {
          name: 'website',
          title: 'Site web',
          type: 'url',
          description: 'URL du site web personnel',
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Auteur en vedette',
      type: 'boolean',
      description: 'Afficher cet auteur sur la page d\'équipe',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Auteur sans nom',
        subtitle: subtitle || 'Aucun rôle',
        media,
      }
    },
  },
})
