import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Démonstration - Boilerplate Next.js + Sanity',
  description: 'Découvrez tous les blocs universels de notre boilerplate en action',
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
