import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is the new line to fix the pathing issue
  outputFileTracingRoot: process.cwd(),
  
  // Your existing configuration is below
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;