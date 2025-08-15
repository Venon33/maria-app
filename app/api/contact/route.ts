// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs' // ✅ asegura Node (Nodemailer no funciona en Edge)
export const dynamic = 'force-dynamic'

/** Sanea texto simple para insertar en HTML */
const escapeHTML = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] as string))

/** Valida email simple */
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

const EMAIL_HOST = process.env.EMAIL_HOST
const EMAIL_PORT = Number(process.env.EMAIL_PORT || 465)
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
  console.error('❌ Faltan variables EMAIL_HOST/EMAIL_USER/EMAIL_PASS')
}

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_PORT === 465,
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  // tls: { rejectUnauthorized: true }, // opcional
})

export async function POST(req: Request) {
  try {
    const { name, email, message, website } = await req.json()

    // 🛡️ Honeypot (campo oculto "website" debe venir vacío)
    if (typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json({ ok: true }) // silenciar bots
    }

    // Normaliza
    const nameN = String(name || '').trim().slice(0, 120)
    const emailN = String(email || '').trim().slice(0, 160)
    const msgN = String(message || '').trim().slice(0, 5000)

    if (!nameN || !emailN || !msgN) {
      return NextResponse.json({ ok: false, error: 'Todos los campos son obligatorios' }, { status: 400 })
    }
    if (!isEmail(emailN)) {
      return NextResponse.json({ ok: false, error: 'Email no válido' }, { status: 400 })
    }
    if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json({ ok: false, error: 'Error de configuración del servidor' }, { status: 500 })
    }

    const safeName = escapeHTML(nameN)
    const safeEmail = escapeHTML(emailN)
    const safeMsg = escapeHTML(msgN)

    const subject = `Nuevo contacto de ${safeName}`

    await transporter.sendMail({
      from: `"Web Despacho" <${EMAIL_USER}>`,
      to: EMAIL_USER,            // te llega a ti
      replyTo: emailN,           // responder al cliente
      subject,
      html: `
        <h2>Nuevo mensaje del formulario</h2>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Mensaje:</strong></p>
        <pre style="font-family:inherit; white-space:pre-wrap; background:#fafafa; padding:12px; border:1px solid #eee; border-radius:8px;">${safeMsg}</pre>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('❌ Error enviando correo:', err)
    return NextResponse.json(
      { ok: false, error: 'Hubo un problema al enviar el mensaje. Inténtelo más tarde.' },
      { status: 500 }
    )
  }
}

// (Opcional) rechaza otros métodos
export async function GET() {
  return NextResponse.json({ ok: false, error: 'Método no permitido' }, { status: 405 })
}


