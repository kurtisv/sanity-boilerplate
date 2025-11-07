const { callClaude } = require('./core/anthropicClient')
const { applyChanges } = require('./core/fsWorkspace')
const { loadRules } = require('./core/rules')
const { createHandover, validateHandover, getOrCreateContextId } = require('./core/contracts')
const { eventBus, publishAgentEvent } = require('./core/eventBus')
const { updateManifest, addBlock, addFile } = require('./core/artifacts')
const mediaDefaults = require('./core/mediaDefaults.json')
const { syncHeaderFooter } = require('./core/headerFooterSync')
const fs = require('fs')
const path = require('path')

/**
 * 🔨 BUILDER AGENT
 * 
 * Rôle: Génère les schémas Sanity et composants React valides
 * 
 * Tâches:
 * - Lire le plan du analystAgent
 * - Créer les schémas Sanity conformes
 * - Créer les composants React correspondants en styled-components
 * - Appeler updateSiteHeadAndFooter() pour synchroniser le header/footer avec le site créé
 */

async function run({ prompt, handover, dryRun = true }) {
  const startTime = Date.now()
  console.log('\n🔨 BUILDER AGENT - Génération des schémas et composants')
  console.log('='.repeat(80))
  
  // Obtenir ou créer contextId
  const contextId = getOrCreateContextId(handover)
  
  // Publier événement de démarrage
  publishAgentEvent('builderAgent', 'start', { contextId, prompt })
  
  // Valider le handover si présent
  if (handover) {
    const validation = validateHandover(handover)
    if (!validation.valid) {
      console.warn('⚠️  Handover invalide:', validation.errors)
    }
  }
  
  // Vérifier le handover
  if (handover && handover.status === 'blocked') {
    console.log('\n⚠️  Handover bloqué:', handover.blockedReason)
    const blockedHandover = createHandover(contextId, 'blocked', 'designAgent', 'build', {
      errors: [handover.blockedReason || 'Handover blocked from previous agent']
    })
    publishAgentEvent('builderAgent', 'blocked', { contextId, reason: handover.blockedReason })
    return {
      ok: false,
      error: 'Handover blocked',
      handover: blockedHandover
    }
  }
  
  // Récupérer le plan depuis le handover
  const receivedPlan = handover?.context?.plan
  const documentation = handover?.context?.documentation
  
  if (receivedPlan) {
    console.log('\n📋 Plan reçu de analystAgent:')
    console.log(`  - Type de projet: ${receivedPlan.projectType}`)
    console.log(`  - ${receivedPlan.pages.length} pages à créer`)
    console.log(`  - ${receivedPlan.blocks.length} blocs nécessaires`)
  }
  
  const idea = prompt || handover?.context?.userPrompt || 'Créer un bloc logoGridBlock simple avec schéma et composant.'
  
  // Detect block name from prompt
  const blockInfo = detectBlockFromPrompt(idea)
  
  // Try Claude first if API key available
  const enhancedPrompt = buildPrompt(idea, documentation)
  const ai = await callClaude(enhancedPrompt)
  
  let schemaContent, componentContent
  
  if (ai.ok && ai.output) {
    console.log('✅ Claude a répondu avec succès')
    // Parse Claude's response
    const parsed = parseClaudeResponse(ai.output)
    schemaContent = parsed.schema || generateGenericSchema(blockInfo)
    componentContent = parsed.component || generateGenericComponent(blockInfo)
  } else {
    // Fallback: generate valid minimal files
    console.log(`⚠️  Claude unavailable: ${ai.error || 'Unknown error'}`)
    console.log(`📝 Génération de ${blockInfo.name} avec template fallback\n`)
    schemaContent = generateGenericSchema(blockInfo)
    componentContent = generateGenericComponent(blockInfo)
  }
  
  const filePlan = [
    { type: 'write', file: `src/sanity/schemas/blocks/${blockInfo.name}.ts`, content: schemaContent },
    { type: 'write', file: `src/components/blocks/${blockInfo.componentName}/${blockInfo.componentName}.tsx`, content: componentContent }
  ]
  
  console.log('\n📝 Création des fichiers...')
  const results = await applyChanges(filePlan, { dryRun })
  
  console.log(`\n✅ ${results.filter(r => r.ok).length}/${results.length} fichier(s) créé(s)`)
  
  // Injecter les images par défaut
  console.log('\n🖼️  Injection des images par défaut...')
  const injectedImages = injectDefaultImages(blockInfo.name, schemaContent)
  console.log(`  ✅ ${injectedImages.length} image(s) par défaut disponible(s)`)
  
  // Synchroniser header/footer via le nouveau système
  console.log('\n🔄 Synchronisation du header/footer...')
  try {
    const syncResult = await syncHeaderFooter()
    if (syncResult.synced) {
      console.log('  ✅ Header/Footer synchronisés')
    } else {
      console.log('  ⚠️  Synchronisation partielle:', syncResult.warnings.join(', '))
    }
  } catch (err) {
    console.log('  ⚠️  Erreur de synchronisation:', err.message)
  }
  
  // Mettre à jour le manifest
  if (!dryRun) {
    console.log('\n📦 Mise à jour du manifest...')
    results.filter(r => r.ok).forEach(r => {
      addFile(contextId, 'builderAgent', r.file)
    })
    addBlock(contextId, blockInfo.name)
    injectedImages.forEach(img => {
      updateManifest(contextId, 'builderAgent', {
        manifest: { media: [img] }
      })
    })
    console.log('  ✅ Manifest mis à jour')
  }
  
  // Créer le handover pour designAgent
  const duration = Date.now() - startTime
  const nextHandover = createHandover(contextId, 'ready', 'designAgent', 'build', {
    files: results.filter(r => r.ok).map(r => r.file),
    report: {
      blockInfo,
      aiGenerated: ai.ok,
      filesCreated: results.filter(r => r.ok).length,
      imagesInjected: injectedImages.length
    },
    manifest: {
      blocks: [blockInfo.name],
      pages: [],
      media: injectedImages
    },
    notes: `Built ${blockInfo.name} with ${ai.ok ? 'Claude AI' : 'fallback template'}`,
    duration
  })
  
  // Sauvegarder le handover
  saveHandover(contextId, nextHandover)
  
  // Publier événement de succès
  publishAgentEvent('builderAgent', 'ready', { 
    contextId, 
    blockName: blockInfo.name,
    filesCreated: results.filter(r => r.ok).length,
    duration 
  })
  
  console.log('\n📦 Handover préparé pour designAgent')
  console.log(`  Status: ${nextHandover.status}`)
  console.log(`  Next Agent: ${nextHandover.nextAgent}`)
  console.log(`  Duration: ${duration}ms`)
  
  return { 
    ok: true, 
    results,
    createdFiles: results.map(r => r.file),
    handover: nextHandover,
    contextId,
    aiOut: ai.ok ? 'Generated with Claude AI' : `Fallback template for ${blockInfo.name}` 
  }
}

