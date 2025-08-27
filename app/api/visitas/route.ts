// app/api/visitas/route.ts
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const runtime = 'edge';

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.warn('⚠️ Falta configurar UPSTASH_REDIS_REST_URL/TOKEN en Vercel');
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  // clave por día en UTC para ser consistente
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  await redis.incr('visitas:total');
  await redis.incr(`visitas:byday:${today}`);

  const [total, todayCount] = await Promise.all([
    redis.get<number>('visitas:total').then(v => v ?? 0),
    redis.get<number>(`visitas:byday:${today}`).then(v => v ?? 0),
  ]);

  return NextResponse.json({ ok: true, total, today: { date: today, count: todayCount } });
}
