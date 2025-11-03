import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET() {
  try {
    // Récupérer toutes les pages créées dans Sanity (exclure les pages système)
    const pages = await client.fetch(`
      *[_type == "page" && !(_id in path("drafts.**")) && slug.current != "demo" && slug.current != "studio-showcase"] | order(_updatedAt desc) {
        _id,
        title,
        slug,
        pageBuilder,
        _updatedAt
      }
    `)

    return NextResponse.json({
      success: true,
      pages: pages || [],
      count: pages?.length || 0
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des pages Studio:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des pages Studio', 
        details: error instanceof Error ? error.message : 'Erreur inconnue' 
      },
      { status: 500 }
    )
  }
}
