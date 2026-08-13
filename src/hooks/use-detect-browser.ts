import { useEffect, useState } from 'react'

const BROWSER_MATCHERS: { name: string; pattern: RegExp }[] = [
	{ name: 'Mozilla Firefox', pattern: /Firefox/ },
	{ name: 'Samsung Internet', pattern: /SamsungBrowser/ },
	{ name: 'Opera', pattern: /Opera|OPR/ },
	{ name: 'Microsoft Internet Explorer', pattern: /Trident/ },
	{ name: 'Microsoft Edge', pattern: /Edge/ },
	{ name: 'Google Chrome or Chromium', pattern: /Chrome/ },
	{ name: 'Apple Safari', pattern: /Safari/ },
]

const detectBrowserName = (userAgent: string) => {
	const matcher = BROWSER_MATCHERS.find(({ pattern }) => pattern.test(userAgent))

	return matcher?.name ?? null
}

export function useDetectBrowser() {
	const [browserName, setBrowserName] = useState<string | null>(null)

	useEffect(() => {
		if (typeof window === 'undefined' || !navigator) return

		setBrowserName(detectBrowserName(navigator.userAgent))
	}, [])

	return browserName
}
