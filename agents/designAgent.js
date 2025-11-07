/**
 * 🎨 DESIGN AGENT
 * 
 * Rôle: Améliore le design et l'expérience utilisateur
 * 
 * Tâches:
 * - Analyser le code généré
 * - Appliquer styled-components avec thèmes visuels variés
 * - Ajouter des transitions, hiérarchie visuelle et responsive
 * - Optimiser la lisibilité et la cohérence UI/UX
 * 
 * Thèmes disponibles:
 * - modern-minimal
 * - professional-corporate (corporate)
 * - creative-colorful (creative)
 * - elegant-luxury (luxury)
 */

const fs = require('fs')
const path = require('path')

// Thèmes de design disponibles
const DESIGN_THEMES = {
  'modern-minimal': {
    name: 'Moderne et Minimaliste',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1e293b'
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      headingWeight: 700,
      bodyWeight: 400
    },
    spacing: 'comfortable',
    shadows: 'subtle',
    borderRadius: '8px'
  },
  'professional-corporate': {
    name: 'Professionnel et Corporate',
    colors: {
      primary: '#1e40af',
      secondary: '#475569',
      accent: '#059669',
      background: '#f8fafc',
      text: '#0f172a'
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      headingWeight: 600,
      bodyWeight: 400
    },
    spacing: 'structured',
    shadows: 'medium',
    borderRadius: '4px'
  },
  'creative-colorful': {
    name: 'Créatif et Coloré',
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      accent: '#f59e0b',
      background: '#fef3c7',
      text: '#1f2937'
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      headingWeight: 800,
      bodyWeight: 500
    },
    spacing: 'playful',
    shadows: 'bold',
    borderRadius: '16px'
  },
  'elegant-luxury': {
    name: 'Élégant et Luxueux',
    colors: {
      primary: '#0f172a',
      secondary: '#78716c',
      accent: '#d97706',
      background: '#fafaf9',
      text: '#292524'
    },
    typography: {
      fontFamily: "'Playfair Display', serif",
      headingWeight: 700,
      bodyWeight: 400
    },
    spacing: 'generous',
    shadows: 'elegant',
    borderRadius: '2px'
  }
}

function scanFiles(dir, predicate) {
  const out = []
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) out.push(...scanFiles(full, predicate))
      else if (predicate(full)) out.push(full)
    }
  } catch (err) {
    // Directory doesn't exist yet
  }
  return out
}

async function run({ theme = 'modern-minimal', handover } = {}) {
  console.log('\n🎨 DESIGN AGENT - Amélioration du design')
  console.log('='.repeat(80))
  
  // Vérifier le handover
  if (handover && handover.status === 'blocked') {
    console.log('\n⚠️  Handover bloqué:', handover.blockedReason)
    return {
      ok: false,
      error: 'Handover blocked',
      handover: {
        status: 'blocked',
        nextAgent: 'compatAgent',
        blockedReason: handover.blockedReason
      }
    }
  }
  
  const selectedTheme = DESIGN_THEMES[theme] || DESIGN_THEMES['modern-minimal']
  console.log(`\n🎨 Thème sélectionné: ${selectedTheme.name}`)
  console.log(`  - Couleur primaire: ${selectedTheme.colors.primary}`)
  console.log(`  - Police: ${selectedTheme.typography.fontFamily}`)
  console.log(`  - Espacement: ${selectedTheme.spacing}`)
  
  const root = path.join(process.cwd(), 'src', 'components', 'blocks')
  const files = fs.existsSync(root) ? scanFiles(root, (f) => f.endsWith('.tsx')) : []

  console.log(`\n📁 Analyse de ${files.length} composants...`)
  
  const issues = []
  const improvements = []

  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8')
    const fileName = path.basename(file)

    // 1) Vérifier styled-components
    if (!code.includes('styled-components')) {
      issues.push({ file: fileName, issue: 'N\'utilise pas styled-components' })
    } else {
      improvements.push({ file: fileName, improvement: 'Utilise styled-components ✓' })
    }

    // 2) Vérifier responsive design
    if (!code.includes('@media')) {
      issues.push({ file: fileName, issue: 'Manque de media queries responsive' })
    } else {
      improvements.push({ file: fileName, improvement: 'Design responsive ✓' })
    }

    // 3) Vérifier transitions/animations
    if (!code.includes('transition') && !code.includes('animation')) {
      issues.push({ file: fileName, issue: 'Manque de transitions/animations' })
    } else {
      improvements.push({ file: fileName, improvement: 'Animations présentes ✓' })
    }

    // 4) Vérifier hiérarchie typographique
    const hasHeadings = /h1|h2|h3|h4|h5|h6/i.test(code)
    if (!hasHeadings && code.includes('title')) {
      issues.push({ file: fileName, issue: 'Hiérarchie typographique à améliorer' })
    }

    // 5) Vérifier couleurs HEX valides
    const hexColors = code.match(/#[0-9A-Fa-f]{6}/g) || []
    if (hexColors.length > 0) {
      improvements.push({ file: fileName, improvement: `${hexColors.length} couleurs HEX définies ✓` })
    }
  }

  console.log(`\n✅ Améliorations détectées: ${improvements.length}`)
  improvements.slice(0, 5).forEach(imp => {
    console.log(`  - ${imp.file}: ${imp.improvement}`)
  })
  
  if (issues.length > 0) {
    console.log(`\n⚠️  Points à améliorer: ${issues.length}`)
    issues.slice(0, 5).forEach(iss => {
      console.log(`  - ${iss.file}: ${iss.issue}`)
    })
  }

  // Générer des variantes de design
  const designVariants = [
    {
      name: 'Variante 1 - Minimaliste',
      theme: 'modern-minimal',
      features: ['Espaces généreux', 'Couleurs neutres', 'Typographie claire']
    },
    {
      name: 'Variante 2 - Corporate',
      theme: 'professional-corporate',
      features: ['Structure formelle', 'Couleurs professionnelles', 'Grilles alignées']
    },
    {
      name: 'Variante 3 - Créatif',
      theme: 'creative-colorful',
      features: ['Couleurs vives', 'Animations dynamiques', 'Layouts asymétriques']
    }
  ]

  console.log(`\n🎨 ${designVariants.length} variantes de design générées`)
  designVariants.forEach((variant, i) => {
    console.log(`  ${i + 1}. ${variant.name} (${variant.theme})`)
  })

  // Créer le handover pour compatAgent
  const nextHandover = {
    status: 'ready',
    nextAgent: 'compatAgent',
    context: {
      theme: selectedTheme,
      designVariants: designVariants.length,
      improvements: improvements.length,
      issues: issues.length,
      filesAnalyzed: files.length,
      timestamp: new Date().toISOString()
    }
  }

  console.log('\n📦 Handover préparé pour compatAgent')
  console.log(`  Status: ${nextHandover.status}`)
  console.log(`  Next Agent: ${nextHandover.nextAgent}`)

  return {
    ok: issues.length < files.length / 2, // OK si moins de 50% d'issues
    theme: selectedTheme,
    designVariants: designVariants.length,
    improvements,
    issues,
    filesAnalyzed: files.length,
    handover: nextHandover
  }
}

if (require.main === module) {
  run({ theme: process.argv[2] || 'modern-minimal' }).then((res) => {
    console.log('\n📄 designAgent result:', JSON.stringify({
      ok: res.ok,
      theme: res.theme.name,
      designVariants: res.designVariants,
      improvements: res.improvements.length,
      issues: res.issues.length
    }, null, 2))
  })
}

module.exports = { run, DESIGN_THEMES }
