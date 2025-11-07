/**
 * 📡 EVENT BUS
 * 
 * Système de communication interne entre agents.
 * Les agents publient des événements et s'abonnent à ceux qu'ils doivent surveiller.
 * 
 * Événements standards:
 * - agent:ready - Un agent a terminé avec succès
 * - agent:blocked - Un agent est bloqué
 * - agent:error - Un agent a rencontré une erreur
 * - agent:fixed - Un agent a corrigé des erreurs
 * - pipeline:start - Le pipeline démarre
 * - pipeline:complete - Le pipeline est terminé
 * - pipeline:failed - Le pipeline a échoué
 */

const EventEmitter = require('events')
const fs = require('fs')
const path = require('path')

class AgentEventBus extends EventEmitter {
  constructor() {
    super()
    this.history = []
    this.maxHistorySize = 1000
    this.logFile = path.join(__dirname, '..', '..', 'out', 'event-bus.log')
    
    // S'assurer que le dossier out existe
    const outDir = path.dirname(this.logFile)
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true })
    }
  }
  
  /**
   * Publier un événement
   * 
   * @param {string} eventName - Nom de l'événement
   * @param {object} data - Données de l'événement
   */
  publish(eventName, data = {}) {
    const event = {
      name: eventName,
      timestamp: new Date().toISOString(),
      data
    }
    
    // Ajouter à l'historique
    this.history.push(event)
    if (this.history.length > this.maxHistorySize) {
      this.history.shift()
    }
    
    // Logger dans le fichier
    this.logEvent(event)
    
    // Émettre l'événement
    this.emit(eventName, data)
    
    console.log(`📡 Event: ${eventName}`, data.agent ? `[${data.agent}]` : '')
  }
  
  /**
   * S'abonner à un événement
   * 
   * @param {string} eventName - Nom de l'événement
   * @param {function} handler - Fonction de callback
   */
  subscribe(eventName, handler) {
    this.on(eventName, handler)
  }
  
  /**
   * Se désabonner d'un événement
   * 
   * @param {string} eventName - Nom de l'événement
   * @param {function} handler - Fonction de callback
   */
  unsubscribe(eventName, handler) {
    this.off(eventName, handler)
  }
  
  /**
   * Logger un événement dans le fichier
   * 
   * @param {object} event - Événement à logger
   */
  logEvent(event) {
    try {
      const logLine = `${event.timestamp} | ${event.name} | ${JSON.stringify(event.data)}\n`
      fs.appendFileSync(this.logFile, logLine)
    } catch (err) {
      console.error('❌ Erreur lors du logging de l\'événement:', err.message)
    }
  }
  
  /**
   * Obtenir l'historique des événements
   * 
   * @param {string|null} eventName - Filtrer par nom d'événement (optionnel)
   * @param {number} limit - Nombre maximum d'événements à retourner
   * @returns {array} Liste des événements
   */
  getHistory(eventName = null, limit = 100) {
    let events = this.history
    
    if (eventName) {
      events = events.filter(e => e.name === eventName)
    }
    
    return events.slice(-limit)
  }
  
  /**
   * Effacer l'historique
   */
  clearHistory() {
    this.history = []
    console.log('🧹 Historique des événements effacé')
  }
  
  /**
   * Obtenir les statistiques des événements
   * 
   * @returns {object} Statistiques
   */
  getStats() {
    const stats = {}
    
    this.history.forEach(event => {
      if (!stats[event.name]) {
        stats[event.name] = 0
      }
      stats[event.name]++
    })
    
    return {
      total: this.history.length,
      byType: stats,
      oldest: this.history[0]?.timestamp,
      newest: this.history[this.history.length - 1]?.timestamp
    }
  }
}

// Instance singleton
const eventBus = new AgentEventBus()

/**
 * Événements standards pour les agents
 */
const AgentEvents = {
  // Événements d'agent
  AGENT_READY: 'agent:ready',
  AGENT_BLOCKED: 'agent:blocked',
  AGENT_ERROR: 'agent:error',
  AGENT_FIXED: 'agent:fixed',
  AGENT_START: 'agent:start',
  
  // Événements de pipeline
  PIPELINE_START: 'pipeline:start',
  PIPELINE_COMPLETE: 'pipeline:complete',
  PIPELINE_FAILED: 'pipeline:failed',
  
  // Événements de build
  BUILD_START: 'build:start',
  BUILD_SUCCESS: 'build:success',
  BUILD_FAILED: 'build:failed',
  
  // Événements de correction
  FIX_APPLIED: 'fix:applied',
  FIX_FAILED: 'fix:failed',
  
  // Événements de publication
  PUBLISH_START: 'publish:start',
  PUBLISH_SUCCESS: 'publish:success',
  PUBLISH_FAILED: 'publish:failed'
}

/**
 * Helper pour publier un événement d'agent
 * 
 * @param {string} agentName - Nom de l'agent
 * @param {string} status - ready | blocked | error | start
 * @param {object} data - Données supplémentaires
 */
function publishAgentEvent(agentName, status, data = {}) {
  const eventMap = {
    ready: AgentEvents.AGENT_READY,
    blocked: AgentEvents.AGENT_BLOCKED,
    error: AgentEvents.AGENT_ERROR,
    start: AgentEvents.AGENT_START
  }
  
  const eventName = eventMap[status] || AgentEvents.AGENT_ERROR
  
  eventBus.publish(eventName, {
    agent: agentName,
    status,
    ...data
  })
}

/**
 * Helper pour publier un événement de pipeline
 * 
 * @param {string} status - start | complete | failed
 * @param {object} data - Données supplémentaires
 */
function publishPipelineEvent(status, data = {}) {
  const eventMap = {
    start: AgentEvents.PIPELINE_START,
    complete: AgentEvents.PIPELINE_COMPLETE,
    failed: AgentEvents.PIPELINE_FAILED
  }
  
  const eventName = eventMap[status] || AgentEvents.PIPELINE_FAILED
  
  eventBus.publish(eventName, {
    status,
    ...data
  })
}

module.exports = {
  eventBus,
  AgentEvents,
  publishAgentEvent,
  publishPipelineEvent
}
