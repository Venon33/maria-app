import type { MetadataRoute } from 'next'

// Cambia esta variable cuando tengas dominio propio
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' }, // permite a todos los bots rastrear todo
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
