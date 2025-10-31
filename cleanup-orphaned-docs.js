// Script pour nettoyer les documents orphelins
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_WRITE_TOKEN, // Vous devez créer un token avec permissions d'écriture
  useCdn: false,
})

async function cleanup() {
  try {
    console.log('🧹 Nettoyage des documents orphelins...')
    
    // Supprimer tous les documents headerSettings
    const headerDocs = await client.fetch('*[_type == "headerSettings"]')
    console.log(`Trouvé ${headerDocs.length} documents headerSettings`)
    
    for (const doc of headerDocs) {
      await client.delete(doc._id)
      console.log(`✅ Supprimé headerSettings: ${doc._id}`)
    }
    
    // Supprimer tous les documents footerSettings
    const footerDocs = await client.fetch('*[_type == "footerSettings"]')
    console.log(`Trouvé ${footerDocs.length} documents footerSettings`)
    
    for (const doc of footerDocs) {
      await client.delete(doc._id)
      console.log(`✅ Supprimé footerSettings: ${doc._id}`)
    }
    
    console.log('🎉 Nettoyage terminé !')
  } catch (error) {
    console.error('❌ Erreur:', error)
  }
}

cleanup()
