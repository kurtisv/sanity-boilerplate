'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface VideoBlockProps {
  title?: string
  subtitle?: string
  videoType?: 'youtube' | 'vimeo' | 'hosted' | 'external'
  youtubeId?: string
  vimeoId?: string
  hostedVideo?: {
    asset?: {
      url?: string
    }
  }
  externalUrl?: string
  thumbnail?: {
    asset?: {
      _ref: string
      url?: string
    }
  }
  layout?: 'centered' | 'full-width' | 'with-sidebar'
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9'
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  playButton?: {
    enabled: boolean
    style?: 'default' | 'minimal' | 'large'
  }
  overlay?: {
    enabled: boolean
    color?: string
    opacity?: number
  }
  caption?: string
  transcript?: string
  backgroundSettings?: {
    backgroundColor?: string
  }
  styling?: {
    textColor?: string
    headingColor?: string
  }
}

const VideoSection = styled.section<{ $backgroundColor?: string }>`
  position: relative;
  width: 100%;
  padding: 5rem 0;
  background: ${props => props.$backgroundColor || '#ffffff'};
`

const Container = styled.div<{ $layout?: string }>`
  width: 100%;
  max-width: ${props => props.$layout === 'full-width' ? '100%' : '1200px'};
  margin: 0 auto;
  padding: ${props => props.$layout === 'full-width' ? '0' : '0 2rem'};
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`

const Title = styled.h2<{ $color?: string }>`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  color: ${props => props.$color || '#1f2937'};
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
`

const Subtitle = styled.p<{ $color?: string }>`
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.7;
  color: ${props => props.$color || '#6b7280'};
  max-width: 700px;
  margin: 0 auto;
`

const VideoWrapper = styled.div<{ $aspectRatio?: string }>`
  position: relative;
  width: 100%;
  padding-bottom: ${props => {
    switch (props.$aspectRatio) {
      case '4:3': return '75%'
      case '1:1': return '100%'
      case '21:9': return '42.857%'
      default: return '56.25%' // 16:9
    }
  }};
  background: #000000;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`

const VideoPlayer = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ThumbnailOverlay = styled.div<{ $isPlaying: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${props => props.$isPlaying ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.9;
  }
`

const ThumbnailImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const Overlay = styled.div<{ $color?: string; $opacity?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.$color || '#000000'};
  opacity: ${props => props.$opacity || 0.3};
  z-index: 2;
`

const PlayButton = styled.button<{ $style?: string }>`
  position: relative;
  z-index: 3;
  width: ${props => props.$style === 'large' ? '120px' : '80px'};
  height: ${props => props.$style === 'large' ? '120px' : '80px'};
  border-radius: 50%;
  background: ${props => props.$style === 'minimal' 
    ? 'rgba(255, 255, 255, 0.9)' 
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  border: ${props => props.$style === 'minimal' ? '3px solid #ffffff' : 'none'};
  color: ${props => props.$style === 'minimal' ? '#667eea' : '#ffffff'};
  font-size: ${props => props.$style === 'large' ? '3rem' : '2rem'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  }
  
  &::before {
    content: '▶';
    margin-left: 0.25rem;
  }
`

const Caption = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9375rem;
  color: #6b7280;
  font-style: italic;
`

const Transcript = styled.details`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  
  summary {
    font-weight: 600;
    color: #1f2937;
    cursor: pointer;
    user-select: none;
    
    &:hover {
      color: #667eea;
    }
  }
  
  p {
    margin-top: 1rem;
    color: #6b7280;
    line-height: 1.7;
  }
`

export default function VideoBlock({
  title,
  subtitle,
  videoType = 'youtube',
  youtubeId,
  vimeoId,
  hostedVideo,
  externalUrl,
  thumbnail,
  layout = 'centered',
  aspectRatio = '16:9',
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  playButton,
  overlay,
  caption,
  transcript,
  backgroundSettings,
  styling
}: VideoBlockProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay)
  
  const thumbnailUrl = thumbnail?.asset?._ref 
    ? urlFor(thumbnail).width(1920).height(1080).url()
    : null

  const getVideoUrl = () => {
    switch (videoType) {
      case 'youtube':
        return youtubeId 
          ? `https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}&mute=${muted ? 1 : 0}&controls=${controls ? 1 : 0}`
          : null
      case 'vimeo':
        return vimeoId 
          ? `https://player.vimeo.com/video/${vimeoId}?autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}&muted=${muted ? 1 : 0}`
          : null
      case 'hosted':
        return hostedVideo?.asset?.url || null
      case 'external':
        return externalUrl || null
      default:
        return null
    }
  }

  const videoUrl = getVideoUrl()

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <VideoSection $backgroundColor={backgroundSettings?.backgroundColor}>
      <Container $layout={layout}>
        {(title || subtitle) && (
          <Header>
            {title && <Title $color={styling?.headingColor}>{title}</Title>}
            {subtitle && <Subtitle $color={styling?.textColor}>{subtitle}</Subtitle>}
          </Header>
        )}
        
        <VideoWrapper $aspectRatio={aspectRatio}>
          {videoType === 'hosted' && videoUrl ? (
            <VideoElement
              src={videoUrl}
              autoPlay={autoplay}
              loop={loop}
              muted={muted}
              controls={controls}
            />
          ) : isPlaying && videoUrl ? (
            <VideoPlayer
              src={videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : null}
          
          {!isPlaying && playButton?.enabled && (
            <ThumbnailOverlay $isPlaying={isPlaying} onClick={handlePlay}>
              {thumbnailUrl && (
                <ThumbnailImage>
                  <Image
                    src={thumbnailUrl}
                    alt={title || 'Video thumbnail'}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </ThumbnailImage>
              )}
              {overlay?.enabled && (
                <Overlay $color={overlay.color} $opacity={overlay.opacity} />
              )}
              <PlayButton $style={playButton.style}>
              </PlayButton>
            </ThumbnailOverlay>
          )}
        </VideoWrapper>
        
        {caption && <Caption>{caption}</Caption>}
        
        {transcript && (
          <Transcript>
            <summary>Voir la transcription</summary>
            <p>{transcript}</p>
          </Transcript>
        )}
      </Container>
    </VideoSection>
  )
}
