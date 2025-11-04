/**
 * Thèmes modernes pour les pages générées dans Studio
 * Chaque thème contient des couleurs, dégradés et styles coordonnés
 */

export type PageTheme = {
  name: string
  hero: {
    gradient: string
    intensity: number
  }
  sections: {
    primary: string
    secondary: string
    accent: string
  }
  colors: {
    text: string
    heading: string
    accent: string
  }
}

export const pageThemes: Record<string, PageTheme> = {
  about: {
    name: 'Midnight Professional',
    hero: {
      gradient: 'midnight',
      intensity: 95
    },
    sections: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      accent: '#1e293b'
    },
    colors: {
      text: '#334155',
      heading: '#0f172a',
      accent: '#3b82f6'
    }
  },
  
  services: {
    name: 'Aurora Dynamic',
    hero: {
      gradient: 'aurora',
      intensity: 90
    },
    sections: {
      primary: '#ffffff',
      secondary: '#fef3c7',
      accent: '#7c3aed'
    },
    colors: {
      text: '#374151',
      heading: '#111827',
      accent: '#8b5cf6'
    }
  },
  
  portfolio: {
    name: 'Forest Creative',
    hero: {
      gradient: 'forest',
      intensity: 85
    },
    sections: {
      primary: '#ffffff',
      secondary: '#ecfdf5',
      accent: '#065f46'
    },
    colors: {
      text: '#374151',
      heading: '#111827',
      accent: '#10b981'
    }
  },
  
  pricing: {
    name: 'Sunset Premium',
    hero: {
      gradient: 'sunset',
      intensity: 92
    },
    sections: {
      primary: '#ffffff',
      secondary: '#fef2f2',
      accent: '#991b1b'
    },
    colors: {
      text: '#374151',
      heading: '#111827',
      accent: '#ef4444'
    }
  },
  
  contact: {
    name: 'Ocean Trust',
    hero: {
      gradient: 'ocean',
      intensity: 88
    },
    sections: {
      primary: '#ffffff',
      secondary: '#eff6ff',
      accent: '#1e40af'
    },
    colors: {
      text: '#374151',
      heading: '#111827',
      accent: '#3b82f6'
    }
  },
  
  blog: {
    name: 'Lavender Modern',
    hero: {
      gradient: 'lavender',
      intensity: 85
    },
    sections: {
      primary: '#ffffff',
      secondary: '#faf5ff',
      accent: '#6b21a8'
    },
    colors: {
      text: '#374151',
      heading: '#111827',
      accent: '#a855f7'
    }
  },
  
  faq: {
    name: 'Mint Fresh',
    hero: {
      gradient: 'mint',
      intensity: 80
    },
    sections: {
      primary: '#ffffff',
      secondary: '#f0fdf4',
      accent: '#166534'
    },
    colors: {
      text: '#374151',
      heading: '#111827',
      accent: '#22c55e'
    }
  },
  
  legal: {
    name: 'Steel Professional',
    hero: {
      gradient: 'steel',
      intensity: 75
    },
    sections: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      accent: '#475569'
    },
    colors: {
      text: '#475569',
      heading: '#1e293b',
      accent: '#64748b'
    }
  },
  
  careers: {
    name: 'Energy Vibrant',
    hero: {
      gradient: 'energy',
      intensity: 90
    },
    sections: {
      primary: '#ffffff',
      secondary: '#fff7ed',
      accent: '#ea580c'
    },
    colors: {
      text: '#374151',
      heading: '#111827',
      accent: '#f97316'
    }
  },
  
  demo: {
    name: 'Rainbow Showcase',
    hero: {
      gradient: 'rainbow',
      intensity: 95
    },
    sections: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      accent: '#4f46e5'
    },
    colors: {
      text: '#374151',
      heading: '#111827',
      accent: '#6366f1'
    }
  },
  
  'studio-showcase': {
    name: 'Cosmic Premium',
    hero: {
      gradient: 'cosmic',
      intensity: 100
    },
    sections: {
      primary: '#ffffff',
      secondary: '#f3f4f6',
      accent: '#1f2937'
    },
    colors: {
      text: '#374151',
      heading: '#111827',
      accent: '#6b7280'
    }
  }
}

/**
 * Obtient le thème pour une page donnée
 */
export function getPageTheme(pageKey: string): PageTheme {
  return pageThemes[pageKey] || pageThemes.about
}

/**
 * Génère les paramètres de style pour un bloc basé sur le thème de la page
 */
export function getThemedBlockSettings(pageKey: string, blockType: 'hero' | 'section' | 'accent' = 'section') {
  const theme = getPageTheme(pageKey)
  
  const baseSettings = {
    alignment: 'center' as const,
    spacing: 'large' as const
  }
  
  switch (blockType) {
    case 'hero':
      return {
        backgroundSettings: {
          backgroundType: 'gradient' as const,
          gradientSettings: {
            gradientType: 'preset' as const,
            preset: theme.hero.gradient,
            intensity: theme.hero.intensity
          }
        },
        styling: {
          ...baseSettings,
          textColor: '#ffffff',
          headingColor: '#ffffff'
        }
      }
      
    case 'accent':
      return {
        backgroundSettings: {
          backgroundType: 'color' as const,
          backgroundColor: theme.sections.accent
        },
        styling: {
          ...baseSettings,
          textColor: '#ffffff',
          headingColor: '#ffffff'
        }
      }
      
    default: // section
      return {
        backgroundSettings: {
          backgroundType: 'color' as const,
          backgroundColor: theme.sections.primary
        },
        styling: {
          ...baseSettings,
          textColor: theme.colors.text,
          headingColor: theme.colors.heading
        }
      }
  }
}

/**
 * Génère des couleurs d'icônes cohérentes avec le thème
 */
export function getThemedIconColor(pageKey: string): string {
  const theme = getPageTheme(pageKey)
  return theme.colors.accent
}
