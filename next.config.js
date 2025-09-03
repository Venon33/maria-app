/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'abogadamarialaramolina.com' }],
        destination: 'https://www.abogadamarialaramolina.com/:path*',
        permanent: true, // 301
      },
    ]
  },
}
export default nextConfig
