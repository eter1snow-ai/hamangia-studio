# MASTER PROMPT // CONTINUARE PROIECT HAMANGIA STUDIO

Copiază textul de mai jos și trimite-l direct noului asistent în noul chat deschis din rădăcina proiectului:

---

```markdown
Salut! Acesta este noul chat de lucru pentru proiectul **HAMANGIA** (operat pe domeniul `hamangiastudio.ro`).
Lucrezi direct în folderul rădăcină al proiectului: `t:\DESKTOP\hamangia-studio`.

Citește mai întâi fișierele cheie de context existente în rădăcină:
- `MASTER_FILE.md` — Sursa Unică de Adevăr (Single Source of Truth)
- `DNS_CONFIG_GUIDE.md` — Ghidul complet de configurare DNS Zooku + Vercel + Resend
- `T:\DESKTOP\HAMANGIA-DOCS\ROADMAP_ARHITECTURA.md` — Specificația completă a arhitecturii
- `package.json`, `src/App.tsx`, `.env.local`

---

### 1. REZUMATUL COMPLET AL PROIECTULUI & CE S-A FĂCUT PÂNĂ ACUM:

1. **Izolare & Decuplare 100%:**
   - Proiectul provine dintr-un șasiu React 19 + Vite 7 + Tailwind CSS decuplat complet de HeavenlyNova.
   - Proiectul original HeavenlyNova a rămas neatins.

2. **Identitate de Brand HAMANGIA:**
   - **Nume oficial:** HAMANGIA (termenul „Traditional” este strict interzis în nume; poate fi doar sub-titlu de colecție tip *Expedition to the Roots*).
   - **Direcție estetică:** Gravură medievală în lemn (*woodcut* / *etching*), dark folklore românesc, geometrie arhaică și motive din chilimuri vechi. Fără kitsch turistic, fără tricolor, fără textul strident „ROMANIA”.
   - **Blanks:** Exclusiv bumbac greu de 240 GSM, croială boxy / oversized fit.
   - **Producție:** Print DTF de înaltă definiție (300 DPI) la atelier partener din România. Livrare 24–48h.

3. **Sistem Bilingv Integral (Româna este Limba Mamă):**
   - Redus strict la `Language = 'ro' | 'en'`. Limba implicită peste tot este **RO**.
   - Toate meniurile, produsele, filtrele și paginile legale ([ShippingPolicy], [RefundPolicy], [PrivacyPolicy], [TermsOfService]) sunt traduse 100% bilingv și adaptate legislației românești (OUG 34/2014, retur 14 zile, ANAF e-Factura, livrare Sameday Easybox).
   - Colecția *Seraphim* a fost scoasă complet; *Heritage* a fost redenumit în **To the Roots** (`/roots`). Moneda afișată peste tot este **RON**.

4. **Catalog Produse Drop 01 (configurat în date și Stripe API):**
   - `cavalerul-woodcut`: 189 RON (Piesa Erou / Vitrina Principală)
   - `chilim-cocos-white`: 169 RON
   - `chilim-cocos-black`: 169 RON
   - `angel-wings-black`: 169 RON
   - `horizon-roots-tee`: 149 RON

5. **Arhitectură cu Cost Fix de 0 Lei / lună (FĂRĂ Cloudflare):**
   - Formula simplă și curată: **Domeniu Zooku** ➔ **Găzduire & SSL pe Vercel** ➔ **Trimitere mailuri prin Resend API**.
   - S-a eliminat Cloudflare din ecuație pentru a evita labirinturile inutile.
   - Formularul `/contact` și alertele de abonați/comenzi folosesc Resend API (`api/contact.js`, `api/subscribe.js`) trimițând direct în Gmail-ul personal al proprietarului (`NOTIFICATION_EMAIL`), fără căsuțe poștale plătite pe Zooku.

6. **Deploy & Repositories Active:**
   - **Vercel Producție:** Proiectul `sabie-tudors-projects/hamangia-studio` este **LIVE** la:  
     👉 `https://hamangia-studio.vercel.app`
   - **GitHub Repository:** Creat și împins pe branch-ul `main`:  
     👉 `https://github.com/eter1snow-ai/hamangia-studio`
   - **Export Clean:** Fișierul `HAMANGIA-CODEBASE-CLEAN.txt` se află actualizat pe Desktop pentru consultare.

---

### 2. CHECKLIST PENTRU PAȘII URMĂTORI (CE A MAI RĂMAS DE FĂCUT):

#### Faza A: Conectare Domeniu Oficial & DNS (Zooku + Vercel + Resend)
- [ ] În panoul Zooku DNS Gratuit pentru `hamangiastudio.ro`, adaugă:
  - Record `A` pe `@` către `76.76.21.21` (Vercel)
  - Record `CNAME` pe `www` către `cname.vercel-dns.com`
  - Record `TXT` pe `_dmarc` către `v=DMARC1; p=none; rua=mailto:contact@hamangiastudio.ro`
  - Recordurile DKIM, SPF și MX copiate din dashboard-ul Resend
- [ ] În Vercel Dashboard (Settings → Domains), adaugă `hamangiastudio.ro` și `www.hamangiastudio.ro` (Vercel va emite SSL-ul automat imediat ce propagarea e gata).
- [ ] În contul Resend (Domains), adaugă `hamangiastudio.ro`, verifică statusul `Verified` și setează în Vercel Environment Variables:
  - `RESEND_API_KEY`
  - `EMAIL_FROM` = `HAMANGIA Studio <contact@hamangiastudio.ro>`
  - `NOTIFICATION_EMAIL` = adresa de Gmail personală

#### Faza B: Supabase (Bază de Date & Backend Dedicat)
- [ ] Creare proiect Supabase dedicat HAMANGIA (regiunea Frankfurt / EU-Central).
- [ ] Rulare schemă SQL (`customers`, `products`, `orders`, `order_items`).
- [ ] Configurare statusuri comenzi (`pending_payment`, `paid`, `in_production`, `shipped`).
- [ ] Adăugare chei Supabase (`VITE_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) în `.env.local` și Vercel.

#### Faza C: Checkout Adaptat Pieței RO (Plată Ramburs & Sameday Easybox)
- [ ] Adăugare selector modal/radio în Checkout:
  - Opțiunea 1: **Plată cu Cardul** (Stripe RON).
  - Opțiunea 2: **Plată Ramburs la Livrare (COD)** — salvare automată a comenzii în Supabase cu status `pending_payment`.
- [ ] Integrare widget/selector de lockere **Sameday Easybox** în pasul de finalizare comandă.

#### Faza D: Facturare Automată & Notificare Atelier Local
- [ ] Conectare **Oblio API** pentru generare automată factură fiscală și transmitere în SPV ANAF (e-Factura).
- [ ] Webhook automat prin Resend la plasarea comenzii către atelierul de print DTF din România (cu fișierul PNG 300 DPI, mărime, blank 240g și AWB Sameday).

---

Suntem pregătiți să continuăm. Confirmă că ai asimilat contextul și spune-mi cu care dintre pași începem acum!
```
