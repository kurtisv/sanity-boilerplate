const { callClaude } = require('./core/anthropicClient')
const { applyChanges } = require('./core/fsWorkspace')

async function run({ prompt, dryRun = true }) {
  const idea = prompt || 'Créer un bloc logoGridBlock simple avec schéma et composant.'
  
  // Detect block name from prompt
  const blockInfo = detectBlockFromPrompt(idea)
  
  // Try Claude first if API key available
  const enhancedPrompt = buildPrompt(idea)
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
  
  const plan = [
    { type: 'write', file: `src/sanity/schemas/blocks/${blockInfo.name}.ts`, content: schemaContent },
    { type: 'write', file: `src/components/blocks/${blockInfo.componentName}/${blockInfo.componentName}.tsx`, content: componentContent }
  ]
  const results = await applyChanges(plan, { dryRun })
  return { 
    ok: true, 
    results, 
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

function buildPrompt(userIdea) {
  return `Tu es un expert Sanity + Next.js + TypeScript. Génère un bloc Sanity complet basé sur cette demande:

"${userIdea}"

RÈGLES STRICTES:
1. Le schéma doit utiliser defineType et defineField de 'sanity'
2. Type du document: 'document' (pas 'object')
3. Tous les arrays doivent avoir des éléments avec _key (Sanity les génère auto)
4. Validation: Rule.required(), Rule.max(N)
5. Preview avec select et prepare
6. Le composant React doit:
   - Utiliser TypeScript
   - Props: { data: any } ou interface typée
   - Utiliser Tailwind CSS pour le style
   - Être responsive
   - Gérer les cas vides (logos?.length || 0)

STRUCTURE DE RÉPONSE:
Réponds EXACTEMENT dans ce format:

\`\`\`schema
[CODE DU SCHÉMA SANITY ICI]
\`\`\`

\`\`\`component
[CODE DU COMPOSANT REACT ICI]
\`\`\`

Génère du code production-ready, propre et bien commenté.`
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
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.max(100)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.max(500)
    })
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || '${title}',
        subtitle: 'Bloc générique'
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

module.exports = { run }
