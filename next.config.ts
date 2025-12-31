import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tr.rbxcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t0.rbxcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t1.rbxcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t2.rbxcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t3.rbxcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t4.rbxcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t5.rbxcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t6.rbxcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t7.rbxcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assetgame.roblox.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  pageExtensions: ["js", "ts", "jsx", "tsx", "md", "mdx"],
};

export default nextConfig;
