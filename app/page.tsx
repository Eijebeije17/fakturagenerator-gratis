export default function Startsida() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');`}</style>
      <div className="min-h-screen" style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: '#FDFBD4' }}>
        {/* Navbar */}
        <nav className="px-5 md:px-10 py-4 md:py-5 flex justify-between items-center sticky top-0 z-50 border-b border-[#e8e4a0]" style={{ background: 'rgba(253, 251, 212, 0.95)', backdropFilter: 'blur(12px)' }}>
          <p className="text-[#CE8946] font-black text-base md:text-xl tracking-tight">FakturaFix</p>
          <a href="/faktura" className="bg-[#CE8946] text-[#FDFBD4] text-xs md:text-sm font-bold px-4 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-[#b8773a] transition-colors whitespace-nowrap">
            Kom igång →
          </a>
        </nav>
        {/* Hero */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-8 overflow-hidden">
          <p className="text-xs text-[#BDB76B] uppercase tracking-[0.3em] mb-4 md:mb-6 font-medium">Svenska fakturor</p>
          <h1 className="text-[2rem] sm:text-[5rem] md:text-[8rem] font-black text-[#CE8946] leading-[0.95] tracking-tight mb-8 md:mb-12">
            ENKEL<br />FAKTURERING<br />SOM FUNGERAR.
          </h1>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8">
            <div className="max-w-sm">
              <p className="text-base md:text-lg text-[#BDB76B] leading-relaxed mb-6 md:mb-8 font-medium">
                Skapa korrekta svenska fakturor med förhandsgranskning i realtid. Exportera som PDF och skicka direkt till kunden.
              </p>
              <a href="/faktura" className="bg-[#CE8946] text-[#FDFBD4] px-7 py-4 rounded-full text-sm font-bold hover:bg-[#b8773a] transition-colors text-center inline-block">
                Skapa faktura gratis
              </a>
            </div>
            <p className="text-xs text-[#BDB76B] md:max-w-xs md:text-right leading-relaxed font-medium">
              Helt gratis · Inget konto krävs
            </p>
          </div>
        </div>
        {/* Separator */}
        <div className="border-y border-[#e8e4a0] py-4 md:py-5 my-6 md:my-8 overflow-hidden">
          <p className="text-xs text-[#BDB76B] uppercase tracking-[0.2em] md:tracking-[0.3em] text-center font-medium px-4">
            Förhandsgranskning &nbsp;·&nbsp; PDF-export &nbsp;·&nbsp; F-skatt &nbsp;·&nbsp; Moms &nbsp;·&nbsp; Bankgiro &nbsp;·&nbsp; GDPR
          </p>
        </div>
        {/* Funktioner */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-12 md:mb-16 gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#CE8946]">Allt du behöver<br />för att fakturera.</h2>
            <p className="text-sm text-[#BDB76B] md:max-w-xs leading-relaxed md:pt-2 font-medium">Ett enkelt verktyg anpassat för svenska företagare och frilansare.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-10 md:gap-y-14">
            {[
              { nr: '01', titel: 'Förhandsgranskning', text: 'Se exakt hur fakturan ser ut medan du fyller i uppgifterna.' },
              { nr: '02', titel: 'PDF-export', text: 'Exportera en professionell PDF med ett klick, redo att skicka.' },
              { nr: '03', titel: 'Svensk standard', text: 'F-skatt, moms och bankgiro — allt som krävs på en korrekt svensk faktura.' },
              { nr: '04', titel: 'Eget varumärke', text: 'Lägg till din logga och välj accentfärg för ett personligt intryck.' },
              { nr: '05', titel: 'Helt gratis', text: 'Inga konton, inga begränsningar. Använd hur mycket du vill.' },
              { nr: '06', titel: 'Säker lagring', text: 'Dina utkast sparas lokalt i webbläsaren — ingen data skickas till oss.' },
            ].map((f) => (
              <div key={f.nr} className="flex gap-5 items-start">
                <p className="text-3xl md:text-4xl font-black text-[#D4AF37] leading-none mt-1">{f.nr}</p>
                <div>
                  <h3 className="font-bold text-[#CE8946] mb-2 text-sm">{f.titel}</h3>
                  <p className="text-sm text-[#BDB76B] leading-relaxed font-medium">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* CTA */}
        <div className="bg-[#CE8946] mx-4 md:mx-10 mb-12 md:mb-16 rounded-3xl px-8 md:px-16 py-14 md:py-20 max-w-6xl lg:mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
            <div>
              <p className="text-xs text-[#D4AF37] uppercase tracking-[0.25em] mb-4 font-bold">Kom igång idag</p>
              <h2 className="text-3xl md:text-5xl font-black text-[#FDFBD4] leading-tight">Skapa din första<br />faktura på en minut.</h2>
            </div>
            <div className="md:text-right">
              <p className="text-[#D4AF37] mb-6 md:mb-8 text-sm leading-relaxed md:max-w-xs font-medium">Helt gratis. Inget konto krävs.</p>
              <a href="/faktura" className="bg-[#FDFBD4] text-[#CE8946] px-8 py-4 rounded-full text-sm font-black hover:bg-white transition-colors inline-block">
                Skapa faktura gratis →
              </a>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="border-t border-[#e8e4a0] px-6 md:px-10 py-6 md:py-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm font-black text-[#CE8946]">FakturaFix</p>
            <div className="flex gap-6 items-center">
              <a href="/om-oss" className="text-sm font-medium text-[#BDB76B] hover:text-[#CE8946] transition-colors">Om oss</a>
              <a href="/kontakt" className="text-sm font-medium text-[#BDB76B] hover:text-[#CE8946] transition-colors">Kontakt</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}