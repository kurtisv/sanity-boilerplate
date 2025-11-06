#!/usr/bin/env node
const dotenv = require('dotenv')
const path = require('path')
const { existsSync } = require('fs')

// Load .env files (try .env.local first, then .env)
const envLocalPath = path.resolve(process.cwd(), '.env.local')
const envPath = path.resolve(process.cwd(), '.env')

let result = dotenv.config({ path: envLocalPath })
let envFile = '.env.local'

if (result.error) {
  // Try .env if .env.local doesn't exist
  result = dotenv.config({ path: envPath })
  envFile = '.env'
}

if (result.error) {
  console.log('⚠️  Aucun fichier .env ou .env.local trouvé.')
  console.log('   Créez .env.local avec votre clé Anthropic:')
  console.log('   ANTHROPIC_API_KEY=sk-ant-api03-...')
  console.log('   CLAUDE_MODEL=claude-3-5-sonnet-20241022\n')
} else {
  console.log(`✅ Fichier ${envFile} chargé`)
  if (process.env.ANTHROPIC_API_KEY) {
    console.log(`✅ ANTHROPIC_API_KEY trouvée (${process.env.ANTHROPIC_API_KEY.substring(0, 20)}...)\n`)
  } else {
    console.log(`⚠️  ANTHROPIC_API_KEY non définie dans ${envFile}\n`)
  }
}

async function main() {
  const [, , cmd, ...rest] = process.argv
  const args = parseArgs(rest)
  const dryRun = args['dry-run'] !== 'false' // default true

  if (cmd === 'builder') {
    const { run } = require(path.resolve('agents/builderAgent'))
    const res = await run({ prompt: args.prompt, dryRun })
    print('builder', res)
  } else if (cmd === 'compat') {
    const { run } = require(path.resolve('agents/compatibilityAgent'))
    const res = await run({ dryRun })
    print('compat', res)
  } else if (cmd === 'cleanup') {
    const { run } = require(path.resolve('agents/cleanupAgent'))
    console.log('') // Newline before agent output
    const res = await run({ dryRun })
    console.log('') // Newline after agent output
    print('cleanup', res)
  } else {
    console.log('Usage: npm run agents:run -- <builder|compat|cleanup> [--prompt="..."] [--dry-run=false]')
    process.exit(1)
  }
}

function parseArgs(argv) {
  const out = {}
  for (const item of argv) {
    const m = item.match(/^--([^=]+)=(.*)$/)
    if (m) out[m[1]] = m[2]
  }
  return out
}

function print(title, res) {
  console.log(`\n=== ${title.toUpperCase()} RESULT ===`)
  console.log(JSON.stringify(res, null, 2))
}

main().catch((e) => { console.error(e); process.exit(1) })
