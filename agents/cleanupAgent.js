const { applyChanges } = require('./core/fsWorkspace')
const { runTsPrune } = require('./core/checks')
const { readdir, readFile, stat } = require('fs/promises')
const { join, relative } = require('path')

async function run({ dryRun = true } = {}) {
  console.log('🧹 Cleanup Agent - Analyse du code...\n')
  
  const findings = []
  
  // 1. Detect unused exports with ts-prune (optional)
  console.log('📊 Vérification de ts-prune...')
  const pruneResult = await runTsPrune()
  if (pruneResult.ok && pruneResult.out) {
    const unusedExports = parseTsPruneOutput(pruneResult.out)
    findings.push(...unusedExports.map(u => ({
      type: 'unused-export',
      file: u.file,
      name: u.name,
      risk: 'low'
    })))
    console.log(`   ✅ Trouvé ${unusedExports.length} export(s) non utilisé(s)`)
  } else {
    console.log('   ⚠️  ts-prune non disponible (npm install --save-dev ts-prune)')
  }
  
  // 2. Detect empty files
  console.log('📄 Recherche de fichiers vides...')
  const emptyFiles = await findEmptyFiles('src')
  findings.push(...emptyFiles.map(f => ({
    type: 'empty-file',
    file: f,
    risk: 'low'
  })))
  console.log(`   Trouvé ${emptyFiles.length} fichier(s) vide(s)`)
  
  // 3. Detect orphaned test files
  console.log('🧪 Recherche de fichiers de test orphelins...')
  const orphanedTests = await findOrphanedTests('src')
  findings.push(...orphanedTests.map(f => ({
    type: 'orphaned-test',
    file: f,
    risk: 'medium'
  })))
  console.log(`   Trouvé ${orphanedTests.length} test(s) orphelin(s)`)
  
  // 4. Filter by risk and config
  const config = require('../configs/agents.config.json')
  const excludePatterns = config.cleanup?.exclude || []
  const aggressiveness = config.cleanup?.aggressiveness || 'prudent'
  
  const filtered = findings.filter(f => {
    // Exclude patterns
    if (excludePatterns.some(pattern => f.file.includes(pattern))) return false
    // Risk level filter
    if (aggressiveness === 'prudent' && f.risk !== 'low') return false
    if (aggressiveness === 'medium' && f.risk === 'high') return false
    return true
  })
  
  console.log(`\n📋 Plan de nettoyage (${filtered.length} fichiers):`)
  filtered.forEach(f => {
    const icon = f.risk === 'low' ? '🟢' : f.risk === 'medium' ? '🟡' : '🔴'
    console.log(`   ${icon} ${f.type}: ${f.file}`)
  })
  
  // 5. Create deletion plan
  const deletions = filtered.map(f => ({
    type: 'delete',
    file: f.file
  }))
  
  // 6. Apply changes
  const results = await applyChanges(deletions, { dryRun })
  
  console.log(`\n${dryRun ? '🔍 DRY-RUN' : '✅ EXÉCUTÉ'}: ${results.length} action(s)`)
  
  return { ok: true, results, findings: filtered }
}

function parseTsPruneOutput(output) {
  const lines = output.split('\n').filter(l => l.trim() && !l.includes('used in module'))
  return lines.map(line => {
    const match = line.match(/(.+?)\s+-\s+(.+)/)
    if (match) {
      return { file: match[1].trim(), name: match[2].trim() }
    }
    return null
  }).filter(Boolean)
}

async function findEmptyFiles(dir, baseDir = dir) {
  const files = []
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          files.push(...await findEmptyFiles(fullPath, baseDir))
        }
      } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
        const content = await readFile(fullPath, 'utf8')
        if (content.trim().length === 0 || content.trim() === '// TODO' || content.trim() === '/* empty */') {
          files.push(relative(process.cwd(), fullPath))
        }
      }
    }
  } catch {}
  return files
}

async function findOrphanedTests(dir, baseDir = dir) {
  const orphaned = []
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          orphaned.push(...await findOrphanedTests(fullPath, baseDir))
        }
      } else if (entry.isFile() && (entry.name.endsWith('.test.ts') || entry.name.endsWith('.test.tsx') || entry.name.endsWith('.spec.ts'))) {
        const sourceFile = fullPath.replace(/\.(test|spec)\.(ts|tsx)$/, '.$2')
        try {
          await stat(sourceFile)
        } catch {
          orphaned.push(relative(process.cwd(), fullPath))
        }
      }
    }
  } catch {}
  return orphaned
}

module.exports = { run }
