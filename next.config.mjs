/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Hostinger shared hosting serves files from public_html with no Node
  // runtime, so the site is exported as plain HTML/CSS/JS rather than run as a
  // server. `next build` writes the uploadable site to ./out.
  output: "export",

  // Image optimisation is a server feature; without this the exported build
  // would point at an /_next/image endpoint that nothing is there to answer.
  images: { unoptimized: true },

  // Emits /about/index.html instead of /about.html, so Apache resolves
  // /about/ natively without any rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
