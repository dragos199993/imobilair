const withNextIntl = require('next-intl/plugin')('./lib/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'jwjhvwidtzhsesymivtz.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'jwjhvwidtzhsesymivtz.supabase.co',
      },
    ],
  },
})

module.exports = nextConfig
