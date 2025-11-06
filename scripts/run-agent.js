#!/usr/bin/env node
require('dotenv').config()
const path = require('path')
const { existsSync } = require('fs')

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