function detectBlockFromPrompt(prompt) {
  const lower = prompt.toLowerCase()
  
  // Common block patterns
  const patterns = [
    { regex: /countdown/i, name: 'countdownBlock', title: '⏰ Countdown', componentName: 'CountdownBlock' },
    { regex: /map|location|carte/i, name: 'mapBlock', title: '🗺️ Map', componentName: 'MapBlock' },
    { regex: /comparison|compare|comparatif/i, name: 'comparisonTableBlock', title: '📊 Comparison Table', componentName: 'ComparisonTableBlock' },
    { regex: /social.?proof|preuve.?sociale/i, name: 'socialProofBlock', title: '🏆 Social Proof', componentName: 'SocialProofBlock' },
    { regex: /logo.?grid|logo.?cloud/i, name: 'logoGridBlock', title: '🏢 Logo Grid', componentName: 'LogoGridBlock' }
  ]
  
  for (const pattern of patterns) {
    if (pattern.regex.test(lower)) {
      return pattern
    }
  }
  
  // Default: try to extract block name from prompt
  const match = lower.match(/créer (?:un |le )?(\w+block)/i)
  if (match) {
    const name = match[1]
    const componentName = name.charAt(0).toUpperCase() + name.slice(1).replace(/block$/i, 'Block')
    return { name, title: componentName, componentName }
  }
  
  return { name: 'customBlock', title: 'Custom Block', componentName: 'CustomBlock' }
}

