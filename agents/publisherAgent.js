const { loadEnv } = require('./core/env')
const { createClient } = require('@sanity/client')

async function callImportDemo(siteUrl) {
  const url = `${siteUrl.replace(/\/$/, '')}/api/import-demo`
  try {
    const res = await fetch(url, { method: 'POST' })
    const json = await res.json().catch(() => ({}))
    return { ok: res.ok, status: res.status, json }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
}

async function verifyPages(client) {
  try {
    const pages = await client.fetch(`*[_type == "page"]{_id, title, "slug": slug.current}`)
    return { ok: true, pages, count: pages.length }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
}

async function run() {
  console.log('🚀 publisherAgent: vérification des pages dans Sanity')
  const env = loadEnv()
  if (!env.ok) {
    console.error('❌ Missing env:', env.missing)
    return { ok: false, stage: 'env', missing: env.missing }
  }

  const client = createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    token: env.token,
    useCdn: false,
  })

  console.log('🗃️ Sanity:', { projectId: env.projectId, dataset: env.dataset, apiVersion: env.apiVersion })

  // Vérifier les pages créées dans Sanity
  const verify = await verifyPages(client)
  if (!verify.ok) {
    console.error('❌ Verification failed:', verify.error)
    return { ok: false, stage: 'verify', error: verify.error }
  }
  
  console.log(`📄 Found ${verify.count} page(s) in Sanity`)
  if (verify.pages.length > 0) {
    console.log('\nPages créées:')
    verify.pages.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.title} (/${p.slug})`)
    })
  }
  
  return { ok: true, pages: verify.pages, count: verify.count }
}

if (require.main === module) {
  run().then((res) => console.log('\n📄 publisherAgent result:', JSON.stringify(res, null, 2)))
}

module.exports = { run }
