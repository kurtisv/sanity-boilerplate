import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Type pour le payload du webhook Sanity
type WebhookPayload = {
  _type: string
  slug?: {
    current: string
  }
  _id: string
}

export async function POST(request: NextRequest) {
  try {
    // Vérification du secret pour sécuriser le webhook
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('SANITY_WEBHOOK_SECRET not configured')
      return NextResponse.json(
        { message: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    // Vérification du secret dans les headers
    const signature = request.headers.get('sanity-webhook-signature')
    if (!signature) {
      return NextResponse.json(
        { message: 'Missing signature' },
        { status: 401 }
      )
    }

    // Parse du body avec vérification de signature
    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      request,
      webhookSecret
    )

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 401 }
      )
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: 'Bad Request: Missing _type' },
        { status: 400 }
      )
    }

    // Revalidation selon le type de document
    switch (body._type) {
      case 'page':
        // Revalider la page spécifique
        if (body.slug?.current) {
          const slug = body.slug.current === 'home' ? '/' : `/${body.slug.current}`
          revalidatePath(slug)
          console.log(`Revalidated page: ${slug}`)
        }
        
        // Revalider aussi le sitemap car une nouvelle page peut avoir été ajoutée
        revalidatePath('/sitemap.xml')
        break

      case 'headerSettings':
        // Revalider toutes les pages car le header est global
        revalidatePath('/', 'layout')
        console.log('Revalidated all pages (header settings changed)')
        break

      case 'footerSettings':
        // Revalider toutes les pages car le footer est global
        revalidatePath('/', 'layout')
        console.log('Revalidated all pages (footer settings changed)')
        break

      default:
        // Pour les autres types (blocs, etc.), revalider toutes les pages par sécurité
        revalidatePath('/', 'layout')
        console.log(`Revalidated all pages (${body._type} changed)`)
    }

    return NextResponse.json({
      message: 'Revalidation successful',
      type: body._type,
      id: body._id,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { 
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Méthode GET pour tester le endpoint
export async function GET() {
  return NextResponse.json({
    message: 'Revalidation endpoint is working',
    timestamp: new Date().toISOString(),
    note: 'Use POST with Sanity webhook payload to trigger revalidation'
  })
}
