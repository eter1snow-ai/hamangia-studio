# 🌐 GHID CONFIGURARE DNS & EMAIL (ZOOKU + VERCEL + RESEND)
## Brand: HAMANGIA (`hamangiastudio.ro`)

> **IMPORTANT: ARHITECTURĂ SIMPLIFICATĂ FĂRĂ CLOUDFLARE**  
> Domeniul este administrat direct în **Zooku DNS Gratuit**, site-ul și certificatul SSL gratuit sunt asigurate de **Vercel**, iar trimiterea emailurilor de confirmare și contact se face prin **Resend API** (0 Lei/lună).  
> **Cost fix total: 0 Lei / lună.**

---

## 1. TABELUL COMPLET DE ÎNREGISTRĂRI DNS (PENTRU PANOU ZOOKU)

Adaugă următoarele înregistrări în panoul **Zooku DNS** pentru domeniul `hamangiastudio.ro`:

| # | Tip Record | Host / Nume | Valoare / Țintă | TTL | Scop & Descriere |
|---|---|---|---|---|---|
| **1** | **`A`** | `@` *(sau hamangiastudio.ro)* | **`76.76.21.21`** | `3600` *(Auto)* | Leagă domeniul principal de serverele Vercel (Anycast CDN) |
| **2** | **`CNAME`** | **`www`** | **`cname.vercel-dns.com`** | `3600` *(Auto)* | Redirecționează `www.hamangiastudio.ro` către Vercel |
| **3** | **`TXT`** | **`_dmarc`** | **`v=DMARC1; p=none; rua=mailto:contact@hamangiastudio.ro`** | `3600` | **DMARC Obligatoriu**: Previne aruncarea emailurilor în SPAM pe Gmail/Yahoo |
| **4** | **`TXT`** | `resend._domainkey` | *Valoarea DKIM generată din contul Resend (vezi Pasul 2)* | `3600` | **DKIM Resend**: Autentifică semnătura criptografică a expeditorului |
| **5** | **`MX`** | `bounces` *(sau host cerut de Resend)* | `feedback-smtp.eu-west-1.amazonses.com` *(Prioritate 10)* | `3600` | Rutare erori / bounce-uri emailuri prin Resend |
| **6** | **`TXT`** | `bounces` *(sau host cerut de Resend)* | `v=spf1 include:amazonses.com ~all` | `3600` | **SPF Resend**: Confirmă că Resend are voie să trimită mailuri pentru tine |

*(Notă: Înregistrările 4, 5 și 6 sunt afișate exact cu copy-paste în dashboard-ul Resend în momentul în care adaugi domeniul `hamangiastudio.ro`).*

---

## 2. GHID PAS CU PAS DE IMPLEMENTARE

