import type { Metadata } from "next";
import "../../styles/brand.css";
import "../globals.css";
import { client } from '@/sanity/lib/client'
import { headerSettingsQuery, footerSettingsQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import DemoNavigation from '@/components/DemoNavigation'
import { ThemeProvider } from '@/contexts/ThemeContext'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Mon Site - Boilerplate Sanity + Next.js',
    template: '%s | Mon Site',
  },
  description: 'Site web moderne et performant construit avec Sanity CMS et Next.js. Architecture par blocs, SEO optimisé et mode preview intégré.',
  keywords: ['Next.js', 'Sanity', 'CMS', 'React', 'TypeScript', 'SEO', 'Performance'],
  authors: [{ name: 'Votre Nom' }],
  creator: 'Votre Nom',
  publisher: 'Votre Entreprise',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Mon Site - Boilerplate Sanity + Next.js',
    description: 'Site web moderne et performant construit avec Sanity CMS et Next.js. Architecture par blocs, SEO optimisé et mode preview intégré.',
    url: '/',
    siteName: 'Mon Site',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mon Site - Boilerplate Sanity + Next.js',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mon Site - Boilerplate Sanity + Next.js',
    description: 'Site web moderne et performant construit avec Sanity CMS et Next.js.',
    creator: '@votre_twitter',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    // yandex: process.env.YANDEX_VERIFICATION,
    // bing: process.env.BING_VERIFICATION,
  },
  alternates: {
    canonical: '/',
  },
};

// Configuration ISR pour le layout (header/footer)
export const revalidate = 300 // 5 minutes pour les settings globaux

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Récupérer les paramètres du header et footer
  let headerSettings = await client.fetch(headerSettingsQuery)
  let footerSettings = await client.fetch(footerSettingsQuery)
  
  // Si les paramètres n'existent pas, utiliser des valeurs par défaut
  if (!headerSettings) {
    console.log('⚠️ Paramètres header manquants - utilisation des valeurs par défaut')
    headerSettings = {
      logoType: 'text',
      logoText: 'Sanity Boilerplate',
      navigationMenu: [
        { title: 'Accueil', link: '/' },
        { title: 'Démonstration', link: '/demo' },
        { title: 'Studio', link: '/studio' }
      ],
      cta: { text: '🎨 Studio', link: '/studio' },
      backgroundColor: '#ffffff',
      textColor: '#2d3748'
    }
  }
  
  if (!footerSettings) {
    console.log('⚠️ Paramètres footer manquants - utilisation des valeurs par défaut')
    footerSettings = {
      text: 'Solution professionnelle Next.js + Sanity CMS prête à l\'emploi pour créer des sites web modernes et performants.',
      columns: [
        {
          title: 'Navigation',
          links: [
            { title: 'Accueil', link: '/' },
            { title: 'Démonstration', link: '/demo' },
            { title: 'Studio Sanity', link: '/studio' },
            { title: 'Administration', link: '/admin/home' }
          ]
        },
        {
          title: 'Technologies',
          links: [
            { title: 'Next.js 16', link: 'https://nextjs.org' },
            { title: 'Sanity CMS', link: 'https://sanity.io' },
            { title: 'TypeScript', link: 'https://typescriptlang.org' },
            { title: 'CSS Modules', link: '#' }
          ]
        }
      ],
      copyrightText: 'Sanity Boilerplate. Conçu pour les développeurs modernes.',
      backgroundColor: '#f8fafc',
      textColor: '#4a5568'
    }
  }
  
  // Debug
  console.log('🔍 Header Settings:', headerSettings ? '✅ Configuré' : '❌ Manquant')
  console.log('🔍 Footer Settings:', footerSettings ? '✅ Configuré' : '❌ Manquant')
  
  return (
    <ThemeProvider defaultTheme="auto" storageKey="site-theme">
      <Header
        logoType={headerSettings?.logoType}
        logo={headerSettings?.logo}
        logoText={headerSettings?.logoText}
        navigationMenu={headerSettings?.navigationMenu}
        headerCta={headerSettings?.cta}
        headerBackgroundColor={headerSettings?.backgroundColor}
        headerTextColor={headerSettings?.textColor}
      />
      {children}
      <DemoNavigation />
      <Footer
        footerText={footerSettings?.text}
        footerColumns={footerSettings?.columns}
        copyrightText={footerSettings?.copyrightText}
        socialLinks={footerSettings?.socialLinks}
        footerBackgroundColor={footerSettings?.backgroundColor}
        footerTextColor={footerSettings?.textColor}
      />
    </ThemeProvider>
  );
}
