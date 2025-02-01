import type { MetadataRoute } from 'next'

import { env } from '@/lib/env'

export default function sitemap(): MetadataRoute.Sitemap {
	const staticEntries: MetadataRoute.Sitemap = [
		{
			url: `${env.NEXT_PUBLIC_APP_URL}/pt-br`,
			lastModified: new Date().toISOString(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${env.NEXT_PUBLIC_APP_URL}/en`,
			lastModified: new Date().toISOString(),
			changeFrequency: 'monthly',
			priority: 1,
		},
	]

	return [...staticEntries]
}
