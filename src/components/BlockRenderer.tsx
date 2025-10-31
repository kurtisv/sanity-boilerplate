import TextBlock from "./blocks/TextBlock"
import HeroBlock from "./blocks/HeroBlock"
import FeatureGridBlock from "./blocks/FeatureGridBlock"

// Base block interface
interface BaseBlock {
  _type: string
  _key: string
}

// Specific block types
interface TextBlockData extends BaseBlock {
  _type: 'textBlock'
  content?: any[] // Portable Text content array
  alignment?: 'left' | 'center' | 'right'
  maxWidth?: 'narrow' | 'medium' | 'wide' | 'full'
  backgroundColor?: string
  paddingSize?: 'small' | 'medium' | 'large'
}

interface HeroBlockData extends BaseBlock {
  _type: 'heroBlock'
  title: string
  subtitle?: string
  cta?: {
    text: string
    link: string
    style: 'primary' | 'secondary' | 'ghost'
  }
  backgroundImage?: {
    asset: {
      _id: string
      url: string
    }
  }
  backgroundOverlay?: {
    enabled: boolean
    color: string
  }
  textAlignment: 'left' | 'center' | 'right'
  verticalAlignment: 'top' | 'center' | 'bottom'
  height: 'small' | 'medium' | 'large' | 'fullscreen'
  textColor: string
  backgroundColor: string
}

interface FeatureGridBlockData extends BaseBlock {
  _type: 'featureGridBlock'
  title?: string
  subtitle?: string
  gridLayout: string
  features: Array<{
    icon: string
    iconColor: string
    title: string
    description: string
    link?: {
      url: string
      text: string
    }
    featured: boolean
  }>
  cardStyle: 'minimal' | 'bordered' | 'shadow' | 'colored' | 'glass'
  iconStyle: 'simple' | 'circle' | 'square' | 'gradient'
  textAlignment: 'left' | 'center' | 'right'
  spacing: 'compact' | 'normal' | 'large'
  backgroundColor: string
  textColor: string
}

// Union type for all possible blocks
export type Block = TextBlockData | HeroBlockData | FeatureGridBlockData

type BlockRendererProps = {
  blocks: Block[]
}

/**
 * BlockRenderer
 * 
 * Dynamically renders blocks based on their type with full type safety.
 * 
 * Supported blocks:
 * - textBlock: Rich content with Portable Text
 * - heroBlock: Hero banners with CTA and background images
 * - featureGridBlock: Feature grids with icons and multiple layouts
 * 
 * To add a new block:
 * 1. Create the block component in src/components/blocks/
 * 2. Add the block schema in src/sanity/schemas/blocks/
 * 3. Register the schema in src/sanity/schemaTypes/index.ts
 * 4. Add the block to the page schema in src/sanity/schemas/page.ts
 * 5. Update the GROQ query in src/sanity/lib/queries.ts
 * 6. Import the component here
 * 7. Add the interface type above
 * 8. Add to the Block union type
 * 9. Add a case in the switch statement below
 */
export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block) => {
        // Validation runtime pour s'assurer que le bloc a les propriétés requises
        if (!block._type || !block._key) {
          console.warn('Block missing required _type or _key:', block)
          return null
        }

        switch (block._type) {
          case 'textBlock':
            return <TextBlock key={block._key} {...block} />
          
          case 'heroBlock':
            // Validation spécifique pour heroBlock
            if (!block.title) {
              console.warn('HeroBlock missing required title:', block)
              return null
            }
            return <HeroBlock key={block._key} {...block} />
          
          case 'featureGridBlock':
            // Validation spécifique pour featureGridBlock
            if (!block.features || !Array.isArray(block.features)) {
              console.warn('FeatureGridBlock missing or invalid features array:', block)
              return null
            }
            return <FeatureGridBlock key={block._key} {...block} />
          
          // Add more block types here:
          
          default:
            console.warn('Unknown block type:', (block as any)._type)
            return null
        }
      })}
    </>
  )
}
