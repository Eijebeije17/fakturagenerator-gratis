'use client'

import { useState } from 'react'
import { supabase } from '../supabase'
import Link from 'next/link'

export default function GlomdLosenord() {
  const [epost, setEpost] = useState('')
  const [skickat, setSkickat] = useState(false)
  const [laddar, setLaddar] = useState(false)
  const [fel, setFel] = useState('')

  async function skickaAterstallning(e: React.FormEvent) {
    e.preventDefault()
    setLaddar(true)
    setFel('')
    const { error } = await supabase.auth.resetPasswordForEmail(epost, {
      redirectTo: `${window.location.origin}/aterstall-losenord`,
    })
    if (error) { setFel('Något gick fel: ' + error.message) }
    else { setSkickat(true) }
    setLaddar(false)
  }

  if (skickat) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');`}</style>
        <div className="min-h-screen flex items-center justify-center px-5" style={{ fontFamily: 'Montserrat, sans-serif', background: 'linear-gradient(180deg, #eae6d8 0%, #f0ece0 30%, #f8f6f0 100%)' }}>
          <div className="w-full max-w-md">
            <a href="/" className="block text-center font-black text-[#1a1a1a] text-xl mb-8 tracking-tight">Fakturagenerator</a>
            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-8 text-center">
              <h1 className="text-2xl font-black text-[#1a2d6e] mb-2">Kolla din e-post!</h1>
              <p className="text-sm text-[#888] font-medium mb-6">Vi har skickat en återställningslänk till <strong>{epost}</strong>.</p>
              <Link href="/login" className="text-xs font-bold text-[#888] hover:text-[#1a2d6e] transition-colors uppercase tracking-wide">
                Tillbaka till inloggning
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');`}</style>
      <div className="min-h-screen flex items-center justify-center px-5" style={{ fontFamily: 'Montserrat, sans-serif', background: 'linear-gradient(180deg, #eae6d8 0%, #f0ece0 30%, #f8f6f0 100%)' }}>
        <div className="w-full max-w-md">

          <a href="/" className="block text-center font-black text-[#1a1a1a] text-xl mb-8 tracking-tight">Fakturagenerator</a>

          <div className="bg-white rounded-2xl border border-[#e8e4d8] p-8">
            <h1 className="text-2xl font-black text-[#1a2d6e] mb-1">Glömt lösenord?</h1>
            <p className="text-sm text-[#888] font-medium mb-6">Ange din e-post så skickar vi en återställningslänk.</p>

            {fel && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                <p className="text-sm text-red-600 font-medium">{fel}</p>
              </div>
            )}

            <form onSubmit={skickaAterstallning} className="flex flex-col gap-4">
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
              <button
                type="submit"
                disabled={laddar}
                className="w-full bg-[#1a2d6e] text-white rounded-full py-3 text-sm font-bold hover:bg-[#2a3d8e] transition-colors disabled:opacity-50 mt-2"
              >
                {laddar ? 'Skickar...' : 'Skicka återställningslänk'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login" className="text-xs font-bold text-[#888] hover:text-[#1a2d6e] transition-colors uppercase tracking-wide">
                Tillbaka till inloggning
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}