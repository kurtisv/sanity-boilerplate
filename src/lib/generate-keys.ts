/**
 * Utilitaires pour générer des clés uniques (_key) pour les implémentations automatiques
 */

/**
 * Génère une clé unique basée sur un préfixe et un index
 */
export function generateKey(prefix: string, index?: number): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 5)
  const indexSuffix = index !== undefined ? `-${index}` : ''
  
  return `${prefix}${indexSuffix}-${timestamp}-${random}`
}

/**
 * Génère une clé unique pour un bouton CTA
 */
export function generateCtaKey(text: string, index: number): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 20)
  
  return `cta-${slug}-${index}`
}

/**
 * Génère une clé unique pour une fonctionnalité
 */
export function generateFeatureKey(title: string, index: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 20)
  
  return `feature-${slug}-${index}`
}

/**
 * Génère une clé unique pour un champ de formulaire
 */
export function generateFieldKey(fieldType: string, index: number): string {
  return `field-${fieldType}-${index}`
}

/**
 * Génère une clé unique pour une statistique
 */
export function generateStatKey(label: string, index: number): string {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 20)
  
  return `stat-${slug}-${index}`
}

/**
 * Génère une clé unique pour un membre d'équipe
 */
export function generateMemberKey(name: string, index: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 20)
  
  return `member-${slug}-${index}`
}

/**
 * Génère une clé unique pour un témoignage
 */
export function generateTestimonialKey(authorName: string, index: number): string {
  const slug = authorName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 20)
  
  return `testimonial-${slug}-${index}`
}

/**
 * Génère une clé unique pour une image de galerie
 */
export function generateImageKey(alt: string, index: number): string {
  const slug = alt
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 20)
  
  return `image-${slug}-${index}`
}

/**
 * Génère une clé unique pour un bloc de contenu textuel
 */
export function generateContentBlockKey(style: string, index: number): string {
  return `${style}-block-${index}`
}
