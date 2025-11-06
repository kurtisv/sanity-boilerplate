const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

function loadEnv() {
  // Load .env.local first if present, then .env as fallback
  const cwd = process.cwd()
  const localPath = path.join(cwd, '.env.local')
  const envPath = path.join(cwd, '.env')

  if (fs.existsSync(localPath)) {
    dotenv.config({ path: localPath })
  }
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath })
  }

  const required = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_API_TOKEN'
  ]

  const missing = required.filter((k) => !process.env[k] || String(process.env[k]).trim() === '')
  return {
    ok: missing.length === 0,
    missing,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-30',
    token: process.env.SANITY_API_TOKEN,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  }
}

module.exports = { loadEnv }
