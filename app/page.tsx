'use client'

import { useState } from 'react'

import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

export default function Home() {
  const [faktura, setFaktura] = useState({
    mittForetag: '',
    mittOrgnr: '',
    kundNamn: '',
    kundAdress: '',
    fakturaNummer: '2024-001',
    fakturaDatum: '',
    forfalloDatum: '',
  })

  const [rader, setRader] = useState([
    { beskrivning: '', antal: 1, pris: 0 }
  ])

  const forhandsvisningRef = useRef(null)
  const skrivUt = useReactToPrint({ contentRef: forhandsvisningRef })

  function uppdatera(falt: string, varde: string) {
    setFaktura({ ...faktura, [falt]: varde })
  }

  function uppdateraRad(index: number, falt: string, varde: string | number) {
    const nyaRader = [...rader]
    nyaRader[index][falt] = varde
    setRader(nyaRader)
  }

  function laggTillRad() {
    setRader([...rader, { beskrivning: '', antal: 1, pris: 0 }])
  }

  function taBortRad(index) {
    setRader(rader.filter((_, i) => i !== index))
  }

  const subtotal = rader.reduce((sum, rad) => sum + rad.antal * rad.pris, 0)
  const moms = subtotal * 0.25
  const totalt = subtotal + moms

  function formateraSEK(nummer) {
    return nummer.toLocaleString('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' kr'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Vänster — formulär */}
      <div className="w-1/2 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800">Fakturagenerator</h1>
        <p className="text-gray-500 mt-2">Fyll i uppgifterna nedan</p>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Ditt företag</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Företagsnamn</label>
              <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="Ditt AB" value={faktura.mittForetag} onChange={(e) => uppdatera('mittForetag', e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-gray-500">Org.nummer</label>
              <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="556XXX-XXXX" value={faktura.mittOrgnr} onChange={(e) => uppdatera('mittOrgnr', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Kund</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Kundnamn</label>
              <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="Kunden AB" value={faktura.kundNamn} onChange={(e) => uppdatera('kundNamn', e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-gray-500">Adress</label>
              <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" placeholder="Storgatan 1, Stockholm" value={faktura.kundAdress} onChange={(e) => uppdatera('kundAdress', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Fakturadetaljer</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-500">Fakturanummer</label>
              <input className="w-full border border-gray-200 rounded-lg p-2 mt-1" value={faktura.fakturaNummer} onChange={(e) => uppdatera('fakturaNummer', e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-gray-500">Fakturadatum</label>
              <input type="date" className="w-full border border-gray-200 rounded-lg p-2 mt-1" value={faktura.fakturaDatum} onChange={(e) => uppdatera('fakturaDatum', e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-gray-500">Förfallodatum</label>
              <input type="date" className="w-full border border-gray-200 rounded-lg p-2 mt-1" value={faktura.forfalloDatum} onChange={(e) => uppdatera('forfalloDatum', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Fakturarader</h2>
          <div className="grid grid-cols-12 gap-2 mb-2">
            <div className="col-span-6 text-sm text-gray-500">Beskrivning</div>
            <div className="col-span-2 text-sm text-gray-500">Antal</div>
            <div className="col-span-3 text-sm text-gray-500">Pris (kr)</div>
            <div className="col-span-1"></div>
          </div>
          {rader.map((rad, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 mb-2">
              <input className="col-span-6 border border-gray-200 rounded-lg p-2" placeholder="Beskrivning av tjänst" value={rad.beskrivning} onChange={(e) => uppdateraRad(index, 'beskrivning', e.target.value)} />
              <input className="col-span-2 border border-gray-200 rounded-lg p-2" type="number" value={rad.antal} onChange={(e) => uppdateraRad(index, 'antal', parseFloat(e.target.value))} />
              <input className="col-span-3 border border-gray-200 rounded-lg p-2" type="number" placeholder="0" value={rad.pris} onChange={(e) => uppdateraRad(index, 'pris', parseFloat(e.target.value))} />
              <button className="col-span-1 text-red-400 hover:text-red-600" onClick={() => taBortRad(index)}>✕</button>
            </div>
          ))}
          <button className="mt-2 text-sm text-blue-500 hover:text-blue-700" onClick={laggTillRad}>+ Lägg till rad</button>
          <div className="mt-6 border-t pt-4 text-right">
            <p className="text-gray-500 text-sm">Subtotal: {formateraSEK(subtotal)}</p>
            <p className="text-gray-500 text-sm">Moms (25%): {formateraSEK(moms)}</p>
            <p className="text-xl font-bold text-gray-800 mt-2">Totalt: {formateraSEK(totalt)}</p>
          </div>
        </div>
      </div>

      {/* Höger — förhandsvisning */}
      <div className="w-1/2 p-8 bg-gray-100 overflow-y-auto">
        <p className="text-sm text-gray-400 mb-4 uppercase tracking-wide">Förhandsvisning</p>

        <button
          onClick={() => skrivUt()}
          className="mb-4 bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
        >
          Exportera som PDF
        </button>

        <div ref={forhandsvisningRef} className="bg-white rounded-xl shadow-sm p-8">

          {/* Fakturahuvud */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Faktura</h2>
              <p className="text-gray-400 mt-1">#{faktura.fakturaNummer}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800">{faktura.mittForetag || 'Ditt företag'}</p>
              <p className="text-sm text-gray-500">{faktura.mittOrgnr}</p>
            </div>
          </div>

          {/* Datum */}
          <div className="flex gap-12 mb-8">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Fakturadatum</p>
              <p className="text-sm font-medium text-gray-700 mt-1">{faktura.fakturaDatum || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Förfallodatum</p>
              <p className="text-sm font-medium text-gray-700 mt-1">{faktura.forfalloDatum || '—'}</p>
            </div>
          </div>

          {/* Från / Till */}
          <div className="flex justify-between mb-8">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Från</p>
              <p className="font-medium text-gray-800">{faktura.mittForetag || '—'}</p>
              <p className="text-sm text-gray-500">{faktura.mittOrgnr}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Till</p>
              <p className="font-medium text-gray-800">{faktura.kundNamn || '—'}</p>
              <p className="text-sm text-gray-500">{faktura.kundAdress}</p>
            </div>
          </div>

          {/* Fakturarader */}
          <table className="w-full mb-6">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs text-gray-400 uppercase tracking-wide pb-2">Beskrivning</th>
                <th className="text-center text-xs text-gray-400 uppercase tracking-wide pb-2">Antal</th>
                <th className="text-right text-xs text-gray-400 uppercase tracking-wide pb-2">Á-pris</th>
                <th className="text-right text-xs text-gray-400 uppercase tracking-wide pb-2">Summa</th>
              </tr>
            </thead>
            <tbody>
              {rader.map((rad, index) => (
                <tr key={index} className="border-b border-gray-50">
                  <td className="py-2 text-sm text-gray-700">{rad.beskrivning || '—'}</td>
                  <td className="py-2 text-sm text-gray-700 text-center">{rad.antal}</td>
                  <td className="py-2 text-sm text-gray-700 text-right">{formateraSEK(rad.pris)}</td>
                  <td className="py-2 text-sm text-gray-700 text-right">{formateraSEK(rad.antal * rad.pris)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totaler */}
          <div className="flex flex-col items-end gap-1">
            <p className="text-sm text-gray-500">Subtotal: {formateraSEK(subtotal)}</p>
            <p className="text-sm text-gray-500">Moms (25%): {formateraSEK(moms)}</p>
            <p className="text-xl font-bold text-gray-800 mt-2 border-t pt-2">Totalt: {formateraSEK(totalt)}</p>
          </div>

        </div>
      </div>

    </div>
  )
}