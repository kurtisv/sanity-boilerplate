/**
 * Script pour corriger les clés manquantes dans les StatsBlock
 * 
 * Ce script ajoute des _key uniques aux éléments du tableau stats
 * qui n'en ont pas, ce qui permet d'éditer les blocs dans Sanity Studio.
 */

const { createClient } = require('next-sanity')
require('dotenv').config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Fonction pour générer une clé unique
function generateKey() {
  return Math.random().toString(36).substr(2, 9)
}

async function fixStatsKeys() {
  console.log('🔍 Recherche des StatsBlock avec des clés manquantes...')
  
  try {
    // Récupérer tous les documents qui contiennent des statsBlock
    const query = `*[_type == "page" && defined(pageBuilder)] {
      _id,
      _rev,
      pageBuilder[] {
        ...,
        _type == "statsBlock" => {
          ...,
          stats[] {
            ...,
            !defined(_key) => {
              "needsKey": true
            }
          }
        }
      }
    }`
    
    const documents = await client.fetch(query)
    console.log(`📄 Trouvé ${documents.length} documents à vérifier`)
    
    let fixedCount = 0
    
    for (const doc of documents) {
      let needsUpdate = false
      const updatedPageBuilder = doc.pageBuilder.map(block => {
        if (block._type === 'statsBlock' && block.stats) {
          const updatedStats = block.stats.map(stat => {
            if (!stat._key) {
              needsUpdate = true
              return {
                ...stat,
                _key: generateKey()
              }
            }
            return stat
          })
          
          if (needsUpdate) {
            return {
              ...block,
              stats: updatedStats
            }
          }
        }
        return block
      })
      
      if (needsUpdate) {
        console.log(`🔧 Correction du document ${doc._id}`)
        
        await client
          .patch(doc._id)
          .set({ pageBuilder: updatedPageBuilder })
          .commit()
        
        fixedCount++
      }
    }
    
    console.log(`✅ Terminé ! ${fixedCount} documents corrigés`)
    
    if (fixedCount === 0) {
      console.log('ℹ️  Aucune correction nécessaire - tous les éléments ont déjà des clés')
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la correction:', error.message)
    
    if (error.message.includes('token')) {
      console.log('\n💡 Assurez-vous que SANITY_API_TOKEN est défini dans votre fichier .env')
      console.log('   Le token doit avoir les permissions "Editor" ou "Admin"')
    }
  }
}

// Exécuter le script
fixStatsKeys()
