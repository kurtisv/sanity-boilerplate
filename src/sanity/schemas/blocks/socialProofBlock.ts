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
      type: 'string',
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
              type: 'image',
              validation: Rule => Rule.required()
            },
            {
              name: 'companyName',
              title: 'Company Name',
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
              title: 'companyName',
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
              validation: Rule => Rule.required().max(20)
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required().max(50)
            },
            {
              name: 'suffix',
              title: 'Suffix (e.g., +, %, M)',
              type: 'string',
              validation: Rule => Rule.max(5)
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: Rule => Rule.max(150)
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'number'
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Statistic',
                subtitle: subtitle ? `${subtitle}` : 'No number'
              }
            }
          }
        }
      ],
      validation: Rule => Rule.max(4)
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
              validation: Rule => Rule.required().max(200)
            },
            {
              name: 'authorName',
              title: 'Author Name',
              type: 'string',
              validation: Rule => Rule.required().max(50)
            },
            {
              name: 'authorTitle',
              title: 'Author Title',
              type: 'string',
              validation: Rule => Rule.max(50)
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: Rule => Rule.max(50)
            },
            {
              name: 'avatar',
              title: 'Avatar',
              type: 'image'
            },
            {
              name: 'rating',
              title: 'Rating (1-5)',
              type: 'number',
              validation: Rule => Rule.min(1).max(5)
            }
          ],
          preview: {
            select: {
              title: 'authorName',
              subtitle: 'company',
              media: 'avatar'
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Anonymous',
                subtitle: subtitle || 'No company'
              }
            }
          }
        }
      ],
      validation: Rule => Rule.max(6)
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code (e.g., #ffffff)',
      validation: Rule => Rule.regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color')
    }),
    defineField({
      name: 'textAlign',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' }
        ],
        layout: 'radio'
      },
      initialValue: 'center'
    }),
    defineField({
      name: 'showLogos',
      title: 'Show Client Logos',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'showStats',
      title: 'Show Statistics',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'showTestimonials',
      title: 'Show Testimonials',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout'
    },
    prepare({ title, layout }) {
      return {
        title: title || 'Social Proof Block',
        subtitle: layout ? `Layout: ${layout}` : 'Social proof section'
      }
    }
  }
})