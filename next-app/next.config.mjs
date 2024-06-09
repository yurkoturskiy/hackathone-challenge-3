/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
