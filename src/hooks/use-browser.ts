import { useEffect, useState } from 'react'

export default function useDetectBrowser() {
	const [browserName, setBrowserName] = useState<string | null>(null)

	useEffect(() => {
		if (typeof window === 'undefined') return
		if (!navigator) return

		let browser: string | null = null

		const agent = navigator.userAgent

		if (agent.indexOf('Firefox') > -1) {
			browser = 'Mozilla Firefox'
		} else if (agent.indexOf('SamsungBrowser') > -1) {
			browser = 'Samsung Internet'
		} else if (agent.indexOf('Opera') > -1 || agent.indexOf('OPR') > -1) {
			browser = 'Opera'
		} else if (agent.indexOf('Trident') > -1) {
			browser = 'Microsoft Internet Explorer'
		} else if (agent.indexOf('Edge') > -1) {
			browser = 'Microsoft Edge'
		} else if (agent.indexOf('Chrome') > -1) {
			browser = 'Google Chrome or Chromium'
		} else if (agent.indexOf('Safari') > -1) {
			browser = 'Apple Safari'
		}

		setBrowserName(browser)
	}, [])

	return browserName
}
