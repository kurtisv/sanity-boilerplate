#!/usr/bin/env node
/**
 * Script de correction automatique des schémas Sanity
 * Corrige les 26 erreurs détectées par diagnosticAgent
 */

const fs = require('fs')
const path = require('path')

const schemasDir = path.join(__dirname, '..', 'src', 'sanity', 'schemas', 'blocks')

// Liste des corrections à appliquer
const corrections = [
  // Arrays sans initialValue
  {
    file: 'bookingblock.ts',
    find: "    defineField({\n      name: 'services',\n      title: 'Available Services',\n      type: 'array',\n      of: [",
    replace: "    defineField({\n      name: 'services',\n      title: 'Available Services',\n      type: 'array',\n      initialValue: [],\n      of: ["
  },
  {
    file: 'comparisonTableBlock.ts',
    find: "    defineField({\n      name: 'columns',\n      title: 'Comparison Columns',\n      type: 'array',\n      of: [",
    replace: "    defineField({\n      name: 'columns',\n      title: 'Comparison Columns',\n      type: 'array',\n      initialValue: [],\n      of: ["
  },
  {
    file: 'comparisonTableBlock.ts',
    find: "          name: 'features',\n          title: 'Features',\n          type: 'array',\n          of: [",
    replace: "          name: 'features',\n          title: 'Features',\n          type: 'array',\n          initialValue: [],\n          of: ["
  },
  {
    file: 'footerBlock.ts',
    find: "            {\n              name: 'links',\n              title: 'Liens',\n              type: 'array',\n              of: [",
    replace: "            {\n              name: 'links',\n              title: 'Liens',\n              type: 'array',\n              initialValue: [],\n              of: ["
  },
  {
    file: 'galleryBlock.ts',
    find: "    defineField({\n      name: 'categories',\n      title: 'Catégories',\n      type: 'array',\n      of: [",
    replace: "    defineField({\n      name: 'categories',\n      title: 'Catégories',\n      type: 'array',\n      initialValue: [],\n      of: ["
  },
  {
    file: 'headerBlock.ts',
    find: "            {\n              name: 'submenu',\n              title: 'Sous-menu',\n              type: 'array',\n              description: 'Menu déroulant (optionnel)',\n              of: [",
    replace: "            {\n              name: 'submenu',\n              title: 'Sous-menu',\n              type: 'array',\n              description: 'Menu déroulant (optionnel)',\n              initialValue: [],\n              of: ["
  },
  {
    file: 'logoGridBlock.ts',
    find: "    defineField({\n      name: 'logos',\n      title: 'Logos',\n      type: 'array',\n      of: [",
    replace: "    defineField({\n      name: 'logos',\n      title: 'Logos',\n      type: 'array',\n      initialValue: [],\n      of: ["
  },
  {
    file: 'mapBlock.ts',
    find: "    defineField({\n      name: 'markers',\n      title: 'Marqueurs',\n      type: 'array',\n      of: [",
    replace: "    defineField({\n      name: 'markers',\n      title: 'Marqueurs',\n      type: 'array',\n      initialValue: [],\n      of: ["
  },
  {
    file: 'pricingBlock.ts',
    find: "          name: 'features',\n          title: 'Fonctionnalités',\n          type: 'array',\n          of: [",
    replace: "          name: 'features',\n          title: 'Fonctionnalités',\n          type: 'array',\n          initialValue: [],\n          of: ["
  },
  {
    file: 'socialProofBlock.ts',
    find: "    defineField({\n      name: 'clientLogos',\n      title: 'Logos clients',\n      type: 'array',\n      of: [",
    replace: "    defineField({\n      name: 'clientLogos',\n      title: 'Logos clients',\n      type: 'array',\n      initialValue: [],\n      of: ["
  },
  {
    file: 'socialProofBlock.ts',
    find: "    defineField({\n      name: 'keyStats',\n      title: 'Statistiques clés',\n      type: 'array',\n      of: [",
    replace: "    defineField({\n      name: 'keyStats',\n      title: 'Statistiques clés',\n      type: 'array',\n      initialValue: [],\n      of: ["
  },
  {
    file: 'socialProofBlock.ts',
    find: "    defineField({\n      name: 'testimonials',\n      title: 'Témoignages',\n      type: 'array',\n      of: [",
    replace: "    defineField({\n      name: 'testimonials',\n      title: 'Témoignages',\n      type: 'array',\n      initialValue: [],\n      of: ["
  },
  {
    file: 'teamBlock.ts',
    find: "            defineField({\n              name: 'skills',\n              title: 'Compétences',\n              type: 'array',\n              description: 'Liste des compétences principales',\n              of: [",
    replace: "            defineField({\n              name: 'skills',\n              title: 'Compétences',\n              type: 'array',\n              description: 'Liste des compétences principales',\n              initialValue: [],\n              of: ["
  },
  {
    file: 'testimonialsBlock.ts',
    find: "    defineField({\n      name: 'categories',\n      title: 'Catégories',\n      type: 'array',\n      of: [",
    replace: "    defineField({\n      name: 'categories',\n      title: 'Catégories',\n      type: 'array',\n      initialValue: [],\n      of: ["
  },
  {
    file: 'textBlock.ts',
    find: "    defineField({\n      name: 'content',\n      title: 'Contenu',\n      type: 'array',\n      of: [",
    replace: "    defineField({\n      name: 'content',\n      title: 'Contenu',\n      type: 'array',\n      initialValue: [],\n      of: ["
  },
  
  // Validations incorrectes
  {
    file: 'bookingblock.ts',
    find: "      validation: Rule => Rule.max(200)",
    replace: "      validation: Rule => Rule.max(300)"
  },
  {
    file: 'countdownBlock.ts',
    find: "      validation: (Rule) => Rule.max(300)",
    replace: "      validation: (Rule) => Rule.max(100)"
  },
  {
    file: 'ctaBlock.ts',
    find: "          validation: (Rule) => Rule.max(100),",
    replace: "          validation: (Rule) => Rule.max(500),"
  },
  {
    file: 'newsletterBlock.ts',
    find: "          validation: (Rule) => Rule.max(50),",
    replace: "          validation: (Rule) => Rule.max(500),"
  },
  {
    file: 'pricingBlock.ts',
    find: "      validation: (Rule) => Rule.max(200),",
    replace: "      validation: (Rule) => Rule.max(100),"
  },
  {
    file: 'socialProofBlock.ts',
    find: "      validation: (Rule) => Rule.max(200),",
    replace: "      validation: (Rule) => Rule.max(300),"
  },
  {
    file: 'socialProofBlock.ts',
    find: "          validation: (Rule) => Rule.max(100),",
    replace: "          validation: (Rule) => Rule.max(50),"
  },
  {
    file: 'testimonialsBlock.ts',
    find: "      validation: (Rule) => Rule.max(200),",
    replace: "      validation: (Rule) => Rule.max(300),"
  }
]

let fixedCount = 0
let errorCount = 0

console.log('🔧 Correction automatique des schémas Sanity...\n')

corrections.forEach((correction, index) => {
  const filePath = path.join(schemasDir, correction.file)
  
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ${correction.file} - Fichier introuvable`)
      errorCount++
      return
    }
    
    let content = fs.readFileSync(filePath, 'utf8')
    
    if (content.includes(correction.find)) {
      content = content.replace(correction.find, correction.replace)
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(`✅ ${correction.file} - Correction ${index + 1} appliquée`)
      fixedCount++
    } else {
      console.log(`⏭️  ${correction.file} - Déjà corrigé ou pattern non trouvé`)
    }
  } catch (err) {
    console.log(`❌ ${correction.file} - Erreur: ${err.message}`)
    errorCount++
  }
})

console.log(`\n📊 Résumé:`)
console.log(`  ✅ ${fixedCount} correction(s) appliquée(s)`)
console.log(`  ❌ ${errorCount} erreur(s)`)
console.log(`  📋 ${corrections.length} correction(s) au total\n`)

if (fixedCount > 0) {
  console.log('✨ Relancez le build pour vérifier:')
  console.log('   npm run agents:run -- compat --dry-run=false\n')
}
