/**
 * api/inbound.js
 *
 * Vercel Serverless Function — Resend Inbound Webhook Forwarder.
 * Prinde orice email trimis la contact@hamangiastudio.ro și îl redirecționează
 * instant în Gmail-ul personal (eter1snow@gmail.com), păstrând reply-to pe expeditor.
 */

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = req.body || {}
    const { type, data } = body

    // Resend trimite type: 'email.received'
    const emailId = data?.email_id || data?.id

    if (!emailId) {
      console.warn('⚠️ [Inbound] Nu s-a primit email_id în payload:', body)
      return res.status(200).json({ received: true, ignored: true })
    }

    // Preluăm detaliile complete ale emailului recepționat
    const emailDetails = await resend.emails.receiving.get(emailId)

    if (!emailDetails || emailDetails.error) {
      console.error('❌ [Inbound] Eroare la preluarea emailului din Resend:', emailDetails?.error)
      return res.status(500).json({ error: 'Failed to retrieve email details' })
    }

    const { from, subject, text, html, attachments, to } = emailDetails.data || emailDetails

    console.log(`📩 [Inbound] Email recepționat de la: ${from} | Subiect: ${subject} | Către: ${to}`)

    // Pregătim corpul de trimis către Gmail
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'eter1snow@gmail.com'
    const emailFrom = process.env.EMAIL_FROM || 'HAMANGIA Studio <contact@hamangiastudio.ro>'

    const forwardHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; background: #fafafa; border-radius: 6px;">
        <div style="border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 16px;">
          <h2 style="margin: 0; font-size: 16px; letter-spacing: 0.15em; text-transform: uppercase;">HAMANGIA STUDIO // INBOUND EMAIL</h2>
          <p style="margin: 4px 0 0; font-size: 12px; color: #666;">Mesaj recepționat pe <strong>contact@hamangiastudio.ro</strong></p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 16px;">
          <tr>
            <td style="padding: 4px 0; color: #777; width: 90px;">Expeditor:</td>
            <td style="padding: 4px 0; font-weight: bold; color: #111;">${from}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #777;">Destinatar:</td>
            <td style="padding: 4px 0; color: #333;">${Array.isArray(to) ? to.join(', ') : to}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #777;">Subiect:</td>
            <td style="padding: 4px 0; font-weight: bold; color: #111;">${subject || '(Fără subiect)'}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #777;">Data:</td>
            <td style="padding: 4px 0; color: #555;">${new Date().toLocaleString('ro-RO')}</td>
          </tr>
        </table>

        <div style="background: #ffffff; border: 1px solid #e5e5e5; padding: 18px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #222;">
          ${html || `<pre style="white-space: pre-wrap; font-family: inherit;">${text || '(Mesaj gol)'}</pre>`}
        </div>

        <p style="margin-top: 20px; font-size: 11px; color: #888; text-align: center;">
          💡 Apasă direct <strong>Reply</strong> în Gmail pentru a-i răspunde expeditorului (${from}).
        </p>
      </div>
    `

    // Trimitere către Gmail
    const forwardResult = await resend.emails.send({
      from: emailFrom,
      to: [notificationEmail],
      reply_to: from,
      subject: `[HAMANGIA MAIL] ${subject || '(Fără subiect)'} — de la ${from}`,
      html: forwardHtml,
      text: `De la: ${from}\nSubiect: ${subject}\n\n${text || ''}`,
    })

    console.log('✅ [Inbound] Redirecționat cu succes în Gmail:', forwardResult.data?.id)

    return res.status(200).json({ success: true, forwarded_id: forwardResult.data?.id })
  } catch (err) {
    console.error('❌ [Inbound Exception]:', err)
    return res.status(500).json({ error: err.message || 'Internal inbound error' })
  }
}
