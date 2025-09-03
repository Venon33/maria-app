import Image from 'next/image';
import Link from 'next/link';

export default function ServicioPage() {
  return (
    <main className="servicio-container">
      <div className="cabecera-horizontal">
        {/* <Image src="/20250622_085709.jpg" alt="Retrato de María Lara Molina" width={250} height={350} className="foto-abogada" /> */}

        <div className="texto-lateral">
          <h1>Despacho de Abogados María Lara Molina</h1>
          <h2>Derecho Laboral y Seguridad Social</h2>

          <div>
            <h3>Brindamos apoyo profesional en una ampliedad variedad de situaciones laborales, incluyendo:</h3>
            <h3>I   - Negociación de acuerdos laborales</h3>
            <h3>II  - Reclamaciones salariales</h3>
            <h3>III - Modificación sustancial de condiciones de trabajo</h3>
            <h3>IV  - Asesoramiento y defensa en casos de despido</h3>
            <h3>V   - Asesoramiento y defensa en accidentes de trabajo</h3>
            <h3>VI  - Asesoramiento y defensa en casos de acoso laboral</h3>
            <h3>VII - Asistencia en temas relacionados con prestaciones de la Seguridad Social</h3>
          </div>
        </div>
      </div>

      <Link href="/servicios" passHref>
        <button className="boton-volver">← Volver a Servicios</button>
      </Link>
    </main>
  );
}
