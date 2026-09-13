import type { NextConfig } from "next";

const config: NextConfig = {
  // Standalone output bundles a self-contained server, which is what the
  // droplet and Docker paths run. App Platform runs `npm start` (next start),
  // and Next warns that next start does not work with standalone output — so
  // this is opt-in via BUILD_STANDALONE=true rather than always on.
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default config;
