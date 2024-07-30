/** @type {import('next').NextConfig} */
const nextConfig = {
	trailingSlash: true,
	reactStrictMode: false,
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
	compiler: {
		styledComponents: true,
	},
}

export default nextConfig
