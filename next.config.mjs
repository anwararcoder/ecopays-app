/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BASE_URL: "https://ecopays.ar-coder.com",
    },
    images: {
      domains: [
        "cdn-icons-png.flaticon.com",
        "ecopays.ar-coder.com",
        "images.unsplash.com",
      ],
    },
  };

export default nextConfig;
