const { spawn } = require('child_process')
const { existsSync } = require('fs')
const path = require('path')

function runCmd(cmd, args, cwd = process.cwd()) {
  return new Promise((resolve) => {
    const ps = spawn(cmd, args, { cwd, shell: true })
    let out = ''
    let err = ''
    ps.stdout.on('data', (d) => (out += d.toString()))
    ps.stderr.on('data', (d) => (err += d.toString()))
    ps.on('close', (code) => resolve({ code, out, err }))
  })
}

async function runTypecheck() {
  const res = await runCmd('npx', ['-y', 'tsc', '--noEmit'])
  return { ok: res.code === 0, out: res.out, err: res.err }
}

async function runEslint() {
  const cwd = process.cwd()
  const configs = [
    'eslint.config.js',
    'eslint.config.cjs',
    'eslint.config.mjs',
    '.eslintrc.js',
    '.eslintrc.cjs',
    '.eslintrc.json',
    '.eslintrc'
  ]
  const hasConfig = configs.some((f) => existsSync(path.join(cwd, f)))
  if (!hasConfig) {
    return { ok: true, out: 'ESLint skipped (no config detected)', err: '' }
  }
  const res = await runCmd('npx', ['-y', 'eslint', '.'])
  return { ok: res.code === 0, out: res.out, err: res.err }
}

async function runTsPrune() {
  const res = await runCmd('npx', ['-y', 'ts-prune'])
  return { ok: res.code === 0, out: res.out, err: res.err }
}

async function runNextBuild() {
  const res = await runCmd('npm', ['run', 'build'])
  return { ok: res.code === 0, out: res.out, err: res.err }
}

async function runSanityValidations() {
  // Placeholder for project-specific validations
  return { ok: true, out: 'Sanity validations passed (stub)', err: '' }
}

module.exports = { runTypecheck, runEslint, runTsPrune, runNextBuild, runSanityValidations }
