/**
 * 📝 PAGE GENERATOR AGENT
 * 
 * Rôle: Génère des pages Sanity complètes avec blocs
 * 
 * Fonctionnalités:
 * - Création de pages selon templates (Accueil, Contact, Services, etc.)
 * - Génération automatique de slugs
 * - Initialisation correcte des arrays
 * - Intégration avec analystAgent
 * - Handover et manifest
 * - EventBus
 * 
 * Note: Les images doivent être ajoutées manuellement par les clients
 * via le Studio Sanity pour plus de flexibilité.
 */

const { loadEnv } = require('./core/env')
const { createClient } = require('@sanity/client')
const { createHandover, getOrCreateContextId } = require('./core/contracts')
const { eventBus, publishAgentEvent } = require('./core/eventBus')
const { updateManifest, addPage, addFile } = require('./core/artifacts')
const fs = require('fs')
const path = require('path')

async function run({ pageName, config, handover = null, dryRun = false }) {
  const startTime = Date.now()
  console.log('\n📝 PAGE GENERATOR AGENT - Génération de pages')
  console.log('='.repeat(80))
  
  // Obtenir ou créer contextId
  const contextId = getOrCreateContextId(handover)
  
  // Publier événement de démarrage
  publishAgentEvent('pageGeneratorAgent', 'start', { contextId, pageName })
  
  console.log(`\n📄 Génération de la page: "${pageName}"`)
  
  const env = loadEnv()
  if (!env.ok) {
    publishAgentEvent('pageGeneratorAgent', 'error', { contextId, error: 'Missing env vars' })
    return { ok: false, error: 'Variables d\'environnement manquantes', missing: env.missing }
  }
  
  const client = createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    token: env.token,
    useCdn: false,
  })
  
  // Générer le slug à partir du nom de page
  const slug = pageName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Enlever les accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  
  console.log(`  Slug: ${slug}`)
  
  // Définir les blocs selon le type de page
  const pageBlocks = generatePageBlocks(pageName, config)
  
  // Les images seront ajoutées manuellement par les clients dans le Studio
  const injectedImages = []
  
  if (dryRun) {
    console.log('\n  [DRY RUN] Page qui serait créée:')
    console.log(`  - Titre: ${pageName}`)
    console.log(`  - Slug: ${slug}`)
    console.log(`  - Blocs: ${pageBlocks.length}`)
    console.log(`  - Images: ${injectedImages.length}`)
    
    const duration = Date.now() - startTime
    const nextHandover = createHandover(contextId, 'ready', 'reviewerAgent', 'pagegen', {
      files: [],
      report: {
        pageName,
        slug,
        blocksCount: pageBlocks.length,
        imagesInjected: injectedImages.length,
        dryRun: true
      },
      duration
    })
    
    return { 
      ok: true, 
      dryRun: true, 
      pageName, 
      slug, 
      blocksCount: pageBlocks.length,
      imagesInjected: injectedImages.length,
      handover: nextHandover,
      contextId
    }
  }
  
  try {
    // Vérifier si une page avec ce slug existe déjà
    const existing = await client.fetch(`*[_type == "page" && slug.current == $slug][0]`, { slug })
    
    if (existing) {
      console.log(`  ⚠️  Page "${slug}" existe déjà (${existing._id}), mise à jour...`)
      await client.patch(existing._id)
        .set({ 
          title: pageName,
          pageBuilder: pageBlocks,
          _updatedAt: new Date().toISOString()
        })
        .commit()
      
      // Ajouter au manifest
      addPage(contextId, slug, existing._id)
      
      const duration = Date.now() - startTime
      const nextHandover = createHandover(contextId, 'ready', 'reviewerAgent', 'pagegen', {
        files: [],
        report: {
          action: 'updated',
          pageName,
          slug,
          id: existing._id,
          blocksCount: pageBlocks.length,
          imagesInjected: injectedImages.length
        },
        manifest: {
          pages: [{ slug, id: existing._id }],
          blocks: pageBlocks.map(b => b._type),
          media: injectedImages
        },
        duration
      })
      
      saveHandover(contextId, nextHandover)
      publishAgentEvent('pageGeneratorAgent', 'ready', { contextId, action: 'updated', slug, duration })
      
      return { 
        ok: true, 
        action: 'updated',
        pageName, 
        slug, 
        id: existing._id,
        blocksCount: pageBlocks.length,
        imagesInjected: injectedImages.length,
        handover: nextHandover,
        contextId
      }
    }
    
    // Créer la nouvelle page directement en version publiée
    // En utilisant un ID sans le préfixe 'drafts.', la page sera visible immédiatement
    const pageId = `page-${slug}-${Date.now()}`
    const pageDoc = {
      _id: pageId,
      _type: 'page',
      title: pageName,
      slug: { current: slug, _type: 'slug' },
      seoTitle: `${pageName} - ${config.siteName || 'Site'}`,
      seoDescription: `Page ${pageName} de ${config.siteName || 'notre site'}`,
      pageBuilder: pageBlocks,
      publishedAt: new Date().toISOString()
    }
    
    const result = await client.createOrReplace(pageDoc)
    console.log(`  ✅ Page créée et publiée: ${result._id}`)
    
    // Ajouter au manifest
    addPage(contextId, slug, result._id)
    
    const duration = Date.now() - startTime
    const nextHandover = createHandover(contextId, 'ready', 'reviewerAgent', 'pagegen', {
      files: [],
      report: {
        action: 'created',
        pageName,
        slug,
        id: result._id,
        blocksCount: pageBlocks.length,
        imagesInjected: injectedImages.length
      },
      manifest: {
        pages: [{ slug, id: result._id }],
        blocks: pageBlocks.map(b => b._type),
        media: injectedImages
      },
      duration
    })
    
    saveHandover(contextId, nextHandover)
    publishAgentEvent('pageGeneratorAgent', 'ready', { contextId, action: 'created', slug, duration })
    
    console.log('\n' + '='.repeat(80))
    console.log('✅ PAGE GÉNÉRÉE AVEC SUCCÈS')
    console.log('='.repeat(80))
    console.log(`Page: ${pageName}`)
    console.log(`Slug: ${slug}`)
    console.log(`ID: ${result._id}`)
    console.log(`Blocs: ${pageBlocks.length}`)
    console.log(`Images: ${injectedImages.length}`)
    console.log(`Durée: ${duration}ms`)
    console.log('='.repeat(80))
    
    return { 
      ok: true, 
      action: 'created',
      pageName, 
      slug, 
      id: result._id,
      blocksCount: pageBlocks.length,
      imagesInjected: injectedImages.length,
      handover: nextHandover,
      contextId
    }
    
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`  ❌ Erreur lors de la création de la page:`, error.message)
    
    publishAgentEvent('pageGeneratorAgent', 'error', { contextId, error: error.message })
    
    const errorHandover = createHandover(contextId, 'blocked', 'reviewerAgent', 'pagegen', {
      errors: [error.message],
      duration
    })
    
    return { 
      ok: false, 
      error: error.message,
      handover: errorHandover,
      contextId
    }
  }
}

