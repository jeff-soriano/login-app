/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.prokeep.com',
        port: '',
        pathname: '/hs-fs/hubfs/Logos/**',
      },
    ],
  },
}

export default nextConfig
