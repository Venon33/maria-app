import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',       // rutas internas
          '/_next/',     // archivos internos de Next.js
          '/assets/',    // estáticos que no deben indexarse
        ],
      },
    ],
    sitemap: [
      'https://www.abogadamarialaramolina.com/sitemap.xml',
      'https://www.abogadamarialaramolina.com/sitemap-novedades.xml',
    ],
  }
}
