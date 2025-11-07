/**
 * 📜 CONTRAT UNIVERSEL DE HANDOVER
 * 
 * Format JSON strict que tous les agents doivent respecter pour communiquer.
 * Garantit la cohérence et la traçabilité à travers toute la cascade.
 */

const { v4: uuidv4 } = require('uuid')

/**
 * Créer un handover selon le format global
 * 
 * @param {string} contextId - UUID partagé par tous les agents
 * @param {string} status - ready | blocked | done | error
 * @param {string|null} nextAgent - Nom de l'agent suivant
 * @param {string} stage - Nom de l'étape (analysis, build, design, compat, diagnostic, publish, cleanup, etc.)
 * @param {object} data - Données supplémentaires (artifacts, errors, meta)
 * @returns {object} Handover conforme au contrat
 */
function createHandover(contextId, status, nextAgent, stage, data = {}) {
  // Validation des paramètres
  const validStatuses = ['ready', 'blocked', 'done', 'error']
  const validStages = ['analysis', 'build', 'design', 'compat', 'diagnostic', 'publish', 'cleanup', 'pagegen', 'review', 'style', 'test']
  
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}. Must be one of: ${validStatuses.join(', ')}`)
  }
  
  if (!validStages.includes(stage)) {
    console.warn(`⚠️  Stage '${stage}' is not in the standard list. Consider using: ${validStages.join(', ')}`)
  }
  
  return {
    contextId: contextId || uuidv4(),
    status,
    nextAgent,
    stage,
    artifacts: {
      files: data.files || [],
      report: data.report || {},
      plan: data.plan || null,
      pages: data.pages || [],
      manifest: {
        blocks: data.manifest?.blocks || [],
        pages: data.manifest?.pages || [],
        media: data.manifest?.media || []
      }
    },
    errors: data.errors || [],
    meta: {
      timestamp: new Date().toISOString(),
      notes: data.notes || '',
      duration: data.duration || null,
      ...data.meta
    }
  }
}

/**
 * Valider un handover reçu
 * 
 * @param {object} handover - Handover à valider
 * @returns {object} { valid: boolean, errors: string[] }
 */
function validateHandover(handover) {
  const errors = []
  
  if (!handover) {
    return { valid: false, errors: ['Handover is null or undefined'] }
  }
  
  // Vérifier les champs obligatoires
  if (!handover.contextId) errors.push('Missing contextId')
  if (!handover.status) errors.push('Missing status')
  if (!handover.stage) errors.push('Missing stage')
  
  // Vérifier le format du contextId (UUID)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (handover.contextId && !uuidRegex.test(handover.contextId)) {
    errors.push('contextId is not a valid UUID')
  }
  
  // Vérifier le status
  const validStatuses = ['ready', 'blocked', 'done', 'error']
  if (handover.status && !validStatuses.includes(handover.status)) {
    errors.push(`Invalid status: ${handover.status}`)
  }
  
  // Vérifier la structure artifacts
  if (handover.artifacts) {
    if (!Array.isArray(handover.artifacts.files)) {
      errors.push('artifacts.files must be an array')
    }
    if (!handover.artifacts.manifest) {
      errors.push('artifacts.manifest is missing')
    } else {
      if (!Array.isArray(handover.artifacts.manifest.blocks)) {
        errors.push('artifacts.manifest.blocks must be an array')
      }
      if (!Array.isArray(handover.artifacts.manifest.pages)) {
        errors.push('artifacts.manifest.pages must be an array')
      }
      if (!Array.isArray(handover.artifacts.manifest.media)) {
        errors.push('artifacts.manifest.media must be an array')
      }
    }
  } else {
    errors.push('artifacts is missing')
  }
  
  // Vérifier meta
  if (!handover.meta) {
    errors.push('meta is missing')
  } else {
    if (!handover.meta.timestamp) {
      errors.push('meta.timestamp is missing')
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Créer un handover bloqué avec raison
 * 
 * @param {string} contextId - UUID du contexte
 * @param {string} stage - Étape actuelle
 * @param {string} nextAgent - Agent suivant (généralement celui qui peut débloquer)
 * @param {string} reason - Raison du blocage
 * @param {array} errors - Liste des erreurs
 * @returns {object} Handover bloqué
 */
function createBlockedHandover(contextId, stage, nextAgent, reason, errors = []) {
  return createHandover(contextId, 'blocked', nextAgent, stage, {
    errors: [reason, ...errors],
    notes: `Blocked: ${reason}`
  })
}

/**
 * Créer un handover de succès
 * 
 * @param {string} contextId - UUID du contexte
 * @param {string} stage - Étape actuelle
 * @param {string} nextAgent - Agent suivant
 * @param {object} artifacts - Artefacts produits
 * @returns {object} Handover ready
 */
function createSuccessHandover(contextId, stage, nextAgent, artifacts = {}) {
  return createHandover(contextId, 'ready', nextAgent, stage, {
    ...artifacts,
    notes: `${stage} completed successfully`
  })
}

/**
 * Créer un handover final (fin de pipeline)
 * 
 * @param {string} contextId - UUID du contexte
 * @param {string} stage - Étape finale
 * @param {object} artifacts - Artefacts finaux
 * @returns {object} Handover done
 */
function createFinalHandover(contextId, stage, artifacts = {}) {
  return createHandover(contextId, 'done', null, stage, {
    ...artifacts,
    notes: `Pipeline completed at ${stage}`
  })
}

/**
 * Extraire le contextId d'un handover ou en créer un nouveau
 * 
 * @param {object|null} handover - Handover reçu
 * @returns {string} UUID du contexte
 */
function getOrCreateContextId(handover) {
  return handover?.contextId || uuidv4()
}

module.exports = {
  createHandover,
  validateHandover,
  createBlockedHandover,
  createSuccessHandover,
  createFinalHandover,
  getOrCreateContextId
}
