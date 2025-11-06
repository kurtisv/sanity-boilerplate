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
      validation: Rule => Rule.max(200),
      rows: 3
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
            validation: Rule => Rule.required().max(80)
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
            validation: Rule => Rule.max(200)
          }
        ],
        preview: {
          select: {
            title: 'name',
            duration: 'duration',
            price: 'price'
          },
          prepare({ title, duration, price }) {
            return {
              title: title || 'Service',
              subtitle: `${duration ? duration + ' min' : ''} ${price ? '- ' + price : ''}`.trim()
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
              { title: 'Manual', value: 'manual' }
            ],
            layout: 'radio'
          },
          initialValue: 'calendly',
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
      type: 'array',
      of: [{
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
            name: 'startTime',
            title: 'Start Time',
            type: 'string',
            description: 'Format: HH:MM (24h format)',
            validation: Rule => Rule.required().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
              name: 'time',
              invert: false 
            })
          },
          {
            name: 'endTime',
            title: 'End Time',
            type: 'string',
            description: 'Format: HH:MM (24h format)',
            validation: Rule => Rule.required().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
              name: 'time',
              invert: false 
            })
          },
          {
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            initialValue: true
          }
        ],
        preview: {
          select: {
            day: 'day',
            startTime: 'startTime',
            endTime: 'endTime',
            isActive: 'isActive'
          },
          prepare({ day, startTime, endTime, isActive }) {
            return {
              title: day ? day.charAt(0).toUpperCase() + day.slice(1) : 'Day',
              subtitle: `${startTime || '00:00'} - ${endTime || '00:00'} ${!isActive ? '(Inactive)' : ''}`
            }
          }
        }
      }]
    }),
    defineField({
      name: 'timeSlots',
      title: 'Time Slots Interval',
      type: 'number',
      description: 'Interval between time slots in minutes',
      initialValue: 30,
      validation: Rule => Rule.required().min(15).max(120)
    }),
    defineField({
      name: 'advanceBooking',
      title: 'Advance Booking',
      type: 'object',
      fields: [
        {
          name: 'minDays',
          title: 'Minimum Days in Advance',
          type: 'number',
          initialValue: 1,
          validation: Rule => Rule.required().min(0).max(30)
        },
        {
          name: 'maxDays',
          title: 'Maximum Days in Advance',
          type: 'number',
          initialValue: 30,
          validation: Rule => Rule.required().min(1).max(365)
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
          name: 'requireNotes',
          title: 'Require Notes',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'maxNoteLength',
          title: 'Maximum Note Length',
          type: 'number',
          initialValue: 500,
          validation: Rule => Rule.min(100).max(2000)
        },
        {
          name: 'customFields',
          title: 'Custom Fields',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'label',
                title: 'Field Label',
                type: 'string',
                validation: Rule => Rule.required().max(50)
              },
              {
                name: 'fieldType',
                title: 'Field Type',
                type: 'string',
                options: {
                  list: [
                    { title: 'Text', value: 'text' },
                    { title: 'Email', value: 'email' },
                    { title: 'Number', value: 'number' },
                    { title: 'Date', value: 'date' }
                  ]
                },
                initialValue: 'text',
                validation: Rule => Rule.required()
              },
              {
                name: 'required',
                title: 'Required',
                type: 'boolean',
                initialValue: false
              },
              {
                name: 'placeholder',
                title: 'Placeholder',
                type: 'string',
                validation: Rule => Rule.max(100)
              }
            ],
            preview: {
              select: {
                label: 'label',
                fieldType: 'fieldType',
                required: 'required'
              },
              prepare({ label, fieldType, required }) {
                return {
                  title: label || 'Custom Field',
                  subtitle: `${fieldType || 'text'}${required ? ' (Required)' : ''}`
                }
              }
            }
          }]
        }
      ]
    }),
    defineField({
      name: 'emailSettings',
      title: 'Email Settings',
      type: 'object',
      fields: [
        {
          name: 'sendConfirmation',
          title: 'Send Confirmation Email',
          type: 'boolean',
          initialValue: true
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
          validation: Rule => Rule.max(1000)
        },
        {
          name: 'notificationEmail',
          title: 'Notification Email (Admin)',
          type: 'email',
          description: 'Email to receive booking notifications'
        }
      ]
    }),
    defineField({
      name: 'styling',
      title: 'Styling Options',
      type: 'object',
      fields: [
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          description: 'Hex color code (e.g., #3B82F6)',
          validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        },
        {
          name: 'layout',
          title: 'Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Single Column', value: 'single' },
              { title: 'Two Columns', value: 'two-column' },
              { title: 'Inline Calendar', value: 'inline' }
            ]
          },
          initialValue: 'two-column'
        },
        {
          name: 'showServicePrices',
          title: 'Show Service Prices',
          type: 'boolean',
          initialValue: true
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      servicesCount: 'services'
    },
    prepare({ title, servicesCount }) {
      const count = servicesCount?.length || 0
      return {
        title: title || 'Booking Block',
        subtitle: `${count} service${count !== 1 ? 's' : ''} available`
      }
    }
  }
})