'use client'

import React, { useState } from 'react'
import styled from 'styled-components'

interface Tab {
  _key?: string
  label: string
  content: string
  icon?: string
  iconColor?: string
  badge?: string
  badgeColor?: string
  defaultActive?: boolean
}

interface TabsBlockProps {
  title?: string
  subtitle?: string
  layout?: 'horizontal' | 'vertical'
  tabs: Tab[]
  tabStyle?: 'pills' | 'underline' | 'boxed' | 'minimal'
  contentStyle?: 'card' | 'minimal'
  animation?: 'fade' | 'slide' | 'none'
  persistent?: boolean
  fullWidth?: boolean
  backgroundSettings?: {
    backgroundColor?: string
  }
  styling?: {
    textColor?: string
    headingColor?: string
    accentColor?: string
  }
}

const TabsSection = styled.section<{ $backgroundColor?: string }>`
  position: relative;
  width: 100%;
  padding: 5rem 0;
  background: ${props => props.$backgroundColor || '#ffffff'};
`

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

const TabsWrapper = styled.div<{ $layout?: string }>`
  display: ${props => props.$layout === 'vertical' ? 'grid' : 'block'};
  grid-template-columns: ${props => props.$layout === 'vertical' ? '250px 1fr' : '1fr'};
  gap: 2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

const TabList = styled.div<{ $layout?: string; $tabStyle?: string; $fullWidth?: boolean }>`
  display: flex;
  flex-direction: ${props => props.$layout === 'vertical' ? 'column' : 'row'};
  gap: ${props => props.$tabStyle === 'pills' ? '0.75rem' : '0'};
  ${props => props.$tabStyle === 'underline' && `
    border-bottom: 2px solid #e5e7eb;
  `}
  ${props => props.$fullWidth && props.$layout !== 'vertical' && `
    width: 100%;
  `}
  
  @media (max-width: 768px) {
    flex-direction: ${props => props.$layout === 'vertical' ? 'column' : 'row'};
    overflow-x: ${props => props.$layout !== 'vertical' ? 'auto' : 'visible'};
    -webkit-overflow-scrolling: touch;
  }
`

const TabButton = styled.button<{ $isActive: boolean; $tabStyle?: string; $fullWidth?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${props => props.$tabStyle === 'pills' ? '0.75rem 1.5rem' : '1rem 1.5rem'};
  background: ${props => {
    if (props.$tabStyle === 'pills') {
      return props.$isActive 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
        : '#f3f4f6'
    }
    if (props.$tabStyle === 'boxed') {
      return props.$isActive ? '#ffffff' : 'transparent'
    }
    return 'transparent'
  }};
  color: ${props => {
    if (props.$tabStyle === 'pills') {
      return props.$isActive ? '#ffffff' : '#6b7280'
    }
    return props.$isActive ? '#667eea' : '#6b7280'
  }};
  border: ${props => {
    if (props.$tabStyle === 'boxed') {
      return props.$isActive ? '2px solid #667eea' : '2px solid #e5e7eb'
    }
    return 'none'
  }};
  border-radius: ${props => {
    if (props.$tabStyle === 'pills') return '0.75rem'
    if (props.$tabStyle === 'boxed') return '0.5rem'
    return '0'
  }};
  font-size: 1rem;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  flex: ${props => props.$fullWidth ? '1' : 'initial'};
  justify-content: ${props => props.$fullWidth ? 'center' : 'flex-start'};
  
  ${props => props.$tabStyle === 'underline' && props.$isActive && `
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
  `}
  
  &:hover {
    ${props => {
      if (props.$tabStyle === 'pills') {
        return props.$isActive 
          ? 'opacity: 0.9;' 
          : 'background: #e5e7eb;'
      }
      return 'color: #667eea;'
    }}
  }
`

const TabIcon = styled.span<{ $color?: string }>`
  font-size: 1.25rem;
  color: ${props => props.$color || 'currentColor'};
`

const Badge = styled.span<{ $color?: string }>`
  padding: 0.25rem 0.625rem;
  background: ${props => props.$color || '#ef4444'};
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 1rem;
  margin-left: auto;
`

const TabContent = styled.div<{ $contentStyle?: string }>`
  ${props => props.$contentStyle === 'card' && `
    background: #ffffff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  `}
  
  ${props => props.$contentStyle === 'minimal' && `
    padding: 1.5rem 0;
  `}
`

const TabPanel = styled.div<{ $isActive: boolean }>`
  display: ${props => props.$isActive ? 'block' : 'none'};
  animation: ${props => props.$isActive ? 'fadeIn 0.3s ease-in' : 'none'};
  color: #374151;
  font-size: 1rem;
  line-height: 1.7;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export default function TabsBlock({
  title,
  subtitle,
  layout = 'horizontal',
  tabs,
  tabStyle = 'pills',
  contentStyle = 'card',
  fullWidth = false,
  backgroundSettings,
  styling
}: TabsBlockProps) {
  const defaultActiveIndex = tabs.findIndex(tab => tab.defaultActive) || 0
  const [activeTab, setActiveTab] = useState(defaultActiveIndex >= 0 ? defaultActiveIndex : 0)

  return (
    <TabsSection $backgroundColor={backgroundSettings?.backgroundColor}>
      <Container>
        {(title || subtitle) && (
          <Header>
            {title && <Title $color={styling?.headingColor}>{title}</Title>}
            {subtitle && <Subtitle $color={styling?.textColor}>{subtitle}</Subtitle>}
          </Header>
        )}
        
        <TabsWrapper $layout={layout}>
          <TabList $layout={layout} $tabStyle={tabStyle} $fullWidth={fullWidth}>
            {tabs.map((tab, index) => (
              <TabButton
                key={tab._key || `tab-${index}`}
                $isActive={activeTab === index}
                $tabStyle={tabStyle}
                $fullWidth={fullWidth}
                onClick={() => setActiveTab(index)}
              >
                {tab.icon && <TabIcon $color={tab.iconColor}>{tab.icon}</TabIcon>}
                {tab.label}
                {tab.badge && <Badge $color={tab.badgeColor}>{tab.badge}</Badge>}
              </TabButton>
            ))}
          </TabList>
          
          <TabContent $contentStyle={contentStyle}>
            {tabs.map((tab, index) => (
              <TabPanel
                key={tab._key || `panel-${index}`}
                $isActive={activeTab === index}
              >
                {tab.content}
              </TabPanel>
            ))}
          </TabContent>
        </TabsWrapper>
      </Container>
    </TabsSection>
  )
}
