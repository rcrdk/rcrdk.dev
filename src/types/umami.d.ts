interface UmamiTracker {
	track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void
}

interface Window {
	umami?: UmamiTracker
}
