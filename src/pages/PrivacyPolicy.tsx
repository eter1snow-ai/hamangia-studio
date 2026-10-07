import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function PrivacyPolicy() {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="legal-policy-container mx-auto px-6 py-32 max-w-[800px] leading-relaxed">
        {language === 'ro' ? (
          <>
            <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3">
              Politică de Confidențialitate
            </h1>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-8 font-mono">
              Conform Regulamentului General privind Protecția Datelor (GDPR - Regulament UE 2016/679) // HAMANGIA STUDIO
            </p>

            <div className="h-px bg-neutral-800 my-8" />

            <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-sans">
              <p>
                Confidențialitatea datelor dumneavoastră cu caracter personal reprezintă o prioritate pentru <strong>HAMANGIA STUDIO</strong> (operatorul platformei <code>hamangiastudio.ro</code>). Acest document explică ce date colectăm, modul în care le utilizăm și drepturile de care beneficiați în calitate de vizitator sau cumpărător.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                1. Date Colectate &amp; Scopul Prelucrării
              </h2>
              <p>
                Colectăm exclusiv datele necesare onorării comenzilor și respectării obligațiilor fiscale:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li>
                  <strong>Date de identificare și contact:</strong> Nume, prenume, număr de telefon, adresă de email — utilizate pentru confirmarea comenzii, notificări AWB și asistență clienți.
                </li>
                <li>
                  <strong>Date de livrare:</strong> Adresă de domiciliu sau lockerul Sameday Easybox selectat — transmise curierului pentru expedierea coletului.
                </li>
                <li>
                  <strong>Date de facturare:</strong> Nume sau date firmă — transmise către serviciul de facturare Oblio pentru generarea automată a facturii fiscale și transmiterea în SPV (ANAF).
                </li>
                <li>
                  <strong>Date bancare și de plată:</strong> Nu stocăm niciodată datele complete ale cardului bancar. Toate plățile online sunt procesate securizat direct pe serverele criptate ale procesatorului autorizat <strong>Stripe</strong>.
                </li>
              </ul>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                2. Destinatarii Datelor (Procesatori Terți)
              </h2>
              <p>
                Pentru a asigura funcționarea tehnică a magazinului la standarde înalte, colaborăm cu parteneri de încredere care respectă normele GDPR:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-300">
                <li><strong>Supabase:</strong> Găzduire securizată a bazei de date în spațiul Uniunii Europene (Frankfurt, Germania).</li>
                <li><strong>Stripe Inc.:</strong> Procesare plăți electronice securizate.</li>
                <li><strong>Sameday Courier:</strong> Servicii de curierat și rețeaua Easybox.</li>
                <li><strong>Oblio Software:</strong> Serviciu autorizat de emitere facturi și transmitere e-Factura către ANAF.</li>
                <li><strong>Resend:</strong> Trimiterea automată a emailurilor tranzacționale de confirmare comandă.</li>
              </ul>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                3. Drepturile Dumneavoastră conform GDPR
              </h2>
              <p>
                Conform legislației europene, beneficiați de dreptul de acces la date, dreptul de rectificare, dreptul la ștergerea datelor („dreptul de a fi uitat”), dreptul la restricționarea prelucrării și dreptul de opoziție.
              </p>
              <p>
                Pentru exercitarea acestor drepturi, ne puteți transmite oricând o solicitare scrisă la adresa de email:{' '}
                <a href="mailto:contact@hamangiastudio.ro" className="underline text-white hover:text-neutral-300">
                  contact@hamangiastudio.ro
                </a>
                .
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-8 font-mono">
              In accordance with EU Regulation 2016/679 (GDPR) // HAMANGIA STUDIO
            </p>

            <div className="h-px bg-neutral-800 my-8" />

            <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-sans">
              <p>
                This Privacy Policy outlines how <strong>HAMANGIA STUDIO</strong> (operating <code>hamangiastudio.ro</code>) collects, uses, and safeguards personal data provided when using our website or placing orders.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                1. Data Collected
              </h2>
              <p>
                We collect personal information necessary to fulfill orders, issue legal fiscal invoices, and arrange delivery: name, email, phone number, and delivery locker/address details. Payment card data is processed directly and securely by Stripe; we never store your payment credentials.
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                2. Third-Party Service Providers
              </h2>
              <p>
                We work strictly with GDPR-compliant partners: Supabase (EU database hosting), Stripe (card payments), Sameday (courier logistics &amp; Easybox lockers), Oblio (e-Factura fiscal invoicing), and Resend (transactional email notifications).
              </p>

              <h2 className="text-base font-semibold uppercase tracking-wider text-white pt-4">
                3. Your Rights
              </h2>
              <p>
                Under the GDPR, you have the right to access, rectify, or request deletion of your personal data. Contact us at{' '}
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
