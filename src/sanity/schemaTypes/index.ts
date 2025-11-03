import { type SchemaTypeDefinition } from 'sanity'

// Documents
import page from '../schemas/page'
import blockContent from '../schemas/blockContent'

// Settings (Paramètres du site)
import headerSettings from '../schemas/settings/headerSettings'
import footerSettings from '../schemas/settings/footerSettings'

// Documentation
import blockDocumentation from '../schemas/documentation/blockDocumentation'

// Blocks (Composants pour le page builder)
import textBlock from '../schemas/blocks/textBlock'
import headerBlock from '../schemas/blocks/headerBlock'
import footerBlock from '../schemas/blocks/footerBlock'
import heroBlock from '../schemas/blocks/heroBlock'
import featureGridBlock from '../schemas/blocks/featureGridBlock'
import contactBlock from '../schemas/blocks/contactBlock'
import galleryBlock from '../schemas/blocks/galleryBlock'
import teamBlock from '../schemas/blocks/teamBlock'
import statsBlock from '../schemas/blocks/statsBlock'
// Ajoutez vos autres blocs ici

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    page,
    blockContent,
    
    // Settings
    headerSettings,
    footerSettings,
    
    // Documentation
    blockDocumentation,
    
    // Blocks
    textBlock,
    headerBlock,
    footerBlock,
    heroBlock,
    featureGridBlock,
    contactBlock,
    galleryBlock,
    teamBlock,
    statsBlock,
    // Ajoutez vos autres blocs ici
  ],
}
