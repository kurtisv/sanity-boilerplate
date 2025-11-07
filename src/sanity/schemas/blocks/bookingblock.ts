import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'bookingBlock',
  title: 'Booking Block',
  type: 'object',
  icon: () => '📅',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Book an Appointment',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.max(300)
    }),
    defineField({
      name: 'services',
      title: 'Available Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Service Name',
              type: 'string',
              validation: Rule => Rule.required().max(100)
            },
            {
              name: 'duration',
              title: 'Duration (minutes)',
              type: 'number',
              validation: Rule => Rule.required().min(15).max(480)
            },
            {
              name: 'price',
              title: 'Price',
              type: 'string',
              validation: Rule => Rule.max(20)
            },
            {
              name: 'description',
              title: 'Service Description',
              type: 'text',
              validation: Rule => Rule.max(200)
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'calendarIntegration',
      title: 'Calendar Integration',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Calendar Type',
          type: 'string',
          options: {
            list: [
              { title: 'Calendly', value: 'calendly' },
              { title: 'Google Calendar', value: 'google' },
              { title: 'Custom Form', value: 'custom' }
            ],
            layout: 'radio'
          },
          initialValue: 'custom'
        },
        {
          name: 'calendlyUrl',
          title: 'Calendly URL',
          type: 'url',
          hidden: ({ parent }) => parent?.type !== 'calendly'
        },
        {
          name: 'googleCalendarId',
          title: 'Google Calendar ID',
          type: 'string',
          hidden: ({ parent }) => parent?.type !== 'google'
        }
      ]
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  { title: 'Monday', value: 'monday' },
                  { title: 'Tuesday', value: 'tuesday' },
                  { title: 'Wednesday', value: 'wednesday' },
                  { title: 'Thursday', value: 'thursday' },
                  { title: 'Friday', value: 'friday' },
                  { title: 'Saturday', value: 'saturday' },
                  { title: 'Sunday', value: 'sunday' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'isOpen',
              title: 'Open',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'openTime',
              title: 'Opening Time',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'closeTime',
              title: 'Closing Time',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'formSettings',
      title: 'Form Settings',
      type: 'object',
      fields: [
        {
          name: 'requirePhone',
          title: 'Require Phone Number',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'allowNotes',
          title: 'Allow Notes Field',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'confirmationMessage',
          title: 'Confirmation Message',
          type: 'text',
          initialValue: 'Thank you! Your booking request has been received.',
          validation: Rule => Rule.max(300)
        }
      ]
    }),
    defineField({
      name: 'emailSettings',
      title: 'Email Settings',
      type: 'object',
      fields: [
        {
          name: 'notificationEmail',
          title: 'Notification Email',
          type: 'email',
          validation: Rule => Rule.required()
        },
        {
          name: 'emailSubject',
          title: 'Email Subject',
          type: 'string',
          initialValue: 'New Booking Request',
          validation: Rule => Rule.max(100)
        },
        {
          name: 'autoReply',
          title: 'Send Auto-Reply',
          type: 'boolean',
          initialValue: true
        }
      ]
    }),
    defineField({
      name: 'styling',
      title: 'Styling Options',
      type: 'object',
      fields: [
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          description: 'Hex color code (e.g., #ffffff)',
          validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        },
        {
          name: 'textColor',
          title: 'Text Color',
          type: 'string',
          description: 'Hex color code (e.g., #000000)',
          validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        },
        {
          name: 'buttonColor',
          title: 'Button Color',
          type: 'string',
          description: 'Hex color code (e.g., #3B82F6)',
          validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      serviceCount: 'services'
    },
    prepare({ title, serviceCount }) {
      const count = Array.isArray(serviceCount) ? serviceCount.length : 0
      return {
        title: title || 'Booking Block',
        subtitle: `${count} service${count !== 1 ? 's' : ''} available`
      }
    }
  }
})