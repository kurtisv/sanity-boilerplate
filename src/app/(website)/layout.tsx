import type { Metadata } from "next";
import "../../styles/brand.css";
import "../globals.css";
import { client } from '@/sanity/lib/client'
import { headerSettingsQuery, footerSettingsQuery } from '@/sanity/lib/queries'
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
  // Récupérer les paramètres du header et footer
  const headerSettings = await client.fetch(headerSettingsQuery)
  const footerSettings = await client.fetch(footerSettingsQuery)
  
  // Debug temporaire
  console.log('🔍 DEBUG - headerSettings:', headerSettings)
  console.log('🔍 DEBUG - footerSettings:', footerSettings)
  
  return (
    <html lang="fr">
      <body>
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
        <Footer
          footerText={footerSettings?.text}
          footerColumns={footerSettings?.columns}
          copyrightText={footerSettings?.copyrightText}
          socialLinks={footerSettings?.socialLinks}
          footerBackgroundColor={footerSettings?.backgroundColor}
          footerTextColor={footerSettings?.textColor}
        />
      </body>
    </html>
  );
}
