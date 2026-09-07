import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticExport = process.env.EDGEONE_STATIC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.SITE_BASE_PATH || "",
  output: staticExport ? "export" : undefined,
  images: { unoptimized: staticExport },
  distDir: staticExport
    ? "out"
    : process.env.NODE_ENV === "production"
      ? ".next-production"
      : ".next",
  turbopack: { root: __dirname },
  // Pin the workspace root (a stray lockfile in $HOME otherwise confuses inference).
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
