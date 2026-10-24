import type { NextConfig } from "next";

const isExport = process.env.BUILD_TARGET === "export" || process.env.GITHUB_ACTIONS === "true";
const repoName = "Datheon_Vibe_Coding_Mastery_-_Capstone_Project";
const basePath = isExport ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  basePath: basePath,
  images: {
    unoptimized: true,
  },
  // Dynamic features only when not running in static HTML export mode
  cacheComponents: isExport ? false : true,
  partialPrefetching: isExport ? false : true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
