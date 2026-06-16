import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactCompiler: true,
	images: {
		qualities: [100, 75],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lastfm.freetls.fastly.net',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'github.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/stats/script.js',
				destination: 'https://cloud.umami.is/script.js',
			},
			{
				source: '/stats/api/send',
				destination: 'https://gateway.umami.is/api/send',
			},
		]
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'X-DNS-Prefetch-Control',
						value: 'on',
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
					{
						key: 'Content-Security-Policy',
						value:
							"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://ws.audioscrobbler.com; frame-ancestors 'none';",
					},
				],
			},
		]
	},
}

export default withNextIntl(nextConfig)
