import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryBlock',
  title: 'Gallery Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Titre principal de la galerie',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description de la galerie',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'layout',
      title: 'Mise en page',
      type: 'string',
      description: 'Style d\'affichage de la galerie',
      options: {
        list: [
          { title: 'Grille classique', value: 'grid' },
          { title: 'Masonry (Pinterest)', value: 'masonry' },
          { title: 'Carrousel', value: 'carousel' },
          { title: 'Mosaïque', value: 'mosaic' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Collection d\'images pour la galerie',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
              description: 'Description de l\'image pour l\'accessibilité',
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: 'caption',
              title: 'Légende',
              type: 'string',
              description: 'Légende affichée sous l\'image',
              validation: (Rule) => Rule.max(200),
            }),
            defineField({
              name: 'category',
              title: 'Catégorie',
              type: 'string',
              description: 'Catégorie pour le filtrage',
              validation: (Rule) => Rule.max(50),
            }),
            defineField({
              name: 'featured',
              title: 'Image mise en avant',
              type: 'boolean',
              description: 'Afficher cette image en plus grand',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'alt',
              subtitle: 'caption',
              media: 'image',
              featured: 'featured',
            },
            prepare({ title, subtitle, media, featured }) {
              return {
                title: title || 'Image sans titre',
                subtitle: `${subtitle || 'Pas de légende'}${featured ? ' • ⭐ Mise en avant' : ''}`,
                media: media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(50).error('Entre 1 et 50 images maximum'),
    }),
    defineField({
      name: 'gridSettings',
      title: 'Paramètres de grille',
      type: 'object',
      description: 'Configuration pour les layouts en grille',
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
              validation: (Rule) => Rule.min(1).max(6),
            }),
            defineField({
              name: 'tablet',
              title: 'Tablette',
              type: 'number',
              initialValue: 2,
              validation: (Rule) => Rule.min(1).max(4),
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
          name: 'aspectRatio',
          title: 'Ratio d\'aspect',
          type: 'string',
          options: {
            list: [
              { title: 'Carré (1:1)', value: '1:1' },
              { title: 'Paysage (4:3)', value: '4:3' },
              { title: 'Cinéma (16:9)', value: '16:9' },
              { title: 'Portrait (3:4)', value: '3:4' },
              { title: 'Naturel', value: 'auto' },
            ],
          },
          initialValue: '4:3',
        }),
        defineField({
          name: 'gap',
          title: 'Espacement',
          type: 'string',
          options: {
            list: [
              { title: 'Aucun', value: 'none' },
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
      description: 'Configuration pour le layout carrousel',
      fields: [
        defineField({
          name: 'autoplay',
          title: 'Lecture automatique',
          type: 'boolean',
          initialValue: false,
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
        defineField({
          name: 'slidesToShow',
          title: 'Images visibles',
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
      ],
      hidden: ({ parent }) => parent?.layout !== 'carousel',
    }),
    defineField({
      name: 'filterOptions',
      title: 'Options de filtrage',
      type: 'object',
      fields: [
        defineField({
          name: 'enableFilters',
          title: 'Activer les filtres',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'filterStyle',
          title: 'Style des filtres',
          type: 'string',
          options: {
            list: [
              { title: 'Boutons', value: 'buttons' },
              { title: 'Menu déroulant', value: 'dropdown' },
              { title: 'Tags', value: 'tags' },
            ],
          },
          initialValue: 'buttons',
          hidden: ({ parent }) => !parent?.enableFilters,
        }),
        defineField({
          name: 'showAllOption',
          title: 'Afficher "Tout"',
          type: 'boolean',
          initialValue: true,
          hidden: ({ parent }) => !parent?.enableFilters,
        }),
      ],
    }),
    defineField({
      name: 'lightboxOptions',
      title: 'Options lightbox',
      type: 'object',
      fields: [
        defineField({
          name: 'enableLightbox',
          title: 'Activer la lightbox',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showCaptions',
          title: 'Afficher les légendes',
          type: 'boolean',
          initialValue: true,
          hidden: ({ parent }) => !parent?.enableLightbox,
        }),
        defineField({
          name: 'showCounter',
          title: 'Afficher le compteur',
          type: 'boolean',
          initialValue: true,
          hidden: ({ parent }) => !parent?.enableLightbox,
        }),
        defineField({
          name: 'enableZoom',
          title: 'Activer le zoom',
          type: 'boolean',
          initialValue: true,
          hidden: ({ parent }) => !parent?.enableLightbox,
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
        defineField({
          name: 'borderRadius',
          title: 'Arrondi des images',
          type: 'string',
          options: {
            list: [
              { title: 'Aucun', value: 'none' },
              { title: 'Léger', value: 'small' },
              { title: 'Moyen', value: 'medium' },
              { title: 'Fort', value: 'large' },
              { title: 'Rond', value: 'full' },
            ],
          },
          initialValue: 'medium',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      imagesCount: 'images.length',
      media: 'images.0.image',
    },
    prepare({ title, layout, imagesCount, media }) {
      return {
        title: title || 'Galerie d\'images',
        subtitle: `${layout} • ${imagesCount || 0} images`,
        media: media || '🖼️',
      }
    },
  },
})
