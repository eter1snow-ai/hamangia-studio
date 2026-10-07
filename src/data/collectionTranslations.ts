import type { Language } from '../context/LanguageContext'

export interface HeritageTranslation {
  title: string
  subtitle: string
  originLabel: string
  quote: string
  p1: string
  p2: string
  p3: string
  p4: string
  footerNote: string
  archiveLabel: string
  archiveTitle: string
  heritageLine: string
  firstPieces: string
  originExists: string
}

export interface SeraphimTranslation {
  chapter: string
  title: string
  subtitle: string
  tagline: string
  loreLabel: string
  stanzas: string[]
  quote: string
  piecesLabel: string
  piecesSub: string
  taglineRise: string
  originCtaSubtitle: string
  originCtaTitle: string
  originCtaLink: string
}

export interface EssentialsTranslation {
  badge: string
  title: string
  desc: string
}

export interface HomeTranslation {
  hero: {
    luxuryStreetwear: string
    exploreBtn: string
    tagline: string
  }
  soulfull: {
    badge: string
    subtitle: string
    cardSub: string
  }
  essentials: {
    badge: string
    desc: string
    link: string
  }
  heritage: {
    badge: string
    desc: string
    link: string
  }
  seraphim: {
    badge: string
    desc: string
    link: string
  }
  newsletter: {
    badge: string
    title: string
    subtitle: string
    placeholder: string
    btn: string
    success: string
    privacy: string
  }
  originLink: string
}

export interface CollectionsData {
  heritage: HeritageTranslation
  seraphim: SeraphimTranslation
  essentials: EssentialsTranslation
  home: HomeTranslation
}

