import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Test de création d\'une page avec StatsBlock...')

    const testPageData = {
      _type: 'page',
      title: 'Test Statistiques',
      slug: { 
        current: 'test-stats',
        _type: 'slug'
      },
      seoTitle: 'Test - Bloc de Statistiques',
      seoDescription: 'Page de test pour vérifier le fonctionnement du bloc de statistiques.',
      
      // Page simple avec juste un StatsBlock
      pageBuilder: [
        {
          _type: 'statsBlock',
          _key: 'test-stats-block',
          title: 'Test des Statistiques',
          subtitle: 'Vérification du fonctionnement du bloc StatsBlock',
          
          layout: 'grid-3col',
          
          stats: [
            {
              _key: 'test-stat-1',
              number: '100+',
              label: 'Tests Réussis',
              description: 'Nombre de tests passés',
              icon: '✅',
              featured: false
            },
            {
              _key: 'test-stat-2',
              number: '99%',
              label: 'Fiabilité',
              description: 'Taux de succès',
              icon: '🎯',
              featured: true
            },
            {
              _key: 'test-stat-3',
              number: '24/7',
              label: 'Disponibilité',
              description: 'Service continu',
              icon: '🚀',
              featured: false
            }
          ],
          
          animationSettings: {
            enableAnimations: true,
            triggerOffset: 50,
            animationType: 'countUp',
            duration: 2000,
            staggerDelay: 200,
            delay: 200,
            easing: 'easeOutQuart'
          },
          
          backgroundSettings: {
            backgroundType: 'color',
            backgroundColor: '#ffffff'
          },
          
          styling: {
            alignment: 'center',
            spacing: 'large'
          }
        }
      ]
    }

    console.log('📝 Création du document de test...')
    const result = await client.create(testPageData)
    
    console.log('✅ Page de test créée avec succès:', result._id)
    
    return NextResponse.json({ 
      success: true, 
      page: result,
      message: 'Page de test créée avec succès. Allez sur /test-stats pour voir le résultat.',
      url: '/test-stats'
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la page de test:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 })
  }
}
