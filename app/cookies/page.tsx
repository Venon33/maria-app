import Link from 'next/link'

export const metadata = { title: 'Cookies | Despacho María Lara Molina' }

export default function Cookies() {
  return (
    <main>
      <section
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(48,25,52,.55), rgba(48,25,52,.55)), url('/bg-cookies.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '6rem 1rem',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '2.4rem' }}>
          Política de cookies
        </h1>
      </section>

      <section className="container" style={{ padding: '2.5rem 1rem' }}>
        <div
          style={{
            maxWidth: 920,
            margin: '0 auto',
            background: '#fff',
            border: '1px solid #eaeaea',
            borderRadius: 16,
            boxShadow: '0 12px 30px rgba(0,0,0,.06)',
            padding: '2rem',
          }}
        >
          <p>
            Este sitio utiliza únicamente cookies técnicas imprescindibles para su funcionamiento. No empleamos cookies
            de análisis, publicidad ni de terceros.
          </p>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href="/" className="btn-volver">Volver al inicio</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
