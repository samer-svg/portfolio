/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental features that might cause issues
  // experimental: {
  //   optimizeCss: true,
  //   optimizePackageImports: ['lucide-react', '@/components/ui'],
  // },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
  },
  
  // Compression and optimization
  compress: true,
  poweredByHeader: false,
  
  // Add output configuration for better deployment
  output: 'standalone',
  
  // Bundle analyzer (uncomment to analyze bundle size)
  // bundleAnalyzer: {
  //   enabled: process.env.ANALYZE === 'true',
  // },
}

export default nextConfig
