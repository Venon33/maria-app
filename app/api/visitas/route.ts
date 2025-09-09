// app/api/visitas/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export const runtime = 'edge' // rápido y compatible con sendBeacon

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function POST(req: NextRequest) {
  try {
    const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    await redis.incr('visitas:total')
    await redis.incr(`visitas:byday:${today}`)
    // Respuesta mínima (ideal para sendBeacon)
    return new NextResponse(null, { status: 204 })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'redis_error' }, { status: 500 })
  }
}

// Opcional: rechazar otros métodos (para evitar 405 del navegador)
export function GET() {
  return NextResponse.json({ ok: true, info: 'Use POST para contar' })
}





