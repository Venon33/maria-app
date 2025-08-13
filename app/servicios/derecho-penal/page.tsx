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
          <h2>Derecho Penal</h2>
          <p>
            <h3>Ofrecemos asesoría y defensa legal en casos de derecho penal, protegiendo tus derechos frente a acusaciones y cargos criminales, incluyendo:</h3>
            <h3>I   - Cancelación de antecedentes penales y policiales.</h3>
            <h3>II  - Asesoría y defensa en casos de robos o hurto.</h3>
            <h3>III - Representación en situaciones de delitos de lesiones.</h3>
            <h3>IV  - Asesoría legal en delitos relacionados con el tráfico, como conducir bajo los efectos del alcohol, accidentes de tráfico con lesiones o muerte y otros delitos víales.</h3>
         
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


