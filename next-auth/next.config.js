/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/api/auth/session',
        headers: [
          {
            key: 'Expires',
            value: '-1',
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
