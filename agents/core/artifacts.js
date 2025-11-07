/**
 * 📦 GESTION CENTRALISÉE DES ARTEFACTS
 * 
 * Responsabilité: Garantir la traçabilité complète des fichiers, pages et médias
 * générés par chaque agent.
 * 
 * Écrit et lit le manifest global `out/<contextId>/manifest.json`
 */

const fs = require('fs')
const path = require('path')

/**
 * Créer ou mettre à jour le manifest global
 * 
 * @param {string} contextId - UUID du contexte
 * @param {string} agentName - Nom de l'agent
 * @param {object} artifacts - Artefacts à ajouter
 */
function updateManifest(contextId, agentName, artifacts = {}) {
  const manifestPath = getManifestPath(contextId)
  
  // Charger le manifest existant ou créer un nouveau
  let manifest = loadManifest(contextId)
  
  // Ajouter les artefacts de l'agent
  if (!manifest.agents) {
    manifest.agents = {}
  }
  
  manifest.agents[agentName] = {
    timestamp: new Date().toISOString(),
    files: artifacts.files || [],
    report: artifacts.report || {},
    ...artifacts
  }
  
  // Fusionner les blocs, pages et médias
  if (artifacts.manifest) {
    if (artifacts.manifest.blocks) {
      manifest.blocks = [...new Set([...manifest.blocks, ...artifacts.manifest.blocks])]
    }
    if (artifacts.manifest.pages) {
      manifest.pages = [...new Set([...manifest.pages, ...artifacts.manifest.pages])]
    }
    if (artifacts.manifest.media) {
      manifest.media = [...manifest.media, ...artifacts.manifest.media]
    }
  }
  
  // Mettre à jour les métadonnées
  manifest.lastUpdated = new Date().toISOString()
  manifest.lastAgent = agentName
  
  // Sauvegarder
  saveManifest(contextId, manifest)
  
  return manifest
}

/**
 * Charger le manifest global
 * 
 * @param {string} contextId - UUID du contexte
 * @returns {object} Manifest
 */
function loadManifest(contextId) {
  const manifestPath = getManifestPath(contextId)
  
  if (fs.existsSync(manifestPath)) {
    try {
      const content = fs.readFileSync(manifestPath, 'utf8')
      return JSON.parse(content)
    } catch (err) {
      console.error('❌ Erreur lors du chargement du manifest:', err.message)
    }
  }
  
  // Créer un nouveau manifest
  return {
    contextId,
    createdAt: new Date().toISOString(),
    lastUpdated: null,
    lastAgent: null,
    blocks: [],
    pages: [],
    media: [],
    agents: {}
  }
}

/**
 * Sauvegarder le manifest global
 * 
 * @param {string} contextId - UUID du contexte
 * @param {object} manifest - Manifest à sauvegarder
 */
function saveManifest(contextId, manifest) {
  const manifestPath = getManifestPath(contextId)
  const outDir = path.dirname(manifestPath)
  
  // S'assurer que le dossier existe
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  
  // Sauvegarder
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  console.log(`📦 Manifest mis à jour: ${manifestPath}`)
}

/**
 * Obtenir le chemin du manifest
 * 
 * @param {string} contextId - UUID du contexte
 * @returns {string} Chemin du manifest
 */
function getManifestPath(contextId) {
  return path.join(__dirname, '..', '..', 'out', contextId, 'manifest.json')
}

/**
 * Ajouter un fichier au manifest
 * 
 * @param {string} contextId - UUID du contexte
 * @param {string} agentName - Nom de l'agent
 * @param {string} filePath - Chemin du fichier
 */
function addFile(contextId, agentName, filePath) {
  const manifest = loadManifest(contextId)
  
  if (!manifest.agents[agentName]) {
    manifest.agents[agentName] = { files: [] }
  }
  
  if (!manifest.agents[agentName].files) {
    manifest.agents[agentName].files = []
  }
  
  manifest.agents[agentName].files.push(filePath)
  
  saveManifest(contextId, manifest)
}

/**
 * Ajouter un bloc au manifest
 * 
 * @param {string} contextId - UUID du contexte
 * @param {string} blockName - Nom du bloc
 */
function addBlock(contextId, blockName) {
  const manifest = loadManifest(contextId)
  
  if (!manifest.blocks.includes(blockName)) {
    manifest.blocks.push(blockName)
    saveManifest(contextId, manifest)
  }
}

/**
 * Ajouter une page au manifest
 * 
 * @param {string} contextId - UUID du contexte
 * @param {string} pageName - Nom de la page
 */
function addPage(contextId, pageName) {
  const manifest = loadManifest(contextId)
  
  if (!manifest.pages.includes(pageName)) {
    manifest.pages.push(pageName)
    saveManifest(contextId, manifest)
  }
}

/**
 * Ajouter un média au manifest
 * 
 * @param {string} contextId - UUID du contexte
 * @param {object} media - Objet média { id, type, url, alt }
 */
function addMedia(contextId, media) {
  const manifest = loadManifest(contextId)
  
  // Vérifier que le média n'existe pas déjà
  const exists = manifest.media.some(m => m.id === media.id)
  
  if (!exists) {
    manifest.media.push(media)
    saveManifest(contextId, manifest)
  }
}

/**
 * Obtenir le résumé du manifest
 * 
 * @param {string} contextId - UUID du contexte
 * @returns {object} Résumé
 */
function getManifestSummary(contextId) {
  const manifest = loadManifest(contextId)
  
  return {
    contextId: manifest.contextId,
    totalBlocks: manifest.blocks.length,
    totalPages: manifest.pages.length,
    totalMedia: manifest.media.length,
    agents: Object.keys(manifest.agents).length,
    createdAt: manifest.createdAt,
    lastUpdated: manifest.lastUpdated,
    lastAgent: manifest.lastAgent
  }
}

/**
 * Nettoyer les anciens manifests
 * 
 * @param {number} daysOld - Nombre de jours avant suppression
 * @returns {number} Nombre de manifests supprimés
 */
function cleanupOldManifests(daysOld = 7) {
  const outDir = path.join(__dirname, '..', '..', 'out')
  
  if (!fs.existsSync(outDir)) {
    return 0
  }
  
  const now = Date.now()
  const maxAge = daysOld * 24 * 60 * 60 * 1000
  let deleted = 0
  
  const dirs = fs.readdirSync(outDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
  
  dirs.forEach(dir => {
    const dirPath = path.join(outDir, dir.name)
    const manifestPath = path.join(dirPath, 'manifest.json')
    
    if (fs.existsSync(manifestPath)) {
      const stats = fs.statSync(manifestPath)
      const age = now - stats.mtimeMs
      
      if (age > maxAge) {
        try {
          fs.rmSync(dirPath, { recursive: true, force: true })
          deleted++
          console.log(`🧹 Supprimé: ${dir.name} (${Math.floor(age / (24 * 60 * 60 * 1000))} jours)`)
        } catch (err) {
          console.error(`❌ Erreur lors de la suppression de ${dir.name}:`, err.message)
        }
      }
    }
  })
  
  return deleted
}

module.exports = {
  updateManifest,
  loadManifest,
  saveManifest,
  getManifestPath,
  addFile,
  addBlock,
  addPage,
  addMedia,
  getManifestSummary,
  cleanupOldManifests
}
