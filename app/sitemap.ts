import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.abogadamarialaramolina.com'

  // 🔹 páginas fijas del sitio
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/servicios`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/novedades-juridicas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/aviso-legal`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/privacidad`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]

  // 🔹 páginas de servicios
  const servicios = [
    'derecho-laboral-y-seguridad-social',
    'derecho-de-la-familia',
    'derecho-penal',
    'derecho-administrativo',
    'derecho-extranjeria',
    'seguros-y-accidentes',
  ]

  const servicePages: MetadataRoute.Sitemap = servicios.map((slug) => ({
    url: `${baseUrl}/servicios/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.8,
  }))

  // 🔹 novedades dinámicas desde /data/novedades.json
  let novedades: MetadataRoute.Sitemap = []
  try {
    const filePath = path.join(process.cwd(), 'data', 'novedades.json')
    const raw = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(raw) as { slug: string; fecha: string }[]
    novedades = data.map((n) => ({
      url: `${baseUrl}/novedades-juridicas/${n.slug}`,
      lastModified: new Date(n.fecha),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  } catch {
    // si no hay archivo, no pasa nada
  }

  return [...staticPages, ...servicePages, ...novedades]
}
