// Test direct de l'API d'import
const fetch = require('node-fetch')

async function testAPI() {
  console.log('🧪 Test direct de l\'API d\'import')
  
  try {
    // Test GET d'abord
    console.log('\n1️⃣ Test GET /api/import-demo')
    const getResponse = await fetch('http://localhost:3000/api/import-demo')
    const getData = await getResponse.json()
    
    console.log('Status GET:', getResponse.status)
    console.log('Data GET:', JSON.stringify(getData, null, 2))
    
    // Test POST ensuite
    console.log('\n2️⃣ Test POST /api/import-demo')
    const postResponse = await fetch('http://localhost:3000/api/import-demo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log('Status POST:', postResponse.status)
    
    if (postResponse.ok) {
      const postData = await postResponse.json()
      console.log('✅ Succès:', JSON.stringify(postData, null, 2))
    } else {
      const errorText = await postResponse.text()
      console.log('❌ Erreur:', errorText)
    }
    
  } catch (error) {
    console.error('💥 Erreur de connexion:', error.message)
  }
}

testAPI()
