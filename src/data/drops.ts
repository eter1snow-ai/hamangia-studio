/**
 * src/data/drops.ts
 *
 * HAMANGIA STUDIO — Sursa unică de adevăr pentru catalogul de produse.
 * Colecția Arhaică / Drop 01: Expedition to the Roots.
 * Toate produsele sunt confecționate exclusiv din bumbac heavyweight 240 GSM, croială Boxy Oversized.
 */

// ─── Tipuri ───────────────────────────────────────────────────────────────────

export type Category = 'flagship' | 'essentials' | 'individuals' | 'origin'

export type ProductType = 'tee' | 'hoodie'

export type Product = {
  id: string
  category: Category
  productType: ProductType
  name: string
  tagline: string
  description: string
  price: string
  priceUsd: number           // Valoarea numerică în RON (ex: 189 = 189 RON)
  images: string[]
  hidden?: boolean
}

// ─── Catalog Produse HAMANGIA ────────────────────────────────────────────────

export const allProducts: Product[] = [
  // 1. Piesa Erou / Vitrina Principală (Hero Showcase)
  {
    id: 'cavalerul-woodcut',
    category: 'flagship',
    productType: 'tee',
    name: 'Cavalerul / Sf. Gheorghe (Woodcut Heavy Tee)',
    tagline: '240 GSM Heavyweight Cotton, Croială Boxy Oversized, Print DTF de înaltă definiție.',
    description: 'Piesă emblematică inspirată din gravura medievală pe lemn și motivul arhaic al Cavalerului / Sf. Gheorghe. Confecționat din bumbac organic de 240 GSM, cu o cădere boxy / oversized impunătoare și guler gros ranforsat. Print DTF de înaltă rezoluție (300 DPI) realizat în atelier local din România.',
    price: '189 RON',
    priceUsd: 189,
    images: [
      '/Assets/Images/Hamangia/cavalerul-woodcut.png',
    ],
  },
  // 2. Chilim Geometric Cocos - Vintage White
  {
    id: 'chilim-cocos-white',
    category: 'essentials',
    productType: 'tee',
    name: 'Chilim Geometric Cocos - Vintage White',
    tagline: 'Simetrii arhaice neolitice pe bumbac heavyweight 240g Vintage White.',
    description: 'Simbolistica arhaică a cocoșului solar din chilimurile tradiționale românești, reinterpretată curat într-un registru streetwear brutalist. Bumbac dens de 240 GSM, croială boxy relaxată.',
    price: '169 RON',
    priceUsd: 169,
    images: [
      '/Assets/Images/Hamangia/chilim-cocos-white.png',
    ],
  },
  // 3. Chilim Geometric Cocos - Washed Black
  {
    id: 'chilim-cocos-black',
    category: 'essentials',
    productType: 'tee',
    name: 'Chilim Geometric Cocos - Washed Black',
    tagline: 'Geometrie arhaică românească pe bumbac dens washed black.',
    description: 'Contrast puternic între simbolistica ancestrală și textura densă a bumbacului pieptănat de 240 GSM. Linii tăiate curat, fără kitsch, pură expresie a formei și a identității arhaice.',
    price: '169 RON',
    priceUsd: 169,
    images: [
      '/Assets/Images/Hamangia/chilim-cocos-black.png',
    ],
  },
  // 4. Angel Wings - Oversized Black
  {
    id: 'angel-wings-black',
    category: 'individuals',
    productType: 'tee',
    name: 'Angel Wings - Oversized Black',
    tagline: 'Dark folklore și aripi în gravură aspră pe bumbac greu de 240g.',
    description: 'Gravură xilogravată de inspirație dark folklore. Pânză grea din bumbac 100% organic pieptănat, 240 GSM, croială boxy cu umeri căzuți și guler înalt ranforsat.',
    price: '169 RON',
    priceUsd: 169,
    images: [
      '/Assets/Images/Hamangia/angel-wings-black.png',
      '/Assets/Images/Hamangia/angel-wings-mockup.png',
    ],
  },
  // 5. Horizon Roots Tee
  {
    id: 'horizon-roots-tee',
    category: 'individuals',
    productType: 'tee',
    name: 'Horizon Roots Tee',
    tagline: 'Rădăcini arhaice și orizont liber în stil streetwear urban.',
    description: 'Compoziție minimalistă inspirată din legătura primordială cu pământul și orizontul. Material heavyweight 240 GSM bumbac de înaltă densitate, finisaj moale și rezistență la uzură.',
    price: '149 RON',
    priceUsd: 149,
    images: [
      '/Assets/Images/Hamangia/horizon-roots.png',
    ],
  },
]

// Produsele active afișate pe site
export const products: Product[] = allProducts.filter((p) => !p.hidden)

// Produsele de vitrină
export const featuredProducts: Product[] = products

// Helper lookup
export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id)

// Mapare de siguranță pentru variante (compatibilitate)
export const SPREADCONNECT_VARIANTS: Record<string, Record<string, number>> = {}

export function getSpreadconnectArticleId(_productId: string, _size: string): number | null {
  return null
}
