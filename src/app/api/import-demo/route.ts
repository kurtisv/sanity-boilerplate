import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { generateCtaKey } from '@/lib/generate-unique-keys'
import fs from 'fs'
import path from 'path'


// Configuration des blocs de démo - Design classique et professionnel
// 7 blocs : Hero, Text, FeatureGrid, Stats, Team, Text (conclusion), Contact
const demoBlocks = [
  // 1. Hero Block - Bannière d'accueil
  {
    _type: 'heroBlock',
    _key: 'hero-demo',
    title: 'Système de Blocs Universels',
    subtitle: 'Démonstration complète de 7 types de blocs disponibles dans ce boilerplate professionnel Next.js + Sanity CMS',
    layout: 'centered',
    ctaButtons: [
      {
        _key: generateCtaKey('explore'),
        text: 'Explorer les Blocs',
        href: '#blocs-info',
        variant: 'primary',
        size: 'lg'
      },
      {
        _key: generateCtaKey('studio'),
        text: 'Ouvrir Studio',
        href: '/studio',
        variant: 'secondary',
        size: 'lg'
      }
    ],
    backgroundSettings: {
      backgroundType: 'solid',
      backgroundColor: '#f8fafc'
    },
    styling: {
      textColor: '#1a202c',
      textAlignment: 'center',
      verticalAlignment: 'center',
      height: 'medium',
      spacing: 'normal'
    }
  },

  // 2. Text Block - Information sur les blocs
  {
    _type: 'textBlock',
    _key: 'blocs-info',
    content: [
      {
        _type: 'block',
        _key: 'info-title',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '📋 Guide des Blocs Disponibles'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'info-intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Cette page présente tous les blocs universels inclus dans le boilerplate. Chaque bloc est entièrement personnalisable via Sanity Studio et peut être réutilisé sur n\'importe quelle page.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'info-list',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: '🦸 Hero Block - Bannières et sections d\'accueil'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'info-list-2',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: '📝 Text Block - Contenu riche avec formatage'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'info-list-3',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: '⭐ Feature Grid - Grilles de fonctionnalités'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'info-list-4',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: '📊 Stats Block - Statistiques et métriques'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'info-list-5',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: '📞 Contact Block - Formulaires de contact'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'info-list-6',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: '🖼️ Gallery Block - Galeries d\'images'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'info-list-7',
        style: 'normal',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: '👥 Team Block - Présentation d\'équipe'
          }
        ]
      }
    ],
    styling: {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      textAlignment: 'left',
      spacing: 'normal'
    }
  },

  // 3. Feature Grid Block - Présentation des fonctionnalités
  {
    _type: 'featureGridBlock',
    _key: 'features-demo',
    title: 'Fonctionnalités des Blocs',
    subtitle: 'Chaque bloc est conçu pour être flexible, réutilisable et entièrement personnalisable',
    gridLayout: '3-balanced',
    features: [
      {
        _key: 'feature-1',
        iconType: 'emoji',
        iconEmoji: '⭐',
        title: 'Design Classique',
        description: 'Interface épurée et professionnelle qui inspire confiance à vos clients.',
        featured: false
      },
      {
        _key: 'feature-2',
        iconType: 'emoji',
        iconEmoji: '🚀',
        title: 'Facilité d\'Usage',
        description: 'Configuration simple via Sanity Studio, aucune compétence technique requise.',
        featured: true
      },
      {
        _key: 'feature-3',
        iconType: 'emoji',
        iconEmoji: '🎯',
        title: 'Personnalisable',
        description: 'Chaque élément peut être modifié : couleurs, textes, images et mise en page.',
        featured: false
      }
    ],
    backgroundSettings: {
      backgroundType: 'solid',
      backgroundColor: '#ffffff'
    },
    styling: {
      textColor: '#374151',
      cardStyle: 'minimal',
      spacing: 'comfortable',
      alignment: 'center'
    }
  },

  // 4. Stats Block - Métriques du boilerplate
  {
    _type: 'statsBlock',
    _key: 'stats-demo',
    title: 'Chiffres Clés',
    subtitle: 'Performance et efficacité du boilerplate',
    layout: 'grid-4col',
    stats: [
      {
        _key: 'stat-1',
        number: '9',
        label: 'Blocs Disponibles',
        description: 'Au total dans le boilerplate',
        icon: '🧩',
        featured: false,
        animationType: 'counter',
        animationDuration: 2,
        order: 1
      },
      {
        _key: 'stat-2',
        number: '95',
        suffix: '%',
        label: 'Projets Couverts',
        description: 'Sites web classiques',
        icon: '🎯',
        featured: true,
        animationType: 'counter',
        animationDuration: 2.5,
        order: 2
      },
      {
        _key: 'stat-3',
        number: '100',
        suffix: '%',
        label: 'TypeScript',
        description: 'Sécurité garantie',
        icon: '🔒',
        featured: false,
        animationType: 'counter',
        animationDuration: 1.5,
        order: 3
      },
      {
        _key: 'stat-4',
        number: '98',
        suffix: '+',
        label: 'Performance',
        description: 'Score Lighthouse',
        icon: '⚡',
        featured: false,
        animationType: 'counter',
        animationDuration: 2,
        order: 4
      }
    ],
    animationSettings: {
      enableAnimations: true,
      triggerOffset: 50,
      staggerDelay: 200,
      easing: 'easeOut'
    },
    backgroundSettings: {
      backgroundType: 'solid',
      backgroundColor: '#f8fafc'
    },
    styling: {
      textColor: '#1f2937',
      numberColor: '#2563eb',
      cardStyle: 'clean',
      spacing: 'normal',
      alignment: 'center'
    }
  },

  // 5. Team Block - Présentation d'équipe
  {
    _type: 'teamBlock',
    _key: 'team-demo',
    title: 'Notre Équipe',
    subtitle: 'Présentation des membres avec informations détaillées',
    displayType: 'team',
    layout: 'grid',
    gridColumns: 3,
    members: [
      {
        _key: 'member-1',
        name: 'Jean Dupont',
        position: 'Développeur Frontend',
        bio: 'Expert en React et Next.js avec 5 ans d\'expérience.',
        socialLinks: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          github: 'https://github.com'
        }
      },
      {
        _key: 'member-2',
        name: 'Marie Martin',
        position: 'Designer UX/UI',
        bio: 'Spécialisée dans l\'expérience utilisateur et le design system.',
        socialLinks: {
          linkedin: 'https://linkedin.com',
          dribbble: 'https://dribbble.com'
        }
      },
      {
        _key: 'member-3',
        name: 'Pierre Durand',
        position: 'Développeur Backend',
        bio: 'Architecte logiciel passionné par les performances et la scalabilité.',
        socialLinks: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com'
        }
      }
    ],
    styling: {
      backgroundColor: '#ffffff',
      textColor: '#374151',
      cardStyle: 'clean',
      spacing: 'comfortable'
    }
  },

  // 6. Text Block final - Conclusion
  {
    _type: 'textBlock',
    _key: 'conclusion-demo',
    content: [
      {
        _type: 'block',
        _key: 'conclusion-title',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '🎯 Prêt à Commencer ?'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'conclusion-text',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Cette démonstration présente tous les blocs disponibles dans le boilerplate. Chaque bloc peut être personnalisé, réorganisé et adapté à vos besoins spécifiques via Sanity Studio.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'conclusion-cta',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Ouvrez Sanity Studio pour commencer à créer votre propre contenu et découvrir toutes les possibilités de personnalisation.'
          }
        ]
      }
    ],
    styling: {
      backgroundColor: '#f8fafc',
      textColor: '#374151',
      textAlignment: 'center',
      spacing: 'comfortable'
    }
  },

  // 7. Contact Block - Formulaire de feedback
  {
    _type: 'contactBlock',
    _key: 'contact-demo-form',
    title: 'Contactez-nous',
    subtitle: 'Exemple de formulaire de contact intégré - Entièrement personnalisable',
    layout: 'split',
    formFields: [
      {
        _key: 'field-1',
        fieldType: 'name',
        label: 'Votre nom',
        placeholder: 'John Doe',
        required: true,
        width: 'half'
      },
      {
        _key: 'field-2',
        fieldType: 'email',
        label: 'Email',
        placeholder: 'john@example.com',
        required: true,
        width: 'half'
      },
      {
        _key: 'field-3',
        fieldType: 'subject',
        label: 'Sujet',
        placeholder: 'Feedback sur le boilerplate',
        required: true,
        width: 'full'
      },
      {
        _key: 'field-4',
        fieldType: 'message',
        label: 'Message',
        placeholder: 'Partagez vos impressions, suggestions d\'amélioration...',
        required: true,
        width: 'full'
      }
    ],
    submitButton: {
      text: 'Envoyer le feedback',
      loadingText: 'Envoi en cours...'
    },
    successMessage: {
      title: 'Merci pour votre feedback !',
      description: 'Votre message a été envoyé avec succès. Nous vous répondrons rapidement.'
    },
    contactInfo: {
      showContactInfo: true,
      email: 'contact@example.com',
      address: 'Paris, France',
      hours: 'Lun-Ven 9h-18h'
    },
    styling: {
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      spacing: 'large'
    }
  }
]

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Début de l\'import de la démo')
    
    // Vérification de l'environnement de développement
    if (process.env.NODE_ENV === 'production') {
      console.log('❌ Tentative d\'import en production')
      return NextResponse.json(
        { error: 'Import de démo disponible uniquement en développement' },
        { status: 403 }
      )
    }

    // Vérification des variables d'environnement
    console.log('🔍 Vérification des variables d\'environnement')
    console.log('- PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✅' : '❌')
    console.log('- DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')
    console.log('- API_TOKEN:', process.env.SANITY_API_TOKEN ? '✅' : '❌')

    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_SANITY_PROJECT_ID manquant dans les variables d\'environnement' },
        { status: 500 }
      )
    }

    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        { error: 'SANITY_API_TOKEN manquant dans les variables d\'environnement' },
        { status: 500 }
      )
    }

    // Vérification si la page demo existe déjà
    console.log('🔍 Vérification de l\'existence de la page demo')
    const existingPage = await client.fetch(`*[_type == "page" && slug.current == "demo"][0]`)

    if (existingPage) {
      console.log('🗑️ Suppression de l\'ancienne page demo:', existingPage._id)
      await client.delete(existingPage._id)
    }

    // Création de la nouvelle page de démo
    console.log('📄 Création de la nouvelle page demo avec', demoBlocks.length, 'blocs')
    const demoPage = {
      _type: 'page',
      title: 'Démonstration Boilerplate',
      slug: { current: 'demo' },
      seoTitle: 'Démonstration - Boilerplate Next.js + Sanity',
      seoDescription: 'Découvrez tous les blocs universels en action, créés directement dans Sanity Studio',
      pageBuilder: demoBlocks
    }

    console.log('💾 Sauvegarde dans Sanity...')
    const result = await client.create(demoPage)
    console.log('✅ Page créée avec succès:', result._id)

    // Lecture du fichier DEMO_SETUP.md pour les métadonnées
    let demoSetupContent = ''
    try {
      const demoSetupPath = path.join(process.cwd(), 'DEMO_SETUP.md')
      demoSetupContent = fs.readFileSync(demoSetupPath, 'utf8')
    } catch (error) {
      console.warn('DEMO_SETUP.md non trouvé')
    }

    return NextResponse.json({
      success: true,
      message: 'Page de démo créée avec succès',
      data: {
        id: result._id,
        slug: 'demo',
        url: '/demo',
        studioUrl: `/studio/desk/page;${result._id}`,
        blocksCount: demoBlocks.length,
        hasSetupGuide: demoSetupContent.length > 0
      }
    })

  } catch (error) {
    console.error('Erreur lors de l\'import de la démo:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'import de la démo', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Vérifier si la page demo existe
    const existingPage = await client.fetch(`*[_type == "page" && slug.current == "demo"][0]`)
    
    return NextResponse.json({
      exists: !!existingPage,
      page: existingPage ? {
        id: existingPage._id,
        title: existingPage.title,
        blocksCount: existingPage.pageBuilder?.length || 0
      } : null
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la vérification', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}
