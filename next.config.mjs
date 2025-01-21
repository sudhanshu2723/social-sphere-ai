/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname:"instagram.fpat11-1.fna.fbcdn.net"
        },
        {
            protocol: 'https',
            hostname:"scontent.cdninstagram.com"
        },
      ],
    },
  }
  
  export default nextConfig
  