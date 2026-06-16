import type { AnalyticsEventData, AnalyticsEventName } from '@/config/analytics-events'
import { shouldEnableUmami } from '@/lib/should-enable-umami'

export function trackEvent(name: AnalyticsEventName, data?: AnalyticsEventData) {
	if (!shouldEnableUmami(window.location.hostname)) return

	window.umami?.track(name, data)
}
