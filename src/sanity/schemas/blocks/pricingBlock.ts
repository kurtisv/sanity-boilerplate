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
      validation: Rule => Rule.max(200)
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
      initialValue: 'monthly'
    }),
    defineField({
      name: 'showComparison',
      title: 'Show Comparison Table',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'plan',
          title: 'Plan',
          fields: [
            {
              name: 'name',
              title: 'Plan Name',
              type: 'string',
              validation: Rule => Rule.required().max(50)
            },
            {
              name: 'description',
              title: 'Plan Description',
              type: 'text',
              validation: Rule => Rule.max(300)
            },
            {
              name: 'monthlyPrice',
              title: 'Monthly Price',
              type: 'number',
              validation: Rule => Rule.required().min(0)
            },
            {
              name: 'annualPrice',
              title: 'Annual Price',
              type: 'number',
              validation: Rule => Rule.min(0)
            },
            {
              name: 'currency',
              title: 'Currency',
              type: 'string',
              initialValue: 'EUR',
              validation: Rule => Rule.required().max(10)
            },
            {
              name: 'isPopular',
              title: 'Popular Plan',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'popularBadge',
              title: 'Popular Badge Text',
              type: 'string',
              validation: Rule => Rule.max(30),
              hidden: ({ parent }) => !parent?.isPopular
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'feature',
                  title: 'Feature',
                  fields: [
                    {
                      name: 'text',
                      title: 'Feature Text',
                      type: 'string',
                      validation: Rule => Rule.required().max(100)
                    },
                    {
                      name: 'included',
                      title: 'Included',
                      type: 'boolean',
                      initialValue: true
                    },
                    {
                      name: 'highlight',
                      title: 'Highlight Feature',
                      type: 'boolean',
                      initialValue: false
                    }
                  ],
                  preview: {
                    select: {
                      title: 'text',
                      included: 'included',
                      highlight: 'highlight'
                    },
                    prepare({ title, included, highlight }) {
                      return {
                        title: title || 'Feature',
                        subtitle: `${included ? '✅' : '❌'} ${highlight ? '⭐' : ''}`
                      }
                    }
                  }
                }
              ]
            },
            {
              name: 'ctaButton',
              title: 'CTA Button',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  validation: Rule => Rule.required().max(30)
                },
                {
                  name: 'url',
                  title: 'Button URL',
                  type: 'url'
                },
                {
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
                }
              ]
            }
          ],
          preview: {
            select: {
              name: 'name',
              monthlyPrice: 'monthlyPrice',
              currency: 'currency',
              isPopular: 'isPopular'
            },
            prepare({ name, monthlyPrice, currency, isPopular }) {
              return {
                title: name || 'Plan',
                subtitle: `${monthlyPrice || 0}${currency || 'EUR'}/month ${isPopular ? '⭐' : ''}`
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1).max(4)
    }),
    defineField({
      name: 'comparisonFeatures',
      title: 'Comparison Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'comparisonFeature',
          title: 'Comparison Feature',
          fields: [
            {
              name: 'name',
              title: 'Feature Name',
              type: 'string',
              validation: Rule => Rule.required().max(100)
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              validation: Rule => Rule.max(50)
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: Rule => Rule.max(200)
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'category'
            }
          }
        }
      ],
      hidden: ({ parent }) => !parent?.showComparison
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code (e.g., #ffffff)',
      validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer Text',
      type: 'text',
      validation: Rule => Rule.max(500)
    })
  ],
  preview: {
    select: {
      title: 'title',
      plans: 'plans'
    },
    prepare({ title, plans }) {
      const planCount = plans?.length || 0
      return {
        title: title || 'Pricing Block',
        subtitle: `${planCount} plan${planCount !== 1 ? 's' : ''}`
      }
    }
  }
})