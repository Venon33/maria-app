// app/api/visitas/admin/route.ts
import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export const dynamic = 'force-dynamic' // evita cache en Vercel/CDN

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key') || ''
    const maxDays = 31

    // Auth sencilla por query param
    if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Total acumulado
    const total = (await redis.get<number>('visitas:total')) ?? 0

    // Rango de días (1..31), por defecto 7
    const daysParam = Number(searchParams.get('days') ?? '7')
    const days = Number.isFinite(daysParam)
      ? Math.max(1, Math.min(maxDays, Math.trunc(daysParam)))
      : 7

    const today = new Date()
    const byDay: Record<string, number> = {}

    for (let i = 0; i < days; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const label = d.toISOString().slice(0, 10) // YYYY-MM-DD
      byDay[label] = (await redis.get<number>(`visitas:byday:${label}`)) ?? 0
    }

    return NextResponse.json({ ok: true, total, byDay })
  } catch (err) {
    console.error('❌ Error admin visitas:', err)
    return NextResponse.json({ ok: false, error: 'Error interno' }, { status: 500 })
  }
}




