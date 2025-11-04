import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Création simple de la page Contact...')

    const contactPageData = {
      _type: 'page',
      title: 'Contact',
      slug: { 
        current: 'contact',
        _type: 'slug' 
      },
      seoTitle: 'Contact - Nous Contacter',
      seoDescription: 'Contactez notre équipe pour discuter de votre projet. Formulaire de contact et coordonnées disponibles.',
      pageBuilder: [
        // 🦸 HeroBlock simple
        {
          _type: 'heroBlock',
          _key: 'contact-hero',
          title: 'Contactez-Nous',
          subtitle: 'Prêt à donner vie à votre projet digital ? Notre équipe est là pour vous accompagner.',
          
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
          
          layout: 'centered',
          
          heroSettings: {
            height: 'medium',
            alignment: 'center',
            showScrollIndicator: false
          },
          
          backgroundSettings: {
            type: 'gradient',
            gradientPreset: 'blue-purple'
          },
          
          styling: {
            textColor: 'white',
            alignment: 'center',
            spacing: 'large'
          }
        },

        // 📞 ContactBlock simple
        {
          _type: 'contactBlock',
          _key: 'contact-form',
          title: 'Envoyez-nous un message',
          subtitle: 'Nous vous répondrons dans les plus brefs délais',
          
          layout: 'two-columns',
          
          formFields: [
            {
              fieldType: 'name',
              label: 'Nom complet',
              placeholder: 'Votre nom et prénom',
              required: true,
              width: 'full'
            },
            {
              fieldType: 'email',
              label: 'Adresse email',
              placeholder: 'votre@email.com',
              required: true,
              width: 'full'
            },
            {
              fieldType: 'subject',
              label: 'Sujet',
              placeholder: 'Objet de votre message',
              required: false,
              width: 'full'
            },
            {
              fieldType: 'message',
              label: 'Message',
              placeholder: 'Décrivez votre demande...',
              required: true,
              width: 'full'
            }
          ],
          
          formSettings: {
            submitText: 'Envoyer le message',
            successMessage: 'Merci ! Votre message a été envoyé avec succès.',
            redirectUrl: '/merci'
          },
          
          contactInfo: {
            showContactInfo: true,
            address: '123 Rue de la Tech, 75001 Paris',
            phone: '+33 1 23 45 67 89',
            email: 'contact@votresite.com',
            hours: 'Lun-Ven: 9h-18h'
          },
          
          styling: {
            backgroundColor: 'white',
            textColor: 'dark',
            alignment: 'left',
            spacing: 'medium',
            cardStyle: 'shadow'
          }
        }
      ]
    }

    // Créer la page dans Sanity
    const result = await client.create(contactPageData)
    
    console.log('✅ Page Contact créée avec succès:', result._id)

    return NextResponse.json({
      success: true,
      message: 'Page Contact créée avec succès',
      pageId: result._id,
      slug: 'contact'
    })

  } catch (error) {
    console.error('❌ Erreur lors de la création de la page Contact:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création de la page Contact', 
        details: error instanceof Error ? error.message : 'Erreur inconnue' 
      },
      { status: 500 }
    )
  }
}
