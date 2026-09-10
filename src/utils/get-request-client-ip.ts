import type { NextRequest } from 'next/server'

const IP_HEADER_CANDIDATES = ['x-vercel-forwarded-for', 'x-forwarded-for', 'x-real-ip'] as const

export const getRequestClientIp = (request: NextRequest) => {
	for (const headerName of IP_HEADER_CANDIDATES) {
		const headerValue = request.headers.get(headerName)
		const ip = headerValue?.split(',').at(0)?.trim()
		if (ip) return ip
	}

	return undefined
}
