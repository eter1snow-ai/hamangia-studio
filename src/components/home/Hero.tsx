import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[75vh] sm:min-h-[70vh] w-full items-end bg-black text-white overflow-hidden pt-28 pb-16"
    >
      {/* Background with Dark Woodcut Aura */}
      <img
        src="/Assets/Images/Hamangia/cavalerul-woodcut.png"
        alt="HAMANGIA Hero Woodcut"
        className="absolute inset-0 h-full w-full object-contain sm:object-cover object-right-top sm:object-center opacity-30 mix-blend-screen scale-105"
        style={{ filter: 'grayscale(100%) contrast(140%)' }}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
      />
      
      {/* Deep Brutalist Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 lg:px-12">
        <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1 mb-4 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-neutral-300 font-mono">
            DROP 01 // EXPEDITION TO THE ROOTS
          </p>
        </div>
        
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-none tracking-tight uppercase text-white">
          HAMANGIA
        </h1>

        <p className="mt-4 text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-400 font-mono">
          ARHAIC &amp; DARK FOLKLORE STREETWEAR
        </p>

        <p className="mt-6 max-w-[560px] text-sm leading-relaxed text-neutral-300 md:text-base">
          Atelier independent de creație textilă. Piese heavyweight 240 GSM cu croială boxy oversized, inspirate din gravură medievală și simetrii arhaice românești.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/drops"
            className="inline-flex border border-white bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-black transition-all hover:bg-transparent hover:text-white"
            style={{ borderRadius: 0 }}
          >
            EXPLOREAZĂ COLECȚIA
          </Link>
          <a
            href="#vitrina"
            className="inline-flex border border-white/30 bg-transparent px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-neutral-300 transition-all hover:border-white hover:text-white"
            style={{ borderRadius: 0 }}
          >
            PIESA EROU (189 RON)
          </a>
        </div>

        <div className="mt-8 flex items-center gap-6 text-[11px] font-mono text-neutral-400 tracking-wider">
          <span>✦ BUMBAC GREU 240 GSM</span>
          <span>✦ PRINT DTF 300 DPI</span>
          <span>✦ LIVRARE 24-48H EASYBOX</span>
        </div>
      </div>
    </section>
  )
}