### PASUL 1: Setare Domeniu în Vercel
1. Intră în [vercel.com](https://vercel.com) și deschide proiectul `hamangia-studio`.
2. Mergi la **Settings** → **Domains**.
3. În câmpul de text, tastează `hamangiastudio.ro` și apasă **Add**.
4. Vercel te va întreba automat dacă vrei să redirecționezi `www.hamangiastudio.ro` către `hamangiastudio.ro` (sau invers). Bifează opțiunea recomandată de Vercel.
5. Vercel va afișa status galben *(Pending DNS / Invalid Configuration)* până adaugi înregistrările la Pasul 3.

---

### PASUL 2: Configurare Cont Resend (0 Lei / lună)
1. Intră pe [resend.com](https://resend.com) și creează cont gratuit (Sign Up cu contul tău de Google/email).
2. Mergi în meniul din stânga la **Domains** → click pe **Add Domain**.
3. Introdu:
   - **Domain:** `hamangiastudio.ro`
   - **Region:** `eu-west-1` *(Frankfurt / Ireland — ideal pentru viteză în România)*
4. Resend îți va genera pe ecran 3 înregistrări:
   - Înregistrarea **DKIM** (de tip TXT, de forma `resend._domainkey`)
   - Înregistrarea **SPF** (de tip TXT)
   - Înregistrarea **MX** (pentru tracking bounce-uri)
5. Lasă pagina deschisă pentru a copia valorile în Zooku la Pasul 3.
6. Mergi la secțiunea **API Keys** → click pe **Create API Key** → numește-o `Hamangia Production` → copiază cheia secretă (începe cu `re_...`).

---

### PASUL 3: Introducere Înregistrări în Panoul Zooku DNS
1. Autentifică-te pe [zooku.ro](https://zooku.ro) cu contul de client.
2. Mergi la **Domeniile mele** → dă click pe domeniul `hamangiastudio.ro`.
3. Verifică la secțiunea **Nameservere** să fie active nameserverele standard Zooku:
   - `ns1.zooku.ro`
   - `ns2.zooku.ro`
4. În meniul din stânga al domeniului, dă click pe **Gestionare DNS Gratuit** (sau *Zone Editor*).
5. Introdu pe rând cele 5 sau 6 înregistrări din **Tabelul de la Secțiunea 1**:
   - Adaugă `A` cu Host `@` și Valoarea `76.76.21.21`.
   - Adaugă `CNAME` cu Host `www` și Valoarea `cname.vercel-dns.com`.
   - Adaugă `TXT` cu Host `_dmarc` și Valoarea `v=DMARC1; p=none; rua=mailto:contact@hamangiastudio.ro`.
   - Adaugă cele 3 înregistrări generate de Resend la Pasul 2 (DKIM, SPF, MX).
6. Salvează modificările. Propagarea DNS durează de regulă între **5 și 30 de minute** (maxim 2–4 ore).

---

### PASUL 4: Validare Certificat SSL & Status Vercel
1. Revino în Vercel la **Settings → Domains**.
2. După câteva minute, Vercel va detecta automat IP-ul `76.76.21.21`.
3. Iconița se va transforma în **bifă verde (Valid Configuration)**.
4. Vercel va genera automat certificatul **Let's Encrypt SSL (HTTPS)** în 60 de secunde.
5. Domeniul `https://hamangiastudio.ro` devine live și securizat cu lacăt în browser!

---

### PASUL 5: Verificare Resend
1. Revino în contul Resend la **Domains** → `hamangiastudio.ro`.
2. Apasă pe butonul **Verify Records**.
3. Când toate cele 3 rânduri au bifă verde, statusul domeniului devine **Verified**.
4. Din acest moment, emailurile trimise de pe `contact@hamangiastudio.ro` vor avea livrabilitate 100% în Inbox (fără Spam).

---

### PASUL 6: Adăugare Variabile de Mediu în Vercel
Mergi în Vercel la **Settings** → **Environment Variables** și adaugă:

| Variabilă | Valoare | Descriere |
|---|---|---|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxxxx` | Cheia API generată la Pasul 2 |
| `EMAIL_FROM` | `HAMANGIA Studio <contact@hamangiastudio.ro>` | Numele și adresa expeditorului |
| `NOTIFICATION_EMAIL` | *adresa ta personală de Gmail* | Unde primești mesajele de la clienți din formularul de Contact |
| `WORKSHOP_EMAIL` | *emailul atelierului de print DTF* | Unde pleacă automat comenzile spre printare |
| `SITE_URL` | `https://hamangiastudio.ro` | Domeniul oficial de producție |
| `STRIPE_SECRET_KEY` | `sk_live_...` | Cheia secretă Stripe pentru plăți card |
| `STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | Cheia publică Stripe pentru checkout |

Apasă pe **Save** și dă un nou **Redeploy** la proiect pentru ca variabilele să fie încărcate în producție.

---

## 3. CUM FUNCȚIONEAZĂ FLUXUL FĂRĂ CĂSUȚE POȘTALE PLĂTITE (0 LEI)

1. **Formularul `/contact` de pe site:**
   - Vizitatorul completează numele, emailul și mesajul pe site.
   - Codul din `api/contact.js` apelează Resend API.
   - Resend îți trimite mesajul direct pe **Gmail-ul tău personal** (`NOTIFICATION_EMAIL`), având câmpul `reply-to` setat pe emailul clientului.
   - Tu doar apeși **Reply** în Gmail și îi răspunzi clientului direct! Zero costuri cu servere de mail.

2. **Comenzile noi & Notificarea Atelierului:**
   - La plasarea unei comenzi (Stripe sau Ramburs), codul trimite automat confirmarea către client și fișierul de print către atelier prin Resend.
   - Totul este automatizat la nivel de serverless, fără abonamente lunare.
