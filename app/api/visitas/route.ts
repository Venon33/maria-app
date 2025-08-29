import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const dynamic = "force-dynamic";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    await redis.incr("visitas:total");
    await redis.incr(`visitas:byday:${today}`);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("❌ /api/visitas", err);
    return NextResponse.json(
      { ok: false, error: "redis_error", detalle: err.message },
      { status: 500 }
    );
  }
}





