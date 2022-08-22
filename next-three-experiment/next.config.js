/** @type {import('next').NextConfig} */
const path = require('path');


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
        'images.pexels.com/'
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
