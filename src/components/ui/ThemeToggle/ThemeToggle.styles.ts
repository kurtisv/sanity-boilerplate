import styled, { css } from 'styled-components'

// Icônes avec animations
export const IconSun = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-base);
  
  svg {
    color: var(--theme-text-primary);
  }
  
  &:hover {
    transform: rotate(45deg);
  }
`

export const IconMoon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-base);
  
  svg {
    color: var(--theme-text-primary);
  }
  
  &:hover {
    transform: rotate(-15deg);
  }
`

export const IconAuto = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-base);
  
  svg {
    color: var(--theme-text-primary);
  }
  
  &:hover {
    transform: scale(1.1);
  }
`

// Container du dropdown
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  
  &:hover > div:last-child {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`

// Trigger du dropdown
export const DropdownTrigger = styled.button<{ $size: 'sm' | 'md' | 'lg' }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: ${props => {
    switch (props.$size) {
      case 'sm': return 'var(--spacing-2) var(--spacing-3)'
      case 'lg': return 'var(--spacing-4) var(--spacing-5)'
      default: return 'var(--spacing-3) var(--spacing-4)'
    }
  }};
  background: var(--theme-bg-elevated);
  border: 1px solid var(--theme-border-primary);
  border-radius: var(--border-radius-md);
  color: var(--theme-text-primary);
  cursor: pointer;
  transition: all var(--transition-base);
  
  &:hover {
    background: var(--theme-hover-bg);
    border-color: var(--theme-border-secondary);
  }
  
  &:focus-visible {
    outline: 2px solid var(--theme-border-focus);
    outline-offset: 2px;
  }
`

export const DropdownArrow = styled.span`
  display: flex;
  align-items: center;
  transition: transform var(--transition-base);
  
  svg {
    color: var(--theme-text-tertiary);
  }
  
  ${DropdownContainer}:hover & {
    transform: rotate(180deg);
  }
`

// Contenu du dropdown
export const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: var(--z-index-dropdown);
  min-width: 200px;
  margin-top: var(--spacing-2);
  padding: var(--spacing-2);
  background: var(--theme-bg-elevated);
  border: 1px solid var(--theme-border-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--theme-shadow-lg);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all var(--transition-base);
`

// Item du dropdown
export const DropdownItem = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  padding: var(--spacing-3);
  background: ${props => props.$active ? 'var(--theme-selected-bg)' : 'transparent'};
  border: none;
  border-radius: var(--border-radius-md);
  color: var(--theme-text-primary);
  cursor: pointer;
  transition: all var(--transition-base);
  
  &:hover {
    background: ${props => props.$active ? 'var(--theme-selected-bg)' : 'var(--theme-hover-bg)'};
  }
  
  &:focus-visible {
    outline: 2px solid var(--theme-border-focus);
    outline-offset: 2px;
  }
  
  & + & {
    margin-top: var(--spacing-1);
  }
`

export const ThemeInfo = styled.div`
  flex: 1;
  text-align: left;
`

export const ThemeLabel = styled.div`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--theme-text-primary);
`

export const ThemeDescription = styled.div`
  font-size: var(--font-size-xs);
  color: var(--theme-text-tertiary);
  margin-top: var(--spacing-1);
`

export const CheckIcon = styled.span`
  display: flex;
  align-items: center;
  color: var(--color-primary);
  
  svg {
    width: 16px;
    height: 16px;
  }
`
