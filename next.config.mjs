/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // --- ADDED HOSTNAMES TO FIX BUILD ERROR ---
      {
        protocol: 'https',
        hostname: 'theclothingfactory.in',
      },
      {
        protocol: 'https',
        hostname: 'www.altart.in',
      },
      {
        protocol: 'https',
        hostname: 'muselot.in',
      },
      {
        protocol: 'https',
        hostname: 'tigc.in',
      },
      {
        protocol: 'https',
        hostname: 'xcdn.next.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'img.tatacliq.com',
      },
      {
        protocol: 'https',
        hostname: 'roseborn.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gordonbros.in',
      },
      {
        protocol: 'https',
        hostname: 'www.theroyalepeacock.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bitterlime.in',
      },
      {
        protocol: 'https',
        hostname: 'ishinfashions.com',
      },
      {
        protocol: 'https',
        hostname: 'neonstreet.co.in',
      },
      {
        protocol: 'https',
        hostname: 'teakwoodleathers.com',
      },
      {
        protocol: 'https',
        hostname: 'www.berrylush.com',
      },
      {
        protocol: 'https',
        hostname: 'www.campusshoes.com',
      },
      {
        protocol: 'https',
        hostname: 'img.cdn.mountainwarehouse.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.ajio.com',
      },
      {
        protocol: 'https',
        hostname: 'img4.dhresource.com',
      },
      {
        protocol: 'https',
        hostname: 'www.jiomart.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.myntassets.com',
      },
      {
        protocol: 'https',
        hostname: 'static.nike.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
    ],
  },
};

export default nextConfig;
