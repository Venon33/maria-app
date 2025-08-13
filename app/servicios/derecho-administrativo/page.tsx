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
          <h2>Derecho Administrativo</h2>
          <p>
            <h3>Brindamos servicios legales en derecho administrativo, gestionando trámites, impugnaciones y procedimientos ante organismos públicos, incluyendo:</h3>
            <h3>I - Redacción y tramitacción de recursos administrativos contra actos o resoluciones dictadas por organismos públicos.</h3>
            <h3>II - Defensa ante multas, sanciones o medidas disciplinarias impuestas por autoridades administrativas, etc.</h3>
           
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


