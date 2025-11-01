// app/layout.tsx
import '../styles/globals.css'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Raleway, Playfair_Display } from 'next/font/google'
import Beacon from '../components/Beacon'

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

export const metadata = {
  title: 'Despacho de Maria Lara Molina',
  description: 'Despacho legal profesional',
  metadataBase: new URL('https://www.abogadamarialaramolina.com'),
  alternates: {
    canonical: '/', // evitar duplicados; las rutas hijas resuelven solas
  },
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
} satisfies Metadata

export default function RootLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear()

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#044472" />
        <meta name="color-scheme" content="light only" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preloads */}
        <link
          rel="preload"
          as="image"
          href="/fondo-1280.webp?v=6"
          imageSrcSet="/fondo-768.webp?v=6 768w, /fondo-1280.webp?v=6 1280w, /fondo-1920.webp?v=6 1920w"
          imageSizes="100vw"
        />
        <link
          rel="preload"
          as="image"
          href="/20250622_085709-720.webp"
          imageSrcSet="/20250622_085709-480.webp 480w, /20250622_085709-720.webp 720w, /20250622_085709-1080.webp 1080w"
          imageSizes="(max-width:640px) 80vw, (max-width:1024px) 40vw, 300px"
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
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

      <body className={`${raleway.variable} ${playfair.variable}`}>
        {children}

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

        <img
          src="/IMG-20241215-WA0009.webp"
          alt="Logo del despacho"
          className="logo-fijo"
          decoding="async"
        />

        <Beacon path="/api/visitas" />
      </body>
    </html>
  )
}
