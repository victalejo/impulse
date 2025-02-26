// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configura las imágenes externas que serán optimizadas por Next.js
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.printify.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image-storage.example.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
  // Esta configuración es necesaria si usas App Router con API Routes en Next.js
  experimental: {
    appDir: true,
  }
};

module.exports = nextConfig;