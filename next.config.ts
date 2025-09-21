import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bharatsarthi.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cdn.iconscout.com",
      },
    ],
  },
};

export default withPWA({
  ...nextConfig,
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});
