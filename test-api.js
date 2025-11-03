// Test de l'API d'import via fetch
async function testImportAPI() {
  const baseUrl = 'http://localhost:3000'
  
  console.log('🧪 Test de l\'API d\'import de démo')
  console.log('Base URL:', baseUrl)
  
  try {
    // Test 1: Vérifier le statut
    console.log('\n1️⃣ Vérification du statut...')
    const statusResponse = await fetch(`${baseUrl}/api/import-demo`)
    const statusData = await statusResponse.json()
    
    console.log('Statut:', statusResponse.status)
    console.log('Données:', JSON.stringify(statusData, null, 2))
    
    // Test 2: Import de la démo
    console.log('\n2️⃣ Lancement de l\'import...')
    const importResponse = await fetch(`${baseUrl}/api/import-demo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    const importData = await importResponse.json()
    
    console.log('Statut import:', importResponse.status)
    console.log('Résultat:', JSON.stringify(importData, null, 2))
    
    if (importResponse.ok) {
      console.log('\n✅ Import réussi!')
      console.log(`🔗 Voir la démo: ${baseUrl}/demo`)
      console.log(`🎛️ Studio: ${baseUrl}${importData.data.studioUrl}`)
    } else {
      console.log('\n❌ Erreur lors de l\'import')
      console.log('Détails:', importData.error)
    }
    
  } catch (error) {
    console.log('\n💥 Erreur de connexion:', error.message)
    console.log('Assurez-vous que le serveur Next.js fonctionne sur localhost:3000')
  }
}

// Exécution avec gestion d'erreur
testImportAPI().catch(console.error)
