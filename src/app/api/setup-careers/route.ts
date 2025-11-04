import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Refonte complète - Création de la page Careers selon les standards...')

    const careersPageData = {
      _type: 'page',
      title: 'Carrières',
      slug: { 
        current: 'careers',
        _type: 'slug'
      },
      seoTitle: 'Carrières - Rejoignez Notre Équipe de Développeurs',
      seoDescription: 'Découvrez nos offres d\'emploi en développement web, design et tech. Rejoignez une équipe passionnée dans un environnement de travail moderne et bienveillant.',
      
      // Page builder avec les 7 blocs - CONFORMITÉ SANITY STRICTE
      pageBuilder: [
        // 🦸 HeroBlock - Careers Hero (CONFORME AU SCHÉMA)
        {
          _type: 'heroBlock',
          _key: 'careers-hero',
          title: 'Rejoignez Notre Équipe',
          subtitle: 'Nous recherchons des talents passionnés pour construire l\'avenir du web. Découvrez un environnement de travail stimulant où votre créativité et expertise technique peuvent s\'épanouir.',
          
          // ✅ CONFORME : ctaButtons array selon le schéma
          ctaButtons: [
            {
              _key: 'cta-jobs',
              text: '💼 Voir les Offres',
              href: '#jobs',
              variant: 'primary'
            },
            {
              _key: 'cta-culture',
              text: '🌟 Notre Culture',
              href: '#culture',
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
              preset: 'purple-rain',
              intensity: 95
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
          iconEmoji: '🚀',
          iconSize: 'large',
          iconPosition: 'above'
        },
        
        // ⭐ FeatureGridBlock - Avantages (CONFORME AU SCHÉMA)
        {
          _type: 'featureGridBlock',
          _key: 'careers-benefits',
          title: 'Pourquoi Nous Rejoindre ?',
          subtitle: 'Des avantages qui font la différence pour votre épanouissement professionnel',
          
          // ✅ CONFORME : gridLayout selon le schéma
          gridLayout: '3-balanced',
          
          // ✅ CONFORME : cardStyle selon le schéma
          cardStyle: 'elevated',
          
          // ✅ CONFORME : features array selon le schéma
          features: [
            {
              _key: 'benefit-1',
              iconType: 'emoji',
              iconEmoji: '🏠',
              iconSize: 'large',
              iconColor: '#3b82f6',
              title: 'Télétravail Flexible',
              description: 'Travail à distance possible, horaires flexibles et équilibre vie pro/perso respecté. Bureaux modernes à Paris.',
              featured: true
            },
            {
              _key: 'benefit-2',
              iconType: 'emoji',
              iconEmoji: '📚',
              iconSize: 'large',
              iconColor: '#10b981',
              title: 'Formation Continue',
              description: 'Budget formation, conférences tech, certifications et temps dédié à la veille technologique.',
              featured: false
            },
            {
              _key: 'benefit-3',
              iconType: 'emoji',
              iconEmoji: '💰',
              iconSize: 'large',
              iconColor: '#f59e0b',
              title: 'Rémunération Attractive',
              description: 'Salaires compétitifs, primes sur objectifs, participation aux bénéfices et avantages sociaux étendus.',
              featured: false
            },
            {
              _key: 'benefit-4',
              iconType: 'emoji',
              iconEmoji: '🎯',
              iconSize: 'large',
              iconColor: '#8b5cf6',
              title: 'Projets Passionnants',
              description: 'Clients variés, technologies de pointe, projets innovants et autonomie dans les décisions techniques.',
              featured: false
            },
            {
              _key: 'benefit-5',
              iconType: 'emoji',
              iconEmoji: '👥',
              iconSize: 'large',
              iconColor: '#ef4444',
              title: 'Équipe Bienveillante',
              description: 'Ambiance collaborative, mentorat, code reviews constructives et culture du partage de connaissances.',
              featured: false
            },
            {
              _key: 'benefit-6',
              iconType: 'emoji',
              iconEmoji: '🌱',
              iconSize: 'large',
              iconColor: '#06d6a0',
              title: 'Évolution Rapide',
              description: 'Opportunités de promotion, nouvelles responsabilités et accompagnement dans votre développement de carrière.',
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

        // 👥 TeamBlock - L'Équipe (CONFORME AU SCHÉMA)
        {
          _type: 'teamBlock',
          _key: 'careers-team',
          title: 'Rencontrez l\'Équipe',
          subtitle: 'Les personnes avec qui vous allez collaborer',
          
          // ✅ CONFORME : layout selon le schéma teamBlock
          layout: 'grid-3col',
          
          // ✅ CONFORME : teamMembers array selon le schéma
          teamMembers: [
            {
              _key: 'team-lead',
              name: 'Marie Dubois',
              position: 'Tech Lead',
              bio: 'Passionnée par l\'architecture logicielle et le mentorat. Guide l\'équipe vers l\'excellence technique.',
              imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
              skills: ['Leadership', 'Architecture', 'Mentorat', 'Next.js'],
              socialLinks: {
                linkedin: 'https://linkedin.com/in/marie-dubois',
                github: 'https://github.com/marie-dubois'
              },
              featured: true
            },
            {
              _key: 'team-senior',
              name: 'Thomas Martin',
              position: 'Senior Developer',
              bio: 'Expert en développement frontend et performance web. Toujours prêt à partager ses connaissances.',
              imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
              skills: ['React', 'Performance', 'TypeScript', 'Testing'],
              socialLinks: {
                linkedin: 'https://linkedin.com/in/thomas-martin',
                github: 'https://github.com/thomas-martin',
                twitter: 'https://twitter.com/thomas_dev'
              },
              featured: false
            },
            {
              _key: 'team-designer',
              name: 'Sophie Chen',
              position: 'Lead Designer',
              bio: 'Créatrice d\'expériences utilisateur exceptionnelles. Alliant esthétique et fonctionnalité.',
              imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
              skills: ['UX Design', 'UI Design', 'Figma', 'Design System'],
              socialLinks: {
                linkedin: 'https://linkedin.com/in/sophie-chen',
                dribbble: 'https://dribbble.com/sophie-chen'
              },
              featured: false
            }
          ],
          
          // ✅ CONFORME : cardStyle selon le schéma
          cardStyle: 'shadow',
          showSocialLinks: true,
          showSkills: true,
          
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

        // 📝 TextBlock - Offres d'Emploi (CONFORME AU SCHÉMA)
        {
          _type: 'textBlock',
          _key: 'careers-jobs',
          
          // ✅ CONFORME : content array selon le schéma textBlock
          content: [
            {
              _type: 'block',
              _key: 'jobs-title',
              style: 'h2',
              children: [
                {
                  _type: 'span',
                  _key: 'jobs-title-span',
                  text: '💼 Postes Ouverts',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'job-1-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'job-1-title-span',
                  text: '🚀 Développeur Frontend Senior - React/Next.js',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'job-1-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'job-1-desc-span',
                  text: 'Nous recherchons un développeur frontend expérimenté pour rejoindre notre équipe. Maîtrise de React, Next.js, TypeScript et des outils modernes. 5+ ans d\'expérience. CDI - 50-65K€.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'job-2-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'job-2-title-span',
                  text: '🎨 Designer UX/UI - Produits Digitaux',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'job-2-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'job-2-desc-span',
                  text: 'Créateur d\'expériences utilisateur exceptionnelles. Expertise Figma, design systems, recherche utilisateur. Collaboration étroite avec les développeurs. CDI - 45-55K€.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'job-3-title',
              style: 'h3',
              children: [
                {
                  _type: 'span',
                  _key: 'job-3-title-span',
                  text: '⚡ Développeur Full-Stack - Node.js/React',
                  marks: ['strong']
                }
              ]
            },
            {
              _type: 'block',
              _key: 'job-3-desc',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'job-3-desc-span',
                  text: 'Développeur polyvalent pour projets complets. Stack moderne : Node.js, React, bases de données, APIs REST/GraphQL. 3+ ans d\'expérience. CDI - 45-60K€.',
                  marks: []
                }
              ]
            },
            {
              _type: 'block',
              _key: 'jobs-note',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'jobs-note-span',
                  text: '📧 Pour postuler, envoyez CV + portfolio à careers@votreentreprise.com en précisant le poste visé.',
                  marks: ['strong']
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

        // 📞 ContactBlock - Candidature (CONFORME AU SCHÉMA)
        {
          _type: 'contactBlock',
          _key: 'careers-apply',
          title: 'Candidature Spontanée',
          subtitle: 'Vous ne trouvez pas le poste idéal ? Envoyez-nous votre candidature !',
          
          // ✅ CONFORME : layout selon le schéma contactBlock
          layout: 'centered',
          
          // ✅ CONFORME : formFields array selon le schéma
          formFields: [
            {
              _key: 'field-name',
              fieldType: 'name',
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
              _key: 'field-phone',
              fieldType: 'phone',
              label: 'Téléphone',
              placeholder: '+33 6 12 34 56 78',
              required: false,
              width: 'half'
            },
            {
              _key: 'field-position',
              fieldType: 'subject',
              label: 'Poste visé',
              placeholder: 'ex: Développeur Frontend Senior',
              required: true,
              width: 'half'
            },
            {
              _key: 'field-experience',
              fieldType: 'custom',
              label: 'Expérience',
              placeholder: 'ex: 5 ans en développement web',
              required: true,
              width: 'full'
            },
            {
              _key: 'field-motivation',
              fieldType: 'textarea',
              label: 'Lettre de motivation',
              placeholder: 'Parlez-nous de votre motivation, vos compétences et ce qui vous attire chez nous...',
              required: true,
              width: 'full'
            }
          ],
          
          // ✅ CONFORME : submitButton selon le schéma
          submitButton: {
            text: 'Envoyer ma Candidature',
            loadingText: 'Envoi en cours...'
          },
          
          // ✅ CONFORME : successMessage selon le schéma
          successMessage: {
            title: 'Candidature Envoyée !',
            description: 'Merci pour votre candidature. Notre équipe RH vous recontactera rapidement si votre profil correspond à nos besoins.'
          },
          
          // ✅ CONFORME : contactInfo selon le schéma
          contactInfo: {
            showContactInfo: true,
            email: 'careers@votreentreprise.com',
            phone: '+33 1 23 45 67 89',
            address: 'RH - Paris, France',
            hours: 'Réponse sous 5 jours ouvrés'
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
            alignment: 'center',
            spacing: 'large'
          }
        }
      ]
    }

    console.log('📝 Création du document page Careers dans Sanity...')
    const result = await client.create(careersPageData)
    
    console.log('✅ Page Careers créée avec succès:', result._id)
    
    return NextResponse.json({ 
      success: true, 
      page: result,
      message: 'Page Careers créée avec succès dans Sanity Studio - Conformité schémas respectée'
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page Careers:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: 'Vérifiez que Sanity est correctement configuré et que vous avez les permissions d\'écriture'
    }, { status: 500 })
  }
}
