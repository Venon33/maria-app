// app/api/visitas/route.ts
import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function GET() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Faltan vars Upstash' }, { status: 500 })
  }

  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD (UTC)
  await redis.incr('visitas:total')
  await redis.incr(`visitas:byday:${today}`)

  return NextResponse.json({ ok: true })
}


