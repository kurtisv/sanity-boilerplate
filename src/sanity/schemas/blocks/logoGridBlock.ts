import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'logoGridBlock',
  title: '🏢 Logo Grid',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.max(100)
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      initialValue: [],
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nom', type: 'string' },
            { name: 'image', title: 'Image', type: 'image' },
            { name: 'url', title: 'URL', type: 'url' }
          ]
        }
      ]
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      options: {
        list: [
          { title: '3 colonnes', value: 'grid-3' },
          { title: '4 colonnes', value: 'grid-4' },
          { title: '6 colonnes', value: 'grid-6' }
        ]
      },
      initialValue: 'grid-4'
    })
  ],
  preview: {
    select: { title: 'title', logos: 'logos' },
    prepare({ title, logos }) {
      return {
        title: title || 'Logo Grid',
        subtitle: `${logos?.length || 0} logo(s)`
      }
    }
  }
})
