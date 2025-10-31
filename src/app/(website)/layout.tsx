import type { Metadata } from "next";
import "../../styles/brand.css";
import "../globals.css";
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery, headerSettingsQuery, footerSettingsQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Mon Site',
    template: '%s | Mon Site',
  },
  description: 'Site web dynamique avec Sanity + Next.js',
  openGraph: {
    type: 'website',
    title: 'Mon Site',
    description: 'Site web dynamique avec Sanity + Next.js',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mon Site',
    description: 'Site web dynamique avec Sanity + Next.js',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Essayer d'abord siteSettings unifié
  let siteSettings = await client.fetch(siteSettingsQuery)
  
  // Fallback vers les anciennes requêtes si siteSettings est vide
  let headerSettings = null
  let footerSettings = null
  
  if (!siteSettings) {
    headerSettings = await client.fetch(headerSettingsQuery)
    footerSettings = await client.fetch(footerSettingsQuery)
  }
  
  // Debug temporaire
  console.log('🔍 DEBUG - siteSettings:', siteSettings)
  console.log('🔍 DEBUG - headerSettings:', headerSettings)
  console.log('🔍 DEBUG - footerSettings:', footerSettings)
  
  return (
    <html lang="fr">
      <body>
        <Header
          logoType={siteSettings?.header?.logoType || headerSettings?.logoType}
          logo={siteSettings?.header?.logo || headerSettings?.logo}
          logoText={siteSettings?.header?.logoText || headerSettings?.logoText}
          navigationMenu={siteSettings?.header?.navigationMenu || headerSettings?.navigationMenu}
          headerCta={siteSettings?.header?.cta || headerSettings?.cta}
          headerBackgroundColor={siteSettings?.header?.backgroundColor || headerSettings?.backgroundColor}
          headerTextColor={siteSettings?.header?.textColor || headerSettings?.textColor}
        />
        {children}
        <Footer
          footerText={siteSettings?.footer?.text || footerSettings?.text}
          footerColumns={siteSettings?.footer?.columns || footerSettings?.columns}
          copyrightText={siteSettings?.footer?.copyrightText || footerSettings?.copyrightText}
          socialLinks={siteSettings?.footer?.socialLinks || footerSettings?.socialLinks}
          footerBackgroundColor={siteSettings?.footer?.backgroundColor || footerSettings?.backgroundColor}
          footerTextColor={siteSettings?.footer?.textColor || footerSettings?.textColor}
        />
      </body>
    </html>
  );
}
