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
    unoptimized: true,
    domains: ["img.icons8.com", "assets.chanhdai.com", "static.vecteezy.com"],
  },
});

export default nextConfig;
