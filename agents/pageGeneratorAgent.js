const { loadEnv } = require('./core/env')
const { createClient } = require('@sanity/client')

/**
 * Agent de génération de pages Sanity
 * Crée des pages complètes avec des blocs dans Sanity Studio
 */

async function run({ pageName, config, dryRun = false }) {
  console.log(`📄 pageGeneratorAgent: génération de la page "${pageName}"`)
  
  const env = loadEnv()
  if (!env.ok) {
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
  
  // Définir les blocs selon le type de page
  const pageBlocks = generatePageBlocks(pageName, config)
  
  if (dryRun) {
    console.log('  [DRY RUN] Page qui serait créée:')
    console.log(`  - Titre: ${pageName}`)
    console.log(`  - Slug: ${slug}`)
    console.log(`  - Blocs: ${pageBlocks.length}`)
    return { ok: true, dryRun: true, pageName, slug, blocksCount: pageBlocks.length }
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
      
      return { 
        ok: true, 
        action: 'updated',
        pageName, 
        slug, 
        id: existing._id,
        blocksCount: pageBlocks.length 
      }
    }
    
    // Créer la nouvelle page
    const pageDoc = {
      _type: 'page',
      title: pageName,
      slug: { current: slug },
      seoTitle: `${pageName} - ${config.siteName || 'Site'}`,
      seoDescription: `Page ${pageName} de ${config.siteName || 'notre site'}`,
      pageBuilder: pageBlocks,
      publishedAt: new Date().toISOString()
    }
    
    const result = await client.create(pageDoc)
    console.log(`  ✅ Page créée: ${result._id}`)
    
    return { 
      ok: true, 
      action: 'created',
      pageName, 
      slug, 
      id: result._id,
      blocksCount: pageBlocks.length 
    }
    
  } catch (error) {
    console.error(`  ❌ Erreur lors de la création de la page:`, error.message)
    return { ok: false, error: error.message }
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

if (require.main === module) {
  const pageName = process.argv[2] || 'Test Page'
  const config = {
    siteName: 'Mon Site',
    primaryColor: '#3b82f6',
    designStyle: 'modern'
  }
  
  run({ pageName, config, dryRun: false })
    .then(res => console.log('\n📄 Result:', JSON.stringify(res, null, 2)))
    .catch(err => console.error('❌ Error:', err))
}

module.exports = { run }
