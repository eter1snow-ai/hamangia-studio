import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'ro' | 'en'

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, fallback?: string) => string
  languages: { code: Language; label: string; flag: string }[]
}

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'ro', label: 'Română', flag: 'RO' },
  { code: 'en', label: 'English', flag: 'EN' },
]

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  ro: {
    // Navigatie
    'nav.announcement': '✦ LIVRARE 24-48H LA EASYBOX ÎN TOATĂ ROMÂNIA ✦',
    'nav.drops': 'Lansări',
    'nav.roots': 'To the Roots',
    'nav.heritage': 'To the Roots',
    'nav.essentials': 'Esențiale',
    'nav.collections': 'Colecții',
    'nav.story': 'Poveste',
    'nav.join': 'Comunitate',
    'nav.cart': 'Coș',

    // Produs & Detalii
    'product.claim': 'Adaugă în Coș',
    'product.adding': 'Se adaugă...',
    'product.select_size': 'Alege o Mărime',
    'product.size_guide': 'Ghid de Mărimi',
    'product.price': 'Preț',
    'product.color': 'Culoare',
    'product.size': 'Mărime',
    'product.universe': 'Parte din atelierul HAMANGIA.',
    'product.curated_sizing': 'Croială boxy oversized din bumbac 240 GSM — alege mărimea obișnuită.',
    'product.shipping_included': 'Livrare 24-48h prin Sameday Easybox & Curier',
    'size_guide.chest': 'Lățime Piept (cm)',
    'size_guide.length': 'Lungime (cm)',
    'size_guide.sleeve': 'Mânecă (cm)',
    'size_guide.note': 'Măsurători pe produs așezat plan. Bumbac greu de 240 GSM pre-shrunk.',

    // Drops & Colectie
    'drops.title': 'Colecția Arhaică',
    'drops.subtitle': 'Drop 01 // Expedition to the Roots. Piese din bumbac greu de 240g, imprimate DTF la 300 DPI.',
    'drops.type': 'Tip',
    'drops.collection': 'Colecție',
    'drops.all': 'Toate',
    'drops.tees': 'Tricouri',
    'drops.hoodies': 'Hanorace',
    'drops.none': 'Niciun produs găsit.',

    // Cos de cumparaturi
    'cart.title': 'Piesele Tale',
    'cart.empty': 'Coșul tău este gol',
    'cart.explore': 'Explorează Colecția',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Livrare',
    'cart.free_shipping': 'Calculat la checkout (Easybox / Curier)',
    'cart.checkout': 'Finalizează Comanda',
    'cart.secure': 'Checkout Securizat SSL 256-Bit',

    // Footer & Legal
    'footer.tagline': 'Arhaic & Dark Folklore Streetwear',
    'footer.support': 'Asistență',
    'footer.brand': 'Brand',
    'footer.social': 'Social',
    'footer.rights': 'Toate drepturile rezervate.',
    'footer.privacy': 'Politică de Confidențialitate',
    'footer.terms': 'Termeni și Condiții',
    'footer.shipping': 'Politică de Livrare',
    'footer.refunds': 'Politică de Retur',
    'footer.track': 'Urmărește Comanda',
    'footer.contact': 'Contact Atelier',
    'footer.origin': '— RĂDĂCINI —',
    'footer.atelier_dispatch': 'Creat la Comandă',
    'footer.shipping_territories': 'Livrare în toată România',
    'footer.shipping_estimate': 'Sameday Easybox & Curier 24-48h',

    // Hero & Home
    'hero.enter': 'Explorează Vitrina',
    'hero.explore': 'Vezi Toate Piesele',
  },

  en: {
    // Navigation
    'nav.announcement': '✦ 24-48H EASYBOX DELIVERY IN ROMANIA ✦',
    'nav.drops': 'Drops',
    'nav.roots': 'To the Roots',
    'nav.heritage': 'To the Roots',
    'nav.essentials': 'Essentials',
    'nav.collections': 'Collections',
    'nav.story': 'Story',
    'nav.join': 'Join',
    'nav.cart': 'Cart',

    // Product & Details
    'product.claim': 'Add to Cart',
    'product.adding': 'Adding...',
    'product.select_size': 'Select a Size',
    'product.size_guide': 'Size Guide',
    'product.price': 'Price',
    'product.color': 'Color',
    'product.size': 'Size',
    'product.universe': 'Forged by HAMANGIA Studio.',
    'product.curated_sizing': 'Boxy oversized drape in 240 GSM heavy cotton — true to size.',
    'product.shipping_included': '24-48h delivery via Sameday Easybox & Courier',
    'size_guide.chest': 'Chest Width (cm)',
    'size_guide.length': 'Length (cm)',
    'size_guide.sleeve': 'Sleeve (cm)',
    'size_guide.note': 'Measurements taken flat. 240 GSM heavyweight pre-shrunk cotton.',

    // Drops & Collection
    'drops.title': 'Archaic Collection',
    'drops.subtitle': 'Drop 01 // Expedition to the Roots. 240 GSM heavy cotton pieces, 300 DPI high-definition DTF print.',
    'drops.type': 'Type',
    'drops.collection': 'Collection',
    'drops.all': 'All',
    'drops.tees': 'Tees',
    'drops.hoodies': 'Hoodies',
    'drops.none': 'No products found.',

    // Cart
    'cart.title': 'Your Pieces',
    'cart.empty': 'Your cart is empty',
    'cart.explore': 'Explore Collection',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.free_shipping': 'Calculated at checkout (Easybox / Courier)',
    'cart.checkout': 'Proceed to Checkout',
    'cart.secure': 'Encrypted 256-Bit SSL Checkout',

    // Footer & Legal
    'footer.tagline': 'Archaic & Dark Folklore Streetwear',
    'footer.support': 'Support',
    'footer.brand': 'Brand',
    'footer.social': 'Social',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.shipping': 'Shipping Policy',
    'footer.refunds': 'Refund Policy',
    'footer.track': 'Track Order',
    'footer.contact': 'Contact Studio',
    'footer.origin': '— ROOTS —',
    'footer.atelier_dispatch': 'Made to Order',
    'footer.shipping_territories': 'Shipping across Romania',
    'footer.shipping_estimate': 'Sameday Easybox & Courier 24-48h',

    // Hero & Home
    'hero.enter': 'Explore Showcase',
    'hero.explore': 'Explore All Drops',
  },
}

function detectInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('hn_lang') as Language
    if (saved === 'ro' || saved === 'en') {
      return saved
    }

    // Implicit este Româna (limba mamă pentru brandul hamangiastudio.ro)
    const browserLang = (navigator.language || '').toLowerCase()
    if (browserLang.startsWith('en')) {
      return 'en'
    }
  } catch {
    /* fallback la ro */
  }
  return 'ro'
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ro',
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
  languages: LANGUAGES,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage)

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem('hn_lang', lang)
      document.documentElement.lang = lang
    } catch {
      /* noop */
    }
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const t = (key: string, fallback?: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.ro
    if (dict && dict[key]) {
      return dict[key]
    }
    // Fallback pe limba română dacă lipsește cheia în engleză
    if (TRANSLATIONS.ro[key]) {
      return TRANSLATIONS.ro[key]
    }
    return fallback || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
