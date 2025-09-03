import Image from 'next/image';
import Link from 'next/link';

export default function ServicioPage() {
  return (
    <main className="servicio-container">
      <div className="cabecera-horizontal">
        {/* <Image src="/20250622_085709.jpg" alt="Retrato de María Lara Molina" width={250} height={350} className="foto-abogada" /> */}

        <div className="texto-lateral">
          <h1>Despacho de Abogados María Lara Molina</h1>
          <h2>Derecho Extranjería</h2>

          <div>
            <h3>
              I - Ofrecemos asesoramiento y gestión en la obtención de permiso de residencia,
              nacionalidad, visados y otros trámites relacionados con la extranjería.
            </h3>
          </div>
        </div>
      </div>

      <Link href="/servicios" passHref>
        <button className="boton-volver">← Volver a Servicios</button>
      </Link>
    </main>
  );
}




