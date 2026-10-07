# MASTER FILE — HAMANGIA STUDIO (`hamangiastudio.ro`)
> **Sursa Unică de Adevăr (Single Source of Truth)** pentru dezvoltarea, arhitectura și operarea brandului HAMANGIA.  
> Ultima actualizare: **Octombrie 2026**  
> Status Proiect: **LIVE pe Vercel (`https://hamangia-studio.vercel.app`) & În curs de mapare pe domeniul final `hamangiastudio.ro`**

---

## 1. Ce Este Acest Proiect

**HAMANGIA** este un brand independent de streetwear heavyweight creat exclusiv pentru piața din România.  
Proiectul combină o estetică brutalistă, inspirată din gravura medievală în lemn (*woodcut / etching*) și simetriile arhaice ale culturii neolitice/chilimurilor românești vechi, cu siluete moderne urbane (Boxy Oversized din bumbac greu de 240 GSM).

* **Domeniu Oficial:** `https://hamangiastudio.ro` (înregistrat pe Zooku)
* **Găzduire Producție:** Vercel (`sabie-tudors-projects/hamangia-studio`)
* **URL Live Vercel:** [https://hamangia-studio.vercel.app](https://hamangia-studio.vercel.app)
* **Cost Fix de Operare:** **0 Lei / lună** (Free Tier Vercel, Supabase, Resend, Zooku DNS)

---

## 2. Viziunea și Identitatea Brandului

### 2.1. Reguli Cardinali de Naming & Design
1. **Nume Oficial:** **HAMANGIA** (FĂRĂ particula „Traditional” în nume — termenul „Traditional” este interzis ca brand, putând fi folosit doar ca sub-titlu de colecție tip *Expedition to the Roots*).
2. **Zero Kitsch Naționalist:**
   * ❌ Fără steag tricolor (roșu-galben-albastru).
   * ❌ Fără text strident „ROMANIA” sau elemente de suvenir turistic ieftin.
   * ✔️ Arta trebuie să funcționeze curat, minimalist, brutalist, monocrom sau în tonuri de negru spălat, cărbune și fildeș vintage.
3. **Calitate Blanks:**
   * Exclusiv bumbac greu de **240 GSM** (100% bumbac pieptănat sau pre-shrunk).
   * Croială boxy / oversized fit, guler strâns întărit, umeri căzuți. Fără tricouri subțiri promoționale de 140–150g.
4. **Tehnologie de Producție (Fulfillment Local):**
   * Print DTF (Direct to Film) de înaltă definiție la **300 DPI** printr-un atelier partener din România.
   * Timp de livrare de **24–48h** în toată România prin Sameday Easybox și curier.

---

## 3. Tech Stack

* **Frontend:** React 19 + Vite 7 + TypeScript 5.9
* **Styling:** Tailwind CSS 4 (@tailwindcss/postcss)
* **Routing & Animații:** React Router DOM 7 + Framer Motion 12 (tranzacții fluide între pagini cu `<MotionPage>`)
* **Email & Notificări:** Resend API (pachetul oficial `resend`) — trimitere notificări contact și comenzi direct în Gmail personal, **zero costuri cu servere de mail**
* **Plăți:** Stripe (Checkout Session în valuta `ron` / bani) + Opțiune Plată Ramburs (Cash on Delivery)
* **Bază de date:** Supabase (PostgreSQL — EU Central / Frankfurt)
* **Găzduire & CDN:** Vercel Hobby Plan (SSL gratuit Let's Encrypt, Anycast CDN global, Serverless Functions)

```bash
# Comenzi principale
npm run dev        # Pornește serverul local de dezvoltare (port 3001)
npm run build      # tsc -b && vite build (validare TypeScript + bundling producție)
vercel --prod      # Deploy direct în producție pe Vercel
```

---

## 4. Arhitectura de Limbi (RO Primar / EN Secundar)

Site-ul a fost proiectat cu **Româna ca limbă mamă** (`ro` este limba implicită), păstrând Engleza (`en`) ca limbă secundară:
* Toate textele, meniurile, produsele, filtrele și politicile legale sunt traduse 100% bilingv.
* Switcher-ul din Navbar oferă selecția rapidă `RO | EN`.
* Traducerile sunt organizate modular în:
  * `src/context/LanguageContext.tsx` — dicționarul global (navigație, butoane, footer, mesaje coș)
  * `src/data/productTranslations.ts` — descrieri și tagline-uri pentru produsele HAMANGIA
  * `src/data/collectionTranslations.ts` — textele specifice colecțiilor (*To the Roots, Esențiale, Lansări*)
  * `src/data/storyTranslations.ts` — manifestul de brand HAMANGIA

---

## 5. Rute Definite & Structură Navigație (`src/App.tsx`)

| Rută | Componentă | Descriere & Notă |
|---|---|---|
| `/` | `Home.tsx` | Hero Woodcut, Showcase Rail, Piesa Erou, Grid Piese, Manifest, Newsletter |
| `/drops` | `Drops.tsx` | Colecția Arhaică completă cu filtre (Toate / Tricouri / Hanorace) |
| `/roots` / `/heritage` | `Heritage.tsx` | *To the Roots* — Piesele de linie arhaice și gravură medievală |
| `/essentials` | `Essentials.tsx` | *Esențiale* — Piese minimale și chilimuri |
| `/story` | `Story.tsx` | *Originea* — Manifestul HAMANGIA (simbolism neolitic, gravură, bumbac 240g) |
| `/product/:productId` | `ProductDetail.tsx` | Pagină detaliu produs cu selector mărimi, ghid mărimi și checkout Stripe RON |
| `/contact` | `Contact.tsx` | Formular conectat la Resend API (mesajele ajung instant în Gmail) |
| `/track-order` | `TrackOrder.tsx` | Ghid de urmărire expediție Sameday Easybox (AWB) |
| `/join` | `Join.tsx` | Înrolare în cercul privat HAMANGIA pentru tiraje scurte |
| `/order-success` | `OrderSuccess.tsx` | Pagină de confirmare comandă plasată (Stripe / Ramburs) |
| `/shipping-policy` | `ShippingPolicy.tsx` | Politică de livrare 24-48h Sameday Easybox & Curier |
| `/refund-policy` | `RefundPolicy.tsx` | Politică de retur în 14 zile conform OUG 34/2014 |
| `/privacy-policy` | `PrivacyPolicy.tsx` | Politică de confidențialitate și protecție date GDPR |
| `/terms-of-service` | `TermsOfService.tsx` | Termeni și condiții de vânzare adaptate la legislația din România |
| `/seraphim` | `<Drops />` | Rută retrasă / redirecționată elegant către Drops |

---

## 6. Catalog Produse (Drop 01 // Expedition to the Roots)

| ID Produs | Nume Produs | Preț | Material | Tehnologie Print |
|---|---|---|---|---|
| `cavalerul-woodcut` | **Cavalerul / Sf. Gheorghe (Woodcut Heavy Tee)** | **189 RON** | 240 GSM Heavy Cotton | DTF 300 DPI — Gravură Medievală |
| `chilim-cocos-white` | **Chilim Geometric Cocos - Vintage White** | **169 RON** | 240 GSM Heavy Cotton | DTF 300 DPI — Simetrie Arhaică Fildeș |
| `chilim-cocos-black` | **Chilim Geometric Cocos - Washed Black** | **169 RON** | 240 GSM Heavy Cotton | DTF 300 DPI — Simetrie Negru Spălat |
| `angel-wings-black` | **Angel Wings - Oversized Black** | **169 RON** | 240 GSM Heavy Cotton | DTF 300 DPI — Aripi Heraldice Woodcut |
| `horizon-roots-tee` | **Horizon Roots Tee** | **149 RON** | 240 GSM Heavy Cotton | DTF 300 DPI — Simbolism Ancestral |

---

## 7. Configurare DNS & Email (Zooku + Vercel + Resend)

> **ZERO CLOUDFLARE:** Domeniul este administrat direct în **Zooku DNS Gratuit**, site-ul și SSL-ul sunt găzduite pe **Vercel**, iar emailurile pleacă prin **Resend API**.

### Înregistrări DNS de introdus în panoul Zooku:
1. **Site Web (Vercel):**
   * `A` record pe `@` ➔ `76.76.21.21`
   * `CNAME` record pe `www` ➔ `cname.vercel-dns.com`
2. **Anti-Spam Obligatoriu:**
   * `TXT` record pe `_dmarc` ➔ `v=DMARC1; p=none; rua=mailto:contact@hamangiastudio.ro`
3. **Resend (Expediere Emailuri fără căsuță plătită):**
   * `TXT` record pe `resend._domainkey` ➔ Cheia DKIM generată în Resend
   * `MX` record pe `bounces` ➔ `feedback-smtp.eu-west-1.amazonses.com` (prioritate 10)
   * `TXT` record pe `bounces` ➔ `v=spf1 include:amazonses.com ~all`

---

## 8. Variabile de Mediu (`.env.local` / Vercel Environment Variables)

```env
# Domeniu & URL
SITE_URL=https://hamangiastudio.ro

# Resend API (Notificări & Formular Contact)
RESEND_API_KEY=re_xxxxxxxxxxxxxx
EMAIL_FROM="HAMANGIA Studio <contact@hamangiastudio.ro>"
NOTIFICATION_EMAIL=adresa_ta_personala@gmail.com
WORKSHOP_EMAIL=atelier-print-local@hamangiastudio.ro

# Stripe (Plăți Card - Valuta RON)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxx

# Supabase (Catalog, Comenzi & Inventar)
VITE_SUPABASE_URL=https://xxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxxxxx

# Oblio API (Facturare Automată & SPV ANAF)
OBLIO_EMAIL=contact@hamangiastudio.ro
OBLIO_API_KEY=xxxxxxxxxxxxxx
OBLIO_CIF=ROxxxxxxxx
OBLIO_SERIE_FACTURA=HMN

# Sameday Easybox
SAMEDAY_API_USERNAME=user_sameday
SAMEDAY_API_PASSWORD=parola_sameday
SAMEDAY_ENV=live
```

---

## 9. Contact & Mentenanță
* **Organizație GitHub:** `eter1snow-ai`
* **Repository GitHub:** `eter1snow-ai/hamangia-studio`
* **Vercel Project:** `sabie-tudors-projects/hamangia-studio`
