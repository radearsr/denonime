/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.deyapro.com",
      },
    ],
  },
  env: {
    endpointDev: "http://127.0.0.1:5000",
    endpointDep: "api.deyapro.com",
  },
};

module.exports = nextConfig;