function buildPrompt(userIdea, documentation) {
  // Charger les 5 documents de référence consolidés
  const docs = [
    '01_AGENT_GUIDE_COMPLET.md',
    '02_ERREURS_ET_CORRECTIONS.md',
    '03_SANITY_SCHEMAS_GUIDE.md',
    '04_PROTECTION_SYSTEME.md',
    '05_QUICK_REFERENCE.md'
  ]
  
  let referenceContent = '# 📚 DOCUMENTATION OBLIGATOIRE POUR LES AGENTS\n\n'
  referenceContent += '**LIRE CES 5 DOCUMENTS AVANT TOUTE GÉNÉRATION:**\n\n'
  
  for (const doc of docs) {
    const docPath = path.join(__dirname, '..', doc)
    try {
      if (fs.existsSync(docPath)) {
        const content = fs.readFileSync(docPath, 'utf8')
        referenceContent += `\n\n---\n\n# ${doc}\n\n${content}\n\n`
        console.log(`✅ Chargé: ${doc}`)
      } else {
        console.log(`⚠️  Document manquant: ${doc}`)
      }
    } catch (err) {
      console.log(`❌ Erreur lecture ${doc}:`, err.message)
    }
  }
  
  // Fallback: charger l'ancien document si les nouveaux n'existent pas
  if (!referenceContent.includes('01_AGENT_GUIDE_COMPLET')) {
    const referencePath = path.join(__dirname, '..', 'AGENT_SANITY_REFERENCE.md')
    try {
      if (fs.existsSync(referencePath)) {
        referenceContent = fs.readFileSync(referencePath, 'utf8')
      }
    } catch (e) {
      console.warn('⚠️  Impossible de charger AGENT_SANITY_REFERENCE.md')
    }
  }
  
  return `Tu es un expert Sanity + Next.js + TypeScript. Génère un bloc Sanity complet basé sur cette demande:

"${userIdea}"

${referenceContent ? `📘 RÉFÉRENCE SANITY COMPLÈTE:\n\n${referenceContent}\n\n` : ''}

⚠️ RÈGLES SANITY CRITIQUES - À RESPECTER ABSOLUMENT:

1. EXPORTS:
   - ✅ TOUJOURS: export default defineType({...})
   - ❌ JAMAIS: export const monBlockSchema = defineType({...})

2. TYPES DE CHAMPS VALIDES UNIQUEMENT:
   - ✅ string, text, number, boolean, date, datetime, url, email, slug, array, object, image, file, reference, document, block
   - ❌ INTERDITS: color, select, textarea, dropdown
   - Pour couleurs: type: 'string' avec description: 'Hex color code'
   - Pour listes déroulantes: type: 'string' avec options.list

3. ICÔNES:
   - ✅ icon: () => '🎨'  (fonction retournant emoji)
   - ❌ JAMAIS importer depuis @sanity/icons, @heroicons/react, etc.

4. CHAMPS _key:
   - ✅ Sanity les génère automatiquement pour les arrays
   - ❌ JAMAIS définir _key comme champ dans le schéma

5. VALIDATION:
   - Utiliser Rule.required(), Rule.max(N), Rule.min(N)
   - Limites courantes: title max 100, subtitle max 200, description max 300
   - Pour statsBlock: number doit être STRING (max 20)

6. OPTIONS:
   - Utiliser initialValue (PAS defaultValue)
   - Format: options: { list: [{title: 'X', value: 'x'}], layout: 'radio' }

7. BLOCS SPÉCIAUX:
   - ContactBlock fieldTypes valides: name, email, phone, company, subject, message, textarea, url, custom
   - FeatureGrid: nécessite iconType: 'emoji' et iconEmoji: '🎨'
   - TeamBlock: utiliser 'position' (PAS 'role'), ajouter displayType, layout, gridColumns
   - StatsBlock: number est STRING

8. TYPE DE BLOC:
   - type: 'object' pour blocs dans pageBuilder
   - type: 'document' pour documents indépendants

9. PREVIEW OBLIGATOIRE:
   - Toujours inclure preview avec select et prepare
   - Gérer les valeurs nulles/undefined

STRUCTURE DE RÉPONSE:
Réponds EXACTEMENT dans ce format:

\`\`\`schema
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'monBlock',
  title: 'Mon Block',
  type: 'document',
  icon: () => '🎨',
  fields: [
    // Vos champs avec validations correctes
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Mon Block',
        subtitle: 'Description'
      }
    }
  }
})
\`\`\`

\`\`\`component
export default function MonBlock({ data }: { data: any }) {
  const { title } = data || {}
  
  return (
    <section className="py-12">
      {/* Composant responsive avec Tailwind */}
    </section>
  )
}
\`\`\`

Génère du code production-ready qui passe toutes les validations Sanity!`
}

