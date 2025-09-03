// app/novedades-juridicas/[slug]/page.tsx
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";

type Novedad = {
  titulo: string;
  resumen: string;
  fecha: string; // ISO
  slug: string;
};

async function getNovedades(): Promise<Novedad[]> {
  const filePath = path.join(process.cwd(), "data", "novedades.json");
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as Novedad[];
}

// Genera las rutas estáticas para cada novedad
export async function generateStaticParams() {
  const items = await getNovedades();
  return items.map((n) => ({ slug: n.slug }));
}

// Genera metadatos dinámicos para SEO
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const items = await getNovedades();
  const nov = items.find((n) => n.slug === params.slug);
  const title = nov ? `${nov.titulo} | Novedades Jurídicas` : "Novedades Jurídicas";
  const url = `https://www.abogadamarialaramolina.com/novedades-juridicas/${params.slug}`;
  return {
    title,
    alternates: { canonical: url },
    openGraph: { title, url, type: "article" },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const items = await getNovedades();
  const nov = items.find((n) => n.slug === params.slug);

  if (!nov) {
    return (
      <main className="novedades-wrap">
        <div className="novedades-header">
          <h1>Novedades Jurídicas</h1>
          <p className="novedades-sub">No encontrada</p>
        </div>
        <div className="novedades-foot">
          <Link href="/novedades-juridicas" className="btn-volver-ligero">
            Volver
          </Link>
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
          {fecha.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </p>
      </header>

      <section className="novedades-grid" style={{ justifyItems: "center" }}>
        <article className="novedad-card card-azul" style={{ maxWidth: 720 }}>
          <h3 style={{ marginTop: 0 }}>{nov.titulo}</h3>
          <p>{nov.resumen}</p>
        </article>
      </section>

      <div className="novedades-foot">
        <Link href="/novedades-juridicas" className="btn-volver-ligero">
          ← Volver a Novedades Jurídicas
        </Link>
      </div>
    </main>
  );
}
