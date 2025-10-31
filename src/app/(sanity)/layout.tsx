import type { Metadata } from "next";
import "../../styles/brand.css";
import "../globals.css";

export const metadata: Metadata = {
  title: "Sanity Studio",
  description: "Content management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
