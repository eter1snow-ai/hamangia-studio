/**
 * api/contact.js
 *
 * Vercel Serverless Function — Procesare Formular Contact prin Resend API.
 * Trimite mesajul direct pe emailul administratorului fără căsuță poștală plătită.
 */

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message, website } = req.body

  // Honeypot anti-spam
  if (website) {
    return res.status(200).json({ success: true })
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Dacă cheia este încă placeholder (în dev local), simulăm succesul
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('placeholder')) {
      console.log('⚡ [DEV RESEND SIMULATION] Contact email:', { name, email, message })
      return res.status(200).json({ success: true, simulated: true })
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'HAMANGIA Studio <contact@hamangiastudio.ro>',
      to: process.env.NOTIFICATION_EMAIL || 'contact@hamangiastudio.ro',
      reply_to: email,
      subject: `[HAMANGIA CONTACT] Solicitare nouă de la ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111; max-width: 600px; padding: 24px; border: 1px solid #eaeaea; background-color: #fafafa;">
          <div style="border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 18px; letter-spacing: 0.15em; text-transform: uppercase;">HAMANGIA STUDIO</h1>
            <p style="margin: 4px 0 0; font-size: 11px; color: #666; letter-spacing: 0.1em; text-transform: uppercase;">Formular Contact Web (hamangiastudio.ro)</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #777; width: 100px;">Nume:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #111;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #777;">Email:</td>
              <td style="padding: 8px 0; color: #111;"><a href="mailto:${email}" style="color: #000; font-weight: bold;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #777;">Data:</td>
              <td style="padding: 8px 0; color: #555;">${new Date().toLocaleString('ro-RO')}</td>
            </tr>
          </table>
          <div style="background-color: #ffffff; border: 1px solid #e0e0e0; padding: 16px; border-radius: 4px;">
            <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #888;">Mesaj transmis:</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.7; white-space: pre-wrap; color: #222;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 11px; color: #999; text-align: center;">
            Apasă direct "Reply" în clientul tău de mail pentru a-i răspunde lui ${name} (${email}).
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
    console.error('❌ Contact handler exception:', err)
    return res.status(500).json({ error: 'Failed to send message' })
  }
}
