import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Refonte complète - Création de la page À Propos selon les standards...')

    const aboutPageData = {
      _type: 'page',
      title: 'À Propos',
      slug: { 
        current: 'a-propos',
        _type: 'slug'
      },
      seoTitle: 'À Propos - Notre Équipe et Expertise Technique',
      seoDescription: 'Découvrez notre équipe passionnée, notre mission et notre expertise en développement web. Plus de 5 ans d\'expérience dans la création de solutions digitales innovantes.',
      
      // Page builder avec les 7 blocs - CONFORMITÉ SANITY STRICTE
      pageBuilder: [
        // 🦸 HeroBlock - About Hero (CONFORME AU SCHÉMA)
        {
          _type: 'heroBlock',
          _key: 'about-hero',
          title: 'Notre Histoire',
          subtitle: 'Une équipe passionnée par la technologie et l\'innovation. Depuis 2019, nous créons des expériences web exceptionnelles qui transforment les idées en réalité digitale.',
          
          // ✅ CONFORME : ctaButtons array selon le schéma
          ctaButtons: [
            {
              text: '👥 Rencontrer l\'Équipe',
              href: '#team',
              variant: 'primary'
            },
            {
              text: '💬 Nous Contacter',
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
              preset: 'blue-purple',
              intensity: 90
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
          iconEmoji: '👥',
          iconSize: 'large',
          iconPosition: 'above'
        },

        // ⭐ FeatureGridBlock - Nos Valeurs (CONFORME AU SCHÉMA)
        {
          _type: 'featureGridBlock',
          _key: 'about-values',
          title: 'Nos Valeurs',
          subtitle: 'Les principes qui guident notre travail au quotidien',
          
          // ✅ CONFORME : gridLayout selon le schéma
          gridLayout: '3-balanced',
          
          // ✅ CONFORME : cardStyle selon le schéma
          cardStyle: 'shadow',
          
          // ✅ CONFORME : features array selon le schéma
          features: [
            {
              iconType: 'emoji',
              iconEmoji: '⭐',
              iconSize: 'large',
              iconColor: '#f59e0b',
              title: 'Excellence Technique',
              description: 'Nous utilisons les dernières technologies et meilleures pratiques pour livrer des solutions de qualité supérieure.',
              featured: true
            },
            {
              iconType: 'emoji',
              iconEmoji: '🚀',
              iconSize: 'large',
              iconColor: '#3b82f6',
              title: 'Innovation Continue',
              description: 'Toujours à l\'affût des nouvelles tendances, nous proposons des solutions créatives et avant-gardistes.',
              featured: false
            },
            {
              iconType: 'emoji',
              iconEmoji: '🤝',
              iconSize: 'large',
              iconColor: '#10b981',
              title: 'Partenariat Durable',
              description: 'Nous construisons des relations de confiance à long terme avec nos clients, basées sur la transparence.',
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

        // 👥 TeamBlock - Notre Équipe (CONFORME AU SCHÉMA)
        {
          _type: 'teamBlock',
          _key: 'about-team',
          title: 'Notre Équipe',
          subtitle: 'Des experts passionnés qui donnent vie à vos projets',
          
          // ✅ CONFORME : blockType selon le schéma
          blockType: 'team',
          
          // ✅ CONFORME : layout selon le schéma
          layout: 'grid',
          
          // ✅ CONFORME : teamMembers array selon le schéma
          teamMembers: [
            {
              _key: 'member-ceo',
              name: 'Alexandre Martin',
              position: 'CEO & Lead Developer',
              bio: 'Passionné par le développement web depuis plus de 8 ans. Expert en React, Node.js et architectures cloud. Ancien lead developer chez une startup parisienne.',
              skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Leadership'],
              socialLinks: {
                linkedin: 'https://linkedin.com/in/alexandre-martin',
                github: 'https://github.com/alexandre-martin',
                website: 'https://alexandre-martin.dev'
              },
              featured: true,
              order: 1
            },
            {
              _key: 'member-cto',
              name: 'Sophie Dubois',
              position: 'CTO & UX Designer',
              bio: 'Designer UX/UI avec 6 ans d\'expérience. Spécialisée dans la création d\'interfaces intuitives et l\'optimisation de l\'expérience utilisateur.',
              skills: ['UX Design', 'Figma', 'Prototyping', 'User Research', 'Accessibility'],
              socialLinks: {
                linkedin: 'https://linkedin.com/in/sophie-dubois',
                website: 'https://sophie-dubois.design'
              },
              featured: false,
              order: 2
            },
            {
              _key: 'member-dev',
              name: 'Thomas Leroy',
              position: 'Full Stack Developer',
              bio: 'Développeur full-stack polyvalent, expert en JavaScript moderne et bases de données. Passionné par l\'optimisation des performances et la scalabilité.',
              skills: ['Vue.js', 'Python', 'PostgreSQL', 'Docker', 'DevOps'],
              socialLinks: {
                linkedin: 'https://linkedin.com/in/thomas-leroy',
                github: 'https://github.com/thomas-leroy'
              },
              featured: false,
              order: 3
            }
          ],
          
          // ✅ CONFORME : gridSettings selon le schéma
          gridSettings: {
            columns: {
              desktop: 3,
              tablet: 2,
              mobile: 1
            },
            gap: 'large',
            aspectRatio: 'square'
          },
          
          // ✅ CONFORME : cardSettings selon le schéma
          cardSettings: {
            style: 'shadow',
            showPhoto: true,
            showBio: true,
            showSkills: true,
            showSocialLinks: true,
            photoStyle: 'circle'
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

        // 📊 StatsBlock - Nos Chiffres (CONFORME AU SCHÉMA)
        {
          _type: 'statsBlock',
          _key: 'about-stats',
          title: 'Nos Réalisations en Chiffres',
          subtitle: 'La confiance de nos clients se mesure en résultats concrets',
          
          // ✅ CONFORME : layout selon le schéma
          layout: 'grid-4col',
          
          // ✅ CONFORME : stats array selon le schéma
          features: [
            {
              iconType: 'emoji',
              icon: '🚀',
              title: 'Innovation',
              description: 'Nous adoptons les dernières technologies pour créer des solutions avant-gardistes.',
              featured: false
            },
            {
              iconType: 'emoji',
              icon: '⭐',
              title: 'Qualité',
              description: 'Chaque projet est développé selon les plus hauts standards de qualité.',
              featured: true
            },
            {
              iconType: 'emoji',
              icon: '🤝',
              title: 'Support',
              description: 'Un accompagnement personnalisé tout au long de votre projet.',
              featured: false
            }
          ],
          
          // ✅ CONFORME : stats array selon le schéma
          stats: [
            {
              _key: 'stat-experience',
              number: '5+',
              label: 'Années d\'Expérience',
              description: 'Dans le développement web',
              icon: '📅',
              featured: false
            },
            {
              _key: 'stat-projects',
              number: '120+',
              label: 'Projets Réalisés',
              description: 'Sites et applications livrés',
              icon: '🚀',
              featured: true
            },
            {
              _key: 'stat-clients',
              number: '95%',
              label: 'Clients Satisfaits',
              description: 'Taux de satisfaction client',
              icon: '😊',
              featured: false
            },
            {
              _key: 'stat-support',
              number: '24h',
              label: 'Temps de Réponse',
              description: 'Support technique moyen',
              icon: '⚡',
              featured: false
            }
          ],
          
          // ✅ CONFORME : animationSettings selon le schéma
          animationSettings: {
            enableAnimations: true,
            triggerOffset: 50,
            animationType: 'countUp',
            duration: 2000,
            delay: 200,
            staggerDelay: 150,
            easing: 'easeOutQuart'
          },
          
          // ✅ CONFORME : backgroundSettings selon themeFields
          backgroundSettings: {
            backgroundType: 'gradient',
            gradientSettings: {
              gradientType: 'preset',
              preset: 'ocean',
              intensity: 85
            }
          },
          
          // ✅ CONFORME : styling selon themeFields
          styling: {
            alignment: 'center',
            spacing: 'large'
          }
        },

        // 📝 TextBlock - Notre Mission (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'about-mission',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'mission-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'mission-title-span',
                  text: '🎯 Notre Mission',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'mission-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'mission-desc-span',
                  text: 'Nous croyons que chaque entreprise mérite une présence digitale exceptionnelle. Notre mission est de démocratiser l\'accès aux technologies web avancées en proposant des solutions sur mesure, performantes et évolutives.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'approach-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'approach-title-span',
                  text: 'Notre Approche',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'approach-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'approach-desc-span',
                  text: 'Nous adoptons une approche collaborative et agile. Chaque projet commence par une phase d\'écoute approfondie pour comprendre vos besoins spécifiques. Nous privilégions la transparence, la communication régulière et l\'itération continue pour garantir votre satisfaction.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'expertise-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'expertise-title-span',
                  text: 'Notre Expertise',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'expertise-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'expertise-desc-span',
                  text: 'Spécialisés dans les technologies JavaScript modernes (React, Next.js, Node.js), nous maîtrisons également les architectures cloud, l\'optimisation SEO et l\'accessibilité web. Notre stack technique évolue constamment pour rester à la pointe de l\'innovation.',
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

        // 📞 ContactBlock - Rejoignez-nous (CONFORME AU SCHÉMA)
        {
          _type: 'contactBlock',
          _key: 'about-contact',
          title: 'Travaillons Ensemble',
          subtitle: 'Prêt à donner vie à votre projet ? Parlons de vos ambitions digitales.',
          
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
              label: 'Email professionnel',
              placeholder: 'votre@entreprise.com',
              required: true,
              width: 'half'
            },
            {
              _key: 'field-company',
              fieldType: 'text',
              label: 'Entreprise',
              placeholder: 'Nom de votre entreprise',
              required: false,
              width: 'full'
            },
            {
              _key: 'field-project',
              fieldType: 'textarea',
              label: 'Votre projet',
              placeholder: 'Décrivez-nous votre projet, vos objectifs et vos attentes...',
              required: true,
              width: 'full'
            }
          ],
          
          // ✅ CONFORME : submitButton selon le schéma
          submitButton: {
            text: 'Démarrer le Projet',
            loadingText: 'Envoi en cours...'
          },
          
          // ✅ CONFORME : successMessage selon le schéma
          successMessage: {
            title: 'Message Reçu !',
            description: 'Merci pour votre confiance ! Nous étudions votre projet et vous recontactons sous 24h avec une première analyse.'
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
              intensity: 88
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

    console.log('📝 Création du document page À Propos dans Sanity...')
    const result = await client.create(aboutPageData)
    
    console.log('✅ Page À Propos créée avec succès:', result._id)
    
    return NextResponse.json({ 
      success: true, 
      page: result,
      message: 'Page À Propos créée avec succès dans Sanity Studio - Conformité schémas respectée'
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page À Propos:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: 'Vérifiez que Sanity est correctement configuré et que vous avez les permissions d\'écriture'
    }, { status: 500 })
  }
}
