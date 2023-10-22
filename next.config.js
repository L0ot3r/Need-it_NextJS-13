/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['images.unsplash.com', 'cdn-uploads.gameblog.fr', 'utfs.io', 'img.clerk.com', 'pbs.twimg.com']
  }
}

module.exports = nextConfig
