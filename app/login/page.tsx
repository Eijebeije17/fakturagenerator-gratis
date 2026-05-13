'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../supabase'

export default function Login() {
  const [epost, setEpost] = useState('')
  const [skickat, setSkickat] = useState(false)
  const [laddar, setLaddar] = useState(false)
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/faktura'

  async function loggaIn(e: React.FormEvent) {
    e.preventDefault()
    setLaddar(true)
    const { error } = await supabase.auth.signInWithOtp({
      email: epost,
      options: {
        emailRedirectTo: `${window.location.origin}${redirect}`,
      },
    })
    if (error) {
      alert('Något gick fel: ' + error.message)
    } else {
      setSkickat(true)
    }
    setLaddar(false)
  }

  if (skickat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-xl p-8 shadow-sm w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Kolla din e-post!</h1>
          <p className="text-gray-500 text-sm leading-relaxed">Vi har skickat en inloggningslänk till <strong>{epost}</strong>. Klicka på länken för att logga in.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-xl p-8 shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Logga in</h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">Ange din e-post så skickar vi en inloggningslänk.</p>
        <form onSubmit={loggaIn}>
          <label className="text-sm text-gray-500">E-postadress</label>
          <input
            className="w-full border border-gray-200 rounded-lg p-2 mt-1 mb-4"
            type="email"
            placeholder="din@email.se"
            value={epost}
            onChange={(e) => setEpost(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={laddar}
            className="w-full bg-black text-white rounded-lg p-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {laddar ? 'Skickar...' : 'Skicka inloggningslänk'}
          </button>
        </form>
      </div>
    </div>
  )
}