// app/api/visitas/route.ts
import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export const runtime = 'edge'            // Upstash funciona perfecto en Edge
export const dynamic = 'force-dynamic'   // evita caché de Next

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function GET() {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({ ok: false, error: 'Faltan variables Upstash' }, { status: 500 })
    }

    // total
    await redis.incr('visitas:total')

    // por día (UTC YYYY-MM-DD, igual que el admin)
    const today = new Date().toISOString().slice(0, 10)
    await redis.incr(`visitas:byday:${today}`)

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'No se pudo incrementar' }, { status: 500 })
  }
}


