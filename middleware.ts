// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // 1) Forzar WWW
  if (url.hostname === 'abogadamarialaramolina.com') {
    url.hostname = 'www.abogadamarialaramolina.com'
    return NextResponse.redirect(url, 308)
  }

  // 2) Quitar barra final (excepto en la home)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '')
    return NextResponse.redirect(url, 308)
  }

  // 3) Contador de visitas solo en la home
  if (url.pathname === '/') {
    try {
      const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
      await redis.incr('visitas:total')
      await redis.incr(`visitas:byday:${today}`)
    } catch (e) {
      console.error('❌ Error incrementando visitas:', e)
    }
  }

  return NextResponse.next()
}

// Aplica a rutas de páginas; excluye estáticos, _next, APIs y sitemaps/robots
export const config = {
  matcher: [
    '/((?!_next|api|assets|favicon.ico|robots.txt|sitemap.xml|sitemap-novedades.xml|.*\\.(png|jpg|jpeg|webp|svg|css|js)).*)',
  ],
}


