import { useLanguage } from '../../context/LanguageContext'

export default function BrandEssence() {
  const { language } = useLanguage()
  const isRo = language === 'ro'

  return (
    <section className="bg-neutral-950 text-white py-12 sm:py-16 lg:py-24 border-t border-neutral-900">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <h2 className="font-display text-lg sm:text-xl font-semibold leading-tight tracking-tight text-neutral-200 uppercase">
          {isRo ? 'Esență & Arhitectură Textilă' : 'Essence & Architecture'}
        </h2>
        <p className="mt-4 max-w-3xl text-sm md:text-base leading-relaxed text-neutral-300">
          {isRo ? (
            <>Simetrii geometrice arhaice, chilimuri vechi și gravură medievală în lemn. Fără clișee patriotice sau culori stridente. Piese grele de 240 GSM create cu reținere brutalistă pentru prezență urbană fără compromis.</>
          ) : (
            <>Archaic geometric symmetries, antique kilims, and medieval woodcuts. No nationalist cliches or vivid touristic flags. Heavyweight 240 GSM pieces built with brutalist restraint for uncompromising presence.</>
          )}
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border border-neutral-800 bg-black/60 px-6 py-8" style={{ borderRadius: 0 }}>
            <p className="text-xs font-mono font-medium uppercase tracking-[0.25em] text-neutral-400">
              {isRo ? '01 // Croială & Siluetă' : '01 // Cut & Silhouette'}
            </p>
            <p className="mt-3 text-sm text-neutral-200">
              {isRo ? 'Croială Boxy Oversized. Umeri căzuți, guler strâns întărit și cădere masivă.' : 'Boxy oversized cut. Dropped shoulders, reinforced ribbed collar, and substantial drape.'}
            </p>
          </div>
          <div className="border border-neutral-800 bg-black/60 px-6 py-8" style={{ borderRadius: 0 }}>
            <p className="text-xs font-mono font-medium uppercase tracking-[0.25em] text-neutral-400">
              {isRo ? '02 // Material Heavyweight' : '02 // Heavyweight Fabric'}
            </p>
            <p className="mt-3 text-sm text-neutral-200">
              {isRo ? 'Bumbac 100% pieptănat de 240 GSM. Densitate masivă, pre-shrunk, rezistent la uzură.' : '100% combed cotton 240 GSM. Substantial density, pre-shrunk, engineered for longevity.'}
            </p>
          </div>
          <div className="border border-neutral-800 bg-black/60 px-6 py-8" style={{ borderRadius: 0 }}>
            <p className="text-xs font-mono font-medium uppercase tracking-[0.25em] text-neutral-400">
              {isRo ? '03 // Finisaj & Detaliu' : '03 // Finish & Detail'}
            </p>
            <p className="mt-3 text-sm text-neutral-200">
              {isRo ? 'Print DTF de înaltă rezoluție la 300 DPI realizat în atelier local românesc.' : 'High-definition 300 DPI DTF print produced directly in our local Romanian workshop.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
