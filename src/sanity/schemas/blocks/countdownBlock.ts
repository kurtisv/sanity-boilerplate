import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'countdownBlock',
  title: 'Countdown Block',
  type: 'object',
  icon: () => '⏰',
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
      name: 'targetDate',
      title: 'Target Date & Time',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'labels',
      title: 'Time Unit Labels',
      type: 'object',
      fields: [
        defineField({
          name: 'days',
          title: 'Days Label',
          type: 'string',
          initialValue: 'Days'
        }),
        defineField({
          name: 'hours',
          title: 'Hours Label',
          type: 'string',
          initialValue: 'Hours'
        }),
        defineField({
          name: 'minutes',
          title: 'Minutes Label',
          type: 'string',
          initialValue: 'Minutes'
        }),
        defineField({
          name: 'seconds',
          title: 'Seconds Label',
          type: 'string',
          initialValue: 'Seconds'
        })
      ]
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Dark', value: 'dark' },
          { title: 'Gradient', value: 'gradient' },
          { title: 'Minimal', value: 'minimal' },
          { title: 'Neon', value: 'neon' }
        ],
        layout: 'radio'
      },
      initialValue: 'default'
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra Large', value: 'xl' }
        ],
        layout: 'radio'
      },
      initialValue: 'md'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code (e.g., #ffffff)'
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Hex color code (e.g., #000000)'
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex color code for numbers and highlights (e.g., #ff6b6b)'
    }),
    defineField({
      name: 'animation',
      title: 'Animation Style',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Fade', value: 'fade' },
          { title: 'Scale', value: 'scale' },
          { title: 'Slide', value: 'slide' },
          { title: 'Bounce', value: 'bounce' },
          { title: 'Flip', value: 'flip' }
        ],
        layout: 'dropdown'
      },
      initialValue: 'fade'
    }),
    defineField({
      name: 'showSeparators',
      title: 'Show Separators (:)',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'expiredMessage',
      title: 'Expired Message',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Time\'s Up!'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'The countdown has ended.'
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string'
        }),
        defineField({
          name: 'buttonUrl',
          title: 'Button URL',
          type: 'url'
        })
      ]
    }),
    defineField({
      name: 'centerAlign',
      title: 'Center Align',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      targetDate: 'targetDate',
      theme: 'theme'
    },
    prepare({ title, targetDate, theme }) {
      const date = targetDate ? new Date(targetDate).toLocaleDateString() : 'No date set'
      return {
        title: title || 'Countdown Block',
        subtitle: `${theme || 'default'} theme • Target: ${date}`
      }
    }
  }
})