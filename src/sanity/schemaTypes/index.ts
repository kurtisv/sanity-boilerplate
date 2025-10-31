import { type SchemaTypeDefinition } from 'sanity'

// Documents
import page from '../schemas/page'

// Settings (Paramètres du site)
import siteSettings from '../schemas/siteSettings'
import headerSettings from '../schemas/settings/headerSettings'
import footerSettings from '../schemas/settings/footerSettings'

// Blocks (Composants pour le page builder)
import textBlock from '../schemas/blocks/textBlock'
// Ajoutez vos autres blocs ici

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    page,
    
    // Settings
    siteSettings,
    headerSettings,
    footerSettings,
    
    // Blocks
    textBlock,
    // Ajoutez vos autres blocs ici
  ],
}
