import Mixpanel from 'mixpanel'

import { getIpData } from '@/http/get-ip-data'
import { env } from '@/lib/env'
import { getHeadersData } from '@/lib/headers-data'

const mixpanelEvent = env.MIXPANEL_SECRET
	? Mixpanel.init(env.MIXPANEL_SECRET)
	: undefined

export async function trackServerEvent(
	eventName: string,
	properties: Record<string, string | number | boolean>,
) {
	if (
		process.env.NODE_ENV !== 'production' ||
		!env.MIXPANEL_SECRET ||
		!mixpanelEvent
	) {
		return
	}

	const headersData = await getHeadersData()
	const ipData = await getIpData(headersData.ip)

	mixpanelEvent.track(eventName, {
		$city: ipData.city,
		$region: ipData.regionName,
		mp_country_code: ipData.countryCode,
		$os: headersData.$os,
		$os_version: headersData.$os_version,
		$browser: headersData.$browser,
		$browser_version: headersData.$browser_version,
		$brand: headersData.$brand,
		$model: headersData.$model,
		$referrer: headersData.$referrer,
		isBot: headersData.isBot,
		...properties,
		$current_url: properties.url
			? `${env.NEXT_PUBLIC_APP_URL}${properties.url}`
			: undefined,
		url: undefined,
	})
}
