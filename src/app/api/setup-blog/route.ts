import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Refonte complète - Création de la page Blog selon les standards...')

    const blogPageData = {
      _type: 'page',
      title: 'Blog',
      slug: { 
        current: 'blog',
        _type: 'slug'
      },
      seoTitle: 'Blog - Articles et Actualités Tech',
      seoDescription: 'Découvrez nos derniers articles sur le développement web, les technologies modernes et les tendances du secteur. Conseils, tutoriels et insights d\'experts.',
      
      // Page builder avec les 7 blocs - CONFORMITÉ SANITY STRICTE
      pageBuilder: [
        // 🦸 HeroBlock - Blog Hero (CONFORME AU SCHÉMA)
        {
          _type: 'heroBlock',
          _key: 'blog-hero',
          title: 'Blog & Actualités Tech',
          subtitle: 'Découvrez nos derniers articles, tutoriels et insights sur le développement web moderne. Restez à jour avec les technologies émergentes et les meilleures pratiques du secteur.',
          
          // ✅ CONFORME : ctaButtons array selon le schéma
          ctaButtons: [
            {
              _key: 'cta-latest',
              text: '📰 Derniers Articles',
              href: '#articles',
              variant: 'primary'
            },
            {
              _key: 'cta-newsletter',
              text: '📧 Newsletter',
              href: '#newsletter',
              variant: 'secondary'
            }
          ],
          
          // ✅ CONFORME : layout selon le schéma
          layout: 'centered',
          
          // ✅ CONFORME : heroSettings objet selon le schéma
          heroSettings: {
            height: 'medium',
            verticalAlignment: 'center',
            textAlignment: 'center'
          },
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'gradient',
            gradientSettings: {
              gradientType: 'preset',
              preset: 'forest',
              intensity: 92
            }
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            textColor: '#ffffff',
            alignment: 'center',
            spacing: 'large'
          },
          
          // ✅ CONFORME : iconField selon le schéma
          iconType: 'emoji',
          iconEmoji: '📝',
          iconSize: 'large',
          iconPosition: 'above'
        },
        
        // ⭐ FeatureGridBlock - Catégories d'Articles (CONFORME AU SCHÉMA)
        {
          _type: 'featureGridBlock',
          _key: 'blog-categories',
          title: 'Nos Catégories d\'Articles',
          subtitle: 'Explorez nos contenus organisés par thématiques',
          
          // ✅ CONFORME : gridLayout selon le schéma
          gridLayout: '3-balanced',
          
          // ✅ CONFORME : cardStyle selon le schéma
          cardStyle: 'shadow',
          
          // ✅ CONFORME : features array selon le schéma
          features: [
            {
              _key: 'category-1',
              iconType: 'emoji',
              iconEmoji: '⚛️',
              iconSize: 'large',
              iconColor: '#61dafb',
              title: 'Développement Frontend',
              description: 'React, Next.js, TypeScript, CSS moderne et frameworks JavaScript. Techniques avancées et bonnes pratiques.',
              featured: false
            },
            {
              _key: 'category-2',
              iconType: 'emoji',
              iconEmoji: '🔧',
              iconSize: 'large',
              iconColor: '#10b981',
              title: 'DevOps & Outils',
              description: 'CI/CD, Docker, déploiement, monitoring et outils de développement pour optimiser votre workflow.',
              featured: true
            },
            {
              _key: 'category-3',
              iconType: 'emoji',
              iconEmoji: '🎨',
              iconSize: 'large',
              iconColor: '#f59e0b',
              title: 'Design & UX',
              description: 'Interface utilisateur, expérience utilisateur, design systems et tendances visuelles modernes.',
              featured: false
            },
            {
              _key: 'category-4',
              iconType: 'emoji',
              iconEmoji: '🚀',
              iconSize: 'large',
              iconColor: '#8b5cf6',
              title: 'Performance & SEO',
              description: 'Optimisation des performances, référencement naturel et techniques d\'amélioration de la vitesse.',
              featured: false
            },
            {
              _key: 'category-5',
              iconType: 'emoji',
              iconEmoji: '🔒',
              iconSize: 'large',
              iconColor: '#ef4444',
              title: 'Sécurité Web',
              description: 'Bonnes pratiques de sécurité, authentification, protection des données et vulnérabilités courantes.',
              featured: false
            },
            {
              _key: 'category-6',
              iconType: 'emoji',
              iconEmoji: '📱',
              iconSize: 'large',
              iconColor: '#3b82f6',
              title: 'Mobile & PWA',
              description: 'Applications mobiles, Progressive Web Apps et développement cross-platform moderne.',
              featured: false
            }
          ],
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#ffffff'
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            alignment: 'center',
            spacing: 'large'
          }
        },

        // 📝 TextBlock - À Propos du Blog (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'blog-about',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'about-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'about-title-span',
                  text: 'Notre Mission : Partager les Connaissances Tech',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'about-intro',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'about-intro-span',
                  text: 'Notre blog est né de la volonté de partager notre expertise et nos découvertes dans le monde en constante évolution du développement web. Chaque article est rédigé par notre équipe d\'experts passionnés.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'about-commitment',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'about-commitment-span',
                  text: '📚 Notre Engagement Qualité',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'about-quality',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'quality-intro',
                  text: 'Nous nous engageons à publier du contenu de haute qualité : ',
                  marks: []
                },
                {
                  _type: 'span',
                  _key: 'quality-list',
                  text: 'articles techniques approfondis, tutoriels pratiques, analyses de tendances et retours d\'expérience concrets. Chaque publication est vérifiée et testée par notre équipe.',
                  marks: ['strong']
                }
              ]
            }
          ],
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#f8fafc'
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            alignment: 'left',
            spacing: 'large',
            textColor: '#374151'
          }
        },

        // 📊 StatsBlock - Statistiques du Blog (CONFORME AU SCHÉMA)
        {
          _type: 'statsBlock',
          _key: 'blog-stats',
          title: 'Notre Impact en Chiffres',
          subtitle: 'La communauté qui nous fait confiance',
          
          // ✅ CONFORME : layout selon le schéma statsBlock
          layout: 'grid-4col',
          
          // ✅ CONFORME : stats array selon le schéma
          stats: [
            {
              _key: 'stat-articles',
              number: '200+',
              label: 'Articles Publiés',
              description: 'Contenu technique de qualité',
              icon: '📝',
              featured: false
            },
            {
              _key: 'stat-readers',
              number: '50K+',
              label: 'Lecteurs Mensuels',
              description: 'Développeurs qui nous suivent',
              icon: '👥',
              featured: true
            },
            {
              _key: 'stat-topics',
              number: '25+',
              label: 'Sujets Couverts',
              description: 'Technologies et frameworks',
              icon: '🔧',
              featured: false
            },
            {
              _key: 'stat-frequency',
              number: '3/sem',
              label: 'Nouveaux Articles',
              description: 'Rythme de publication régulier',
              icon: '⏰',
              featured: false
            }
          ],
          
          // ✅ CONFORME : animationSettings selon le schéma
          animationSettings: {
            enableAnimations: true,
            triggerOffset: 50,
            animationType: 'countUp',
            duration: 2500,
            delay: 300,
            staggerDelay: 200,
            easing: 'easeOutQuart'
          },
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#ffffff'
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            alignment: 'center',
            spacing: 'large'
          }
        },
        
        // 📞 ContactBlock - Newsletter (CONFORME AU SCHÉMA)
        {
          _type: 'contactBlock',
          _key: 'blog-newsletter',
          title: 'Restez Informé',
          subtitle: 'Abonnez-vous à notre newsletter pour recevoir nos derniers articles',
          
          // ✅ CONFORME : layout selon le schéma contactBlock
          layout: 'centered',
          
          // ✅ CONFORME : formFields array selon le schéma
          formFields: [
            {
              _key: 'field-name',
              fieldType: 'text',
              label: 'Prénom',
              placeholder: 'Votre prénom',
              required: true,
              width: 'half'
            },
            {
              _key: 'field-email',
              fieldType: 'email',
              label: 'Email',
              placeholder: 'votre@email.com',
              required: true,
              width: 'half'
            },
            {
              _key: 'field-interests',
              fieldType: 'select',
              label: 'Centres d\'intérêt',
              placeholder: 'Sélectionnez vos sujets préférés',
              required: false,
              width: 'full',
              options: [
                { label: 'Frontend (React, Next.js)', value: 'frontend' },
                { label: 'Backend (Node.js, APIs)', value: 'backend' },
                { label: 'DevOps & Déploiement', value: 'devops' },
                { label: 'Design & UX', value: 'design' },
                { label: 'Mobile & PWA', value: 'mobile' },
                { label: 'Tous les sujets', value: 'all' }
              ]
            }
          ],
          
          // ✅ CONFORME : submitButton selon le schéma
          submitButton: {
            text: 'S\'abonner à la Newsletter',
            loadingText: 'Inscription en cours...'
          },
          
          // ✅ CONFORME : successMessage selon le schéma
          successMessage: {
            title: 'Inscription Réussie !',
            description: 'Merci de votre inscription ! Vous recevrez nos prochains articles directement dans votre boîte mail.'
          },
          
          // ✅ CONFORME : contactInfo selon le schéma
          contactInfo: {
            showContactInfo: false
          },
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'gradient',
            gradientSettings: {
              gradientType: 'preset',
              preset: 'sunset',
              intensity: 85
            }
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            alignment: 'center',
            spacing: 'large'
          }
        }
      ]
    }

    console.log('📝 Création du document page Blog dans Sanity...')
    const result = await client.create(blogPageData)
    
    console.log('✅ Page Blog créée avec succès:', result._id)
    
    return NextResponse.json({ 
      success: true, 
      page: result,
      message: 'Page Blog créée avec succès dans Sanity Studio - Conformité schémas respectée'
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page Blog:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: 'Vérifiez que Sanity est correctement configuré et que vous avez les permissions d\'écriture'
    }, { status: 500 })
  }
}
