import Home from './pages/Home'
import Drops from './pages/Drops'
import ProductDetail from './pages/ProductDetail'
import Story from './pages/Story'
import Heritage from './pages/Heritage'
import Essentials from './pages/Essentials'
import Join from './pages/Join'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { CartProvider } from './components/cart/CartContext'
import { CurrencyProvider } from './context/CurrencyContext'
import { LanguageProvider } from './context/LanguageContext'
import CartDrawer from './components/cart/CartDrawer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import ShippingPolicy from './pages/ShippingPolicy'
import RefundPolicy from './pages/RefundPolicy'
import TrackOrder from './pages/TrackOrder'
import OrderSuccess from './pages/OrderSuccess'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import EmailCapture from './components/shared/EmailCapture'
import CookieBanner from './components/shared/CookieBanner'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { applySEO } from './hooks/useSEO'
import { Analytics } from '@vercel/analytics/react'
import { trackPinterestPageView } from './lib/pinterest'

// ─── SEO config per-rută ────────────────────────────────────────────────────
// Paginile de produs (/product/:id) își setează SEO-ul intern în ProductDetail.
// Aici configurăm toate rutele statice.

const ROUTE_SEO: Record<string, Parameters<typeof applySEO>[0]> = {
  '/': {
    path: '/',
    title: 'HAMANGIA — Arhaic & Dark Folklore Streetwear',
    description: 'Atelier independent de creație textilă. Piese heavyweight 240g inspirate din gravură medievală și folclor arhaic românesc.',
  },
  '/drops': {
    path: '/drops',
    title: 'Colecția Arhaică // Drop 01 | HAMANGIA',
    description: 'Piese din bumbac greu de 240 GSM. Gravură medievală și simetrii neolitice românești.',
  },
  '/roots': {
    path: '/roots',
    title: 'To the Roots — Colecția Arhaică | HAMANGIA',
    description: 'Piese din bumbac greu de 240g inspirate din gravură medievală și folclor arhaic românesc.',
  },
  '/heritage': {
    path: '/heritage',
    title: 'To the Roots — Colecția Arhaică | HAMANGIA',
    description: 'Piese din bumbac greu de 240g inspirate din gravură medievală și folclor arhaic românesc.',
  },
  '/essentials': {
    path: '/essentials',
    title: 'Esențiale // Chilimuri Geometrice | HAMANGIA',
    description: 'Simetrii geometrice arhaice extrase din vechile chilimuri. Bumbac heavyweight 240 GSM.',
  },
  '/story': {
    path: '/story',
    title: 'Povestea Originii — Atelier Hamangia | HAMANGIA',
    description: 'Originea brandului HAMANGIA — tăcerea pietrei neolitice și rigoarea xilogravurii medievale.',
  },
  '/join': {
    path: '/join',
    title: 'Comunitate & Acces Exclusiv | HAMANGIA',
    description: 'Fii primul informat despre tirajele scurte de atelier și noile drop-uri HAMANGIA.',
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Atelier | HAMANGIA',
    description: 'Ia legătura cu echipa atelierului HAMANGIA Studio pentru comenzi sau asistență.',
  },
  '/track-order': {
    path: '/track-order',
    title: 'Urmărește Comanda | HAMANGIA',
    description: 'Verifică statusul livrării Sameday Easybox sau curier pentru comanda ta.',
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: 'Politică de Confidențialitate | HAMANGIA',
    description: 'Politica de confidențialitate și protecție a datelor GDPR — HAMANGIA STUDIO.',
  },
  '/terms-of-service': {
    path: '/terms-of-service',
    title: 'Termeni și Condiții | HAMANGIA',
    description: 'Termenii și condițiile de vânzare ale atelierului HAMANGIA STUDIO.',
  },
  '/shipping-policy': {
    path: '/shipping-policy',
    title: 'Politică de Livrare | HAMANGIA',
    description: 'Informații complete despre livrarea rapidă 24-48h prin Sameday Easybox și curier în România.',
  },
  '/refund-policy': {
    path: '/refund-policy',
    title: 'Politică de Retur | HAMANGIA',
    description: 'Dreptul de retur în 14 zile calendaristice conform OUG 34/2014 — HAMANGIA STUDIO.',
  },
  '/order-success': {
    path: '/order-success',
    title: 'Comandă Confirmată | HAMANGIA',
    description: 'Piesa ta HAMANGIA a intrat în producție.',
    noindex: true,
  },
  '/success': {
    path: '/success',
    title: 'Comandă Confirmată | HAMANGIA',
    description: 'Piesa ta HAMANGIA a intrat în producție.',
    noindex: true,
  },
}

// ─── Components ──────────────────────────────────────────────────────────────

function MotionPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.main>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Delay scroll to allow page render
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 50)
    return () => clearTimeout(timer)
  }, [location.pathname])

  // Inject canonical + title + meta per-rută (rute statice)
  // Paginile de produs (/product/:id) gestionează SEO intern via useSEO.ts
  useEffect(() => {
    // La primul render, pixelii Meta și Pinterest au fost deja declanșați
    // de scripturile inline din index.html. Saltăm pentru a evita dublura.
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      // Meta Pixel PageView on SPA route change
      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'PageView')
      }
      // Pinterest Tag page tracking on SPA route change
      trackPinterestPageView()
    }

    const isProductRoute = location.pathname.startsWith('/product/')
    if (!isProductRoute) {
      const seoConfig = ROUTE_SEO[location.pathname]
      if (seoConfig) {
        applySEO(seoConfig)
      } else {
        // Rută necunoscută (ex: 404) — canonical pe path-ul curent, fără indexare
        applySEO({
          path: location.pathname,
          title: 'Page Not Found | HeavenlyNova',
          noindex: true,
        })
      }
    }
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MotionPage><Home /></MotionPage>} />
        <Route path="/drops" element={<MotionPage><Drops /></MotionPage>} />
        <Route path="/story" element={<MotionPage><Story /></MotionPage>} />
        <Route path="/roots" element={<MotionPage><Heritage /></MotionPage>} />
        <Route path="/heritage" element={<MotionPage><Heritage /></MotionPage>} />
        <Route path="/essentials" element={<MotionPage><Essentials /></MotionPage>} />
        <Route path="/join" element={<MotionPage><Join /></MotionPage>} />
        <Route path="/contact" element={<MotionPage><Contact /></MotionPage>} />
        <Route path="/seraphim" element={<MotionPage><Drops /></MotionPage>} />
        <Route path="/privacy-policy" element={<MotionPage><PrivacyPolicy /></MotionPage>} />
        <Route path="/terms-of-service" element={<MotionPage><TermsOfService /></MotionPage>} />
        <Route path="/shipping-policy" element={<MotionPage><ShippingPolicy /></MotionPage>} />
        <Route path="/refund-policy" element={<MotionPage><RefundPolicy /></MotionPage>} />
        <Route path="/track-order" element={<MotionPage><TrackOrder /></MotionPage>} />
        <Route path="/order-success" element={<MotionPage><OrderSuccess /></MotionPage>} />
        <Route path="/success" element={<MotionPage><OrderSuccess /></MotionPage>} />
        <Route path="/product/:productId" element={<MotionPage><ProductDetail /></MotionPage>} />
        <Route path="*" element={<MotionPage><NotFound /></MotionPage>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CurrencyProvider>
          <CartProvider>
            <EmailCapture />
            <CookieBanner />
            <CartDrawer />
            <div className="min-h-screen bg-black text-white hn-radius-0">
              <Navbar />
              <AnimatedRoutes />
              <Footer />
            </div>
            <Analytics />
          </CartProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
