import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/faktura',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;