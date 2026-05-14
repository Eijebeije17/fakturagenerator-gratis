'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../supabase'
import Link from 'next/link'

export default function Login() {
  const [epost, setEpost] = useState('')
  const [losenord, setLosenord] = useState('')
  const [laddar, setLaddar] = useState(false)
  const [fel, setFel] = useState('')
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/faktura'

  async function loggaIn(e: React.FormEvent) {
    e.preventDefault()
    setLaddar(true)
    setFel('')
    const { error } = await supabase.auth.signInWithPassword({ email: epost, password: losenord })
    if (error) {
      setFel('Fel e-post eller lösenord')
    } else {
      window.location.href = redirect
    }
    setLaddar(false)
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');`}</style>
      <div className="min-h-screen flex items-center justify-center px-5" style={{ fontFamily: 'Montserrat, sans-serif', background: 'linear-gradient(180deg, #eae6d8 0%, #f0ece0 30%, #f8f6f0 100%)' }}>
        <div className="w-full max-w-md">

          <a href="/" className="block text-center font-black text-[#1a1a1a] text-xl mb-8 tracking-tight">Fakturagenerator</a>

          <div className="bg-white rounded-2xl border border-[#e8e4d8] p-8">
            <h1 className="text-2xl font-black text-[#1a2d6e] mb-1">Logga in</h1>
            <p className="text-sm text-[#888] font-medium mb-6">Logga in på ditt konto.</p>

            {fel && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                <p className="text-sm text-red-600 font-medium">{fel}</p>
              </div>
            )}

            <form onSubmit={loggaIn} className="flex flex-col gap-4">
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
                  placeholder="••••••••"
                  value={losenord}
                  onChange={(e) => setLosenord(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={laddar}
                className="w-full bg-[#1a2d6e] text-white rounded-full py-3 text-sm font-bold hover:bg-[#2a3d8e] transition-colors disabled:opacity-50 mt-2"
              >
                {laddar ? 'Loggar in...' : 'Logga in'}
              </button>
            </form>

            <div className="mt-6 flex justify-between items-center">
              <Link href="/registrera" className="text-xs font-bold text-[#888] hover:text-[#1a2d6e] transition-colors uppercase tracking-wide">
                Skapa konto
              </Link>
              <Link href="/glomt-losenord" className="text-xs font-bold text-[#888] hover:text-[#1a2d6e] transition-colors uppercase tracking-wide">
                Glömt lösenord?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}