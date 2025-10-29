import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.abogadamarialaramolina.com'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`,                 lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/servicios`,        lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/novedades-juridicas`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/aviso-legal`,      lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${baseUrl}/privacidad`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${baseUrl}/cookies`,          lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
  ]

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
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.8,
  }))

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
    // sin novedades.json en build
  }

  return [...staticPages, ...servicePages, ...novedades]
}
