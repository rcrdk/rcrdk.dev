import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { env } from '@/lib/env'

export async function GET(request: NextRequest & { ip?: string }) {
	try {
		if (!env.IPAPI_ACCESS_KEY) {
			return NextResponse.json(
				{ error: 'Access key not found' },
				{ status: 400 },
			)
		}

		const ip =
			request.headers.get('x-forwarded-for') ||
			request.headers.get('x-real-ip') ||
			request.ip

		if (!ip) {
			return NextResponse.json(
				{ error: 'Unable to determine IP address' },
				{ status: 400 },
			)
		}

		const locationResponse = await fetch(
			`http://api.ipapi.com/${ip}?access_key=${env.IPAPI_ACCESS_KEY}&format=1`,
		)
		const locationData = await locationResponse.json()
		return NextResponse.json(locationData)
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}
