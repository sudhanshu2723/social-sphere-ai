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
        {
            protocol: 'https',
            hostname:"instagram.fixr3-3.fna.fbcdn.net"
        },
      ],
    },
  }
  
  export default nextConfig
  