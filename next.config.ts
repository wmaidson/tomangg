import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    domains: ['tomangg.s3.us-east-2.amazonaws.com'], // Adicione o domínio das imagens
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
