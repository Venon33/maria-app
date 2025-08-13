// app/layout.tsx
import '../styles/globals.css'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Despacho de Maria Lara Molina',
  description: 'Despacho legal profesional',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}

        {/* Footer global */}
        <footer className="site-footer">
          <p>© {year} Despacho de Abogados María Lara Molina. Todos los derechos reservados.</p>
        
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


