// app/layout.tsx
import '../styles/globals.css'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Raleway, Playfair_Display } from 'next/font/google'
import Beacon from '../components/Beacon'

// === Fuentes con next/font (exponen las CSS vars usadas en tu CSS) ===
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-raleway',
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-playfair',
})

// === SEO básico / OpenGraph ===
export const metadata: Metadata = {
  title: 'Despacho de Maria Lara Molina',
  description: 'Despacho legal profesional',
  metadataBase: new URL('https://www.abogadamarialaramolina.com'),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'Despacho de Maria Lara Molina',
    description: 'Despacho legal profesional',
    url: 'https://www.abogadamarialaramolina.com',
    siteName: 'Despacho de Maria Lara Molina',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear()

  return (
    <html lang="es">
      <head>
        {/* Metas esenciales */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#044472" />
        <meta name="color-scheme" content="light only" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ========= PRELOADS CORRECTOS =========
           Usa atributos en minúscula: imagesrcset / imagesizes.
           Evita warnings de “preloaded but not used” al tenerlos bien formados.
        */}
        {/* Fondo (hero background) */}
        <link
          rel="preload"
          as="image"
          href="/fondo-1280.webp?v=6"
          imageSrcSet="/fondo-768.web?v=6 768w, /fondo-1280.webp?v=6 1280w, /fondo-1920.webp?v=6 1920w"
          imageSizes="100vw"
        />
        {/* Retrato (hero image). El <Image> de la página ya tiene priority. */}
        <link
          rel="preload"
          as="image"
          href="/20250622_085709-720.webp"
          imageSrcSet="/20250622_085709-480.webp 480w, /20250622_085709-720.webp 720w, /20250622_085709-1080.webp 1080w"
          imageSizes="(max-width:640px) 80vw, (max-width:1024px) 40vw, 300px"
        />

        {/* JSON-LD (datos estructurados de negocio) */}
        <script
          type="application/ld+json"
          // Nota: usa JSON.stringify para no romper el HTML
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              name: 'Despacho de Abogados María Lara Molina',
              url: 'https://www.abogadamarialaramolina.com',
              image: 'https://www.abogadamarialaramolina.com/android-chrome-512x512.png',
              telephone: '+34747444017',
              email: 'm.lara.abogada@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Calle y número',
                addressLocality: 'Ciudad',
                addressRegion: 'Provincia',
                postalCode: 'CP',
                addressCountry: 'ES',
              },
              areaServed: 'España',
              priceRange: '€€',
              sameAs: ['https://g.page/r/CZI-nLb_FE2PEAE/review'],
            }),
          }}
        />
      </head>

      {/* Aplica las variables de fuente al body (coinciden con tu CSS) */}
      <body className={`${raleway.variable} ${playfair.variable}`}>
        {children}

        {/* Footer simple y accesible */}
        <footer
          className="site-footer"
          style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
        >
          <p>© {year} Despacho de Abogados María Lara Molina. Todos los derechos reservados.</p>
          <nav
            className="legal-links"
            aria-label="Enlaces legales"
            style={{ marginTop: '.35rem', display: 'flex', gap: '.6rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link href="/aviso-legal">Aviso legal</Link>
            <span aria-hidden>·</span>
            <Link href="/privacidad">Privacidad</Link>
            <span aria-hidden>·</span>
            <Link href="/cookies">Cookies</Link>
          </nav>
        </footer>

        {/* Logo fijo: su posición/medidas las controla tu CSS (.logo-fijo) */}
        <img
          src="/IMG-20241215-WA0009.webp"
          alt="Logo del despacho"
          className="logo-fijo"
          decoding="async"
        />

        {/* Beacon: conteo de visitas, no bloquea render */}
        <Beacon path="/api/visitas" />
      </body>
    </html>
  )
}

