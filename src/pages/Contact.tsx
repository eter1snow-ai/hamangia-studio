import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { language } = useLanguage()

  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isRo = language === 'ro'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.message || !form.name) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError(isRo ? 'A apărut o problemă. Te rugăm să încerci din nou.' : 'Something went wrong. Try again.')
      }
    } catch {
      setError(isRo ? 'A apărut o problemă. Te rugăm să încerci din nou.' : 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-black text-white min-h-screen">

      {/* Hero */}
      <section className="mx-auto max-w-[1300px] px-6 lg:px-12" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.45em', color: '#888888', lineHeight: 1.6 }} className="uppercase mb-5 font-mono">
            {isRo ? 'CAPITOLUL /000 — DIALOG DIRECT' : 'CHAPTER /000 — DIRECT INQUIRY'}
          </p>
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', fontWeight: 500, letterSpacing: '0.08em', lineHeight: 1.2, color: '#E6E6E6' }} className="uppercase mb-6">
            {isRo ? 'Contactează\nAtelierul' : 'Reach the\nStudio'}
          </h1>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', lineHeight: 1.9, color: '#888888', maxWidth: '480px' }} className="uppercase">
            {isRo ? (
              <>Fiecare mesaj intră în registrul nostru.<br />Răspundem cu rigoare și atenție artizanală.</>
            ) : (
              <>Every transmission enters our register.<br />We answer with intention and artisan precision.</>
            )}
          </p>
        </motion.div>
      </section>

      <div className="border-t border-white/5" />

      {/* Main Grid */}
      <section className="mx-auto max-w-[1300px] px-6 lg:px-12" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
        <div className="grid gap-20 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            {!sent ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                {[
                  {
                    key: 'name',
                    label: isRo ? 'Numele Tău' : 'Your Name',
                    placeholder: isRo ? 'Introdu numele complet' : 'Enter your full name',
                    type: 'text',
                  },
                  {
                    key: 'email',
                    label: isRo ? 'Adresa de Email' : 'Email Address',
                    placeholder: isRo ? 'adresa@domeniu.ro' : 'name@domain.com',
                    type: 'email',
                  },
                ].map((field) => (
                  <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: '#888888', lineHeight: 1.6 }} className="uppercase font-mono">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as 'name' | 'email']}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      style={{ background: 'transparent', borderBottom: '1px solid #2A2A2A', color: '#E6E6E6', fontSize: '0.85rem', letterSpacing: '0.15em', lineHeight: 1.6, padding: '12px 0', outline: 'none', borderRadius: 0 }}
                      className="placeholder:text-white/20 focus:border-b focus:border-white/40 transition-colors"
                    />
                  </div>
                ))}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: '#888888', lineHeight: 1.6 }} className="uppercase font-mono">
                    {isRo ? 'Mesajul Tău' : 'Your Message'}
                  </label>
                  <textarea
                    placeholder={isRo ? 'Scrie detaliile solicitării tale...' : 'Speak your truth…'}
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ background: 'transparent', borderBottom: '1px solid #2A2A2A', color: '#E6E6E6', fontSize: '0.85rem', letterSpacing: '0.15em', lineHeight: 1.8, padding: '12px 0', outline: 'none', resize: 'none', borderRadius: 0 }}
                    className="placeholder:text-white/20 focus:border-b focus:border-white/40 transition-colors"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{ alignSelf: 'flex-start', border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: '#E6E6E6', fontSize: '0.7rem', letterSpacing: '0.35em', padding: '14px 40px', borderRadius: 0, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
                    className="uppercase hover:bg-white hover:text-black transition-colors"
                  >
                    {loading ? (isRo ? 'Se transmite...' : 'Transmitting...') : (isRo ? 'Trimite Mesaj' : 'Transmit')}
                  </button>
                  {error && <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: '#ff4444' }} className="uppercase">{error}</p>}
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', lineHeight: 1.6, color: '#555555' }} className="uppercase font-mono">
                    {isRo ? 'Datele tale sunt protejate conform GDPR. Fără spam.' : 'Your message remains secure. Zero spam.'}
                  </p>
                </div>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ paddingTop: '40px' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: '#888888' }} className="uppercase mb-4 font-mono">
                  {isRo ? 'Mesaj Înregistrat' : 'Transmission received'}
                </p>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 400, letterSpacing: '0.1em', lineHeight: 1.4, color: '#E6E6E6' }} className="uppercase mb-4">
                  {isRo ? 'Mesajul tău a fost transmis cu succes.' : 'Your truth has been received.'}
                </h2>
                <p style={{ fontSize: '0.78rem', letterSpacing: '0.2em', lineHeight: 1.8, color: '#888888' }} className="uppercase">
                  {isRo ? 'Vei primi un răspuns de la atelier în 24–48 de ore.' : 'Expect a sign within 24–48 hours.'}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>

            {/* Direct Contact */}
            {[
              {
                label: isRo ? 'Asistență Comenzi & Retururi' : 'Support Channel',
                email: 'contact@hamangiastudio.ro',
                desc: isRo ? 'Pentru comenzi, livrări Sameday Easybox sau retururi de produse.' : 'For orders, Sameday Easybox shipping, or returns.',
              },
              {
                label: isRo ? 'Parteneriate & Presă' : 'Brand Inquiries',
                email: 'contact@hamangiastudio.ro',
                desc: isRo ? 'Pentru colaborări artistice, proiecte speciale și presă culturală.' : 'For artistic collaborations, press, or studio inquiries.',
              },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: '#888888', lineHeight: 1.6 }} className="uppercase font-mono">{item.label}</p>
                <a href={`mailto:${item.email}`} style={{ fontSize: '0.85rem', letterSpacing: '0.15em', lineHeight: 1.6, color: '#C2C2C2' }}
                  className="uppercase hover:text-white transition-colors">{item.email}</a>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', lineHeight: 1.7, color: '#555555' }}>{item.desc}</p>
              </div>
            ))}

            {/* Response Time */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: '#888888', lineHeight: 1.6 }} className="uppercase font-mono">
                {isRo ? 'Timp de Răspuns' : 'Response Window'}
              </p>
              <p style={{ fontSize: '0.85rem', letterSpacing: '0.15em', lineHeight: 1.6, color: '#C2C2C2' }} className="uppercase">
                {isRo ? '24–48 ore lucrătoare.' : '24–48 business hours.'}
              </p>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', lineHeight: 1.7, color: '#555555' }}>
                {isRo ? 'Lucrăm cu precizie artizanală, fără grabă industrială.' : 'We move with precision and artisan focus.'}
              </p>
            </div>

            {/* Location */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', color: '#888888', lineHeight: 1.6 }} className="uppercase font-mono">
                {isRo ? 'Origine & Atelier' : 'Origin & Studio'}
              </p>
              <p style={{ fontSize: '0.78rem', letterSpacing: '0.15em', lineHeight: 1.8, color: '#555555' }}>
                {isRo ? (
                  <>HAMANGIA STUDIO operează independent în România.<br />Piese heavyweight create la comandă și expediate direct din atelierul local.</>
                ) : (
                  <>HAMANGIA STUDIO operates independently in Romania.<br />Heavyweight pieces crafted to order and dispatched from our local studio.</>
                )}
              </p>
            </div>

          </motion.div>
        </div>
      </section>

    </main>
  )
}
