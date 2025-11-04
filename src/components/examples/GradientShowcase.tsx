'use client'

import React from 'react'
import { applyTheme } from '@/lib/theme-utils'

const gradientExamples = [
  {
    name: 'Sunset',
    backgroundSettings: {
      backgroundType: 'gradient' as const,
      gradientSettings: {
        gradientType: 'preset' as const,
        preset: JSON.stringify({ from: '#ff7e5f', to: '#feb47b', direction: 'to-r' })
      }
    }
  },
  {
    name: 'Ocean',
    backgroundSettings: {
      backgroundType: 'gradient' as const,
      gradientSettings: {
        gradientType: 'preset' as const,
        preset: JSON.stringify({ from: '#667eea', to: '#764ba2', direction: 'to-br' })
      }
    }
  },
  {
    name: 'Custom 3-Color',
    backgroundSettings: {
      backgroundType: 'gradient' as const,
      gradientSettings: {
        gradientType: 'custom' as const,
        custom: {
          from: '#ff6b6b',
          via: '#4ecdc4',
          to: '#45b7d1',
          direction: 'to-br',
          intensity: 90
        }
      }
    }
  },
  {
    name: 'Radial Gradient',
    backgroundSettings: {
      backgroundType: 'gradient' as const,
      gradientSettings: {
        gradientType: 'custom' as const,
        custom: {
          from: '#667eea',
          to: '#764ba2',
          direction: 'radial',
          intensity: 100
        }
      }
    }
  }
]

export default function GradientShowcase() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Showcase des Dégradés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gradientExamples.map((example, index) => {
          const theme = applyTheme(example)
          
          return (
            <div
              key={index}
              className="h-48 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg"
              style={theme.containerStyle}
            >
              {example.name}
            </div>
          )
        })}
      </div>
      
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Nouvelles Fonctionnalités</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="font-bold text-lg mb-3 text-blue-600">🎨 18 Dégradés Prédéfinis</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Classiques (Bleu → Violet)</li>
              <li>• Modernes (Sunset, Ocean)</li>
              <li>• Sombres (Dark Ocean)</li>
              <li>• Pastel (Rose → Pêche)</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="font-bold text-lg mb-3 text-green-600">⚡ Dégradés Personnalisés</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• 3 couleurs (from, via, to)</li>
              <li>• 9 directions + radial</li>
              <li>• Contrôle d'intensité</li>
              <li>• Interface intuitive</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="font-bold text-lg mb-3 text-purple-600">🔧 Facilité d'Usage</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Prévisualisation en temps réel</li>
              <li>• Options dans Studio</li>
              <li>• CSS optimisé</li>
              <li>• TypeScript complet</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
