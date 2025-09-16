/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

module.exports = nextConfig