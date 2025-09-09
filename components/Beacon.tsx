// components/Beacon.tsx
'use client'

import { useEffect } from 'react'

export default function Beacon({ path = '/api/visitas' }: { path?: string }) {
  useEffect(() => {
    // Solo ejecuta en cliente
    if (typeof window === 'undefined') return
    // Solo en la home
    if (window.location.pathname !== '/') return

    const key = 'visit-counted'
    if (sessionStorage.getItem(key)) return

    try {
      const blob = new Blob([JSON.stringify({ t: Date.now() })], { type: 'application/json' })
      navigator.sendBeacon(path, blob)
      sessionStorage.setItem(key, '1')
    } catch {
      fetch(path, { method: 'POST', keepalive: true }).catch(() => {})
    }
  }, [path])

  return null
}
