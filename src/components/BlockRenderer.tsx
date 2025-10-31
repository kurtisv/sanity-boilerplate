import TextBlock from "./blocks/TextBlock"
import HeroBlock from "./blocks/HeroBlock"

type Block = {
  _type: string
  _key: string
  [key: string]: any
}

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
