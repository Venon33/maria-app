export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function GET() {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      console.error('❌ Falta UPSTASH env')
      return NextResponse.json({ ok: false }, { status: 500, headers: { 'Cache-Control': 'no-store' } })
    }
    const today = new Date().toISOString().slice(0,10)
    await redis.incr('visitas:total')
    await redis.incr(`visitas:byday:${today}`)
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err:any) {
    console.error('❌ Redis error:', err?.message)
    const msg = String(err?.message||'')
    const code = msg.includes('NOPERM') ? 403 : 500
    return NextResponse.json({ ok:false, error:'redis_error', detail:msg }, { status: code, headers: { 'Cache-Control': 'no-store' } })
  }
}


