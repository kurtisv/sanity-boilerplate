import { defineType } from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Contenu Bloc',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Titre',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Texte',
      type: 'text',
    },
  ],
})
