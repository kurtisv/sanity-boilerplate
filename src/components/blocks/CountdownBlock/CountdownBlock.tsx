'use client'

import { useState, useEffect } from 'react'

interface CountdownBlockProps {
  data: {
    title?: string
    description?: string
    targetDate: string
    endMessage?: string
    showLabels?: boolean
    theme?: 'dark' | 'light' | 'colorful'
    size?: 'small' | 'medium' | 'large'
  }
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownBlock({ data }: CountdownBlockProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)

  // Calcul du temps restant
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(data.targetDate) - +new Date()
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
      
      // Vérifier si le compte à rebours est terminé
      if (Object.values(newTimeLeft).every(val => val === 0)) {
        setIsExpired(true)
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [data.targetDate])

  // Classes CSS selon le thème
  const getThemeClasses = () => {
    switch (data.theme) {
      case 'light':
        return {
          container: 'bg-gray-50 text-gray-900',
          card: 'bg-white border border-gray-200',
          number: 'text-gray-900',
          label: 'text-gray-600'
        }
      case 'colorful':
        return {
          container: 'bg-gradient-to-br from-purple-600 to-blue-600 text-white',
          card: 'bg-white/20 backdrop-blur-sm border border-white/30',
          number: 'text-white',
          label: 'text-white/80'
        }
      default: // dark
        return {
          container: 'bg-gray-900 text-white',
          card: 'bg-gray-800 border border-gray-700',
          number: 'text-white',
          label: 'text-gray-300'
        }
    }
  }

  // Classes CSS selon la taille
  const getSizeClasses = () => {
    switch (data.size) {
      case 'small':
        return {
          container: 'py-8 px-4',
          title: 'text-2xl',
          description: 'text-sm',
          grid: 'gap-3',
          card: 'p-3',
          number: 'text-3xl',
          label: 'text-xs mt-1'
        }
      case 'large':
        return {
          container: 'py-16 px-6',
          title: 'text-5xl',
          description: 'text-lg',
          grid: 'gap-8',
          card: 'p-8',
          number: 'text-7xl',
          label: 'text-base mt-3'
        }
      default: // medium
        return {
          container: 'py-12 px-4',
          title: 'text-4xl',
          description: 'text-base',
          grid: 'gap-6',
          card: 'p-6',
          number: 'text-5xl',
          label: 'text-sm mt-2'
        }
    }
  }

  const themeClasses = getThemeClasses()
  const sizeClasses = getSizeClasses()

  // Rendu si le compte à rebours est terminé
  if (isExpired) {
    return (
      <div className={`${themeClasses.container} ${sizeClasses.container} text-center rounded-lg`}>
        <h2 className={`${sizeClasses.title} font-bold mb-4`}>
          {data.title}
        </h2>
        <div className={`${themeClasses.card} ${sizeClasses.card} rounded-lg inline-block`}>
          <p className={`${sizeClasses.number} font-bold`}>
            {data.endMessage || 'Temps écoulé !'}
          </p>
        </div>
      </div>
    )
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'Jours', shortLabel: 'J' },
    { value: timeLeft.hours, label: 'Heures', shortLabel: 'H' },
    { value: timeLeft.minutes, label: 'Minutes', shortLabel: 'M' },
    { value: timeLeft.seconds, label: 'Secondes', shortLabel: 'S' }
  ]

  return (
    <div className={`${themeClasses.container} ${sizeClasses.container} text-center rounded-lg`}>
      {/* Titre */}
      {data.title && (
        <h2 className={`${sizeClasses.title} font-bold mb-4`}>
          {data.title}
        </h2>
      )}

      {/* Description */}
      {data.description && (
        <p className={`${sizeClasses.description} mb-8 opacity-90 max-w-2xl mx-auto`}>
          {data.description}
        </p>
      )}

      {/* Compte à rebours */}
      <div className={`grid grid-cols-2 md:grid-cols-4 ${sizeClasses.grid} max-w-4xl mx-auto`}>
        {timeUnits.map((unit, index) => (
          <div
            key={index}
            className={`${themeClasses.card} ${sizeClasses.card} rounded-lg`}
          >
            <div className={`${themeClasses.number} ${sizeClasses.number} font-bold tabular-nums`}>
              {unit.value.toString().padStart(2, '0')}
            </div>
            {data.showLabels && (
              <div className={`${themeClasses.label} ${sizeClasses.label} font-medium uppercase tracking-wide`}>
                <span className="hidden sm:inline">{unit.label}</span>
                <span className="sm:hidden">{unit.shortLabel}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}