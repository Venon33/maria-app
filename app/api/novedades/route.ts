import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "novedades.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    const novedades = JSON.parse(fileData);

    return NextResponse.json(novedades);
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudieron cargar las novedades" },
      { status: 500 }
    );
  }
}
