// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const APEX = 'abogadamarialaramolina.com'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const host = req.headers.get('host') || ''
  const isHttps = url.protocol === 'https:'

  // Redirige cualquier host que no sea el canónico
  if (host !== APEX) {
    url.hostname = APEX
    url.protocol = 'https:'
    url.port = ''
    return NextResponse.redirect(url, 308)
  }

  // Fuerza HTTPS si hiciera falta
  if (!isHttps) {
    url.protocol = 'https:'
    url.port = ''
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}



