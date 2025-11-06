const { run: analyze } = require('./analystAgent')
const { run: build } = require('./builderAgent')
const { run: review } = require('./reviewerAgent')
const { run: style } = require('./styleAgent')
const { run: testRun } = require('./testerAgent')
const { run: publish } = require('./publisherAgent')

async function run({ prompt, dryRun = true } = {}) {
  console.log('🧠 seniorAgent: pipeline start')

  const analysis = await analyze({ prompt, dryRun })
  if (!analysis.ok) return { ok: false, stage: 'analysis', analysis }

  const buildRes = await build({ prompt, dryRun })
  if (!buildRes.ok) return { ok: false, stage: 'build', buildRes }

  const reviewRes = await review()
  if (!reviewRes.ok) return { ok: false, stage: 'review', reviewRes }

  const styleRes = await style()
  if (!styleRes.ok) return { ok: false, stage: 'style', styleRes }

  const testRes = await testRun({ quick: true })
  if (!testRes.ok) return { ok: false, stage: 'test', testRes }

  const publishRes = await publish()
  if (!publishRes.ok) return { ok: false, stage: 'publish', publishRes }

  console.log('✅ seniorAgent: pipeline complete')
  return { ok: true, analysis, buildRes, reviewRes, styleRes, testRes, publishRes }
}

if (require.main === module) {
  const prompt = process.argv.slice(2).join(' ')
  run({ prompt, dryRun: false }).then((res) => console.log('\n📄 seniorAgent result:', JSON.stringify(res, null, 2)))
}

module.exports = { run }
