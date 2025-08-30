import type { MetadataRoute } from 'next'

// Cambia esta variable cuando tengas dominio propio
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${BASE}/`,              lastModified: now },
    { url: `${BASE}/servicios`,     lastModified: now },
    { url: `${BASE}/novedades-juridicas`, lastModified: now },
    { url: `${BASE}/aviso-legal`,   lastModified: now },
    { url: `${BASE}/privacidad`,    lastModified: now },
    { url: `${BASE}/cookies`,       lastModified: now },
  ]
}
