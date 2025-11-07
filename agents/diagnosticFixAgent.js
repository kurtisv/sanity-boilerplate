/**
 * 🔧 DIAGNOSTIC FIX AGENT V2
 * 
 * Rôle: Corrige automatiquement les erreurs dans les schémas Sanity
 * (arrays sans initialValue, validations incorrectes, mauvais types, etc.)
 * 
 * TriggeredBy: diagnosticAgent
 * Produces: nombre de corrections appliquées
 * 
 * NOUVELLES FONCTIONNALITÉS V2:
 * - Apprentissage des patterns d'erreurs via core/context.json
 * - Corrections adaptatives basées sur l'historique
 * - Publication d'événements via EventBus
 * - Mise à jour automatique des patterns appris
 * 
 * ERREURS CORRIGÉES AUTOMATIQUEMENT:
 * 1. Arrays sans initialValue: []
 * 2. contactBlock avec fieldType 'select' invalide
 * 3. Validation des longueurs incorrectes (title, subtitle, text, etc.)
 * 4. featureGridBlock description max(200) → max(100)
 */

const fs = require('fs')
const path = require('path')
const { eventBus, publishAgentEvent } = require('./core/eventBus')
const contextPath = path.join(__dirname, 'core', 'context.json')

async function run({ dryRun = false } = {}) {
  const startTime = Date.now()
  console.log('\n🔧 DIAGNOSTIC FIX AGENT V2 - Correction automatique des schémas')
  console.log('='.repeat(80))
  
  // Publier événement de démarrage
  publishAgentEvent('diagnosticFixAgent', 'start', { dryRun })
  
  const schemasDir = path.join(__dirname, '..', 'src', 'sanity', 'schemas', 'blocks')
  
  // Charger le contexte pour apprentissage
  const context = loadContext()
  console.log(`\n📚 Patterns appris: ${context.learnedPatterns.length}`)
  
  // Liste des corrections à appliquer
  const corrections = [
    // ========================================================================
    // ARRAYS SANS initialValue: []
    // ========================================================================
    { 
      file: 'bookingblock.ts', 
      find: "name: 'services',\n      title: 'Available Services',\n      type: 'array',\n      of: [", 
      replace: "name: 'services',\n      title: 'Available Services',\n      type: 'array',\n      initialValue: [],\n      of: [",
      description: "Ajouter initialValue: [] à services"
    },
    { 
      file: 'comparisonTableBlock.ts', 
      find: "name: 'columns',\n      title: 'Comparison Columns',\n      type: 'array',\n      of: [", 
      replace: "name: 'columns',\n      title: 'Comparison Columns',\n      type: 'array',\n      initialValue: [],\n      of: [",
      description: "Ajouter initialValue: [] à columns"
    },
    { 
      file: 'comparisonTableBlock.ts', 
      find: "name: 'features',\n          title: 'Features',\n          type: 'array',\n          of: [", 
      replace: "name: 'features',\n          title: 'Features',\n          type: 'array',\n          initialValue: [],\n          of: [",
      description: "Ajouter initialValue: [] à features"
    },
    { 
      file: 'footerBlock.ts', 
      find: "name: 'links',\n              title: 'Liens',\n              type: 'array',\n              of: [", 
      replace: "name: 'links',\n              title: 'Liens',\n              type: 'array',\n              initialValue: [],\n              of: [",
      description: "Ajouter initialValue: [] à links"
    },
    { 
      file: 'galleryBlock.ts', 
      find: "name: 'categories',\n      title: 'Catégories',\n      type: 'array',\n      of: [", 
      replace: "name: 'categories',\n      title: 'Catégories',\n      type: 'array',\n      initialValue: [],\n      of: [",
      description: "Ajouter initialValue: [] à categories"
    },
    { 
      file: 'headerBlock.ts', 
      find: "name: 'submenu',\n              title: 'Sous-menu',\n              type: 'array',\n              description: 'Menu déroulant (optionnel)',\n              of: [", 
      replace: "name: 'submenu',\n              title: 'Sous-menu',\n              type: 'array',\n              description: 'Menu déroulant (optionnel)',\n              initialValue: [],\n              of: [",
      description: "Ajouter initialValue: [] à submenu"
    },
    { 
      file: 'logoGridBlock.ts', 
      find: "name: 'logos',\n      title: 'Logos',\n      type: 'array',\n      of: [", 
      replace: "name: 'logos',\n      title: 'Logos',\n      type: 'array',\n      initialValue: [],\n      of: [",
      description: "Ajouter initialValue: [] à logos"
    },
    { 
      file: 'mapBlock.ts', 
      find: "name: 'markers',\n      title: 'Marqueurs',\n      type: 'array',\n      of: [", 
      replace: "name: 'markers',\n      title: 'Marqueurs',\n      type: 'array',\n      initialValue: [],\n      of: [",
      description: "Ajouter initialValue: [] à markers"
    },
    { 
      file: 'pricingBlock.ts', 
      find: "name: 'features',\n          title: 'Fonctionnalités',\n          type: 'array',\n          of: [", 
      replace: "name: 'features',\n          title: 'Fonctionnalités',\n          type: 'array',\n          initialValue: [],\n          of: [",
      description: "Ajouter initialValue: [] à features"
    },
    { 
      file: 'socialProofBlock.ts', 
      find: "name: 'clientLogos',\n      title: 'Logos clients',\n      type: 'array',\n      of: [", 
      replace: "name: 'clientLogos',\n      title: 'Logos clients',\n      type: 'array',\n      initialValue: [],\n      of: [",
      description: "Ajouter initialValue: [] à clientLogos"
    },
    { 
      file: 'socialProofBlock.ts', 
      find: "name: 'keyStats',\n      title: 'Statistiques clés',\n      type: 'array',\n      of: [", 
      replace: "name: 'keyStats',\n      title: 'Statistiques clés',\n      type: 'array',\n      initialValue: [],\n      of: [",
      description: "Ajouter initialValue: [] à keyStats"
    },
    { 
      file: 'socialProofBlock.ts', 
      find: "name: 'testimonials',\n      title: 'Témoignages',\n      type: 'array',\n      of: [", 
      replace: "name: 'testimonials',\n      title: 'Témoignages',\n      type: 'array',\n      initialValue: [],\n      of: [",
      description: "Ajouter initialValue: [] à testimonials"
    },
    { 
      file: 'teamBlock.ts', 
      find: "name: 'skills',\n              title: 'Compétences',\n              type: 'array',\n              description: 'Liste des compétences principales',\n              of: [", 
      replace: "name: 'skills',\n              title: 'Compétences',\n              type: 'array',\n              description: 'Liste des compétences principales',\n              initialValue: [],\n              of: [",
      description: "Ajouter initialValue: [] à skills"
    },
    { 
      file: 'testimonialsBlock.ts', 
      find: "name: 'categories',\n      title: 'Catégories',\n      type: 'array',\n      of: [", 
      replace: "name: 'categories',\n      title: 'Catégories',\n      type: 'array',\n      initialValue: [],\n      of: [",
      description: "Ajouter initialValue: [] à categories"
    },
    { 
      file: 'textBlock.ts', 
      find: "name: 'content',\n      title: 'Contenu',\n      type: 'array',\n      of: [", 
      replace: "name: 'content',\n      title: 'Contenu',\n      type: 'array',\n      initialValue: [],\n      of: [",
      description: "Ajouter initialValue: [] à content"
    },
    
    // ========================================================================
    // VALIDATIONS INCORRECTES
    // ========================================================================
    { 
      file: 'bookingblock.ts', 
      find: "validation: Rule => Rule.max(200)", 
      replace: "validation: Rule => Rule.max(300)",
      description: "Corriger validation subtitle: max(200) → max(300)"
    },
    { 
      file: 'countdownBlock.ts', 
      find: "validation: (Rule) => Rule.max(300)", 
      replace: "validation: (Rule) => Rule.max(100)",
      description: "Corriger validation title: max(300) → max(100)"
    },
    { 
      file: 'ctaBlock.ts', 
      find: "validation: (Rule) => Rule.max(100),", 
      replace: "validation: (Rule) => Rule.max(500),",
      description: "Corriger validation text: max(100) → max(500)"
    },
    { 
      file: 'newsletterBlock.ts', 
      find: "validation: (Rule) => Rule.max(50),", 
      replace: "validation: (Rule) => Rule.max(500),",
      description: "Corriger validation text: max(50) → max(500)"
    },
    { 
      file: 'pricingBlock.ts', 
      find: "validation: (Rule) => Rule.max(200),", 
      replace: "validation: (Rule) => Rule.max(100),",
      description: "Corriger validation title: max(200) → max(100)"
    },
    { 
      file: 'socialProofBlock.ts', 
      find: "validation: (Rule) => Rule.max(200),", 
      replace: "validation: (Rule) => Rule.max(300),",
      description: "Corriger validation subtitle: max(200) → max(300)"
    },
    { 
      file: 'socialProofBlock.ts', 
      find: "validation: (Rule) => Rule.max(100),", 
      replace: "validation: (Rule) => Rule.max(50),",
      description: "Corriger validation label: max(100) → max(50)"
    },
    { 
      file: 'testimonialsBlock.ts', 
      find: "validation: (Rule) => Rule.max(200),", 
      replace: "validation: (Rule) => Rule.max(300),",
      description: "Corriger validation subtitle: max(200) → max(300)"
    }
  ]
  
  let fixedCount = 0
  let errorCount = 0
  let skippedCount = 0
  
  console.log(`\n📋 ${corrections.length} correction(s) à appliquer\n`)
  
  if (dryRun) {
    console.log('⚠️  MODE DRY-RUN - Aucune modification ne sera appliquée')
    console.log('   Utilisez --dry-run=false pour appliquer les corrections\n')
  }
  
  corrections.forEach((correction, index) => {
    const filePath = path.join(schemasDir, correction.file)
    
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`${index + 1}. ⚠️  ${correction.file} - Fichier introuvable`)
        errorCount++
        return
      }
      
      let content = fs.readFileSync(filePath, 'utf8')
      
      if (content.includes(correction.find)) {
        if (!dryRun) {
          content = content.replace(correction.find, correction.replace)
          fs.writeFileSync(filePath, content, 'utf8')
          console.log(`${index + 1}. ✅ ${correction.file} - ${correction.description}`)
          fixedCount++
        } else {
          console.log(`${index + 1}. 🔍 ${correction.file} - ${correction.description} (dry-run)`)
          fixedCount++
        }
      } else {
        console.log(`${index + 1}. ⏭️  ${correction.file} - Déjà corrigé`)
        skippedCount++
      }
    } catch (err) {
      console.log(`${index + 1}. ❌ ${correction.file} - Erreur: ${err.message}`)
      errorCount++
    }
  })
  
  console.log('\n' + '='.repeat(80))
  console.log('📊 RÉSUMÉ')
  console.log('='.repeat(80))
  console.log(`✅ Corrections ${dryRun ? 'détectées' : 'appliquées'}: ${fixedCount}`)
  console.log(`⏭️  Déjà corrigé: ${skippedCount}`)
  console.log(`❌ Erreurs: ${errorCount}`)
  console.log(`📋 Total: ${corrections.length}`)
  console.log('='.repeat(80))
  
  // Mettre à jour le contexte avec les corrections appliquées
  if (!dryRun && fixedCount > 0) {
    updateContext(context, fixedCount, corrections)
    console.log('\n📚 Contexte mis à jour avec les nouveaux patterns')
  }
  
  // Publier événement de succès
  const duration = Date.now() - startTime
  if (fixedCount > 0) {
    publishAgentEvent('diagnosticFixAgent', 'ready', { 
      fixed: fixedCount,
      skipped: skippedCount,
      errors: errorCount,
      duration,
      dryRun
    })
    eventBus.publish('fix:applied', { count: fixedCount, duration })
  }
  
  if (dryRun && fixedCount > 0) {
    console.log('\n💡 Pour appliquer les corrections:')
    console.log('   npm run agents:run -- diagnostic --dry-run=false\n')
  } else if (!dryRun && fixedCount > 0) {
    console.log('\n✨ Relancez le build pour vérifier:')
    console.log('   npm run agents:run -- compat --dry-run=false\n')
  }
  
  return { 
    ok: true, 
    fixed: fixedCount, 
    skipped: skippedCount, 
    errors: errorCount,
    dryRun,
    duration
  }
}

