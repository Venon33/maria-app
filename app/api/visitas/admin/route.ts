// app/api/visitas/admin/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export const runtime = 'edge'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

function fmt(d: Date) {
  return d.toISOString().slice(0, 10) // YYYY-MM-DD
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key') || ''
  const days = Math.max(1, Math.min(60, Number(searchParams.get('days') || '7')))

  // 🔐 Usa ADMIN_KEY (no VISIT_ADMIN_KEY)
  const ADMIN_KEY = process.env.ADMIN_KEY || ''
  if (!ADMIN_KEY) {
    return NextResponse.json({ ok: false, error: 'server_missing_admin_key' }, { status: 500 })
  }
  if (key !== ADMIN_KEY) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  try {
    // total
    const totalRaw = await redis.get<number>('visitas:total')
    const total = Number(totalRaw || 0)

    // últimos N días (hoy incluido)
    const dates: string[] = []
    for (let i = 0; i < days; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      dates.push(fmt(d))
    }
    const keys = dates.map(d => `visitas:byday:${d}`)
    const values = await redis.mget<number[]>(...keys)

    const byDay = dates.map((d, i) => ({
      date: d,
      count: Number(values?.[i] || 0),
    }))

    return NextResponse.json({ ok: true, total, days, byDay })
  } catch {
    return NextResponse.json({ ok: false, error: 'redis_error' }, { status: 500 })
  }
}











