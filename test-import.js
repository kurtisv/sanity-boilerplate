// Test simple d'import de démo
console.log('🚀 Test d\'import de la démo')

// Vérification des variables d'environnement
require('dotenv').config({ path: '.env.local' })

console.log('Variables d\'environnement:')
console.log('- PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✅ Configuré' : '❌ Manquant')
console.log('- DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')
console.log('- API_TOKEN:', process.env.SANITY_API_TOKEN ? '✅ Configuré' : '❌ Manquant')

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.log('\n❌ NEXT_PUBLIC_SANITY_PROJECT_ID manquant dans .env.local')
  console.log('Veuillez configurer votre projet Sanity d\'abord.')
  process.exit(1)
}

if (!process.env.SANITY_API_TOKEN) {
  console.log('\n⚠️ SANITY_API_TOKEN manquant dans .env.local')
  console.log('Un token avec droits d\'écriture est nécessaire pour l\'import.')
  console.log('\nInstructions:')
  console.log('1. Allez sur https://sanity.io/manage')
  console.log('2. Sélectionnez votre projet')
  console.log('3. Allez dans "API" > "Tokens"')
  console.log('4. Créez un nouveau token avec droits "Editor"')
  console.log('5. Ajoutez SANITY_API_TOKEN=votre_token dans .env.local')
  process.exit(1)
}

// Test de connexion Sanity
async function testConnection() {
  try {
    const { createClient } = require('@sanity/client')
    
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
      apiVersion: '2024-01-01'
    })

    console.log('\n🔍 Test de connexion à Sanity...')
    
    // Test simple de lecture
    const result = await client.fetch('*[_type == "page"] | order(_createdAt desc) [0...3] { _id, title, slug }')
    console.log('✅ Connexion réussie!')
    console.log(`📄 Pages trouvées: ${result.length}`)
    
    if (result.length > 0) {
      console.log('Exemples de pages:')
      result.forEach(page => {
        console.log(`  - ${page.title || 'Sans titre'} (${page.slug?.current || 'pas de slug'})`)
      })
    }

    // Vérifier si la page demo existe
    const demoPage = await client.fetch(`*[_type == "page" && slug.current == "demo"][0]`)
    if (demoPage) {
      console.log('\n📋 Page demo existante trouvée:')
      console.log(`  - ID: ${demoPage._id}`)
      console.log(`  - Titre: ${demoPage.title}`)
      console.log(`  - Blocs: ${demoPage.pageBuilder?.length || 0}`)
    } else {
      console.log('\n📋 Aucune page demo trouvée - prêt pour l\'import!')
    }

    console.log('\n🎉 Configuration validée! Vous pouvez maintenant importer la démo.')
    console.log('\nCommandes disponibles:')
    console.log('- npm run demo:import (import simple)')
    console.log('- npm run demo:setup (configuration complète)')
    console.log('- http://localhost:3000/admin/demo (interface web)')

  } catch (error) {
    console.log('\n❌ Erreur de connexion:', error.message)
    
    if (error.message.includes('Unauthorized')) {
      console.log('\n🔑 Problème d\'authentification:')
      console.log('- Vérifiez que votre SANITY_API_TOKEN est correct')
      console.log('- Assurez-vous que le token a les droits "Editor"')
    } else if (error.message.includes('not found')) {
      console.log('\n🔍 Problème de projet:')
      console.log('- Vérifiez votre NEXT_PUBLIC_SANITY_PROJECT_ID')
      console.log('- Assurez-vous que le dataset existe')
    }
  }
}

testConnection()
