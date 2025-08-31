'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

export default function Home() {
  // dropdowns
  const [showContactoDropdown, setShowContactoDropdown] = useState(false)
  const contactoDropdownRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (contactoDropdownRef.current && !contactoDropdownRef.current.contains(e.target as Node)) {
        setShowContactoDropdown(false)
      }
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  // reloj
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => { setNow(new Date()); const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id) }, [])
  const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

  // Turnstile
  const [tsToken, setTsToken] = useState('')
  useEffect(() => {
    // callback global para el widget
    ;(window as any).onTurnstileSuccess = (t: string) => setTsToken(t)
  }, [])

  return (
    <main>
      <div className="cabecera-fondo">
        <header className="header">
          <div className="foto-con-colegiacion">
            <Image src="/20250622_085709.jpg" alt="Retrato de María Lara Molina" className="logo-foto" width={300} height={400} priority />
            <p className="colegiacion-pequena">Colegiada Nº 3316 (ICACR)</p>
          </div>

          <div>
            <div className="titulo-despacho">Despacho de Abogados<br />María Lara Molina</div>

            <section className="quienes-somos" id="quienes-somos">
              <h2 className="titulo-quienes">¿Quiénes somos?</h2>
              <p className="texto-quienes">
                En despacho de abogados María Lara Molina sabemos que cada situación legal es única y requiere una atención distinta.
                Por eso, nos enfocamos en ofrecer soluciones jurídicas adaptables a las necesidades y circunstancias particulares de cada cliente.
                Desde el asesoramiento en cuestiones cotidianas hasta la representación en litigios complejos, estamos aquí para guiarle con la mejor orientación y defensa posible.
              </p>
            </section>
          </div>
        </header>

        {/* NAV */}
        <nav className="navegacion">
          <Link href="/servicios" className="link-servicios"><i className="fas fa-gavel" /> Servicios</Link>
          <Link href="/novedades-juridicas" className="link-novedades"><i className="fas fa-newspaper" /> Novedades Jurídicas</Link>
          <a href="https://g.page/r/CZI-nLb_FE2PEAE/review" target="_blank" rel="noopener noreferrer" className="link-casos">
            <i className="fas fa-briefcase" /> Opiniones
          </a>

          <div className="dropdown" ref={contactoDropdownRef}>
            <button className="link-contacto dropdown-toggle" type="button" aria-haspopup="true" aria-expanded={showContactoDropdown}
              onClick={() => setShowContactoDropdown(v => !v)}>
              <i className="fas fa-envelope" /> Contacto
            </button>
            {showContactoDropdown && (
              <div className="dropdown-menu contacto-dropdown">
                <a href="https://wa.me/34747444017" target="_blank" rel="noreferrer" className="contacto-item whatsapp" style={{ color:'#25D366', fontSize:'1.3rem', fontWeight:'bold' }}>
                  <i className="fab fa-whatsapp" /> WhatsApp
                </a>
                <a href="mailto:m.lara.abogada@gmail.com" className="contacto-item correo" style={{ color:'#E63946', fontSize:'1.3rem', fontWeight:'bold' }}>
                  <i className="fas fa-envelope" /> Correo Electrónico
                </a>
                <a href="tel:+34747444017" className="contacto-item telefono" style={{ color:'#044472', fontSize:'1.3rem', fontWeight:'bold' }}>
                  <i className="fas fa-phone-alt" /> Teléfono
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* FORMULARIO DE CONTACTO */}
      <section className="formulario-contacto" id="contacto">
        <h2>Formulario de Contacto</h2>

        <div className="formulario-contenedor">
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />

          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const form = e.currentTarget as HTMLFormElement
              const fd = new FormData(form)

              // fallback si el callback no corrió
              const domToken = (document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement)?.value || ''
              const cfTurnstileToken = tsToken || (window as any).turnstile?.getResponse?.() || domToken

              const payload = {
                name: String(fd.get('name') || ''),
                email: String(fd.get('email') || ''),
                message: String(fd.get('message') || ''),
                website: String(fd.get('website') || ''), // honeypot
                cfTurnstileToken,
              }

              if (payload.message.trim().length < 10) { alert('El mensaje debe tener al menos 10 caracteres.'); return }
              if (!cfTurnstileToken) { alert('Verifica el captcha antes de enviar.'); return }

              const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
              })

              if (res.ok) {
                alert('✅ Mensaje enviado. ¡Gracias!')
                form.reset()
                setTsToken('')
                ;(window as any).turnstile?.reset?.()
              } else {
                const data = await res.json().catch(() => ({}))
                alert('❌ No se pudo enviar: ' + (data?.error || 'Datos inválidos'))
              }
            }}
          >
            <input name="name" type="text" placeholder="Tu nombre" required autoComplete="name" />
            <input name="email" type="email" placeholder="Tu correo" required autoComplete="email" inputMode="email" />
            <textarea name="message" rows={6} placeholder="Tu mensaje" required style={{ resize:'none' }} />

            {/* Honeypot */}
            <input type="text" name="website" style={{ display:'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

            {/* Turnstile widget */}
            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
              data-theme="light"
              data-callback="onTurnstileSuccess"
            />

            <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
              <button type="submit">Enviar</button>
              <span>
                <i className="fas fa-envelope" style={{ marginRight:5, color:'#044472' }} />
                <a className="contact-link" href="mailto:m.lara.abogada@gmail.com">m.lara.abogada@gmail.com</a>
              </span>
            </div>
          </form>

          <div className="info-contacto">
            <div className="horario-card">
              <div className="horario-header" style={{ flexDirection:'column', alignItems:'center', gap:'.25rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
                  <i className="fas fa-clock" aria-hidden="true" /><span>Horario de atención</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
                  <i className="fas fa-phone-alt" style={{ color:'#044472' }} />
                  <a className="contact-link nowrap" href="tel:+34747444017">(+34) 747 44 40 17</a>
                </div>
              </div>

              {now ? (
                <div className="clock" aria-live="polite">
                  {cap(now.toLocaleDateString('es-ES',{ weekday:'long', year:'numeric', month:'long', day:'2-digit' }))}{' '}
                  {now.toLocaleTimeString('es-ES',{ hour12:false })}
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





