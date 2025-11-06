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
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'services',
      title: 'Available Services',
      type: 'array',
      of: [{
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
            title: 'Description',
            type: 'text',
            rows: 2,
            validation: Rule => Rule.max(300)
          }
        ],
        preview: {
          select: { title: 'name', subtitle: 'duration' },
          prepare({ title, subtitle }) {
            return {
              title: title || 'Service',
              subtitle: subtitle ? `${subtitle} min` : ''
            }
          }
        }
      }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'calendarIntegration',
      title: 'Calendar Integration',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Integration Type',
          type: 'string',
          options: {
            list: [
              { title: 'Calendly', value: 'calendly' },
              { title: 'Google Calendar', value: 'google' },
              { title: 'Custom Form', value: 'custom' }
            ],
            layout: 'radio'
          },
          initialValue: 'custom',
          validation: Rule => Rule.required()
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
      name: 'workingHours',
      title: 'Working Hours',
      type: 'object',
      fields: [
        {
          name: 'monday',
          title: 'Monday',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Open', type: 'boolean', initialValue: true },
            { name: 'start', title: 'Start Time', type: 'string', initialValue: '09:00' },
            { name: 'end', title: 'End Time', type: 'string', initialValue: '17:00' }
          ]
        },
        {
          name: 'tuesday',
          title: 'Tuesday',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Open', type: 'boolean', initialValue: true },
            { name: 'start', title: 'Start Time', type: 'string', initialValue: '09:00' },
            { name: 'end', title: 'End Time', type: 'string', initialValue: '17:00' }
          ]
        },
        {
          name: 'wednesday',
          title: 'Wednesday',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Open', type: 'boolean', initialValue: true },
            { name: 'start', title: 'Start Time', type: 'string', initialValue: '09:00' },
            { name: 'end', title: 'End Time', type: 'string', initialValue: '17:00' }
          ]
        },
        {
          name: 'thursday',
          title: 'Thursday',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Open', type: 'boolean', initialValue: true },
            { name: 'start', title: 'Start Time', type: 'string', initialValue: '09:00' },
            { name: 'end', title: 'End Time', type: 'string', initialValue: '17:00' }
          ]
        },
        {
          name: 'friday',
          title: 'Friday',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Open', type: 'boolean', initialValue: true },
            { name: 'start', title: 'Start Time', type: 'string', initialValue: '09:00' },
            { name: 'end', title: 'End Time', type: 'string', initialValue: '17:00' }
          ]
        },
        {
          name: 'saturday',
          title: 'Saturday',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Open', type: 'boolean', initialValue: false },
            { name: 'start', title: 'Start Time', type: 'string', initialValue: '09:00' },
            { name: 'end', title: 'End Time', type: 'string', initialValue: '17:00' }
          ]
        },
        {
          name: 'sunday',
          title: 'Sunday',
          type: 'object',
          fields: [
            { name: 'enabled', title: 'Open', type: 'boolean', initialValue: false },
            { name: 'start', title: 'Start Time', type: 'string', initialValue: '09:00' },
            { name: 'end', title: 'End Time', type: 'string', initialValue: '17:00' }
          ]
        }
      ]
    }),
    defineField({
      name: 'emailSettings',
      title: 'Email Settings',
      type: 'object',
      fields: [
        {
          name: 'confirmationEnabled',
          title: 'Send Confirmation Email',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'adminEmail',
          title: 'Admin Email',
          type: 'email',
          validation: Rule => Rule.required()
        },
        {
          name: 'confirmationSubject',
          title: 'Confirmation Email Subject',
          type: 'string',
          initialValue: 'Booking Confirmation',
          validation: Rule => Rule.max(100)
        },
        {
          name: 'confirmationMessage',
          title: 'Confirmation Email Message',
          type: 'text',
          rows: 4,
          validation: Rule => Rule.max(500)
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
          name: 'enableNotes',
          title: 'Enable Notes Field',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'timeSlotInterval',
          title: 'Time Slot Interval (minutes)',
          type: 'number',
          initialValue: 30,
          validation: Rule => Rule.min(15).max(120)
        },
        {
          name: 'advanceBookingDays',
          title: 'Advance Booking Days',
          type: 'number',
          initialValue: 30,
          validation: Rule => Rule.min(1).max(365)
        }
      ]
    }),
    defineField({
      name: 'styling',
      title: 'Styling',
      type: 'object',
      fields: [
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          description: 'Hex color code (e.g., #ffffff)'
        },
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          description: 'Hex color code (e.g., #3b82f6)'
        },
        {
          name: 'layout',
          title: 'Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Single Column', value: 'single' },
              { title: 'Two Columns', value: 'two-column' },
              { title: 'Sidebar', value: 'sidebar' }
            ],
            layout: 'radio'
          },
          initialValue: 'single'
        }
      ]
    })
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Booking Block',
        subtitle: subtitle || 'Online booking system'
      }
    }
  }
})