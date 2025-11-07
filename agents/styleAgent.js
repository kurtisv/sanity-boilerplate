/**
 * 🎨 STYLE AGENT - Conventions de design
 * 
 * Rôle: Valide les conventions de design et de thème dans les schémas Sanity
 * 
 * Validations:
 * - Couleurs HEX avec regex validation
 * - Format options.list correct
 * - initialValue pour layout/theme
 * - Cohérence des couleurs
 * - Conventions de nommage
 * - Valeurs par défaut pour le design
 * - Accessibilité (contraste, tailles)
 */

const fs = require('fs')
const path = require('path')
const { createHandover, getOrCreateContextId } = require('./core/contracts')
const { eventBus, publishAgentEvent } = require('./core/eventBus')
const { updateManifest } = require('./core/artifacts')

function scanFiles(dir, predicate) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...scanFiles(full, predicate))
    else if (predicate(full)) out.push(full)
  }
  return out
}

async function run({ handover = null, dryRun = false, generatePatch = false } = {}) {
  const startTime = Date.now()
  console.log('\n🎨 STYLE AGENT - Conventions de design')
  console.log('='.repeat(80))
  
  // Obtenir ou créer contextId
  const contextId = getOrCreateContextId(handover)
  
  // Publier événement de démarrage
  publishAgentEvent('styleAgent', 'start', { contextId })
  
  const root = path.join(process.cwd(), 'src', 'sanity', 'schemas', 'blocks')
  const files = fs.existsSync(root) ? scanFiles(root, (f) => f.endsWith('.ts')) : []
  
  console.log(`\n📁 Analyse de ${files.length} fichiers...\n`)

  const issues = []
  const suggestions = []

  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8')
    const relativePath = path.relative(process.cwd(), file)
    let fileIssues = []
    let fileSuggestions = []

    // VALIDATION 1: HEX colors avec regex
    const hasColorString = /(name:\s*'[^']*color'|title:\s*'[^']*Color')\s*[\s\S]*?type:\s*'string'/.test(code)
    if (hasColorString) {
      const hasRegex = /validation:\s*Rule\s*=>\s*Rule\.regex\(\s*\/\^#\(\[A-Fa-f0-9\]\{6\}\|\[A-Fa-f0-9\]\{3\}\)\$\/\s*\)/.test(code)
      const hasHexDesc = /description:\s*'Hex color code/.test(code)
      if (!hasRegex || !hasHexDesc) {
        fileIssues.push({
          type: 'color',
          severity: 'error',
          message: 'Color string without regex validation and/or hex description',
          suggestion: "Add: validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)"
        })
      }
    }

    // VALIDATION 2: options.list format
    if (/options:\s*{\s*list:\s*\[\s*['"]/m.test(code)) {
      fileIssues.push({
        type: 'options',
        severity: 'error',
        message: 'options.list uses raw strings; should be [{ title, value }]',
        suggestion: 'Use format: [{ title: "Label", value: "value" }]'
      })
    }

    // VALIDATION 3: Layout/theme fields avec initialValue
    const layoutFields = ['layout', 'theme', 'size', 'gridColumns', 'backgroundColor', 'textColor']
    for (const lf of layoutFields) {
      const hasField = new RegExp(`name:\\s*'${lf}'`).test(code)
      if (hasField && !new RegExp(`name:\\s*'${lf}'[\\s\\S]*?initialValue:`).test(code)) {
        fileIssues.push({
          type: 'initialValue',
          severity: 'warning',
          message: `Field '${lf}' missing initialValue`,
          suggestion: `Add initialValue for consistent defaults`
        })
      }
    }
    
    // VALIDATION 4: Couleurs par défaut cohérentes
    const colorMatches = code.match(/initialValue:\s*'#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})'/g)
    if (colorMatches && colorMatches.length > 0) {
      const colors = colorMatches.map(m => m.match(/#[A-Fa-f0-9]{3,6}/)[0])
      // Vérifier la cohérence (pas trop de couleurs différentes)
      const uniqueColors = [...new Set(colors)]
      if (uniqueColors.length > 5) {
        fileSuggestions.push({
          type: 'design',
          message: `${uniqueColors.length} different default colors found - consider using a color palette`,
          colors: uniqueColors
        })
      }
    }
    
    // VALIDATION 5: Tailles de police accessibles
    const fontSizeMatches = code.match(/fontSize['"]?:\s*['"](\d+)/g)
    if (fontSizeMatches) {
      fontSizeMatches.forEach(match => {
        const size = parseInt(match.match(/\d+/)[0])
        if (size < 12) {
          fileIssues.push({
            type: 'accessibility',
            severity: 'warning',
            message: `Font size ${size}px is too small (minimum 12px recommended)`,
            suggestion: 'Use at least 12px for body text'
          })
        }
      })
    }
    
    // VALIDATION 6: Conventions de nommage
    const fieldNames = code.match(/name:\s*'([^']+)'/g)
    if (fieldNames) {
      fieldNames.forEach(match => {
        const name = match.match(/'([^']+)'/)[1]
        // Vérifier camelCase
        if (!/^[a-z][a-zA-Z0-9]*$/.test(name) && name !== '_type' && name !== '_key') {
          fileIssues.push({
            type: 'naming',
            severity: 'warning',
            message: `Field name '${name}' should use camelCase`,
            suggestion: 'Use camelCase for field names (e.g., backgroundColor, not background_color)'
          })
        }
      })
    }
    
    // VALIDATION 7: Spacing/padding cohérent
    const spacingValues = code.match(/(padding|margin|spacing).*?['"](\d+)/gi)
    if (spacingValues && spacingValues.length > 0) {
      const values = spacingValues.map(v => parseInt(v.match(/\d+/)[0]))
      const hasInconsistent = values.some(v => v % 4 !== 0 && v % 8 !== 0)
      if (hasInconsistent) {
        fileSuggestions.push({
          type: 'design',
          message: 'Consider using 4px or 8px spacing increments for consistency',
          values: [...new Set(values)]
        })
      }
    }

    if (fileIssues.length > 0) {
      issues.push({ 
        file: relativePath, 
        issues: fileIssues,
        totalIssues: fileIssues.length,
        errors: fileIssues.filter(i => i.severity === 'error').length,
        warnings: fileIssues.filter(i => i.severity === 'warning').length
      })
      
      const errorCount = fileIssues.filter(i => i.severity === 'error').length
      const warningCount = fileIssues.filter(i => i.severity === 'warning').length
      console.log(`  ⚠️  ${relativePath} - ${errorCount} erreur(s), ${warningCount} avertissement(s)`)
    } else {
      console.log(`  ✅ ${relativePath} - Aucun problème`)
    }
    
    if (fileSuggestions.length > 0) {
      suggestions.push({
        file: relativePath,
        suggestions: fileSuggestions
      })
    }
  }
  
  // Calculer les statistiques
  const duration = Date.now() - startTime
  const totalErrors = issues.reduce((sum, i) => sum + i.errors, 0)
  const totalWarnings = issues.reduce((sum, i) => sum + i.warnings, 0)
  const filesWithIssues = issues.length
  const filesClean = files.length - filesWithIssues
  
  // Afficher le résumé
  console.log('\n' + '='.repeat(80))
  console.log('📊 RÉSUMÉ DES CONVENTIONS DE DESIGN')
  console.log('='.repeat(80))
  console.log(`Fichiers analysés: ${files.length}`)
  console.log(`Fichiers conformes: ${filesClean}`)
  console.log(`Fichiers avec problèmes: ${filesWithIssues}`)
  console.log(`Erreurs: ${totalErrors}`)
  console.log(`Avertissements: ${totalWarnings}`)
  console.log(`Suggestions: ${suggestions.length}`)
  console.log(`Durée: ${duration}ms`)
  console.log('='.repeat(80))
  
  // Générer un patch si demandé
  if (generatePatch && issues.length > 0) {
    const patchPath = generateDesignPatch(contextId, issues)
    console.log(`\n📝 Patch généré: ${patchPath}`)
  }
  
  // Créer le handover
  const nextHandover = createHandover(
    contextId,
    totalErrors === 0 ? 'ready' : 'blocked',
    'compatibilityAgent',
    'style',
    {
      files: files.map(f => path.relative(process.cwd(), f)),
      report: {
        filesAnalyzed: files.length,
        filesClean,
        filesWithIssues,
        totalErrors,
        totalWarnings,
        suggestions: suggestions.length
      },
      errors: totalErrors > 0 ? [`${totalErrors} style errors found`] : [],
      notes: 'Design conventions validation',
      duration
    }
  )
  
  // Sauvegarder le handover
  if (!dryRun) {
    saveHandover(contextId, nextHandover, issues, suggestions)
  }
  
  // Publier événement
  if (totalErrors === 0) {
    publishAgentEvent('styleAgent', 'ready', { 
      contextId, 
      filesAnalyzed: files.length,
      duration 
    })
  } else {
    publishAgentEvent('styleAgent', 'blocked', { 
      contextId, 
      errors: totalErrors,
      warnings: totalWarnings
    })
  }

  return { 
    ok: totalErrors === 0, 
    issues,
    suggestions,
    handover: nextHandover,
    contextId,
    stats: {
      filesAnalyzed: files.length,
      filesClean,
      filesWithIssues,
      totalErrors,
      totalWarnings,
      duration
    }
  }
}

/**
 * Sauvegarder le handover et les rapports
 */
function saveHandover(contextId, handover, issues, suggestions) {
  const outDir = path.join(__dirname, '..', 'out', contextId)
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  
  // Sauvegarder le handover
  const handoverPath = path.join(outDir, 'style-handover.json')
  fs.writeFileSync(handoverPath, JSON.stringify(handover, null, 2))
  
  // Sauvegarder le rapport des issues
  const issuesPath = path.join(outDir, 'style-issues.json')
  fs.writeFileSync(issuesPath, JSON.stringify({ issues }, null, 2))
  
  // Sauvegarder les suggestions
  if (suggestions.length > 0) {
    const suggestionsPath = path.join(outDir, 'style-suggestions.json')
    fs.writeFileSync(suggestionsPath, JSON.stringify({ suggestions }, null, 2))
  }
  
  console.log(`\n📦 Handover sauvegardé: ${handoverPath}`)
  console.log(`📄 Issues sauvegardées: ${issuesPath}`)
  if (suggestions.length > 0) {
    console.log(`💡 Suggestions sauvegardées: ${path.join(outDir, 'style-suggestions.json')}`)
  }
}

/**
 * Générer un patch .diff pour les corrections de design
 */
function generateDesignPatch(contextId, issues) {
  const outDir = path.join(__dirname, '..', 'out', contextId)
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  
  const patchPath = path.join(outDir, 'design-fixes.patch')
  let patchContent = '# DESIGN FIXES PATCH\n'
  patchContent += `# Generated: ${new Date().toISOString()}\n`
  patchContent += `# Context: ${contextId}\n\n`
  
  issues.forEach(({ file, issues: fileIssues }) => {
    patchContent += `\n## ${file}\n\n`
    fileIssues.forEach((issue, index) => {
      patchContent += `### Issue ${index + 1}: ${issue.type}\n`
      patchContent += `**Severity:** ${issue.severity}\n`
      patchContent += `**Message:** ${issue.message}\n`
      if (issue.suggestion) {
        patchContent += `**Suggestion:** ${issue.suggestion}\n`
      }
      patchContent += '\n'
    })
  })
  
  fs.writeFileSync(patchPath, patchContent)
  return patchPath
}

if (require.main === module) {
  const generatePatch = process.argv.includes('--generate-patch')
  const dryRun = !process.argv.includes('--dry-run=false')
  
  run({ generatePatch, dryRun }).then((res) => {
    console.log('\n📄 styleAgent result:', JSON.stringify(res.stats, null, 2))
    process.exit(res.ok ? 0 : 1)
  })
}

module.exports = { run }
