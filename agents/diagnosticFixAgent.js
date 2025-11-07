/**
 * 🔧 AGENT DE DIAGNOSTIC ET CORRECTION AUTOMATIQUE
 * 
 * Cet agent analyse tous les schémas Sanity et corrige automatiquement
 * les erreurs critiques identifiées dans la documentation.
 * 
 * ERREURS CORRIGÉES AUTOMATIQUEMENT:
 * 1. Arrays sans initialValue: []
 * 2. contactBlock avec fieldType 'select' invalide
 * 3. featureGridBlock description max(200) → max(100)
 * 4. teamBlock 'teamMembers' → 'members' (optionnel)
 * 5. Validation des longueurs incorrectes
 */

const fs = require('fs')
const path = require('path')
const { applyChanges } = require('./core/fsWorkspace')

async function run({ dryRun = true, fix = 'all' }) {
  console.log('🔍 DIAGNOSTIC ET CORRECTION AUTOMATIQUE DES SCHÉMAS SANITY\n')
  
  const schemasDir = path.join(__dirname, '..', 'src', 'sanity', 'schemas', 'blocks')
  const errors = []
  const fixes = []
  
  // Lire tous les fichiers de schémas
  const schemaFiles = fs.readdirSync(schemasDir).filter(f => f.endsWith('.ts'))
  
  console.log(`📁 Analyse de ${schemaFiles.length} schémas...\n`)
  
  for (const file of schemaFiles) {
    const filePath = path.join(schemasDir, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const blockName = file.replace('.ts', '')
    
    console.log(`🔎 Analyse: ${file}`)
    
    // ERREUR 1: Arrays sans initialValue
    const arrayErrors = checkArraysWithoutInitialValue(content, blockName, file)
    errors.push(...arrayErrors)
    
    // ERREUR 2: contactBlock avec 'select' invalide
    if (blockName === 'contactBlock') {
      const selectError = checkContactBlockSelect(content, blockName, file)
      if (selectError) errors.push(selectError)
    }
    
    // ERREUR 3: featureGridBlock description max incorrect
    if (blockName === 'featureGridBlock') {
      const descError = checkFeatureGridDescription(content, blockName, file)
      if (descError) errors.push(descError)
    }
    
    // ERREUR 4: Validation des longueurs
    const lengthErrors = checkValidationLengths(content, blockName, file)
    errors.push(...lengthErrors)
    
    console.log(`  ${arrayErrors.length + lengthErrors.length} erreur(s) trouvée(s)\n`)
  }
  
  // Afficher le rapport
  console.log('\n' + '='.repeat(80))
  console.log(`📊 RAPPORT DE DIAGNOSTIC`)
  console.log('='.repeat(80) + '\n')
  
  if (errors.length === 0) {
    console.log('✅ AUCUNE ERREUR TROUVÉE! Tous les schémas sont conformes.\n')
    return { ok: true, errors: [], fixes: [] }
  }
  
  console.log(`❌ ${errors.length} ERREUR(S) CRITIQUE(S) TROUVÉE(S):\n`)
  
  // Grouper par type
  const byType = {}
  errors.forEach(err => {
    if (!byType[err.type]) byType[err.type] = []
    byType[err.type].push(err)
  })
  
  Object.keys(byType).forEach(type => {
    console.log(`\n📌 ${type.toUpperCase()} (${byType[type].length})`)
    console.log('-'.repeat(80))
    byType[type].forEach(err => {
      console.log(`  ❌ ${err.file}:${err.line || '?'}`)
      console.log(`     ${err.message}`)
      if (err.fix) {
        console.log(`     💡 Fix: ${err.fix}`)
      }
    })
  })
  
  // Générer les corrections
  if (fix !== 'none') {
    console.log('\n' + '='.repeat(80))
    console.log(`🔧 GÉNÉRATION DES CORRECTIONS`)
    console.log('='.repeat(80) + '\n')
    
    const plan = generateFixPlan(errors, schemasDir)
    
    if (plan.length === 0) {
      console.log('⚠️  Aucune correction automatique disponible pour ces erreurs.\n')
    } else {
      console.log(`📝 ${plan.length} correction(s) à appliquer:\n`)
      plan.forEach((p, i) => {
        console.log(`${i + 1}. ${p.description}`)
      })
      
      if (dryRun) {
        console.log('\n⚠️  MODE DRY-RUN: Les corrections ne seront PAS appliquées.')
        console.log('   Exécutez avec --dry-run=false pour appliquer les corrections.\n')
      } else {
        console.log('\n🚀 Application des corrections...\n')
        const results = await applyChanges(plan, { dryRun: false })
        console.log(`\n✅ ${results.filter(r => r.ok).length}/${results.length} correction(s) appliquée(s) avec succès!\n`)
        fixes.push(...results)
      }
    }
  }
  
  return { ok: errors.length === 0, errors, fixes, summary: byType }
}

/**
 * Vérifier les arrays sans initialValue
 */
function checkArraysWithoutInitialValue(content, blockName, file) {
  const errors = []
  const lines = content.split('\n')
  
  let inArrayField = false
  let arrayName = ''
  let arrayStartLine = 0
  let hasInitialValue = false
  
  lines.forEach((line, index) => {
    // Détecter le début d'un champ array
    if (line.includes("type: 'array'")) {
      inArrayField = true
      arrayStartLine = index + 1
      hasInitialValue = false
      
      // Trouver le nom du champ (ligne précédente généralement)
      for (let i = index - 1; i >= Math.max(0, index - 5); i--) {
        const match = lines[i].match(/name:\s*['"](\w+)['"]/)
        if (match) {
          arrayName = match[1]
          break
        }
      }
    }
    
    // Détecter initialValue
    if (inArrayField && line.includes('initialValue:')) {
      hasInitialValue = true
    }
    
    // Détecter la fin du champ (ligne avec }),)
    if (inArrayField && line.trim().match(/^\}\),?\s*$/)) {
      if (!hasInitialValue) {
        errors.push({
          type: 'array_without_initialValue',
          file,
          line: arrayStartLine,
          field: arrayName,
          message: `Array '${arrayName}' sans initialValue: []`,
          fix: `Ajouter "initialValue: []," après la définition du type array`,
          severity: 'critical'
        })
      }
      inArrayField = false
      arrayName = ''
    }
  })
  
  return errors
}

/**
 * Vérifier contactBlock pour 'select' invalide
 */
function checkContactBlockSelect(content, blockName, file) {
  if (content.includes("value: 'select'")) {
    const lineNumber = content.split('\n').findIndex(l => l.includes("value: 'select'")) + 1
    return {
      type: 'invalid_fieldType',
      file,
      line: lineNumber,
      field: 'fieldType',
      message: "fieldType 'select' est INVALIDE (ligne ~62)",
      fix: "Supprimer la ligne { title: '📋 Sélection', value: 'select' }",
      severity: 'critical'
    }
  }
  return null
}

/**
 * Vérifier featureGridBlock description max
 */
function checkFeatureGridDescription(content, blockName, file) {
  const match = content.match(/name:\s*['"]description['"][\s\S]{0,200}validation:.*Rule\.max\((\d+)\)/)
  if (match && match[1] === '200') {
    const lineNumber = content.split('\n').findIndex(l => l.includes("validation: (Rule) => Rule.max(200)")) + 1
    return {
      type: 'incorrect_validation_length',
      file,
      line: lineNumber,
      field: 'description',
      message: "Description max(200) devrait être max(100) (ligne ~150)",
      fix: "Changer Rule.max(200) → Rule.max(100)",
      severity: 'high'
    }
  }
  return null
}

/**
 * Vérifier les longueurs de validation
 */
function checkValidationLengths(content, blockName, file) {
  const errors = []
  const lines = content.split('\n')
  
  // Règles de validation attendues
  const expectedLengths = {
    title: 100,
    subtitle: 300,
    label: 50,
    placeholder: 100,
    description: 100, // Pour features
    bio: 500,
    text: 500
  }
  
  lines.forEach((line, index) => {
    Object.keys(expectedLengths).forEach(fieldName => {
      // Chercher les validations incorrectes
      const regex = new RegExp(`name:\\s*['"]${fieldName}['"]`)
      if (regex.test(line)) {
        // Chercher la validation dans les 10 lignes suivantes
        for (let i = index; i < Math.min(index + 10, lines.length); i++) {
          const valMatch = lines[i].match(/Rule\.max\((\d+)\)/)
          if (valMatch) {
            const actualMax = parseInt(valMatch[1])
            const expectedMax = expectedLengths[fieldName]
            
            if (actualMax !== expectedMax && fieldName !== 'description') {
              // Exception pour description qui peut varier
              errors.push({
                type: 'incorrect_validation_length',
                file,
                line: i + 1,
                field: fieldName,
                message: `${fieldName} max(${actualMax}) devrait être max(${expectedMax})`,
                fix: `Changer Rule.max(${actualMax}) → Rule.max(${expectedMax})`,
                severity: 'medium'
              })
            }
            break
          }
        }
      }
    })
  })
  
  return errors
}

/**
 * Générer le plan de corrections
 */
function generateFixPlan(errors, schemasDir) {
  const plan = []
  const fileChanges = {}
  
  errors.forEach(error => {
    if (!error.fix) return
    
    const filePath = path.join(schemasDir, error.file)
    
    if (!fileChanges[filePath]) {
      fileChanges[filePath] = {
        file: filePath,
        changes: []
      }
    }
    
    // Générer la correction selon le type d'erreur
    if (error.type === 'array_without_initialValue') {
      fileChanges[filePath].changes.push({
        type: 'add_initialValue',
        field: error.field,
        line: error.line,
        description: `Ajouter initialValue: [] à ${error.field} dans ${error.file}`
      })
    } else if (error.type === 'invalid_fieldType' && error.file === 'contactBlock.ts') {
      fileChanges[filePath].changes.push({
        type: 'remove_select',
        description: `Supprimer fieldType 'select' invalide dans ${error.file}`
      })
    } else if (error.type === 'incorrect_validation_length') {
      fileChanges[filePath].changes.push({
        type: 'fix_validation',
        field: error.field,
        line: error.line,
        description: `Corriger validation de ${error.field} dans ${error.file}`
      })
    }
  })
  
  // Convertir en plan d'actions
  Object.values(fileChanges).forEach(fc => {
    fc.changes.forEach(change => {
      plan.push({
        type: 'edit',
        file: fc.file,
        description: change.description,
        change
      })
    })
  })
  
  return plan
}

module.exports = { run }
