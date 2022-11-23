/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "185.224.82.193",
      },
      {
        protocol: "https",
        hostname: "i3.wp.com",
      },
    ],
  },
};

module.exports = nextConfig;
