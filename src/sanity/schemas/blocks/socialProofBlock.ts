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
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width', value: 'fullWidth' },
          { title: 'Two Columns', value: 'twoColumns' },
          { title: 'Three Columns', value: 'threeColumns' }
        ],
        layout: 'radio'
      },
      initialValue: 'fullWidth'
    }),
    defineField({
      name: 'style',
      title: 'Style',
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
      ]
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
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: Rule => Rule.max(100)
            },
            {
              name: 'icon',
              title: 'Icon Emoji',
              type: 'string',
              validation: Rule => Rule.max(5)
            }
          ],
          preview: {
            select: {
              title: 'number',
              subtitle: 'label'
            }
          }
        }
      ]
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
              validation: Rule => Rule.required().max(300)
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
              validation: Rule => Rule.max(80)
            },
            {
              name: 'authorCompany',
              title: 'Author Company',
              type: 'string',
              validation: Rule => Rule.max(60)
            },
            {
              name: 'authorImage',
              title: 'Author Image',
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
              subtitle: 'authorCompany',
              media: 'authorImage'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code (e.g., #f8f9fa)',
      validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
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
    })
  ],
  preview: {
    select: {
      title: 'title',
      style: 'style',
      layout: 'layout'
    },
    prepare({ title, style, layout }) {
      return {
        title: title || 'Social Proof Block',
        subtitle: `${style || 'minimal'} - ${layout || 'fullWidth'}`
      }
    }
  }
})