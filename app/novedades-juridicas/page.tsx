// app/novedades-juridicas/page.tsx
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

type Novedad = { titulo: string; resumen: string; fecha: string; slug: string };

export const metadata = {
  title: "Novedades Jurídicas | Despacho María Lara Molina",
  description: "Actualizaciones y cambios legales recientes.",
  alternates: { canonical: "https://www.abogadamarialaramolina.com/novedades-juridicas" },
};
export const dynamic = "force-static";

export default async function NovedadesJuridicasPage() {
  const filePath = path.join(process.cwd(), "data", "novedades.json");
  const raw = await fs.readFile(filePath, "utf8");
  const novedades: Novedad[] = JSON.parse(raw).sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

  const getClasses = (n: Novedad, i: number) => {
    const txt = `${n.slug} ${n.titulo}`.toLowerCase();
    if (txt.includes("laboral")) return { card: "card-verde", badge: "badge-verde", badgeText: "Laboral" };
    if (txt.includes("penal")) return { card: "card-rojo", badge: "badge-rojo", badgeText: "Penal" };
    if (txt.includes("extranjer")) return { card: "card-amarillo", badge: "badge-amarillo", badgeText: "Extranjería" };
    const alt = i % 2 === 0 ? "card-azul" : "card-verde";
    const bad = i % 2 === 0 ? "badge-azul" : "badge-verde";
    return { card: alt, badge: bad, badgeText: "Civil" };
  };

  return (
    <main className="novedades-wrap">
      <header className="novedades-header">
        <h1>
          <i className="fas fa-newspaper" style={{ marginRight: 10, color: "#044472" }} />
          Novedades Jurídicas
        </h1>
        <p className="novedades-sub">Actualizaciones y cambios legales recientes</p>
      </header>

      <section className="novedades-grid">
        {novedades.map((n, i) => {
          const cls = getClasses(n, i);
          const dt = new Date(n.fecha);
          return (
            <article key={n.slug} className={`novedad-card ${cls.card}`}>
              <span className={`badge ${cls.badge}`}>{cls.badgeText}</span>
              <h3>{n.titulo}</h3>
              <p>{n.resumen}</p>
              <time dateTime={dt.toISOString()}>
                {dt.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "2-digit" })}
              </time>
            </article>
          );
        })}
      </section>

      <div className="novedades-foot">
        <Link href="/" className="btn-volver-ligero">Volver al inicio</Link>
      </div>
    </main>
  );
}




