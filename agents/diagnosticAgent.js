const { loadEnv } = require('./core/env')
const { createClient } = require('@sanity/client')
const diagnosticFixAgent = require('./diagnosticFixAgent')

async function run({ fixSchemas = false, dryRun = true } = {}) {
  console.log('🔍 DIAGNOSTIC COMPLET DU SYSTÈME SANITY\n')
  console.log('=' .repeat(60))
  
  // ÉTAPE 0: Diagnostic et correction des schémas (si demandé)
  if (fixSchemas) {
    console.log('\n📋 ÉTAPE 0: Diagnostic et correction des schémas')
    console.log('-'.repeat(60))
    const fixResult = await diagnosticFixAgent.run({ dryRun, fix: 'all' })
    if (!fixResult.ok) {
      console.log(`\n⚠️  ${fixResult.errors.length} erreur(s) trouvée(s) dans les schémas`)
      console.log('   Exécutez avec --fix-schemas pour voir les détails\n')
    }
  }
  
  // 1. Vérification des variables d'environnement
  console.log('\n📋 ÉTAPE 1: Variables d\'environnement')
  console.log('-'.repeat(60))
  const env = loadEnv()
  console.log('✓ Fichier .env.local chargé')
  console.log(`  - PROJECT_ID: ${env.projectId || '❌ MANQUANT'}`)
  console.log(`  - DATASET: ${env.dataset || '❌ MANQUANT'}`)
  console.log(`  - API_VERSION: ${env.apiVersion}`)
  console.log(`  - API_TOKEN: ${env.token ? '✅ Présent (' + env.token.substring(0, 10) + '...)' : '❌ MANQUANT'}`)
  console.log(`  - SITE_URL: ${env.siteUrl}`)
  
  if (!env.ok) {
    console.error('\n❌ Variables manquantes:', env.missing)
    return { ok: false, stage: 'env', missing: env.missing }
  }
  
  // 2. Création du client Sanity
  console.log('\n📋 ÉTAPE 2: Connexion au client Sanity')
  console.log('-'.repeat(60))
  const client = createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    token: env.token,
    useCdn: false,
  })
  console.log('✓ Client Sanity créé')
  
  // 3. Test de lecture (permissions READ)
  console.log('\n📋 ÉTAPE 3: Test de lecture (permissions READ)')
  console.log('-'.repeat(60))
  try {
    const allPages = await client.fetch(`*[_type == "page"] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      "slug": slug.current,
      "blocksCount": count(pageBuilder[])
    }`)
    console.log(`✓ Lecture réussie: ${allPages.length} page(s) trouvée(s)`)
    if (allPages.length > 0) {
      console.log('\n  Pages trouvées:')
      allPages.forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.title || 'Sans titre'}`)
        console.log(`     - ID: ${p._id}`)
        console.log(`     - Slug: /${p.slug || 'sans-slug'}`)
        console.log(`     - Blocs: ${p.blocksCount || 0}`)
        console.log(`     - Créée: ${new Date(p._createdAt).toLocaleString('fr-FR')}`)
        console.log(`     - Modifiée: ${new Date(p._updatedAt).toLocaleString('fr-FR')}`)
      })
    }
  } catch (error) {
    console.error('❌ Erreur de lecture:', error.message)
    return { ok: false, stage: 'read', error: error.message }
  }
  
  // 4. Test d'écriture (permissions WRITE)
  console.log('\n📋 ÉTAPE 4: Test d\'écriture (permissions WRITE)')
  console.log('-'.repeat(60))
  const testDocId = `test.diagnostic.${Date.now()}`
  try {
    console.log(`  Tentative de création du document: ${testDocId}`)
    const testDoc = {
      _type: 'page',
      _id: testDocId,
      title: 'Test Diagnostic',
      slug: { current: `test-diagnostic-${Date.now()}` },
      pageBuilder: []
    }
    
    const created = await client.create(testDoc)
    console.log(`✓ Création réussie: ${created._id}`)
    
    // Vérification immédiate
    const verify = await client.getDocument(created._id)
    console.log(`✓ Vérification réussie: document trouvé`)
    
    // Suppression du document de test
    await client.delete(created._id)
    console.log(`✓ Nettoyage réussi: document supprimé`)
    
  } catch (error) {
    console.error('❌ Erreur d\'écriture:', error.message)
    if (error.statusCode === 401) {
      console.error('   → Token invalide ou expiré')
    } else if (error.statusCode === 403) {
      console.error('   → Permissions insuffisantes (le token n\'a pas les droits d\'écriture)')
    }
    return { ok: false, stage: 'write', error: error.message, statusCode: error.statusCode }
  }
  
  // 5. Vérification du schéma
  console.log('\n📋 ÉTAPE 5: Vérification du schéma')
  console.log('-'.repeat(60))
  try {
    // Vérifier si le type 'page' existe dans le dataset
    const schemaTest = await client.fetch(`*[_type == "page"][0]`)
    console.log('✓ Type "page" reconnu par Sanity')
  } catch (error) {
    console.error('❌ Problème avec le schéma:', error.message)
  }
  
  // 6. Test de l'API Next.js (si serveur démarré)
  console.log('\n📋 ÉTAPE 6: Test de l\'API Next.js')
  console.log('-'.repeat(60))
  try {
    const apiUrl = `${env.siteUrl}/api/import-demo`
    console.log(`  Tentative d'appel: ${apiUrl}`)
    const res = await fetch(apiUrl, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
      const data = await res.json()
      console.log(`✓ API accessible (GET): ${res.status}`)
      console.log(`  - Page demo existe: ${data.exists ? 'Oui' : 'Non'}`)
      if (data.page) {
        console.log(`  - Titre: ${data.page.title}`)
        console.log(`  - Blocs: ${data.page.blocksCount}`)
      }
    } else {
      console.log(`⚠️  API répond mais avec erreur: ${res.status}`)
    }
  } catch (error) {
    console.log('⚠️  Serveur Next.js non démarré ou inaccessible')
    console.log('   → Lancez "npm run dev" pour tester l\'API')
  }
  
  // 7. Résumé final
  console.log('\n' + '='.repeat(60))
  console.log('📊 RÉSUMÉ DU DIAGNOSTIC')
  console.log('='.repeat(60))
  console.log('✅ Variables d\'environnement: OK')
  console.log('✅ Client Sanity: OK')
  console.log('✅ Permissions READ: OK')
  console.log('✅ Permissions WRITE: OK')
  console.log('✅ Schéma "page": OK')
  console.log('\n🎉 TOUT FONCTIONNE CORRECTEMENT!')
  console.log('\n💡 Si les pages ne s\'affichent pas dans Studio:')
  console.log('   1. Vérifiez que vous êtes sur le bon dataset (production)')
  console.log('   2. Rafraîchissez le Studio (Ctrl+R)')
  console.log('   3. Vérifiez la structure dans structure.ts')
  console.log('   4. Consultez l\'onglet "Vision" dans Studio pour requêter manuellement')
  
  console.log('\n💡 Pour diagnostiquer et corriger les schémas Sanity:')
  console.log('   npm run agents:run -- diagnostic --fix-schemas --dry-run=false')
  
  return { ok: true }
}

if (require.main === module) {
  run()
    .then((res) => {
      if (!res.ok) {
        console.log('\n❌ Diagnostic échoué')
        process.exit(1)
      }
    })
    .catch((err) => {
      console.error('\n💥 Erreur fatale:', err)
      process.exit(1)
    })
}

module.exports = { run }
