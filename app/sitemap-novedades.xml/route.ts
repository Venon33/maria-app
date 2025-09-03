// app/sitemap-novedades.xml/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-static'

const BASE = 'https://www.abogadamarialaramolina.com'

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'novedades.json')
    const raw = await fs.readFile(filePath, 'utf8')
    const items = JSON.parse(raw) as { slug: string; fecha: string }[]

    const urls = items.map((n) => {
      const loc = `${BASE}/novedades-juridicas/${encodeURIComponent(n.slug)}`
      const lastmod = new Date(n.fecha).toISOString()
      return `<url><loc>${esc(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`
    }).join('')

    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
      urls +
      `</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch {
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`
    return new NextResponse(xml, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    })
  }
}
