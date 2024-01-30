/** @type {import('next').NextConfig} */

const rewrites = () => {
  return [
    {
      source: "/api/files",
      destination: `http://localhost:5000/document-signature/convert`,
    },
  ];
};

const nextConfig = {
  rewrites,
};

export default nextConfig;
