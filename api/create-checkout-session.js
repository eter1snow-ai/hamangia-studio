/**
 * api/create-checkout-session.js
 *
 * Vercel Serverless Function — Stripe Checkout Session (RON)
 * Adaptat exclusiv pentru brandul HAMANGIA (hamangiastudio.ro).
 */

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder')

// ─── Catalogul de prețuri autorizate HAMANGIA (în bani RON) ───────────────────
const AUTHORIZED_PRICES_RON = {
  'cavalerul-woodcut':   18900,  // 189 RON
  'chilim-cocos-white':  16900,  // 169 RON
  'chilim-cocos-black':  16900,  // 169 RON
  'angel-wings-black':   16900,  // 169 RON
  'horizon-roots-tee':   14900,  // 149 RON
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    let body = req.body
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch {
        body = {}
      }
    }

    const { cartLines } = body || {}

    if (!cartLines || !Array.isArray(cartLines) || cartLines.length === 0) {
      return res.status(400).json({ error: 'Coș invalid: cartLines trebuie să conțină produse.' })
    }

    const lineItems = []

    for (const item of cartLines) {
      const { productId, size, quantity, productTitle, imageUrl } = item

      if (!productId || !size || !quantity) {
        return res.status(400).json({
          error: `Linie de coș invalidă: ${JSON.stringify(item)}`,
        })
      }

      const authorizedPriceBani = AUTHORIZED_PRICES_RON[productId]
      if (!authorizedPriceBani) {
        return res.status(400).json({
          error: `Produs necunoscut în catalogul HAMANGIA: "${productId}"`,
        })
      }

      const siteUrl = process.env.SITE_URL || 'https://hamangiastudio.ro'
      const validImageUrl = imageUrl && imageUrl.startsWith('http')
        ? imageUrl
        : imageUrl && imageUrl.startsWith('/')
          ? `${siteUrl}${imageUrl}`
          : undefined

      lineItems.push({
        price_data: {
          currency: 'ron',
          product_data: {
            name: `${productTitle || productId} — Mărime: ${size.toUpperCase()}`,
            description: '240 GSM Heavyweight Cotton // HAMANGIA STUDIO',
            ...(validImageUrl ? { images: [validImageUrl] } : {}),
          },
          unit_amount: authorizedPriceBani,
        },
        quantity: parseInt(quantity, 10),
      })
    }

    const orderItemsMetadata = JSON.stringify(
      cartLines.map((item) => ({
        productId: item.productId,
        size: item.size,
        productTitle: item.productTitle,
        quantity: item.quantity,
      }))
    )

    const siteBase = process.env.SITE_URL || 'https://hamangiastudio.ro'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,

      shipping_address_collection: {
        allowed_countries: ['RO'],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'ron' },
            display_name: 'Livrare Gratuită (Sameday Easybox & Curier)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },
            },
          },
        },
      ],

      customer_creation: 'always',

      metadata: {
        hamangia_order_items: orderItemsMetadata,
        source: 'hamangiastudio.ro',
      },

      success_url: `${siteBase}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteBase}/`,
    })

    return res.status(200).json({ sessionUrl: session.url })

  } catch (err) {
    console.error('[create-checkout-session] Error:', err)
    return res.status(500).json({
      error: err.message || 'Eroare internă la crearea sesiunii Stripe.',
    })
  }
}
