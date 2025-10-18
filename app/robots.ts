import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'], // quita /assets si no existe
      },
    ],
    host: 'https://www.abogadamarialaramolina.com',
    sitemap: [
      'https://www.abogadamarialaramolina.com/sitemap.xml',
      // si mantienes /sitemap-novedades.xml, descomenta:
      // 'https://www.abogadamarialaramolina.com/sitemap-novedades.xml',
    ],
  }
}
