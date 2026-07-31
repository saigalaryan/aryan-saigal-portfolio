/** @type {import('next').NextConfig} */
const nextConfig = {
  // Type errors are no longer suppressed. `ignoreBuildErrors` was hiding real
  // failures (the `three` package had no type declarations, so every 3D call
  // site was implicitly `any`).
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
