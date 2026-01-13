import type { NextConfig } from "next";

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = withMDX({
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  webpack: (config: any, { dev }: any) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      { hostname: "img.icons8.com" },
      { hostname: "assets.chanhdai.com" },
      { hostname: "static.vecteezy.com" },
    ],
  },
});

export default nextConfig;
