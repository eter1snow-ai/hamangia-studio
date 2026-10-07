import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function TrackOrder() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { language } = useLanguage()
  const isRo = language === 'ro'

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto px-6 py-32 md:py-40 max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-neutral-500 mb-3">
          {isRo ? 'LOGISTICĂ & EXPEDIȚIE // RO' : 'LOGISTICS & DISPATCH // RO'}
        </p>
        <h1 style={{ textTransform: 'uppercase', marginBottom: '12px', fontSize: '2.5rem', fontWeight: '400', letterSpacing: '0.08em' }}>
          {isRo ? 'Urmărește Comanda' : 'Track Your Order'}
        </h1>
        <p style={{ fontSize: '1rem', opacity: '0.8', marginBottom: '40px', lineHeight: '1.7' }}>
          {isRo ? (
            <>Fiecare piesă este produsă și verificată individual în atelierul local. După predarea coletului către Sameday, vei primi automat numărul de urmărire (AWB) prin email și SMS.</>
          ) : (
            <>Every piece is produced and inspected individually in our local workshop. Once handed over to Sameday courier, tracking details (AWB) are automatically sent via email and SMS.</>
          )}
        </p>

        <div style={{ height: '1px', backgroundColor: '#222222', margin: '40px 0' }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mb-16">
          <div className="border border-neutral-800 bg-neutral-950 p-6">
            <div className="text-2xl font-mono text-white mb-2">01</div>
            <h3 className="uppercase text-xs font-mono tracking-widest text-neutral-300 mb-2">
              {isRo ? 'Comandă Înregistrată' : 'Order Placed'}
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              {isRo ? 'Plata cu cardul sau opțiunea Ramburs este confirmată.' : 'Card payment or Cash on Delivery option confirmed.'}
            </p>
          </div>

          <div className="border border-neutral-800 bg-neutral-950 p-6">
            <div className="text-2xl font-mono text-white mb-2">02</div>
            <h3 className="uppercase text-xs font-mono tracking-widest text-neutral-300 mb-2">
              {isRo ? 'Printare DTF & Calitate' : 'DTF Print & QA'}
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              {isRo ? 'Piesa din bumbac 240g este imprimată la 300 DPI și inspectată.' : 'The 240 GSM heavy cotton tee is printed at 300 DPI and inspected.'}
            </p>
          </div>

          <div className="border border-neutral-800 bg-neutral-950 p-6">
            <div className="text-2xl font-mono text-white mb-2">03</div>
            <h3 className="uppercase text-xs font-mono tracking-widest text-neutral-300 mb-2">
              {isRo ? 'Livrare Sameday' : 'Sameday Dispatch'}
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              {isRo ? '24-48h către Easybox-ul ales sau livrare la adresă prin curier.' : '24-48h to your chosen Easybox locker or doorstep delivery.'}
            </p>
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: '#222222', margin: '40px 0' }} />

        <div className="border border-neutral-800 bg-neutral-950 p-8 my-10">
          <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-300 mb-3">
            {isRo ? 'Găsire AWB & Asistență' : 'AWB Lookup & Support'}
          </h4>
          <p className="text-sm text-neutral-400 leading-relaxed mb-4">
            {isRo ? (
              <>Dacă nu ai primit notificarea de expediție în termen de 2–3 zile lucrătoare de la plasarea comenzii, verifică folderul Spam sau contactează direct atelierul.</>
            ) : (
              <>If you have not received your dispatch notification within 2–3 business days of placing your order, please check your Spam folder or contact the studio directly.</>
            )}
          </p>
          <p className="text-xs font-mono text-neutral-500">
            Email:{' '}
            <a href="mailto:contact@hamangiastudio.ro" className="text-white underline hover:text-neutral-300">
              contact@hamangiastudio.ro
            </a>
          </p>
        </div>

        <div className="text-center mt-14">
          <Link 
            to="/drops" 
            className="inline-block px-10 py-3.5 border border-white text-white uppercase tracking-widest font-medium text-xs hover:bg-white hover:text-black transition-all duration-200"
            style={{ borderRadius: 0, textDecoration: 'none' }}
          >
            {isRo ? 'ÎNAPOI LA VITRINĂ →' : 'RETURN TO STORE →'}
          </Link>
        </div>

        <p className="mt-16 text-center text-xs font-mono uppercase tracking-[0.3em] text-neutral-600">
          HAMANGIA STUDIO — ARHAIC &amp; DARK FOLKLORE STREETWEAR
        </p>
      </div>
    </main>
  )
}
