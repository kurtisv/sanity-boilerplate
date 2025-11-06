import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'countdownBlock',
  title: 'Countdown Block',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Block Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'targetDate',
      title: 'Target Date & Time',
      type: 'datetime',
      validation: Rule => Rule.required(),
      description: 'The date and time when the countdown ends'
    }),
    defineField({
      name: 'labels',
      title: 'Custom Labels',
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
          { title: 'Colorful', value: 'colorful' },
          { title: 'Minimal', value: 'minimal' },
          { title: 'Neon', value: 'neon' }
        ]
      },
      initialValue: 'default',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Extra Large', value: 'xl' }
        ]
      },
      initialValue: 'medium',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'expirationMessage',
      title: 'Message After Expiration',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: Rule => Rule.max(100)
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: Rule => Rule.max(300)
        }),
        defineField({
          name: 'showButton',
          title: 'Show Action Button',
          type: 'boolean',
          initialValue: false
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          hidden: ({ parent }) => !parent?.showButton
        }),
        defineField({
          name: 'buttonLink',
          title: 'Button Link',
          type: 'url',
          hidden: ({ parent }) => !parent?.showButton
        })
      ]
    }),
    defineField({
      name: 'animations',
      title: 'Animation Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Animations',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'pulseOnUpdate',
          title: 'Pulse on Number Change',
          type: 'boolean',
          initialValue: true,
          hidden: ({ parent }) => !parent?.enabled
        }),
        defineField({
          name: 'flipAnimation',
          title: 'Flip Card Animation',
          type: 'boolean',
          initialValue: false,
          hidden: ({ parent }) => !parent?.enabled
        }),
        defineField({
          name: 'glowEffect',
          title: 'Glow Effect',
          type: 'boolean',
          initialValue: false,
          hidden: ({ parent }) => !parent?.enabled
        })
      ]
    }),
    defineField({
      name: 'customStyles',
      title: 'Custom Styles',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          description: 'Hex color code (e.g., #FF5733)'
        }),
        defineField({
          name: 'textColor',
          title: 'Text Color',
          type: 'string',
          description: 'Hex color code (e.g., #FFFFFF)'
        }),
        defineField({
          name: 'accentColor',
          title: 'Accent Color',
          type: 'string',
          description: 'Hex color code (e.g., #00BFFF)'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      targetDate: 'targetDate',
      theme: 'theme',
      size: 'size'
    },
    prepare({ title, targetDate, theme, size }) {
      const formattedDate = targetDate 
        ? new Date(targetDate).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        : 'No date set'
      
      return {
        title: title || 'Countdown Block',
        subtitle: `${formattedDate} • ${theme} theme • ${size} size`
      }
    }
  }
})