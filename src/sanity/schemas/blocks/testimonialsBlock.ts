import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonialsBlock',
  title: 'Testimonials Block',
  type: 'object',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      initialValue: 'grid',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'List', value: 'list' }
        ],
        layout: 'radio'
      }
    }),
    defineField({
      name: 'gridColumns',
      title: 'Grid Columns',
      type: 'string',
      initialValue: '3',
      options: {
        list: [
          { title: '1 Column', value: '1' },
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' }
        ]
      },
      hidden: ({ parent }) => parent?.layout !== 'grid'
    }),
    defineField({
      name: 'enableFiltering',
      title: 'Enable Filtering',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'filterOptions',
      title: 'Filter Options',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }) => !parent?.enableFiltering,
      description: 'Tags for filtering testimonials (e.g., "service", "industry", "product")'
    }),
    defineField({
      name: 'showRatings',
      title: 'Show Star Ratings',
      type: 'boolean',
      initialValue: true
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
              validation: Rule => Rule.required().max(500)
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: Rule => Rule.required().max(100)
            },
            {
              name: 'authorPhoto',
              title: 'Author Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'position',
              title: 'Position/Title',
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
              name: 'companyLogo',
              title: 'Company Logo',
              type: 'image'
            },
            {
              name: 'rating',
              title: 'Star Rating',
              type: 'number',
              validation: Rule => Rule.min(1).max(5),
              initialValue: 5
            },
            {
              name: 'featured',
              title: 'Featured Testimonial',
              type: 'boolean',
              initialValue: false,
              description: 'Featured testimonials appear prominently'
            },
            {
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Tags for filtering (must match filter options above)'
            },
            {
              name: 'date',
              title: 'Testimonial Date',
              type: 'date'
            }
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'company',
              media: 'authorPhoto',
              quote: 'quote',
              rating: 'rating'
            },
            prepare({ title, subtitle, media, quote, rating }) {
              const stars = '⭐'.repeat(rating || 5)
              return {
                title: title || 'Anonymous',
                subtitle: `${subtitle || 'Unknown Company'} - ${stars}`,
                media,
                description: quote ? `"${quote.substring(0, 100)}..."` : undefined
              }
            }
          }
        }
      ],
      validation: Rule => Rule.min(1)
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: 'white',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Gray 50', value: 'gray-50' },
          { title: 'Gray 100', value: 'gray-100' },
          { title: 'Blue 50', value: 'blue-50' },
          { title: 'Indigo 50', value: 'indigo-50' }
        ]
      }
    }),
    defineField({
      name: 'padding',
      title: 'Section Padding',
      type: 'string',
      initialValue: 'normal',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Normal', value: 'normal' },
          { title: 'Large', value: 'large' }
        ]
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      testimonials: 'testimonials',
      layout: 'layout'
    },
    prepare({ title, testimonials, layout }) {
      const count = testimonials?.length || 0
      return {
        title: title || 'Testimonials Block',
        subtitle: `${count} testimonial${count !== 1 ? 's' : ''} - ${layout || 'grid'} layout`
      }
    }
  }
})