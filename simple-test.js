console.log('Test simple - démarrage')
console.log('Node.js version:', process.version)
console.log('Répertoire courant:', process.cwd())

// Test de lecture du fichier .env.local
const fs = require('fs')
const path = require('path')

const envPath = path.join(process.cwd(), '.env.local')
console.log('Chemin .env.local:', envPath)

if (fs.existsSync(envPath)) {
  console.log('✅ Fichier .env.local trouvé')
  const envContent = fs.readFileSync(envPath, 'utf8')
  const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'))
  console.log(`📄 Variables trouvées: ${lines.length}`)
  
  lines.forEach(line => {
    const [key] = line.split('=')
    if (key) {
      console.log(`  - ${key.trim()}`)
    }
  })
} else {
  console.log('❌ Fichier .env.local non trouvé')
}

console.log('Test terminé')
