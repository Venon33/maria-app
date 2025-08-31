import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY || ''
const REQUIRE_TURNSTILE = process.env.TURNSTILE_REQUIRED === '1'

const escapeHTML = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))

// ===== Rate-limit (opcional, sin Upstash no falla) =====
let rl: any = null
async function ensureRL() {
  if (rl) return rl
  try {
    const { Ratelimit } = await import('@upstash/ratelimit')
    const { Redis } = await import('@upstash/redis')
    rl = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '10 m'),
    })
  } catch {
    rl = null
  }
  return rl
}

// ===== Validación =====
const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(10).max(4000),
  website: z.string().optional(),
  cfTurnstileToken: z.string().min(10).optional(),
})

// ===== Email (Nodemailer) =====
const EMAIL_HOST = process.env.EMAIL_HOST
const EMAIL_PORT = Number(process.env.EMAIL_PORT || 465)
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_PORT === 465,
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
})

// ===== Captcha =====
async function verifyTurnstile(token?: string, ip?: string) {
  if (!TURNSTILE_SECRET) return !REQUIRE_TURNSTILE
  if (!token) return false
  const body = new URLSearchParams({ secret: TURNSTILE_SECRET, response: token })
  if (ip) body.append('remoteip', ip)
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
  const data = await r.json().catch(() => null)
  return Boolean(data?.success)
}

export async function POST(req: Request) {
  try {
    // tamaño y método
    const len = Number(req.headers.get('content-length') || 0)
    if (len > 100_000) return NextResponse.json({ ok: false, error: 'Payload grande' }, { status: 413 })
    if (req.method !== 'POST') return NextResponse.json({ ok: false, error: 'Método no permitido' }, { status: 405 })

    // Orígenes permitidos
    const origin = req.headers.get('origin') || ''
    const allowedOrigins = [
       'https://abogadamarialaramolina.com',
  'https://www.abogadamarialaramolina.com',
  'https://maria-app.vercel.app',        // preview Vercel
  'http://localhost:3000',               // local
];
    if (!allowedOrigins.includes(origin)) {
      return NextResponse.json({ ok: false, error: 'Origen inválido' }, { status: 403 })
    }

    // rate-limit
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const ratelimiter = await ensureRL()
    if (ratelimiter) {
      const { success } = await ratelimiter.limit(`contact:${ip}`)
      if (!success) return NextResponse.json({ ok: false, error: 'Rate limit' }, { status: 429 })
    }

    // body + validación
    const body = await req.json().catch(() => null)
    const parsed = schema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ ok: false, error: 'Datos inválidos' }, { status: 422 })

    const { name, email, message, website, cfTurnstileToken } = parsed.data

    // honeypot
    if (website && website.trim() !== '') return NextResponse.json({ ok: true })

    // captcha
    const okCaptcha = await verifyTurnstile(cfTurnstileToken, ip)
    if (!okCaptcha) return NextResponse.json({ ok: false, error: 'Captcha inválido' }, { status: 400 })

    // email config
    if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json({ ok: false, error: 'Servidor email mal configurado' }, { status: 500 })
    }

    // saneado
    const safeName = escapeHTML(name)
    const safeEmail = escapeHTML(email).replace(/(\r|\n)/g, ' ')
    const safeMsg = escapeHTML(message)

    await transporter.sendMail({
      from: `"Web Despacho" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      replyTo: safeEmail,
      subject: `Nuevo contacto de ${safeName}`,
      html: `
        <h2>Nuevo mensaje del formulario</h2>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>User-Agent:</strong> ${escapeHTML(req.headers.get('user-agent') || '')}</p>
        <p><strong>Mensaje:</strong></p>
        <pre style="font-family:inherit; white-space:pre-wrap; background:#fafafa; padding:12px; border:1px solid #eee; border-radius:8px;">${safeMsg}</pre>
        <p style="color:#888;font-size:.9rem;margin-top:1rem;">Enviado: ${new Date().toISOString()}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('❌ Error enviando correo:', e)
    return NextResponse.json({ ok: false, error: 'Error interno' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: 'Método no permitido' }, { status: 405 })
}


