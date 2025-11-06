import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: Request) {
  try {
    const { style = 'default' } = await request.json()

    // Vérifier si un footer existe déjà
    const existingFooter = await client.fetch(
      `*[_type == "footerSettings"][0]{ _id }`
    )

    const footerData = {
      _type: 'footerSettings',
      columns: [
        {
          _key: `col-${Date.now()}-0`,
          title: 'Produit',
          links: [
            {
              _key: `link-${Date.now()}-0-0`,
              label: 'Fonctionnalités',
              href: '/features',
            },
            {
              _key: `link-${Date.now()}-0-1`,
              label: 'Tarifs',
              href: '/pricing',
            },
            {
              _key: `link-${Date.now()}-0-2`,
              label: 'Documentation',
              href: '/docs',
            },
          ],
        },
        {
          _key: `col-${Date.now()}-1`,
          title: 'Entreprise',
          links: [
            {
              _key: `link-${Date.now()}-1-0`,
              label: 'À Propos',
              href: '/about',
            },
            {
              _key: `link-${Date.now()}-1-1`,
              label: 'Blog',
              href: '/blog',
            },
            {
              _key: `link-${Date.now()}-1-2`,
              label: 'Carrières',
              href: '/careers',
            },
          ],
        },
        {
          _key: `col-${Date.now()}-2`,
          title: 'Support',
          links: [
            {
              _key: `link-${Date.now()}-2-0`,
              label: 'Contact',
              href: '/contact',
            },
            {
              _key: `link-${Date.now()}-2-1`,
              label: 'FAQ',
              href: '/faq',
            },
            {
              _key: `link-${Date.now()}-2-2`,
              label: 'Aide',
              href: '/help',
            },
          ],
        },
        {
          _key: `col-${Date.now()}-3`,
          title: 'Légal',
          links: [
            {
              _key: `link-${Date.now()}-3-0`,
              label: 'Mentions Légales',
              href: '/legal',
            },
            {
              _key: `link-${Date.now()}-3-1`,
              label: 'Confidentialité',
              href: '/privacy',
            },
            {
              _key: `link-${Date.now()}-3-2`,
              label: 'CGU',
              href: '/terms',
            },
          ],
        },
      ],
      socialLinks: [
        {
          _key: `social-${Date.now()}-0`,
          platform: 'twitter',
          url: 'https://twitter.com',
        },
        {
          _key: `social-${Date.now()}-1`,
          platform: 'linkedin',
          url: 'https://linkedin.com',
        },
        {
          _key: `social-${Date.now()}-2`,
          platform: 'github',
          url: 'https://github.com',
        },
      ],
      copyright: `© ${new Date().getFullYear()} Sanity Boilerplate. Tous droits réservés.`,
      showNewsletter: true,
      newsletterTitle: 'Restez informé',
      newsletterDescription: 'Recevez nos dernières actualités et mises à jour.',
    }

    let result
    if (existingFooter) {
      // Mettre à jour
      result = await client
        .patch(existingFooter._id)
        .set(footerData)
        .commit()
    } else {
      // Créer
      result = await client.create({
        ...footerData,
        _id: 'footerSettings',
      })
    }

    return NextResponse.json({
      success: true,
      message: existingFooter ? 'Footer mis à jour' : 'Footer créé',
      data: result,
    })
  } catch (error) {
    console.error('Erreur lors de la création du footer:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 500 }
    )
  }
}
