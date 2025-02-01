// import Mixpanel from 'mixpanel'

// import { env } from '@/lib/env'

// const mixpanelEvent = env.MIXPANEL_SECRET
// 	? Mixpanel.init(env.MIXPANEL_SECRET)
// 	: undefined

// export function trackServerEvent(
// 	eventName: string,
// 	properties: Record<string, string | number>,
// ) {
// 	if (
// 		process.env.NODE_ENV !== 'production' ||
// 		!env.MIXPANEL_SECRET ||
// 		!mixpanelEvent
// 	) {
// 		return
// 	}

// 	mixpanelEvent.track(eventName, properties)
// }

import 'server-only'

import { v4 as uuidv4 } from 'uuid'

import { env } from '@/lib/env'

export const trackServerEvent = async (
	eventName: string,
	eventProperties?: Record<string, unknown>,
) => {
	if (
		process.env.NODE_ENV !== 'production' ||
		!env.MIXPANEL_SECRET ||
		!env.IPAPI_ACCESS_KEY
	) {
		return
	}

	const locationResponse = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/proxy`)
	const locationData = await locationResponse.json()

	const urlParams = new URLSearchParams(window.location.search)
	const utmParams = {
		utm_source: urlParams.get('utm_source') || undefined,
		utm_medium: urlParams.get('utm_medium') || undefined,
		utm_campaign: urlParams.get('utm_campaign') || undefined,
		utm_term: urlParams.get('utm_term') || undefined,
		utm_content: urlParams.get('utm_content') || undefined,
		id: urlParams.get('id') || undefined,
	}

	function getUserUUID() {
		let userUUID = localStorage.getItem('@RCRDK.DEV:mixpanel-user')

		if (!userUUID) {
			userUUID = uuidv4()
			localStorage.setItem('@RCRDK.DEV:mixpanel-user', userUUID)
		}
		return userUUID
	}
	const userUUID = getUserUUID()

	const additionalProperties = {
		distinct_id: userUUID,
		$user_id: userUUID,
		$browser: navigator.userAgent,
		$browser_version: navigator.appVersion,
		$city: locationData.city,
		$region: locationData.region_name,
		mp_country_code: locationData.country_name,
		$current_url: window.location.href,
		$device: navigator.platform,
		$device_id: navigator.userAgent,
		$initial_referrer: document.referrer ? document.referrer : undefined,
		$initial_referring_domain: document.referrer
			? new URL(document.referrer).hostname
			: undefined,
		$os: navigator.platform,
		$screen_height: window.screen.height,
		$screen_width: window.screen.width,
		...utmParams,
	}
	const properties = {
		...eventProperties,
		...additionalProperties,
	}

	fetch(`${env.NEXT_PUBLIC_APP_URL}/api/mixpanel`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			event: eventName,
			properties,
		}),
	})
}
