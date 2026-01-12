import type { NextConfig } from "next";

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = withMDX({
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
});

export default nextConfig;
