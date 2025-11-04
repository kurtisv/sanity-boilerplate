import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Refonte complète - Création de la page Pricing selon les standards...')

    const pricingPageData = {
      _type: 'page',
      title: 'Tarifs',
      slug: { 
        current: 'pricing',
        _type: 'slug'
      },
      seoTitle: 'Tarifs - Plans Tarifaires et Devis Personnalisés',
      seoDescription: 'Découvrez nos tarifs transparents pour le développement web. Forfaits sites vitrine, e-commerce, applications sur mesure. Devis gratuit sous 24h.',
      
      // Page builder avec les 7 blocs - CONFORMITÉ SANITY STRICTE
      pageBuilder: [
        // 🦸 HeroBlock - Pricing Hero (CONFORME AU SCHÉMA)
        {
          _type: 'heroBlock',
          _key: 'pricing-hero',
          title: 'Tarifs Transparents',
          subtitle: 'Des forfaits clairs et sans surprise pour tous vos projets web. Du site vitrine à l\'application sur mesure, trouvez la solution qui correspond à votre budget et vos ambitions.',
          
          // ✅ CONFORME : ctaButtons array selon le schéma
          ctaButtons: [
            {
              _key: 'cta-plans',
              text: '💰 Voir les Plans',
              href: '#plans',
              variant: 'primary'
            },
            {
              _key: 'cta-custom',
              text: '📋 Devis Gratuit',
              href: '#contact',
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
              preset: 'fire',
              intensity: 93
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
          iconEmoji: '💎',
          iconSize: 'large',
          iconPosition: 'above'
        },
        
        // 📝 TextBlock - Plans Tarifaires (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'pricing-plans',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'plans-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'plans-title-span',
                  text: '💰 Nos Forfaits & Tarifs',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'plan-vitrine-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'plan-vitrine-title-span',
                  text: '🌐 Site Vitrine - À partir de 3 500€',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'plan-vitrine-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'plan-vitrine-desc-span',
                  text: 'Site professionnel responsive avec CMS Sanity. 5-8 pages, design sur mesure, optimisation SEO, formulaire de contact. Livraison 2-3 semaines. Idéal pour PME et professions libérales.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'plan-ecommerce-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'plan-ecommerce-title-span',
                  text: '🛒 E-commerce - À partir de 8 500€',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'plan-ecommerce-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'plan-ecommerce-desc-span',
                  text: 'Boutique en ligne complète avec gestion produits, panier, paiements sécurisés (Stripe/PayPal), gestion commandes, tableau de bord admin. Livraison 4-6 semaines.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'plan-webapp-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'plan-webapp-title-span',
                  text: '⚡ Application Web - À partir de 15 000€',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'plan-webapp-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'plan-webapp-desc-span',
                  text: 'Application sur mesure avec authentification, base de données, API, tableaux de bord, fonctionnalités avancées. Développement agile, livraison par sprints. Délai selon complexité.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'pricing-note',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'pricing-note-strong',
                  text: '📋 Devis personnalisé gratuit : ',
                  marks: ['strong']
                },
                {
                  _type: 'span',
                  _key: 'pricing-note-text',
                  text: 'Chaque projet étant unique, nous établissons un devis détaillé après analyse de vos besoins. Première consultation gratuite et sans engagement.',
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

        // ⭐ FeatureGridBlock - Ce qui est Inclus (CONFORME AU SCHÉMA)
        {
          _type: 'featureGridBlock',
          _key: 'pricing-included',
          title: 'Ce qui est Toujours Inclus',
          subtitle: 'Nos garanties pour tous les projets, quel que soit le forfait',
          
          // ✅ CONFORME : gridLayout selon le schéma
          gridLayout: '2x2-square',
          
          // ✅ CONFORME : cardStyle selon le schéma
          cardStyle: 'colored',
          
          // ✅ CONFORME : features array selon le schéma
          features: [
            {
              _key: 'included-1',
              iconType: 'emoji',
              iconEmoji: '🎨',
              iconSize: 'large',
              iconColor: '#3b82f6',
              title: 'Design Sur Mesure',
              description: 'Création graphique unique, charte visuelle cohérente, design responsive pour tous les écrans.',
              featured: false
            },
            {
              _key: 'included-2',
              iconType: 'emoji',
              iconEmoji: '🚀',
              iconSize: 'large',
              iconColor: '#10b981',
              title: 'Performance Optimisée',
              description: 'Code optimisé, temps de chargement rapide, SEO technique, compatibilité navigateurs.',
              featured: true
            },
            {
              _key: 'included-3',
              iconType: 'emoji',
              iconEmoji: '🔒',
              iconSize: 'large',
              iconColor: '#f59e0b',
              title: 'Sécurité Renforcée',
              description: 'HTTPS, sauvegardes automatiques, protection contre les attaques, mises à jour sécurisées.',
              featured: false
            },
            {
              _key: 'included-4',
              iconType: 'emoji',
              iconEmoji: '📞',
              iconSize: 'large',
              iconColor: '#8b5cf6',
              title: 'Support 3 Mois',
              description: 'Support technique inclus, corrections de bugs, formation à l\'utilisation, documentation complète.',
              featured: false
            }
          ],
          
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

        // 📝 TextBlock - Options & Services (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'pricing-options',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'options-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'options-title-span',
                  text: '🔧 Options & Services Complémentaires',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'maintenance-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'maintenance-title-span',
                  text: '🛠️ Maintenance & Support Étendu',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'maintenance-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'maintenance-desc-span',
                  text: 'Contrat de maintenance mensuel (150-500€/mois) : mises à jour, monitoring, sauvegardes, support prioritaire, corrections illimitées, évolutions mineures.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'seo-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'seo-title-span',
                  text: '📈 Référencement SEO Avancé',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'seo-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'seo-desc-span',
                  text: 'Audit SEO complet (800€), optimisation technique, création de contenu, netlinking, suivi mensuel des positions. Résultats mesurables sous 3-6 mois.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'formation-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'formation-title-span',
                  text: '🎓 Formation & Accompagnement',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'formation-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'formation-desc-span',
                  text: 'Formation personnalisée (500€/jour) : prise en main du CMS, gestion du contenu, bonnes pratiques, autonomie complète. Sessions en présentiel ou visio.',
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

        // 📊 StatsBlock - Garanties (CONFORME AU SCHÉMA)
        {
          _type: 'statsBlock',
          _key: 'pricing-guarantees',
          title: 'Nos Garanties & Engagements',
          subtitle: 'Votre tranquillité d\'esprit est notre priorité',
          
          // ✅ CONFORME : layout selon le schéma statsBlock
          layout: 'grid-4col',
          
          // ✅ CONFORME : stats array selon le schéma
          stats: [
            {
              _key: 'guarantee-delivery',
              number: '95%',
              label: 'Livraisons à Temps',
              description: 'Respect des délais convenus',
              icon: '⏰',
              featured: false
            },
            {
              _key: 'guarantee-satisfaction',
              number: '30j',
              label: 'Garantie Satisfaction',
              description: 'Corrections incluses',
              icon: '✅',
              featured: true
            },
            {
              _key: 'guarantee-support',
              number: '3 mois',
              label: 'Support Inclus',
              description: 'Assistance technique gratuite',
              icon: '🛠️',
              featured: false
            },
            {
              _key: 'guarantee-quote',
              number: '24h',
              label: 'Devis Gratuit',
              description: 'Réponse rapide garantie',
              icon: '📋',
              featured: false
            }
          ],
          
          // ✅ CONFORME : animationSettings selon le schéma
          animationSettings: {
            enableAnimations: true,
            triggerOffset: 50,
            animationType: 'countUp',
            duration: 2200,
            delay: 400,
            staggerDelay: 250,
            easing: 'easeOutQuart'
          },
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'gradient',
            gradientSettings: {
              gradientType: 'preset',
              preset: 'pastel-blue',
              intensity: 85
            }
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            alignment: 'center',
            spacing: 'large'
          }
        },
        
        // 📞 ContactBlock - Devis Gratuit (CONFORME AU SCHÉMA)
        {
          _type: 'contactBlock',
          _key: 'pricing-quote',
          title: 'Demandez Votre Devis Gratuit',
          subtitle: 'Obtenez une estimation personnalisée pour votre projet en moins de 24h',
          
          // ✅ CONFORME : layout selon le schéma contactBlock
          layout: 'form-with-info',
          
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
              _key: 'field-phone',
              fieldType: 'tel',
              label: 'Téléphone',
              placeholder: '+33 6 12 34 56 78',
              required: false,
              width: 'half'
            },
            {
              _key: 'field-project-type',
              fieldType: 'select',
              label: 'Type de projet',
              placeholder: 'Sélectionnez le type',
              required: true,
              width: 'full',
              options: [
                { label: 'Site vitrine (3-8K€)', value: 'vitrine' },
                { label: 'E-commerce (8-20K€)', value: 'ecommerce' },
                { label: 'Application web (15K€+)', value: 'webapp' },
                { label: 'Refonte de site existant', value: 'refonte' },
                { label: 'Maintenance & support', value: 'maintenance' },
                { label: 'Autre / Je ne sais pas', value: 'other' }
              ]
            },
            {
              _key: 'field-budget',
              fieldType: 'select',
              label: 'Budget estimé',
              placeholder: 'Votre budget approximatif',
              required: false,
              width: 'full',
              options: [
                { label: 'Moins de 5 000€', value: 'budget-5k' },
                { label: '5 000€ - 10 000€', value: 'budget-10k' },
                { label: '10 000€ - 20 000€', value: 'budget-20k' },
                { label: '20 000€ - 50 000€', value: 'budget-50k' },
                { label: 'Plus de 50 000€', value: 'budget-50k-plus' },
                { label: 'À définir ensemble', value: 'budget-discuss' }
              ]
            },
            {
              _key: 'field-timeline',
              fieldType: 'select',
              label: 'Délai souhaité',
              placeholder: 'Quand souhaitez-vous lancer ?',
              required: false,
              width: 'full',
              options: [
                { label: 'Dès que possible', value: 'asap' },
                { label: 'Dans le mois', value: '1month' },
                { label: 'Dans les 3 mois', value: '3months' },
                { label: 'Plus de 3 mois', value: '3months-plus' },
                { label: 'Pas de contrainte', value: 'flexible' }
              ]
            },
            {
              _key: 'field-description',
              fieldType: 'textarea',
              label: 'Description du projet',
              placeholder: 'Décrivez votre projet : objectifs, fonctionnalités souhaitées, contraintes particulières...',
              required: true,
              width: 'full'
            }
          ],
          
          // ✅ CONFORME : submitButton selon le schéma
          submitButton: {
            text: 'Demander mon Devis Gratuit',
            loadingText: 'Envoi en cours...'
          },
          
          // ✅ CONFORME : successMessage selon le schéma
          successMessage: {
            title: 'Demande de Devis Envoyée !',
            description: 'Merci pour votre demande. Nous analysons votre projet et vous enverrons un devis détaillé sous 24h maximum.'
          },
          
          // ✅ CONFORME : contactInfo selon le schéma
          contactInfo: {
            showContactInfo: true,
            email: 'devis@votreentreprise.com',
            phone: '+33 1 23 45 67 89',
            address: 'Commercial - Paris, France',
            hours: 'Lun-Ven 9h-18h • Devis sous 24h'
          },
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#ffffff'
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            alignment: 'left',
            spacing: 'large'
          }
        }
      ]
    }

    console.log('📝 Création du document page Pricing dans Sanity...')
    const result = await client.create(pricingPageData)
    
    console.log('✅ Page Pricing créée avec succès:', result._id)
    
    return NextResponse.json({ 
      success: true, 
      page: result,
      message: 'Page Pricing créée avec succès dans Sanity Studio - Conformité schémas respectée'
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page Pricing:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: 'Vérifiez que Sanity est correctement configuré et que vous avez les permissions d\'écriture'
    }, { status: 500 })
  }
}
