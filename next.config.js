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
    API_ENDPOINT: process.env.NODE_ENV === "dev" ? "http://127.0.0.1:5000" : "https://fuzzy-gold-dolphin.cyclic.app",
    API_DEV: "http://127.0.0.1:5000",
    API_PROD: "https://fuzzy-gold-dolphin.cyclic.app",
    GOOGLE_ANALYTICS: "G-Y5GYHJD7YN",
  },
};

module.exports = nextConfig;
