// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

const APEX = 'abogadamarialaramolina.com';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const url = req.nextUrl;

  // www → apex
  if (host.startsWith('www.')) {
    url.host = APEX;
    return NextResponse.redirect(url, 308);
  }

  // *.vercel.app → apex
  if (host.endsWith('.vercel.app')) {
    url.host = APEX;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// no toques estáticos ni _next ni ficheros
export const config = {
  matcher: ['/((?!_next/|.*\\..*).*)'],
};



