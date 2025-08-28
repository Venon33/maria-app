import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const dynamic = "force-dynamic";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  // Autenticación
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const total = (await redis.get<number>("visitas:total")) ?? 0;

    const days = Math.max(
      1,
      Math.min(31, Number(searchParams.get("days") ?? "7"))
    );
    const today = new Date();
    const byDay: Record<string, number> = {};

    for (let i = 0; i < days; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const label = d.toISOString().slice(0, 10);
      const count = (await redis.get<number>(`visitas:byday:${label}`)) ?? 0;
      byDay[label] = count;
    }

    return NextResponse.json({ ok: true, total, byDay });
  } catch (err: any) {
    console.error("❌ Error en /api/visitas/admin:", err);
    return NextResponse.json(
      { ok: false, error: "redis_error", detalle: err.message },
      { status: 500 }
    );
  }
}










