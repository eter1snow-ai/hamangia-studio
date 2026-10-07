import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Join.css'

export default function Join() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { language } = useLanguage()
  const isRo = language === 'ro'

  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'join' }),
      })
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Background Graphic */}
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        src="/Assets/Images/Hamangia/cavalerul-woodcut.png"
        alt="HAMANGIA Dark Woodcut"
        style={{ filter: 'grayscale(100%) contrast(150%)' }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full px-6 py-20"
      >
        <div className="text-center mb-10">
          <p className="uppercase mb-4 font-mono text-[10px] tracking-[0.45em] text-neutral-400">
            {isRo ? 'ACCES EXCLUSIV // MEMBRI' : 'MEMBERS ONLY // PRIVATE TRANSMISSION'}
          </p>
          <h1 className="uppercase mb-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            {isRo ? 'Drop 01 // Lansare Arhaică' : 'Drop 01 // Archaic Release'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm mx-auto">
            {isRo ? (
              <>Fii primul informat despre tirajele scurte de atelier, mostrele unice de gravură și accesul anticipat la fiecare piesă nouă.</>
            ) : (
              <>Receive private notifications for limited studio runs, woodcut artifacts, and priority access prior to public release.</>
            )}
          </p>
        </div>

        {!sent ? (
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder={isRo ? 'INTRODUCETI ADRESA DE EMAIL' : 'ENTER YOUR EMAIL'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/80 border border-neutral-700 text-white text-xs tracking-wider px-4 py-3.5 focus:border-white focus:outline-none transition-colors"
                style={{ borderRadius: 0 }}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black text-xs tracking-[0.25em] px-6 py-3.5 uppercase font-semibold hover:bg-neutral-200 transition-colors"
                style={{ borderRadius: 0, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (isRo ? 'SE ÎNREGISTREAZĂ...' : 'INITIATING...') : (isRo ? 'SOLICITĂ ACCES PRIORITAR' : 'REQUEST EARLY ACCESS')}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 border border-neutral-800 bg-neutral-950 p-6">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-300 mb-2">
              {isRo ? '✦ Solicitare Înregistrată' : '✦ Allocation Confirmed'}
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {isRo ? (
                <>Ai fost adăugat pe lista privată a atelierului HAMANGIA. Vei primi primul transmisiunile noastre.</>
              ) : (
                <>You have been added to the private HAMANGIA allocation list. Watch for incoming signals.</>
              )}
            </p>
          </div>
        )}

        <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-600 mt-6 text-center">
          {isRo ? 'Protecție strictă GDPR. Zero Spam. Dezabonare facilă.' : 'Strict privacy. Zero spam. Unsubscribe anytime.'}
        </p>
      </motion.div>
    </main>
  )
}
