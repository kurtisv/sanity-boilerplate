import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'countdownBlock',
  title: 'Countdown Block',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'targetDate',
      title: 'Date cible',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'endMessage',
      title: 'Message de fin',
      type: 'string',
      description: 'Message affiché quand le compte à rebours est terminé',
      validation: Rule => Rule.max(100)
    }),
    defineField({
      name: 'showLabels',
      title: 'Afficher les labels',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'theme',
      title: 'Thème',
      type: 'string',
      options: {
        list: [
          { title: 'Sombre', value: 'dark' },
          { title: 'Clair', value: 'light' },
          { title: 'Coloré', value: 'colorful' }
        ]
      },
      initialValue: 'dark'
    }),
    defineField({
      name: 'size',
      title: 'Taille',
      type: 'string',
      options: {
        list: [
          { title: 'Petit', value: 'small' },
          { title: 'Moyen', value: 'medium' },
          { title: 'Grand', value: 'large' }
        ]
      },
      initialValue: 'medium'
    })
  ],
  preview: {
    select: {
      title: 'title',
      targetDate: 'targetDate',
      theme: 'theme'
    },
    prepare({ title, targetDate, theme }) {
      const formattedDate = targetDate 
        ? new Date(targetDate).toLocaleDateString('fr-FR')
        : 'Date non définie'
      
      return {
        title: title || 'Countdown Block',
        subtitle: `${formattedDate} • Thème: ${theme}`,
        media: '⏰'
      }
    }
  }
})