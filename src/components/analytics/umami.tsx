import Script from 'next/script'

import { env } from '@/lib/env'
import { shouldEnableUmami } from '@/lib/should-enable-umami'

const DEFAULT_UMAMI_SCRIPT_URL = 'https://cloud.umami.is/script.js'

export function UmamiAnalytics() {
	if (!shouldEnableUmami()) return null

	const websiteId = env.NEXT_PUBLIC_UMAMI_WEBSITE_ID!
	const scriptUrl = env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ?? DEFAULT_UMAMI_SCRIPT_URL

	return <Script defer src={scriptUrl} data-website-id={websiteId} strategy="afterInteractive" />
}
