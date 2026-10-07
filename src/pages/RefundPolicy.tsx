import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function RefundPolicy() {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="legal-policy-container mx-auto px-6 py-32 max-w-[800px] leading-relaxed">
        {language === 'ro' ? (
          <>
            <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3">
              Politică de Retur &amp; Rambursare
            </h1>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-8 font-mono">
              Conform legislației române (OUG nr. 34/2014) // HAMANGIA STUDIO
            </p>

            <div className="h-px bg-neutral-800 my-8" />

            <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-sans">
              <p>
                La <strong>HAMANGIA</strong>, ne dorim să fii pe deplin mulțumit de calitatea pieselor noastre din bumbac heavyweight de 240 GSM. Dacă un articol nu corespunde așteptărilor tale sau mărimea aleasă nu este potrivită, ai dreptul legal de a returna produsele comandate în termen de <strong>14 zile calendaristice</strong> de la primirea coletului, fără a fi nevoit să justifici decizia.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                1. Condiții de Acceptare a Returului
              </h2>
              <p>
                Pentru ca returul să fie aprobat, produsele trebuie să îndeplinească următoarele criterii:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>Articolul nu a fost purtat, spălat, parfumat sau deteriorat.</li>
                <li>Etichetele originale sunt intacte și atașate produsului.</li>
                <li>Produsul este trimis în ambalajul original sau într-un ambalaj protector corespunzător.</li>
              </ul>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                2. Procedura de Inițiere a Returului
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-neutral-300">
                <li>
                  Trimiteți un email la{' '}
                  <a href="mailto:contact@hamangiastudio.ro" className="underline text-white hover:text-neutral-300">
                    contact@hamangiastudio.ro
                  </a>{' '}
                  cu subiectul <em>„Retur Comanda #[număr_comandă]”</em>.
                </li>
                <li>Specificați numele complet, numărul comenzii și contul IBAN (în cazul comenzilor plătite ramburs).</li>
                <li>Echipa noastră vă va transmite adresa atelierului pentru expedierea coletului de retur prin curier.</li>
              </ol>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                3. Costul Transportului de Retur
              </h2>
              <p>
                Cheltuielile directe de returnare a produselor revin în sarcina cumpărătorului, cu excepția cazurilor în care produsul a fost livrat greșit sau prezintă defecte de fabricație (caz în care HAMANGIA suportă integral costul de transport tur-retur).
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                4. Rambursarea Banilor
              </h2>
              <p>
                După recepționarea și verificarea conformității produselor în atelier, contravaloarea comenzii va fi restituită în maximum <strong>14 zile calendaristice</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>Pentru plăți cu cardul (Stripe): restituire automată pe cardul inițial.</li>
                <li>Pentru comenzi cu plată ramburs: virament bancar direct în contul IBAN specificat de dumneavoastră.</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3">
              Refund &amp; Return Policy
            </h1>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-8 font-mono">
              In accordance with Romanian EU regulations (GEO 34/2014) // HAMANGIA STUDIO
            </p>

            <div className="h-px bg-neutral-800 my-8" />

            <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-sans">
              <p>
                At <strong>HAMANGIA</strong>, we stand behind the durability and craft of our 240 GSM heavyweight garments. Under Romanian and EU consumer law, you have the right to withdraw from the contract within <strong>14 calendar days</strong> of receiving your goods.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                1. Eligibility for Returns
              </h2>
              <p>
                To qualify for a full refund, items must be unworn, unwashed, unaltered, and returned in their original condition with all tags attached.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                2. How to Request a Return
              </h2>
              <p>
                Please email our support team at{' '}
                <a href="mailto:contact@hamangiastudio.ro" className="underline text-white hover:text-neutral-300">
                  contact@hamangiastudio.ro
                </a>{' '}
                with your order number and request. We will provide full return shipment instructions.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                3. Refund Processing
              </h2>
              <p>
                Refunds are processed within 14 calendar days following inspection of the returned garment, credited back to the original payment method or designated bank account.
              </p>
            </div>
          </>
        )}

        <div className="h-px bg-neutral-800 my-10" />

        <div className="text-center">
          <Link
            to="/drops"
            className="inline-flex border border-neutral-700 bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-neutral-300 hover:border-white hover:text-white transition-colors"
          >
            {language === 'ro' ? '← Înapoi la Colecție' : '← Back to Collection'}
          </Link>
        </div>
      </div>
    </main>
  )
}
