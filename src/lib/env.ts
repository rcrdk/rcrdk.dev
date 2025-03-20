import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	emptyStringAsUndefined: true,

	server: {
		MIXPANEL_SECRET: z.string().optional(),
		LASTFM_API_KEY: z.string(),
		LASTFM_SHARED_SECRET: z.string(),
		LASTFM_USENAME: z.string(),
	},

	shared: {
		NEXT_PUBLIC_APP_URL: z.string(),
		NEXT_PUBLIC_GOOGLE_ANALYTICS: z.string().optional(),
		NEXT_PUBLIC_GOOGLE_TAG_MANAGER: z.string().optional(),
	},

	runtimeEnv: {
		MIXPANEL_SECRET: process.env.MIXPANEL_SECRET,
		LASTFM_API_KEY: process.env.LASTFM_API_KEY,
		LASTFM_SHARED_SECRET: process.env.LASTFM_SHARED_SECRET,
		LASTFM_USENAME: process.env.LASTFM_USENAME,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
		NEXT_PUBLIC_GOOGLE_TAG_MANAGER: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER,
	},
})
