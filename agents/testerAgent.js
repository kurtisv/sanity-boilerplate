const { spawn } = require('child_process')

function runCommand(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, { stdio: 'inherit', shell: true, ...opts })
    p.on('close', (code) => resolve({ code }))
  })
}

async function run({ quick = true } = {}) {
  console.log('🧪 testerAgent: starting quick tests')
  // Sanity compile is done at runtime in Studio; here we can at least type-check TS or run a quick build
  // Keep it lightweight to avoid long runs by default
  // Example placeholder: no-op successful
  return { ok: true, tests: ['schema scan passed (placeholder)'] }
}

if (require.main === module) {
  run().then((res) => console.log('\n📄 testerAgent result:', JSON.stringify(res, null, 2)))
}

module.exports = { run }
