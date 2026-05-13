'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import Link from 'next/link'

type Faktura = {
    id: number
    faktura_nummer: string
    kund_namn: string
    totalt: number
    skapad: string
    faktura_data: Record<string, unknown>
}

export default function MinaFakturor() {
    const [fakturor, setFakturor] = useState<Faktura[]>([])
    const [laddar, setLaddar] = useState(true)
    const [anvandare, setAnvandare] = useState<{ email: string } | null>(null)

    useEffect(() => {
        async function hamtaFakturor() {
            const { data: session } = await supabase.auth.getSession()
            if (!session.session) {
                window.location.href = '/login'
                return
            }
            setAnvandare({ email: session.session.user.email || '' })

            const { data, error } = await supabase
                .from('fakturor')
                .select('*')
                .order('skapad', { ascending: false })

            if (!error && data) setFakturor(data)
            setLaddar(false)
        }
        hamtaFakturor()
    }, [])

    function formateraSEK(nummer: number) {
        return nummer.toLocaleString('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' kr'
    }

    function formateraDatum(datum: string) {
        return new Date(datum).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    async function taBortFaktura(id: number, e: React.MouseEvent) {
        e.stopPropagation()
        if (!confirm('Är du säker på att du vill ta bort fakturan?')) return
        const { error } = await supabase.from('fakturor').delete().eq('id', id)
        if (!error) {
            setFakturor(fakturor.filter(f => f.id !== id))
        }
    }

    if (laddar) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-400 text-sm">Laddar fakturor...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-100 px-6 py-3 flex justify-between items-center">
                <a href="/" className="font-semibold text-gray-900 text-sm tracking-tight">Fakturagenerator</a>
                <div className="flex items-center gap-4">
                    <p className="text-xs text-gray-400 hidden md:block">{anvandare?.email}</p>
                    <button
                        onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login' }}
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Logga ut
                    </button>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 md:px-8 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Mina fakturor</h1>
                        <p className="text-sm text-gray-500 mt-1">{fakturor.length} faktura{fakturor.length !== 1 ? 'r' : ''} sparade</p>
                    </div>
                    <Link href="/faktura" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                        Ny faktura
                    </Link>
                </div>

                {fakturor.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 shadow-sm text-center">
                        <p className="text-gray-400 mb-4">Du har inga sparade fakturor än</p>
                        <Link href="/faktura" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                            Skapa din första faktura
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left text-xs text-gray-400 uppercase tracking-wide p-4">Fakturanummer</th>
                                    <th className="text-left text-xs text-gray-400 uppercase tracking-wide p-4">Kund</th>
                                    <th className="text-left text-xs text-gray-400 uppercase tracking-wide p-4 hidden md:table-cell">Datum</th>
                                    <th className="text-right text-xs text-gray-400 uppercase tracking-wide p-4">Totalt</th>
                                    <th className="text-right text-xs text-gray-400 uppercase tracking-wide p-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {fakturor.map((f) => (
                                    <tr
                                        key={f.id}
                                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="p-4 text-sm font-medium text-gray-800">#{f.faktura_nummer}</td>
                                        <td className="p-4 text-sm text-gray-600">{f.kund_namn || '—'}</td>
                                        <td className="p-4 text-sm text-gray-500 hidden md:table-cell">
                                            {formateraDatum((f.faktura_data as Record<string, Record<string, string>>)?.faktura?.fakturaDatum || f.skapad)}
                                        </td>
                                        <td className="p-4 text-sm font-medium text-gray-800 text-right">{formateraSEK(f.totalt)}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex gap-3 justify-end items-center">
                                                <button
                                                    onClick={() => window.location.href = `/faktura?id=${f.id}`}
                                                    className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                                                >
                                                    Öppna
                                                </button>
                                                <button
                                                    onClick={(e) => taBortFaktura(f.id, e)}
                                                    className="text-xs text-red-400 hover:text-red-600 transition-colors"
                                                >
                                                    Ta bort
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    )
}