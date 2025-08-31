import '../styles/globals.css'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Despacho de Maria Lara Molina',
  description: 'Despacho legal profesional',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear()

  return (
    <html lang="es">
      <head>
        {/* ✅ Viewport correcto para adaptarse a cualquier pantalla */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta charSet="utf-8" />
      </head>
      <body>
        {children}

        {/* Footer global */}
        <footer
          className="site-footer"
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <p>
            © {year} Despacho de Abogados María Lara Molina. Todos los derechos
            reservados.
          </p>

          {/* 🔹 Enlaces legales debajo */}
          <nav
            className="legal-links"
            style={{
              marginTop: '.35rem',
              display: 'flex',
              gap: '.6rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link href="/aviso-legal">Aviso legal</Link>
            <span>·</span>
            <Link href="/privacidad">Privacidad</Link>
            <span>·</span>
            <Link href="/cookies">Cookies</Link>
          </nav>
        </footer>

        {/* Logo fijo abajo a la derecha */}
        <img
          src="/IMG-20241215-WA0009.png"
          alt="Logo del despacho"
          className="logo-fijo"
        />
      </body>
    </html>
  )
}


