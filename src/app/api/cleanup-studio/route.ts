import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🧹 Nettoyage des documents problématiques dans Sanity Studio...')

    // 1. Supprimer tous les documents avec des références d'images inexistantes
    const documentsWithBrokenImages = await client.fetch(`
      *[_type == "page" && references("image-placeholder-1", "image-placeholder-2", "image-placeholder-3", "image-placeholder-4")]._id
    `)

    if (documentsWithBrokenImages.length > 0) {
      console.log(`🗑️ Suppression de ${documentsWithBrokenImages.length} documents avec images cassées...`)
      
      for (const docId of documentsWithBrokenImages) {
        await client.delete(docId)
        console.log(`✅ Document supprimé: ${docId}`)
      }
    }

    // 2. Supprimer TOUTES les pages dans Studio
    const allPages = await client.fetch(`
      *[_type == "page"]._id
    `)

    if (allPages.length > 0) {
      console.log(`🗑️ Suppression de TOUTES les ${allPages.length} pages dans Studio...`)
      
      for (const docId of allPages) {
        await client.delete(docId)
        console.log(`✅ Page supprimée: ${docId}`)
      }
    }

    // 3. Nettoyer les drafts
    const drafts = await client.fetch(`*[_id in path("drafts.**")]._id`)
    
    if (drafts.length > 0) {
      console.log(`🗑️ Suppression de ${drafts.length} brouillons...`)
      
      for (const draftId of drafts) {
        await client.delete(draftId)
        console.log(`✅ Brouillon supprimé: ${draftId}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Nettoyage terminé avec succès',
      cleaned: {
        brokenImages: documentsWithBrokenImages.length,
        allPages: allPages.length,
        drafts: drafts.length
      }
    })

  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors du nettoyage', 
        details: error instanceof Error ? error.message : 'Erreur inconnue' 
      },
      { status: 500 }
    )
  }
}
