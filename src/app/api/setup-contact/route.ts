import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Refonte complète - Création de la page Contact selon les standards...')

    const contactPageData = {
      _type: 'page',
      title: 'Contact',
      slug: { 
        current: 'contact',
        _type: 'slug'
      },
      seoTitle: 'Contact - Parlons de Votre Projet Digital',
      seoDescription: 'Contactez notre équipe pour discuter de votre projet web. Devis gratuit, conseils personnalisés et accompagnement sur mesure pour votre réussite digitale.',
      
      // Page builder avec les 7 blocs - CONFORMITÉ SANITY STRICTE
      pageBuilder: [
        // 🦸 HeroBlock - Contact Hero (CONFORME AU SCHÉMA)
        {
          _type: 'heroBlock',
          _key: 'contact-hero',
          title: 'Contactez-Nous',
          subtitle: 'Prêt à donner vie à votre projet digital ? Notre équipe est là pour vous accompagner de l\'idée à la réalisation. Parlons de vos ambitions !',
          
          // ✅ CONFORME : ctaButtons array selon le schéma
          ctaButtons: [
            {
              text: '📝 Remplir le Formulaire',
              href: '#contact-form',
              variant: 'primary'
            },
            {
              text: '📞 Appeler Directement',
              href: 'tel:+33123456789',
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
              preset: 'fire',
              intensity: 85
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
          iconEmoji: '📞',
          iconSize: 'large',
          iconPosition: 'above'
        },

        // ⭐ FeatureGridBlock - Moyens de Contact (CONFORME AU SCHÉMA)
        {
          _type: 'featureGridBlock',
          _key: 'contact-methods',
          title: 'Comment Nous Joindre',
          subtitle: 'Plusieurs moyens pour entrer en contact selon vos préférences',
          
          // ✅ CONFORME : gridLayout selon le schéma
          gridLayout: '3-balanced',
          
          // ✅ CONFORME : cardStyle selon le schéma
          cardStyle: 'shadow',
          
          // ✅ CONFORME : features array selon le schéma
          features: [
            {
              iconType: 'emoji',
              iconEmoji: '📧',
              iconSize: 'large',
              iconColor: '#3b82f6',
              title: 'Email',
              description: 'Écrivez-nous pour une réponse détaillée sous 24h maximum.',
              details: ['contact@votreentreprise.com', 'Réponse sous 24h', 'Pièces jointes acceptées'],
              link: {
                url: 'mailto:contact@votreentreprise.com',
                text: 'Envoyer un email'
              },
              featured: false
            },
            {
              iconType: 'emoji',
              iconEmoji: '📞',
              iconSize: 'large',
              iconColor: '#10b981',
              title: 'Téléphone',
              description: 'Appelez-nous pour une discussion directe et des conseils immédiats.',
              details: ['+33 1 23 45 67 89', 'Lun-Ven 9h-18h', 'Conseils gratuits'],
              link: {
                url: 'tel:+33123456789',
                text: 'Appeler maintenant'
              },
              featured: true
            },
            {
              iconType: 'emoji',
              iconEmoji: '🤝',
              iconSize: 'large',
              iconColor: '#f59e0b',
              title: 'Rendez-vous',
              description: 'Planifiez un rendez-vous en visio ou dans nos bureaux parisiens.',
              details: ['Visioconférence', 'Bureaux Paris', 'Rendez-vous sous 48h'],
              link: {
                url: 'https://calendly.com/votre-entreprise',
                text: 'Réserver un créneau'
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

        // 📞 ContactBlock - Formulaire Principal (CONFORME AU SCHÉMA)
        {
          _type: 'contactBlock',
          _key: 'contact-main-form',
          title: 'Parlez-nous de Votre Projet',
          subtitle: 'Plus vous nous en dites, mieux nous pourrons vous conseiller et vous proposer une solution adaptée.',
          
          // ✅ CONFORME : layout selon le schéma contactBlock
          layout: 'with-sidebar',
          
          // ✅ CONFORME : formFields array selon le schéma
          formFields: [
            {
              fieldType: 'name',
              label: 'Nom complet',
              placeholder: 'Votre nom et prénom',
              required: true,
              width: 'half'
            },
            {
              fieldType: 'email',
              label: 'Email professionnel',
              placeholder: 'votre@entreprise.com',
              required: true,
              width: 'half'
            },
            {
              fieldType: 'company',
              label: 'Entreprise',
              placeholder: 'Nom de votre entreprise',
              required: false,
              width: 'half'
            },
            {
              fieldType: 'phone',
              label: 'Téléphone',
              placeholder: '+33 1 23 45 67 89',
              required: false,
              width: 'half'
            },
            {
              _key: 'field-project-type',
              fieldType: 'select',
              label: 'Type de projet',
              placeholder: 'Sélectionnez le type de projet',
              required: true,
              width: 'full',
              options: [
                { label: 'Site vitrine / Corporate', value: 'vitrine' },
                { label: 'E-commerce / Boutique en ligne', value: 'ecommerce' },
                { label: 'Application web / SaaS', value: 'webapp' },
                { label: 'Application mobile', value: 'mobile' },
                { label: 'Refonte de site existant', value: 'refonte' },
                { label: 'SEO / Marketing digital', value: 'seo' },
                { label: 'Conseil / Audit technique', value: 'conseil' },
                { label: 'Autre', value: 'other' }
              ]
            },
            {
              _key: 'field-budget',
              fieldType: 'select',
              label: 'Budget estimé',
              placeholder: 'Quel est votre budget ?',
              required: false,
              width: 'full',
              options: [
                { label: 'Moins de 5 000€', value: 'budget-5k' },
                { label: '5 000€ - 10 000€', value: 'budget-10k' },
                { label: '10 000€ - 20 000€', value: 'budget-20k' },
                { label: '20 000€ - 50 000€', value: 'budget-50k' },
                { label: 'Plus de 50 000€', value: 'budget-50k-plus' },
                { label: 'À discuter', value: 'budget-discuss' }
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
                { label: 'Dans les 6 mois', value: '6months' },
                { label: 'Pas de contrainte', value: 'flexible' }
              ]
            },
            {
              _key: 'field-description',
              fieldType: 'textarea',
              label: 'Description détaillée',
              placeholder: 'Décrivez votre projet : objectifs, fonctionnalités souhaitées, inspirations, contraintes techniques...',
              required: true,
              width: 'full'
            },
            {
              _key: 'field-existing-site',
              fieldType: 'url',
              label: 'Site web actuel (si applicable)',
              placeholder: 'https://votre-site-actuel.com',
              required: false,
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
            title: 'Demande Envoyée avec Succès !',
            description: 'Merci pour la confiance que vous nous accordez ! Nous analysons votre projet et vous recontactons sous 24h avec une première analyse et des recommandations personnalisées.'
          },
          
          // ✅ CONFORME : contactInfo selon le schéma
          contactInfo: {
            showContactInfo: true,
            email: 'contact@votreentreprise.com',
            phone: '+33 1 23 45 67 89',
            address: '123 Avenue des Champs-Élysées\n75008 Paris, France',
            hours: 'Lundi - Vendredi : 9h00 - 18h00\nSamedi : 10h00 - 16h00\nDimanche : Fermé\n\nRéponse garantie sous 24h'
          },
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#f8fafc'
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            alignment: 'left',
            spacing: 'large'
          }
        },

        // 📝 TextBlock - FAQ Contact (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'contact-faq',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'faq-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-title-span',
                  text: '❓ Questions Fréquentes',
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
                  text: 'Combien de temps pour avoir une réponse ?',
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
                  text: 'Nous nous engageons à répondre à toute demande sous 24h maximum (hors week-ends). Pour les demandes urgentes, n\'hésitez pas à nous appeler directement.',
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
                  text: 'Le devis est-il gratuit ?',
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
                  text: 'Oui, absolument ! Nous proposons un devis détaillé et personnalisé gratuitement. Il inclut une analyse de vos besoins, nos recommandations techniques et un planning prévisionnel.',
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
                  text: 'Travaillez-vous avec des clients internationaux ?',
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
                  text: 'Oui, nous travaillons avec des clients dans toute l\'Europe et au-delà. Nous maîtrisons l\'anglais et adaptons nos horaires pour faciliter la collaboration internationale.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-q4',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-q4-span',
                  text: 'Proposez-vous un accompagnement après livraison ?',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'faq-a4',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'faq-a4-span',
                  text: 'Bien sûr ! Nous proposons différentes formules de maintenance, formation et support technique. L\'objectif est de vous rendre autonome tout en restant disponible pour les évolutions futures.',
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

        // 📊 StatsBlock - Temps de Réponse (CONFORME AU SCHÉMA)
        {
          _type: 'statsBlock',
          _key: 'contact-stats',
          title: 'Notre Réactivité en Chiffres',
          subtitle: 'Nous savons que votre temps est précieux',
          
          // ✅ CONFORME : layout selon le schéma
          layout: 'grid-3col',
          
          // ✅ CONFORME : stats array selon le schéma
          stats: [
            {
              number: '< 24h',
              label: 'Temps de Réponse',
              description: 'Première réponse garantie',
              icon: '⚡',
              featured: true
            },
            {
              number: '48h',
              label: 'Rendez-vous',
              description: 'Premier RDV sous 48h',
              icon: '🤝',
              featured: false
            },
            {
              number: '5 jours',
              label: 'Devis Détaillé',
              description: 'Proposition complète',
              icon: '📋',
              featured: false
            }
          ],
          
          // ✅ CONFORME : animationSettings selon le schéma
          animationSettings: {
            enableAnimations: true,
            triggerOffset: 50,
            animationType: 'fadeIn',
            duration: 1500,
            delay: 300,
            staggerDelay: 200,
            easing: 'easeOut'
          },
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'gradient',
            gradientSettings: {
              gradientType: 'preset',
              preset: 'pastel-blue',
              intensity: 80
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

    console.log('📝 Création du document page Contact dans Sanity...')
    const result = await client.create(contactPageData)
    
    console.log('✅ Page Contact créée avec succès:', result._id)
    
    return NextResponse.json({ 
      success: true, 
      page: result,
      message: 'Page Contact créée avec succès dans Sanity Studio - Conformité schémas respectée'
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page Contact:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: 'Vérifiez que Sanity est correctement configuré et que vous avez les permissions d\'écriture'
    }, { status: 500 })
  }
}
