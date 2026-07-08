/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      {
        source: "/affiliate",
        destination: "/referral",
        permanent: true,
      },
      {
        source: "/affiliate-portal",
        destination: "/referral-portal",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
