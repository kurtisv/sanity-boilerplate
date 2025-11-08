import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route pour l'initialisation automatique du site
 * 
 * GET /api/init-site - Vérifie si le site est initialisé
 * POST /api/init-site - Lance l'initialisation automatique
 */

export async function GET(request: NextRequest) {
  try {
    const { isFirstInit } = require('../../../../agents/initAgent')
    const { loadEnv } = require('../../../../agents/core/env')
    const { createClient } = require('@sanity/client')
    
    const env = loadEnv()
    if (!env.ok) {
      return NextResponse.json(
        { initialized: false, error: 'Missing env vars' },
        { status: 500 }
      )
    }
    
    const client = createClient({
      projectId: env.projectId,
      dataset: env.dataset,
      apiVersion: env.apiVersion,
      token: env.token,
      useCdn: false,
    })
    
    const isFirst = await isFirstInit(client)
    
    return NextResponse.json({
      initialized: !isFirst,
      needsInit: isFirst,
      message: isFirst 
        ? 'Site non initialisé - génération automatique disponible'
        : 'Site déjà initialisé'
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { run } = require('../../../../agents/initAgent')
    
    console.log('\n🎬 Démarrage de l\'initialisation automatique du site...')
    
    const config = {
      siteName: body.siteName || 'Mon Site',
      primaryColor: body.primaryColor || '#3b82f6',
      designStyle: body.designStyle || 'modern',
      email: body.email || 'contact@site.com',
      phone: body.phone || '+1 (000) 000-0000'
    }
    
    const result = await run({ config, force: body.force || false })
    
    if (result.ok) {
      return NextResponse.json({
        success: true,
        message: 'Site initialisé avec succès',
        contextId: result.contextId,
        results: result.results,
        duration: result.duration
      })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error,
          message: result.message 
        },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Erreur lors de l\'initialisation:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
