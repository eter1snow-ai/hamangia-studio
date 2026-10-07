import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/drops'
import ProductCard from '../components/shared/ProductCard'
import { useLanguage } from '../context/LanguageContext'
import { COLLECTION_TRANSLATIONS } from '../data/collectionTranslations'

export default function Heritage() {
  const { language } = useLanguage()
  const h = (COLLECTION_TRANSLATIONS[language] || COLLECTION_TRANSLATIONS.ro).heritage

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = language === 'ro' 
      ? 'To the Roots — Colecția Arhaică | HAMANGIA' 
      : 'To the Roots — Archaic Collection | HAMANGIA'
  }, [language])

  const rootsProducts = products.filter(
    (p) => p.category === 'individuals' || p.category === 'flagship'
  )

  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[520px] max-h-[850px] w-full overflow-hidden flex items-end">
        {/* Background Woodcut Banner */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.35 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            src="/Assets/Images/Hamangia/cavalerul-woodcut.png"
            alt="To the Roots Banner"
            className="h-full w-full object-contain sm:object-cover object-right sm:object-center filter grayscale contrast-125 pointer-events-none select-none"
          />
        </div>

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
        
        <div className="relative w-full p-6 sm:p-10 lg:p-16 z-10">
          <div className="mx-auto max-w-[1300px]">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
            >
              {h.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="mt-4 text-xs sm:text-sm uppercase tracking-[0.35em] text-neutral-300 font-mono drop-shadow-md"
            >
              {h.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Hairline Separator */}
      <div className="border-t border-white/10" />

      {/* Main Content */}
      <section className="mx-auto max-w-[1300px] px-6 lg:px-12 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 font-mono">
                {h.originLabel}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-[700px] space-y-8"
          >
            <p className="text-xl sm:text-2xl font-light leading-relaxed text-white italic">
              «{h.quote}»
            </p>

            <div className="space-y-6 text-neutral-300 leading-relaxed text-base sm:text-lg">
              <p>{h.p1}</p>
              <p>{h.p2}</p>
              <p>{h.p3}</p>
              <p>{h.p4}</p>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
                {h.footerNote}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roots Product Grid */}
      <section className="border-t border-white/10 py-20 sm:py-28 bg-neutral-950">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mb-14 text-center sm:text-left"
          >
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.45em', color: '#888888', lineHeight: 1.6 }} className="uppercase mb-3 font-mono">
              {h.heritageLine}
            </p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 500, letterSpacing: '0.06em', lineHeight: 1.2, color: '#E6E6E6' }} className="uppercase">
              {h.firstPieces}
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {rootsProducts.map((p) => (
              <ProductCard key={p.id} product={p} showPrice={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Story Link Section */}
      <section className="mx-auto max-w-[1300px] px-6 lg:px-12 py-20 border-t border-white/10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-mono">
          <Link to="/story" className="hover:text-white transition-colors">
            {h.originExists}
          </Link>
        </p>
      </section>
    </main>
  )
}
