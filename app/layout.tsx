import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'FakturaFix — Skapa faktura gratis | Gratis fakturagenerator',
  description: 'Skapa faktura gratis online. FakturaFix är en gratis fakturagenerator för svenska företag, frilansare och enskilda firmor. Automatisk moms, F-skatt, bankgiro, Swish och PDF-export. Inget konto krävs.',
  keywords: ['faktura gratis', 'skapa faktura gratis', 'fakturagenerator', 'gratis fakturagenerator', 'fakturamall', 'faktura online', 'faktura frilansare', 'faktura enskild firma', 'faktura moms', 'faktura Sverige'],
  openGraph: {
    title: 'FakturaFix — Skapa faktura gratis | Gratis fakturagenerator',
    description: 'Skapa faktura gratis online. Automatisk moms, F-skatt, bankgiro, Swish och PDF-export. Inget konto krävs.',
    url: 'https://www.fakturafix.se',
    siteName: 'FakturaFix',
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
  twitter: {
    card: 'summary_large_image',
    title: 'FakturaFix — Skapa faktura gratis',
    description: 'Gratis fakturagenerator för svenska företag och frilansare. Inget konto krävs.',
  },
  alternates: {
    canonical: 'https://www.fakturafix.se',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '7MjJRFVc7Qa8B1O7N2gw5blurrF5Eoo827Nk8v7rt4w',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FakturaFix',
  url: 'https://www.fakturafix.se',
  description: 'Gratis fakturagenerator för svenska företag, frilansare och enskilda firmor.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'SEK',
  },
  inLanguage: 'sv-SE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "bbdc6cd221a7473eb557cb4550230aaa"}'
          strategy="afterInteractive"
        />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="52eded02-6026-4891-b8ea-49dbab42e612"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}