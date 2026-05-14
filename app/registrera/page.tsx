'use client'

import { useState } from 'react'
import { supabase } from '../supabase'
import Link from 'next/link'

export default function Registrera() {
  const [epost, setEpost] = useState('')
  const [losenord, setLosenord] = useState('')
  const [losenord2, setLosenord2] = useState('')
  const [laddar, setLaddar] = useState(false)
  const [fel, setFel] = useState('')

  async function registrera(e: React.FormEvent) {
    e.preventDefault()
    setFel('')
    if (losenord !== losenord2) { setFel('Lösenorden matchar inte'); return }
    if (losenord.length < 6) { setFel('Lösenordet måste vara minst 6 tecken'); return }
    setLaddar(true)
    const { error } = await supabase.auth.signUp({ email: epost, password: losenord })
    if (error) { setFel('Något gick fel: ' + error.message) }
    else { window.location.href = '/faktura' }
    setLaddar(false)
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');`}</style>
      <div className="min-h-screen flex items-center justify-center px-5" style={{ fontFamily: 'Montserrat, sans-serif', background: 'linear-gradient(180deg, #eae6d8 0%, #f0ece0 30%, #f8f6f0 100%)' }}>
        <div className="w-full max-w-md">

          <a href="/" className="block text-center font-black text-[#1a1a1a] text-xl mb-8 tracking-tight">Fakturagenerator</a>

          <div className="bg-white rounded-2xl border border-[#e8e4d8] p-8">
            <h1 className="text-2xl font-black text-[#1a2d6e] mb-1">Skapa konto</h1>
            <p className="text-sm text-[#888] font-medium mb-6">Skapa ett gratis konto för att spara dina fakturor.</p>

            {fel && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                <p className="text-sm text-red-600 font-medium">{fel}</p>
              </div>
            )}

            <form onSubmit={registrera} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-black text-[#666] uppercase tracking-widest">E-postadress</label>
                <input
                  className="w-full border border-[#e0ddd4] rounded-lg p-3 mt-1 text-sm focus:outline-none focus:border-[#1a2d6e] transition-colors"
                  type="email"
                  placeholder="din@email.se"
                  value={epost}
                  onChange={(e) => setEpost(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-black text-[#666] uppercase tracking-widest">Lösenord</label>
                <input
                  className="w-full border border-[#e0ddd4] rounded-lg p-3 mt-1 text-sm focus:outline-none focus:border-[#1a2d6e] transition-colors"
                  type="password"
                  placeholder="Minst 6 tecken"
                  value={losenord}
                  onChange={(e) => setLosenord(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-black text-[#666] uppercase tracking-widest">Bekräfta lösenord</label>
                <input
                  className="w-full border border-[#e0ddd4] rounded-lg p-3 mt-1 text-sm focus:outline-none focus:border-[#1a2d6e] transition-colors"
                  type="password"
                  placeholder="Upprepa lösenordet"
                  value={losenord2}
                  onChange={(e) => setLosenord2(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={laddar}
                className="w-full bg-[#1a2d6e] text-white rounded-full py-3 text-sm font-bold hover:bg-[#2a3d8e] transition-colors disabled:opacity-50 mt-2"
              >
                {laddar ? 'Skapar konto...' : 'Skapa konto'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login" className="text-xs font-bold text-[#888] hover:text-[#1a2d6e] transition-colors uppercase tracking-wide">
                Har du redan ett konto? Logga in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}