const fs = require('fs')
const path = require('path')

function scanFiles(dir, predicate) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...scanFiles(full, predicate))
    else if (predicate(full)) out.push(full)
  }
  return out
}

async function run() {
  console.log('🎨 styleAgent: verifying style/theme conventions')
  const root = path.join(process.cwd(), 'src', 'sanity', 'schemas', 'blocks')
  const files = fs.existsSync(root) ? scanFiles(root, (f) => f.endsWith('.ts')) : []

  const issues = []

  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8')

    // 1) HEX colors should be strings with regex validation
    const hasColorString = /(name:\s*'[^']*color'|title:\s*'[^']*Color')\s*[\s\S]*?type:\s*'string'/.test(code)
    if (hasColorString) {
      const hasRegex = /validation:\s*Rule\s*=>\s*Rule\.regex\(\s*\/\^#\(\[A-Fa-f0-9\]\{6\}\|\[A-Fa-f0-9\]\{3\}\)\$\/\s*\)/.test(code)
      const hasHexDesc = /description:\s*'Hex color code/.test(code)
      if (!hasRegex || !hasHexDesc) {
        issues.push({ file, issue: 'Color string without regex and/or hex description' })
      }
    }

    // 2) options.list should be array of {title, value}
    if (/options:\s*{\s*list:\s*\[\s*['"]/m.test(code)) {
      issues.push({ file, issue: 'options.list uses raw strings; should be [{ title, value }]' })
    }

    // 3) Layout/theme fields should have initialValue
    const layoutFields = ['layout', 'theme', 'size', 'gridColumns', 'backgroundColor', 'textColor']
    for (const lf of layoutFields) {
      const hasField = new RegExp(`name:\\s*'${lf}'`).test(code)
      if (hasField && !new RegExp(`name:\\s*'${lf}'[\\s\\S]*?initialValue:`).test(code)) {
        issues.push({ file, issue: `Field '${lf}' missing initialValue` })
      }
    }
  }

  return { ok: issues.length === 0, issues }
}

if (require.main === module) {
  run().then((res) => console.log('\n📄 styleAgent result:', JSON.stringify(res, null, 2)))
}

module.exports = { run }
