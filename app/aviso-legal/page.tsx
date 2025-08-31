import Link from 'next/link'

export const metadata = { title: 'Aviso legal | Despacho María Lara Molina' }

export default function AvisoLegal() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.45)), url('/bg-aviso-legal.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '6rem 1rem',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '2.4rem' }}>
          Aviso legal
        </h1>
      </section>

      {/* Contenido */}
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
          <p><strong>Titular:</strong> María Lara Molina</p>
          <p><strong>Colegiación:</strong> Nº 3316 (ICACR)</p>
          <p><strong>NIF:</strong> 05939501-G </p>
          <p><strong>Domicilio:</strong> [dirección profesional]</p>
          <p><strong>Email:</strong> m.lara.abogada@gmail.com</p>
          <p><strong>Teléfono:</strong> (+34) 747 44 40 17</p>

          <hr style={{ margin: '1.5rem 0' }} />

          <p>
            El acceso y uso de este sitio web implica la aceptación de estas condiciones y de la normativa aplicable
            (LSSI-CE). El titular se reserva el derecho a modificar contenidos.
          </p>

          {/* Botón volver */}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href="/" className="btn-volver">Volver al inicio</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

