const { runTypecheck, runEslint, runNextBuild, runSanityValidations } = require('./core/checks')

async function run({ dryRun = true } = {}) {
  const typecheck = await runTypecheck()
  const lint = await runEslint()
  const sanity = await runSanityValidations()
  // Defer full build in dry-run unless requested
  const build = dryRun ? { ok: true, out: 'Skipped build (dry-run)', err: '' } : await runNextBuild()

  const ok = typecheck.ok && lint.ok && sanity.ok && build.ok
  return { ok, reports: { typecheck, lint, sanity, build } }
}

module.exports = { run }
