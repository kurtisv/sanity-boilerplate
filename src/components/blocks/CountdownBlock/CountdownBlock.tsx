'use client'

import { useEffect, useState } from 'react'

interface CountdownBlockProps {
  data: {
    title?: string
    description?: string
    targetDate: string
    labels?: {
      days?: string
      hours?: string
      minutes?: string
      seconds?: string
    }
    theme?: 'default' | 'dark' | 'gradient' | 'minimal' | 'neon'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    backgroundColor?: string
    textColor?: string
    accentColor?: string
    animation?: 'none' | 'fade' | 'scale' | 'slide' | 'bounce' | 'flip'
    showSeparators?: boolean
    expiredMessage?: {
      title?: string
      description?: string
      buttonText?: string
      buttonUrl?: string
    }
    centerAlign?: boolean
  }
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownBlock({ data }: CountdownBlockProps) {
  const {
    title,
    description,
    targetDate,
    labels = {},
    theme = 'default',
    size = 'md',
    backgroundColor,
    textColor,
    accentColor,
    animation = 'fade',
    showSeparators = true,
    expiredMessage = {},
    centerAlign = true
  } = data || {}

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!targetDate || !mounted) return

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
        setIsExpired(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsExpired(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate, mounted])

  if (!mounted) {
    return <div className="py-12"></div>
  }

  const themeClasses = {
    default: 'bg-white text-gray-900 border border-gray-200',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white',
    minimal: 'bg-gray-50 text-gray-800',
    neon: 'bg-black text-cyan-400 border border-cyan-400'
  }

  const sizeClasses = {
    sm: {
      container: 'py-8',
      title: 'text-2xl md:text-3xl',
      description: 'text-sm',
      number: 'text-3xl md:text-4xl',
      label: 'text-xs',
      timeUnit: 'w-16 h-16 md:w-20 md:h-20',
      separator: 'text-2xl'
    },
    md: {
      container: 'py-12',
      title: 'text-3xl md:text-4xl',
      description: 'text-base',
      number: 'text-4xl md:text-5xl',
      label: 'text-sm',
      timeUnit: 'w-20 h-20 md:w-24 md:h-24',
      separator: 'text-3xl'
    },
    lg: {
      container: 'py-16',
      title: 'text-4xl md:text-5xl',
      description: 'text-lg',
      number: 'text-5xl md:text-6xl',
      label: 'text-base',
      timeUnit: 'w-24 h-24 md:w-28 md:h-28',
      separator: 'text-4xl'
    },
    xl: {
      container: 'py-20',
      title: 'text-5xl md:text-6xl',
      description: 'text-xl',
      number: 'text-6xl md:text-7xl',
      label: 'text-lg',
      timeUnit: 'w-28 h-28 md:w-32 md:h-32',
      separator: 'text-5xl'
    }
  }

  const animationClasses = {
    none: '',
    fade: 'transition-opacity duration-1000',
    scale: 'transition-transform duration-500 hover:scale-105',
    slide: 'transform transition-transform duration-500',
    bounce: 'animate-bounce',
    flip: 'transition-transform duration-700 transform-gpu'
  }

  const currentSize = sizeClasses[size]
  const currentTheme = themeClasses[theme]
  const currentAnimation = animationClasses[animation]

  const customStyles = {
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor })
  }

  if (isExpired && expiredMessage) {
    return (
      <section 
        className={`${currentSize.container} ${currentTheme} ${centerAlign ? 'text-center' : ''}`}
        style={customStyles}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 
              className={`font-bold mb-4 ${currentSize.title}`}
              style={accentColor ? { color: accentColor } : {}}
            >
              {expiredMessage.title || 'Time\'s Up!'}
            </h2>
            {expiredMessage.description && (
              <p className={`mb-8 ${currentSize.description} opacity-90`}>
                {expiredMessage.description}
              </p>
            )}
            {expiredMessage.buttonText && expiredMessage.buttonUrl && (
              <a
                href={expiredMessage.buttonUrl}
                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                style={accentColor ? { backgroundColor: accentColor } : {}}
              >
                {expiredMessage.buttonText}
              </a>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      className={`${currentSize.container} ${currentTheme} ${centerAlign ? 'text-center' : ''}`}
      style={customStyles}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {title && (
            <h2 className={`font-bold mb-4 ${currentSize.title}`}>
              {title}
            </h2>
          )}
          
          {description && (
            <p className={`mb-8 ${currentSize.description} opacity-90`}>
              {description}
            </p>
          )}

          <div className="flex items-center justify-center gap-4 md:gap-6">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <div key={unit} className="flex items-center">
                <div 
                  className={`${currentAnimation} ${currentSize.timeUnit} flex flex-col items-center justify-center rounded-lg border-2 border-opacity-20`}
                  style={accentColor ? { borderColor: accentColor } : {}}
                >
                  <div 
                    className={`font-bold ${currentSize.number} leading-none`}
                    style={accentColor ? { color: accentColor } : {}}
                  >
                    {String(value).padStart(2, '0')}
                  </div>
                  <div className={`${currentSize.label} opacity-75 mt-1`}>
                    {labels[unit as keyof typeof labels] || unit}
                  </div>
                </div>
                
                {showSeparators && index < 3 && (
                  <div 
                    className={`${currentSize.separator} font-bold mx-2 opacity-50`}
                    style={accentColor ? { color: accentColor } : {}}
                  >
                    :
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}