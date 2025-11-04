import { defineType, defineField } from 'sanity'
import { getThemeFields } from '../shared/themeFields'

export default defineType({
  name: 'teamBlock',
  title: 'Team Block',
  type: 'object',
  description: 'Équipe et témoignages avec photos, réseaux sociaux et layouts variés',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Titre principal de la section équipe',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description de l\'équipe ou introduction',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'blockType',
      title: 'Type de bloc',
      type: 'string',
      description: 'Choisir entre équipe ou témoignages',
      options: {
        list: [
          { title: 'Équipe', value: 'team' },
          { title: 'Témoignages', value: 'testimonials' },
          { title: 'Mixte (Équipe + Témoignages)', value: 'mixed' },
        ],
      },
      initialValue: 'team',
    }),
    defineField({
      name: 'layout',
      title: 'Mise en page',
      type: 'string',
      description: 'Style d\'affichage des cartes',
      options: {
        list: [
          { title: 'Grille', value: 'grid' },
          { title: 'Carrousel', value: 'carousel' },
          { title: 'Liste', value: 'list' },
          { title: 'Héros + Grille', value: 'hero-grid' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Membres de l\'équipe',
      type: 'array',
      description: 'Liste des membres de l\'équipe',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom complet',
              type: 'string',
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: 'position',
              title: 'Poste',
              type: 'string',
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'imageUrl',
              title: 'URL de l\'image (alternative)',
              type: 'url',
              description: 'URL d\'une image externe (utilisée si aucune photo n\'est uploadée)',
            }),
            defineField({
              name: 'bio',
              title: 'Biographie',
              type: 'text',
              description: 'Courte biographie du membre',
              rows: 4,
              validation: (Rule) => Rule.max(500),
            }),
            defineField({
              name: 'skills',
              title: 'Compétences',
              type: 'array',
              description: 'Liste des compétences principales',
              of: [{ type: 'string' }],
              options: {
                layout: 'tags',
              },
            }),
            defineField({
              name: 'socialLinks',
              title: 'Réseaux sociaux',
              type: 'object',
              fields: [
                defineField({
                  name: 'linkedin',
                  title: 'LinkedIn',
                  type: 'url',
                }),
                defineField({
                  name: 'twitter',
                  title: 'Twitter',
                  type: 'url',
                }),
                defineField({
                  name: 'github',
                  title: 'GitHub',
                  type: 'url',
                }),
                defineField({
                  name: 'website',
                  title: 'Site web',
                  type: 'url',
                }),
                defineField({
                  name: 'email',
                  title: 'Email',
                  type: 'email',
                }),
              ],
            }),
            defineField({
              name: 'featured',
              title: 'Membre mis en avant',
              type: 'boolean',
              description: 'Afficher ce membre en plus grand',
              initialValue: false,
            }),
            defineField({
              name: 'order',
              title: 'Ordre d\'affichage',
              type: 'number',
              description: 'Ordre de tri (plus petit = premier)',
              initialValue: 0,
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'position',
              media: 'photo',
              featured: 'featured',
            },
            prepare({ title, subtitle, media, featured }) {
              return {
                title: title || 'Membre sans nom',
                subtitle: `${subtitle || 'Poste non défini'}${featured ? ' • ⭐ Mis en avant' : ''}`,
                media: media,
              }
            },
          },
        },
      ],
      hidden: ({ parent }) => parent?.blockType === 'testimonials',
    }),
    defineField({
      name: 'testimonials',
      title: 'Témoignages',
      type: 'array',
      description: 'Liste des témoignages clients',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'content',
              title: 'Contenu du témoignage',
              type: 'text',
              description: 'Le témoignage complet',
              rows: 4,
              validation: (Rule) => Rule.required().max(500),
            }),
            defineField({
              name: 'author',
              title: 'Auteur',
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Nom',
                  type: 'string',
                  validation: (Rule) => Rule.required().max(100),
                }),
                defineField({
                  name: 'position',
                  title: 'Poste',
                  type: 'string',
                  validation: (Rule) => Rule.max(100),
                }),
                defineField({
                  name: 'company',
                  title: 'Entreprise',
                  type: 'string',
                  validation: (Rule) => Rule.max(100),
                }),
                defineField({
                  name: 'photo',
                  title: 'Photo',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
              ],
            }),
            defineField({
              name: 'rating',
              title: 'Note (sur 5)',
              type: 'number',
              description: 'Note en étoiles de 1 à 5',
              validation: (Rule) => Rule.min(1).max(5),
              initialValue: 5,
            }),
            defineField({
              name: 'featured',
              title: 'Témoignage mis en avant',
              type: 'boolean',
              description: 'Afficher ce témoignage en plus grand',
              initialValue: false,
            }),
            defineField({
              name: 'date',
              title: 'Date',
              type: 'date',
              description: 'Date du témoignage',
            }),
          ],
          preview: {
            select: {
              content: 'content',
              authorName: 'author.name',
              company: 'author.company',
              rating: 'rating',
              featured: 'featured',
            },
            prepare({ content, authorName, company, rating, featured }) {
              const stars = '⭐'.repeat(rating || 5)
              return {
                title: `${content?.substring(0, 60)}...` || 'Témoignage',
                subtitle: `${authorName || 'Anonyme'}${company ? ` - ${company}` : ''} ${stars}${featured ? ' • Mis en avant' : ''}`,
                media: undefined,
              }
            },
          },
        },
      ],
      hidden: ({ parent }) => parent?.blockType === 'team',
    }),
    defineField({
      name: 'gridSettings',
      title: 'Paramètres de grille',
      type: 'object',
      fields: [
        defineField({
          name: 'columns',
          title: 'Nombre de colonnes',
          type: 'object',
          fields: [
            defineField({
              name: 'desktop',
              title: 'Desktop',
              type: 'number',
              initialValue: 3,
              validation: (Rule) => Rule.min(1).max(5),
            }),
            defineField({
              name: 'tablet',
              title: 'Tablette',
              type: 'number',
              initialValue: 2,
              validation: (Rule) => Rule.min(1).max(3),
            }),
            defineField({
              name: 'mobile',
              title: 'Mobile',
              type: 'number',
              initialValue: 1,
              validation: (Rule) => Rule.min(1).max(2),
            }),
          ],
        }),
        defineField({
          name: 'gap',
          title: 'Espacement',
          type: 'string',
          options: {
            list: [
              { title: 'Petit', value: 'small' },
              { title: 'Moyen', value: 'medium' },
              { title: 'Grand', value: 'large' },
            ],
          },
          initialValue: 'medium',
        }),
      ],
      hidden: ({ parent }) => parent?.layout === 'carousel',
    }),
    defineField({
      name: 'carouselSettings',
      title: 'Paramètres du carrousel',
      type: 'object',
      fields: [
        defineField({
          name: 'autoplay',
          title: 'Lecture automatique',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'autoplaySpeed',
          title: 'Vitesse (secondes)',
          type: 'number',
          initialValue: 5,
          validation: (Rule) => Rule.min(2).max(10),
          hidden: ({ parent }) => !parent?.autoplay,
        }),
        defineField({
          name: 'showDots',
          title: 'Afficher les points',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showArrows',
          title: 'Afficher les flèches',
          type: 'boolean',
          initialValue: true,
        }),
      ],
      hidden: ({ parent }) => parent?.layout !== 'carousel',
    }),
    defineField({
      name: 'cardStyle',
      title: 'Style des cartes',
      type: 'string',
      options: {
        list: [
          { title: 'Minimal', value: 'minimal' },
          { title: 'Avec bordure', value: 'bordered' },
          { title: 'Avec ombre', value: 'shadow' },
          { title: 'Coloré', value: 'colored' },
          { title: 'Effet verre', value: 'glass' },
        ],
      },
      initialValue: 'shadow',
    }),
    defineField({
      name: 'showSocialLinks',
      title: 'Afficher les réseaux sociaux',
      type: 'boolean',
      description: 'Afficher les liens vers les réseaux sociaux des membres',
      initialValue: true,
      hidden: ({ parent }) => parent?.blockType === 'testimonials',
    }),
    defineField({
      name: 'showSkills',
      title: 'Afficher les compétences',
      type: 'boolean',
      description: 'Afficher les compétences des membres',
      initialValue: true,
      hidden: ({ parent }) => parent?.blockType === 'testimonials',
    }),

    // Champs de thème unifiés
    ...getThemeFields(),
  ],
  preview: {
    select: {
      title: 'title',
      blockType: 'blockType',
      layout: 'layout',
      teamCount: 'teamMembers.length',
      testimonialsCount: 'testimonials.length',
    },
    prepare({ title, blockType, layout, teamCount, testimonialsCount }) {
      const count = blockType === 'team' ? teamCount : blockType === 'testimonials' ? testimonialsCount : (teamCount || 0) + (testimonialsCount || 0)
      const type = blockType === 'team' ? 'Équipe' : blockType === 'testimonials' ? 'Témoignages' : 'Mixte'
      
      return {
        title: title || `${type}`,
        subtitle: `${layout} • ${count || 0} éléments`,
        media: undefined,
      }
    },
  },
})
