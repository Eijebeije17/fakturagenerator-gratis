'use client'

import { useState, useRef, useEffect } from 'react'
import { useReactToPrint } from 'react-to-print'

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

  const [rader, setRader] = useState([{ beskrivning: '', antal: '', pris: '' }])
  const [momssats, setMomssats] = useState(0.25)
  const [betalningstyp, setBetalningstyp] = useState('bankgiro')
  const [fSkatt, setFSkatt] = useState(true)
  const [drojsmal, setDrojsmal] = useState(true)
  const [logga, setLogga] = useState<string | null>(null)
  const [accentFarg, setAccentFarg] = useState('#1a2d6e')
  const [sparadMeddelande, setSparadMeddelande] = useState('')
  const [valideringsfel, setValideringsfel] = useState<string[]>([])
  const [aktivFlik, setAktivFlik] = useState<'formular' | 'forhandsgranskning'>('formular')
  const [erMobil, setErMobil] = useState(false)
  const [notis, setNotis] = useState<{ text: string, typ: 'success' | 'error' } | null>(null)

  const forhandsvisningRef = useRef(null)
  const loggaRef = useRef<HTMLInputElement>(null)
  const skrivUt = useReactToPrint({ contentRef: forhandsvisningRef })

  useEffect(() => {
    function kollaStorlek() { setErMobil(window.innerWidth < 768) }
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

  function laggTillRad() { setRader([...rader, { beskrivning: '', antal: '', pris: '' }]) }
  function taBortRad(index: number) { setRader(rader.filter((_, i) => i !== index)) }

  function laddaUppLogga(e: React.ChangeEvent<HTMLInputElement>) {
    const fil = e.target.files?.[0]
    if (!fil) return
    if (fil.size > 2 * 1024 * 1024) { visaNotis('Loggan är för stor. Max 2MB är tillåtet.', 'error'); return }
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
      const nummer = parseInt(delar[1])
      if (!isNaN(nummer)) return `${delar[0]}-${String(nummer + 1).padStart(delar[1].length, '0')}`
    }
    return nuvarande
  }

  function rensaAllt() {
    const nyttNummer = nyttFakturaNummer(faktura.fakturaNummer)
    localStorage.removeItem('faktura-utkast')
    setFaktura({
      mittForetag: faktura.mittForetag, mittOrgnr: faktura.mittOrgnr, mittMoms: faktura.mittMoms,
      mittAdress: faktura.mittAdress, mittPostort: faktura.mittPostort, mittTelefon: faktura.mittTelefon,
      mittEpost: faktura.mittEpost, mittBankgiro: faktura.mittBankgiro, mittReferens: faktura.mittReferens,
      kundNamn: '', kundOrgnr: '', kundAdress: '', kundPostort: '', kundReferens: '',
      fakturaNummer: nyttNummer, fakturaDatum: '', forfalloDatum: '',
      betalningsvillkor: faktura.betalningsvillkor, ocr: '', meddelande: '',
    })
    setRader([{ beskrivning: '', antal: '', pris: '' }])
    setValideringsfel([])
  }

  function valideraOchExportera() {
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
    if (!rader.some(r => r.beskrivning && r.antal && r.pris)) fel.push('Minst en fakturarad krävs')
    if (fel.length > 0) { setValideringsfel(fel); setAktivFlik('forhandsgranskning'); return }
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
      <label className="text-xs font-medium text-[#666] flex items-center gap-1 uppercase tracking-wide">
        {text}
        {obligatorisk
          ? <span className="text-red-400">*</span>
          : <span className="text-[#ccc] text-xs normal-case font-normal">(valfritt)</span>
        }
      </label>
    )
  }

  const inputKlass = "w-full border border-[#e0ddd4] rounded-lg p-2.5 mt-1 text-sm bg-white focus:outline-none focus:border-[#1a2d6e] transition-colors"

  const Formular = (
    <div className="p-4 md:p-8 overflow-y-auto" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h1 className="text-2xl md:text-3xl font-black text-[#1a2d6e]">Fakturagenerator</h1>
      <p className="text-[#888] mt-1 text-sm font-medium">Fyll i uppgifterna nedan</p>
      <p className="text-xs text-[#bbb] mt-1"><span className="text-red-400">*</span> = obligatoriskt fält</p>

      <div className="mt-6 bg-white rounded-2xl p-4 md:p-6 border border-[#e8e4d8]">
        <h2 className="text-sm font-black text-[#1a1a1a] mb-4 uppercase tracking-wide">Ditt företag</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Etikett text="Företagsnamn" obligatorisk /><input className={inputKlass} placeholder="Ditt AB" value={faktura.mittForetag} onChange={(e) => uppdatera('mittForetag', e.target.value)} /></div>
          <div><Etikett text="Org.nummer" obligatorisk /><input className={inputKlass} placeholder="556XXX-XXXX" value={faktura.mittOrgnr} onChange={(e) => uppdatera('mittOrgnr', e.target.value)} /></div>
          <div><Etikett text="Momsreg.nummer" obligatorisk /><input className={inputKlass} placeholder="SE556XXXXXXXX01" value={faktura.mittMoms} onChange={(e) => uppdatera('mittMoms', e.target.value)} /></div>
          <div><Etikett text="Gatuadress" obligatorisk /><input className={inputKlass} placeholder="Storgatan 1" value={faktura.mittAdress} onChange={(e) => uppdatera('mittAdress', e.target.value)} /></div>
          <div><Etikett text="Postnummer och ort" obligatorisk /><input className={inputKlass} placeholder="123 45 Stockholm" value={faktura.mittPostort} onChange={(e) => uppdatera('mittPostort', e.target.value)} /></div>
          <div><Etikett text="Telefon" /><input className={inputKlass} placeholder="070-123 45 67" value={faktura.mittTelefon} onChange={(e) => uppdatera('mittTelefon', e.target.value)} /></div>
          <div><Etikett text="E-post" /><input className={inputKlass} placeholder="din@email.se" value={faktura.mittEpost} onChange={(e) => uppdatera('mittEpost', e.target.value)} /></div>
          <div><Etikett text="Vår referens" /><input className={inputKlass} placeholder="Din kontaktperson" value={faktura.mittReferens} onChange={(e) => uppdatera('mittReferens', e.target.value)} /></div>
          <div>
            <Etikett text="Betalningstyp" obligatorisk />
            <select className={inputKlass} value={betalningstyp} onChange={(e) => setBetalningstyp(e.target.value)}>
              <option value="bankgiro">Bankgiro</option>
              <option value="plusgiro">Plusgiro</option>
            </select>
          </div>
          <div><Etikett text={betalningstyp === 'bankgiro' ? 'Bankgironummer' : 'Plusgironummer'} obligatorisk /><input className={inputKlass} placeholder={betalningstyp === 'bankgiro' ? '1234-5678' : '12 34 56-7'} value={faktura.mittBankgiro} onChange={(e) => uppdatera('mittBankgiro', e.target.value)} /></div>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-2xl p-4 md:p-6 border border-[#e8e4d8]">
        <h2 className="text-sm font-black text-[#1a1a1a] mb-4 uppercase tracking-wide">Kund</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Etikett text="Kundnamn / Företag" obligatorisk /><input className={inputKlass} placeholder="Kunden AB" value={faktura.kundNamn} onChange={(e) => uppdatera('kundNamn', e.target.value)} /></div>
          <div><Etikett text="Kundens org.nummer" /><input className={inputKlass} placeholder="556XXX-XXXX" value={faktura.kundOrgnr} onChange={(e) => uppdatera('kundOrgnr', e.target.value)} /></div>
          <div><Etikett text="Gatuadress" /><input className={inputKlass} placeholder="Kundgatan 1" value={faktura.kundAdress} onChange={(e) => uppdatera('kundAdress', e.target.value)} /></div>
          <div><Etikett text="Postnummer och ort" /><input className={inputKlass} placeholder="654 32 Göteborg" value={faktura.kundPostort} onChange={(e) => uppdatera('kundPostort', e.target.value)} /></div>
          <div className="md:col-span-2"><Etikett text="Er referens" /><input className={inputKlass} placeholder="Anna Svensson" value={faktura.kundReferens} onChange={(e) => uppdatera('kundReferens', e.target.value)} /></div>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-2xl p-4 md:p-6 border border-[#e8e4d8]">
        <h2 className="text-sm font-black text-[#1a1a1a] mb-4 uppercase tracking-wide">Fakturadetaljer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><Etikett text="Fakturanummer" obligatorisk /><input className={inputKlass} value={faktura.fakturaNummer} onChange={(e) => uppdatera('fakturaNummer', e.target.value)} /></div>
          <div><Etikett text="Fakturadatum" obligatorisk /><input type="date" className={inputKlass} value={faktura.fakturaDatum} onChange={(e) => uppdatera('fakturaDatum', e.target.value)} /></div>
          <div><Etikett text="Förfallodatum" obligatorisk /><input type="date" className={`${inputKlass} bg-[#fafaf8] text-[#aaa] cursor-not-allowed`} value={faktura.forfalloDatum} readOnly /></div>
          <div><Etikett text="Betalningsvillkor (dagar)" obligatorisk /><input className={inputKlass} type="text" placeholder="30" value={faktura.betalningsvillkor} onChange={(e) => uppdatera('betalningsvillkor', e.target.value)} /></div>
          <div><Etikett text="OCR / Referensnummer" /><input className={inputKlass} placeholder="t.ex. 20250001" value={faktura.ocr} onChange={(e) => uppdatera('ocr', e.target.value)} /></div>
          <div>
            <Etikett text="Momssats" obligatorisk />
            <select className={inputKlass} value={momssats} onChange={(e) => setMomssats(parseFloat(e.target.value))}>
              <option value={0.25}>25%</option>
              <option value={0.12}>12%</option>
              <option value={0.06}>6%</option>
              <option value={0}>0%</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-2xl p-4 md:p-6 border border-[#e8e4d8]">
        <h2 className="text-sm font-black text-[#1a1a1a] mb-4 uppercase tracking-wide">Fakturarader</h2>
        <div className="grid grid-cols-12 gap-2 mb-2">
          <div className="col-span-6 text-xs font-medium text-[#666] uppercase tracking-wide">Beskrivning <span className="text-red-400">*</span></div>
          <div className="col-span-2 text-xs font-medium text-[#666] uppercase tracking-wide">Antal <span className="text-red-400">*</span></div>
          <div className="col-span-3 text-xs font-medium text-[#666] uppercase tracking-wide">Pris (kr) <span className="text-red-400">*</span></div>
          <div className="col-span-1"></div>
        </div>
        {rader.map((rad, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 mb-2">
            <input className="col-span-6 border border-[#e0ddd4] rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#1a2d6e]" placeholder="Beskrivning" value={rad.beskrivning} onChange={(e) => uppdateraRad(index, 'beskrivning', e.target.value)} />
            <input className="col-span-2 border border-[#e0ddd4] rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#1a2d6e]" type="text" placeholder="1" value={rad.antal} onChange={(e) => uppdateraRad(index, 'antal', e.target.value)} />
            <input className="col-span-3 border border-[#e0ddd4] rounded-lg p-2.5 text-sm focus:outline-none focus:border-[#1a2d6e]" type="text" placeholder="0" value={rad.pris} onChange={(e) => uppdateraRad(index, 'pris', e.target.value)} />
            <button className="col-span-1 text-red-300 hover:text-red-500 transition-colors" onClick={() => taBortRad(index)}>✕</button>
          </div>
        ))}
        <button className="mt-2 text-xs font-bold text-[#1a2d6e] hover:text-[#2a3d8e] uppercase tracking-wide transition-colors" onClick={laggTillRad}>+ Lägg till rad</button>
        <div className="mt-6 border-t border-[#e8e4d8] pt-4 text-right">
          <p className="text-[#888] text-sm">Subtotal: {formateraSEK(subtotal)}</p>
          <p className="text-[#888] text-sm">Moms ({Math.round(momssats * 100)}%): {formateraSEK(moms)}</p>
          <p className="text-xl font-black text-[#1a2d6e] mt-2">Totalt: {formateraSEK(totalt)}</p>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-2xl p-4 md:p-6 border border-[#e8e4d8]">
        <h2 className="text-sm font-black text-[#1a1a1a] mb-4 uppercase tracking-wide">Inställningar</h2>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={fSkatt} onChange={(e) => setFSkatt(e.target.checked)} className="w-4 h-4 accent-[#1a2d6e]" />
            <span className="text-sm text-[#555] font-medium">Visa F-skattsedel på fakturan</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={drojsmal} onChange={(e) => setDrojsmal(e.target.checked)} className="w-4 h-4 accent-[#1a2d6e]" />
            <span className="text-sm text-[#555] font-medium">Visa dröjsmålsränta på fakturan</span>
          </label>
          <div>
            <label className="text-xs font-medium text-[#666] uppercase tracking-wide">Accentfärg på fakturan</label>
            <div className="flex items-center gap-3 mt-2">
              <input type="color" value={accentFarg} onChange={(e) => setAccentFarg(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-[#e0ddd4]" />
              <span className="text-sm text-[#aaa] font-medium">{accentFarg}</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#666] uppercase tracking-wide">Företagslogga <span className="text-[#ccc] text-xs normal-case font-normal">(max 2MB)</span></label>
            <div className="mt-2 flex items-center gap-3">
              <button onClick={() => loggaRef.current?.click()} className="text-xs font-bold border border-[#e0ddd4] rounded-lg px-3 py-2 hover:bg-[#f8f6f0] transition-colors uppercase tracking-wide text-[#555]">
                {logga ? 'Byt logga' : 'Ladda upp logga'}
              </button>
              {logga && <button onClick={() => setLogga(null)} className="text-xs text-red-400 hover:text-red-600 font-medium">Ta bort</button>}
              <input ref={loggaRef} type="file" accept="image/*" className="hidden" onChange={laddaUppLogga} />
            </div>
            {logga && <img src={logga} alt="Logga" className="mt-2 max-h-20 max-w-48 object-contain" />}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-2xl p-4 md:p-6 border border-[#e8e4d8]">
        <h2 className="text-sm font-black text-[#1a1a1a] mb-4 uppercase tracking-wide">Meddelande <span className="text-[#ccc] text-xs font-normal normal-case">(valfritt)</span></h2>
        <textarea className={`${inputKlass} resize-none`} rows={3} placeholder="T.ex. Tack för din beställning!" value={faktura.meddelande} onChange={(e) => uppdatera('meddelande', e.target.value)} />
      </div>

      <div className="mt-4 flex gap-2 pb-8">
        <button onClick={sparaManuellt} className="flex-1 border border-[#e0ddd4] bg-white text-[#555] px-4 py-3 rounded-full text-sm font-bold hover:bg-[#f8f6f0] transition-colors">
          {sparadMeddelande || 'Spara utkast'}
        </button>
        <button onClick={rensaAllt} className="flex-1 border border-[#e0ddd4] bg-white text-[#888] px-4 py-3 rounded-full text-sm font-bold hover:bg-[#f8f6f0] transition-colors">
          Ny faktura
        </button>
      </div>
    </div>
  )

  const Forhandsgranskning = (
    <div className="p-4 md:p-8 overflow-y-auto" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <button onClick={valideraOchExportera} className="mb-4 w-full md:w-auto bg-[#1a2d6e] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#2a3d8e] transition-colors">
        Exportera som PDF
      </button>

      {valideringsfel.length > 0 && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-sm font-bold text-red-600 mb-2">Fyll i följande innan du exporterar:</p>
          <ul className="flex flex-col gap-1">
            {valideringsfel.map((fel, i) => (
              <li key={i} className="text-sm text-red-500 font-medium">• {fel}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="overflow-hidden">
        <div
          ref={forhandsvisningRef}
          className="bg-white rounded-2xl border border-[#e8e4d8] overflow-hidden"
          style={{ transform: erMobil ? 'scale(0.55)' : 'scale(1)', transformOrigin: 'top left', width: erMobil ? '182%' : '100%' }}
        >
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
                <div className="flex justify-between text-sm text-gray-500 mb-1"><span>Subtotal</span><span>{formateraSEK(subtotal)}</span></div>
                <div className="flex justify-between text-sm text-gray-500 mb-1"><span>Moms ({Math.round(momssats * 100)}%)</span><span>{formateraSEK(moms)}</span></div>
                <div className="flex justify-between text-base md:text-lg font-bold text-gray-800 border-t-2 pt-2 mt-2" style={{ borderColor: accentFarg }}>
                  <span>Totalt att betala</span><span>{formateraSEK(totalt)}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{betalningstyp === 'bankgiro' ? 'Bankgiro' : 'Plusgiro'}</p>
                <p className="text-xs md:text-sm font-medium text-gray-800">{faktura.mittBankgiro || '—'}</p>
              </div>
              {faktura.ocr && <div><p className="text-xs text-gray-400 uppercase tracking-wide mb-1">OCR / Referens</p><p className="text-xs md:text-sm font-medium text-gray-800">{faktura.ocr}</p></div>}
              {faktura.mittOrgnr && <div><p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Org.nummer</p><p className="text-xs md:text-sm font-medium text-gray-800">{faktura.mittOrgnr}</p></div>}
              {faktura.mittMoms && <div><p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Momsreg.nr</p><p className="text-xs md:text-sm font-medium text-gray-800">{faktura.mittMoms}</p></div>}
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
    <div className="min-h-screen" style={{ fontFamily: 'Montserrat, sans-serif', background: 'linear-gradient(180deg, #eae6d8 0%, #f0ece0 30%, #f8f6f0 100%)' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');`}</style>

      {/* Navbar */}
      <nav className="px-5 md:px-10 py-4 md:py-5 flex justify-between items-center sticky top-0 z-50 border-b border-[#ddd8c4]" style={{ background: 'rgba(248, 246, 240, 0.95)', backdropFilter: 'blur(12px)' }}>
        <a href="/" className="font-black text-[#1a1a1a] text-base md:text-xl tracking-tight">FakturaFix</a>
      </nav>

      {notis && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-full text-sm font-bold shadow-lg transition-all ${notis.typ === 'success' ? 'bg-[#1a2d6e] text-white' : 'bg-red-500 text-white'}`}>
          {notis.text}
        </div>
      )}

      {/* Mobilflikar */}
      <div className="md:hidden sticky top-[57px] z-10 border-b border-[#ddd8c4] flex" style={{ background: 'rgba(248, 246, 240, 0.95)', backdropFilter: 'blur(12px)' }}>
        <button onClick={() => setAktivFlik('formular')} className={`flex-1 py-3 text-[10px] font-black uppercase transition-colors ${aktivFlik === 'formular' ? 'text-[#1a2d6e] border-b-2 border-[#1a2d6e]' : 'text-[#aaa]'}`}>Formulär</button>
        <button onClick={() => setAktivFlik('forhandsgranskning')} className={`flex-1 py-3 text-[10px] font-black uppercase transition-colors ${aktivFlik === 'forhandsgranskning' ? 'text-[#1a2d6e] border-b-2 border-[#1a2d6e]' : 'text-[#aaa]'}`}>Förhandsgranskning</button>
      </div>

      <div className="md:hidden">
        {aktivFlik === 'formular' ? Formular : Forhandsgranskning}
      </div>

      <div className="hidden md:flex h-[calc(100vh-73px)]">
        <div className="w-1/2 overflow-y-auto">
          {Formular}
        </div>
        <div className="w-1/2 overflow-y-auto border-l border-[#ddd8c4]">
          <p className="text-xs font-black text-[#bbb] px-8 pt-8 mb-4 uppercase tracking-widest">Förhandsgranskning</p>
          {Forhandsgranskning}
        </div>
      </div>
    </div>
  )
}