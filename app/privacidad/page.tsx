import Link from 'next/link'

export const metadata = { title: 'Privacidad | Despacho María Lara Molina' }

export default function Privacidad() {
  return (
    <main>
      <section
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(4,68,114,.6), rgba(4,68,114,.6)), url('/bg-privacidad.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '6rem 1rem',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '2.4rem' }}>
          Política de privacidad
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
          <p><strong>Responsable:</strong> María Lara Molina</p>
          <p><strong>Finalidad:</strong> gestionar solicitudes y comunicaciones profesionales recibidas a través del formulario.</p>
          <p><strong>Legitimación:</strong> consentimiento del interesado.</p>
          <p><strong>Destinatarios:</strong> no se cederán datos a terceros salvo obligación legal.</p>
          <p><strong>Derechos:</strong> acceso, rectificación, supresión y demás en <strong>m.lara.abogada@gmail.com</strong>.</p>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href="/" className="btn-volver">Volver al inicio</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

