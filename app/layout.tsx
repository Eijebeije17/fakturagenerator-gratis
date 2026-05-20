import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Fakturafix — Gratis fakturagenerator',
  description: 'Skapa korrekta svenska fakturor gratis. Förhandsgranskning i realtid, PDF-export och inga konton krävs.',
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