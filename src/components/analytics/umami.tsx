import Script from 'next/script'

import { UMAMI_PROXY_BASE_PATH } from '@/config/umami'
import { env } from '@/lib/env'
import { shouldEnableUmami } from '@/lib/should-enable-umami'

export function UmamiAnalytics() {
	if (!shouldEnableUmami()) return null

	const websiteId = env.NEXT_PUBLIC_UMAMI_WEBSITE_ID!
	const hostUrl = `${env.NEXT_PUBLIC_APP_URL}${UMAMI_PROXY_BASE_PATH}`

	return (
		<Script
			defer
			src={`${UMAMI_PROXY_BASE_PATH}/script.js`}
			data-website-id={websiteId}
			data-host-url={hostUrl}
			strategy="afterInteractive"
		/>
	)
}
