import type { MetadataRoute } from 'next'

import { env } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/'],
		},
		sitemap: `${env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
		host: env.NEXT_PUBLIC_APP_URL,
	}
}
