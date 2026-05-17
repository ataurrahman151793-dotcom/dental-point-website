import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  /* Turbopack (default in Next.js 16) — no webpack config needed */
  turbopack: {},
};

export default nextConfig;
