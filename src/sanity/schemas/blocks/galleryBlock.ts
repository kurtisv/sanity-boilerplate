import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryBlock',
  title: 'Gallery Block',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300)
    }),
    defineField({
      name: 'layout',
      title: 'Gallery Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Masonry', value: 'masonry' },
          { title: 'Carousel', value: 'carousel' }
        ]
      },
      initialValue: 'grid',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'columns',
      title: 'Grid Columns',
      type: 'number',
      options: {
        list: [2, 3, 4, 5]
      },
      initialValue: 3,
      hidden: ({ document }) => document?.layout !== 'grid'
    }),
    defineField({
      name: 'enableFilters',
      title: 'Enable Category Filters',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required().max(50)
            }),
            defineField({
              name: 'slug',
              title: 'Category Slug',
              type: 'slug',
              options: {
                source: 'name',
                maxLength: 96
              },
              validation: (Rule) => Rule.required()
            })
          ],
          preview: {
            select: {
              title: 'name'
            }
          }
        }
      ],
      hidden: ({ document }) => !document?.enableFilters,
      validation: (Rule) => Rule.max(10)
    }),
    defineField({
      name: 'items',
      title: 'Gallery Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Media Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' }
                ]
              },
              initialValue: 'image',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) => Rule.required().max(100)
                })
              ],
              hidden: ({ parent }) => parent?.type !== 'image',
              validation: (Rule) => Rule.custom((image, context) => {
                const parent = context?.parent as any
                return parent?.type === 'image' && !image ? 'Image is required' : true
              })
            }),
            defineField({
              name: 'video',
              title: 'Video',
              type: 'file',
              options: {
                accept: 'video/*'
              },
              hidden: ({ parent }) => parent?.type !== 'video',
              validation: (Rule) => Rule.custom((video, context) => {
                const parent = context?.parent as any
                return parent?.type === 'video' && !video ? 'Video is required' : true
              })
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video URL (YouTube/Vimeo)',
              type: 'url',
              description: 'Alternative to file upload',
              hidden: ({ parent }) => parent?.type !== 'video'
            }),
            defineField({
              name: 'thumbnail',
              title: 'Video Thumbnail',
              type: 'image',
              options: {
                hotspot: true
              },
              hidden: ({ parent }) => parent?.type !== 'video'
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              validation: (Rule) => Rule.max(200)
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'reference',
              to: [{ type: 'galleryBlock' }],
              options: {
                filter: ({ document }) => {
                  return {
                    filter: '_id == $id',
                    params: { id: document._id }
                  }
                }
              },
              hidden: ({ document }) => !document?.enableFilters
            }),
            defineField({
              name: 'categorySlug',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Tous', value: 'all' },
                  { title: 'Nature', value: 'nature' },
                  { title: 'Architecture', value: 'architecture' },
                  { title: 'Personnes', value: 'people' },
                  { title: 'Événements', value: 'events' }
                ]
              },
              hidden: ({ document }: { document: any }) => !document?.enableFilters
            })
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
              type: 'type'
            },
            prepare({ title, media, type }) {
              return {
                title: title || 'Untitled item',
                subtitle: type === 'video' ? 'Video' : 'Image',
                media
              }
            }
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1).max(50)
    }),
    defineField({
      name: 'lightboxEnabled',
      title: 'Enable Lightbox',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'lazyLoading',
      title: 'Enable Lazy Loading',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      itemCount: 'items',
      layout: 'layout'
    },
    prepare({ title, itemCount, layout }) {
      const count = itemCount?.length || 0
      return {
        title: title || 'Gallery Block',
        subtitle: `${count} items • ${layout} layout`
      }
    }
  }
})