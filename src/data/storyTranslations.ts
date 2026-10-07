import type { Language } from '../context/LanguageContext'

export interface StoryTranslation {
  headerTitle: string
  originLabel: string
  introQuote: string
  para1: string
  para2: string
  para3: string
  chapterTitle: string
  chapterPara1: string
  chapterPara2: string
  chapterPara3: string
  chapterPara4: string
  signalLabel: string
  signalPara1: string
  signalPara2: string
  signalPara3: string
  signalFooter: string
  exclusiveSymbol: string
  exclusiveLabel: string
  exclusivePieceTitle: string
  exclusiveSeek: string
  exclusiveDesc: string
  claimBtn: string
}

export const STORY_TRANSLATIONS: Record<Language, StoryTranslation> = {
  ro: {
    headerTitle: 'Rădăcini & \nGravură Arhaică',
    originLabel: 'Originea Brandului',
    introQuote: 'HAMANGIA nu este despre modă efemeră sau suveniruri. Este o reîntoarcere la formele primordiale ale pământului românesc.',
    para1: 'Născut din tăcerea pietrei neolitice și din asprimea gravurilor medievale pe lemn, atelierul nostru reinterpretează simbolistica arhaică fără compromisuri kitsch.',
    para2: 'Fără steaguri stridente, fără cliee naționaliste. Doar linii pure, geometrii arhaice extrase din vechile scoarțe și chilimuri, transpuse brutalist pe bumbac greu de 240 GSM.',
    para3: 'Fiecare piesă este creată pentru cei care înțeleg forța rădăcinilor — aspră, minimalistă, profund autentică.',
    chapterTitle: 'Drop 01 // Expedition to the Roots',
    chapterPara1: 'Înainte de producție, a existat rigoarea. Am căutat cel mai dens bumbac organic — 240 GSM cu structură boxy oversized — și am calibrat tehnologia de print DTF la 300 DPI pentru ca fiecare hașură a gravurii să rămână intactă.',
    chapterPara2: 'Expedition to the Roots marchează începutul unui nou limbaj vestimentar pe piața din România. O fuziune între meșteșugul local de atelier și cultura underground streetwear.',
    chapterPara3: 'Cei care aleg HAMANGIA poartă o declarație de identitate: respect pentru arta veche, redată cu precizie brutalistă modernă.',
    chapterPara4: 'Producția este realizată la comandă, într-un atelier local din România, eliminând supraproducția și garantând livrare rapidă în 24-48h prin Sameday Easybox.',
    signalLabel: 'Manifestul Atelierului',
    signalPara1: 'Gânditorul de la Hamangia, cocoșul solar, cavalerul medieval: arhetipuri ancestrale eliberate de zgomotul comercial.',
    signalPara2: 'Nu facem tricouri subțiri de promoție. Piesele noastre au o cădere arhitecturală fermă și rezistă decenii de spălare și purtare.',
    signalPara3: 'Aceasta este promisiunea HAMANGIA: bumbac greu de 240g, meșteșug independent și expresie arhaică pură.',
    signalFooter: 'HAMANGIA STUDIO — DROP 01: EXPEDITION TO THE ROOTS',
    exclusiveSymbol: 'Piesa emblematică a primului drop.',
    exclusiveLabel: 'Piesă Erou // Vitrină',
    exclusivePieceTitle: 'CAVALERUL WOODCUT',
    exclusiveSeek: 'Ediție limitată de atelier.',
    exclusiveDesc: 'Cavalerul / Sf. Gheorghe (Woodcut Heavy Tee) — bumbac greu de 240 GSM, croială boxy oversized și print DTF de înaltă rezoluție.',
    claimBtn: 'Vezi Piesa Erou (189 RON)',
  },

  en: {
    headerTitle: 'Roots & \nArchaic Woodcut',
    originLabel: 'Brand Origin',
    introQuote: 'HAMANGIA is not about fast fashion or tourist souvenirs. It is a return to the primordial forms of archaic Romanian folklore.',
    para1: 'Born from the stillness of Neolithic stone and the raw precision of medieval woodcut engravings, our studio reinterprets ancestral symbolism with a brutalist streetwear edge.',
    para2: 'No loud flags, no nationalist cliches. Pure geometric symmetry extracted from ancient kilims, tailored strictly on 240 GSM heavyweight cotton.',
    para3: 'Each garment is forged for those who respect quiet presence and authentic identity.',
    chapterTitle: 'Drop 01 // Expedition to the Roots',
    chapterPara1: 'Before production, there was discipline. We selected 240 GSM combed organic cotton with a custom boxy oversized fit, printed locally via high-definition 300 DPI DTF.',
    chapterPara2: 'Expedition to the Roots introduces an uncompromising Romanian design language that merges local craft with global streetwear standards.',
    chapterPara3: 'Wearing HAMANGIA is a statement of understated power and timeless heritage.',
    chapterPara4: 'Every piece is crafted upon order in a local Romanian print workshop, supporting local manufacturing and ensuring 24-48h courier delivery.',
    signalLabel: 'Studio Manifesto',
    signalPara1: 'The Thinker of Hamangia, the solar rooster, the medieval knight: ancestral archetypes liberated from commercial noise.',
    signalPara2: 'We reject flimsy promotional tees. Our pieces carry architectural drape, enduring tactile weight, and maximum wash longevity.',
    signalPara3: 'This is the HAMANGIA standard: 240 GSM heavyweight cotton, independent craft, archaic purity.',
    signalFooter: 'HAMANGIA STUDIO — DROP 01: EXPEDITION TO THE ROOTS',
    exclusiveSymbol: 'The flagship piece of Drop 01.',
    exclusiveLabel: 'Hero Piece // Showcase',
    exclusivePieceTitle: 'THE WOODCUT KNIGHT',
    exclusiveSeek: 'Limited studio batch.',
    exclusiveDesc: 'The Knight / St. George (Woodcut Heavy Tee) — 240 GSM heavyweight cotton, boxy oversized cut, high-definition DTF print.',
    claimBtn: 'View Hero Piece (189 RON)',
  },
}
