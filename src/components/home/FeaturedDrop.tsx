import { featuredProducts } from '../../data/drops'
import ProductCard from '../shared/ProductCard'
import { useLanguage } from '../../context/LanguageContext'

export default function FeaturedDrop() {
  const { language } = useLanguage()
  const isRo = language === 'ro'

  return (
    <section id="drops" className="bg-neutral-950 text-white py-10 sm:py-16 lg:py-24 border-t border-neutral-900">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-neutral-500 mb-2">
              {isRo ? 'DROP 01 // SELECȚIE' : 'DROP 01 // CURATION'}
            </p>
            <h2 className="font-display text-lg sm:text-2xl font-semibold leading-tight tracking-tight text-neutral-200 uppercase">
              {isRo ? 'Piese Recomandate' : 'Featured Pieces'}
            </h2>
          </div>
        </div>
        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} className="w-full" />
          ))}
        </div>
      </div>
    </section>
  )
}
