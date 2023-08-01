/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.deyapro.com",
      },
      {
        protocol: "https",
        hostname: "otakudesu.lol",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  env: {
    API_DEV: "http://127.0.0.1:5000",
    API_PROD: "http://8.219.109.148:3000",
    GOOGLE_ANALYTICS: "G-Y5GYHJD7YN",
  },
};

module.exports = nextConfig;
