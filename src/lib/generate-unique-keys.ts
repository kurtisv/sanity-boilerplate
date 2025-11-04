/**
 * Générateur de clés uniques pour Sanity
 * Utilise un timestamp et un compteur pour garantir l'unicité
 */

let keyCounter = 0;

/**
 * Génère une clé unique basée sur un préfixe, timestamp et compteur
 */
export function generateUniqueKey(prefix: string = 'item'): string {
  const timestamp = Date.now();
  const counter = ++keyCounter;
  return `${prefix}-${timestamp}-${counter}`;
}

/**
 * Génère une clé unique pour un bouton CTA
 */
export function generateCtaKey(action: string = 'cta'): string {
  return generateUniqueKey(`cta-${action}`);
}

/**
 * Génère une clé unique pour une feature
 */
export function generateFeatureKey(name: string = 'feature'): string {
  return generateUniqueKey(`feature-${name}`);
}

/**
 * Génère une clé unique pour un champ de formulaire
 */
export function generateFieldKey(fieldType: string = 'field'): string {
  return generateUniqueKey(`field-${fieldType}`);
}

/**
 * Génère une clé unique pour un bloc de contenu
 */
export function generateBlockKey(blockType: string = 'block'): string {
  return generateUniqueKey(`block-${blockType}`);
}

/**
 * Génère une clé unique pour un span de texte
 */
export function generateSpanKey(context: string = 'span'): string {
  return generateUniqueKey(`span-${context}`);
}

/**
 * Génère une clé unique pour une statistique
 */
export function generateStatKey(name: string = 'stat'): string {
  return generateUniqueKey(`stat-${name}`);
}

/**
 * Génère une clé unique pour une image
 */
export function generateImageKey(context: string = 'image'): string {
  return generateUniqueKey(`img-${context}`);
}

/**
 * Génère une clé unique pour un élément de liste
 */
export function generateListKey(context: string = 'item'): string {
  return generateUniqueKey(`list-${context}`);
}
