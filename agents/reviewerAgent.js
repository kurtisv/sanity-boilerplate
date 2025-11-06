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

function autoFix(code) {
  let fixed = code
  let changes = []

  // 1) export const X = defineType(  → export default defineType(
  if (/export\s+const\s+\w+\s*=\s*defineType\(/.test(fixed)) {
    fixed = fixed.replace(/export\s+const\s+\w+\s*=\s*defineType\(/g, 'export default defineType(')
    changes.push('export-default')
  }

  // 2) icon: SomeIcon  → icon: () => '⭐'
  if (/icon:\s*[A-Za-z]\w*/.test(fixed) && !/icon:\s*\(\)\s*=>/.test(fixed)) {
    fixed = fixed.replace(/icon:\s*[A-Za-z]\w*/g, "icon: () => '⭐'")
    changes.push('emoji-icon')
  }

  // 3) type: 'color' → type: 'string' + add description if missing on that field line
  if (/type:\s*'color'/.test(fixed)) {
    fixed = fixed.replace(/type:\s*'color'/g, "type: 'string'")
    // Best-effort: if description missing on that line, we won't force-insert; reviewer will still report to add regex
    changes.push('color-to-string')
  }

  return { fixed, changes }
}

async function run({ fix = false } = {}) {
  console.log('🧪 reviewerAgent: scanning Sanity schema blocks for common pitfalls')
  const root = path.join(process.cwd(), 'src', 'sanity', 'schemas', 'blocks')
  const files = fs.existsSync(root) ? scanFiles(root, (f) => f.endsWith('.ts')) : []
  const problems = []
  const fixes = []

  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8')
    let fileProblems = []

    if (/export\s+const\s+\w+\s*=\s*defineType\(/.test(code)) {
      fileProblems.push('Named export used, should be export default')
    }
    if (/icon:\s*[A-Za-z]/.test(code) && !/icon:\s*\(\)\s*=>/.test(code)) {
      fileProblems.push('Icon should be function returning an emoji, not imported component')
    }
    if (/type:\s*'color'/.test(code)) {
      fileProblems.push("Invalid field type 'color' — use string + regex/description")
    }

    if (fileProblems.length) {
      problems.push({ file, issues: fileProblems })
      if (fix) {
        const { fixed, changes } = autoFix(code)
        if (changes.length) {
          fs.writeFileSync(file, fixed, 'utf8')
          fixes.push({ file, changes })
        }
      }
    }
  }
  return { ok: problems.length === 0, problems, fixes }
}

if (require.main === module) {
  const fix = process.argv.includes('--fix')
  run({ fix }).then((res) => console.log('\n📄 reviewerAgent result:', JSON.stringify(res, null, 2)))
}

module.exports = { run }
