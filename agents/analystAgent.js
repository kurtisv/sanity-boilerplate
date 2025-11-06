const { loadEnv } = require('./core/env')

async function run({ prompt, plan, dryRun = true } = {}) {
  const env = loadEnv()
  console.log('🔎 analystAgent: analyzing request...')
  const analysis = {
    ok: true,
    intent: prompt || 'No prompt provided',
    suggestedBlocks: [],
    pages: [],
    acceptanceCriteria: [
      'Schema compiles in Sanity Studio',
      'Next.js dev server builds',
      'Pages created in Sanity with expected slugs'
    ],
    envOk: env.ok,
    envMissing: env.missing,
  }
  return analysis
}

if (require.main === module) {
  run({ prompt: process.argv.slice(2).join(' ') }).then((res) => {
    console.log('\n📄 analystAgent result:', JSON.stringify(res, null, 2))
  })
}

module.exports = { run }
