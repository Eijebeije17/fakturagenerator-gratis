'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function AterstallLosenord() {
  const [losenord, setLosenord] = useState('')
  const [losenord2, setLosenord2] = useState('')
  const [laddar, setLaddar] = useState(false)
  const [fel, setFel] = useState('')
  const [redo, setRedo] = useState(false)

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setRedo(true)
      }
    })
  }, [])

  async function uppdateraLosenord(e: React.FormEvent) {
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
    const { error } = await supabase.auth.updateUser({ password: losenord })

    if (error) {
      setFel('Något gick fel: ' + error.message)
    } else {
      window.location.href = '/login'
    }
    setLaddar(false)
  }

  if (!redo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-xl p-8 shadow-sm w-full max-w-md text-center">
          <p className="text-gray-500 text-sm">Laddar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-xl p-8 shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Nytt lösenord</h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">Ange ditt nya lösenord.</p>

        {fel && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-600">{fel}</p>
          </div>
        )}

        <form onSubmit={uppdateraLosenord}>
          <div className="mb-4">
            <label className="text-sm text-gray-500">Nytt lösenord</label>
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
            {laddar ? 'Sparar...' : 'Spara nytt lösenord'}
          </button>
        </form>
      </div>
    </div>
  )
}