/**
 * api/subscribe.js
 *
 * Vercel Serverless Function — Abonare Newsletter & Cercul Exclusiv HAMANGIA prin Resend API.
 */

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, type, website } = req.body

  if (website) return res.status(200).json({ success: true })
  if (!email) return res.status(400).json({ error: 'Email required' })

  const isJoin = type === 'join'
  const subject = isJoin
    ? `[HAMANGIA MEMBRU NOU] Cerere acces prioritar: ${email}`
    : `[HAMANGIA NEWSLETTER] Abonat nou: ${email}`

  try {
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('placeholder')) {
      console.log('⚡ [DEV RESEND SIMULATION] Subscriber:', { email, type })
      return res.status(200).json({ success: true, simulated: true })
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'HAMANGIA Studio <contact@hamangiastudio.ro>',
      to: process.env.NOTIFICATION_EMAIL || 'contact@hamangiastudio.ro',
      reply_to: email,
      subject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111; max-width: 600px; padding: 24px; border: 1px solid #eaeaea; background-color: #fafafa;">
          <div style="border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 18px; letter-spacing: 0.15em; text-transform: uppercase;">HAMANGIA STUDIO</h1>
            <p style="margin: 4px 0 0; font-size: 11px; color: #666; letter-spacing: 0.1em; text-transform: uppercase;">
              ${isJoin ? 'Cerere Înrolare Cerc Exclusiv' : 'Abonat Newsletter Nou'}
            </p>
          </div>
          <p style="font-size: 14px; margin-bottom: 12px;">Un nou utilizator s-a înscris pe <strong>hamangiastudio.ro</strong>:</p>
          <div style="background-color: #fff; padding: 12px 16px; border: 1px solid #ddd; font-family: monospace; font-size: 14px; color: #000; margin-bottom: 16px;">
            ${email}
          </div>
          <p style="font-size: 12px; color: #777; margin: 0;">
            Tip solicitare: <strong>${isJoin ? 'Membru Prioritar (Join)' : 'Newsletter General'}</strong> | Data: ${new Date().toLocaleString('ro-RO')}
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('❌ Resend API Error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ success: true, id: data?.id })
  } catch (err) {
    console.error('❌ Subscribe handler exception:', err)
    return res.status(500).json({ error: 'Failed to send' })
  }
}
