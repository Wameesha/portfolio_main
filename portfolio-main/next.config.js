/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add any external image domains if needed
    unoptimized: false
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons']
  }
}

module.exports = nextConfig