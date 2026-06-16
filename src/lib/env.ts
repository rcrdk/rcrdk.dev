import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	emptyStringAsUndefined: true,

	server: {
		LASTFM_API_KEY: z.string(),
		LASTFM_SHARED_SECRET: z.string(),
		LASTFM_USERNAME: z.string(),
	},

	shared: {
		NEXT_PUBLIC_APP_URL: z.string(),
		NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().optional(),
	},

	runtimeEnv: {
		LASTFM_API_KEY: process.env.LASTFM_API_KEY,
		LASTFM_SHARED_SECRET: process.env.LASTFM_SHARED_SECRET,
		LASTFM_USERNAME: process.env.LASTFM_USERNAME,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
	},
})
