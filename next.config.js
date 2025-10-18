// next.config.mjs
const isDev = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "frame-src https://challenges.cloudflare.com",
      `connect-src 'self' https://challenges.cloudflare.com${isDev ? ' ws:' : ''}`,
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join('; ');

    const securityHeaders = [
      { key: 'Content-Security-Policy', value: csp },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()" },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    ];

    return [{ source: '/:path*', headers: securityHeaders }];
  },

  async redirects() {
    return [
      // /index → /
      { source: '/index', destination: '/', permanent: true },

      // www → raíz sin www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.abogadamarialaramolina.com' }],
        destination: 'https://abogadamarialaramolina.com/:path*',
        permanent: true,
      },

      // vercel.app → dominio canónico
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'maria-app.vercel.app' }],
        destination: 'https://abogadamarialaramolina.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

