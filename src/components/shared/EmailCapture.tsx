import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

export default function EmailCapture() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { language } = useLanguage()
  const isRo = language === 'ro'

  useEffect(() => {
    const hasSubscribed =
      localStorage.getItem('hamangia_newsletter_sub') ||
      localStorage.getItem('hamangia_email_captured')
    if (hasSubscribed) return

    const timer = setTimeout(() => {
      const alreadyHandled =
        localStorage.getItem('hamangia_newsletter_sub') ||
        localStorage.getItem('hamangia_email_captured')
      if (!alreadyHandled) {
        setIsOpen(true)
      }
    }, 11000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    localStorage.setItem('hamangia_newsletter_sub', 'true')
    localStorage.setItem('hamangia_email_captured', 'true')
    localStorage.setItem('hamangia_email', email)

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), brand: 'HAMANGIA' }),
      })
    } catch (err) {
      console.warn('⚠️ Subscribe notice:', err)
    } finally {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }
  }

  const handleClose = () => {
    localStorage.setItem('hamangia_newsletter_sub', 'true')
    localStorage.setItem('hamangia_email_captured', 'true')
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9998]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-neutral-950 border border-neutral-800 z-[9999] p-8 md:p-10 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <p
                    className="uppercase mb-3 font-mono text-neutral-500 text-[10px] tracking-[0.35em]"
                  >
                    {isRo ? 'ACCES PRIVAT // DROP 01' : 'MEMBERS ONLY // PRIVATE TRANSMISSION'}
                  </p>
                  <h2
                    className="uppercase mb-4 font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight"
                  >
                    {isRo ? 'Alătură-te\nCercului HAMANGIA' : 'Join the\nInner Circle'}
                  </h2>
                  <p
                    className="text-xs sm:text-sm leading-relaxed max-w-[92%] mx-auto text-neutral-400"
                  >
                    {isRo ? (
                      <>Primește notificări anticipate pentru tirajele scurte din bumbac greu de 240g, mostre de atelier și reduceri de membru.</>
                    ) : (
                      <>Receive private notifications for limited 240 GSM runs, studio samples, and priority access prior to public release.</>
                    )}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isRo ? 'INTRODU ADRESA DE EMAIL' : 'ENTER YOUR EMAIL'}
                    required
                    className="w-full bg-black border border-neutral-700 text-white text-xs tracking-wide px-4 py-3.5 placeholder:text-neutral-600 focus:border-white focus:outline-none transition-colors"
                    style={{ borderRadius: 0 }}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-white text-black text-xs tracking-[0.2em] px-6 py-3.5 uppercase font-semibold hover:bg-neutral-200 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ borderRadius: 0 }}
                  >
                    {isSubmitting ? (isRo ? 'SE ÎNREGISTREAZĂ...' : 'INITIATING...') : (isRo ? 'SOLICITĂ ACCES PRIORITAR' : 'REQUEST EARLY ACCESS')}
                  </button>
                </form>

                <p className="text-[9.5px] text-neutral-500 text-center mt-6 uppercase tracking-widest font-mono">
                  {isRo ? 'CONFIDENȚIALITATE STRICTĂ. ZERO SPAM. DEZABONARE RAPIDĂ.' : 'STRICT PRIVACY. ZERO SPAM. DIRECT TRANSMISSIONS ONLY.'}
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <p
                  className="uppercase mb-3 font-mono text-[10px] tracking-[0.35em] text-neutral-400"
                >
                  {isRo ? 'Înregistrare Reușită' : 'Initiation Complete'}
                </p>
                <h2
                  className="uppercase mb-6 font-display text-2xl font-semibold text-white tracking-tight"
                >
                  {isRo ? 'ACCES CONFIRMAT' : 'ACCESS GRANTED'}
                </h2>

                <div className="border border-neutral-800 bg-black/60 p-4 mb-6">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-1 font-mono">
                    {isRo ? 'Alocare Prioritară' : 'Priority Allocation'}
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-white font-mono">
                    HAMANGIA STUDIO // MEMBRU CONFIRMAT
                  </p>
                </div>

                <p
                  className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-8"
                >
                  {isRo ? (
                    <>Ai fost înscris pe lista de alocare prioritară. Vei primi notificări direct pe email înainte de fiecare lansare publică.</>
                  ) : (
                    <>You are now on the private allocation list. You will receive direct transmissions prior to every public release.</>
                  )}
                </p>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full bg-white text-black text-xs tracking-[0.2em] px-6 py-3 uppercase font-semibold hover:bg-neutral-200 transition-colors"
                  style={{ borderRadius: 0 }}
                >
                  {isRo ? 'Explorează Colecția' : 'Enter Collection'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
