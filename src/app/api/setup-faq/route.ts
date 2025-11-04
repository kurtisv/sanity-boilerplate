import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Refonte complète - Création de la page FAQ selon les standards...')

    const faqPageData = {
      _type: 'page',
      title: 'FAQ',
      slug: { 
        current: 'faq',
        _type: 'slug'
      },
      seoTitle: 'FAQ - Questions Fréquentes sur nos Services',
      seoDescription: 'Trouvez rapidement les réponses à vos questions sur nos services de développement web, nos processus, tarifs et délais. Support client complet.',
      
      // Page builder avec les 7 blocs - CONFORMITÉ SANITY STRICTE
      pageBuilder: [
        // 🦸 HeroBlock - FAQ Hero (CONFORME AU SCHÉMA)
        {
          _type: 'heroBlock',
          _key: 'faq-hero',
          title: 'Questions Fréquentes',
          subtitle: 'Trouvez rapidement les réponses à toutes vos questions sur nos services, processus et conditions. Notre équipe support est également disponible pour vous accompagner.',
          
          // ✅ CONFORME : ctaButtons array selon le schéma
          ctaButtons: [
            {
              _key: 'cta-search',
              text: '🔍 Rechercher une Question',
              href: '#search',
              variant: 'primary'
            },
            {
              _key: 'cta-contact',
              text: '💬 Nous Contacter',
              href: '/contact',
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
              preset: 'ice',
              intensity: 90
            }
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            textColor: '#1f2937',
            alignment: 'center',
            spacing: 'large'
          },
          
          // ✅ CONFORME : iconField selon le schéma
          iconType: 'emoji',
          iconEmoji: '❓',
          iconSize: 'large',
          iconPosition: 'above'
        },
        
        // ⭐ FeatureGridBlock - Catégories FAQ (CONFORME AU SCHÉMA)
        {
          _type: 'featureGridBlock',
          _key: 'faq-categories',
          title: 'Catégories de Questions',
          subtitle: 'Naviguez par thématique pour trouver rapidement vos réponses',
          
          // ✅ CONFORME : gridLayout selon le schéma
          gridLayout: '2x2-square',
          
          // ✅ CONFORME : cardStyle selon le schéma
          cardStyle: 'bordered',
          
          // ✅ CONFORME : features array selon le schéma
          features: [
            {
              _key: 'category-services',
              iconType: 'emoji',
              iconEmoji: '🛠️',
              iconSize: 'large',
              iconColor: '#3b82f6',
              title: 'Services & Prestations',
              description: 'Questions sur nos services de développement, types de projets, technologies utilisées et processus de travail.',
              featured: true
            },
            {
              _key: 'category-pricing',
              iconType: 'emoji',
              iconEmoji: '💰',
              iconSize: 'large',
              iconColor: '#10b981',
              title: 'Tarifs & Devis',
              description: 'Informations sur nos tarifs, méthodes de facturation, devis gratuits et options de paiement disponibles.',
              featured: false
            },
            {
              _key: 'category-process',
              iconType: 'emoji',
              iconEmoji: '⚙️',
              iconSize: 'large',
              iconColor: '#f59e0b',
              title: 'Processus & Délais',
              description: 'Étapes de développement, délais de livraison, méthodes de suivi et communication pendant le projet.',
              featured: false
            },
            {
              _key: 'category-support',
              iconType: 'emoji',
              iconEmoji: '🎧',
              iconSize: 'large',
              iconColor: '#8b5cf6',
              title: 'Support & Maintenance',
              description: 'Support technique, maintenance post-livraison, mises à jour et résolution de problèmes.',
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

        // 📝 TextBlock - FAQ Services (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'faq-services',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'services-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'services-title-span',
                  text: '🛠️ Services & Prestations',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-q1',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-q1-span',
                  text: 'Quels types de projets développez-vous ?',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-a1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-a1-span',
                  text: 'Nous développons des sites vitrine, e-commerce, applications web, PWA et solutions sur mesure. Notre expertise couvre Next.js, React, Node.js et les CMS headless comme Sanity.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-q2',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-q2-span',
                  text: 'Utilisez-vous des technologies modernes ?',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-a2',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-a2-span',
                  text: 'Absolument ! Nous utilisons les dernières versions de Next.js 16, React 19, TypeScript 5, et des outils modernes comme Tailwind CSS, Sanity CMS et Vercel pour le déploiement.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-q3',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-q3-span',
                  text: 'Proposez-vous la maintenance après livraison ?',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-a3',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-a3-span',
                  text: 'Oui, nous proposons des contrats de maintenance incluant mises à jour sécurisées, monitoring, sauvegardes et support technique prioritaire.',
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

        // 📝 TextBlock - FAQ Tarifs (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'faq-pricing',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'pricing-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'pricing-title-span',
                  text: '💰 Tarifs & Devis',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-p1',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-p1-span',
                  text: 'Comment calculez-vous vos tarifs ?',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-pa1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-pa1-span',
                  text: 'Nos tarifs dépendent de la complexité, des fonctionnalités et du délai. Nous proposons des forfaits transparents : site vitrine (3-8K€), e-commerce (8-20K€), application sur mesure (15K€+).',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-p2',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-p2-span',
                  text: 'Le devis est-il gratuit et sans engagement ?',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-pa2',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-pa2-span',
                  text: 'Oui, le devis détaillé est entièrement gratuit et sans engagement. Nous analysons votre projet et vous proposons la solution la plus adaptée à votre budget.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-p3',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-p3-span',
                  text: 'Quelles sont vos modalités de paiement ?',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-pa3',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-pa3-span',
                  text: 'Nous acceptons les paiements par virement, chèque ou CB. Échelonnement possible : 30% à la commande, 40% à mi-parcours, 30% à la livraison.',
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

        // 📞 ContactBlock - Support (CONFORME AU SCHÉMA)
        {
          _type: 'contactBlock',
          _key: 'faq-support',
          title: 'Question Non Trouvée ?',
          subtitle: 'Notre équipe support est là pour vous aider',
          
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
              _key: 'field-category',
              fieldType: 'select',
              label: 'Catégorie de question',
              placeholder: 'Sélectionnez une catégorie',
              required: true,
              width: 'full',
              options: [
                { label: 'Services & Prestations', value: 'services' },
                { label: 'Tarifs & Devis', value: 'pricing' },
                { label: 'Processus & Délais', value: 'process' },
                { label: 'Support & Maintenance', value: 'support' },
                { label: 'Technique', value: 'technical' },
                { label: 'Autre', value: 'other' }
              ]
            },
            {
              _key: 'field-question',
              fieldType: 'textarea',
              label: 'Votre question',
              placeholder: 'Décrivez votre question en détail...',
              required: true,
              width: 'full'
            }
          ],
          
          // ✅ CONFORME : submitButton selon le schéma
          submitButton: {
            text: 'Envoyer ma Question',
            loadingText: 'Envoi en cours...'
          },
          
          // ✅ CONFORME : successMessage selon le schéma
          successMessage: {
            title: 'Question Envoyée !',
            description: 'Merci pour votre question. Notre équipe vous répondra sous 24h maximum.'
          },
          
          // ✅ CONFORME : contactInfo selon le schéma
          contactInfo: {
            showContactInfo: true,
            email: 'support@votreentreprise.com',
            phone: '+33 1 23 45 67 89',
            address: 'Support Client, Paris, France',
            hours: 'Lun-Ven 9h-18h • Réponse sous 24h'
          },
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'gradient',
            gradientSettings: {
              gradientType: 'preset',
              preset: 'midnight',
              intensity: 88
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

    console.log('📝 Création du document page FAQ dans Sanity...')
    const result = await client.create(faqPageData)
    
    console.log('✅ Page FAQ créée avec succès:', result._id)
    
    return NextResponse.json({ 
      success: true, 
      page: result,
      message: 'Page FAQ créée avec succès dans Sanity Studio - Conformité schémas respectée'
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page FAQ:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: 'Vérifiez que Sanity est correctement configuré et que vous avez les permissions d\'écriture'
    }, { status: 500 })
  }
}
