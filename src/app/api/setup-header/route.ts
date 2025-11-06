import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: Request) {
  try {
    const { style = 'default' } = await request.json()

    // Vérifier si un header existe déjà
    const existingHeader = await client.fetch(
      `*[_type == "headerSettings"][0]{ _id }`
    )

    const headerData = {
      _type: 'headerSettings',
      logo: {
        text: 'Sanity Boilerplate',
        showIcon: true,
      },
      navigation: [
        {
          _key: `nav-${Date.now()}-0`,
          label: 'Accueil',
          href: '/',
        },
        {
          _key: `nav-${Date.now()}-1`,
          label: 'Services',
          href: '/services',
        },
        {
          _key: `nav-${Date.now()}-2`,
          label: 'À Propos',
          href: '/about',
        },
        {
          _key: `nav-${Date.now()}-3`,
          label: 'Contact',
          href: '/contact',
        },
      ],
      ctaButton: {
        text: 'Commencer',
        href: '/contact',
        variant: 'primary',
      },
      sticky: true,
      transparent: false,
    }

    let result
    if (existingHeader) {
      // Mettre à jour
      result = await client
        .patch(existingHeader._id)
        .set(headerData)
        .commit()
    } else {
      // Créer
      result = await client.create({
        ...headerData,
        _id: 'headerSettings',
      })
    }

    return NextResponse.json({
      success: true,
      message: existingHeader ? 'Header mis à jour' : 'Header créé',
      data: result,
    })
  } catch (error) {
    console.error('Erreur lors de la création du header:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 500 }
    )
  }
}
