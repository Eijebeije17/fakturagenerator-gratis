export default function Anvandarvillkor() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');`}</style>
      <div className="min-h-screen" style={{ fontFamily: 'Montserrat, sans-serif', background: 'linear-gradient(180deg, #eae6d8 0%, #f0ece0 30%, #f8f6f0 100%)' }}>

        {/* Navbar */}
        <nav className="px-5 md:px-10 py-4 md:py-5 flex justify-between items-center sticky top-0 z-50 border-b border-[#ddd8c4]" style={{ background: 'rgba(248, 246, 240, 0.95)', backdropFilter: 'blur(12px)' }}>
          <a href="/" className="font-black text-[#1a1a1a] text-base md:text-xl tracking-tight">Fakturagenerator</a>
          <a href="/login" className="text-sm text-[#555] hover:text-[#1a2d6e] transition-colors font-medium">Logga in</a>
        </nav>

        <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <p className="text-xs text-[#aaa] uppercase tracking-[0.3em] mb-4 font-medium">Juridiskt</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#1a2d6e] mb-2">Användarvillkor</h1>
          <p className="text-sm text-[#aaa] font-medium mb-12">Senast uppdaterad: 14 maj 2026</p>

          <div className="flex flex-col gap-10">

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">1. Acceptans av villkor</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium">
                Genom att använda Fakturagenerator godkänner du dessa användarvillkor. Om du inte godkänner villkoren ska du inte använda tjänsten. Vi förbehåller oss rätten att uppdatera villkoren — fortsatt användning efter ändringar innebär att du godkänner de nya villkoren.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">2. Tjänsten</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium">
                Fakturagenerator är ett webbaserat verktyg för att skapa, förhandsgranska och exportera fakturor. Tjänsten erbjuds som den är och vi garanterar inte att den alltid är tillgänglig utan avbrott. Vi förbehåller oss rätten att ändra, begränsa eller avsluta tjänsten när som helst.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">3. Ditt konto</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium mb-4">
                För att spara fakturor behöver du skapa ett konto. Du ansvarar för att:
              </p>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">Hålla dina inloggningsuppgifter säkra och inte dela dem med andra</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">Att uppgifterna du registrerar är korrekta</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">All aktivitet som sker under ditt konto</p>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">4. Användning av tjänsten</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium mb-4">
                Du får använda tjänsten för lagliga ändamål. Det är inte tillåtet att:
              </p>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">Använda tjänsten för att skapa bedrägliga eller falska fakturor</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">Försöka kringgå tjänstens begränsningar eller säkerhetssystem</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">Använda tjänsten på ett sätt som skadar andra användare eller tjänsten</p>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">5. Gratis och Pro-plan</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium mb-4">
                Tjänsten erbjuds i två nivåer:
              </p>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium"><strong className="text-[#333]">Gratis</strong> — upp till 3 exporterade fakturor totalt.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium"><strong className="text-[#333]">Pro</strong> — obegränsat antal fakturor mot en månadsavgift. Priset kan ändras med 30 dagars varsel.</p>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">6. Ansvarsbegränsning</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium">
                Fakturagenerator tillhandahålls i befintligt skick. Vi ansvarar inte för fel i fakturor som skapats med tjänsten, ekonomiska förluster eller andra skador som uppstår till följd av användning av tjänsten. Du ansvarar själv för att de fakturor du skapar uppfyller gällande lagar och regler.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">7. Immateriella rättigheter</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium">
                Fakturagenerator och dess innehåll — inklusive design, kod och text — ägs av tjänstens upphovsman. Du får inte kopiera, reproducera eller distribuera tjänsten utan skriftligt tillstånd. Det innehåll du skapar i tjänsten — dina fakturor — äger du själv.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">8. Avslutande av konto</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium">
                Du kan när som helst sluta använda tjänsten. Vi förbehåller oss rätten att stänga av konton som bryter mot dessa villkor. Vid avslutande av konto raderas dina uppgifter i enlighet med vår integritetspolicy.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">9. Tillämplig lag</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium">
                Dessa villkor regleras av svensk lag. Eventuella tvister ska i första hand lösas genom dialog. Om en tvist inte kan lösas i godo ska den avgöras av svensk domstol.
              </p>
            </div>

          </div>

          <div className="mt-12 flex gap-6">
            <a href="/integritetspolicy" className="text-xs font-bold text-[#1a2d6e] hover:text-[#2a3d8e] transition-colors uppercase tracking-wide">Integritetspolicy</a>
            <a href="/" className="text-xs font-bold text-[#888] hover:text-[#1a2d6e] transition-colors uppercase tracking-wide">Tillbaka till startsidan</a>
          </div>
        </div>

        <footer className="border-t border-[#ddd8c4] px-6 md:px-10 py-6 md:py-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-sm font-black text-[#1a1a1a]">Fakturagenerator</p>
            <p className="text-xs text-[#aaa] font-medium">© 2026 — Byggd för svenska företagare</p>
          </div>
        </footer>

      </div>
    </>
  )
}