/**
 * Génère les blocs pour une page selon son type
 */
function generatePageBlocks(pageName, config) {
  const pageNameLower = pageName.toLowerCase()
  const primaryColor = config.primaryColor || '#3b82f6'
  const siteName = config.siteName || 'Mon Site'
  
  // Templates de pages prédéfinis
  if (pageNameLower.includes('accueil') || pageNameLower === 'home') {
    return [
      {
        _type: 'heroBlock',
        _key: `hero-${Date.now()}`,
        title: `Bienvenue sur ${siteName}`,
        subtitle: 'Découvrez nos services et solutions innovantes',
        layout: 'centered',
        ctaButtons: [],  // ✅ Initialiser vide pour éviter erreurs
        backgroundSettings: {
          backgroundType: 'solid',
          backgroundColor: primaryColor
        },
        styling: {
          textColor: '#ffffff',
          textAlignment: 'center',
          verticalAlignment: 'center',
          height: 'large'
        }
      },
      {
        _type: 'featureGridBlock',
        _key: `features-${Date.now()}`,
        title: 'Nos Fonctionnalités',
        subtitle: 'Tout ce dont vous avez besoin',
        layout: 'grid-3',
        features: [
          {
            _key: `feature-${Date.now()}-1`,
            title: 'Rapide',
            description: 'Performance optimale',
            icon: '⚡'
          },
          {
            _key: `feature-${Date.now()}-2`,
            title: 'Sécurisé',
            description: 'Protection des données',
            icon: '🔒'
          },
          {
            _key: `feature-${Date.now()}-3`,
            title: 'Évolutif',
            description: 'Grandit avec vous',
            icon: '📈'
          }
        ]
      },
      {
        _type: 'statsBlock',
        _key: `stats-${Date.now()}`,
        title: 'Nos Chiffres',
        layout: 'horizontal',
        stats: [
          {
            _key: `stat-${Date.now()}-1`,
            value: '1000+',
            label: 'Clients satisfaits'
          },
          {
            _key: `stat-${Date.now()}-2`,
            value: '50+',
            label: 'Projets réalisés'
          },
          {
            _key: `stat-${Date.now()}-3`,
            value: '24/7',
            label: 'Support disponible'
          }
        ]
      },
      {
        _type: 'contactBlock',
        _key: `contact-${Date.now()}`,
        title: 'Contactez-nous',
        subtitle: 'Nous sommes là pour vous aider',
        showMap: false
      }
    ]
  }
  
  if (pageNameLower.includes('contact')) {
    return [
      {
        _type: 'heroBlock',
        _key: `hero-${Date.now()}`,
        title: 'Contactez-nous',
        subtitle: 'Nous sommes à votre écoute',
        layout: 'centered',
        ctaButtons: [],
        backgroundSettings: {
          backgroundType: 'solid',
          backgroundColor: primaryColor
        },
        styling: {
          textColor: '#ffffff',
          textAlignment: 'center',
          verticalAlignment: 'center',
          height: 'small'
        }
      },
      {
        _type: 'contactBlock',
        _key: `contact-${Date.now()}`,
        title: 'Envoyez-nous un message',
        showMap: true
      }
    ]
  }
  
  if (pageNameLower.includes('service')) {
    return [
      {
        _type: 'heroBlock',
        _key: `hero-${Date.now()}`,
        title: 'Nos Services',
        subtitle: 'Des solutions adaptées à vos besoins',
        layout: 'centered',
        ctaButtons: [],
        backgroundSettings: {
          backgroundType: 'solid',
          backgroundColor: primaryColor
        },
        styling: {
          textColor: '#ffffff',
          textAlignment: 'center',
          verticalAlignment: 'center',
          height: 'medium'
        }
      },
      {
        _type: 'featureGridBlock',
        _key: `services-${Date.now()}`,
        title: 'Ce que nous proposons',
        layout: 'grid-3',
        features: [
          {
            _key: `service-${Date.now()}-1`,
            title: 'Conseil',
            description: 'Accompagnement personnalisé',
            icon: '💡'
          },
          {
            _key: `service-${Date.now()}-2`,
            title: 'Développement',
            description: 'Solutions sur mesure',
            icon: '⚙️'
          },
          {
            _key: `service-${Date.now()}-3`,
            title: 'Support',
            description: 'Assistance continue',
            icon: '🤝'
          }
        ]
      }
    ]
  }
  
  if (pageNameLower.includes('tarif') || pageNameLower.includes('prix')) {
    return [
      {
        _type: 'heroBlock',
        _key: `hero-${Date.now()}`,
        title: 'Nos Tarifs',
        subtitle: 'Choisissez l\'offre qui vous convient',
        layout: 'centered',
        ctaButtons: [],
        backgroundSettings: {
          backgroundType: 'solid',
          backgroundColor: primaryColor
        },
        styling: {
          textColor: '#ffffff',
          textAlignment: 'center',
          verticalAlignment: 'center',
          height: 'medium'
        }
      },
      {
        _type: 'textBlock',
        _key: `pricing-info-${Date.now()}`,
        content: [
          {
            _type: 'block',
            _key: `block-${Date.now()}`,
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Découvrez nos différentes formules adaptées à vos besoins et votre budget.'
              }
            ]
          }
        ]
      }
    ]
  }
  
  // Page générique par défaut
  return [
    {
      _type: 'heroBlock',
      _key: `hero-${Date.now()}`,
      title: pageName,
      subtitle: `Page ${pageName}`,
      layout: 'centered',
      ctaButtons: [],
      backgroundSettings: {
        backgroundType: 'solid',
        backgroundColor: primaryColor
      },
      styling: {
        textColor: '#ffffff',
        textAlignment: 'center',
        verticalAlignment: 'center',
        height: 'medium'
      }
    },
    {
      _type: 'textBlock',
      _key: `content-${Date.now()}`,
      content: [
        {
          _type: 'block',
          _key: `block-${Date.now()}`,
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: `Contenu de la page ${pageName}. Cette page a été générée automatiquement.`
            }
          ]
        }
      ]
    }
  ]
}

/**
 * Note: L'injection automatique d'images a été désactivée.
 * Les clients ajouteront leurs propres images via le Studio Sanity.
 * Cette approche offre plus de flexibilité et évite les problèmes
 * de références vers des assets inexistants.
 */

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
  
  const handoverPath = path.join(outDir, 'pagegen-handover.json')
  fs.writeFileSync(handoverPath, JSON.stringify(handover, null, 2))
  console.log(`\n📦 Handover sauvegardé: ${handoverPath}`)
}

if (require.main === module) {
  const pageName = process.argv[2] || 'Test Page'
  const dryRun = !process.argv.includes('--dry-run=false')
  const config = {
    siteName: 'Mon Site',
    primaryColor: '#3b82f6',
    designStyle: 'modern'
  }
  
  run({ pageName, config, dryRun })
    .then(res => {
      console.log('\n📄 Result:', JSON.stringify({
        ok: res.ok,
        action: res.action,
        pageName: res.pageName,
        slug: res.slug,
        blocksCount: res.blocksCount,
        imagesInjected: res.imagesInjected
      }, null, 2))
      process.exit(res.ok ? 0 : 1)
    })
    .catch(err => {
      console.error('❌ Error:', err)
      process.exit(1)
    })
}

module.exports = { run }
