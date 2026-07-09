export default function Startsida() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');`}</style>
      <div className="min-h-screen" style={{ fontFamily: 'Montserrat, sans-serif', background: 'linear-gradient(180deg, #eae6d8 0%, #f0ece0 30%, #f8f6f0 100%)' }}>

        {/* Navbar */}
        <nav className="px-5 md:px-10 py-4 md:py-5 flex justify-between items-center sticky top-0 z-50 border-b border-[#ddd8c4]" style={{ background: 'rgba(248, 246, 240, 0.95)', backdropFilter: 'blur(12px)' }}>
          <p className="text-[#1a1a1a] font-black text-base md:text-xl tracking-tight">FakturaFix</p>
          <a href="/faktura" className="bg-[#1a2d6e] text-white text-xs md:text-sm font-bold px-4 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-[#2a3d8e] transition-colors whitespace-nowrap">
            Skapa faktura gratis →
          </a>
        </nav>

        {/* Hero */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-8 overflow-hidden">
          <p className="text-xs text-[#aaa] uppercase tracking-[0.3em] mb-4 md:mb-6 font-medium">Gratis fakturagenerator för svenska företag</p>
          <h1 className="text-[2rem] sm:text-[5rem] md:text-[8rem] font-black text-[#1a2d6e] leading-[0.95] tracking-tight mb-8 md:mb-12">
            SKAPA FAKTURA<br />GRATIS<br />PÅ EN MINUT.
          </h1>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8">
            <div className="max-w-sm">
              <p className="text-base md:text-lg text-[#555] leading-relaxed mb-6 md:mb-8 font-medium">
                Skapa faktura gratis online — anpassad för svenska frilansare, enskilda firmor och småföretag. Automatisk momsberäkning, F-skatt, bankgiro, Swish och PDF-export. Inget konto krävs.
              </p>
              <a href="/faktura" className="bg-[#1a2d6e] text-white px-10 py-5 rounded-full text-base md:text-lg font-black hover:bg-[#2a3d8e] transition-colors text-center inline-block shadow-lg">
                Skapa faktura gratis →
              </a>
              <p className="text-xs text-[#bbb] mt-4 font-medium">Helt gratis · Inget konto · Redo på en minut</p>
            </div>
            <div className="md:max-w-xs md:text-right">
              <p className="text-sm text-[#999] leading-relaxed font-medium">Används av svenska frilansare och företagare för att snabbt skapa professionella fakturor och offerter.</p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-y border-[#ddd8c4] py-4 md:py-5 my-6 md:my-8 overflow-hidden">
          <p className="text-xs text-[#bbb] uppercase tracking-[0.2em] md:tracking-[0.3em] text-center font-medium px-4">
            Förhandsgranskning &nbsp;·&nbsp; PDF-export &nbsp;·&nbsp; F-skatt &nbsp;·&nbsp; Moms &nbsp;·&nbsp; Bankgiro &nbsp;·&nbsp; Swish &nbsp;·&nbsp; ROT-avdrag &nbsp;·&nbsp; GDPR
          </p>
        </div>

        {/* Funktioner */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-12 md:mb-16 gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a]">Allt du behöver<br />för att fakturera.</h2>
            <p className="text-sm text-[#999] md:max-w-xs leading-relaxed md:pt-2 font-medium">En gratis fakturamall och fakturagenerator anpassad för svenska företagare, frilansare och enskilda firmor — helt utan konto eller registrering.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-10 md:gap-y-14">
            {[
              { nr: '01', titel: 'Förhandsgranskning i realtid', text: 'Se exakt hur fakturan ser ut medan du fyller i uppgifterna.' },
              { nr: '02', titel: 'PDF-export med ett klick', text: 'Exportera en professionell PDF direkt, redo att skicka till kunden.' },
              { nr: '03', titel: 'Svensk standard', text: 'F-skatt, moms, bankgiro och ROT-avdrag — allt som krävs på en korrekt svensk faktura.' },
              { nr: '04', titel: 'Swish QR-kod', text: 'Lägg till Swish som betalningsalternativ med automatisk QR-kod på fakturan.' },
              { nr: '05', titel: 'Helt gratis', text: 'Inga konton, inga begränsningar, inga dolda avgifter. Använd hur mycket du vill.' },
              { nr: '06', titel: 'Säker lagring', text: 'Dina utkast sparas lokalt i webbläsaren — ingen data skickas till oss.' },
            ].map((f) => (
              <div key={f.nr} className="flex gap-5 items-start">
                <p className="text-3xl md:text-4xl font-black text-[#ddd8c4] leading-none mt-1">{f.nr}</p>
                <div>
                  <h3 className="font-bold text-[#1a1a1a] mb-2 text-sm">{f.titel}</h3>
                  <p className="text-sm text-[#999] leading-relaxed font-medium">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#1a2d6e] mx-4 md:mx-10 mb-12 md:mb-16 rounded-3xl px-8 md:px-16 py-14 md:py-20 max-w-6xl lg:mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
            <div>
              <p className="text-xs text-[#6a7aae] uppercase tracking-[0.25em] mb-4 font-bold">Kom igång idag — helt gratis</p>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">Skapa din första<br />faktura på en minut.</h2>
            </div>
            <div className="md:text-right">
              <p className="text-[#7a8abe] mb-6 md:mb-8 text-sm leading-relaxed md:max-w-xs font-medium">Ingen registrering. Ingen betalning. Bara en enkel fakturagenerator som fungerar.</p>
              <a href="/faktura" className="bg-[#f0ece0] text-[#1a2d6e] px-8 py-4 rounded-full text-sm font-black hover:bg-white transition-colors inline-block">
                Skapa faktura gratis →
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#ddd8c4] px-6 md:px-10 py-6 md:py-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm font-black text-[#1a1a1a]">FakturaFix</p>
            <div className="flex gap-6 items-center">
            </div>
          </div>
        </footer>

        {/* Sticky mobilknapp */}
        <div className="fixed bottom-0 left-0 right-0 p-4 md:hidden z-50" style={{ background: 'linear-gradient(0deg, rgba(248,246,240,1) 60%, rgba(248,246,240,0) 100%)' }}>
          <a href="/faktura" className="bg-[#1a2d6e] text-white w-full py-4 rounded-full text-sm font-black hover:bg-[#2a3d8e] transition-colors text-center block shadow-xl">
            Skapa faktura gratis →
          </a>
        </div>

      </div>
    </>
  )
}