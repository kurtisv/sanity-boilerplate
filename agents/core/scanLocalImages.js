/**
 * 🖼️ SCAN LOCAL IMAGES
 * 
 * Utilitaire pour scanner le dossier public/images et générer
 * automatiquement la configuration mediaDefaults.json
 */

const fs = require('fs')
const path = require('path')

/**
 * Scanner le dossier public/images et retourner la liste des images
 * 
 * @returns {array} Liste des images trouvées
 */
function scanLocalImages() {
  const imagesDir = path.join(__dirname, '..', '..', 'public', 'images')
  
  if (!fs.existsSync(imagesDir)) {
    console.warn('⚠️  Dossier public/images introuvable')
    return []
  }
  
  const files = fs.readdirSync(imagesDir)
  const images = []
  
  files.forEach((filename, index) => {
    const filePath = path.join(imagesDir, filename)
    const stats = fs.statSync(filePath)
    
    // Ignorer les dossiers
    if (!stats.isFile()) return
    
    // Vérifier l'extension
    const ext = path.extname(filename).toLowerCase()
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']
    
    if (!validExtensions.includes(ext)) return
    
    // Déterminer le type basé sur l'index ou le nom
    let type = 'general'
    let category = 'content'
    
    if (index < 2) {
      type = 'hero'
      category = 'business'
    } else if (index < 4) {
      type = 'feature'
      category = 'technology'
    } else if (index < 6) {
      type = 'team'
      category = 'people'
    } else if (index < 8) {
      type = 'gallery'
      category = 'workspace'
    } else {
      type = 'blog'
      category = 'content'
    }
    
    images.push({
      id: `${type}-default-${images.filter(img => img.type === type).length + 1}`,
      filename,
      url: `/images/${filename}`,
      alt: generateAltText(filename, type),
      type,
      category,
      aspectRatio: '16:9',
      size: stats.size.toString()
    })
  })
  
  return images
}

/**
 * Générer un texte alternatif basé sur le nom du fichier
 * 
 * @param {string} filename - Nom du fichier
 * @param {string} type - Type d'image
 * @returns {string} Texte alternatif
 */
function generateAltText(filename, type) {
  const altTexts = {
    hero: [
      'Équipe collaborative en réunion de travail',
      'Espace de travail moderne et lumineux',
      'Bureau professionnel avec vue panoramique'
    ],
    feature: [
      'Développement et technologie',
      'Innovation et créativité',
      'Solutions digitales modernes'
    ],
    team: [
      'Portrait professionnel membre d\'équipe',
      'Portrait professionnel collaborateur',
      'Membre de l\'équipe souriant'
    ],
    gallery: [
      'Espace de travail collaboratif',
      'Bureau moderne et design',
      'Environnement de travail inspirant'
    ],
    blog: [
      'Ordinateur portable et café',
      'Rédaction et création de contenu',
      'Espace de travail créatif'
    ]
  }
  
  const texts = altTexts[type] || ['Image professionnelle']
  return texts[Math.floor(Math.random() * texts.length)]
}

/**
 * Générer le mapping d'usage par type de bloc
 * 
 * @param {array} images - Liste des images
 * @returns {object} Mapping d'usage
 */
function generateUsageMapping(images) {
  const usage = {}
  
  // Grouper par type
  const byType = {}
  images.forEach(img => {
    if (!byType[img.type]) byType[img.type] = []
    byType[img.type].push(img.id)
  })
  
  // Créer le mapping
  usage.heroBlock = byType.hero || []
  usage.featureGridBlock = byType.feature || []
  usage.teamBlock = byType.team || []
  usage.galleryBlock = byType.gallery || []
  usage.blogBlock = byType.blog || []
  usage.testimonialsBlock = byType.team || []
  usage.pricingBlock = byType.feature || []
  usage.ctaBlock = byType.hero || []
  usage.contactBlock = byType.feature || []
  
  return usage
}

/**
 * Générer la configuration complète mediaDefaults.json
 * 
 * @returns {object} Configuration complète
 */
function generateMediaDefaultsConfig() {
  const images = scanLocalImages()
  const usage = generateUsageMapping(images)
  
  return {
    version: '2.0',
    description: 'Pool d\'images locales depuis public/images utilisées automatiquement quand un bloc requiert un visuel',
    source: 'local',
    basePath: '/images',
    images,
    usage,
    metadata: {
      source: 'Local (public/images)',
      format: 'Mixed (AVIF, JPG, PNG, WebP)',
      totalImages: images.length,
      license: 'Project assets',
      lastUpdated: new Date().toISOString().split('T')[0]
    }
  }
}

/**
 * Sauvegarder la configuration dans mediaDefaults.json
 */
function updateMediaDefaultsFile() {
  const config = generateMediaDefaultsConfig()
  const configPath = path.join(__dirname, 'mediaDefaults.json')
  
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
  console.log(`✅ mediaDefaults.json mis à jour avec ${config.images.length} images`)
  
  return config
}

/**
 * Obtenir une image aléatoire par type
 * 
 * @param {string} type - Type d'image (hero, feature, team, etc.)
 * @returns {object|null} Image sélectionnée
 */
function getRandomImageByType(type) {
  const config = require('./mediaDefaults.json')
  const images = config.images.filter(img => img.type === type)
  
  if (images.length === 0) return null
  
  return images[Math.floor(Math.random() * images.length)]
}

/**
 * Obtenir toutes les images d'un type
 * 
 * @param {string} type - Type d'image
 * @returns {array} Liste des images
 */
function getImagesByType(type) {
  const config = require('./mediaDefaults.json')
  return config.images.filter(img => img.type === type)
}

/**
 * Afficher un rapport des images disponibles
 */
function printImageReport() {
  const images = scanLocalImages()
  
  console.log('\n📊 RAPPORT DES IMAGES LOCALES')
  console.log('='.repeat(80))
  console.log(`Total: ${images.length} images\n`)
  
  const byType = {}
  images.forEach(img => {
    if (!byType[img.type]) byType[img.type] = []
    byType[img.type].push(img)
  })
  
  Object.entries(byType).forEach(([type, imgs]) => {
    console.log(`\n📁 ${type.toUpperCase()} (${imgs.length})`)
    imgs.forEach(img => {
      const sizeMB = (parseInt(img.size) / 1024 / 1024).toFixed(2)
      console.log(`  - ${img.filename} (${sizeMB} MB)`)
      console.log(`    URL: ${img.url}`)
      console.log(`    Alt: ${img.alt}`)
    })
  })
  
  console.log('\n' + '='.repeat(80))
}

// Si exécuté directement
if (require.main === module) {
  const args = process.argv.slice(2)
  
  if (args.includes('--update')) {
    updateMediaDefaultsFile()
  } else if (args.includes('--report')) {
    printImageReport()
  } else {
    console.log('Usage:')
    console.log('  node scanLocalImages.js --update   # Mettre à jour mediaDefaults.json')
    console.log('  node scanLocalImages.js --report   # Afficher le rapport des images')
  }
}

module.exports = {
  scanLocalImages,
  generateMediaDefaultsConfig,
  updateMediaDefaultsFile,
  getRandomImageByType,
  getImagesByType,
  printImageReport
}
