/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
  },
};

module.exports = nextConfig;
