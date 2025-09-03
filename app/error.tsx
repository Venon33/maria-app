// app/error.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '2.2rem' }}>
        Ha ocurrido un error
      </h1>
      <p style={{ marginTop: '.8rem' }}>
        Intenta recargar la página o vuelve al inicio.
      </p>

      <div style={{ marginTop: '1.8rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => reset()} className="btn-volver" type="button">
          Reintentar
        </button>
        <Link href="/" className="btn-volver">Volver al inicio</Link>
      </div>
    </main>
  )
}
