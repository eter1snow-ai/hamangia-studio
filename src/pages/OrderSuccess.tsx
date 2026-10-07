/**
 * src/pages/OrderSuccess.tsx
 *
 * Pagina de confirmare afișată după finalizarea plății pe Stripe sau înregistrarea comenzii cu Ramburs.
 */

import { useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../components/cart/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { trackPinterestCheckout } from '../lib/pinterest'

export default function OrderSuccess() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { resetCart } = useCart()
  const { language } = useLanguage()
  const isRo = language === 'ro'
  const trackedRef = useRef(false)

  useEffect(() => {
    resetCart()

    if (trackedRef.current) return
    trackedRef.current = true

    let orderData: any = null
    try {
      const raw = localStorage.getItem('hn_pending_checkout')
      if (raw) {
        orderData = JSON.parse(raw)
      }
    } catch {
      /* noop */
    }

    const value = typeof orderData?.value === 'number' ? orderData.value : 0
    const currency = orderData?.currency || 'RON'
    const orderQuantity = typeof orderData?.orderQuantity === 'number' ? orderData.orderQuantity : 1
    const lineItems = Array.isArray(orderData?.lineItems) ? orderData.lineItems : []

    // Pinterest Tag: Checkout
    trackPinterestCheckout({
      value,
      currency,
      orderId: sessionId || undefined,
      orderQuantity,
      lineItems,
    })

    // Meta Pixel: Purchase
    if (typeof window !== 'undefined' && (window as any).fbq) {
      ;(window as any).fbq('track', 'Purchase', {
        value,
        currency,
        content_type: 'product',
        contents: lineItems.map((li: any) => ({
          id: li.product_id,
          quantity: li.product_quantity,
        })),
      })
    }

    try {
      localStorage.removeItem('hn_pending_checkout')
    } catch {
      /* noop */
    }
  }, [resetCart, sessionId])

  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-lg mx-auto"
      >
        {/* Icon confirmare */}
        <div className="mb-8">
          <div
            style={{
              width: '48px',
              height: '48px',
              border: '1px solid #333',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <span style={{ fontSize: '1.2rem', color: '#fff' }}>✓</span>
          </div>
        </div>

        {/* Brand */}
        <p
          style={{ fontSize: '0.65rem', letterSpacing: '0.45em', color: '#888', lineHeight: 1.6 }}
          className="uppercase mb-2 font-mono"
        >
          HAMANGIA STUDIO
        </p>

        {/* Titlu */}
        <h1
          style={{ fontSize: '1.4rem', fontWeight: 500, letterSpacing: '0.12em', color: '#E6E6E6' }}
          className="uppercase mb-4"
        >
          {isRo ? 'Comandă Confirmată' : 'Order Confirmed'}
        </h1>

        {/* Mesaj */}
        <p
          style={{ fontSize: '0.85rem', letterSpacing: '0.04em', color: '#aaa', lineHeight: 2 }}
          className="mb-8"
        >
          {isRo ? (
            <>
              Piesa ta a intrat în pregătire în atelierul de print DTF.
              <br />
              Vei primi email de confirmare și numărul AWB Sameday.
              <br />
              <span className="font-mono text-neutral-400">Livrare estimată: 24–48 ore lucrătoare.</span>
            </>
          ) : (
            <>
              Your piece is in preparation in our local DTF print studio.
              <br />
              You will receive a confirmation email and Sameday AWB details.
              <br />
              <span className="font-mono text-neutral-400">Estimated delivery: 24–48 business hours.</span>
            </>
          )}
        </p>

        {/* Session ID pentru referință */}
        {sessionId && (
          <p
            style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: '#555', lineHeight: 1.6 }}
            className="uppercase mb-8 font-mono"
          >
            Ref: {sessionId.slice(-12).toUpperCase()}
          </p>
        )}

        {/* Divider */}
        <div style={{ width: '40px', height: '1px', backgroundColor: '#333', margin: '0 auto 32px' }} />

        {/* CTA */}
        <Link
          to="/drops"
          style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            color: '#fff',
            textDecoration: 'none',
            border: '1px solid #444',
            padding: '10px 24px',
            transition: 'all 0.2s',
          }}
          className="uppercase hover:bg-white hover:text-black hover:border-white font-mono"
        >
          {isRo ? 'Continuă să Explorezi' : 'Continue Exploring'}
        </Link>
      </motion.div>
    </main>
  )
}
