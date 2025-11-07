import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonialsBlock',
  title: 'Testimonials Block',
  type: 'object',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'title',
      title: 'Block Title',
      type: 'string',
      validation: Rule => Rule.max(100)
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'List', value: 'list' }
        ],
        layout: 'radio'
      },
      initialValue: 'grid'
    }),
    defineField({
      name: 'showFilters',
      title: 'Show Category Filters',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'categories',
      title: 'Testimonial Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: Rule => Rule.required().max(50)
            },
            {
              name: 'slug',
              title: 'Slug',
              type: 'string',
              validation: Rule => Rule.required().max(50)
            }
          ]
        }
      ],
      hidden: ({ parent }) => !parent?.showFilters
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              validation: Rule => Rule.required().max(500)
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: Rule => Rule.required().max(100)
            },
            {
              name: 'position',
              title: 'Position',
              type: 'string',
              validation: Rule => Rule.max(100)
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: Rule => Rule.max(100)
            },
            {
              name: 'photo',
              title: 'Author Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'rating',
              title: 'Rating (1-5 stars)',
              type: 'number',
              validation: Rule => Rule.required().min(1).max(5),
              initialValue: 5
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              validation: Rule => Rule.max(50)
            },
            {
              name: 'featured',
              title: 'Featured Testimonial',
              type: 'boolean',
              initialValue: false
            }
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'company',
              media: 'photo'
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Unnamed Author',
                subtitle: subtitle || 'No company',
                media
              }
            }
          }
        }
      ],
      validation: Rule => Rule.min(1)
    }),
    defineField({
      name: 'showAllButton',
      title: 'Show "View All" Button',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'maxVisible',
      title: 'Max Visible Testimonials',
      type: 'number',
      validation: Rule => Rule.min(1).max(20),
      initialValue: 6,
      description: 'Number of testimonials to show initially'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code (e.g., #f8f9fa)',
      validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Must be a valid hex color')
    })
  ],
  preview: {
    select: {
      title: 'title',
      testimonialCount: 'testimonials'
    },
    prepare({ title, testimonialCount }) {
      const count = testimonialCount?.length || 0
      return {
        title: title || 'Testimonials Block',
        subtitle: `${count} testimonial${count !== 1 ? 's' : ''}`
      }
    }
  }
})