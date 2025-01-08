/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTime: {
      dynamic: 30,
    },
  },
  images: {
    domains: ["placehold.co", "res.cloudinary.com"],
  },
};
export default nextConfig;