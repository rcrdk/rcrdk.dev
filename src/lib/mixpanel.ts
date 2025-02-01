import Mixpanel from 'mixpanel'

import { env } from '@/lib/env'

const mixpanelEvent = env.MIXPANEL_SECRET
	? Mixpanel.init(env.MIXPANEL_SECRET)
	: undefined

export function trackServerEvent(
	eventName: string,
	properties: Record<string, string | number>,
) {
	if (
		process.env.NODE_ENV !== 'production' ||
		!env.MIXPANEL_SECRET ||
		!mixpanelEvent
	) {
		return
	}

	mixpanelEvent.track(eventName, properties)
}
