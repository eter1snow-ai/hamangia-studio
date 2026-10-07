import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../cart/CartContext'
import { useLanguage } from '../../context/LanguageContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [collectionsOpen, setCollectionsOpen] = useState(false)
  const collectionsRef = useRef<HTMLLIElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { openCart, itemCount } = useCart()
  const { language, setLanguage, languages, t } = useLanguage()
  const isJoinPage = location.pathname === '/join'

  const handleDropsFilter = (type?: string, collection?: string) => {
    setOpen(false)
    setCollectionsOpen(false)
    const params = new URLSearchParams()
    if (type) params.set('type', type)
    if (collection) params.set('collection', collection)
    navigate(`/drops?${params.toString()}`)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const init = () => setIsDesktop(mql.matches)
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches)
      if (e.matches) setOpen(false)
    }
    init()
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (collectionsRef.current && !collectionsRef.current.contains(e.target as Node)) {
        setCollectionsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const linkClass = `text-xs font-semibold uppercase tracking-widest transition-soft cursor-pointer ${
    isJoinPage ? 'text-white/20 hover:text-white/40' : 'text-neutral-300 hover:text-white'
  }`

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${
          isJoinPage
            ? 'bg-transparent border-transparent'
            : `border-b border-neutral-800 ${scrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-black/80 backdrop-blur-sm'}`
        }`}
      >
        {!isJoinPage && (
          <aside
            aria-label="Announcement"
            className="w-full border-b border-white/[0.08] bg-[#070707]/95 px-4 py-1.5 text-center select-none"
          >
            <p className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-neutral-300">
              {t('nav.announcement')}
            </p>
          </aside>
        )}
        <nav className="mx-auto flex max-w-[1300px] items-center justify-between px-6 py-4 lg:px-12">
          {/* Logo Brand */}
          <Link
            to="/"
            className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-white transition-soft hover:text-neutral-300"
          >
            HAMANGIA
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex gap-6 lg:gap-8 list-none items-center">
                <li>
                  <span className={linkClass} onClick={() => handleDropsFilter()}>
                    {t('nav.drops')}
                  </span>
                </li>
                <li>
                  <span className={linkClass} onClick={() => navigate('/roots')}>
                    {t('nav.roots')}
                  </span>
                </li>
                <li>
                  <span
                    className={linkClass}
                    onClick={() => {
                      setOpen(false)
                      navigate('/essentials')
                    }}
                  >
                    {t('nav.essentials')}
                  </span>
                </li>
                <li>
                  <span
                    className={linkClass}
                    onClick={() => {
                      setOpen(false)
                      navigate('/story')
                    }}
                  >
                    {t('nav.story')}
                  </span>
                </li>

                {/* Collections Dropdown */}
                <li ref={collectionsRef} className="relative">
                  <span
                    className={`${linkClass} flex items-center gap-1`}
                    onClick={() => setCollectionsOpen(!collectionsOpen)}
                  >
                    {t('nav.collections')}
                    <svg
                      className={`w-3 h-3 transition-transform ${collectionsOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  {collectionsOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-neutral-950 border border-white/10 py-2 z-50 shadow-2xl">
                      {[
                        {
                          label: 'To the Roots (Drop 01)',
                          action: () => {
                            setCollectionsOpen(false)
                            navigate('/roots')
                          },
                        },
                        {
                          label: language === 'ro' ? 'Esențiale' : 'Essentials',
                          action: () => {
                            setCollectionsOpen(false)
                            navigate('/essentials')
                          },
                        },
                        {
                          label: language === 'ro' ? 'Toate Piesele' : 'All Drops',
                          action: () => {
                            setCollectionsOpen(false)
                            navigate('/drops')
                          },
                        },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={item.action}
                          className="block w-full text-left px-4 py-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-colors font-mono"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              </ul>
            </div>

            {/* Language Switcher (RO | EN Only) */}
            <div className="flex items-center text-[10px] tracking-[0.14em] uppercase font-mono border border-neutral-800 bg-neutral-950 px-2.5 py-1">
              {languages.map((l, i) => (
                <span key={l.code} className="flex items-center">
                  {i > 0 && <span className="mx-1.5 text-neutral-700">|</span>}
                  <button
                    onClick={() => setLanguage(l.code)}
                    className={`transition-colors cursor-pointer ${
                      language === l.code ? 'text-white font-bold underline underline-offset-4' : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                    title={l.label}
                  >
                    {l.code.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            {/* Currency Indicator (RON) */}
            <div className="hidden sm:flex items-center text-[10px] tracking-[0.15em] uppercase font-mono border border-neutral-800 bg-neutral-950 px-2 py-1 text-neutral-300 font-bold">
              RON
            </div>

            {/* Cart Icon */}
            <button
              onClick={openCart}
              className={`relative flex items-center justify-center transition-soft ${
                isJoinPage ? 'text-white/40 hover:text-white/60' : 'text-white hover:text-neutral-300'
              }`}
              aria-label="Open cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Toggle */}
            {!isDesktop && (
              <button
                aria-label="Toggle menu"
                onClick={() => setOpen(!open)}
                className={`inline-flex items-center justify-center border px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white transition-soft ml-2 ${
                  isJoinPage ? 'border-white/20 hover:bg-white/10' : 'border-neutral-700 hover:bg-neutral-900'
                }`}
              >
                {open ? (language === 'ro' ? 'Închide' : 'Close') : 'Meniu'}
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {open && !isDesktop && (
          <div className="md:hidden border-t border-neutral-800 bg-black/95 px-6 py-6 backdrop-blur-md">
            <ul className="space-y-4 list-none">
              {[
                { label: t('nav.drops'), action: () => handleDropsFilter() },
                {
                  label: t('nav.roots'),
                  action: () => {
                    setOpen(false)
                    navigate('/roots')
                  },
                },
                {
                  label: t('nav.essentials'),
                  action: () => {
                    setOpen(false)
                    navigate('/essentials')
                  },
                },
                {
                  label: t('nav.story'),
                  action: () => {
                    setOpen(false)
                    navigate('/story')
                  },
                },
              ].map((item) => (
                <li key={item.label}>
                  <span
                    className="block text-sm font-semibold uppercase tracking-widest text-neutral-300 cursor-pointer hover:text-white transition-colors"
                    onClick={item.action}
                  >
                    {item.label}
                  </span>
                </li>
              ))}

              <li className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
                  {language === 'ro' ? 'Limbă' : 'Language'}
                </span>
                <div className="flex items-center text-xs tracking-wider uppercase font-mono border border-neutral-800 bg-neutral-950 px-3 py-1">
                  {languages.map((l, i) => (
                    <span key={l.code} className="flex items-center">
                      {i > 0 && <span className="mx-2 text-neutral-700">|</span>}
                      <button
                        onClick={() => setLanguage(l.code)}
                        className={`transition-colors ${
                          language === l.code ? 'text-white font-bold underline' : 'text-neutral-500'
                        }`}
                      >
                        {l.code.toUpperCase()}
                      </button>
                    </span>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  )
}
