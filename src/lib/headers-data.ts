import { headers } from 'next/headers'
import { userAgentFromString } from 'next/server'

export async function getHeadersData() {
	const headersData = await headers()
	const getUserAgentString = headersData.get('user-agent') ?? ''
	const referer = headersData.get('referer')

	const { browser, device, isBot, os } = userAgentFromString(getUserAgentString)

	return {
		$os: os.name,
		$os_version: os.version,
		$browser: browser.name,
		$browser_version: browser.version,
		$referrer: referer,
		$brand: device.vendor,
		$model: device.model,
		isBot,
	}
}
