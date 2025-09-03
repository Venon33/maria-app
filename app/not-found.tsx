// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '2.2rem' }}>
        Página no encontrada
      </h1>
      <p style={{ marginTop: '.8rem' }}>
        La URL solicitada no existe o ha cambiado.
      </p>
      <div style={{ marginTop: '1.8rem' }}>
        <Link href="/" className="btn-volver">Volver al inicio</Link>
      </div>
    </main>
  )
}
