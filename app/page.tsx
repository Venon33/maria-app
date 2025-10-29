'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

export default function Home() {
  // ===== Dropdown Contacto =====
  const [showContactoDropdown, setShowContactoDropdown] = useState(false)
  const contactoDropdownRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (contactoDropdownRef.current && !contactoDropdownRef.current.contains(e.target as Node)) {
        setShowContactoDropdown(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  // ===== Reloj =====
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

  // ===== Festivos nacionales + Castilla-La Mancha + Puertollano (2025) =====
  const FESTIVOS: string[] = [
    // Nacionales
    '2025-01-01','2025-01-06','2025-04-17','2025-04-18','2025-05-01',
    '2025-08-15','2025-10-12','2025-11-01','2025-12-06','2025-12-08','2025-12-25',
    // Castilla-La Mancha
    '2025-05-31','2025-06-19',
    // Puertollano (local)
    '2025-09-08',
  ]

  const toYMD = (d: Date) => {
    const tz = d.getTimezoneOffset()
    const local = new Date(d.getTime() - tz * 60 * 1000)
    return local.toISOString().slice(0, 10)
  }
  const parseYMD = (ymd: string) => {
    // crear fecha local a medianoche
    const [y,m,day] = ymd.split('-').map(Number)
    return new Date(y, (m - 1), day, 0, 0, 0, 0)
  }

  // Horario: Lun-Jue 10:00–21:00; Viernes 10:00–15:00; Sáb/Dom cerrado
  function estadoApertura(d: Date | null) {
    if (!d) return { abierto: false, etiqueta: 'Cerrado', motivo: 'desconocido' as const }

    const day = d.getDay()
    const ymd = toYMD(d)
    const esFestivo = FESTIVOS.includes(ymd)
    const esFinde = day === 0 || day === 6
    if (esFestivo) return { abierto: false, etiqueta: 'Cerrado (festivo)', motivo: 'festivo' as const }
    if (esFinde) return { abierto: false, etiqueta: 'Cerrado', motivo: 'fin_de_semana' as const }

    const minutes = d.getHours() * 60 + d.getMinutes()
    const enRango = (ini: number, fin: number) => minutes >= ini && minutes < fin

    if (day >= 1 && day <= 4) {
      const abierto = enRango(10 * 60, 21 * 60)
      return { abierto, etiqueta: abierto ? 'Abierto' : 'Cerrado', motivo: abierto ? 'horario' : 'fuera_horario' }
    }
    if (day === 5) {
      const abierto = enRango(10 * 60, 15 * 60)
      return { abierto, etiqueta: abierto ? 'Abierto' : 'Cerrado', motivo: abierto ? 'horario' : 'fuera_horario' }
    }

    return { abierto: false, etiqueta: 'Cerrado', motivo: 'fuera_horario' }
  }

  const estado = estadoApertura(now)
  const colorEstado = estado.abierto ? '#1f8b4c' : '#b02a37'
  const estiloPildora: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '.4rem',
    padding: '.25rem .55rem',
    borderRadius: 999,
    fontWeight: 700,
    color: '#fff',
    background: colorEstado,
    marginLeft: '.5rem',
    fontSize: '.9rem',
  }

  // ===== Próximos 5 festivos (a partir de hoy) =====
  const proximosFestivos = (() => {
    const hoy = now ? new Date(now.getFullYear(), now.getMonth(), now.getDate()) : new Date()
    return FESTIVOS
      .map(d => parseYMD(d))
      .filter(d => d >= hoy)
      .sort((a,b) => a.getTime() - b.getTime())
      .slice(0,5)
  })()

  // ===== Turnstile =====
  const [tsToken, setTsToken] = useState('')
  useEffect(() => {
    ;(window as any).onTurnstileSuccess = (t: string) => setTsToken(t)
  }, [])

  return (
  <main>
    <div className="cabecera-fondo">
      <header className="header">
        <div className="foto-con-colegiacion">
  <Image
    src="/20250622_085709-720.webp"
    alt="Retrato de María Lara Molina"
    width={300}
    height={400}
    sizes="(max-width:640px) 80vw, (max-width:1024px) 40vw, 300px"
    priority
    className="logo-foto"
  />
  <p className="colegiacion-pequena">Colegiada Nº 3316 (ICACR)</p>
</div>

<div>
  <div className="titulo-despacho">
    Despacho de Abogados<br />María Lara Molina
  </div>

  <section className="quienes-somos" id="quienes-somos">
    <h2 className="titulo-quienes">¿Quiénes somos?</h2>
    <p className="texto-quienes">
      En despacho de abogados María Lara Molina sabemos que cada situación<br />
      legal es única y requiere una atención distinta. Por eso, nos enfocamos<br />
      en ofrecer soluciones jurídicas adaptables a las necesidades y circunstancias<br />
      particulares de cada cliente. Desde el asesoramiento
      en cuestiones cotidiana hasta la representación en litigios complejos, guiarle con la <br />
      mejor orientación y defensa posible.
    </p>
  </section>
</div>

      </header>
    </div>

    {/* NAV — ahora está FUERA del fondo */}
    <nav className="navegacion">
      <Link href="/servicios" className="link-servicios">
        <i className="fas fa-gavel" /> Servicios
      </Link>
        {/* ⇩⇩ ESTE */}
  <Link href="/novedades-juridicas" className="menu-novedades">
    <span className="txt">Novedades Jurídicas</span>
  </Link>
  {/* ⇧⇧ */}
      <a
        href="https://g.page/r/CZI-nLb_FE2PEAE/review"
        target="_blank"
        rel="noopener noreferrer"
        className="link-casos"
      >
        <i className="fas fa-briefcase" /> Opiniones
      </a>

      <div className="dropdown" ref={contactoDropdownRef}>
        <button
          className="link-contacto dropdown-toggle"
          type="button"
          aria-haspopup="true"
          aria-expanded={showContactoDropdown}
          onClick={() => setShowContactoDropdown(v => !v)}
        >
          <i className="fas fa-envelope" /> Contacto
        </button>
        {showContactoDropdown && (
          <div className="dropdown-menu contacto-dropdown">
            <a
              href="https://wa.me/34747444017"
              target="_blank"
              rel="noreferrer"
              className="contacto-item whatsapp"
              style={{ color: '#25D366', fontSize: '1.3rem', fontWeight: 'bold' }}
            >
              <i className="fab fa-whatsapp" /> WhatsApp
            </a>
            <a
              href="mailto:m.lara.abogada@gmail.com"
              className="contacto-item correo"
              style={{ color: '#E63946', fontSize: '1.3rem', fontWeight: 'bold' }}
            >
              <i className="fas fa-envelope" /> Correo Electrónico
            </a>
            <a
              href="tel:+34747444017"
              className="contacto-item telefono"
              style={{ color: '#044472', fontSize: '1.3rem', fontWeight: 'bold' }}
            >
              <i className="fas fa-phone-alt" /> Teléfono
            </a>
          </div>
        )}
      </div>
    </nav>

    {/* ===== FORMULARIO DE CONTACTO / HORARIO ===== */}
    <section className="formulario-contacto" id="contacto">
      <h2>Formulario de Contacto</h2>

      <div className="formulario-contenedor">
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />

        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const form = e.currentTarget as HTMLFormElement
            const fd = new FormData(form)

            const domToken = (document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement)?.value || ''
            // @ts-ignore
            const apiToken = window.turnstile?.getResponse?.() || ''
            const cfTurnstileToken = tsToken || apiToken || domToken

            const payload = {
              name: String(fd.get('name') || ''),
              email: String(fd.get('email') || ''),
              message: String(fd.get('message') || ''),
              website: String(fd.get('website') || ''),
              cfTurnstileToken,
            }

            if (payload.message.trim().length < 10) {
              alert('El mensaje debe tener al menos 10 caracteres.')
              return
            }
            if (!cfTurnstileToken) {
              alert('Verifica el captcha antes de enviar.')
              return
            }

            const res = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            })

            if (res.ok) {
              alert('✅ Mensaje enviado. ¡Gracias!')
              form.reset()
              setTsToken('')
              // @ts-ignore
              window.turnstile?.reset?.()
            } else {
              const data = await res.json().catch(() => ({}))
              alert('❌ No se pudo enviar: ' + (data?.error || 'Datos inválidos'))
            }
          }}
        >
          <input name="name" type="text" placeholder="Tu nombre" required autoComplete="name" />
          <input name="email" type="email" placeholder="Tu correo" required autoComplete="email" inputMode="email" />
          <textarea name="message" rows={6} placeholder="Tu mensaje" required style={{ resize: 'none' }} />
          <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div
            className="cf-turnstile"
            data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
            data-theme="light"
            data-callback="onTurnstileSuccess"
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button type="submit">Enviar</button>
            <span>
              <i className="fas fa-envelope" style={{ marginRight: 5, color: '#044472' }} />
              <a className="contact-link" href="mailto:m.lara.abogada@gmail.com">m.lara.abogada@gmail.com</a>
            </span>
          </div>
        </form>

        <div className="info-contacto">
          <div className="horario-card">
            <div className="horario-header" style={{ flexDirection: 'column', alignItems: 'center', gap: '.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <i className="fas fa-clock" aria-hidden="true" /><span>Horario de atención</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <i className="fas fa-phone-alt" style={{ color: '#044472' }} />
                <a className="contact-link nowrap" href="tel:+34747444017">(+34) 747 44 40 17</a>
              </div>
            </div>

            {now ? (
              <div className="clock" aria-live="polite" style={{ borderColor: estado.abierto ? '#26a269' : '#dc3545' }}>
                {cap(now.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' }))}{' '}
                {now.toLocaleTimeString('es-ES', { hour12: false })}
                <span style={estiloPildora}>{estado.etiqueta}</span>
              </div>
            ) : (
              <div className="clock" aria-hidden="true">--/--/----  --:--:--</div>
            )}

            <div className="horario-list">
              <div className="horario-item"><span className="h-label">Lunes a Jueves</span><span className="h-time">10:00 – 21:00</span></div>
              <div className="horario-item"><span className="h-label">Viernes</span><span className="h-time">10:00 – 15:00</span></div>
              <div className="horario-item"><span className="h-label">Sábado y Domingo</span><span className="h-cerrado">Cerrado</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
)

}
