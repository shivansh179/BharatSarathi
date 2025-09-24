// next.config.ts
import { NextConfig } from 'next';
import withPWA from 'next-pwa';

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
};

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      { protocol: "https" as const, hostname: 'bharatsarthi.s3.ap-south-1.amazonaws.com' },
      { protocol: "https" as const, hostname: 'cdn.iconscout.com' },
    ],
  },
};

export default withPWA(pwaConfig)(nextConfig);
