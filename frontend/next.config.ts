import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        // Ảnh món ăn lấy từ Pexels (backend: npm run images:fetch / images:apply)
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        // Ảnh món ăn người dùng/admin tải lên (backend: POST /recipes/:id/image)
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
