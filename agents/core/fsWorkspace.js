const { readFile, writeFile, mkdir, rm, stat } = require('fs/promises')
const { dirname } = require('path')

async function ensureDir(path) {
  try { await mkdir(path, { recursive: true }) } catch {}
}

async function applyChanges(changes, { dryRun = true } = {}) {
  const results = []
  for (const change of changes) {
    if (change.type === 'write') {
      results.push({ action: 'write', file: change.file, dryRun })
      if (!dryRun) {
        await ensureDir(dirname(change.file))
        await writeFile(change.file, change.content, 'utf8')
      }
    } else if (change.type === 'delete') {
      results.push({ action: 'delete', file: change.file, dryRun })
      if (!dryRun) {
        try { await rm(change.file) } catch {}
      }
    }
  }
  return results
}

module.exports = { applyChanges }
