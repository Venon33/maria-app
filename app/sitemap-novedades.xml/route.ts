import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-static' // o 'force-dynamic' si prefieres

export async function GET() {
  const base = 'https://www.abogadamarialaramolina.com'
  let urls = ''

  try {
    const filePath = path.join(process.cwd(), 'data', 'novedades.json')
    const raw = await fs.readFile(filePath, 'utf8')
    const novedades = JSON.parse(raw) as { slug: string; fecha?: string }[]

    urls = novedades.map(n => `
  <url>
    <loc>${base}/novedades-juridicas/${n.slug}</loc>
    <lastmod>${new Date(n.fecha || Date.now()).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')
  } catch {
    urls = ''
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' },
  })
}
