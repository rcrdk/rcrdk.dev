import type { MetadataRoute } from 'next'

import { env } from '@/lib/env'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = env.NEXT_PUBLIC_APP_URL
	const now = new Date().toISOString()

	return [
		{
			url: baseUrl,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 1,
		},
	]
}
