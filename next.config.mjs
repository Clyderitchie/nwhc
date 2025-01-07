/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental : {
        staleTime: {
            dynamic: 30,
        },
    },
};

export default nextConfig;
