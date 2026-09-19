import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Product photography is currently served from /public. If you later switch to
    // hosted images (CDN / stock library), whitelist the host here and simply change
    // the `image` values inside src/data/constants.ts — no component changes needed.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
