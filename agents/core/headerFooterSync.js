/**
 * 🔄 HEADER/FOOTER SYNCHRONIZATION
 * 
 * Synchronisation automatique du header/footer du site selon les données Sanity
 * (logo, couleur, menus).
 * 
 * Utilisé par: builderAgent, pageGeneratorAgent, publisherAgent
 */

const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

/**
 * Charger la configuration Sanity
 */
function loadSanityConfig() {
  const envPath = path.join(__dirname, '..', '..', '.env.local')
  
  if (!fs.existsSync(envPath)) {
    throw new Error('.env.local not found')
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8')
  const env = {}
  
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=')
    if (key && value) {
      env[key.trim()] = value.trim()
    }
  })
  
  return {
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-30',
    token: env.SANITY_API_TOKEN,
    useCdn: false
  }
}

/**
 * Récupérer les données du header depuis Sanity
 * 
 * @returns {Promise<object>} Données du header
 */
async function fetchHeaderData() {
  const config = loadSanityConfig()
  const client = createClient(config)
  
  try {
    const header = await client.fetch(`*[_type == "headerBlock"][0]{
      logo,
      "logoUrl": logo.asset->url,
      navigation,
      ctaButton,
      theme
    }`)
    
    return header || getDefaultHeader()
  } catch (err) {
    console.warn('⚠️  Impossible de récupérer le header:', err.message)
    return getDefaultHeader()
  }
}

/**
 * Récupérer les données du footer depuis Sanity
 * 
 * @returns {Promise<object>} Données du footer
 */
async function fetchFooterData() {
  const config = loadSanityConfig()
  const client = createClient(config)
  
  try {
    const footer = await client.fetch(`*[_type == "footerBlock"][0]{
      logo,
      "logoUrl": logo.asset->url,
      columns,
      socialLinks,
      copyright,
      theme
    }`)
    
    return footer || getDefaultFooter()
  } catch (err) {
    console.warn('⚠️  Impossible de récupérer le footer:', err.message)
    return getDefaultFooter()
  }
}

/**
 * Synchroniser le header et le footer
 * 
 * @returns {Promise<object>} { header, footer, synced: boolean }
 */
async function syncHeaderFooter() {
  console.log('\n🔄 Synchronisation Header/Footer...')
  
  try {
    const [header, footer] = await Promise.all([
      fetchHeaderData(),
      fetchFooterData()
    ])
    
    // Vérifier la cohérence des couleurs
    const headerTheme = header.theme?.backgroundColor || '#ffffff'
    const footerTheme = footer.theme?.backgroundColor || '#1a202c'
    
    console.log(`  Header: ${headerTheme}`)
    console.log(`  Footer: ${footerTheme}`)
    
    // Vérifier la cohérence du logo
    const headerLogo = header.logoUrl
    const footerLogo = footer.logoUrl
    
    if (headerLogo && footerLogo && headerLogo !== footerLogo) {
      console.warn('  ⚠️  Les logos du header et footer sont différents')
    }
    
    console.log('  ✅ Synchronisation terminée')
    
    return {
      header,
      footer,
      synced: true,
      warnings: []
    }
  } catch (err) {
    console.error('  ❌ Erreur de synchronisation:', err.message)
    return {
      header: getDefaultHeader(),
      footer: getDefaultFooter(),
      synced: false,
      warnings: [err.message]
    }
  }
}

/**
 * Créer ou mettre à jour le header dans Sanity
 * 
 * @param {object} headerData - Données du header
 * @returns {Promise<object>} Header créé/mis à jour
 */
async function createOrUpdateHeader(headerData) {
  const config = loadSanityConfig()
  const client = createClient(config)
  
  try {
    // Vérifier si un header existe déjà
    const existing = await client.fetch(`*[_type == "headerBlock"][0]._id`)
    
    if (existing) {
      // Mettre à jour
      const updated = await client.patch(existing).set(headerData).commit()
      console.log('✅ Header mis à jour')
      return updated
    } else {
      // Créer
      const created = await client.create({
        _type: 'headerBlock',
        ...headerData
      })
      console.log('✅ Header créé')
      return created
    }
  } catch (err) {
    console.error('❌ Erreur lors de la création/mise à jour du header:', err.message)
    throw err
  }
}

/**
 * Créer ou mettre à jour le footer dans Sanity
 * 
 * @param {object} footerData - Données du footer
 * @returns {Promise<object>} Footer créé/mis à jour
 */
async function createOrUpdateFooter(footerData) {
  const config = loadSanityConfig()
  const client = createClient(config)
  
  try {
    // Vérifier si un footer existe déjà
    const existing = await client.fetch(`*[_type == "footerBlock"][0]._id`)
    
    if (existing) {
      // Mettre à jour
      const updated = await client.patch(existing).set(footerData).commit()
      console.log('✅ Footer mis à jour')
      return updated
    } else {
      // Créer
      const created = await client.create({
        _type: 'footerBlock',
        ...footerData
      })
      console.log('✅ Footer créé')
      return created
    }
  } catch (err) {
    console.error('❌ Erreur lors de la création/mise à jour du footer:', err.message)
    throw err
  }
}

/**
 * Obtenir un header par défaut
 * 
 * @returns {object} Header par défaut
 */
function getDefaultHeader() {
  return {
    navigation: [
      { label: 'Accueil', url: '/' },
      { label: 'Services', url: '/services' },
      { label: 'À propos', url: '/a-propos' },
      { label: 'Contact', url: '/contact' }
    ],
    ctaButton: {
      text: 'Commencer',
      url: '/contact'
    },
    theme: {
      backgroundColor: '#ffffff',
      textColor: '#1a202c',
      logoPosition: 'left'
    }
  }
}

/**
 * Obtenir un footer par défaut
 * 
 * @returns {object} Footer par défaut
 */
function getDefaultFooter() {
  return {
    columns: [
      {
        title: 'Entreprise',
        links: [
          { label: 'À propos', url: '/a-propos' },
          { label: 'Services', url: '/services' },
          { label: 'Contact', url: '/contact' }
        ]
      },
      {
        title: 'Légal',
        links: [
          { label: 'Mentions légales', url: '/mentions-legales' },
          { label: 'Politique de confidentialité', url: '/confidentialite' }
        ]
      }
    ],
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'facebook', url: '#' }
    ],
    copyright: `© ${new Date().getFullYear()} Tous droits réservés`,
    theme: {
      backgroundColor: '#1a202c',
      textColor: '#ffffff'
    }
  }
}

module.exports = {
  syncHeaderFooter,
  fetchHeaderData,
  fetchFooterData,
  createOrUpdateHeader,
  createOrUpdateFooter,
  getDefaultHeader,
  getDefaultFooter
}
