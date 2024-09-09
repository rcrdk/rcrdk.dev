/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		locales: ['en-us', 'pt-br'],
		defaultLocale: 'pt-br',
	},
	trailingSlash: true,
	reactStrictMode: false,
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
	compiler: {
		styledComponents: true,
	},
}

export default nextConfig
