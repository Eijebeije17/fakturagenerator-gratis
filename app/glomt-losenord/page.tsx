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

    if (error) {
      setFel('Något gick fel: ' + error.message)
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
          <p className="text-gray-500 text-sm leading-relaxed mb-6">Vi har skickat en återställningslänk till <strong>{epost}</strong>.</p>
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900">
            Tillbaka till inloggning
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-xl p-8 shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Glömt lösenord?</h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">Ange din e-post så skickar vi en återställningslänk.</p>

        {fel && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-600">{fel}</p>
          </div>
        )}

        <form onSubmit={skickaAterstallning}>
          <div className="mb-6">
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
          <button
            type="submit"
            disabled={laddar}
            className="w-full bg-black text-white rounded-lg p-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {laddar ? 'Skickar...' : 'Skicka återställningslänk'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900">
            Tillbaka till inloggning
          </Link>
        </div>
      </div>
    </div>
  )
}