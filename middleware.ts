// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  try {
    await redis.incr("visitas:total");
    await redis.incr(`visitas:byday:${today}`);
  } catch (e) {
    console.error("❌ Error incrementando visitas:", e);
  }

  return res;
}

// Solo contamos visitas en la home (ajusta si quieres en más rutas)
export const config = { matcher: ["/"] };


