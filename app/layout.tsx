import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}