'use client'

import { useState, useRef, useEffect } from 'react'
import { useReactToPrint } from 'react-to-print'
import { supabase } from '../supabase'
import { useSearchParams } from 'next/navigation'

export default function Home() {
    const [faktura, setFaktura] = useState({
        mittForetag: '',
        mittOrgnr: '',
        mittMoms: '',
        mittAdress: '',
        mittPostort: '',
        mittTelefon: '',
        mittEpost: '',
        mittBankgiro: '',
        mittReferens: '',
        kundNamn: '',
        kundOrgnr: '',
        kundAdress: '',
        kundPostort: '',
        kundReferens: '',
        fakturaNummer: '2025-001',
        fakturaDatum: '',
        forfalloDatum: '',
        betalningsvillkor: '30',
        ocr: '',
        meddelande: '',
    })

    const [rader, setRader] = useState([
        { beskrivning: '', antal: '', pris: '' }
    ])

    const [momssats, setMomssats] = useState(0.25)
    const [betalningstyp, setBetalningstyp] = useState('bankgiro')
    const [fSkatt, setFSkatt] = useState(true)
    const [drojsmal, setDrojsmal] = useState(true)
    const [logga, setLogga] = useState<string | null>(null)
    const [accentFarg, setAccentFarg] = useState('#1a1a2e')
    const [sparadMeddelande, setSparadMeddelande] = useState('')
    const [valideringsfel, setValideringsfel] = useState<string[]>([])
    const [aktivFlik, setAktivFlik] = useState<'formular' | 'forhandsgranskning'>('formular')
    const [erMobil, setErMobil] = useState(false)
    const [anvandare, setAnvandare] = useState<{ email: string } | null>(null)
    const [oppetFakturaId, setOppetFakturaId] = useState<number | null>(null)
    const [notis, setNotis] = useState<{ text: string, typ: 'success' | 'error' } | null>(null)
    const [antalExporterade, setAntalExporterade] = useState(0)
    const [laddatExporterade, setLaddatExporterade] = useState(false)

    const forhandsvisningRef = useRef(null)
    const loggaRef = useRef<HTMLInputElement>(null)
    const skrivUt = useReactToPrint({ contentRef: forhandsvisningRef })
    const searchParams = useSearchParams()

    useEffect(() => {
        function kollaStorlek() {
            setErMobil(window.innerWidth < 768)
        }
        kollaStorlek()
        window.addEventListener('resize', kollaStorlek)
        return () => window.removeEventListener('resize', kollaStorlek)
    }, [])

    useEffect(() => {
        const sparat = localStorage.getItem('faktura-utkast')
        if (sparat) {
            const data = JSON.parse(sparat)
            if (data.faktura) setFaktura(data.faktura)
            if (data.rader) setRader(data.rader)
            if (data.momssats) setMomssats(data.momssats)
            if (data.betalningstyp) setBetalningstyp(data.betalningstyp)
            if (data.fSkatt !== undefined) setFSkatt(data.fSkatt)
            if (data.drojsmal !== undefined) setDrojsmal(data.drojsmal)
            if (data.logga) setLogga(data.logga)
            if (data.accentFarg) setAccentFarg(data.accentFarg)
        }
    }, [])

    useEffect(() => {
        const data = { faktura, rader, momssats, betalningstyp, fSkatt, drojsmal, logga, accentFarg }
        localStorage.setItem('faktura-utkast', JSON.stringify(data))
    }, [faktura, rader, momssats, betalningstyp, fSkatt, drojsmal, logga, accentFarg])

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session?.user) {
                setAnvandare({ email: data.session.user.email || '' })
            }
        })
    }, [])

    useEffect(() => {
        const id = searchParams.get('id')
        if (!id) return

        supabase
            .from('fakturor')
            .select('id, faktura_data')
            .eq('id', id)
            .single()
            .then(({ data, error }) => {
                if (error || !data) return
                setOppetFakturaId(data.id)
                const d = data.faktura_data as Record<string, unknown>
                if (d.faktura) setFaktura(d.faktura as typeof faktura)
                if (d.rader) setRader(d.rader as typeof rader)
                if (d.momssats) setMomssats(d.momssats as number)
                if (d.betalningstyp) setBetalningstyp(d.betalningstyp as string)
                if (d.fSkatt !== undefined) setFSkatt(d.fSkatt as boolean)
                if (d.drojsmal !== undefined) setDrojsmal(d.drojsmal as boolean)
                if (d.logga) setLogga(d.logga as string)
                if (d.accentFarg) setAccentFarg(d.accentFarg as string)
            })
    }, [searchParams])

    useEffect(() => {
        async function hamtaAntalExporterade() {
            if (anvandare) {
                const session = await supabase.auth.getSession()
                const userId = session.data.session?.user.id
                const { data } = await supabase
                    .from('anvandare_info')
                    .select('antal_exporterade, pro')
                    .eq('user_id', userId)
                    .single()
                if (data) setAntalExporterade(data.antal_exporterade)
            } else {
                setAntalExporterade(parseInt(localStorage.getItem('antal_exporterade') || '0'))
            }
            setLaddatExporterade(true)
        }
        hamtaAntalExporterade()
    }, [anvandare])

    function formateraDatum(datum: string) {
        if (!datum) return '—'
        const d = new Date(datum)
        return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    function uppdatera(falt: string, varde: string) {
        const nyFaktura = { ...faktura, [falt]: varde }
        if (falt === 'fakturaDatum' || falt === 'betalningsvillkor') {
            const datum = falt === 'fakturaDatum' ? varde : faktura.fakturaDatum
            const dagar = falt === 'betalningsvillkor' ? parseInt(varde) : parseInt(faktura.betalningsvillkor)
            if (datum && dagar) {
                const forfallo = new Date(datum)
                forfallo.setDate(forfallo.getDate() + dagar)
                nyFaktura.forfalloDatum = forfallo.toISOString().split('T')[0]
            }
        }
        setFaktura(nyFaktura)
    }

    function uppdateraRad(index: number, falt: 'beskrivning' | 'antal' | 'pris', varde: string) {
        const nyaRader = [...rader]
        nyaRader[index][falt] = varde
        setRader(nyaRader)
    }

    function laggTillRad() {
        setRader([...rader, { beskrivning: '', antal: '', pris: '' }])
    }

    function taBortRad(index: number) {
        setRader(rader.filter((_, i) => i !== index))
    }

    function laddaUppLogga(e: React.ChangeEvent<HTMLInputElement>) {
        const fil = e.target.files?.[0]
        if (!fil) return
        if (fil.size > 2 * 1024 * 1024) {
            visaNotis('Loggan är för stor. Max 2MB är tillåtet.')
            return
        }
        const lasare = new FileReader()
        lasare.onload = (ev) => setLogga(ev.target?.result as string)
        lasare.readAsDataURL(fil)
    }

    function sparaManuellt() {
        const data = { faktura, rader, momssats, betalningstyp, fSkatt, drojsmal, logga, accentFarg }
        localStorage.setItem('faktura-utkast', JSON.stringify(data))
        setSparadMeddelande('Sparat!')
        setTimeout(() => setSparadMeddelande(''), 2000)
    }

    function nyttFakturaNummer(nuvarande: string) {
        const delar = nuvarande.split('-')
        if (delar.length === 2) {
            const prefix = delar[0]
            const nummer = parseInt(delar[1])
            if (!isNaN(nummer)) {
                return `${prefix}-${String(nummer + 1).padStart(delar[1].length, '0')}`
            }
        }
        return nuvarande
    }

    function rensaAllt() {
        const nyttNummer = nyttFakturaNummer(faktura.fakturaNummer)
        localStorage.removeItem('faktura-utkast')
        setFaktura({
            mittForetag: faktura.mittForetag,
            mittOrgnr: faktura.mittOrgnr,
            mittMoms: faktura.mittMoms,
            mittAdress: faktura.mittAdress,
            mittPostort: faktura.mittPostort,
            mittTelefon: faktura.mittTelefon,
            mittEpost: faktura.mittEpost,
            mittBankgiro: faktura.mittBankgiro,
            mittReferens: faktura.mittReferens,
            kundNamn: '',
            kundOrgnr: '',
            kundAdress: '',
            kundPostort: '',
            kundReferens: '',
            fakturaNummer: nyttNummer,
            fakturaDatum: '',
            forfalloDatum: '',
            betalningsvillkor: faktura.betalningsvillkor,
            ocr: '',
            meddelande: '',
        })
        setRader([{ beskrivning: '', antal: '', pris: '' }])
        setValideringsfel([])
        setOppetFakturaId(null)
    }

    async function sparaTillSupabase() {
        if (!anvandare) return

        const fakturaData = {
            faktura_data: { faktura, rader, momssats, betalningstyp, fSkatt, drojsmal, logga, accentFarg },
            faktura_nummer: faktura.fakturaNummer,
            kund_namn: faktura.kundNamn,
            totalt: totalt,
            skapad: new Date().toISOString(),
        }

        if (oppetFakturaId) {
            const { error } = await supabase
                .from('fakturor')
                .update(fakturaData)
                .eq('id', oppetFakturaId)

            if (error) {
                visaNotis('Något gick fel: ' + error.message, 'error')
            } else {
                visaNotis('Fakturan uppdaterades!')
            }
        } else {
            const { data, error } = await supabase
                .from('fakturor')
                .insert({
                    user_id: (await supabase.auth.getSession()).data.session?.user.id,
                    ...fakturaData,
                })
                .select()
                .single()

            if (error) {
                visaNotis('Något gick fel: ' + error.message, 'error')
            } else {
                setOppetFakturaId(data.id)
                visaNotis('Fakturan sparades!')
            }
        }
    }

    async function valideraOchExportera() {
        const fel: string[] = []
        if (!faktura.mittForetag) fel.push('Företagsnamn saknas')
        if (!faktura.mittOrgnr) fel.push('Org.nummer saknas')
        if (!faktura.mittMoms) fel.push('Momsreg.nummer saknas')
        if (!faktura.mittAdress) fel.push('Din gatuadress saknas')
        if (!faktura.mittPostort) fel.push('Ditt postnummer och ort saknas')
        if (!faktura.mittBankgiro) fel.push(`${betalningstyp === 'bankgiro' ? 'Bankgironummer' : 'Plusgironummer'} saknas`)
        if (!faktura.kundNamn) fel.push('Kundnamn saknas')
        if (!faktura.fakturaDatum) fel.push('Fakturadatum saknas')
        if (!faktura.forfalloDatum) fel.push('Förfallodatum saknas — ange fakturadatum och betalningsvillkor')
        const harRader = rader.some(r => r.beskrivning && r.antal && r.pris)
        if (!harRader) fel.push('Minst en fakturarad med beskrivning, antal och pris krävs')

        if (fel.length > 0) {
            setValideringsfel(fel)
            setAktivFlik('forhandsgranskning')
            return
        }

        // Kolla exportgräns
        if (anvandare) {
            const session = await supabase.auth.getSession()
            const userId = session.data.session?.user.id

            // Hämta eller skapa anvandare_info
            let { data: info } = await supabase
                .from('anvandare_info')
                .select('antal_exporterade, pro')
                .eq('user_id', userId)
                .single()

            if (!info) {
                await supabase.from('anvandare_info').insert({ user_id: userId, antal_exporterade: 0, pro: false })
                info = { antal_exporterade: 0, pro: false }
            }

            if (!info.pro && info.antal_exporterade >= 3) {
                setValideringsfel(['Du har nått gränsen på 3 gratis fakturor. Uppgradera till Pro för obegränsat antal.'])
                setAktivFlik('forhandsgranskning')
                return
            }

            // Räkna upp exporterade
            await supabase
                .from('anvandare_info')
                .update({ antal_exporterade: info.antal_exporterade + 1 })
                .eq('user_id', userId)
            setAntalExporterade(info.antal_exporterade + 1)

        } else {
            // Ej inloggad — kolla localStorage
            const antal = parseInt(localStorage.getItem('antal_exporterade') || '0')
            if (antal >= 3) {
                setValideringsfel(['Du har nått gränsen på 3 gratis fakturor. Skapa ett konto och uppgradera till Pro för obegränsat antal.'])
                setAktivFlik('forhandsgranskning')
                return
            }
            localStorage.setItem('antal_exporterade', String(antal + 1))
            setAntalExporterade(antal + 1)
        }

        setValideringsfel([])
        skrivUt()
    }

    const synligaRader = rader.filter(rad => rad.beskrivning || rad.antal || rad.pris)
    const subtotal = synligaRader.reduce((sum, rad) => sum + (parseFloat(rad.antal) || 0) * (parseFloat(rad.pris) || 0), 0)
    const moms = subtotal * momssats
    const totalt = subtotal + moms

    function formateraSEK(nummer: number) {
        return nummer.toLocaleString('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' kr'
    }

    function visaNotis(text: string, typ: 'success' | 'error' = 'success') {
        setNotis({ text, typ })
        setTimeout(() => setNotis(null), 3000)
    }

    function Etikett({ text, obligatorisk }: { text: string, obligatorisk?: boolean }) {
        return (
            <label className="text-sm text-gray-500 flex items-center gap-1">
                {text}
                {obligatorisk
                    ? <span className="text-red-400 font-medium">*</span>
                    : <span className="text-gray-300 text-xs">(valfritt)</span>
                }
            </label>
        )
    }

    const Formular = (
        <div className="p-4 md:p-8 overflow-y-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Fakturagenerator</h1>
            <p className="text-gray-500 mt-2">Fyll i uppgifterna nedan</p>
            <p className="text-xs text-gray-400 mt-1"><span className="text-red-400">*</span> = obligatoriskt fält</p>

            <div className="mt-6 bg-white rounded-xl p-4 md:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Ditt företag</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Etikett text="Företagsnamn" obligatorisk />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="Ditt AB" value={faktura.mittForetag} onChange={(e) => uppdatera('mittForetag', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="Org.nummer" obligatorisk />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="556XXX-XXXX" value={faktura.mittOrgnr} onChange={(e) => uppdatera('mittOrgnr', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="Momsreg.nummer" obligatorisk />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="SE556XXXXXXXX01" value={faktura.mittMoms} onChange={(e) => uppdatera('mittMoms', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="Gatuadress" obligatorisk />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="Storgatan 1" value={faktura.mittAdress} onChange={(e) => uppdatera('mittAdress', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="Postnummer och ort" obligatorisk />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="123 45 Stockholm" value={faktura.mittPostort} onChange={(e) => uppdatera('mittPostort', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="Telefon" />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="070-123 45 67" value={faktura.mittTelefon} onChange={(e) => uppdatera('mittTelefon', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="E-post" />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="din@email.se" value={faktura.mittEpost} onChange={(e) => uppdatera('mittEpost', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="Vår referens" />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="Din kontaktperson" value={faktura.mittReferens} onChange={(e) => uppdatera('mittReferens', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="Betalningstyp" obligatorisk />
                        <select className="w-full border border-gray-200 rounded-lg p-2 mt-1" value={betalningstyp} onChange={(e) => setBetalningstyp(e.target.value)}>
                            <option value="bankgiro">Bankgiro</option>
                            <option value="plusgiro">Plusgiro</option>
                        </select>
                    </div>
                    <div>
                        <Etikett text={betalningstyp === 'bankgiro' ? 'Bankgironummer' : 'Plusgironummer'} obligatorisk />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder={betalningstyp === 'bankgiro' ? '1234-5678' : '12 34 56-7'} value={faktura.mittBankgiro} onChange={(e) => uppdatera('mittBankgiro', e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="mt-4 bg-white rounded-xl p-4 md:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Kund</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Etikett text="Kundnamn / Företag" obligatorisk />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="Kunden AB" value={faktura.kundNamn} onChange={(e) => uppdatera('kundNamn', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="Kundens org.nummer" />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="556XXX-XXXX" value={faktura.kundOrgnr} onChange={(e) => uppdatera('kundOrgnr', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="Gatuadress" />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="Kundgatan 1" value={faktura.kundAdress} onChange={(e) => uppdatera('kundAdress', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="Postnummer och ort" />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="654 32 Göteborg" value={faktura.kundPostort} onChange={(e) => uppdatera('kundPostort', e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <Etikett text="Er referens (kontaktperson hos kunden)" />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="Anna Svensson" value={faktura.kundReferens} onChange={(e) => uppdatera('kundReferens', e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="mt-4 bg-white rounded-xl p-4 md:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Fakturadetaljer</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Etikett text="Fakturanummer" obligatorisk />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" value={faktura.fakturaNummer} onChange={(e) => uppdatera('fakturaNummer', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="Fakturadatum" obligatorisk />
                        <input type="date" className="w-full border border-gray-200 rounded-lg p-2 mt-1" value={faktura.fakturaDatum} onChange={(e) => uppdatera('fakturaDatum', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="Förfallodatum" obligatorisk />
                        <input type="date" className="w-full border border-gray-200 rounded-lg p-2 mt-1 bg-gray-50 text-gray-400 cursor-not-allowed" value={faktura.forfalloDatum} readOnly />
                    </div>
                    <div>
                        <Etikett text="Betalningsvillkor (dagar)" obligatorisk />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" type="text" placeholder="30" value={faktura.betalningsvillkor} onChange={(e) => uppdatera('betalningsvillkor', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="OCR / Referensnummer" />
                        <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="t.ex. 20250001" value={faktura.ocr} onChange={(e) => uppdatera('ocr', e.target.value)} />
                    </div>
                    <div>
                        <Etikett text="Momssats" obligatorisk />
                        <select className="w-full border border-gray-200 rounded-lg p-2 mt-1" value={momssats} onChange={(e) => setMomssats(parseFloat(e.target.value))}>
                            <option value={0.25}>25%</option>
                            <option value={0.12}>12%</option>
                            <option value={0.06}>6%</option>
                            <option value={0}>0%</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-4 bg-white rounded-xl p-4 md:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Fakturarader</h2>
                <div className="grid grid-cols-12 gap-2 mb-2">
                    <div className="col-span-6 text-sm text-gray-500 flex items-center gap-1">Beskrivning <span className="text-red-400">*</span></div>
                    <div className="col-span-2 text-sm text-gray-500 flex items-center gap-1">Antal <span className="text-red-400">*</span></div>
                    <div className="col-span-3 text-sm text-gray-500 flex items-center gap-1">Pris (kr) <span className="text-red-400">*</span></div>
                    <div className="col-span-1"></div>
                </div>
                {rader.map((rad, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                        <input className="col-span-6 border border-gray-200 rounded-lg p-2" placeholder="Beskrivning" value={rad.beskrivning} onChange={(e) => uppdateraRad(index, 'beskrivning', e.target.value)} />
                        <input className="col-span-2 border border-gray-200 rounded-lg p-2" type="text" placeholder="1" value={rad.antal} onChange={(e) => uppdateraRad(index, 'antal', e.target.value)} />
                        <input className="col-span-3 border border-gray-200 rounded-lg p-2" type="text" placeholder="0" value={rad.pris} onChange={(e) => uppdateraRad(index, 'pris', e.target.value)} />
                        <button className="col-span-1 text-red-400 hover:text-red-600" onClick={() => taBortRad(index)}>✕</button>
                    </div>
                ))}
                <button className="mt-2 text-sm text-blue-500 hover:text-blue-700" onClick={laggTillRad}>+ Lägg till rad</button>
                <div className="mt-6 border-t pt-4 text-right">
                    <p className="text-gray-500 text-sm">Subtotal: {formateraSEK(subtotal)}</p>
                    <p className="text-gray-500 text-sm">Moms ({Math.round(momssats * 100)}%): {formateraSEK(moms)}</p>
                    <p className="text-xl font-bold text-gray-800 mt-2">Totalt: {formateraSEK(totalt)}</p>
                </div>
            </div>

            <div className="mt-4 bg-white rounded-xl p-4 md:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Inställningar</h2>
                <div className="flex flex-col gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={fSkatt} onChange={(e) => setFSkatt(e.target.checked)} className="w-4 h-4" />
                        <span className="text-sm text-gray-600">Visa F-skattsedel på fakturan</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={drojsmal} onChange={(e) => setDrojsmal(e.target.checked)} className="w-4 h-4" />
                        <span className="text-sm text-gray-600">Visa dröjsmålsränta på fakturan</span>
                    </label>
                    <div>
                        <label className="text-sm text-gray-500">Accentfärg på fakturan</label>
                        <div className="flex items-center gap-3 mt-1">
                            <input type="color" value={accentFarg} onChange={(e) => setAccentFarg(e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
                            <span className="text-sm text-gray-400">{accentFarg}</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Företagslogga <span className="text-gray-300 text-xs">(max 2MB)</span></label>
                        <div className="mt-1 flex items-center gap-3">
                            <button onClick={() => loggaRef.current?.click()} className="text-sm border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50">
                                {logga ? 'Byt logga' : 'Ladda upp logga'}
                            </button>
                            {logga && (
                                <button onClick={() => setLogga(null)} className="text-sm text-red-400 hover:text-red-600">Ta bort</button>
                            )}
                            <input ref={loggaRef} type="file" accept="image/*" className="hidden" onChange={laddaUppLogga} />
                        </div>
                        {logga && <img src={logga} alt="Logga" className="mt-2 max-h-20 max-w-48 object-contain" />}
                    </div>
                </div>
            </div>

            <div className="mt-4 bg-white rounded-xl p-4 md:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Meddelande <span className="text-gray-300 text-xs font-normal">(valfritt)</span></h2>
                <textarea
                    className="w-full border border-gray-200 rounded-lg p-2"
                    rows={3}
                    placeholder="T.ex. Tack för din beställning!"
                    value={faktura.meddelande}
                    onChange={(e) => uppdatera('meddelande', e.target.value)}
                />
            </div>

            <div className="mt-4 flex gap-2 pb-8">
                {anvandare ? (
                    <button onClick={sparaTillSupabase} className="flex-1 border border-gray-200 bg-white text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        {oppetFakturaId ? 'Uppdatera faktura' : 'Spara faktura'}
                    </button>
                ) : (
                    <button onClick={sparaManuellt} className="flex-1 border border-gray-200 bg-white text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                        {sparadMeddelande || 'Spara utkast'}
                    </button>
                )}
                <button onClick={rensaAllt} className="flex-1 border border-gray-200 bg-white text-gray-500 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                    Ny faktura
                </button>
            </div>
        </div>
    )

    const Forhandsgranskning = (
        <div className="p-4 md:p-8 overflow-y-auto">
            {laddatExporterade && antalExporterade < 3 && (
                <p className="text-xs text-gray-400 mb-2">
                    {3 - antalExporterade} av 3 gratis exporteringar kvar
                </p>
            )}
            <button onClick={valideraOchExportera} className="mb-4 w-full md:w-auto bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
                Exportera som PDF
            </button>

            {valideringsfel.length > 0 && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-sm font-medium text-red-600 mb-2">Fyll i följande innan du exporterar:</p>
                    <ul className="flex flex-col gap-1">
                        {valideringsfel.map((fel, i) => (
                            <li key={i} className="text-sm text-red-500">• {fel}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="overflow-hidden">
                <div
                    ref={forhandsvisningRef}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                    style={{
                        transform: erMobil ? 'scale(0.55)' : 'scale(1)',
                        transformOrigin: 'top left',
                        width: erMobil ? '182%' : '100%',
                    }}
                >
                    <style>{`@media (max-width: 768px) { :root { --faktura-scale: 0.55; } }`}</style>
                    <div style={{ backgroundColor: accentFarg }} className="h-2 w-full" />
                    <div className="p-6 md:p-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                {logga && <img src={logga} alt="Logga" className="max-h-20 max-w-48 object-contain mb-2" />}
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Faktura</h2>
                                <p className="text-gray-400 mt-1">#{faktura.fakturaNummer}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-800 text-sm md:text-base">{faktura.mittForetag || '—'}</p>
                                {faktura.mittAdress && <p className="text-xs md:text-sm text-gray-500">{faktura.mittAdress}</p>}
                                {faktura.mittPostort && <p className="text-xs md:text-sm text-gray-500">{faktura.mittPostort}</p>}
                                {faktura.mittTelefon && <p className="text-xs md:text-sm text-gray-500">{faktura.mittTelefon}</p>}
                                {faktura.mittEpost && <p className="text-xs md:text-sm text-gray-500">{faktura.mittEpost}</p>}
                            </div>
                        </div>

                        <div className="flex justify-between mb-8">
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Faktureras till</p>
                                <p className="font-medium text-gray-800 text-sm md:text-base">{faktura.kundNamn || '—'}</p>
                                {faktura.kundOrgnr && <p className="text-xs md:text-sm text-gray-500">Org.nr: {faktura.kundOrgnr}</p>}
                                {faktura.kundAdress && <p className="text-xs md:text-sm text-gray-500">{faktura.kundAdress}</p>}
                                {faktura.kundPostort && <p className="text-xs md:text-sm text-gray-500">{faktura.kundPostort}</p>}
                                {faktura.kundReferens && <p className="text-xs md:text-sm text-gray-500">Er ref: {faktura.kundReferens}</p>}
                                {faktura.mittReferens && <p className="text-xs md:text-sm text-gray-500">Vår ref: {faktura.mittReferens}</p>}
                            </div>
                            <div className="text-right">
                                <div className="mb-3">
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Fakturadatum</p>
                                    <p className="text-xs md:text-sm font-medium text-gray-700 mt-1">{formateraDatum(faktura.fakturaDatum)}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Förfallodatum</p>
                                    <p className="text-xs md:text-sm font-bold mt-1" style={{ color: accentFarg }}>{formateraDatum(faktura.forfalloDatum)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Betalningsvillkor</p>
                                    <p className="text-xs md:text-sm font-medium text-gray-700 mt-1">{faktura.betalningsvillkor} dagar netto</p>
                                </div>
                            </div>
                        </div>

                        <table className="w-full mb-6">
                            <thead>
                                <tr style={{ borderBottomColor: accentFarg }} className="border-b-2">
                                    <th className="text-left text-xs text-gray-400 uppercase tracking-wide pb-2">Beskrivning</th>
                                    <th className="text-center text-xs text-gray-400 uppercase tracking-wide pb-2">Antal</th>
                                    <th className="text-right text-xs text-gray-400 uppercase tracking-wide pb-2">Á-pris</th>
                                    <th className="text-right text-xs text-gray-400 uppercase tracking-wide pb-2">Summa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {synligaRader.map((rad, index) => (
                                    <tr key={index} className="border-b border-gray-100">
                                        <td className="py-2 text-xs md:text-sm text-gray-700">{rad.beskrivning || '—'}</td>
                                        <td className="py-2 text-xs md:text-sm text-gray-700 text-center">{rad.antal || '0'}</td>
                                        <td className="py-2 text-xs md:text-sm text-gray-700 text-right">{formateraSEK(parseFloat(rad.pris) || 0)}</td>
                                        <td className="py-2 text-xs md:text-sm text-gray-700 text-right">{formateraSEK((parseFloat(rad.antal) || 0) * (parseFloat(rad.pris) || 0))}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-end mb-8">
                            <div className="w-full md:w-64">
                                <div className="flex justify-between text-sm text-gray-500 mb-1">
                                    <span>Subtotal</span>
                                    <span>{formateraSEK(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500 mb-1">
                                    <span>Moms ({Math.round(momssats * 100)}%)</span>
                                    <span>{formateraSEK(moms)}</span>
                                </div>
                                <div className="flex justify-between text-base md:text-lg font-bold text-gray-800 border-t-2 pt-2 mt-2" style={{ borderColor: accentFarg }}>
                                    <span>Totalt att betala</span>
                                    <span>{formateraSEK(totalt)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{betalningstyp === 'bankgiro' ? 'Bankgiro' : 'Plusgiro'}</p>
                                <p className="text-xs md:text-sm font-medium text-gray-800">{faktura.mittBankgiro || '—'}</p>
                            </div>
                            {faktura.ocr && (
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">OCR / Referens</p>
                                    <p className="text-xs md:text-sm font-medium text-gray-800">{faktura.ocr}</p>
                                </div>
                            )}
                            {faktura.mittOrgnr && (
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Org.nummer</p>
                                    <p className="text-xs md:text-sm font-medium text-gray-800">{faktura.mittOrgnr}</p>
                                </div>
                            )}
                            {faktura.mittMoms && (
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Momsreg.nr</p>
                                    <p className="text-xs md:text-sm font-medium text-gray-800">{faktura.mittMoms}</p>
                                </div>
                            )}
                        </div>

                        {(fSkatt || drojsmal) && (
                            <div className="mt-6 border-t border-gray-100 pt-4 flex flex-col gap-1">
                                {fSkatt && <p className="text-xs text-gray-400">Innehar F-skattsedel</p>}
                                {drojsmal && <p className="text-xs text-gray-400">Dröjsmålsränta debiteras enligt räntelagen (referensränta + 8%) vid försenad betalning.</p>}
                            </div>
                        )}

                        {faktura.meddelande && (
                            <div className="mt-4 border-t border-gray-100 pt-4">
                                <p className="text-sm text-gray-500 italic">{faktura.meddelande}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-100 px-6 py-3 flex justify-between items-center">
                <a href="/" className="font-semibold text-gray-900 text-sm tracking-tight">Fakturagenerator</a>
                <div className="flex items-center gap-4">
                    {anvandare ? (
                        <>
                            <a href="/mina-fakturor" className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden md:block">
                                Mina fakturor
                            </a>
                            <p className="text-xs text-gray-400 hidden md:block">{anvandare.email}</p>
                            <button
                                onClick={async () => { await supabase.auth.signOut(); setAnvandare(null) }}
                                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                Logga ut
                            </button>
                        </>
                    ) : (
                        <a href="/login?redirect=/faktura" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                            Logga in
                        </a>
                    )}
                </div>
            </nav>

            {notis && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg text-sm font-medium shadow-lg transition-all ${notis.typ === 'success' ? 'bg-gray-900 text-white' : 'bg-red-500 text-white'}`}>
                    {notis.text}
                </div>
            )}

            <div className="md:hidden sticky top-0 z-10 bg-white border-b border-gray-200 flex">
                <button
                    onClick={() => setAktivFlik('formular')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${aktivFlik === 'formular' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400'}`}
                >
                    Formulär
                </button>
                <button
                    onClick={() => setAktivFlik('forhandsgranskning')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${aktivFlik === 'forhandsgranskning' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400'}`}
                >
                    Förhandsgranskning
                </button>
            </div>

            <div className="md:hidden">
                {aktivFlik === 'formular' ? Formular : Forhandsgranskning}
            </div>

            <div className="hidden md:flex">
                <div className="w-1/2 overflow-y-auto h-screen">
                    {Formular}
                </div>
                <div className="w-1/2 bg-gray-100 overflow-y-auto h-screen">
                    <p className="text-sm text-gray-400 px-8 pt-8 mb-4 uppercase tracking-wide">Förhandsgranskning</p>
                    {Forhandsgranskning}
                </div>
            </div>
        </div>
    )
}