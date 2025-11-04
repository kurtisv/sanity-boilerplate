import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Début de la création de la page Services dans Sanity...')

    // Données de la page Services avec blocs Sanity
    const servicesPageData = {
      _type: 'page',
      title: 'Services',
      slug: { 
        current: 'services',
        _type: 'slug'
      },
      seoTitle: 'Services - Développement Web Professionnel',
      seoDescription: 'Services professionnels de développement web avec Next.js et Sanity CMS. Solutions modernes, performantes et évolutives pour votre entreprise.',
      seoKeywords: ['services', 'développement web', 'next.js', 'sanity cms', 'solutions digitales', 'applications web'],
      
      // Construction de la page avec des blocs
      pageBuilder: [
        // Hero Block
        {
          _type: 'heroBlock',
          _key: 'services-hero',
          title: 'Nos Services',
          subtitle: 'Solutions complètes de développement web moderne avec Next.js et Sanity CMS. De la conception à la mise en production, nous créons des expériences digitales performantes.',
          
          // Boutons CTA
          primaryButton: {
            text: '📋 Voir nos Réalisations',
            link: '/demo',
            style: 'secondary'
          },
          secondaryButton: {
            text: '💬 Nous Contacter',
            link: '/studio',
            style: 'primary'
          },
          
          // Configuration du style
          height: 'large',
          textAlignment: 'center',
          
          // Arrière-plan avec gradient vert
          backgroundSettings: {
            backgroundType: 'gradient',
            gradientSettings: {
              gradientType: 'preset',
              preset: 'forest', // Gradient vert
              intensity: 100
            }
          },
          
          // Icône du hero
          iconType: 'emoji',
          iconEmoji: '🛠️',
          iconSize: 'large',
          iconPosition: 'above'
        },
        
        // Section Services - Feature Grid
        {
          _type: 'featureGridBlock',
          _key: 'services-expertise',
          title: 'Nos Expertises',
          subtitle: 'Nous maîtrisons les technologies modernes pour créer des solutions web performantes, évolutives et maintenables.',
          
          gridLayout: '3-balanced',
          cardStyle: 'elevated',
          
          features: [
            {
              _key: 'web-dev',
              iconType: 'emoji',
              iconEmoji: '🚀',
              iconSize: 'large',
              iconColor: '#667eea',
              title: 'Développement Web',
              description: 'Sites web et applications modernes avec Next.js, React et TypeScript. Performance optimale et expérience utilisateur exceptionnelle.',
              details: [
                'Applications React/Next.js',
                'Sites e-commerce',
                'Progressive Web Apps (PWA)',
                'Optimisation SEO'
              ]
            },
            {
              _key: 'cms-content',
              iconType: 'emoji',
              iconEmoji: '🎨',
              iconSize: 'large',
              iconColor: '#10b981',
              title: 'CMS & Gestion de Contenu',
              description: 'Solutions CMS headless avec Sanity pour une gestion de contenu flexible et collaborative.',
              details: [
                'Sanity CMS intégration',
                'Systèmes de blocs modulaires',
                'Interfaces d\'administration',
                'Workflows éditoriaux'
              ]
            },
            {
              _key: 'performance',
              iconType: 'emoji',
              iconEmoji: '⚡',
              iconSize: 'large',
              iconColor: '#f59e0b',
              title: 'Performance & Déploiement',
              description: 'Optimisation complète et déploiement sur les meilleures plateformes cloud pour une disponibilité maximale.',
              details: [
                'Optimisation des performances',
                'Déploiement Vercel/Netlify',
                'CDN et mise en cache',
                'Monitoring et analytics'
              ]
            }
          ],
          
          // Style de la section
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#f8fafc'
          },
          
          styling: {
            textAlignment: 'center',
            paddingSize: 'large'
          }
        },
        
        // Section Processus - Feature Grid
        {
          _type: 'featureGridBlock',
          _key: 'services-process',
          title: 'Notre Processus',
          subtitle: 'Une approche structurée pour garantir le succès de votre projet',
          
          gridLayout: '3-balanced',
          cardStyle: 'bordered',
          
          features: [
            {
              _key: 'step-1',
              iconType: 'emoji',
              iconEmoji: '1️⃣',
              iconSize: 'medium',
              iconColor: '#667eea',
              title: 'Analyse & Stratégie',
              description: 'Étude de vos besoins, définition des objectifs et planification technique détaillée.'
            },
            {
              _key: 'step-2',
              iconType: 'emoji',
              iconEmoji: '2️⃣',
              iconSize: 'medium',
              iconColor: '#059669',
              title: 'Développement',
              description: 'Création de votre solution avec les meilleures pratiques et technologies modernes.'
            },
            {
              _key: 'step-3',
              iconType: 'emoji',
              iconEmoji: '3️⃣',
              iconSize: 'medium',
              iconColor: '#dc2626',
              title: 'Déploiement & Suivi',
              description: 'Mise en production, formation et accompagnement pour assurer votre succès.'
            }
          ],
          
          // Style de la section
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#ffffff'
          },
          
          styling: {
            textAlignment: 'center',
            paddingSize: 'large'
          }
        },
        
        // 📊 StatsBlock - Chiffres clés
        {
          _type: 'statsBlock',
          _key: 'services-stats',
          title: 'Nos Résultats',
          subtitle: 'Quelques chiffres qui parlent',
          
          layout: 'grid-3col',
          
          stats: [
            {
              number: '50+',
              label: 'Projets Réalisés',
              description: 'Sites web et applications développés',
              icon: '🎯',
              featured: false
            },
            {
              number: '98%',
              label: 'Satisfaction Client',
              description: 'Taux de satisfaction de nos clients',
              icon: '⭐',
              featured: true
            },
            {
              number: '24h',
              label: 'Support Réactif',
              description: 'Temps de réponse moyen',
              icon: '🚀',
              featured: false
            }
          ],
          
          animationSettings: {
            enableAnimations: true,
            animationType: 'countUp',
            duration: 2000,
            delay: 200,
            easing: 'easeOutQuart'
          },
          
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#ffffff'
          }
        }
      ]
    }

    console.log('📝 Création du document page dans Sanity...')
    const result = await client.create(servicesPageData)
    
    console.log('✅ Page Services créée avec succès:', result._id)
    
    return NextResponse.json({ 
      success: true, 
      page: result,
      message: 'Page Services créée avec succès dans Sanity Studio'
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page Services:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: 'Vérifiez que Sanity est correctement configuré et que vous avez les permissions d\'écriture'
    }, { status: 500 })
  }
}
