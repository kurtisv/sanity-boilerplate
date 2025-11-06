import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pricingBlock',
  title: 'Pricing Block',
  type: 'object',
  icon: () => '💰',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      validation: Rule => Rule.max(200),
      rows: 3
    }),
    defineField({
      name: 'billingPeriod',
      title: 'Billing Period',
      type: 'string',
      options: {
        list: [
          { title: 'Monthly', value: 'monthly' },
          { title: 'Annual', value: 'annual' },
          { title: 'Both', value: 'both' }
        ],
        layout: 'radio'
      },
      initialValue: 'monthly',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Plan Name',
              type: 'string',
              validation: Rule => Rule.required().max(50)
            }),
            defineField({
              name: 'description',
              title: 'Plan Description',
              type: 'text',
              validation: Rule => Rule.max(150),
              rows: 2
            }),
            defineField({
              name: 'monthlyPrice',
              title: 'Monthly Price',
              type: 'number',
              validation: Rule => Rule.required().min(0)
            }),
            defineField({
              name: 'annualPrice',
              title: 'Annual Price',
              type: 'number',
              validation: Rule => Rule.min(0)
            }),
            defineField({
              name: 'currency',
              title: 'Currency',
              type: 'string',
              initialValue: 'EUR',
              validation: Rule => Rule.required().max(3)
            }),
            defineField({
              name: 'isPopular',
              title: 'Popular Plan',
              type: 'boolean',
              initialValue: false
            }),
            defineField({
              name: 'popularBadgeText',
              title: 'Popular Badge Text',
              type: 'string',
              initialValue: 'Most Popular',
              validation: Rule => Rule.max(30),
              hidden: ({ parent }) => !parent?.isPopular
            }),
            defineField({
              name: 'badgeColor',
              title: 'Badge Color',
              type: 'string',
              description: 'Hex color code (e.g., #3B82F6)',
              initialValue: '#3B82F6',
              validation: Rule => Rule.regex(/^#[0-9A-F]{6}$/i, { name: 'hex color' }),
              hidden: ({ parent }) => !parent?.isPopular
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Feature Text',
                      type: 'string',
                      validation: Rule => Rule.required().max(100)
                    }),
                    defineField({
                      name: 'included',
                      title: 'Included',
                      type: 'boolean',
                      initialValue: true
                    }),
                    defineField({
                      name: 'highlight',
                      title: 'Highlight Feature',
                      type: 'boolean',
                      initialValue: false
                    })
                  ],
                  preview: {
                    select: {
                      title: 'text',
                      included: 'included',
                      highlight: 'highlight'
                    },
                    prepare({ title, included, highlight }) {
                      const status = included ? '✅' : '❌'
                      const highlightIcon = highlight ? '⭐' : ''
                      return {
                        title: title || 'Feature',
                        subtitle: `${status} ${highlightIcon}`.trim()
                      }
                    }
                  }
                }
              ],
              validation: Rule => Rule.required().min(1)
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
                  initialValue: 'Get Started',
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
                    ],
                    layout: 'radio'
                  },
                  initialValue: 'primary'
                })
              ],
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              initialValue: 1,
              validation: Rule => Rule.required().min(1)
            })
          ],
          preview: {
            select: {
              name: 'name',
              monthlyPrice: 'monthlyPrice',
              currency: 'currency',
              isPopular: 'isPopular'
            },
            prepare({ name, monthlyPrice, currency, isPopular }) {
              const popularIcon = isPopular ? '⭐' : ''
              return {
                title: name || 'Pricing Plan',
                subtitle: `${monthlyPrice || 0}${currency || 'EUR'}/month ${popularIcon}`.trim()
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1).max(6)
    }),
    defineField({
      name: 'showComparison',
      title: 'Show Feature Comparison',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'comparisonFeatures',
      title: 'Comparison Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              validation: Rule => Rule.required().max(50)
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.required().min(1)
            })
          ],
          preview: {
            select: {
              title: 'category',
              features: 'features'
            },
            prepare({ title, features }) {
              return {
                title: title || 'Feature Category',
                subtitle: `${features?.length || 0} features`
              }
            }
          }
        }
      ],
      hidden: ({ parent }) => !parent?.showComparison,
      validation: Rule => Rule.custom((value, context) => {
        const parent = context.parent as any
        if (parent?.showComparison && (!value || value.length === 0)) {
          return 'Comparison features are required when comparison is enabled'
        }
        return true
      })
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray-50' },
          { title: 'Dark', value: 'gray-900' }
        ],
        layout: 'radio'
      },
      initialValue: 'white'
    }),
    defineField({
      name: 'centerAlign',
      title: 'Center Align Content',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      plansCount: 'plans.length'
    },
    prepare({ title, plansCount }) {
      return {
        title: title || 'Pricing Block',
        subtitle: `${plansCount || 0} pricing plans`
      }
    }
  }
})