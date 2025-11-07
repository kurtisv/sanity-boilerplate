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

  if (cmd === 'analyst') {
    const { run } = require(path.resolve('agents/analystAgent'))
    const res = await run({ 
      prompt: args.prompt, 
      projectType: args['project-type'] || 'corporate',
      dryRun 
    })
    print('analyst', res)
  } else if (cmd === 'builder') {
    const { run } = require(path.resolve('agents/builderAgent'))
    const res = await run({ prompt: args.prompt, dryRun })
    print('builder', res)
  } else if (cmd === 'design') {
    const { run } = require(path.resolve('agents/designAgent'))
    const res = await run({ theme: args.theme || 'modern-minimal' })
    print('design', res)
  } else if (cmd === 'compat') {
    const { run } = require(path.resolve('agents/compatibilityAgent'))
    const res = await run({ dryRun })
    print('compat', res)
  } else if (cmd === 'diagnostic') {
    const { run } = require(path.resolve('agents/diagnosticAgent'))
    const res = await run({ fixSchemas: true, dryRun })
    print('diagnostic', res)
  } else if (cmd === 'publisher') {
    const { run } = require(path.resolve('agents/publisherAgent'))
    const res = await run()
    print('publisher', res)
  } else if (cmd === 'cleanup') {
    const { run } = require(path.resolve('agents/cleanupAgent'))
    console.log('') // Newline before agent output
    const res = await run({ dryRun })
    console.log('') // Newline after agent output
    print('cleanup', res)
  } else {
    console.log('Usage: npm run agents:run -- <analyst|builder|design|compat|diagnostic|publisher|cleanup> [options]')
    console.log('')
    console.log('Options:')
    console.log('  --prompt="..."          Prompt pour builder')
    console.log('  --project-type=TYPE     Type de projet pour analyst (corporate, ecommerce, blog, etc.)')
    console.log('  --theme=THEME           Thème pour design (modern-minimal, corporate, creative, luxury)')
    console.log('  --dry-run=false         Exécuter réellement (par défaut: true)')
    console.log('')
    console.log('Exemples:')
    console.log('  npm run agents:run -- analyst --project-type=corporate')
    console.log('  npm run agents:run -- design --theme=modern-minimal')
    console.log('  npm run agents:run -- compat --dry-run=false')
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
