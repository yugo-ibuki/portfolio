import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

initOpenNextCloudflareForDev()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ナビ整理で統合・削除したページの旧 URL を残す
  async redirects() {
    return [
      { source: '/presentation', destination: '/articles', permanent: true },
      { source: '/contact', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
