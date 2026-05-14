export default function Integritetspolicy() {
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
          <h1 className="text-3xl md:text-4xl font-black text-[#1a2d6e] mb-2">Integritetspolicy</h1>
          <p className="text-sm text-[#aaa] font-medium mb-12">Senast uppdaterad: 14 maj 2026</p>

          <div className="flex flex-col gap-10">

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">1. Om denna policy</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium">
                Fakturagenerator ("vi", "oss", "tjänsten") värnar om din personliga integritet. Denna integritetspolicy förklarar hur vi samlar in, använder och skyddar dina personuppgifter när du använder vår tjänst. Tjänsten drivs i enlighet med EU:s dataskyddsförordning (GDPR).
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">2. Personuppgiftsansvarig</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium">
                Personuppgiftsansvarig för behandlingen av dina personuppgifter är den som driver Fakturagenerator. För frågor om hur vi hanterar dina personuppgifter, vänligen kontakta oss.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">3. Vilka uppgifter vi samlar in</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium mb-4">Vi samlar in följande personuppgifter:</p>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium"><strong className="text-[#333]">E-postadress</strong> — används för inloggning och kommunikation med dig.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium"><strong className="text-[#333]">Fakturauppgifter</strong> — företagsnamn, adress, kunduppgifter och belopp som du fyller i vid skapande av fakturor.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium"><strong className="text-[#333]">Teknisk data</strong> — antal exporterade fakturor, för att administrera din användning av tjänsten.</p>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">4. Varför vi behandlar dina uppgifter</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium mb-4">Vi behandlar dina uppgifter för att:</p>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">Tillhandahålla och förbättra tjänsten</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">Hantera ditt konto och inloggning</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">Spara dina fakturor så att du kan komma åt dem igen</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">Administrera exportgränser för gratis- och Pro-användare</p>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">5. Hur länge vi sparar dina uppgifter</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium">
                Dina uppgifter sparas så länge du har ett aktivt konto hos oss. Om du väljer att radera ditt konto raderas alla dina personuppgifter och fakturor inom 30 dagar.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">6. Dina rättigheter</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium mb-4">Enligt GDPR har du rätt att:</p>
              <ul className="flex flex-col gap-3">
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">Begära tillgång till de uppgifter vi har om dig</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">Begära rättelse av felaktiga uppgifter</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">Begära radering av dina uppgifter</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-[#1a2d6e] font-black text-xs mt-0.5">→</span>
                  <p className="text-sm text-[#555] font-medium">Invända mot behandling av dina uppgifter</p>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">7. Tredjeparter</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium">
                Vi använder Supabase för lagring av data och autentisering. Supabase lagrar data på servrar inom EU och är GDPR-kompatibelt. Vi säljer aldrig dina personuppgifter till tredje part och använder dem inte för marknadsföring.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">8. Cookies</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium">
                Vi använder endast nödvändiga sessionskakor för att hantera din inloggning. Vi använder inga spårningscookies eller marknadsföringscookies.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#e8e4d8] p-6 md:p-8">
              <h2 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest mb-4">9. Kontakt</h2>
              <p className="text-sm text-[#555] leading-relaxed font-medium">
                Har du frågor om hur vi hanterar dina personuppgifter? Kontakta oss så hjälper vi dig.
              </p>
            </div>

          </div>

          <div className="mt-12 flex gap-6">
            <a href="/anvandarvillkor" className="text-xs font-bold text-[#1a2d6e] hover:text-[#2a3d8e] transition-colors uppercase tracking-wide">Användarvillkor</a>
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