// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // a) Forzar WWW
  if (url.hostname === 'abogadamarialaramolina.com') {
    url.hostname = 'www.abogadamarialaramolina.com'
    return NextResponse.redirect(url, 308)
  }

  // b) Quitar barra final (excepto home)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '')
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  // Aplica a todo, no toca _next ni assets estáticos
  matcher: ['/((?!_next|.*\\.(?:png|jpg|jpeg|webp|svg|ico|css|js|txt|xml)).*)'],
}



