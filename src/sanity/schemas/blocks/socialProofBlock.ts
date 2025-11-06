import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'socialProofBlock',
  title: 'Social Proof Block',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.max(300)
    }),
    defineField({
      name: 'clientLogos',
      title: 'Client Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Client Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'image',
              title: 'Logo Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'url',
              title: 'Client URL',
              type: 'url'
            })
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image'
            }
          }
        }
      ],
      validation: Rule => Rule.max(20)
    }),
    defineField({
      name: 'keyStats',
      title: 'Key Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Users', value: 'users' },
                  { title: 'Star', value: 'star' },
                  { title: 'Trophy', value: 'trophy' },
                  { title: 'Chart', value: 'chart' },
                  { title: 'Globe', value: 'globe' },
                  { title: 'Heart', value: 'heart' },
                  { title: 'Shield', value: 'shield' },
                  { title: 'Zap', value: 'zap' }
                ]
              }
            })
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'number'
            }
          }
        }
      ],
      validation: Rule => Rule.max(6)
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              validation: Rule => Rule.required().max(300)
            }),
            defineField({
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'photo',
              title: 'Author Photo',
              type: 'image',
              options: {
                hotspot: true
              }
            }),
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string'
            }),
            defineField({
              name: 'rating',
              title: 'Rating (1-5 stars)',
              type: 'number',
              validation: Rule => Rule.required().min(1).max(5)
            })
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'company',
              media: 'photo'
            }
          }
        }
      ],
      validation: Rule => Rule.max(10)
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Logos Only', value: 'logos-only' },
          { title: 'Stats Only', value: 'stats-only' },
          { title: 'Testimonials Only', value: 'testimonials-only' },
          { title: 'Combined', value: 'combined' }
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 'combined'
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
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 'cards'
    }),
    defineField({
      name: 'enableAnimations',
      title: 'Enable Animations',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      style: 'style'
    },
    prepare({ title, layout, style }) {
      return {
        title: title || 'Social Proof Block',
        subtitle: `${layout} - ${style}`
      }
    }
  }
})