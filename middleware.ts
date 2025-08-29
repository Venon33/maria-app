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

  // Si ya tiene cookie, no contamos
  if (!req.cookies.get("visitado")) {
    try {
      const today = new Date().toISOString().slice(0, 10);
      await redis.incr("visitas:total");
      await redis.incr(`visitas:byday:${today}`);

      // Cookie 7 días
      res.cookies.set("visitado", "1", {
        maxAge: 60 * 60 * 24 * 7, // 7 días
        httpOnly: false,          // visible al frontend si quisieras
        sameSite: "lax",
        secure: true,             // en producción (https)
        path: "/",
      });
    } catch (e) {
      console.error("Error incrementando visitas:", e);
    }
  }

  return res;
}

// Solo en la home
export const config = { matcher: ["/"] };

