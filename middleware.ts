// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'

/** Lazy: solo creamos el cliente si hay credenciales */
function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  try {
    return new Redis({ url, token })
  } catch {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // 1) Forzar WWW en prod (no aplica a local ni previews)
  if (url.hostname === 'abogadamarialaramolina.com') {
    url.hostname = 'www.abogadamarialaramolina.com'
    return NextResponse.redirect(url, 308)
  }

  // 2) Quitar barra final (excepto en la home)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '')
    return NextResponse.redirect(url, 308)
  }

  // 3) Contador en home (ignora si no hay Redis configurado)
  if (url.pathname === '/') {
    const redis = getRedis()
    if (redis) {
      try {
        const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
        await redis.incr('visitas:total')
        await redis.incr(`visitas:byday:${today}`)
      } catch (e) {
        console.error('❌ Error incrementando visitas:', e)
      }
    }
  }

  return NextResponse.next()
}

/** Matcher simple y válido */
export const config = {
  matcher: [
    '/',                               // home
    '/servicios/:path*',               // servicios + subrutas
    '/novedades-juridicas/:path*',     // novedades + detalle
    '/aviso-legal',
    '/privacidad',
    '/cookies',
  ],
}



