// app/api/visitas/route.ts
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const url = process.env.UPSTASH_REDIS_REST_URL!;
const token = process.env.UPSTASH_REDIS_REST_TOKEN!;

const redis = new Redis({ url, token });

export async function GET() {
  // clave día en UTC
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  await redis.incr('visitas:total');
  await redis.incr(`visitas:byday:${today}`);

  const [total, todayCount] = await Promise.all([
    redis.get<number>('visitas:total').then(v => v ?? 0),
    redis.get<number>(`visitas:byday:${today}`).then(v => v ?? 0),
  ]);

  // info de depuración: máscara del host de tu DB
  const dbHostMasked = url?.replace(/^https?:\/\//, '').replace(/(.{4}).+(@.+)$/, '$1***$2');

  const res = NextResponse.json({ ok: true, total, today: { date: today, count: todayCount }, db: dbHostMasked });
  res.headers.set('Cache-Control', 'no-store, no-cache, max-age=0, must-revalidate');
  return res;
}

