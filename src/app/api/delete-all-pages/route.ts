import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST() {
  try {
    // Récupérer toutes les pages
    const pages = await client.fetch(`*[_type == "page"]{ _id }`)
    
    if (pages.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Aucune page à supprimer',
        deletedCount: 0
      })
    }

    // Supprimer toutes les pages
    const deletePromises = pages.map((page: { _id: string }) =>
      client.delete(page._id)
    )

    await Promise.all(deletePromises)

    return NextResponse.json({
      success: true,
      message: `${pages.length} page(s) supprimée(s) avec succès`,
      deletedCount: pages.length
    })
  } catch (error) {
    console.error('Erreur lors de la suppression des pages:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Compter les pages existantes
    const pages = await client.fetch(`*[_type == "page"]{ _id, title, slug }`)
    
    return NextResponse.json({
      success: true,
      count: pages.length,
      pages: pages.map((p: any) => ({
        id: p._id,
        title: p.title,
        slug: p.slug?.current || 'no-slug'
      }))
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des pages:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}
