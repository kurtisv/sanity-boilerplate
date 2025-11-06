const { loadEnv } = require('./core/env')
const { createClient } = require('@sanity/client')

/**
 * Agent de correction des pages existantes
 * Corrige les blocs Hero qui ont ctaButtons = null au lieu de []
 */

async function run() {
  console.log('🔧 fixPagesAgent: correction des pages existantes\n')
  
  const env = loadEnv()
  if (!env.ok) {
    console.error('❌ Variables d\'environnement manquantes:', env.missing)
    return { ok: false, error: 'Missing env variables' }
  }
  
  const client = createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    token: env.token,
    useCdn: false,
  })
  
  console.log('📄 Récupération de toutes les pages...')
  
  // Récupérer toutes les pages avec leurs blocs
  const pages = await client.fetch(`*[_type == "page"] {
    _id,
    _rev,
    title,
    pageBuilder[] {
      _type,
      _key,
      ctaButtons
    }
  }`)
  
  console.log(`✓ ${pages.length} page(s) trouvée(s)\n`)
  
  let fixedCount = 0
  let errorCount = 0
  
  for (const page of pages) {
    console.log(`\n📄 Analyse: "${page.title}" (${page._id})`)
    
    if (!page.pageBuilder || page.pageBuilder.length === 0) {
      console.log('  ⚠️  Aucun bloc, ignoré')
      continue
    }
    
    let needsUpdate = false
    const updatedBlocks = page.pageBuilder.map((block, index) => {
      // Vérifier uniquement les heroBlocks
      if (block._type === 'heroBlock') {
        if (block.ctaButtons === null || block.ctaButtons === undefined) {
          console.log(`  🔧 Bloc ${index + 1} (heroBlock): ctaButtons null → []`)
          needsUpdate = true
          return {
            ...block,
            ctaButtons: []
          }
        }
      }
      return block
    })
    
    if (needsUpdate) {
      try {
        await client
          .patch(page._id)
          .set({ pageBuilder: updatedBlocks })
          .commit()
        
        console.log(`  ✅ Page mise à jour`)
        fixedCount++
      } catch (error) {
        console.error(`  ❌ Erreur lors de la mise à jour:`, error.message)
        errorCount++
      }
    } else {
      console.log('  ✓ Aucune correction nécessaire')
    }
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('📊 RÉSUMÉ')
  console.log('='.repeat(60))
  console.log(`Pages analysées: ${pages.length}`)
  console.log(`Pages corrigées: ${fixedCount}`)
  console.log(`Erreurs: ${errorCount}`)
  
  if (fixedCount > 0) {
    console.log('\n✅ Correction terminée ! Rafraîchissez votre navigateur.')
  } else {
    console.log('\n✓ Toutes les pages sont déjà correctes.')
  }
  
  return { 
    ok: true, 
    analyzed: pages.length,
    fixed: fixedCount,
    errors: errorCount
  }
}

if (require.main === module) {
  run()
    .then(res => {
      if (!res.ok) {
        process.exit(1)
      }
    })
    .catch(err => {
      console.error('\n💥 Erreur fatale:', err)
      process.exit(1)
    })
}

module.exports = { run }
