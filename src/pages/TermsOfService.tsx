import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function TermsOfService() {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="legal-policy-container mx-auto px-6 py-32 max-w-[800px] leading-relaxed">
        {language === 'ro' ? (
          <>
            <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3">
              Termeni și Condiții
            </h1>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-8 font-mono">
              Ultima actualizare: Octombrie 2026 // HAMANGIA STUDIO (hamangiastudio.ro)
            </p>

            <div className="h-px bg-neutral-800 my-8" />

            <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-sans">
              <p>
                Prezentul document stabilește termenii și condițiile de utilizare a magazinului online <strong>hamangiastudio.ro</strong> și condițiile de achiziție a articolelor vestimentare comercializate de brandul <strong>HAMANGIA</strong>.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                1. Dispoziții Generale &amp; Identitate Brand
              </h2>
              <p>
                Site-ul <code>hamangiastudio.ro</code> este un atelier independent de creație textilă dedicat colecțiilor streetwear inspirate din arta gravurii medievale și folclorul arhaic românesc. Prin plasarea unei comenzi, confirmați că aveți vârsta de cel puțin 18 ani și acceptați integral acești termeni.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                2. Produse, Calitate &amp; Producție
              </h2>
              <p>
                Toate articolele noastre sunt confecționate din bumbac organic de înaltă densitate (heavyweight 240 GSM), croială boxy / oversized, și sunt imprimate prin tehnologie DTF (Direct to Film) la 300 DPI într-un atelier partener din România. Imaginile mock-up afișate pe site reflectă cu maximă fidelitate designul final, culorile putând varia minor în funcție de calibrarea ecranului dumneavoastră.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                3. Prețuri &amp; Modalități de Plată
              </h2>
              <p>
                Toate prețurile afișate pe site sunt exprimate în <strong>LEI (RON)</strong>. Cumpărătorul are la dispoziție două modalități de plată:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>
                  <strong>Plată online cu cardul (Stripe):</strong> Tranzacții securizate criptate 256-bit (Visa, Mastercard, Apple Pay, Google Pay). Fără comision suplimentar pentru cumpărător.
                </li>
                <li>
                  <strong>Plată Ramburs la Livrare:</strong> Plata se realizează în numerar sau cu cardul direct la curier sau la terminalul Easybox în momentul ridicării coletului.
                </li>
              </ul>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                4. Facturare Electronică (e-Factura)
              </h2>
              <p>
                La plasarea comenzii, se emite automat factura fiscală prin platforma integrată Oblio și este transmisă în sistemul național SPV (ANAF) conform legislației fiscale în vigoare din România. Factura în format PDF este transmisă automat clientului pe email.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                5. Proprietate Intelectuală
              </h2>
              <p>
                Toate drepturile de autor privind ilustrațiile xilogravate, elementele de design grafic, textele, fotografiile și logo-ul <strong>HAMANGIA</strong> sunt proprietatea exclusivă a HAMANGIA STUDIO. Copierea, reproducerea sau utilizarea lor comercială fără acord prealabil scris este strict interzisă.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                6. Legea Aplicabilă &amp; Litigii
              </h2>
              <p>
                Prezentul contract este guvernat de legislația din România. Eventualele divergențe se vor soluționa pe cale amiabilă sau, în caz contrar, de către instanțele judecătorești competente din România. De asemenea, consumatorii pot accesa platforma europeană SOL (Soluționarea Online a Litigiilor) sau serviciile ANPC.
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3">
              Terms of Service
            </h1>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-8 font-mono">
              Last updated: October 2026 // HAMANGIA STUDIO (hamangiastudio.ro)
            </p>

            <div className="h-px bg-neutral-800 my-8" />

            <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-sans">
              <p>
                These Terms of Service govern your purchase of garments and interactions on <strong>hamangiastudio.ro</strong>, operated by <strong>HAMANGIA STUDIO</strong>.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                1. General Provisions
              </h2>
              <p>
                HAMANGIA is an independent textile studio crafting archaic, woodcut-inspired streetwear for the Romanian market. All prices are listed in RON (Romanian Lei).
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                2. Payments &amp; Delivery
              </h2>
              <p>
                We accept card payments processed via Stripe and Cash on Delivery (COD) for orders delivered within Romania via Sameday Courier and Easybox lockers.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                3. Intellectual Property
              </h2>
              <p>
                All original woodcut graphics, designs, branding, and text are the exclusive intellectual property of HAMANGIA STUDIO.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                4. Applicable Law
              </h2>
              <p>
                These terms are governed by the laws of Romania and the European Union. Inquiries should be addressed to{' '}
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
