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
      validation: Rule => Rule.max(100)
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
      title: 'Labels',
      type: 'object',
      fields: [
        {
          name: 'days',
          title: 'Days Label',
          type: 'string',
          initialValue: 'Days'
        },
        {
          name: 'hours',
          title: 'Hours Label',
          type: 'string',
          initialValue: 'Hours'
        },
        {
          name: 'minutes',
          title: 'Minutes Label',
          type: 'string',
          initialValue: 'Minutes'
        },
        {
          name: 'seconds',
          title: 'Seconds Label',
          type: 'string',
          initialValue: 'Seconds'
        }
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
          { title: 'Bold', value: 'bold' }
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
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'string',
      description: 'Hex color code (e.g., #3B82F6)',
      initialValue: '#3B82F6'
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Color',
      type: 'string',
      description: 'Hex color code (e.g., #1E40AF)',
      initialValue: '#1E40AF'
    }),
    defineField({
      name: 'expiredMessage',
      title: 'Message After Expiration',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Expired Title',
          type: 'string',
          initialValue: 'Time\'s Up!',
          validation: Rule => Rule.max(100)
        },
        {
          name: 'description',
          title: 'Expired Description',
          type: 'text',
          initialValue: 'The countdown has ended.',
          validation: Rule => Rule.max(300)
        }
      ]
    }),
    defineField({
      name: 'animation',
      title: 'Animation Style',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Fade In', value: 'fadeIn' },
          { title: 'Slide Up', value: 'slideUp' },
          { title: 'Bounce', value: 'bounce' },
          { title: 'Pulse', value: 'pulse' },
          { title: 'Flip', value: 'flip' }
        ],
        layout: 'dropdown'
      },
      initialValue: 'fadeIn'
    }),
    defineField({
      name: 'showSeparators',
      title: 'Show Separators',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'displayFormat',
      title: 'Display Format',
      type: 'string',
      options: {
        list: [
          { title: 'Boxes', value: 'boxes' },
          { title: 'Digital', value: 'digital' },
          { title: 'Circles', value: 'circles' },
          { title: 'Simple', value: 'simple' }
        ],
        layout: 'radio'
      },
      initialValue: 'boxes'
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
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