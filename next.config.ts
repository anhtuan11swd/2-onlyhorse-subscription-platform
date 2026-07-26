import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  reactCompiler: true,
  serverExternalPackages: ["cloudinary"],
};

export default nextConfig;
