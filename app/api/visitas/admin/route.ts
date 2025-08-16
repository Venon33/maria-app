// app/api/visitas/admin/route.ts
import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export const runtime = 'edge' // rápido y compatible con Upstash

const redis = Redis.fromEnv()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')

  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  // total acumulado
  const total = (await redis.get<number>('visitas:total')) ?? 0

  // últimos N días (por defecto 7)
  const days = Math.max(1, Math.min(31, Number(searchParams.get('days') ?? '7')))
  const today = new Date()
  const byDay: Record<string, number> = {}

  for (let i = 0; i < days; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const label = d.toISOString().slice(0, 10) // YYYY-MM-DD
    const count = (await redis.get<number>(`visitas:byday:${label}`)) ?? 0
    byDay[label] = count
  }

  return NextResponse.json({ ok: true, total, byDay })
}


