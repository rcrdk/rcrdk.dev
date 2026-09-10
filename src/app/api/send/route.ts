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
