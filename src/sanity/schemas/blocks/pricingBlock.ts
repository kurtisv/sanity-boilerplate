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
      title: 'Default Billing Period',
      type: 'string',
      options: {
        list: [
          { title: 'Monthly', value: 'monthly' },
          { title: 'Annual', value: 'annual' }
        ],
        layout: 'radio'
      },
      initialValue: 'monthly'
    }),
    defineField({
      name: 'showBillingToggle',
      title: 'Show Billing Period Toggle',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        {
          type: 'object',
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
              validation: Rule => Rule.max(200)
            },
            {
              name: 'monthlyPrice',
              title: 'Monthly Price',
              type: 'string',
              validation: Rule => Rule.required().max(20)
            },
            {
              name: 'annualPrice',
              title: 'Annual Price',
              type: 'string',
              validation: Rule => Rule.max(20)
            },
            {
              name: 'currency',
              title: 'Currency Symbol',
              type: 'string',
              initialValue: '$',
              validation: Rule => Rule.max(5)
            },
            {
              name: 'isPopular',
              title: 'Mark as Popular',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'popularBadgeText',
              title: 'Popular Badge Text',
              type: 'string',
              initialValue: 'Most Popular',
              validation: Rule => Rule.max(20)
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'feature',
                      title: 'Feature',
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
                      title: 'feature',
                      included: 'included',
                      highlight: 'highlight'
                    },
                    prepare({ title, included, highlight }) {
                      const status = included ? '✓' : '✗'
                      const highlightIcon = highlight ? '⭐' : ''
                      return {
                        title: `${status} ${title} ${highlightIcon}`,
                        subtitle: included ? 'Included' : 'Not included'
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
                    ]
                  },
                  initialValue: 'primary'
                }
              ]
            },
            {
              name: 'accentColor',
              title: 'Accent Color',
              type: 'string',
              description: 'Hex color code (e.g., #3B82F6)',
              validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                name: 'hex',
                invert: false
              })
            }
          ],
          preview: {
            select: {
              title: 'name',
              monthlyPrice: 'monthlyPrice',
              currency: 'currency',
              isPopular: 'isPopular'
            },
            prepare({ title, monthlyPrice, currency, isPopular }) {
              const popularBadge = isPopular ? '⭐' : ''
              return {
                title: `${title} ${popularBadge}`,
                subtitle: `${currency || '$'}${monthlyPrice || '0'}/month`
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1).max(6)
    }),
    defineField({
      name: 'showComparison',
      title: 'Show Feature Comparison Table',
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
            {
              name: 'category',
              title: 'Feature Category',
              type: 'string',
              validation: Rule => Rule.required().max(50)
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'string'
                }
              ]
            }
          ]
        }
      ],
      hidden: ({ parent }) => !parent?.showComparison
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Gray Light', value: 'gray' },
          { title: 'Blue Light', value: 'blue' },
          { title: 'Custom', value: 'custom' }
        ]
      },
      initialValue: 'white'
    }),
    defineField({
      name: 'customBackgroundColor',
      title: 'Custom Background Color',
      type: 'string',
      description: 'Hex color code',
      hidden: ({ parent }) => parent?.backgroundColor !== 'custom'
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