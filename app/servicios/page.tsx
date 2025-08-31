import Link from "next/link";

export default function ServiciosPage() {
  return (
    <main className="servicios-wrap">
      <header className="servicios-header">
        <h1>Servicios</h1>
        <p className="servicios-sub">
          Asesoramiento integral y defensa en varias áreas del Derecho.
        </p>
      </header>

      <section className="servicios-grid">
        <Link href="/servicios/derecho-laboral-y-seguridad-social" className="serv-card card-verde">
          <h3>Derecho Laboral y Seguridad Social</h3>
          <p>Despidos, reclamaciones, acoso laboral, prestaciones e incapacidades.</p>
          <span className="mas-info">+ info</span>
        </Link>

        <Link href="/servicios/derecho-de-la-familia" className="serv-card card-azul">
          <h3>Derecho de Familia</h3>
          <p>Divorcios, custodias, pensiones y mediación familiar.</p>
          <span className="mas-info">+ info</span>
        </Link>

        <Link href="/servicios/derecho-penal" className="serv-card card-rojo">
          <h3>Derecho Penal</h3>
          <p>Defensa, acusación particular, juicios rápidos y delitos leves.</p>
          <span className="mas-info">+ info</span>
        </Link>

        <Link href="/servicios/derecho-administrativo" className="serv-card card-amarillo">
          <h3>Derecho Administrativo</h3>
          <p>Recursos, sanciones y responsabilidad patrimonial.</p>
          <span className="mas-info">+ info</span>
        </Link>

        <Link href="/servicios/derecho-extranjeria" className="serv-card card-morado">
          <h3>Derecho Extranjería</h3>
          <p>Residencias, arraigos, nacionalidad y reagrupaciones.</p>
          <span className="mas-info">+ info</span>
        </Link>

        <Link href="/servicios/seguros-y-accidentes" className="serv-card card-gris">
          <h3>Seguros y Accidentes</h3>
          <p>Indemnizaciones de tráfico, caídas y reclamaciones a aseguradoras.</p>
          <span className="mas-info">+ info</span>
        </Link>
      </section>

      <div className="novedades-foot" style={{ marginTop: '2rem' }}>
        {/* 🔹 Botón más fino aquí */}
        <Link href="/" className="btn-volver-ligero">Volver al inicio</Link>
      </div>
    </main>
  );
}


