// app/api/visitas/admin/route.ts
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');

  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const days = Math.max(1, Math.min(31, Number(searchParams.get('days') ?? '7')));
  const now = new Date();
  const byDay: Record<string, number> = {};

  for (let i = 0; i < days; i++) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    d.setUTCDate(d.getUTCDate() - i);
    const label = d.toISOString().slice(0, 10);
    byDay[label] = (await redis.get<number>(`visitas:byday:${label}`)) ?? 0;
  }

  const total = (await redis.get<number>('visitas:total')) ?? 0;

  const res = NextResponse.json({ ok: true, total, byDay });
  res.headers.set('Cache-Control', 'no-store, no-cache, max-age=0, must-revalidate');
  return res;
}






