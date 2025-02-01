import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	emptyStringAsUndefined: true,

	server: {
		MIXPANEL_SECRET: z.string().optional(),
		IPAPI_ACCESS_KEY: z.string().optional(),
	},

	shared: {
		NEXT_PUBLIC_APP_URL: z.string(),
		NEXT_PUBLIC_GOOGLE_ANALYTICS: z.string().optional(),
		NEXT_PUBLIC_GOOGLE_TAG_MANAGER: z.string().optional(),
	},

	runtimeEnv: {
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
		NEXT_PUBLIC_GOOGLE_TAG_MANAGER: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER,
		MIXPANEL_SECRET: process.env.MIXPANEL_SECRET,
		IPAPI_ACCESS_KEY: process.env.IPAPI_ACCESS_KEY,
	},
})
