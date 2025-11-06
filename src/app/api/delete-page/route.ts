import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: Request) {
  try {
    const { pageId } = await request.json()

    if (!pageId) {
      return NextResponse.json(
        { success: false, error: 'ID de page requis' },
        { status: 400 }
      )
    }

    // Supprimer la page
    await client.delete(pageId)

    return NextResponse.json({
      success: true,
      message: 'Page supprimée avec succès',
      deletedId: pageId
    })
  } catch (error) {
    console.error('Erreur lors de la suppression de la page:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}
