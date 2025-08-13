'use client'

import Image from 'next/image';
import Link from 'next/link';

export default function ServicioPage() {
  return (
    <main className="servicio-container">
      {/* Contenedor foto + texto lateral */}
      <div className="cabecera-horizontal">
        {/* Foto a la izquierda */}  {/* desactivar/activar foto  */} 
       {/* <Image 
          src="/20250622_085709.jpg"
          alt="Retrato de María Lara Molina"
          width={250}
          height={350}
          className="foto-abogada"*
        />*/}

        {/* Texto a la derecha */}
        <div className="texto-lateral">
          <h1>Despacho de Abogados María Lara Molina</h1>
          <h2>Derecho de Familia</h2>
          <p>
            <h3>Entre nuestros servicios se incluyen:</h3>
            <h3>I   - Asesoramiento y defensa legal en procesos de divorcio (tanto de mutuo acuerdo, como contenciosos)</h3>
            <h3>II  - Asistencia y resolución  de disputas sobre la custioda de los hijos, el régimen de visitas y pensiones alimenticias.</h3>
            <h3>III - Modificación de medidas.</h3>
            <h3>IV  - Ejecuciones de sentencia.</h3>
            <h3>V   - Representación en conflictos legales relacionados con herencias y sucesiones.</h3>
          
          </p>
        </div>
      </div>

      {/* Botón volver a Servicios */}
      <Link href="/servicios" passHref>
        <button className="boton-volver">
          ← Volver a Servicios
        </button>
      </Link>
    </main>
  );
}


