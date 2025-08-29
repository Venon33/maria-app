import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const dynamic = "force-dynamic";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("key") !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    // prueba de escritura/lectura
    const testKey = "visitas:debug:test";
    const inc = await redis.incr(testKey);
    const val = await redis.get<number>(testKey);

    return NextResponse.json({
      ok: true,
      wrote: inc,
      read: val,
      // máscara por seguridad
      urlMasked:
        (process.env.UPSTASH_REDIS_REST_URL || "").replace(/(^https?:\/\/).+?(\.upstash\.io)/, "$1***$2"),
      tokenPrefix: (process.env.UPSTASH_REDIS_REST_TOKEN || "").slice(0, 6) + "…",
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
