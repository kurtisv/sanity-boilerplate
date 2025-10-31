import { type SchemaTypeDefinition } from 'sanity'

// Documents
import page from '../schemas/page'

// Settings (Paramètres du site)
import headerSettings from '../schemas/settings/headerSettings'
import footerSettings from '../schemas/settings/footerSettings'

// Blocks (Composants pour le page builder)
import textBlock from '../schemas/blocks/textBlock'
import headerBlock from '../schemas/blocks/headerBlock'
import footerBlock from '../schemas/blocks/footerBlock'
import heroBlock from '../schemas/blocks/heroBlock'
import featureGridBlock from '../schemas/blocks/featureGridBlock'
// Ajoutez vos autres blocs ici

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    page,
    
    // Settings
    headerSettings,
    footerSettings,
    
    // Blocks
    textBlock,
    headerBlock,
    footerBlock,
    heroBlock,
    featureGridBlock,
    // Ajoutez vos autres blocs ici
  ],
}
