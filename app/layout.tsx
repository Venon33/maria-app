// app/layout.tsx
import '../styles/globals.css'
import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Despacho de Maria Lara Molina',
  description: 'Despacho legal profesional',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <html lang="es">
      <body>
        {children}

        {/* Footer global */}
        <footer className="site-footer">
          <p>© {year} Despacho de Abogados María Lara Molina. Todos los derechos reservados.</p>
          <nav className="legal-links">
            <a href="/aviso-legal"></a>
            <span aria-hidden="true">·</span>
            <a href="/privacidad"></a>
            <span aria-hidden="true">·</span>
            <a href="/terminos"></a>
          </nav>
        </footer>

        {/* Logo fijo abajo a la derecha */}
        <img src="/IMG-20241215-WA0009.png" alt="Logo del despacho" className="logo-fijo" />
      </body>
    </html>
  )
}

