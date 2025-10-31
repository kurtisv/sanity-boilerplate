import type { Metadata } from "next";
import "../../styles/brand.css";
import "../globals.css";
import { client } from '@/sanity/lib/client'
import { headerSettingsQuery, footerSettingsQuery } from '@/sanity/lib/queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mon Site",
    description: "Site web dynamique avec Sanity + Next.js",
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerSettings = await client.fetch(headerSettingsQuery)
  const footerSettings = await client.fetch(footerSettingsQuery)
  
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
