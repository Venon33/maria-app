import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // Sumar +1 a visitas totales y por día
  await redis.incr("visitas:total");
  await redis.incr(`visitas:byday:${today}`);

  return NextResponse.json({ ok: true });
}
