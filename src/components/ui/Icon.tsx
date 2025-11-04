'use client'

import React from 'react'

// Mapping des icônes vers des emojis (temporaire jusqu'à installation de lucide-react)
const iconEmojiMap: Record<string, string> = {
  star: '⭐',
  heart: '❤️',
  target: '🎯',
  rocket: '🚀',
  zap: '⚡',
  flame: '🔥',
  diamond: '💎',
  trophy: '🏆',
  palette: '🎨',
  briefcase: '💼',
  'bar-chart': '📊',
  'trending-up': '📈',
  'dollar-sign': '💰',
  building: '🏢',
  handshake: '🤝',
  clipboard: '📋',
  settings: '⚙️',
  wrench: '🔧',
  shield: '🛡️',
  phone: '📞',
  mail: '📧',
  'message-circle': '💬',
  megaphone: '📢',
  monitor: '📺',
  smartphone: '📱',
  globe: '🌐',
  radio: '📡',
  link: '🔗',
  send: '📤',
  home: '🏠',
  user: '👤',
  users: '👥',
  'map-pin': '📍',
  compass: '🧭',
  search: '🔍',
  'arrow-up': '⬆️',
  'arrow-down': '⬇️',
  'arrow-right': '➡️',
  'arrow-left': '⬅️',
  edit: '📝',
  book: '📖',
  'file-text': '📄',
  image: '🖼️',
  video: '🎥',
  music: '🎵',
  package: '📦',
  tag: '🏷️',
  calendar: '📅',
  clock: '⏰',
  laptop: '💻',
  desktop: '🖥️',
  keyboard: '⌨️',
  mouse: '🖱️',
  plug: '🔌',
  battery: '🔋',
  cloud: '☁️',
  'hard-drive': '💾',
  lock: '🔒',
  unlock: '🔓',
}

interface IconProps {
  icon?: {
    iconType?: string
    iconColor?: string
    iconSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    iconPosition?: 'top' | 'left' | 'right' | 'background'
    iconStyle?: 'normal' | 'filled' | 'outlined' | 'shadow' | 'circle' | 'rounded'
  }
  className?: string
  fallback?: React.ReactNode
}

export default function Icon({ icon, className = '', fallback }: IconProps) {
  if (!icon?.iconType) {
    return fallback ? <>{fallback}</> : null
  }

  // Récupérer l'emoji correspondant à l'icône
  const emoji = iconEmojiMap[icon.iconType] || '❓'

  // Déterminer la taille
  const getSizeClasses = () => {
    switch (icon.iconSize) {
      case 'sm': return 'w-4 h-4'
      case 'md': return 'w-6 h-6'
      case 'lg': return 'w-8 h-8'
      case 'xl': return 'w-12 h-12'
      case '2xl': return 'w-16 h-16'
      default: return 'w-6 h-6'
    }
  }

  // Déterminer les classes de style
  const getStyleClasses = () => {
    const baseClasses = getSizeClasses()
    
    switch (icon.iconStyle) {
      case 'filled':
        return `${baseClasses} p-2 rounded-lg`
      case 'outlined':
        return `${baseClasses} p-2 border-2 rounded-lg`
      case 'shadow':
        return `${baseClasses} p-2 rounded-lg shadow-lg`
      case 'circle':
        return `${baseClasses} p-2 rounded-full`
      case 'rounded':
        return `${baseClasses} p-2 rounded-xl`
      case 'normal':
      default:
        return baseClasses
    }
  }

  // Déterminer les styles inline
  const getInlineStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {
      color: icon.iconColor || '#3b82f6',
    }

    if (icon.iconStyle === 'filled') {
      styles.backgroundColor = icon.iconColor || '#3b82f6'
      styles.color = '#ffffff'
    } else if (icon.iconStyle === 'outlined') {
      styles.borderColor = icon.iconColor || '#3b82f6'
    }

    return styles
  }

  return (
    <span
      className={`inline-flex items-center justify-center ${getStyleClasses()} ${className}`}
      style={getInlineStyles()}
    >
      {emoji}
    </span>
  )
}

// Hook pour utiliser les icônes facilement
export function useIcon(iconConfig?: IconProps['icon']) {
  return {
    hasIcon: Boolean(iconConfig?.iconType),
    iconComponent: <Icon icon={iconConfig} />,
    iconConfig,
  }
}

// Composant wrapper pour les icônes avec position
interface IconWrapperProps {
  icon?: IconProps['icon']
  children: React.ReactNode
  className?: string
}

export function IconWrapper({ icon, children, className = '' }: IconWrapperProps) {
  const { hasIcon, iconComponent } = useIcon(icon)

  if (!hasIcon) {
    return <div className={className}>{children}</div>
  }

  const getLayoutClasses = () => {
    switch (icon?.iconPosition) {
      case 'left':
        return 'flex items-center gap-3'
      case 'right':
        return 'flex items-center gap-3 flex-row-reverse'
      case 'top':
        return 'flex flex-col items-center gap-3'
      case 'background':
        return 'relative'
      default:
        return 'flex flex-col items-center gap-3'
    }
  }

  if (icon?.iconPosition === 'background') {
    return (
      <div className={`${className} ${getLayoutClasses()}`}>
        <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
          {iconComponent}
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className={`${className} ${getLayoutClasses()}`}>
      {icon?.iconPosition === 'right' ? (
        <>
          {children}
          {iconComponent}
        </>
      ) : (
        <>
          {iconComponent}
          {children}
        </>
      )}
    </div>
  )
}
