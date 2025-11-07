import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'comparisonTableBlock',
  title: 'Comparison Table Block',
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
      rows: 3,
      validation: Rule => Rule.max(300)
    }),
    defineField({
      name: 'style',
      title: 'Table Style',
      type: 'string',
      options: {
        list: [
          { title: 'Minimal', value: 'minimal' },
          { title: 'Bordered', value: 'bordered' },
          { title: 'Striped', value: 'striped' },
          { title: 'Cards', value: 'cards' }
        ]
      },
      initialValue: 'bordered',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mobileLayout',
      title: 'Mobile Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Horizontal Scroll', value: 'scroll' },
          { title: 'Stacked Cards', value: 'stacked' }
        ]
      },
      initialValue: 'scroll',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'columns',
      title: 'Comparison Columns',
      type: 'array',
      initialValue: [],
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Product/Service Name',
              type: 'string',
              validation: Rule => Rule.required().max(50)
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              validation: Rule => Rule.max(30)
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: Rule => Rule.max(200)
            }),
            defineField({
              name: 'featured',
              title: 'Featured/Recommended',
              type: 'boolean',
              initialValue: false
            }),
            defineField({
              name: 'ctaButton',
              title: 'CTA Button',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  validation: Rule => Rule.required().max(30)
                }),
                defineField({
                  name: 'url',
                  title: 'Button URL',
                  type: 'url',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'style',
                  title: 'Button Style',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Primary', value: 'primary' },
                      { title: 'Secondary', value: 'secondary' },
                      { title: 'Outline', value: 'outline' }
                    ]
                  },
                  initialValue: 'primary'
                })
              ]
            })
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
              featured: 'featured'
            },
            prepare({ title, subtitle, featured }) {
              return {
                title: featured ? `⭐ ${title}` : title,
                subtitle: subtitle || 'No price set'
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(2).max(5)
    }),
    defineField({
      name: 'features',
      title: 'Feature Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'featureName',
              title: 'Feature Name',
              type: 'string',
              validation: Rule => Rule.required().max(80)
            }),
            defineField({
              name: 'values',
              title: 'Values per Column',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'type',
                      title: 'Value Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Text', value: 'text' },
                          { title: 'Boolean (Check/Cross)', value: 'boolean' },
                          { title: 'Not Available', value: 'na' }
                        ]
                      },
                      initialValue: 'text',
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      name: 'textValue',
                      title: 'Text Value',
                      type: 'string',
                      validation: Rule => Rule.max(100),
                      hidden: ({ parent }) => parent?.type !== 'text'
                    }),
                    defineField({
                      name: 'booleanValue',
                      title: 'Boolean Value',
                      type: 'boolean',
                      initialValue: false,
                      hidden: ({ parent }) => parent?.type !== 'boolean'
                    })
                  ],
                  preview: {
                    select: {
                      type: 'type',
                      textValue: 'textValue',
                      booleanValue: 'booleanValue'
                    },
                    prepare({ type, textValue, booleanValue }) {
                      if (type === 'text') return { title: textValue || 'Empty text' }
                      if (type === 'boolean') return { title: booleanValue ? '✅ Yes' : '❌ No' }
                      return { title: 'N/A' }
                    }
                  }
                }
              ],
              validation: Rule => Rule.required()
            })
          ],
          preview: {
            select: {
              title: 'featureName',
              values: 'values'
            },
            prepare({ title, values }) {
              return {
                title,
                subtitle: `${(values?.length || 0)} values`
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1).max(20)
    })
  ],
  preview: {
    select: {
      title: 'title',
      columns: 'columns',
      features: 'features'
    },
    prepare({ title, columns, features }) {
      return {
        title: title || 'Comparison Table',
        subtitle: `${(columns?.length || 0)} columns, ${(features?.length || 0)} features`
      }
    }
  }
})