export const COLLECTION_TRANSLATIONS: Record<Language, CollectionsData> = {
  ro: {
    heritage: {
      title: 'To the Roots',
      subtitle: 'Spre Rădăcini // Drop 01',
      originLabel: 'Origine Arhaică',
      quote: 'HAMANGIA s-a născut din tăcerea pietrei și rigoarea gravurii pe lemn.',
      p1: 'Nu am căutat să reinventăm folclorul românesc prin kitsch naționalist sau suveniruri facile. Am extras esența pură: meandrele, simetriile arhaice și asprimea xilogravurilor medievale.',
      p2: 'Fiecare piesă este o dovadă de meșteșug independent. Bumbac greu de 240 GSM, croială boxy relaxată și print DTF calibrat la 300 DPI într-un atelier din România.',
      p3: 'To the Roots reprezintă punctul zero: colecția care refuză efemerul și construiește piese dense, cu o prezență tăcută și impunătoare.',
      p4: 'O îmbinare organică între estetica brutalistă underground și rădăcinile ancestrale românești.',
      footerNote: 'Colecția conține piesele de bază ale primului drop',
      archiveLabel: 'Atelier',
      archiveTitle: 'Piese de Gravură',
      heritageLine: 'Linia To the Roots',
      firstPieces: 'Piesele Primordiale',
      originExists: '— RĂDĂCINILE DĂINUIE —',
    },
    seraphim: {
      chapter: 'Capitolul 01',
      title: 'To the Roots',
      subtitle: 'Gravură Medievală',
      tagline: 'Linii pure pe bumbac greu.',
      loreLabel: 'Arhivă',
      stanzas: [
        'Dincolo de formă este pământul.\nDincolo de zgomot este rădăcina.',
      ],
      quote: 'Forța autentică nu are nevoie de stridență.',
      piecesLabel: 'Colecția',
      piecesSub: 'Piesele primului drop.',
      taglineRise: 'Cei Care Își Cunosc Rădăcinile',
      originCtaSubtitle: 'Fiecare călătorie începe din adânc.',
      originCtaTitle: 'Citește Povestea',
      originCtaLink: 'Descoperă Povestea →',
    },
    essentials: {
      badge: 'Colecție Permanentă',
      title: 'Esențiale',
      desc: 'Simetrii geometrice arhaice extrase din vechile chilimuri. Bumbac heavyweight 240 GSM pentru uz cotidian.',
    },
    home: {
      hero: {
        luxuryStreetwear: 'Atelier Independent // România',
        exploreBtn: 'Explorează Colecția',
        tagline: 'Piese heavyweight 240g inspirate din gravură medievală și folclor arhaic românesc.',
      },
      soulfull: {
        badge: 'To the Roots',
        subtitle: 'Simboluri ancestrale gravate în lemn.',
        cardSub: 'Poartă ceea ce dăinuie.',
      },
      essentials: {
        badge: 'Chilimuri Geometrice',
        desc: 'Motive arhaice neolitice pe bumbac heavyweight 240 GSM. Finisaj tactil dens, tăietură boxy curată.',
        link: '→ Vezi Linia Esențială',
      },
      heritage: {
        badge: 'Drop 01 // Roots',
        desc: 'Piese din bumbac greu de 240g, imprimate DTF la 300 DPI. Gravură medievală pe stil brutalist urban.',
        link: '→ Vezi Colecția To the Roots',
      },
      seraphim: {
        badge: 'Ediție Erou',
        desc: 'Cavalerul Sf. Gheorghe în gravură woodcut medievală.',
        link: '→ Vezi Piesa Erou',
      },
      newsletter: {
        badge: 'Atelier HAMANGIA',
        title: 'Drop 01\nEste Lansat.',
        subtitle: 'Abonează-te pentru acces prioritar\nla tirajele scurte de atelier.',
        placeholder: 'adresa@ta.ro',
        btn: 'Abonare',
        success: 'Ești acum înscris în cercul HAMANGIA.',
        privacy: 'Respectăm confidențialitatea. Te poți dezabona oricând.',
      },
      originLink: '— POVESTEA BRANDULUI —',
    },
  },

  en: {
    heritage: {
      title: 'To the Roots',
      subtitle: 'Return to the Roots // Drop 01',
      originLabel: 'Archaic Origin',
      quote: 'HAMANGIA was forged from the stillness of stone and the rigor of woodcut engraving.',
      p1: 'We refused fast souvenirs and nationalist cliches. We extracted pure ancestral geometry, archaic symmetries, and medieval woodcuts into architectural streetwear silhouettes.',
      p2: 'Each piece represents independent local craftsmanship: 240 GSM heavy combed cotton, custom boxy oversized cut, and 300 DPI DTF print tailored in Romania.',
      p3: 'To the Roots is our foundation: garments engineered to endure, calm in presence, unmistakable in weight and texture.',
      p4: 'A brutalist convergence between underground streetwear and ancient folklore.',
      footerNote: 'Preserving the original archetypes of Drop 01',
      archiveLabel: 'Studio',
      archiveTitle: 'Engraved Artifacts',
      heritageLine: 'To the Roots Line',
      firstPieces: 'The Primordial Pieces',
      originExists: '— THE ROOTS ENDURE —',
    },
    seraphim: {
      chapter: 'Chapter 01',
      title: 'To the Roots',
      subtitle: 'Medieval Woodcut',
      tagline: 'Pure lines on heavy cotton.',
      loreLabel: 'Archive',
      stanzas: [
        'Beneath the noise lies the earth.\nBeneath the surface lie the roots.',
      ],
      quote: 'True strength never needs to shout.',
      piecesLabel: 'The Collection',
      piecesSub: 'First drop garments.',
      taglineRise: 'Those Who Know Their Roots',
      originCtaSubtitle: 'Every journey returns to its source.',
      originCtaTitle: 'Read the Story',
      originCtaLink: 'Discover the Story →',
    },
    essentials: {
      badge: 'Core Collection',
      title: 'Essentials',
      desc: 'Archaic geometric symmetries inspired by antique Romanian kilims. 240 GSM heavyweight cotton for everyday rituals.',
    },
    home: {
      hero: {
        luxuryStreetwear: 'Independent Studio // Romania',
        exploreBtn: 'Explore Collection',
        tagline: '240 GSM heavyweight pieces inspired by medieval woodcuts and archaic Romanian folklore.',
      },
      soulfull: {
        badge: 'To the Roots',
        subtitle: 'Ancestral symbols cut in wood.',
        cardSub: 'Wear what endures.',
      },
      essentials: {
        badge: 'Geometric Kilims',
        desc: 'Archaic Neolithic patterns on 240 GSM heavy cotton. Tactile density, clean boxy drape.',
        link: '→ Explore Essentials',
      },
      heritage: {
        badge: 'Drop 01 // Roots',
        desc: 'Heavy 240g cotton garments, high-definition 300 DPI DTF print. Medieval woodcut meets brutalist streetwear.',
        link: '→ View To the Roots Collection',
      },
      seraphim: {
        badge: 'Hero Edition',
        desc: 'The Knight St. George in medieval woodcut engraving.',
        link: '→ View Hero Piece',
      },
      newsletter: {
        badge: 'HAMANGIA Studio',
        title: 'Drop 01\nis Live.',
        subtitle: 'Subscribe for priority access\nto limited studio batches.',
        placeholder: 'your@email.com',
        btn: 'Subscribe',
        success: 'You are now part of the HAMANGIA circle.',
        privacy: 'We respect your privacy. Unsubscribe anytime.',
      },
      originLink: '— BRAND STORY —',
    },
  },
}
