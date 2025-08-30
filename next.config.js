/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://tudominio.com'
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-src 'none'",
      `form-action ${BASE} mailto:`,
      `base-uri ${BASE}`,
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join('; ')
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=15552000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Content-Security-Policy-Report-Only', value: csp },
        ],
      },
    ]
  },
}
module.exports = nextConfig
