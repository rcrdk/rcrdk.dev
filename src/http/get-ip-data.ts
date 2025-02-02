/* eslint-disable prettier/prettier */
import { unstable_cache as cache } from 'next/cache'

async function getIpDataFn(ip: string | null): Promise<Record<string, string | number>> {
	try {
		const response = await fetch(`http://ip-api.com/json/${ip ?? ''}?fields=status,countryCode,regionName,city&lang=pt-BR`)
		return await response.json()
	} catch (error) {
		console.error(error)
		return {}
	}
}

export async function getIpData(ip: string | null) {
	const expirationInSeconds = 60 * 60 * 12 // half-day
	const ipAsCacheKey = ip?.replaceAll('.', '').replaceAll(':', '') ?? ''

	return cache(() => getIpDataFn(ip), [`get-ip-info-${ipAsCacheKey}`], {
		tags: ['get-ip-info', `get-ip-info-${ipAsCacheKey}`],
		revalidate: expirationInSeconds,
	})()
}