function parseClaudeResponse(output) {
  const schemaMatch = output.match(/\`\`\`(?:schema|typescript|ts)\n([\s\S]*?)\n\`\`\`/)
  const componentMatch = output.match(/\`\`\`(?:component|tsx|typescript|react)\n([\s\S]*?)\n\`\`\`/)
  
  return {
    schema: schemaMatch ? schemaMatch[1].trim() : null,
    component: componentMatch ? componentMatch[1].trim() : null
  }
}

function generateGenericSchema(blockInfo) {
  const { name, title } = blockInfo
  return `import { defineType, defineField } from 'sanity'

export default defineType({
  name: '${name}',
  title: '${title}',
  type: 'document',
  icon: () => '🎨',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.max(300)
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || '${title}',
        subtitle: subtitle || 'Generic block'
      }
    }
  }
})
`
}

function generateGenericComponent(blockInfo) {
  const { componentName } = blockInfo
  return `export default function ${componentName}({ data }: { data: any }) {
  const { title, description } = data || {}

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {title && <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>}
        {description && <p className="text-lg text-center text-gray-600">{description}</p>}
      </div>
    </section>
  )
}
`
}

function generateLogoGridSchema() {
  return `import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'logoGridBlock',
  title: '🏢 Logo Grid',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.max(100)
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nom', type: 'string' },
            { name: 'image', title: 'Image', type: 'image' },
            { name: 'url', title: 'URL', type: 'url' }
          ]
        }
      ]
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      options: {
        list: [
          { title: '3 colonnes', value: 'grid-3' },
          { title: '4 colonnes', value: 'grid-4' },
          { title: '6 colonnes', value: 'grid-6' }
        ]
      },
      initialValue: 'grid-4'
    })
  ],
  preview: {
    select: { title: 'title', logos: 'logos' },
    prepare({ title, logos }) {
      return {
        title: title || 'Logo Grid',
        subtitle: \`\${logos?.length || 0} logo(s)\`
      }
    }
  }
})
`
}

function generateLogoGridComponent() {
  return `export default function LogoGridBlock({ data }: { data: any }) {
  const { title, logos = [], layout = 'grid-4' } = data
  
  const gridCols = {
    'grid-3': 'grid-cols-3',
    'grid-4': 'grid-cols-4',
    'grid-6': 'grid-cols-6'
  }[layout] || 'grid-cols-4'

  return (
    <section className="py-12">
      {title && <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>}
      <div className={\`grid \${gridCols} gap-8 max-w-6xl mx-auto\`}>
        {logos.map((logo: any, i: number) => (
          <div key={i} className="flex items-center justify-center p-4">
            {logo.url ? (
              <a href={logo.url} target="_blank" rel="noopener noreferrer">
                {logo.image?.asset && (
                  <img src={logo.image.asset.url} alt={logo.name} className="max-h-16 grayscale hover:grayscale-0 transition" />
                )}
              </a>
            ) : (
              logo.image?.asset && (
                <img src={logo.image.asset.url} alt={logo.name} className="max-h-16" />
              )
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
`
}

/**
 * Injecter les images par défaut selon le type de bloc
 * 
 * @param {string} blockName - Nom du bloc
 * @param {string} schemaContent - Contenu du schéma
 * @returns {array} Liste des images injectées
 */
function injectDefaultImages(blockName, schemaContent) {
  const images = []
  
  // Déterminer le type de bloc
  const blockType = blockName.replace(/Block$/i, '')
  const usage = mediaDefaults.usage[blockName] || mediaDefaults.usage[`${blockType}Block`]
  
  if (!usage) {
    return images
  }
  
  // Récupérer les images correspondantes
  usage.forEach(imageId => {
    const image = mediaDefaults.images.find(img => img.id === imageId)
    if (image) {
      images.push(image)
    }
  })
  
  return images
}

/**
 * Sauvegarder le handover
 * 
 * @param {string} contextId - UUID du contexte
 * @param {object} handover - Handover à sauvegarder
 */
function saveHandover(contextId, handover) {
  const outDir = path.join(__dirname, '..', 'out', contextId)
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }
  const handoverPath = path.join(outDir, 'builder-handover.json')
  fs.writeFileSync(handoverPath, JSON.stringify(handover, null, 2))
  console.log(`\n📦 Handover sauvegardé: ${handoverPath}`)
}

/**
 * Fonction de synchronisation header/footer (legacy - pour compatibilité)
 * Utilise maintenant le nouveau système via core/headerFooterSync.js
 */
async function updateSiteHeadAndFooter(config) {
  const { syncHeaderFooter } = require('./core/headerFooterSync')
  return await syncHeaderFooter()
}

module.exports = { run }
