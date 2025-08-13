'use client'

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  // (puedes borrar showDropdown si ya no lo usas)
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [showContactoDropdown, setShowContactoDropdown] = useState(false);
  const contactoDropdownRef = useRef<HTMLDivElement>(null);
  const contactoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [now, setNow] = useState(new Date());
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
  const id = setInterval(() => setNow(new Date()), 1000);
  return () => clearInterval(id);
}, []);



  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowDropdown(false), 500);
  };
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleContactoMouseLeave = () => {
    contactoTimeoutRef.current = setTimeout(() => setShowContactoDropdown(false), 500);
  };
  const handleContactoMouseEnter = () => {
    if (contactoTimeoutRef.current) clearTimeout(contactoTimeoutRef.current);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
      if (contactoDropdownRef.current && !contactoDropdownRef.current.contains(e.target as Node)) {
        setShowContactoDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <main>
      <div className="cabecera-fondo">
        <header className="header">
          <div className="foto-con-colegiacion">
            <Image
              src="/20250622_085709.jpg"
              alt="Retrato de Marìa Lara Molina"
              className="logo-foto"
              width={300}
              height={400}
              priority
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
                En despacho de abogados María Lara Molina sabemos que cada situación legal es única y requiere una atención distinta.
                Por eso, nos enfocamos en ofrecer soluciones jurídicas adaptables a las necesidades y circunstancias particulares de cada cliente.
                Desde el asesoramiento en cuestiones cotidianas hasta la representación en litigios complejos, estamos aquí para guiarle
                con la mejor orientación y defensa posible.
              </p>
            </section>
          </div>
        </header>

        {/* NAV */}
        <nav className="navegacion">
          {/* Servicios (link directo a la página con tarjetas) */}
          <Link href="/servicios" className="link-servicios">
            <i className="fas fa-gavel"></i> Servicios
          </Link>

          {/* Novedades Jurídicas (link directo) */}
          <Link href="/novedades-juridicas" className="link-novedades">
            <i className="fas fa-newspaper"></i> Novedades Jurídicas
          </Link>

          <a href="#casos" className="link-casos">
            <i className="fas fa-briefcase"></i> Opiniones
          </a>

          {/* Contacto con submenú */}
          <div
            className="dropdown"
            onMouseLeave={handleContactoMouseLeave}
            onMouseEnter={handleContactoMouseEnter}
            ref={contactoDropdownRef}
          >
            <button
              className="link-contacto dropdown-toggle"
              onClick={() => setShowContactoDropdown(!showContactoDropdown)}
              aria-haspopup="true"
              aria-expanded={showContactoDropdown}
            >
              <i className="fas fa-envelope"></i> Contacto
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
                  <i className="fab fa-whatsapp"></i> WhatsApp
                </a>
                <a
                  href="mailto:m.lara.abogada@gmail.com"
                  className="contacto-item correo"
                  style={{ color: '#E63946', fontSize: '1.3rem', fontWeight: 'bold' }}
                >
                  <i className="fas fa-envelope"></i> Correo Electrónico
                </a>
                <a
                  href="tel:+34747444017"
                  className="contacto-item telefono"
                  style={{ color: '#044472', fontSize: '1.3rem', fontWeight: 'bold' }}
                >
                  <i className="fas fa-phone-alt"></i> Teléfono
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
    
    {/* Formulario */}
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const payload = {
          name: String(formData.get('name') || ''),
          email: String(formData.get('email') || ''),
          message: String(formData.get('message') || ''),
        };

        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          alert('✅ Mensaje enviado. ¡Gracias!');
          form.reset();
        } else {
          const data = await res.json().catch(() => ({}));
          alert('❌ No se pudo enviar: ' + (data?.error || 'Inténtalo de nuevo'));
        }
      }}
    >
      <input name="name" type="text" placeholder="Tu nombre" required />
      <input name="email" type="email" placeholder="Tu correo" required />
      <textarea name="message" rows={5} placeholder="Tu mensaje" required />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button type="submit">Enviar</button>
        <span>
          <i className="fas fa-envelope" style={{ marginRight: '5px', color: '#044472' }}></i>
          <a className="contact-link" href="mailto:m.lara.abogada@gmail.com">
            m.lara.abogada@gmail.com
          </a>
        </span>
      </div>
    </form>

    {/* Información de contacto */}
    <div className="info-contacto">
      <div className="horario-card">
        <div className="horario-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <i className="fas fa-clock" aria-hidden="true"></i>
          <span>Horario de atención</span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-phone-alt" style={{ color: '#044472' }}></i>
            <a className="contact-link" href="tel:+34747444017">(+34) 747 44 40 17</a>
          </span>
        </div>

        <div className="clock" aria-live="polite">
          {now.toLocaleDateString('es-ES', {
            weekday: 'long', year: 'numeric', month: 'long', day: '2-digit'
          }).replace(/^\w/, c => c.toUpperCase())}
          {"  "}
          {now.toLocaleTimeString('es-ES', { hour12: false })}
        </div>

        <div className="horario-list">
          <div className="horario-item">
            <span className="h-label">Lunes a Jueves</span>
            <span className="h-time">10:00 – 21:00</span>
          </div>
          <div className="horario-item">
            <span className="h-label">Viernes</span>
            <span className="h-time">10:00 – 15:00</span>
          </div>
          <div className="horario-item">
            <span className="h-label">Sábado y Domingo</span>
            <span className="h-cerrado">Cerrado</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </main>
  );
}





