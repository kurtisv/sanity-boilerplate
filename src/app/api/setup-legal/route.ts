import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Refonte complète - Création de la page Mentions Légales selon les standards...')

    const legalPageData = {
      _type: 'page',
      title: 'Mentions Légales',
      slug: { 
        current: 'mentions-legales',
        _type: 'slug'
      },
      seoTitle: 'Mentions Légales - Informations Légales et RGPD',
      seoDescription: 'Mentions légales, politique de confidentialité, conditions d\'utilisation et informations RGPD de notre site web et services.',
      
      // Page builder avec les 7 blocs - CONFORMITÉ SANITY STRICTE
      pageBuilder: [
        // 🦸 HeroBlock - Legal Hero (CONFORME AU SCHÉMA)
        {
          _type: 'heroBlock',
          _key: 'legal-hero',
          title: 'Mentions Légales',
          subtitle: 'Informations légales, politique de confidentialité et conditions d\'utilisation de nos services. Transparence et conformité RGPD.',
          
          // ✅ CONFORME : ctaButtons array selon le schéma
          ctaButtons: [
            {
              _key: 'cta-contact',
              text: '📧 Nous Contacter',
              href: '/contact',
              variant: 'primary'
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
              preset: 'dark-purple',
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
          iconEmoji: '⚖️',
          iconSize: 'large',
          iconPosition: 'above'
        },

        // 📝 TextBlock - Informations Légales (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'legal-info',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'legal-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'legal-title-span',
                  text: '🏢 Informations Légales',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'legal-company',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'legal-company-span',
                  text: 'Éditeur du Site',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'legal-company-info',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'legal-company-info-span',
                  text: 'Raison sociale : [VOTRE ENTREPRISE]\nForme juridique : [SARL/SAS/Auto-entrepreneur]\nCapital social : [MONTANT]\nSIRET : [NUMÉRO SIRET]\nRCS : [VILLE D\'IMMATRICULATION]\nAdresse : [ADRESSE COMPLÈTE]\nTéléphone : [NUMÉRO]\nEmail : contact@votreentreprise.com',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'legal-hosting',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'legal-hosting-span',
                  text: 'Hébergement',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'legal-hosting-info',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'legal-hosting-info-span',
                  text: 'Ce site est hébergé par Vercel Inc.\nAdresse : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis\nSite web : https://vercel.com',
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

        // 📝 TextBlock - RGPD (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'legal-rgpd',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'rgpd-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'rgpd-title-span',
                  text: '🔒 Politique de Confidentialité (RGPD)',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'rgpd-data-collection',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'rgpd-data-collection-span',
                  text: 'Collecte des Données',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'rgpd-data-collection-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'rgpd-data-collection-desc-span',
                  text: 'Nous collectons uniquement les données nécessaires au fonctionnement de nos services : nom, email, messages via formulaires de contact. Aucune donnée n\'est collectée sans votre consentement explicite.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'rgpd-usage',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'rgpd-usage-span',
                  text: 'Utilisation des Données',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'rgpd-usage-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'rgpd-usage-desc-span',
                  text: 'Vos données sont utilisées exclusivement pour répondre à vos demandes et améliorer nos services. Elles ne sont jamais vendues ou partagées avec des tiers sans votre autorisation.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'rgpd-rights',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'rgpd-rights-span',
                  text: 'Vos Droits',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'rgpd-rights-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'rgpd-rights-desc-span',
                  text: 'Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification, d\'effacement et de portabilité de vos données. Contactez-nous à privacy@votreentreprise.com pour exercer ces droits.',
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

        // 📝 TextBlock - Conditions d'Utilisation (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'legal-terms',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'terms-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'terms-title-span',
                  text: '📋 Conditions d\'Utilisation',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'terms-access',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'terms-access-span',
                  text: 'Accès au Site',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'terms-access-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'terms-access-desc-span',
                  text: 'L\'accès à ce site est gratuit. Nous nous réservons le droit de suspendre temporairement l\'accès pour maintenance ou mise à jour.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'terms-content',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'terms-content-span',
                  text: 'Propriété Intellectuelle',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'terms-content-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'terms-content-desc-span',
                  text: 'Tous les contenus de ce site (textes, images, logos, code) sont protégés par le droit d\'auteur. Toute reproduction sans autorisation est interdite.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'terms-liability',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'terms-liability-span',
                  text: 'Limitation de Responsabilité',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'terms-liability-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'terms-liability-desc-span',
                  text: 'Nous mettons tout en œuvre pour fournir des informations exactes, mais ne pouvons garantir l\'absence d\'erreurs. Notre responsabilité est limitée aux prestations directement fournies.',
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

        // 📝 TextBlock - Cookies (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'legal-cookies',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'cookies-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'cookies-title-span',
                  text: '🍪 Politique des Cookies',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'cookies-usage',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'cookies-usage-span',
                  text: 'Utilisation des Cookies',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'cookies-usage-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'cookies-usage-desc-span',
                  text: 'Ce site utilise des cookies techniques nécessaires au fonctionnement (session, préférences). Aucun cookie de tracking ou publicitaire n\'est utilisé sans votre consentement.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'cookies-types',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'cookies-types-span',
                  text: 'Types de Cookies',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'cookies-types-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'cookies-types-desc-span',
                  text: '• Cookies techniques : Nécessaires au fonctionnement du site\n• Cookies de préférences : Mémorisation de vos choix\n• Cookies analytiques : Statistiques anonymes (avec consentement)\n• Cookies marketing : Publicité ciblée (avec consentement)',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'cookies-control',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'cookies-control-span',
                  text: 'Contrôle des Cookies',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'cookies-control-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'cookies-control-desc-span',
                  text: 'Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur ou notre bandeau de consentement. La désactivation de certains cookies peut affecter le fonctionnement du site.',
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

        // 📞 ContactBlock - Contact Légal (CONFORME AU SCHÉMA)
        {
          _type: 'contactBlock',
          _key: 'legal-contact',
          title: 'Questions Légales ?',
          subtitle: 'Pour toute question concernant ces mentions légales ou vos données personnelles',
          
          // ✅ CONFORME : layout selon le schéma contactBlock
          layout: 'with-sidebar',
          
          // ✅ CONFORME : formFields array selon le schéma
          formFields: [
            {
              _key: 'field-name',
              fieldType: 'name',
              label: 'Nom complet',
              placeholder: 'Votre nom et prénom',
              required: true,
              width: 'full'
            },
            {
              _key: 'field-email',
              fieldType: 'email',
              label: 'Email',
              placeholder: 'votre@email.com',
              required: true,
              width: 'full'
            },
            {
              _key: 'field-subject',
              fieldType: 'select',
              label: 'Sujet',
              placeholder: 'Sélectionnez un sujet',
              required: true,
              width: 'full',
              options: [
                { label: 'Question sur les données personnelles', value: 'rgpd' },
                { label: 'Exercice des droits RGPD', value: 'droits' },
                { label: 'Question sur les cookies', value: 'cookies' },
                { label: 'Propriété intellectuelle', value: 'copyright' },
                { label: 'Autre question légale', value: 'other' }
              ]
            },
            {
              _key: 'field-message',
              fieldType: 'textarea',
              label: 'Message',
              placeholder: 'Décrivez votre question ou demande...',
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
            title: 'Message Envoyé !',
            description: 'Nous avons bien reçu votre question. Notre équipe vous répondra sous 48h maximum.'
          },
          
          // ✅ CONFORME : contactInfo selon le schéma
          contactInfo: {
            showContactInfo: true,
            email: 'legal@votreentreprise.com',
            phone: '+33 1 23 45 67 89',
            address: 'Service Juridique\nParis, France',
            hours: 'Lun-Ven 9h-17h\nRéponse sous 48h'
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

    console.log('📝 Création du document page Mentions Légales dans Sanity...')
    const result = await client.create(legalPageData)
    
    console.log('✅ Page Mentions Légales créée avec succès:', result._id)
    
    return NextResponse.json({ 
      success: true, 
      page: result,
      message: 'Page Mentions Légales créée avec succès dans Sanity Studio - Conformité schémas respectée'
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page Mentions Légales:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: 'Vérifiez que Sanity est correctement configuré et que vous avez les permissions d\'écriture'
    }, { status: 500 })
  }
}
