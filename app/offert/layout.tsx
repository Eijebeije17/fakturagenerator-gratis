import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skapa offert gratis — FakturaFix',
  description: 'Skapa professionella offerter gratis. Automatisk momsberäkning, giltighetstid och PDF-export med ett klick. Inget konto krävs.',
  alternates: {
    canonical: 'https://www.fakturafix.se/offert',
  },
}

export const dynamic = 'force-dynamic'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}