import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET() {
  try {
    // Vérifier si la page studio-showcase existe déjà
    const existingPage = await client.fetch(`
      *[_type == "page" && slug.current == "studio-showcase"][0] {
        _id,
        title,
        "blocksCount": length(pageBuilder)
      }
    `)

    return NextResponse.json({
      exists: !!existingPage,
      page: existingPage ? {
        id: existingPage._id,
        title: existingPage.title,
        blocksCount: existingPage.blocksCount || 0
      } : null
    })

  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la vérification', 
        details: error instanceof Error ? error.message : 'Erreur inconnue' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Création de la page Vitrine Studio...')

    const studioShowcasePageData = {
      _type: 'page',
      title: 'Vitrine Studio',
      slug: { 
        current: 'studio-showcase',
        _type: 'slug' 
      },
      seoTitle: 'Vitrine Studio - Présentation des Capacités',
      seoDescription: 'Découvrez toutes les capacités de notre système de blocs Sanity. Présentation interactive des fonctionnalités et des possibilités créatives.',
      pageBuilder: [
        // 🦸 HeroBlock - Présentation de la vitrine
        {
          _type: 'heroBlock',
          _key: 'studio-showcase-hero',
          title: 'Vitrine Studio',
          subtitle: 'Découvrez toutes les capacités de notre système de blocs modulaires. Cette vitrine présente automatiquement tous les contenus créés dans Sanity Studio.',
          
          ctaButtons: [
            {
              text: '🎨 Ouvrir Sanity Studio',
              href: '/studio',
              variant: 'primary'
            },
            {
              text: '📋 Voir la Documentation',
              href: '#features',
              variant: 'secondary'
            }
          ],
          
          layout: 'centered',
          
          heroSettings: {
            height: 'large',
            alignment: 'center',
            showScrollIndicator: true
          },
          
          backgroundSettings: {
            type: 'gradient',
            gradientPreset: 'purple-blue'
          },
          
          styling: {
            textColor: 'white',
            alignment: 'center',
            spacing: 'large'
          }
        },

        // 📝 TextBlock - Explication du système
        {
          _type: 'textBlock',
          _key: 'studio-explanation',
          title: 'Système de Blocs Modulaires',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Cette vitrine présente automatiquement tous les contenus que vous créez dans Sanity Studio. Chaque page, chaque bloc est affiché ici de manière organisée et professionnelle.'
                }
              ]
            },
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Le système détecte automatiquement vos créations et les organise par type, date de création et popularité. Vous pouvez ainsi présenter votre travail à vos clients de manière élégante.'
                }
              ]
            }
          ],
          
          styling: {
            backgroundColor: 'light-gray',
            textColor: 'dark',
            alignment: 'center',
            spacing: 'medium'
          }
        },

        // ⭐ FeatureGridBlock - Capacités du système
        {
          _type: 'featureGridBlock',
          _key: 'studio-capabilities',
          title: 'Capacités du Système',
          subtitle: 'Tout ce que vous pouvez créer et gérer dans Sanity Studio',
          
          gridLayout: '3-balanced',
          cardStyle: 'elevated',
          
          features: [
            {
              iconType: 'emoji',
              iconEmoji: '🎨',
              iconSize: 'large',
              iconColor: '#8b5cf6',
              title: 'Blocs Modulaires',
              description: 'Créez des pages avec nos 8+ types de blocs : Hero, Features, Gallery, Contact, Team, Stats, Text, et plus.',
              details: ['Hero Block', 'Feature Grid', 'Gallery Block', 'Contact Form', 'Team Block', 'Stats Block', 'Text Block', 'CTA Block'],
              featured: true
            },
            {
              iconType: 'emoji',
              iconEmoji: '🔧',
              iconSize: 'large',
              iconColor: '#3b82f6',
              title: 'Personnalisation Avancée',
              description: 'Chaque bloc est entièrement personnalisable : couleurs, layouts, animations, styles et contenus.',
              details: ['Thèmes personnalisés', 'Layouts flexibles', 'Animations fluides', 'Styles modulaires'],
              featured: false
            },
            {
              iconType: 'emoji',
              iconEmoji: '📱',
              iconSize: 'large',
              iconColor: '#10b981',
              title: 'Responsive Design',
              description: 'Tous les blocs s\'adaptent automatiquement à tous les écrans : mobile, tablette, desktop.',
              details: ['Mobile First', 'Breakpoints optimisés', 'Images adaptatives', 'Navigation tactile'],
              featured: false
            },
            {
              iconType: 'emoji',
              iconEmoji: '⚡',
              iconSize: 'large',
              iconColor: '#f59e0b',
              title: 'Performance Optimisée',
              description: 'Code optimisé, images compressées, chargement rapide et SEO intégré pour une expérience parfaite.',
              details: ['Next.js 16', 'Images optimisées', 'SEO intégré', 'Chargement rapide'],
              featured: false
            },
            {
              iconType: 'emoji',
              iconEmoji: '🎯',
              iconSize: 'large',
              iconColor: '#ef4444',
              title: 'Interface Intuitive',
              description: 'Sanity Studio offre une interface simple et puissante pour créer et gérer vos contenus sans code.',
              details: ['Éditeur visuel', 'Prévisualisation temps réel', 'Gestion des médias', 'Collaboration équipe'],
              featured: false
            },
            {
              iconType: 'emoji',
              iconEmoji: '🚀',
              iconSize: 'large',
              iconColor: '#8b5cf6',
              title: 'Déploiement Facile',
              description: 'Publiez vos changements instantanément. Les modifications apparaissent en temps réel sur votre site.',
              details: ['Déploiement instantané', 'Prévisualisation', 'Rollback facile', 'Environnements multiples'],
              featured: true
            }
          ],
          
          styling: {
            backgroundColor: 'white',
            textColor: 'dark',
            alignment: 'center',
            spacing: 'large'
          }
        },

        // 📊 StatsBlock - Statistiques du système
        {
          _type: 'statsBlock',
          _key: 'studio-stats',
          title: 'Le Système en Chiffres',
          subtitle: 'Performance et capacités de notre boilerplate',
          
          layout: 'grid-4col',
          
          stats: [
            {
              number: '8+',
              label: 'Types de Blocs',
              description: 'Blocs modulaires disponibles',
              icon: '🧩',
              featured: true
            },
            {
              number: '100%',
              label: 'Responsive',
              description: 'Compatible tous écrans',
              icon: '📱',
              featured: false
            },
            {
              number: '< 2s',
              label: 'Temps de Chargement',
              description: 'Performance optimisée',
              icon: '⚡',
              featured: false
            },
            {
              number: '∞',
              label: 'Possibilités',
              description: 'Créativité sans limites',
              icon: '🎨',
              featured: true
            }
          ],
          
          animationSettings: {
            enableAnimations: true,
            triggerOffset: 30,
            animationType: 'fade-up',
            duration: 800,
            stagger: 200
          },
          
          styling: {
            backgroundColor: 'light-blue',
            textColor: 'dark',
            alignment: 'center',
            spacing: 'large'
          }
        },

        // 🤝 Call-to-Action final
        {
          _type: 'textBlock',
          _key: 'studio-cta',
          title: 'Prêt à Créer ?',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Commencez dès maintenant à créer vos propres pages avec notre système de blocs modulaires. Sanity Studio vous attend !'
                }
              ]
            }
          ],
          
          ctaButtons: [
            {
              text: '🎨 Ouvrir Sanity Studio',
              href: '/studio',
              variant: 'primary'
            },
            {
              text: '🏠 Retour à l\'Accueil',
              href: '/',
              variant: 'secondary'
            }
          ],
          
          styling: {
            backgroundColor: 'dark',
            textColor: 'white',
            alignment: 'center',
            spacing: 'large'
          }
        }
      ]
    }

    // Créer la page dans Sanity
    const result = await client.create(studioShowcasePageData)
    
    console.log('✅ Page Vitrine Studio créée avec succès:', result._id)

    return NextResponse.json({
      success: true,
      message: 'Page Vitrine Studio créée avec succès',
      pageId: result._id,
      slug: 'studio-showcase'
    })

  } catch (error) {
    console.error('❌ Erreur lors de la création de la Vitrine Studio:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création de la Vitrine Studio', 
        details: error instanceof Error ? error.message : 'Erreur inconnue' 
      },
      { status: 500 }
    )
  }
}
