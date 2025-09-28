import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "DevLogs"; // Replace with your repo name

const nextConfig: NextConfig = {
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
