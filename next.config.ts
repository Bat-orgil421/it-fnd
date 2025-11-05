import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/hf/:path*",
        destination: "https://api-inference.huggingface.co/:path*",
      },
    ];
  },
};

export default nextConfig;
