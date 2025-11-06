const fs = require('fs')
const path = require('path')

function loadRules() {
  const file = path.join(process.cwd(), 'SANITY_SCHEMA_RULES.md')
  if (!fs.existsSync(file)) return { ok: false, error: 'Rules file not found' }
  const content = fs.readFileSync(file, 'utf8')
  return { ok: true, content }
}

module.exports = { loadRules }
