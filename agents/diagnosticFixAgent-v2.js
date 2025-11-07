/**
 * 🔧 DIAGNOSTIC FIX AGENT V2 - AVEC APPLICATION AUTOMATIQUE
 * 
 * Corrige automatiquement les erreurs détectées dans les schémas Sanity
 */

const fs = require('fs')
const path = require('path')

async function run({ dryRun = true } = {}) {
  console.log('\n🔧 DIAGNOSTIC FIX AGENT - Correction automatique des schémas')
  console.log('='.repeat(80))
  
  const schemasDir = path.join(__dirname, '..', 'src', 'sanity', 'schemas', 'blocks')
  
  // Liste des corrections à appliquer
  const corrections = [
    // Arrays sans initialValue
    { file: 'bookingblock.ts', find: "name: 'services',\n      title: 'Available Services',\n      type: 'array',\n      of: [", replace: "name: 'services',\n      title: 'Available Services',\n      type: 'array',\n      initialValue: [],\n      of: [" },
    { file: 'comparisonTableBlock.ts', find: "name: 'columns',\n      title: 'Comparison Columns',\n      type: 'array',\n      of: [", replace: "name: 'columns',\n      title: 'Comparison Columns',\n      type: 'array',\n      initialValue: [],\n      of: [" },
    { file: 'comparisonTableBlock.ts', find: "name: 'features',\n          title: 'Features',\n          type: 'array',\n          of: [", replace: "name: 'features',\n          title: 'Features',\n          type: 'array',\n          initialValue: [],\n          of: [" },
    { file: 'footerBlock.ts', find: "name: 'links',\n              title: 'Liens',\n              type: 'array',\n              of: [", replace: "name: 'links',\n              title: 'Liens',\n              type: 'array',\n              initialValue: [],\n              of: [" },
    { file: 'galleryBlock.ts', find: "name: 'categories',\n      title: 'Catégories',\n      type: 'array',\n      of: [", replace: "name: 'categories',\n      title: 'Catégories',\n      type: 'array',\n      initialValue: [],\n      of: [" },
    { file: 'headerBlock.ts', find: "name: 'submenu',\n              title: 'Sous-menu',\n              type: 'array',\n              description: 'Menu déroulant (optionnel)',\n              of: [", replace: "name: 'submenu',\n              title: 'Sous-menu',\n              type: 'array',\n              description: 'Menu déroulant (optionnel)',\n              initialValue: [],\n              of: [" },
    { file: 'logoGridBlock.ts', find: "name: 'logos',\n      title: 'Logos',\n      type: 'array',\n      of: [", replace: "name: 'logos',\n      title: 'Logos',\n      type: 'array',\n      initialValue: [],\n      of: [" },
    { file: 'mapBlock.ts', find: "name: 'markers',\n      title: 'Marqueurs',\n      type: 'array',\n      of: [", replace: "name: 'markers',\n      title: 'Marqueurs',\n      type: 'array',\n      initialValue: [],\n      of: [" },
    { file: 'pricingBlock.ts', find: "name: 'features',\n          title: 'Fonctionnalités',\n          type: 'array',\n          of: [", replace: "name: 'features',\n          title: 'Fonctionnalités',\n          type: 'array',\n          initialValue: [],\n          of: [" },
    { file: 'socialProofBlock.ts', find: "name: 'clientLogos',\n      title: 'Logos clients',\n      type: 'array',\n      of: [", replace: "name: 'clientLogos',\n      title: 'Logos clients',\n      type: 'array',\n      initialValue: [],\n      of: [" },
    { file: 'socialProofBlock.ts', find: "name: 'keyStats',\n      title: 'Statistiques clés',\n      type: 'array',\n      of: [", replace: "name: 'keyStats',\n      title: 'Statistiques clés',\n      type: 'array',\n      initialValue: [],\n      of: [" },
    { file: 'socialProofBlock.ts', find: "name: 'testimonials',\n      title: 'Témoignages',\n      type: 'array',\n      of: [", replace: "name: 'testimonials',\n      title: 'Témoignages',\n      type: 'array',\n      initialValue: [],\n      of: [" },
    { file: 'teamBlock.ts', find: "name: 'skills',\n              title: 'Compétences',\n              type: 'array',\n              description: 'Liste des compétences principales',\n              of: [", replace: "name: 'skills',\n              title: 'Compétences',\n              type: 'array',\n              description: 'Liste des compétences principales',\n              initialValue: [],\n              of: [" },
    { file: 'testimonialsBlock.ts', find: "name: 'categories',\n      title: 'Catégories',\n      type: 'array',\n      of: [", replace: "name: 'categories',\n      title: 'Catégories',\n      type: 'array',\n      initialValue: [],\n      of: [" },
    { file: 'textBlock.ts', find: "name: 'content',\n      title: 'Contenu',\n      type: 'array',\n      of: [", replace: "name: 'content',\n      title: 'Contenu',\n      type: 'array',\n      initialValue: [],\n      of: [" },
    
    // Validations incorrectes
    { file: 'bookingblock.ts', find: "validation: Rule => Rule.max(200)", replace: "validation: Rule => Rule.max(300)" },
    { file: 'countdownBlock.ts', find: "validation: (Rule) => Rule.max(300)", replace: "validation: (Rule) => Rule.max(100)" },
    { file: 'ctaBlock.ts', find: "validation: (Rule) => Rule.max(100),", replace: "validation: (Rule) => Rule.max(500)," },
    { file: 'newsletterBlock.ts', find: "validation: (Rule) => Rule.max(50),", replace: "validation: (Rule) => Rule.max(500)," },
    { file: 'pricingBlock.ts', find: "validation: (Rule) => Rule.max(200),", replace: "validation: (Rule) => Rule.max(100)," },
    { file: 'socialProofBlock.ts', find: "validation: (Rule) => Rule.max(200),", replace: "validation: (Rule) => Rule.max(300)," },
    { file: 'socialProofBlock.ts', find: "validation: (Rule) => Rule.max(100),", replace: "validation: (Rule) => Rule.max(50)," },
    { file: 'testimonialsBlock.ts', find: "validation: (Rule) => Rule.max(200),", replace: "validation: (Rule) => Rule.max(300)," }
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
          console.log(`${index + 1}. ✅ ${correction.file} - Correction appliquée`)
          fixedCount++
        } else {
          console.log(`${index + 1}. 🔍 ${correction.file} - Correction détectée (dry-run)`)
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
    dryRun 
  }
}

module.exports = { run }
