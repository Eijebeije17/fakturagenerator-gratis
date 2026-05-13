'use client'

import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Link from 'next/link'

export default function Startsida() {
  const [anvandare, setAnvandare] = useState<{ email: string } | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setAnvandare({ email: data.session.user.email || '' })
      }
    })
  }, [])
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-5 border-b border-gray-100">
        <p className="font-semibold text-gray-900 tracking-tight">Fakturagenerator</p>
        <div className="flex gap-3 md:gap-6 items-center">
          {anvandare ? (
            <>
              <Link href="/mina-fakturor" className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden md:block">
                Mina fakturor
              </Link>
              <p className="text-xs text-gray-400 hidden md:block">{anvandare.email}</p>
              <button
                onClick={async () => { await supabase.auth.signOut(); setAnvandare(null) }}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Logga ut
              </button>
            </>
          ) : (
            <>
              <Link href="/login?redirect=/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Logga in</Link>
              <Link href="/faktura" className="text-sm bg-gray-900 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">Kom igång</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-16 md:pt-28 pb-16 md:pb-20 text-center">
        <p className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest mb-4 md:mb-6">Gratis att använda</p>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight">
          Fakturering som faktiskt fungerar
        </h1>
        <p className="text-base md:text-lg text-gray-500 mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">
          Skapa korrekta svenska fakturor med förhandsgranskning i realtid. Exportera som PDF och skicka direkt till kunden.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/faktura" className="bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors text-center">
            Skapa faktura
          </Link>
          <Link href="/registrera" className="block text-center bg-gray-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-700 transition-colors">
            Skapa konto
          </Link>
        </div>
      </div>

      {/* Funktioner */}
      <div className="border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest text-center mb-10 md:mb-16">Funktioner</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Förhandsgranskning</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Se exakt hur fakturan ser ut medan du fyller i uppgifterna — inga överraskningar när du exporterar.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">PDF-export</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Exportera en professionell PDF med ett klick, redo att skicka till kunden via e-post.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Svensk standard</h3>
              <p className="text-sm text-gray-500 leading-relaxed">F-skatt, moms, bankgiro och dröjsmålsränta — allt som krävs på en korrekt svensk faktura.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Eget varumärke</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Lägg till din logga och välj accentfärg för ett professionellt och personligt intryck.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Fakturahistorik</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Skapa ett konto och spara alla dina fakturor på ett ställe. Hitta gamla fakturor enkelt.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Säker lagring</h3>
              <p className="text-sm text-gray-500 leading-relaxed">All data lagras krypterat på servrar inom EU, i enlighet med GDPR.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Priser */}
      <div className="border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest text-center mb-10 md:mb-16">Priser</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-2xl p-6 md:p-8">
              <p className="text-sm font-medium text-gray-500 mb-1">Gratis</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">0 kr</p>
              <p className="text-sm text-gray-400 mb-6 md:mb-8">För alltid</p>
              <div className="flex flex-col gap-3 mb-6 md:mb-8">
                <p className="text-sm text-gray-600">Skapa och exportera fakturor</p>
                <p className="text-sm text-gray-600">PDF-export</p>
                <p className="text-sm text-gray-600">Förhandsgranskning i realtid</p>
                <p className="text-sm text-gray-300 line-through">Spara fakturor</p>
                <p className="text-sm text-gray-300 line-through">Fakturahistorik</p>
              </div>
              <Link href="/faktura" className="block text-center border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Kom igång gratis
              </Link>
            </div>
            <div className="border-2 border-gray-900 rounded-2xl p-6 md:p-8">
              <p className="text-sm font-medium text-gray-500 mb-1">Pro</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">99 kr</p>
              <p className="text-sm text-gray-400 mb-6 md:mb-8">per månad</p>
              <div className="flex flex-col gap-3 mb-6 md:mb-8">
                <p className="text-sm text-gray-600">Skapa och exportera fakturor</p>
                <p className="text-sm text-gray-600">PDF-export</p>
                <p className="text-sm text-gray-600">Förhandsgranskning i realtid</p>
                <p className="text-sm text-gray-600">Spara fakturor</p>
                <p className="text-sm text-gray-600">Fakturahistorik</p>
              </div>
              <Link href="/login" className="block text-center bg-gray-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-700 transition-colors">
                Skapa konto
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 md:px-8 py-6 md:py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-sm font-medium text-gray-900">Fakturagenerator</p>
          <p className="text-sm text-gray-400">© 2026 — Byggd för svenska företagare och frilansare</p>
        </div>
      </footer>

    </div>
  )
}