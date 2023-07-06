/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
    },
    experimental: {
        serverComponentsExternalPackages: ['cloudinary', 'graphql-request']
    },
    env: {
        NEXTAUTH_SECRET: "wb/50lQEGWH7q8RovHgKqrIu+wXV+YIB/R3HHC/u/4E="
    }
}

module.exports = nextConfig