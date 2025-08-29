// middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  // si solo quieres contar la home, usa matcher: ['/']
  matcher: ['/:path*'],
}

export function middleware(req: NextRequest) {
  // dispara el contador sin bloquear la carga
  fetch(new URL('/api/visitas', req.url), { cache: 'no-store' }).catch(() => {})
  return NextResponse.next()
}
