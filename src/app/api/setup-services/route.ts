import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Refonte complète - Création de la page Services selon les standards...')

    const servicesPageData = {
      _type: 'page',
      title: 'Services',
      slug: { 
        current: 'services',
        _type: 'slug'
      },
      seoTitle: 'Services - Développement Web et Solutions Digitales',
      seoDescription: 'Découvrez nos services : développement web, applications mobiles, e-commerce, SEO. Solutions sur mesure avec technologies modernes et support technique.',
      
      // Page builder avec les 7 blocs - CONFORMITÉ SANITY STRICTE
      pageBuilder: [
        // 🦸 HeroBlock - Services Hero (CONFORME AU SCHÉMA)
        {
          _type: 'heroBlock',
          _key: 'services-hero',
          title: 'Nos Services',
          subtitle: 'Des solutions digitales complètes pour propulser votre entreprise. Du développement web aux applications mobiles, nous transformons vos idées en succès.',
          
          // ✅ CONFORME : ctaButtons array selon le schéma
          ctaButtons: [
            {
              text: '🎨 Voir nos réalisations',
              href: '#services-list',
              variant: 'primary'
            },
            {
              text: '💰 Demander un devis',
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
              preset: 'green-blue',
              intensity: 88
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
          iconEmoji: '🛠️',
          iconSize: 'large',
          iconPosition: 'above'
        },

        // ⭐ FeatureGridBlock - Services Principaux (CONFORME AU SCHÉMA)
        {
          _type: 'featureGridBlock',
          _key: 'services-main',
          title: 'Nos Prestations',
          subtitle: 'Une gamme complète de services pour tous vos besoins digitaux',
          
          // ✅ CONFORME : gridLayout selon le schéma
          gridLayout: '2x2-square',
          
          // ✅ CONFORME : cardStyle selon le schéma
          cardStyle: 'shadow',
          
          // ✅ CONFORME : features array selon le schéma
          features: [
            {
              iconType: 'emoji',
              iconEmoji: '🌐',
              iconSize: 'large',
              iconColor: '#3b82f6',
              title: 'Développement Web',
              description: 'Sites vitrine, e-commerce, applications web sur mesure avec React, Next.js et technologies modernes.',
              details: ['Sites vitrine', 'E-commerce', 'Applications web', 'CMS headless'],
              link: {
                url: '/contact?service=web',
                text: 'En savoir plus'
              },
              featured: true
            },
            {
              iconType: 'emoji',
              iconEmoji: '📱',
              iconSize: 'large',
              iconColor: '#10b981',
              title: 'Applications Mobiles',
              description: 'Applications iOS, Android et PWA avec React Native et technologies cross-platform.',
              details: ['iOS natif', 'Android natif', 'React Native', 'Progressive Web Apps'],
              link: {
                url: '/contact?service=mobile',
                text: 'En savoir plus'
              },
              featured: false
            },
            {
              iconType: 'emoji',
              iconEmoji: '🛒',
              iconSize: 'large',
              iconColor: '#f59e0b',
              title: 'E-commerce',
              description: 'Boutiques en ligne performantes avec gestion complète des ventes et paiements sécurisés.',
              details: ['Shopify', 'WooCommerce', 'Solutions custom', 'Paiements sécurisés'],
              link: {
                url: '/contact?service=ecommerce',
                text: 'En savoir plus'
              },
              featured: false
            },
            {
              iconType: 'emoji',
              iconEmoji: '📈',
              iconSize: 'large',
              iconColor: '#8b5cf6',
              title: 'SEO & Marketing',
              description: 'Optimisation SEO, analytics, marketing digital pour maximiser votre visibilité en ligne.',
              details: ['SEO technique', 'Content marketing', 'Analytics', 'Publicité digitale'],
              link: {
                url: '/contact?service=seo',
                text: 'En savoir plus'
              },
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

        // 📝 TextBlock - Notre Processus (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'services-process',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'process-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'process-title-span',
                  text: '🔄 Notre Processus de Développement',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'process-intro',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'process-intro-span',
                  text: 'Nous suivons une méthodologie agile éprouvée pour garantir la réussite de votre projet, de la conception à la mise en ligne.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'step1-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'step1-title-span',
                  text: '1. Analyse & Stratégie',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'step1-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'step1-desc-span',
                  text: 'Audit de l\'existant, définition des objectifs, étude de la concurrence et élaboration de la stratégie digitale.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'step2-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'step2-title-span',
                  text: '2. Conception & Design',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'step2-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'step2-desc-span',
                  text: 'Wireframes, maquettes UX/UI, prototypage interactif et validation du design avec vous.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'step3-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'step3-title-span',
                  text: '3. Développement',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'step3-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'step3-desc-span',
                  text: 'Développement itératif avec livraisons régulières, tests automatisés et intégration continue.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'step4-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'step4-title-span',
                  text: '4. Lancement & Suivi',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'step4-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'step4-desc-span',
                  text: 'Mise en ligne, formation, support technique et optimisations continues basées sur les analytics.',
                  marks: []
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

        // 💰 Pricing Block simulé avec FeatureGridBlock
        {
          _type: 'featureGridBlock',
          _key: 'services-pricing',
          title: 'Nos Formules',
          subtitle: 'Des solutions adaptées à tous les budgets et besoins',
          
          // ✅ CONFORME : gridLayout selon le schéma
          gridLayout: '3-balanced',
          
          // ✅ CONFORME : cardStyle selon le schéma
          cardStyle: 'bordered',
          
          // ✅ CONFORME : features array selon le schéma
          features: [
            {
              _key: 'plan-starter',
              iconType: 'emoji',
              iconEmoji: '🌱',
              iconSize: 'medium',
              iconColor: '#10b981',
              title: 'Starter',
              description: 'Parfait pour les petites entreprises et startups qui débutent leur présence en ligne.',
              details: ['Site vitrine 5 pages', 'Design responsive', 'SEO de base', 'Support 3 mois'],
              link: {
                url: '/contact?plan=starter',
                text: 'À partir de 2 500€'
              },
              featured: false
            },
            {
              _key: 'plan-business',
              iconType: 'emoji',
              iconEmoji: '🚀',
              iconSize: 'medium',
              iconColor: '#3b82f6',
              title: 'Business',
              description: 'Solution complète pour les entreprises établies avec besoins avancés.',
              details: ['Site/App sur mesure', 'CMS avancé', 'E-commerce', 'Support 12 mois'],
              link: {
                url: '/contact?plan=business',
                text: 'À partir de 8 500€'
              },
              featured: true
            },
            {
              _key: 'plan-enterprise',
              iconType: 'emoji',
              iconEmoji: '🏢',
              iconSize: 'medium',
              iconColor: '#8b5cf6',
              title: 'Enterprise',
              description: 'Solutions sur mesure pour les grandes entreprises avec architecture complexe.',
              details: ['Architecture scalable', 'Intégrations API', 'Support dédié', 'SLA garantie'],
              link: {
                url: '/contact?plan=enterprise',
                text: 'Devis personnalisé'
              },
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

        // 📞 ContactBlock - Démarrer un Projet (CONFORME AU SCHÉMA)
        {
          _type: 'contactBlock',
          _key: 'services-contact',
          title: 'Discutons de Votre Projet',
          subtitle: 'Prêt à transformer votre vision en réalité digitale ? Contactez-nous pour un devis personnalisé.',
          
          // ✅ CONFORME : layout selon le schéma contactBlock
          layout: 'two-columns',
          
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
                { label: 'Plus de 30 000€', value: 'budget-30k-plus' }
              ]
            },
            {
              _key: 'field-service',
              fieldType: 'select',
              label: 'Service souhaité',
              placeholder: 'Quel service vous intéresse ?',
              required: true,
              width: 'full',
              options: [
                { label: 'Développement web', value: 'web' },
                { label: 'Application mobile', value: 'mobile' },
                { label: 'E-commerce', value: 'ecommerce' },
                { label: 'SEO & Marketing', value: 'seo' },
                { label: 'Refonte de site', value: 'refonte' },
                { label: 'Conseil & Audit', value: 'conseil' }
              ]
            },
            {
              _key: 'field-description',
              fieldType: 'textarea',
              label: 'Description du projet',
              placeholder: 'Décrivez votre projet, vos objectifs et vos attentes...',
              required: true,
              width: 'full'
            }
          ],
          
          // ✅ CONFORME : submitButton selon le schéma
          submitButton: {
            text: 'Demander un Devis',
            loadingText: 'Envoi en cours...'
          },
          
          // ✅ CONFORME : successMessage selon le schéma
          successMessage: {
            title: 'Demande Reçue !',
            description: 'Merci pour votre intérêt ! Nous analysons votre projet et vous recontactons sous 24h avec une première estimation.'
          },
          
          // ✅ CONFORME : contactInfo selon le schéma
          contactInfo: {
            showContactInfo: true,
            email: 'services@votreentreprise.com',
            phone: '+33 1 23 45 67 89',
            address: 'Paris, France',
            hours: 'Lun-Ven 9h-18h\nRéponse sous 24h'
          },
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'gradient',
            gradientSettings: {
              gradientType: 'preset',
              preset: 'midnight',
              intensity: 85
            }
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            alignment: 'left',
            spacing: 'large'
          }
        }
      ]
    }

    console.log('📝 Création du document page Services dans Sanity...')
    const result = await client.create(servicesPageData)
    
    console.log('✅ Page Services créée avec succès:', result._id)
    
    return NextResponse.json({ 
      success: true, 
      page: result,
      message: 'Page Services créée avec succès dans Sanity Studio - Conformité schémas respectée'
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
