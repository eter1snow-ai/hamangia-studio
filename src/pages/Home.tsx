import Hero from '../components/home/Hero'
import ShowcaseRail from '../components/home/ShowcaseRail'
import { products } from '../data/drops'
import { Link, useLocation } from 'react-router-dom'
import ProductCard from '../components/shared/ProductCard'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCurrency } from '../context/CurrencyContext'
import { useLanguage } from '../context/LanguageContext'

export default function Home() {
  const location = useLocation()
  const { formatPrice } = useCurrency()
  const { language } = useLanguage()
  const isRo = language === 'ro'

  const heroProduct = products.find((p) => p.id === 'cavalerul-woodcut') || products[0]
  const lineProducts = products.filter((p) => p.id !== 'cavalerul-woodcut')

  const [nlEmail, setNlEmail] = useState('')
  const [nlSent, setNlSent] = useState(false)
  const [nlLoading, setNlLoading] = useState(false)

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nlEmail) return
    setNlLoading(true)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: nlEmail, type: 'newsletter', brand: 'HAMANGIA' }),
      })
      setNlSent(true)
    } catch {
      setNlSent(true)
    } finally {
      setNlLoading(false)
    }
  }

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location])

  return (
    <main className="bg-black text-white selection:bg-white selection:text-black">
      <Hero />

      {/* 1. PIESA EROU / HERO SHOWCASE */}
      <section id="vitrina" className="relative border-t border-neutral-900 bg-neutral-950 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[1300px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Visual Box */}
            <div className="lg:col-span-6 relative group">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-neutral-800 bg-black">
                <img
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  className="h-full w-full object-contain p-6 sm:p-10 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute top-4 left-4 border border-white/20 bg-black/80 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-300 backdrop-blur-sm">
                  {isRo ? 'PIESA EROU // VITRINĂ' : 'HERO PIECE // SHOWCASE'}
                </div>
                <div className="absolute bottom-4 right-4 bg-white text-black px-4 py-1.5 text-xs font-mono font-bold tracking-widest">
                  {formatPrice(heroProduct.priceUsd)}
                </div>
              </div>
            </div>

            {/* Details Box */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-neutral-500 mb-2">
                DROP 01 // WOODCUT MASTERPIECE
              </p>
              <h2 className="font-display text-2xl sm:text-4xl font-semibold uppercase tracking-tight text-white mb-4">
                {heroProduct.name}
              </h2>
              <p className="text-sm font-mono text-neutral-400 mb-6 leading-relaxed">
                {isRo ? heroProduct.tagline : 'Archival woodcut engraving. Boxy oversized heavyweight cotton.'}
              </p>
              <p className="text-sm text-neutral-300 leading-relaxed mb-8">
                {isRo ? heroProduct.description : 'Masterpiece tee inspired by medieval representations of Saint George slaying the dragon, reinterpreted with dark Romanian folklore and brutalist urban geometry. Built from 240 GSM heavy cotton with a boxy oversized drape.'}
              </p>

              {/* Specificații Tehnice */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-neutral-800 py-6 mb-8 text-xs font-mono text-neutral-400">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase text-neutral-600">{isRo ? 'Material' : 'Fabric'}</span>
                  <span className="text-neutral-200">{isRo ? '240 GSM Bumbac' : '240 GSM Cotton'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase text-neutral-600">{isRo ? 'Croială' : 'Cut'}</span>
                  <span className="text-neutral-200">Boxy Oversized</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase text-neutral-600">{isRo ? 'Tehnologie' : 'Method'}</span>
                  <span className="text-neutral-200">Print DTF 300 DPI</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={`/product/${heroProduct.id}`}
                  className="inline-flex items-center justify-center border border-white bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-black transition-all hover:bg-transparent hover:text-white"
                  style={{ borderRadius: 0 }}
                >
                  {isRo ? `COMANDĂ PIESA (${formatPrice(heroProduct.priceUsd)})` : `ORDER PIECE (${formatPrice(heroProduct.priceUsd)})`}
                </Link>
                <span className="text-xs font-mono text-neutral-500">
                  ✦ {isRo ? 'Livrare 24-48h Easybox & Curier' : '24-48h Sameday Delivery'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. VITRINA DERULANTĂ (Showcase Rail) */}
      <ShowcaseRail products={products} />

      <div className="border-t border-white/5" />

      {/* 3. PRODUSE DE LINIE / COLECȚIE (Grid de Produse) */}
      <section id="colectie" className="bg-black text-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1300px] px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.45em', color: '#888888', lineHeight: 1.6 }} className="uppercase mb-3 font-mono">
              {isRo ? 'DROP 01 // COLECȚIE COMPLETĂ' : 'DROP 01 // FULL COLLECTION'}
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 500, letterSpacing: '0.08em', lineHeight: 1.2, color: '#E6E6E6' }} className="uppercase mb-3 font-display">
              {isRo ? 'Motive Arhaice & Gravură' : 'Archaic Motifs & Engravings'}
            </h2>
            <p style={{ fontSize: '0.82rem', letterSpacing: '0.15em', lineHeight: 1.8, color: '#A8A8A8', maxWidth: '640px' }} className="mb-10 sm:mb-14">
              {isRo ? (
                <>Piese independente realizate din bumbac greu de 240g, imprimate DTF la rezoluție maximă. Forme geometrice arhaice, chilimuri vechi și simbolism ancestral.</>
              ) : (
                <>Independent pieces forged from 240 GSM heavy cotton, printed via high-definition DTF. Archaic geometric forms, antique kilims, and ancestral symbolism.</>
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
            {lineProducts.map((p) => (
              <ProductCard key={p.id} product={p} showPrice={true} className="w-full" />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/drops"
              className="inline-flex border border-white/30 bg-transparent px-8 py-3 text-xs font-semibold uppercase tracking-widest text-neutral-300 transition-all hover:border-white hover:text-white"
              style={{ borderRadius: 0 }}
            >
              {isRo ? `VEZI TOATE CELE ${products.length} PIESE` : `EXPLORE ALL ${products.length} PIECES`}
            </Link>
          </div>
        </div>
      </section>

      {/* 4. MANIFEST HAMANGIA */}
      <section className="border-t border-neutral-900 bg-neutral-950 py-20 text-white">
        <div className="mx-auto w-full max-w-[900px] px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-neutral-500 mb-4">
            {isRo ? 'MANIFEST // IDENTITATE BRUTĂ' : 'MANIFESTO // RAW IDENTITY'}
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-neutral-200 mb-6">
            {isRo ? 'Fără Kitsch. Fără Compromisuri.' : 'No Kitsch. No Compromise.'}
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-400 font-mono">
            {isRo ? (
              <>HAMANGIA reinterpretează rădăcinile ancestrale ale spațiului românesc prin prisma gravurii medievale și a rigorii geometrice. Exclusiv bumbac greu de 240 GSM, croieli boxy oversized și finisaje tactile durabile.</>
            ) : (
              <>HAMANGIA reinterprets the ancestral roots of the Romanian space through medieval woodcut engraving and geometric rigour. Strictly 240 GSM heavy cotton, boxy oversized cuts, and enduring tactile craft.</>
            )}
          </p>
        </div>
      </section>

      {/* 5. NEWSLETTER */}
      <section className="bg-black border-t border-white/5 py-20">
        <div className="mx-auto w-full px-6 flex flex-col items-center justify-center text-center max-w-[580px]">
          <p className="uppercase mb-4 font-mono text-[10px] tracking-[0.4em] text-neutral-500">
            {isRo ? 'ACCES EXCLUSIV // DROP-URI LIMITATE' : 'EXCLUSIVE ACCESS // LIMITED DROPS'}
          </p>
          <h2 className="uppercase mb-4 text-xl sm:text-2xl font-medium tracking-wider text-neutral-200">
            {isRo ? 'Fii Primul Informat' : 'Stay Ahead'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mb-8 leading-relaxed">
            {isRo ? (
              <>Abonează-te pentru a primi notificări despre lansările viitoare de colecții și tiraje scurte de atelier.</>
            ) : (
              <>Subscribe to receive transmissions regarding upcoming archival collections and short atelier runs.</>
            )}
          </p>

          {nlSent ? (
            <div className="border border-neutral-800 bg-neutral-900 p-4 text-xs font-mono text-neutral-300">
              {isRo ? '✦ Mulțumim. Ești înregistrat în cercul HAMANGIA.' : '✦ Thank you. You are registered in the HAMANGIA circle.'}
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="w-full flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={nlEmail}
                onChange={(e) => setNlEmail(e.target.value)}
                placeholder={isRo ? 'adresa@ta.ro' : 'your@email.com'}
                className="w-full sm:flex-1 border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                disabled={nlLoading}
                className="border border-white bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black hover:bg-neutral-200 transition-colors disabled:opacity-50"
              >
                {nlLoading ? '...' : (isRo ? 'ABONARE' : 'SUBSCRIBE')}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
