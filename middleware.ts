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
  const cookie = req.cookies.get("vdate");

  // Si ya contamos hoy desde este dispositivo, no sumamos
  if (cookie?.value === today) return res;

  try {
    await redis.incr("visitas:total");
    await redis.incr(`visitas:byday:${today}`);
  } catch (e) {
    console.error("Error incrementando visitas:", e);
  }

  // Guardamos la fecha de hoy en la cookie (expira en 2 días por seguridad)
  res.cookies.set("vdate", today, {
    maxAge: 60 * 60 * 1, // 1 hora para agregar dias *1, otro *
    sameSite: "lax",
    secure: true,
    path: "/",
  });

  return res;
}

// Cuenta solo en la home (ajusta si quieres)
export const config = { matcher: ["/"] };

