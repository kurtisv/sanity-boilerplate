import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'mapBlock',
  title: 'Bloc Carte Interactive',
  type: 'document',
  icon: () => '🗺️',
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
      rows: 3,
      validation: Rule => Rule.max(300)
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordonnées GPS',
      type: 'object',
      fields: [
        defineField({
          name: 'latitude',
          title: 'Latitude',
          type: 'number',
          validation: Rule => Rule.required().min(-90).max(90)
        }),
        defineField({
          name: 'longitude',
          title: 'Longitude',
          type: 'number',
          validation: Rule => Rule.required().min(-180).max(180)
        })
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'zoomLevel',
      title: 'Niveau de zoom',
      type: 'number',
      initialValue: 15,
      validation: Rule => Rule.required().min(1).max(20)
    }),
    defineField({
      name: 'mapStyle',
      title: 'Style de carte',
      type: 'string',
      initialValue: 'roadmap',
      options: {
        list: [
          { title: 'Roadmap', value: 'roadmap' },
          { title: 'Satellite', value: 'satellite' },
          { title: 'Hybrid', value: 'hybrid' },
          { title: 'Terrain', value: 'terrain' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mapProvider',
      title: 'Fournisseur de carte',
      type: 'string',
      initialValue: 'google',
      options: {
        list: [
          { title: 'Google Maps', value: 'google' },
          { title: 'Mapbox', value: 'mapbox' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'markers',
      title: 'Marqueurs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom du marqueur',
              type: 'string',
              validation: Rule => Rule.required().max(50)
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: Rule => Rule.max(200)
            }),
            defineField({
              name: 'coordinates',
              title: 'Coordonnées',
              type: 'object',
              fields: [
                defineField({
                  name: 'latitude',
                  title: 'Latitude',
                  type: 'number',
                  validation: Rule => Rule.required().min(-90).max(90)
                }),
                defineField({
                  name: 'longitude',
                  title: 'Longitude',
                  type: 'number',
                  validation: Rule => Rule.required().min(-180).max(180)
                })
              ],
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'icon',
              title: 'Icône personnalisée',
              type: 'image',
              options: {
                accept: 'image/*'
              }
            }),
            defineField({
              name: 'color',
              title: 'Couleur du marqueur',
              type: 'string',
              initialValue: '#FF0000',
              options: {
                list: [
                  { title: 'Rouge', value: '#FF0000' },
                  { title: 'Bleu', value: '#0000FF' },
                  { title: 'Vert', value: '#00FF00' },
                  { title: 'Orange', value: '#FFA500' },
                  { title: 'Violet', value: '#800080' }
                ]
              }
            })
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'height',
      title: 'Hauteur de la carte (px)',
      type: 'number',
      initialValue: 400,
      validation: Rule => Rule.required().min(200).max(800)
    }),
    defineField({
      name: 'showDirections',
      title: 'Afficher les directions',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'enableFullscreen',
      title: 'Activer le plein écran',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'showMapControls',
      title: 'Afficher les contrôles de carte',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      address: 'address',
      markersCount: 'markers'
    },
    prepare({ title, address, markersCount }) {
      const markerCount = markersCount?.length || 0
      return {
        title: title || 'Carte sans titre',
        subtitle: `${address} • ${markerCount} marqueur${markerCount > 1 ? 's' : ''}`,
        media: () => '🗺️'
      }
    }
  }
})