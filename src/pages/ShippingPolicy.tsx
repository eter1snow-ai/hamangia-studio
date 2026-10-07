import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function ShippingPolicy() {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="legal-policy-container mx-auto px-6 py-32 max-w-[800px] leading-relaxed">
        {language === 'ro' ? (
          <>
            <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3">
              Politică de Livrare
            </h1>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-8 font-mono">
              Ultima actualizare: Octombrie 2026 // HAMANGIA STUDIO
            </p>

            <div className="h-px bg-neutral-800 my-8" />

            <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-sans">
              <p>
                Fiecare piesă <strong>HAMANGIA</strong> este imprimată la comandă (print-on-demand) într-un atelier partener din România, utilizând tehnologie DTF (Direct to Film) de înaltă definiție la 300 DPI pe bumbac heavyweight de 240 GSM. Acest proces elimină risipa textilă și garantează că fiecare articol este proaspăt finisat.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                1. Metode de Livrare &amp; Acoperire
              </h2>
              <p>
                Livrăm pe întreg teritoriul României prin două opțiuni principale:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>
                  <strong>Sameday Easybox:</strong> Livrare rapidă în cel mai apropiat locker selectat de dumneavoastră la finalizarea comenzii. Accesibil 24/7.
                </li>
                <li>
                  <strong>Curier Rapid la Adresă:</strong> Livrare direct la ușa dumneavoastră (domiciliu sau birou) pe teritoriul României.
                </li>
              </ul>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                2. Timpi de Producție și Livrare
              </h2>
              <p>
                • <strong>Timp de producție:</strong> 1 până la 2 zile lucrătoare (pregătire textil, print DTF și fixare termică).<br />
                • <strong>Timp de tranzit curier:</strong> 24 până la 48 de ore din momentul predării coletului către curier.<br />
                • <strong>Timp total estimat:</strong> 2 până la 4 zile lucrătoare de la plasarea comenzii până la livrare.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                3. Urmărirea Comenzii (AWB)
              </h2>
              <p>
                Imediat ce pachetul este predat curierului, veți primi un email automat de confirmare a expedierii, conținând numărul de AWB și link-ul direct de urmărire în timp real a coletului.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                4. Colet Deteriorat sau Întârzieri
              </h2>
              <p>
                În cazul rar în care coletul prezintă urme vizibile de deteriorare la recepție, vă rugăm să ne contactați în termen de 48 de ore la{' '}
                <a href="mailto:contact@hamangiastudio.ro" className="underline text-white hover:text-neutral-300">
                  contact@hamangiastudio.ro
                </a>{' '}
                atașând fotografii ale ambalajului și articolului. Vom expedia o piesă de schimb fără costuri suplimentare, conform{' '}
                <Link to="/refund-policy" className="underline text-white hover:text-neutral-300">
                  Politicii de Retur
                </Link>
                .
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3">
              Shipping Policy
            </h1>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-8 font-mono">
              Last updated: October 2026 // HAMANGIA STUDIO
            </p>

            <div className="h-px bg-neutral-800 my-8" />

            <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-sans">
              <p>
                Every <strong>HAMANGIA</strong> piece is crafted to order in a dedicated local print workshop in Romania, utilizing high-density 300 DPI DTF print technology on 240 GSM heavyweight cotton blanks.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                1. Delivery Options (Romania)
              </h2>
              <p>
                We deliver nationwide across Romania via two primary methods:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>
                  <strong>Sameday Easybox:</strong> Automated parcel lockers across Romania, accessible 24/7.
                </li>
                <li>
                  <strong>Door-to-Door Courier:</strong> Direct fast courier delivery to your specified shipping address.
                </li>
              </ul>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                2. Processing &amp; Delivery Times
              </h2>
              <p>
                • <strong>Production time:</strong> 1 to 2 business days.<br />
                • <strong>Courier transit:</strong> 24 to 48 hours within Romania.<br />
                • <strong>Total estimated timeframe:</strong> 2 to 4 business days from order placement.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                3. Tracking Your Order
              </h2>
              <p>
                As soon as the parcel is scanned by the courier, you will receive an automated dispatch notification containing your tracking code (AWB).
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                4. Contact &amp; Support
              </h2>
              <p>
                For any shipping inquiries, reach out to our team at{' '}
                <a href="mailto:contact@hamangiastudio.ro" className="underline text-white hover:text-neutral-300">
                  contact@hamangiastudio.ro
                </a>
                .
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
