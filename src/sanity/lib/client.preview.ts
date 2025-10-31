import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Important: disable CDN for preview
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts', // Include draft documents
})
