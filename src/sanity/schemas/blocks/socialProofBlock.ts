import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'socialProofBlock',
  title: 'Social Proof Block',
  type: 'object',
  icon: () => '⭐',
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
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Minimal', value: 'minimal' },
          { title: 'Cards', value: 'cards' },
          { title: 'Carousel', value: 'carousel' }
        ],
        layout: 'radio'
      },
      initialValue: 'minimal'
    }),
    defineField({
      name: 'enableAnimations',
      title: 'Enable Animations',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'clientLogos',
      title: 'Client Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'logo',
              title: 'Logo',
              type: 'image'
            },
            {
              name: 'clientName',
              title: 'Client Name',
              type: 'string',
              validation: Rule => Rule.required().max(50)
            },
            {
              name: 'website',
              title: 'Website URL',
              type: 'url'
            }
          ],
          preview: {
            select: {
              title: 'clientName',
              media: 'logo'
            }
          }
        }
      ],
      validation: Rule => Rule.max(12)
    }),
    defineField({
      name: 'keyStats',
      title: 'Key Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Number',
              type: 'string',
              description: 'e.g., "100+", "5M", "99%"',
              validation: Rule => Rule.required().max(20)
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required().max(50)
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: Rule => Rule.max(100)
            },
            {
              name: 'iconEmoji',
              title: 'Icon Emoji',
              type: 'string',
              description: 'Single emoji',
              validation: Rule => Rule.max(2)
            }
          ],
          preview: {
            select: {
              title: 'number',
              subtitle: 'label'
            }
          }
        }
      ],
      validation: Rule => Rule.max(6)
    }),
    defineField({
      name: 'testimonials',
      title: 'Short Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              validation: Rule => Rule.required().max(250)
            },
            {
              name: 'authorName',
              title: 'Author Name',
              type: 'string',
              validation: Rule => Rule.required().max(50)
            },
            {
              name: 'authorPosition',
              title: 'Author Position',
              type: 'string',
              validation: Rule => Rule.max(50)
            },
            {
              name: 'authorCompany',
              title: 'Author Company',
              type: 'string',
              validation: Rule => Rule.max(50)
            },
            {
              name: 'authorImage',
              title: 'Author Photo',
              type: 'image'
            },
            {
              name: 'rating',
              title: 'Star Rating',
              type: 'number',
              validation: Rule => Rule.min(1).max(5)
            }
          ],
          preview: {
            select: {
              title: 'authorName',
              subtitle: 'authorCompany',
              media: 'authorImage'
            }
          }
        }
      ],
      validation: Rule => Rule.max(8)
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code (e.g., #f9fafb)',
      validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Must be a valid hex color')
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          { title: 'Dark', value: 'dark' },
          { title: 'Light', value: 'light' }
        ]
      },
      initialValue: 'dark'
    })
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      statsCount: 'keyStats.length',
      testimonialsCount: 'testimonials.length'
    },
    prepare({ title, layout, statsCount = 0, testimonialsCount = 0 }) {
      return {
        title: title || 'Social Proof Block',
        subtitle: `${layout} • ${statsCount} stats • ${testimonialsCount} testimonials`
      }
    }
  }
})