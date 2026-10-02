/** @type {import('next').NextConfig} */
const nextConfig = {
  // Let phones and other machines on the LAN use the dev server. Without this,
  // Next blocks its dev scripts for any host but localhost and the page never
  // becomes interactive (menu, carousels and forms do nothing).
  allowedDevOrigins: ['192.168.1.34'],
};

export default nextConfig;
