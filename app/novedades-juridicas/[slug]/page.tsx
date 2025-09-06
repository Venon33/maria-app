import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";

type Novedad = { titulo:string; resumen:string; fecha:string; slug:string };

async function getNovedades(): Promise<Novedad[]> {
  const filePath = path.join(process.cwd(), "data", "novedades.json");
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as Novedad[];
}

export async function generateStaticParams() {
  const items = await getNovedades();
  return items.map(n => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params:{ slug:string } }): Promise<Metadata> {
  const items = await getNovedades();
  const nov = items.find(n => n.slug === params.slug);
  const title = nov ? `${nov.titulo} | Novedades Jurídicas` : "Novedades Jurídicas";
  const url = `https://www.abogadamarialaramolina.com/novedades-juridicas/${params.slug}`;
  return { title, alternates: { canonical: url }, openGraph: { title, url, type: "article" } };
}

export default async function Page({ params }: { params:{ slug:string } }) {
  const items = await getNovedades();
  const nov = items.find(n => n.slug === params.slug);
  if (!nov) {
    return (
      <main className="novedades-wrap">
        <header className="novedades-header">
          <h1>Novedades Jurídicas</h1>
          <p className="novedades-sub">No encontrada</p>
        </header>
        <div className="novedades-foot">
          <Link href="/novedades-juridicas" className="btn-volver-ligero">Volver</Link>
        </div>
      </main>
    );
  }

  const fecha = new Date(nov.fecha);

  return (
    <main className="novedades-wrap">
      <header className="novedades-header">
        <h1>{nov.titulo}</h1>
        <p className="novedades-sub">
          {fecha.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "2-digit" })}
        </p>
      </header>

      {/* 👇 OJO: clases nuevas, sin .novedades-grid ni .novedad-card */}
      <section className="detalle-novedad-wrap">
        <article className="detalle-novedad">
          <h3>{nov.titulo}</h3>
          <p>{nov.resumen}</p>
        </article>
      </section>

      <div className="novedades-foot">
        <Link href="/novedades-juridicas" className="btn-volver-ligero">← Volver a Novedades Jurídicas</Link>
      </div>
    </main>
  );
}

