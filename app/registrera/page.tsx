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

    if (losenord !== losenord2) {
      setFel('Lösenorden matchar inte')
      return
    }

    if (losenord.length < 6) {
      setFel('Lösenordet måste vara minst 6 tecken')
      return
    }

    setLaddar(true)
    const { error } = await supabase.auth.signUp({
      email: epost,
      password: losenord,
    })

    if (error) {
      setFel('Något gick fel: ' + error.message)
    } else {
      window.location.href = '/faktura'
    }
    setLaddar(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-xl p-8 shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Skapa konto</h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">Skapa ett gratis konto för att spara dina fakturor.</p>

        {fel && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-600">{fel}</p>
          </div>
        )}

        <form onSubmit={registrera}>
          <div className="mb-4">
            <label className="text-sm text-gray-500">E-postadress</label>
            <input
              className="w-full border border-gray-200 rounded-lg p-2 mt-1"
              type="email"
              placeholder="din@email.se"
              value={epost}
              onChange={(e) => setEpost(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-500">Lösenord</label>
            <input
              className="w-full border border-gray-200 rounded-lg p-2 mt-1"
              type="password"
              placeholder="Minst 6 tecken"
              value={losenord}
              onChange={(e) => setLosenord(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="text-sm text-gray-500">Bekräfta lösenord</label>
            <input
              className="w-full border border-gray-200 rounded-lg p-2 mt-1"
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
            className="w-full bg-black text-white rounded-lg p-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {laddar ? 'Skapar konto...' : 'Skapa konto'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900">
            Har du redan ett konto? Logga in
          </Link>
        </div>
      </div>
    </div>
  )
}