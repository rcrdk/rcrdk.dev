/* eslint-disable prettier/prettier */
import { unstable_cache as cache } from 'next/cache'
import { cookies } from 'next/headers'

async function getIpDataFn(): Promise<Record<string, string | number>> {
	try {
		const ip = await fetch('http://ip-api.com/json?fields=status,countryCode,regionName,city&lang=pt-BR')
		return await ip.json()
	} catch (error) {
		console.error(error)
		return {}
	}
}

export async function getIpData() {
	const cookiesStore = await cookies()
	const expirationInSeconds = 60 * 60 * 12 // half-day

	const key = '@RCRDK.DEV-ip-cache-id-1.0.0'
	const cacheId = cookiesStore.get(key)?.value ?? 'unknown'

	return cache(() => getIpDataFn(), [`get-ip-info-${cacheId}`], {
		tags: ['get-ip-info', `get-ip-info-${cacheId}`],
		revalidate: expirationInSeconds,
	})()
}
