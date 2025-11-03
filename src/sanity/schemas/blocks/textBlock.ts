import { defineType, defineField } from 'sanity'

/**
 * TextBlock - Composant de texte riche
 * 
 * Permet aux content managers de :
 * - Ajouter du contenu riche (titres, paragraphes, listes, etc.)
 * - Insérer des images dans le texte
 * - Personnaliser l'alignement
 * - Choisir la couleur de fond
 * - Ajuster le padding
 */
export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  description: 'Contenu riche avec éditeur visuel (texte, images, liens)',
  fields: [
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'array',
      description: 'Contenu riche avec formatage',
      of: [
        {
          type: 'block',
          // Styles pour les paragraphes
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Titre H1', value: 'h1' },
            { title: 'Titre H2', value: 'h2' },
            { title: 'Titre H3', value: 'h3' },
            { title: 'Titre H4', value: 'h4' },
            { title: 'Citation', value: 'blockquote' },
          ],
          // Styles de liste
          lists: [
            { title: 'Puces', value: 'bullet' },
            { title: 'Numérotée', value: 'number' },
          ],
          // Marques (bold, italic, etc.)
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
              { title: 'Souligné', value: 'underline' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Ouvrir dans un nouvel onglet',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        // Support des images dans le texte
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texte alternatif',
              description: 'Important pour l\'accessibilité et le SEO',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Légende',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    
    // Options de style
    defineField({
      name: 'alignment',
      title: 'Alignement',
      type: 'string',
      description: 'Alignement du texte',
      options: {
        list: [
          { title: 'Gauche', value: 'left' },
          { title: 'Centre', value: 'center' },
          { title: 'Droite', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    
    defineField({
      name: 'maxWidth',
      title: 'Largeur maximale',
      type: 'string',
      description: 'Largeur maximale du contenu',
      options: {
        list: [
          { title: 'Étroit (640px)', value: 'narrow' },
          { title: 'Moyen (768px)', value: 'medium' },
          { title: 'Large (1024px)', value: 'wide' },
          { title: 'Pleine largeur (1200px)', value: 'full' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'wide',
    }),
    
    defineField({
      name: 'backgroundColor',
      title: 'Couleur de fond',
      type: 'string',
      description: 'Couleur de fond du bloc (optionnel)',
      options: {
        list: [
          { title: 'Aucune', value: '' },
          { title: 'Blanc', value: '#ffffff' },
          { title: 'Gris clair', value: '#f3f4f6' },
          { title: 'Gris', value: '#e5e7eb' },
          { title: 'Primaire', value: '#3b82f6' },
        ],
      },
      initialValue: '',
    }),
    
    defineField({
      name: 'paddingSize',
      title: 'Espacement (padding)',
      type: 'string',
      description: 'Espacement vertical du bloc',
      options: {
        list: [
          { title: 'Petit', value: 'small' },
          { title: 'Moyen', value: 'medium' },
          { title: 'Grand', value: 'large' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
  ],
  
  preview: {
    select: {
      content: 'content',
      alignment: 'alignment',
    },
    prepare({ content, alignment }) {
      const block = (content || []).find((block: any) => block._type === 'block')
      const text = block?.children
        ?.filter((child: any) => child._type === 'span')
        ?.map((span: any) => span.text)
        ?.join('') || ''
      
      return {
        title: text.substring(0, 50) || 'Bloc Texte',
        subtitle: `Alignement: ${alignment || 'gauche'}`,
      }
    },
  },
})
