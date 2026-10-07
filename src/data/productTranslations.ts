import type { Language } from '../context/LanguageContext'

export interface LocalizedProductCopy {
  tagline?: string
  description?: string
}

export const PRODUCT_TRANSLATIONS: Record<string, Partial<Record<Language, LocalizedProductCopy>>> = {
  'cavalerul-woodcut': {
    ro: {
      tagline: '240 GSM Bumbac Greu, Croială Boxy Oversized, Print DTF de Înaltă Rezoluție.',
      description: 'Piesă emblematică inspirată din gravura medievală pe lemn și motivul arhaic al Cavalerului / Sf. Gheorghe. Confecționat din bumbac organic de 240 GSM, cu o cădere boxy / oversized impunătoare și guler gros ranforsat. Print DTF de înaltă rezoluție (300 DPI) realizat în atelier local din România.',
    },
    en: {
      tagline: '240 GSM Heavyweight Cotton, Custom Boxy Oversized Cut, 300 DPI DTF Print.',
      description: 'Flagship statement piece inspired by medieval woodcut engraving and the archaic archetype of The Knight / St. George. Tailored from 240 GSM organic heavy cotton with an architectural boxy drape and reinforced rib collar. Printed in Romania via 300 DPI DTF.',
    },
  },

  'chilim-cocos-white': {
    ro: {
      tagline: 'Simetrii arhaice neolitice pe bumbac heavyweight 240g Vintage White.',
      description: 'Simbolistica arhaică a cocoșului solar din chilimurile tradiționale românești, reinterpretată curat într-un registru streetwear brutalist. Bumbac dens de 240 GSM, croială boxy relaxată.',
    },
    en: {
      tagline: 'Archaic Neolithic symmetries on 240 GSM heavyweight Vintage White cotton.',
      description: 'Ancestral symbolism of the solar rooster from traditional Romanian kilims, cleanly reinterpreted in a brutalist streetwear register. 240 GSM dense cotton, relaxed boxy cut.',
    },
  },

  'chilim-cocos-black': {
    ro: {
      tagline: 'Geometrie arhaică românească pe bumbac dens washed black.',
      description: 'Contrast puternic între simbolistica ancestrală și textura densă a bumbacului pieptănat de 240 GSM. Linii tăiate curat, fără kitsch, pură expresie a formei și a identității arhaice.',
    },
    en: {
      tagline: 'Archaic Romanian geometry on dense washed black heavyweight cotton.',
      description: 'Sharp contrast between ancestral symbolism and tactile 240 GSM combed cotton. Clean lines, zero kitsch, an uncompromising celebration of archaic heritage.',
    },
  },

  'angel-wings-black': {
    ro: {
      tagline: 'Dark folklore și aripi în gravură aspră pe bumbac greu de 240g.',
      description: 'Gravură xilogravată de inspirație dark folklore. Pânză grea din bumbac 100% organic pieptănat, 240 GSM, croială boxy cu umeri căzuți și guler înalt ranforsat.',
    },
    en: {
      tagline: 'Dark folklore and woodcut engraved wings on 240 GSM heavy cotton.',
      description: 'Woodcut engraving inspired by Romanian dark folklore. 100% organic combed 240 GSM heavy cotton, drop-shoulder boxy drape, reinforced thick collar.',
    },
  },

  'horizon-roots-tee': {
    ro: {
      tagline: 'Rădăcini arhaice și orizont liber în stil streetwear urban.',
      description: 'Compoziție minimalistă inspirată din legătura primordială cu pământul și orizontul. Material heavyweight 240 GSM bumbac de înaltă densitate, finisaj moale și rezistență la uzură.',
    },
    en: {
      tagline: 'Archaic roots and open horizon in minimalist urban streetwear.',
      description: 'Minimalist composition honoring the primordial connection with earth and horizon. 240 GSM high-density cotton, soft handfeel, and maximum durability.',
    },
  },
}

export function getLocalizedProduct(
  productId: string,
  lang: Language,
  fallbackTagline?: string,
  fallbackDescription?: string
): { tagline?: string; description?: string } {
  const item = PRODUCT_TRANSLATIONS[productId]?.[lang]
  return {
    tagline: item?.tagline || fallbackTagline,
    description: item?.description || fallbackDescription,
  }
}
