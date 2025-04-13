import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google user photos
      'lh4.googleusercontent.com', // Alternative Google photos domain
      'lh5.googleusercontent.com', // Alternative Google photos domain
    ],
  },
};

export default nextConfig;
