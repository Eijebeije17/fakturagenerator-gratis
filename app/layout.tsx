import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Fakturafix — Gratis fakturagenerator för svenska företag',
  description: 'Skapa professionella svenska fakturor helt gratis. Automatisk momsberäkning, PDF-export och förhandsgranskning i realtid. Inget konto krävs.',
  openGraph: {
    title: 'Fakturafix — Gratis fakturagenerator för svenska företag',
    description: 'Skapa professionella svenska fakturor helt gratis. Automatisk momsberäkning, PDF-export och förhandsgranskning i realtid. Inget konto krävs.',
    url: 'https://www.fakturafix.se',
    siteName: 'Fakturafix',
    images: [
      {
        url: 'https://www.fakturafix.se/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'sv_SE',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body>
        {children}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "bbdc6cd221a7473eb557cb4550230aaa"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}