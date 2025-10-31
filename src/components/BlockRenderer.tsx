import TextBlock from "./blocks/TextBlock"
import HeroBlock from "./blocks/HeroBlock"

// Base block interface
interface BaseBlock {
  _type: string
  _key: string
}

// Specific block types
interface TextBlockData extends BaseBlock {
  _type: 'textBlock'
  content: any // Portable Text content
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

// Union type for all possible blocks
type Block = TextBlockData | HeroBlockData

type BlockRendererProps = {
  blocks: Block[]
}

/**
 * BlockRenderer
 * 
 * Dynamically renders blocks based on their type.
 * To add a new block:
 * 1. Import the block component
 * 2. Add a case in the switch statement
 * 3. Return the component with props
 */
export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case 'textBlock':
            return <TextBlock key={block._key} {...block} />
          
          case 'heroBlock':
            return <HeroBlock key={block._key} {...block} />
          
          // Add more block types here:
          
          default:
            return null
        }
      })}
    </>
  )
}
