import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Validación de campos
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Comprobación de variables de entorno
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Faltan variables de entorno para el envío de correos");
      return NextResponse.json(
        { ok: false, error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 465),
      secure: Number(process.env.EMAIL_PORT || 465) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const to = process.env.EMAIL_USER!;
    const asunto = `Nuevo contacto de ${name}`;

    await transporter.sendMail({
      from: `"Web Despacho" <${process.env.EMAIL_USER}>`,
      to,
      replyTo: email,
      subject: asunto,
      html: `
        <h2>Nuevo mensaje del formulario</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("❌ Error enviando correo:", err);
    return NextResponse.json(
      { ok: false, error: 'Hubo un problema al enviar el mensaje. Inténtelo más tarde.' },
      { status: 500 }
    );
  }
}

