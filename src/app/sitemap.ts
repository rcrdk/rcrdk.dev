import type { MetadataRoute } from 'next'

import { env } from '@/lib/env'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = env.NEXT_PUBLIC_APP_URL
	const currentDate = new Date().toISOString()

	const staticEntries: MetadataRoute.Sitemap = [
		{
			url: `${baseUrl}/pt-br`,
			lastModified: currentDate,
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${baseUrl}/en`,
			lastModified: currentDate,
			changeFrequency: 'monthly',
			priority: 1,
		},
	]

	return staticEntries
}
