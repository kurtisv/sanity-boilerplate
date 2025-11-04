import page from './page'
import blockContent from './blockContent'

// Settings (Paramètres du site)
import headerSettings from './settings/headerSettings'
import footerSettings from './settings/footerSettings'

// Documentation
import blockDocumentation from './documentation/blockDocumentation'

// Blocks (Composants pour le page builder)
import textBlock from './blocks/textBlock'
import headerBlock from './blocks/headerBlock'
import footerBlock from './blocks/footerBlock'
import heroBlock from './blocks/heroBlock'
import featureGridBlock from './blocks/featureGridBlock'
import contactBlock from './blocks/contactBlock'
import galleryBlock from './blocks/galleryBlock'
import teamBlock from './blocks/teamBlock'
import statsBlock from './blocks/statsBlock'

export const schemaTypes = [
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
]
