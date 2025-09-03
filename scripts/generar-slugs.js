// scripts/generar-slugs.js
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app", "data", "novedades.json");

function slugify(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")                // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/[^a-z0-9\s-]/g, "")    // elimina caracteres raros
    .trim()
    .replace(/\s+/g, "-");           // espacios -> guiones
}

try {
  const raw = fs.readFileSync(filePath, "utf8");
  const novedades = JSON.parse(raw);

  const out = novedades.map((n) => ({
    ...n,
    slug: slugify(n.titulo || ""),
  }));

  fs.writeFileSync(filePath, JSON.stringify(out, null, 2), "utf8");
  console.log("✅ Slugs REGENERADOS y guardados en app/data/novedades.json");
} catch (err) {
  console.error("❌ Error procesando el archivo:", err);
  process.exit(1);
}
