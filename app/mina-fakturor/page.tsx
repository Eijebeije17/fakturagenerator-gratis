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
            if (!session.session) { window.location.href = '/login'; return }
            setAnvandare({ email: session.session.user.email || '' })
            const { data, error } = await supabase.from('fakturor').select('*').order('skapad', { ascending: false })
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
        if (!error) setFakturor(fakturor.filter(f => f.id !== id))
    }

    if (laddar) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ fontFamily: 'Montserrat, sans-serif', background: 'linear-gradient(180deg, #eae6d8 0%, #f0ece0 30%, #f8f6f0 100%)' }}>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');`}</style>
                <p className="text-[#aaa] text-sm font-medium">Laddar fakturor...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen" style={{ fontFamily: 'Montserrat, sans-serif', background: 'linear-gradient(180deg, #eae6d8 0%, #f0ece0 30%, #f8f6f0 100%)' }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');`}</style>

            {/* Navbar */}
            <nav className="px-5 md:px-10 py-4 md:py-5 flex justify-between items-center sticky top-0 z-50 border-b border-[#ddd8c4]" style={{ background: 'rgba(248, 246, 240, 0.95)', backdropFilter: 'blur(12px)' }}>
                <a href="/" className="font-black text-[#1a1a1a] text-base md:text-xl tracking-tight">Fakturagenerator</a>
                <div className="flex items-center gap-3 md:gap-6">
                    <a href="/faktura" className="text-sm text-[#555] hover:text-[#1a2d6e] transition-colors font-medium hidden md:block">Ny faktura</a>
                    <p className="text-xs text-[#aaa] hidden md:block font-medium">{anvandare?.email}</p>
                    <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login' }} className="text-sm text-[#555] hover:text-[#1a2d6e] transition-colors font-medium">
                        Logga ut
                    </button>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-10">
                <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-[#1a2d6e]">Mina fakturor</h1>
                        <p className="text-sm text-[#888] mt-1 font-medium">{fakturor.length} faktura{fakturor.length !== 1 ? 'r' : ''} sparade</p>
                    </div>
                    <Link href="/faktura" className="bg-[#1a2d6e] text-white px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-[#2a3d8e] transition-colors whitespace-nowrap">
                        Ny faktura →
                    </Link>
                </div>

                {fakturor.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-[#e8e4d8] p-10 text-center">
                        <p className="text-[#aaa] mb-6 font-medium">Du har inga sparade fakturor än</p>
                        <Link href="/faktura" className="bg-[#1a2d6e] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#2a3d8e] transition-colors">
                            Skapa din första faktura →
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-[#e8e4d8] overflow-hidden">
                        {/* Desktop tabell */}
                        <table className="w-full hidden md:table">
                            <thead>
                                <tr className="border-b border-[#e8e4d8]">
                                    <th className="text-left text-xs font-black text-[#bbb] uppercase tracking-widest p-5">Fakturanummer</th>
                                    <th className="text-left text-xs font-black text-[#bbb] uppercase tracking-widest p-5">Kund</th>
                                    <th className="text-left text-xs font-black text-[#bbb] uppercase tracking-widest p-5">Datum</th>
                                    <th className="text-right text-xs font-black text-[#bbb] uppercase tracking-widest p-5">Totalt</th>
                                    <th className="p-5"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {fakturor.map((f) => (
                                    <tr key={f.id} className="border-b border-[#f0ece0] hover:bg-[#faf8f2] transition-colors">
                                        <td className="p-5 text-sm font-black text-[#1a2d6e]">#{f.faktura_nummer}</td>
                                        <td className="p-5 text-sm font-medium text-[#444]">{f.kund_namn || '—'}</td>
                                        <td className="p-5 text-sm text-[#888] font-medium">
                                            {formateraDatum((f.faktura_data as Record<string, Record<string, string>>)?.faktura?.fakturaDatum || f.skapad)}
                                        </td>
                                        <td className="p-5 text-sm font-black text-[#1a1a1a] text-right">{formateraSEK(f.totalt)}</td>
                                        <td className="p-5 text-right">
                                            <div className="flex gap-3 justify-end items-center">
                                                <button onClick={() => window.location.href = `/faktura?id=${f.id}`} className="text-xs font-bold text-[#1a2d6e] hover:text-[#2a3d8e] transition-colors uppercase tracking-wide">Öppna</button>
                                                <button onClick={(e) => taBortFaktura(f.id, e)} className="text-xs font-bold text-red-300 hover:text-red-500 transition-colors uppercase tracking-wide">Ta bort</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Mobillista */}
                        <div className="md:hidden divide-y divide-[#f0ece0]">
                            {fakturor.map((f) => (
                                <div key={f.id} className="p-4 hover:bg-[#faf8f2] transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-sm font-black text-[#1a2d6e]">#{f.faktura_nummer}</p>
                                            <p className="text-sm font-medium text-[#444] mt-0.5">{f.kund_namn || '—'}</p>
                                            <p className="text-xs text-[#aaa] font-medium mt-0.5">
                                                {formateraDatum((f.faktura_data as Record<string, Record<string, string>>)?.faktura?.fakturaDatum || f.skapad)}
                                            </p>
                                        </div>
                                        <p className="text-sm font-black text-[#1a1a1a]">{formateraSEK(f.totalt)}</p>
                                    </div>
                                    <div className="flex gap-3 mt-3">
                                        <button onClick={() => window.location.href = `/faktura?id=${f.id}`} className="text-xs font-bold text-[#1a2d6e] hover:text-[#2a3d8e] transition-colors uppercase tracking-wide">Öppna</button>
                                        <button onClick={(e) => taBortFaktura(f.id, e)} className="text-xs font-bold text-red-300 hover:text-red-500 transition-colors uppercase tracking-wide">Ta bort</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}