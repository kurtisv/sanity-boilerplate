import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Stream de progression
function createProgressStream() {
  const encoder = new TextEncoder()
  
  return new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`))
    }
  })
}

export async function POST(request: NextRequest) {
  const config = await request.json()
  
  const { readable, writable } = createProgressStream()
  const writer = writable.getWriter()
  
  // Exécuter la génération en arrière-plan
  generateSite(config, writer).catch(err => {
    writer.write({ type: 'error', error: err.message })
    writer.close()
  })
  
  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
}

async function generateSite(config: any, writer: any) {
  const startTime = Date.now()
  const total = config.specialBlocks.length + config.pages.length + 1
  let current = 0
  
  const results = {
    blocks: [] as any[],
    pages: [] as any[],
    compatibility: false,
    duration: 0
  }
  
  try {
    // Étape 1: Générer les blocs spéciaux
    if (config.specialBlocks.length > 0) {
      writer.write({
        type: 'progress',
        progress: { current, total, message: 'Génération des blocs spéciaux...' }
      })
      
      for (const blockType of config.specialBlocks) {
        current++
        writer.write({
          type: 'progress',
          progress: { current, total, message: `Génération du ${blockType}Block...` }
        })
        
        try {
          const result = await generateBlock(blockType, config)
          results.blocks.push({ block: blockType, success: true, result })
        } catch (error: any) {
          results.blocks.push({ block: blockType, success: false, error: error.message })
        }
        
        // Pause pour éviter rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
    
    // Étape 2: Générer les pages
    if (config.pages.length > 0) {
      writer.write({
        type: 'progress',
        progress: { current, total, message: 'Génération des pages...' }
      })
      
      for (const pageName of config.pages) {
        current++
        writer.write({
          type: 'progress',
          progress: { current, total, message: `Génération de la page "${pageName}"...` }
        })
        
        try {
          const result = await generatePage(pageName, config)
          results.pages.push({ page: pageName, success: true, result })
        } catch (error: any) {
          results.pages.push({ page: pageName, success: false, error: error.message })
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
    
    // Étape 3: Vérification de compatibilité
    current++
    writer.write({
      type: 'progress',
      progress: { current, total, message: 'Vérification de compatibilité...' }
    })
    
    results.compatibility = await runCompatibilityCheck()
    
    // Terminé
    results.duration = Math.round((Date.now() - startTime) / 1000)
    
    writer.write({
      type: 'complete',
      result: results
    })
    
  } catch (error: any) {
    writer.write({
      type: 'error',
      error: error.message
    })
  } finally {
    writer.close()
  }
}

async function generateBlock(blockType: string, config: any) {
  const blockPrompts: Record<string, string> = {
    booking: `Créer un BookingBlock pour réservation en ligne. Inclure: formulaire avec nom, email, téléphone, date/heure, service sélectionné, notes, intégration calendrier (Calendly/Google Calendar), confirmation par email, et gestion des créneaux disponibles.`,
    
    map: `Créer un MapBlock pour carte interactive. Inclure: adresse, coordonnées GPS, zoom, style de carte, marqueurs personnalisables, directions, et hauteur configurable.`,
    
    gallery: `Créer un GalleryBlock avancé. Inclure: images avec légendes, layouts (grid/masonry/carousel), lightbox, filtres par catégorie, lazy loading, et support vidéo.`,
    
    testimonials: `Créer un TestimonialsBlock complet. Inclure: citation, auteur, photo, entreprise, note 1-5 étoiles, layouts (grid/carousel/list), filtrage, et featured testimonials.`,
    
    pricing: `Créer un PricingBlock professionnel. Inclure: plans avec nom/prix/description, liste de fonctionnalités, badge "populaire", boutons CTA, période (mensuel/annuel), et comparaison.`,
    
    countdown: `Créer un CountdownBlock dynamique. Inclure: date cible, timer temps réel, labels personnalisables, thèmes, tailles, message après expiration, et animations.`,
    
    comparison: `Créer un ComparisonTableBlock. Inclure: colonnes de produits/services, lignes de fonctionnalités, valeurs (texte/booléen/icônes), CTA par colonne, highlight recommandé, et responsive.`,
    
    socialProof: `Créer un SocialProofBlock. Inclure: logos clients, statistiques clés, témoignages courts, layouts variés, styles (minimal/cards/carousel), et animations.`
  }
  
  const prompt = blockPrompts[blockType]
  if (!prompt) throw new Error(`Bloc inconnu: ${blockType}`)
  
  // Appeler le Builder Agent
  const { run } = require('../../../../agents/builderAgent')
  return await run({ prompt, dryRun: false })
}

async function generatePage(pageName: string, config: any) {
  // Pour l'instant, on simule la génération de page
  // TODO: Implémenter la vraie génération avec Claude
  
  const pagePrompts: Record<string, string> = {
    accueil: `Créer une page d'accueil professionnelle pour ${config.siteName} (${config.industry}). Inclure: hero avec ${config.primaryColor}, section présentation, fonctionnalités clés, témoignages, stats, et CTA. Style: ${config.designStyle}.`,
    
    services: `Créer une page Services pour ${config.siteName}. Inclure: liste des services avec descriptions, tarifs, avantages, processus, et formulaire de contact. Style: ${config.designStyle}.`,
    
    'à propos': `Créer une page À Propos pour ${config.siteName}. Inclure: histoire de l'entreprise, mission/vision/valeurs, équipe, chiffres clés, et timeline. Style: ${config.designStyle}.`,
    
    contact: `Créer une page Contact pour ${config.siteName}. Inclure: formulaire complet, coordonnées, carte interactive, horaires, et réseaux sociaux. Style: ${config.designStyle}.`,
    
    blog: `Créer une page Blog pour ${config.siteName}. Inclure: liste d'articles, filtres par catégorie, recherche, featured posts, et pagination. Style: ${config.designStyle}.`,
    
    tarifs: `Créer une page Tarifs pour ${config.siteName}. Inclure: grille de tarifs, comparaison, FAQ pricing, garanties, et CTA. Style: ${config.designStyle}.`
  }
  
  const prompt = pagePrompts[pageName] || `Créer une page "${pageName}" pour ${config.siteName}. Style: ${config.designStyle}.`
  
  // TODO: Implémenter la génération de page avec Claude
  // Pour l'instant, on retourne un succès simulé
  return { ok: true, page: pageName, prompt }
}

async function runCompatibilityCheck() {
  try {
    const { run } = require('../../../../agents/compatibilityAgent')
    const result = await run({ dryRun: false })
    return result.ok
  } catch (error) {
    console.error('Erreur lors de la vérification de compatibilité:', error)
    return false
  }
}
