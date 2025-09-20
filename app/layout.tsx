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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#044472" />
        <meta name="color-scheme" content="light only" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preload" as="image" href="/20250622_085709.jpg" />
        <link rel="preload" as="image" href="/fondo%20de%20cabecera.jpeg" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LegalService',
              name: 'Despacho de Abogados María Lara Molina',
              url: 'https://www.abogadamarialaramolina.com',
              image: 'https://www.abogadamarialaramolina.com/android-chrome-512x512.png',
              telephone: '+34XXXXXXXXX', // pon tu número real
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
            style={{ marginTop: '.35rem', display: 'flex', gap: '.6rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link href="/aviso-legal">Aviso legal</Link>
            <span>·</span>
            <Link href="/privacidad">Privacidad</Link>
            <span>·</span>
            <Link href="/cookies">Cookies</Link>
          </nav>
        </footer>

        <img src="/IMG-20241215-WA0009.webp" alt="Logo del despacho" className="logo-fijo" />

        <Beacon path="/api/visitas" />
      </body>
    </html>
  )
}



