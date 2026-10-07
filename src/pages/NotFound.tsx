import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function NotFound() {
  const { language } = useLanguage()
  const isRo = language === 'ro'

  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-6 max-w-lg"
      >
        <p
          style={{
            fontSize: '0.62rem',
            letterSpacing: '0.55em',
            color: '#777777',
            lineHeight: 1.6,
          }}
          className="uppercase mb-6 font-mono"
        >
          {isRo ? 'EROARE 404 — PAGINĂ NEGĂSITĂ' : '404 — NOT FOUND'}
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 400,
            letterSpacing: '0.08em',
            lineHeight: 1.1,
            color: '#E6E6E6',
          }}
          className="uppercase mb-6"
        >
          {isRo ? 'Pagină Inexistentă' : 'Lost in the void.'}
        </h1>
        <p
          style={{
            fontSize: '0.82rem',
            letterSpacing: '0.1em',
            lineHeight: 1.8,
            color: '#888888',
            maxWidth: '380px',
            margin: '0 auto 40px',
          }}
        >
          {isRo ? (
            <>Punctul de acces solicitat nu există sau a fost mutat.<br />Revino la vitrina colecțiilor noastre.</>
          ) : (
            <>This route does not exist or has been shifted.<br />Return to explore the catalog.</>
          )}
        </p>
        <Link
          to="/drops"
          className="inline-flex items-center border border-white/40 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
          style={{ borderRadius: 0 }}
        >
          {isRo ? 'Înapoi la Piese' : 'Back to Drops'}
        </Link>
      </motion.div>
    </main>
  )
}
