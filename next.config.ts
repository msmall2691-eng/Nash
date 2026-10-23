import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      // The content editor is a static page in `public/admin/`, and files under
      // `public/` are served at their literal path — so without this, /admin is
      // a 404 and only /admin/index.html works. Decap routes within itself on
      // the URL fragment (/admin/#/collections/projects), which never reaches
      // the server, so this one rewrite covers the whole editor.
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
