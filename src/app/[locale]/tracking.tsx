/* eslint-disable prettier/prettier */
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

import { env } from '@/lib/env'

export function Tracking() {
	if (process.env.NODE_ENV !== 'production') {
		return null
	}

	return (
		<>
			{env.NEXT_PUBLIC_GOOGLE_ANALYTICS && <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />}
			{env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER && <GoogleTagManager gtmId={env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER} />}
		</>
	)
}
