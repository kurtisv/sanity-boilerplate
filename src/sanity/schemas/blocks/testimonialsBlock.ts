import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonialsBlock',
  title: 'Testimonials Block',
  type: 'document',
  icon: () => '⭐',
  fields: [
    defineField({
      name: 'title',
      title: 'Block Title',
      type: 'string',
      validation: Rule => Rule.required().max(60),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'List', value: 'list' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'enableFiltering',
      title: 'Enable Category Filtering',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'categories',
      title: 'Filter Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'slug',
              title: 'Category Slug',
              type: 'slug',
              options: { source: 'name' },
              validation: Rule => Rule.required(),
            },
          ],
        },
      ],
      hidden: ({ document }) => !document?.enableFiltering,
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              validation: Rule => Rule.required().max(500),
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: Rule => Rule.required().max(50),
            },
            {
              name: 'authorTitle',
              title: 'Author Title/Position',
              type: 'string',
              validation: Rule => Rule.max(100),
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: Rule => Rule.max(100),
            },
            {
              name: 'photo',
              title: 'Author Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'rating',
              title: 'Rating (1-5 stars)',
              type: 'number',
              validation: Rule => Rule.required().min(1).max(5).integer(),
              options: {
                list: [
                  { title: '1 Star', value: 1 },
                  { title: '2 Stars', value: 2 },
                  { title: '3 Stars', value: 3 },
                  { title: '4 Stars', value: 4 },
                  { title: '5 Stars', value: 5 },
                ],
              },
            },
            {
              name: 'featured',
              title: 'Featured Testimonial',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: ({ document }) => {
                  const categories = document?.categories || []
                  return categories.map(cat => ({
                    title: cat.name,
                    value: cat.slug?.current || cat.name,
                  }))
                },
              },
              hidden: ({ document }) => !document?.enableFiltering,
            },
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'company',
              media: 'photo',
              rating: 'rating',
              featured: 'featured',
            },
            prepare({ title, subtitle, media, rating, featured }) {
              return {
                title: `${title}${featured ? ' ⭐ Featured' : ''}`,
                subtitle: `${subtitle ? `${subtitle} • ` : ''}${rating}/5 stars`,
                media,
              }
            },
          },
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'settings',
      title: 'Display Settings',
      type: 'object',
      fields: [
        {
          name: 'showOnlyFeatured',
          title: 'Show Only Featured Testimonials',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'maxItems',
          title: 'Maximum Items to Show',
          type: 'number',
          validation: Rule => Rule.min(1).max(20),
          initialValue: 6,
        },
        {
          name: 'autoplay',
          title: 'Autoplay Carousel',
          type: 'boolean',
          initialValue: true,
          hidden: ({ document }) => document?.layout !== 'carousel',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      testimonialCount: 'testimonials',
    },
    prepare({ title, layout, testimonialCount }) {
      const count = testimonialCount?.length || 0
      return {
        title: title || 'Testimonials Block',
        subtitle: `${count} testimonial${count !== 1 ? 's' : ''} • ${layout} layout`,
      }
    },
  },
})