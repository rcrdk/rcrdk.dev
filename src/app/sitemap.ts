import type { MetadataRoute } from 'next'

import { env } from '@/lib/env'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: env.NEXT_PUBLIC_APP_URL,
			lastModified: new Date().toISOString(),
			changeFrequency: 'monthly',
			priority: 1,
		},
	]
}
