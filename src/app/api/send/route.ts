import { NextResponse, type NextRequest } from 'next/server'

import { UMAMI_SEND_URL } from '@/config/umami'
import { getRequestClientIp } from '@/utils'

const UPSTREAM_ERROR_MESSAGE = 'Could not forward the analytics event.'

const FORWARDED_HEADER_NAMES = [
	'content-type',
	'user-agent',
	'x-umami-website-id',
	'x-umami-hostname',
	'x-umami-cache',
] as const

const VERCEL_LOCATION_HEADERS = [
	{ from: 'x-vercel-ip-country', to: 'x-umami-client-country' },
	{ from: 'x-vercel-ip-country-region', to: 'x-umami-client-region' },
	{ from: 'x-vercel-ip-city', to: 'x-umami-client-city' },
] as const

const appendClientLocationHeaders = (request: NextRequest, headers: Record<string, string>) => {
	for (const { from, to } of VERCEL_LOCATION_HEADERS) {
		const headerValue = request.headers.get(from)
		if (!headerValue) continue

		headers[from] = headerValue
		headers[to] = headerValue
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.text()
		const clientIp = getRequestClientIp(request)
		const headers: Record<string, string> = {}

		for (const headerName of FORWARDED_HEADER_NAMES) {
			const headerValue = request.headers.get(headerName)
			if (headerValue) headers[headerName] = headerValue
		}

		if (clientIp) {
			headers['x-forwarded-for'] = clientIp
			headers['x-real-ip'] = clientIp
			headers['true-client-ip'] = clientIp
		}

		appendClientLocationHeaders(request, headers)

		const upstreamResponse = await fetch(UMAMI_SEND_URL, {
			method: 'POST',
			headers,
			body,
		})

		const responseBody = await upstreamResponse.text()
		const responseContentType = upstreamResponse.headers.get('content-type') ?? 'application/json'

		return new NextResponse(responseBody, {
			status: upstreamResponse.status,
			headers: { 'content-type': responseContentType },
		})
	} catch (error) {
		console.error(error)
		return NextResponse.json({ message: UPSTREAM_ERROR_MESSAGE }, { status: 502 })
	}
}
