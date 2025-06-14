import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['bharatsarthi.s3.ap-south-1.amazonaws.com',"cdn.iconscout.com"],
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
