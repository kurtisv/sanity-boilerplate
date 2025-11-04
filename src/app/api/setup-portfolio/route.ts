import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { generateCtaKey, generateFeatureKey, generateImageKey, generateStatKey } from '@/lib/generate-keys'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Refonte complète - Création de la page Portfolio selon les standards...')

    const portfolioPageData = {
      _type: 'page',
      title: 'Portfolio',
      slug: { 
        current: 'portfolio',
        _type: 'slug'
      },
      seoTitle: 'Portfolio - Nos Réalisations et Projets Clients',
      seoDescription: 'Découvrez nos réalisations web : sites vitrine, e-commerce, applications. Études de cas détaillées avec technologies utilisées et résultats obtenus.',
      
      // Page builder avec les 7 blocs - CONFORMITÉ SANITY STRICTE
      pageBuilder: [
        // 🦸 HeroBlock - Portfolio Hero (CONFORME AU SCHÉMA)
        {
          _type: 'heroBlock',
          _key: 'portfolio-hero',
          title: 'Nos Réalisations',
          subtitle: 'Découvrez nos projets web les plus marquants. De la conception à la mise en ligne, chaque projet reflète notre expertise technique et notre attention aux détails.',
          
          // ✅ CONFORME : ctaButtons array selon le schéma
          ctaButtons: [
            {
              _key: 'cta-projects',
              text: '🎨 Voir les Projets',
              href: '#projects',
              variant: 'primary'
            },
            {
              _key: 'cta-contact',
              text: '💬 Discuter de Votre Projet',
              href: '/contact',
              variant: 'secondary'
            }
          ],
          
          // ✅ CONFORME : layout selon le schéma
          layout: 'centered',
          
          // ✅ CONFORME : heroSettings objet selon le schéma
          heroSettings: {
            height: 'large',
            verticalAlignment: 'center',
            textAlignment: 'center'
          },
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'gradient',
            gradientSettings: {
              gradientType: 'preset',
              preset: 'ocean',
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
          iconEmoji: '🎨',
          iconSize: 'large',
          iconPosition: 'above'
        },
        
        // ⭐ FeatureGridBlock - Types de Projets (CONFORME AU SCHÉMA)
        {
          _type: 'featureGridBlock',
          _key: 'portfolio-types',
          title: 'Types de Projets',
          subtitle: 'Notre expertise couvre tous les domaines du développement web moderne',
          
          // ✅ CONFORME : gridLayout selon le schéma
          gridLayout: '2x2-square',
          
          // ✅ CONFORME : cardStyle selon le schéma
          cardStyle: 'shadow',
          
          // ✅ CONFORME : features array selon le schéma
          features: [
            {
              _key: 'type-vitrine',
              iconType: 'emoji',
              iconEmoji: '🌐',
              iconSize: 'large',
              iconColor: '#3b82f6',
              title: 'Sites Vitrine',
              description: 'Sites corporate, portfolios, landing pages avec design sur mesure et optimisation SEO avancée.',
              featured: true
            },
            {
              _key: 'type-ecommerce',
              iconType: 'emoji',
              iconEmoji: '🛒',
              iconSize: 'large',
              iconColor: '#10b981',
              title: 'E-commerce',
              description: 'Boutiques en ligne complètes avec gestion produits, paiements sécurisés et tableaux de bord.',
              featured: false
            },
            {
              _key: 'type-webapp',
              iconType: 'emoji',
              iconEmoji: '⚡',
              iconSize: 'large',
              iconColor: '#f59e0b',
              title: 'Applications Web',
              description: 'SaaS, plateformes métier, outils internes avec authentification et bases de données.',
              featured: false
            },
            {
              _key: 'type-mobile',
              iconType: 'emoji',
              iconEmoji: '📱',
              iconSize: 'large',
              iconColor: '#8b5cf6',
              title: 'Applications Mobiles',
              description: 'PWA, applications React Native, solutions cross-platform pour iOS et Android.',
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

        // 🖼️ GalleryBlock - Projets Récents (CONFORME AU SCHÉMA)
        {
          _type: 'galleryBlock',
          _key: 'portfolio-gallery',
          title: 'Projets Récents',
          subtitle: 'Une sélection de nos dernières réalisations',
          
          // ✅ CONFORME : layout selon le schéma
          layout: 'masonry',
          
          // ✅ CONFORME : images array selon le schéma
          images: [
            {
              alt: 'Site e-commerce mode - Interface moderne et responsive',
              caption: 'E-commerce Mode - Plateforme de vente en ligne',
              category: 'e-commerce',
              featured: true
            },
            {
              alt: 'Application SaaS - Dashboard analytics',
              caption: 'SaaS Analytics - Tableau de bord intelligent',
              category: 'saas',
              featured: false
            },
            {
              alt: 'Site vitrine architecture - Design épuré',
              caption: 'Cabinet Architecture - Site vitrine élégant',
              category: 'vitrine',
              featured: false
            },
            {
              alt: 'Plateforme éducative - Interface d\'apprentissage',
              caption: 'EdTech Platform - Apprentissage en ligne',
              category: 'education',
              featured: true
            }
          ],
          
          // ✅ CONFORME : gridSettings selon le schéma
          gridSettings: {
            columns: {
              desktop: 3,
              tablet: 2,
              mobile: 1
            },
            aspectRatio: 'auto',
            gap: 'medium'
          },
          
          // ✅ CONFORME : filterOptions selon le schéma
          filterOptions: {
            enableFilters: true,
            filterStyle: 'buttons',
            showAllOption: true
          },
          
          // ✅ CONFORME : lightboxOptions selon le schéma
          lightboxOptions: {
            enableLightbox: true,
            showCaptions: true,
            showCounter: true,
            enableZoom: true
          },
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#f8fafc'
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            alignment: 'center',
            spacing: 'large'
          }
        },

        // 📊 StatsBlock - Chiffres Clés (CONFORME AU SCHÉMA)
        {
          _type: 'statsBlock',
          _key: 'portfolio-stats',
          title: 'Nos Résultats en Chiffres',
          subtitle: 'La performance de nos réalisations parle d\'elle-même',
          
          // ✅ CONFORME : layout selon le schéma
          layout: 'grid-4col',
          
          // ✅ CONFORME : stats array selon le schéma
          stats: [
            {
              _key: 'stat-projects',
              number: '150+',
              label: 'Projets Livrés',
              description: 'Sites et applications développés',
              icon: '🚀',
              featured: false
            },
            {
              _key: 'stat-clients',
              number: '98%',
              label: 'Clients Satisfaits',
              description: 'Taux de satisfaction client',
              icon: '😊',
              featured: true
            },
            {
              _key: 'stat-performance',
              number: '95+',
              label: 'Score Performance',
              description: 'Moyenne Lighthouse de nos sites',
              icon: '⚡',
              featured: false
            },
            {
              _key: 'stat-maintenance',
              number: '24/7',
              label: 'Support Technique',
              description: 'Monitoring et maintenance',
              icon: '🛠️',
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
            backgroundType: 'gradient',
            gradientSettings: {
              gradientType: 'preset',
              preset: 'sunset',
              intensity: 88
            }
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            alignment: 'center',
            spacing: 'large'
          }
        },

        // 📝 TextBlock - Technologies (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'portfolio-tech',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'tech-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'tech-title-span',
                  text: '🛠️ Technologies Utilisées',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'tech-frontend',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'tech-frontend-span',
                  text: 'Frontend Moderne',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'tech-frontend-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'tech-frontend-desc-span',
                  text: 'React 18, Next.js 14, TypeScript, Tailwind CSS, Framer Motion pour des interfaces utilisateur performantes et modernes.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'tech-backend',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'tech-backend-span',
                  text: 'Backend Robuste',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'tech-backend-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'tech-backend-desc-span',
                  text: 'Node.js, Express, PostgreSQL, MongoDB, Redis, APIs REST et GraphQL pour des architectures scalables et sécurisées.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'tech-deployment',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'tech-deployment-span',
                  text: 'Déploiement & DevOps',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'tech-deployment-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'tech-deployment-desc-span',
                  text: 'Vercel, AWS, Docker, CI/CD avec GitHub Actions, monitoring avec Sentry et analytics avancés.',
                  marks: []
                }
              ]
            }
          ],
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#ffffff'
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            alignment: 'left',
            spacing: 'large',
            textColor: '#374151'
          }
        },

        // 📞 ContactBlock - Démarrer un Projet (CONFORME AU SCHÉMA)
        {
          _type: 'contactBlock',
          _key: 'portfolio-contact',
          title: 'Démarrons Votre Projet',
          subtitle: 'Prêt à créer quelque chose d\'exceptionnel ensemble ? Parlons de votre vision.',
          
          // ✅ CONFORME : layout selon le schéma contactBlock
          layout: 'centered',
          
          // ✅ CONFORME : formFields array selon le schéma
          formFields: [
            {
              _key: 'field-name',
              fieldType: 'text',
              label: 'Nom complet',
              placeholder: 'Votre nom et prénom',
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
              _key: 'field-company',
              fieldType: 'text',
              label: 'Entreprise',
              placeholder: 'Nom de votre entreprise',
              required: false,
              width: 'half'
            },
            {
              _key: 'field-budget',
              fieldType: 'select',
              label: 'Budget estimé',
              placeholder: 'Sélectionnez votre budget',
              required: false,
              width: 'half',
              options: [
                { label: 'Moins de 5 000€', value: 'budget-5k' },
                { label: '5 000€ - 15 000€', value: 'budget-15k' },
                { label: '15 000€ - 30 000€', value: 'budget-30k' },
                { label: '30 000€ - 50 000€', value: 'budget-50k' },
                { label: 'Plus de 50 000€', value: 'budget-50k-plus' },
                { label: 'À discuter', value: 'budget-discuss' }
              ]
            },
            {
              _key: 'field-project-type',
              fieldType: 'select',
              label: 'Type de projet',
              placeholder: 'Quel type de projet ?',
              required: true,
              width: 'full',
              options: [
                { label: 'Site vitrine / Corporate', value: 'vitrine' },
                { label: 'E-commerce / Boutique en ligne', value: 'ecommerce' },
                { label: 'Application web / SaaS', value: 'webapp' },
                { label: 'Application mobile / PWA', value: 'mobile' },
                { label: 'Refonte de site existant', value: 'refonte' },
                { label: 'Autre / Projet spécifique', value: 'other' }
              ]
            },
            {
              _key: 'field-description',
              fieldType: 'textarea',
              label: 'Description du projet',
              placeholder: 'Décrivez votre projet : objectifs, fonctionnalités souhaitées, inspirations...',
              required: true,
              width: 'full'
            }
          ],
          
          // ✅ CONFORME : submitButton selon le schéma
          submitButton: {
            text: 'Envoyer ma Demande',
            loadingText: 'Envoi en cours...'
          },
          
          // ✅ CONFORME : successMessage selon le schéma
          successMessage: {
            title: 'Demande Envoyée !',
            description: 'Merci pour votre intérêt ! Nous étudions votre projet et vous recontactons sous 24h avec une première analyse.'
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
              preset: 'midnight',
              intensity: 90
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

    console.log('📝 Création du document page Portfolio dans Sanity...')
    const result = await client.create(portfolioPageData)
    
    console.log('✅ Page Portfolio créée avec succès:', result._id)
    
    return NextResponse.json({ 
      success: true, 
      page: result,
      message: 'Page Portfolio créée avec succès dans Sanity Studio - Conformité schémas respectée'
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page Portfolio:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: 'Vérifiez que Sanity est correctement configuré et que vous avez les permissions d\'écriture'
    }, { status: 500 })
  }
}
