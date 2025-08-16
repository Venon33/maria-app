// app/api/visitas/route.ts
import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export const dynamic = 'force-dynamic'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

function todayLabel() {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}

export async function GET() {
  try {
    // suma total y por día
    const dayKey = `visitas:byday:${todayLabel()}`
    const [total, day] = await Promise.all([
      redis.incr('visitas:total'),
      redis.incr(dayKey),
    ])
    // caduca el contador diario a 40 días por si acaso
    await redis.expire(dayKey, 60 * 60 * 24 * 40)

    return NextResponse.json({ ok: true, total, today: day })
  } catch (e) {
    console.error('❌ visitas incr:', e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
