import { type SchemaTypeDefinition } from 'sanity'

// Documents
import page from '../schemas/page'
import blockContent from '../schemas/blockContent'
import blogPost from '../schemas/documents/blogPost'
import author from '../schemas/documents/author'
import category from '../schemas/documents/category'

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
import blogBlock from '../schemas/blocks/blogBlock'
import pricingBlock from '../schemas/blocks/pricingBlock'
import testimonialsBlock from '../schemas/blocks/testimonialsBlock'
import ctaBlock from '../schemas/blocks/ctaBlock'
import faqBlock from '../schemas/blocks/faqBlock'
import logoCloudBlock from '../schemas/blocks/logoCloudBlock'
import videoBlock from '../schemas/blocks/videoBlock'
import accordionBlock from '../schemas/blocks/accordionBlock'
import tabsBlock from '../schemas/blocks/tabsBlock'
import newsletterBlock from '../schemas/blocks/newsletterBlock'
import logoGridBlock from '../schemas/blocks/logoGridBlock'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    page,
    blockContent,
    blogPost,
    author,
    category,
    
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
    blogBlock,
    pricingBlock,
    testimonialsBlock,
    ctaBlock,
    faqBlock,
    logoCloudBlock,
    videoBlock,
    accordionBlock,
    tabsBlock,
    newsletterBlock,
    logoGridBlock,
  ],
}