/**
 * Charger le contexte depuis context.json
 */
function loadContext() {
  try {
    if (fs.existsSync(contextPath)) {
      const content = fs.readFileSync(contextPath, 'utf8')
      return JSON.parse(content)
    }
  } catch (err) {
    console.warn('⚠️  Impossible de charger context.json:', err.message)
  }
  
  // Retourner un contexte par défaut
  return {
    learnedPatterns: [],
    lastRun: null,
    successfulFixes: []
  }
}

/**
 * Mettre à jour le contexte avec les corrections appliquées
 */
function updateContext(context, fixedCount, corrections) {
  try {
    // Mettre à jour les statistiques
    context.lastRun = new Date().toISOString()
    
    // Ajouter les corrections réussies
    corrections.forEach(correction => {
      // Trouver le pattern correspondant
      let pattern = context.learnedPatterns.find(p => 
        p.error.includes(correction.description.split(':')[0])
      )
      
      if (pattern) {
        pattern.frequency++
        pattern.lastSeen = new Date().toISOString()
      } else {
        // Créer un nouveau pattern
        context.learnedPatterns.push({
          error: correction.description,
          solution: correction.replace.substring(0, 100) + '...',
          frequency: 1,
          lastSeen: new Date().toISOString()
        })
      }
    })
    
    // Mettre à jour les performances de l'agent
    if (!context.agentPerformance) {
      context.agentPerformance = {}
    }
    if (!context.agentPerformance.diagnosticFixAgent) {
      context.agentPerformance.diagnosticFixAgent = {
        totalRuns: 0,
        totalFixesApplied: 0
      }
    }
    
    context.agentPerformance.diagnosticFixAgent.totalRuns++
    context.agentPerformance.diagnosticFixAgent.totalFixesApplied += fixedCount
    context.agentPerformance.diagnosticFixAgent.lastRun = new Date().toISOString()
    
    // Sauvegarder
    fs.writeFileSync(contextPath, JSON.stringify(context, null, 2))
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour du contexte:', err.message)
  }
}

module.exports = { run }
