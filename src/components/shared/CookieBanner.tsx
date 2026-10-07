import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const { language } = useLanguage()
  const isRo = language === 'ro'

  useEffect(() => {
    const hasAccepted = localStorage.getItem('hamangia_cookies_accepted')
    if (!hasAccepted) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('hamangia_cookies_accepted', 'true')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('hamangia_cookies_accepted', 'declined')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[9997] bg-black border-t border-neutral-800 px-6 py-4"
        >
          <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-300 leading-relaxed text-center sm:text-left font-mono">
              {isRo ? (
                <>Folosim cookie-uri tehnice pentru funcționarea coșului și securitatea checkout-ului conform GDPR.</>
              ) : (
                <>We use technical cookies for cart functionality and secure checkout under GDPR regulations.</>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDecline}
                className="border border-neutral-700 bg-transparent px-5 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors whitespace-nowrap"
                style={{ borderRadius: 0 }}
              >
                {isRo ? 'Refuză' : 'Decline'}
              </button>
              <button
                onClick={handleAccept}
                className="border border-white bg-white text-black px-6 py-2 text-[11px] font-mono font-semibold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors whitespace-nowrap"
                style={{ borderRadius: 0 }}
              >
                {isRo ? 'Acceptă' : 'Accept'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
