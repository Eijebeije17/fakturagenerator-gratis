import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skapa faktura gratis — FakturaFix',
  description: 'Skapa professionella svenska fakturor gratis. Automatisk momsberäkning, F-skatt, bankgiro, Swish med QR-kod och ROT-avdrag. PDF-export med ett klick. Inget konto krävs.',
  alternates: {
    canonical: 'https://www.fakturafix.se/faktura',
  },
}

export const dynamic = 'force-dynamic'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}