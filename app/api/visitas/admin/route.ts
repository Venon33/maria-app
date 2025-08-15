import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const visitas = await redis.get<number>("contador_visitas");
    return NextResponse.json({
      visitas: visitas || 0,
      mensaje: "Total de visitas contabilizadas"
    });
  } catch (error) {
    console.error("Error obteniendo visitas:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
